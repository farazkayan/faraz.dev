import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const PORT = 3000;

console.log("[server] Environment check:", {
  ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
  SUPABASE_URL: !!process.env.SUPABASE_URL,
  SUPABASE_KEY: !!process.env.SUPABASE_KEY,
  SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  ADMIN_SESSION_SECRET: !!process.env.ADMIN_SESSION_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development"
});

const sessionSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
if (!sessionSecret) {
  console.error("[server] WARNING: No session secret configured (ADMIN_SESSION_SECRET or ADMIN_PASSWORD)");
}

app.use(express.json());
app.use(cookieParser(sessionSecret));

interface Idea {
  id: string;
  idea: string;
  description: string;
  category: string;
  platform: string;
  optional_name: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
  might_build_count: number;
}

function getSupabase(useServiceRole = false) {
  const url = process.env.SUPABASE_URL;
  const key = useServiceRole ? process.env.SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// In-memory rate limiter for admin login
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 30 * 60 * 1000; // 30 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }

  // Clean old records
  if (now - record.lastAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return false;
  }

  record.count++;
  record.lastAttempt = now;
  return true;
}

function resetRateLimit(ip: string) {
  loginAttempts.delete(ip);
}

app.post("/api/ideas", async (req, res) => {
  const { idea, description, platform, optional_name } = req.body;
  if (!idea) {
    return res.status(400).json({ error: "Idea is required" });
  }

  const supabase = getSupabase(false);
  if (!supabase) {
    console.error("Supabase not configured");
    return res.status(500).json({ error: "Database not configured" });
  }

  let fullIdea = idea;
  if (description) fullIdea += `\n\nDescription: ${description}`;
  if (platform) fullIdea += `\nPlatform: ${platform}`;

  const newIdea = {
    idea: fullIdea,
    name: optional_name || "anonymous",
  };

  try {
    const { error } = await supabase.from("ideas").insert([newIdea]);
    if (error) throw error;

    const randomStr = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    res.json({ id: `IDEA-${randomStr}`, ...req.body });
  } catch (err) {
    console.error("Error saving idea:", JSON.stringify(err));
    res.status(500).json({ error: "Failed to save idea" });
  }
});

// Admin routes
app.post("/api/admin/login", (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many attempts. Try again later." });
  }

  const { password } = req.body;
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: "Admin not configured" });
  }

  // Constant-time comparison to prevent timing attacks
  const providedPassword = password || "";
  const expectedPassword = process.env.ADMIN_PASSWORD;
  let match = providedPassword.length === expectedPassword.length;
  for (let i = 0; i < providedPassword.length; i++) {
    if (providedPassword[i] !== expectedPassword[i]) {
      match = false;
    }
  }

  if (match) {
    resetRateLimit(ip);
    const isProduction = process.env.NODE_ENV === "production";
    console.log("[server] Admin login successful, setting cookie");
    res.cookie("admin_auth", "authenticated", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    });
    res.json({ success: true });
  } else {
    console.log("[server] Admin login failed - invalid password");
    res.status(401).json({ error: "Invalid password" });
  }
});

app.post("/api/admin/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("admin_auth", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    signed: true
  });
  res.json({ success: true });
});

app.get("/api/admin/ideas", async (req, res) => {
  console.log("[server] /api/admin/ideas - signedCookies:", req.signedCookies);
  console.log("[server] /api/admin/ideas - cookies:", req.cookies);
  
  if (req.signedCookies.admin_auth !== "authenticated") {
    console.log("[server] Admin auth failed - no valid signed cookie");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const supabase = getSupabase(true); // Use service role for admin
  if (!supabase) {
    return res.status(500).json({ error: "Database not configured (service role key required)" });
  }

  try {
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const formattedData = data?.map(d => ({
      id: d.id,
      idea: d.idea,
      created_at: d.created_at || new Date().toISOString(),
      status: "pending",
      platform: "unknown",
      optional_name: d.name || "anonymous",
      might_build_count: 0
    }));

    res.json(formattedData || []);
  } catch (err) {
    console.error("Error fetching ideas for admin:", err);
    res.status(500).json({ error: "Failed to fetch ideas" });
  }
});


async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();