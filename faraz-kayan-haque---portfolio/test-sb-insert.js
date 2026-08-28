import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
const supabase = createClient(url, key);
const newIdea = {
    id: `IDEA-123456`,
    idea: "test",
    description: "test desc",
    category: "general",
    platform: "other",
    optional_name: "test user",
    created_at: new Date().toISOString(),
    status: "pending",
    might_build_count: 0,
};
supabase.from("ideas").insert([newIdea]).then(res => console.log(JSON.stringify(res))).catch(e => console.log(e));
