import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import cookieParser from "cookie-parser";

const app = express();
app.set("trust proxy", 1);
const PORT = 3000;

app.use(express.json());
// We must initialize cookie-parser later to use process.env.ADMIN_PASSWORD if it's set
app.use((req, res, next) => {
  cookieParser(process.env.ADMIN_PASSWORD || 'default_secret')(req, res, next);
});

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

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

app.post("/api/ideas", async (req, res) => {
  const { idea, description, platform, optional_name } = req.body;
  if (!idea) {
    return res.status(400).json({ error: "Idea is required" });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase not configured");
    return res.status(500).json({ error: "Database not configured" });
  }

  // Combine fields since database schema is limited to idea, name, email
  let fullIdea = idea;
  if (description) fullIdea += `\n\nDescription: ${description}`;
  if (platform) fullIdea += `\nPlatform: ${platform}`;

  const newIdea = {
    idea: fullIdea,
    name: optional_name || "anonymous",
  };

  try {
    // Insert without .select() because anon key cannot read (RLS)
    const { error } = await supabase.from("ideas").insert([newIdea]);
    if (error) throw error;
    
    // Generate a random ID to satisfy the frontend's success message
    const randomStr = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    res.json({ id: `IDEA-${randomStr}`, ...req.body });
  } catch (err) {
    console.error("Error saving idea:", JSON.stringify(err));
    res.status(500).json({ error: "Failed to save idea" });
  }
});



// Admin routes
app.post("/api/admin/login", (req, res) => {
  // Simple rate limiting / brute-force protection
  setTimeout(() => {
    const { password } = req.body;
    if (!process.env.ADMIN_PASSWORD) {
      return res.status(500).json({ error: "Admin not configured" });
    }
    if (password === process.env.ADMIN_PASSWORD) {
      res.cookie("admin_auth", "authenticated", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
      });
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  }, 1000);
});

app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("admin_auth");
  res.json({ success: true });
});

app.get("/api/admin/ideas", async (req, res) => {
  if (req.signedCookies.admin_auth !== "authenticated") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return res.status(500).json({ error: "Database not configured" });
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
