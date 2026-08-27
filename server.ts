import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = path.join(process.cwd(), "ideas_db.json");

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

// Ensure DB exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

function getIdeas(): Idea[] {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveIdeas(ideas: Idea[]) {
  fs.writeFileSync(DB_FILE, JSON.stringify(ideas, null, 2));
}

app.post("/api/ideas", (req, res) => {
  const { idea, description, platform, optional_name } = req.body;
  if (!idea) {
    return res.status(400).json({ error: "Idea is required" });
  }

  const ideas = getIdeas();
  const nextIdNum = ideas.length + 1;
  const idStr = String(nextIdNum).padStart(6, "0");
  const newIdea: Idea = {
    id: `IDEA-${idStr}`,
    idea,
    description: description || "",
    category: "general", // Can be expanded
    platform: platform || "other",
    optional_name: optional_name || "anonymous",
    created_at: new Date().toISOString(),
    status: "pending",
    might_build_count: 0,
  };

  ideas.push(newIdea);
  saveIdeas(ideas);

  res.json(newIdea);
});

app.get("/api/ideas/approved", (req, res) => {
  const ideas = getIdeas();
  // By default we return all for the Easter egg until there's an actual moderation UI being used.
  // Actually, wait, the spec says "Only approved ideas should appear publicly." 
  // For the sake of the Easter egg demo, let's just make new submissions "approved" automatically so they show up, 
  // or return pending ones if there are no approved ones?
  // Let's stick to the spec: status: 'pending' on creation.
  const approved = ideas.filter((i) => i.status === "approved");
  res.json(approved);
});

app.post("/api/ideas/:id/might_build", (req, res) => {
  const ideas = getIdeas();
  const idea = ideas.find((i) => i.id === req.params.id);
  if (idea) {
    idea.might_build_count = (idea.might_build_count || 0) + 1;
    saveIdeas(ideas);
    res.json(idea);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// Admin routes (basic implementation)
app.get("/api/admin/ideas", (req, res) => {
  // In a real app this would have auth.
  res.json(getIdeas());
});

app.post("/api/admin/ideas/:id/status", (req, res) => {
  const { status } = req.body;
  const ideas = getIdeas();
  const idea = ideas.find((i) => i.id === req.params.id);
  if (idea) {
    idea.status = status;
    saveIdeas(ideas);
    res.json(idea);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// Seed some initial approved ideas if empty
const initialIdeas = getIdeas();
if (initialIdeas.length === 0) {
  saveIdeas([
    {
      id: "IDEA-000001",
      idea: "An app that tells you which of your friends are actually free without messaging everyone.",
      description: "It's so annoying trying to coordinate hangouts.",
      category: "social",
      platform: "mobile",
      optional_name: "josh",
      created_at: new Date().toISOString(),
      status: "approved",
      might_build_count: 12,
    },
    {
      id: "IDEA-000002",
      idea: "A better way to organize school assignments.",
      description: "Canvas is too cluttered, I just want a simple timeline.",
      category: "education",
      platform: "web",
      optional_name: "sarah",
      created_at: new Date().toISOString(),
      status: "approved",
      might_build_count: 5,
    }
  ]);
}

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
