import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
const supabase = createClient(url, key);
const newIdea = {
    idea: "test",
    description: "desc",
    platform: "web",
    optional_name: "name"
};
supabase.from("ideas").insert([newIdea]).select().then(res => console.log(JSON.stringify(res))).catch(e => console.log(e));
