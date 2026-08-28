import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
const supabase = createClient(url, key);
const newIdea = {
    id: `IDEA-123458`,
    idea: "test idea",
    description: "desc",
    category: "general",
    platform: "web",
    optional_name: "test",
    created_at: new Date().toISOString(),
    status: "pending",
    might_build_count: 0,
};
supabase.from("ideas").insert([newIdea]).then(res => console.log(JSON.stringify(res))).catch(e => console.log(e));
