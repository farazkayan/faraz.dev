import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
const supabase = createClient(url, key);
const newIdea = {
    id: `IDEA-123457`,
    idea: "test",
};
supabase.from("ideas").insert([newIdea]).then(res => console.log(JSON.stringify(res))).catch(e => console.log(e));
