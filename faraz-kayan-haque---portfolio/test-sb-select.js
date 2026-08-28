import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
const supabase = createClient(url, key);
supabase.from("ideas").select("*").limit(1).then(res => console.log(JSON.stringify(res))).catch(e => console.log(e));
