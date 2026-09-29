import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rzpjurczgjzbpbstjfht.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6cGp1cmN6Z2p6YnBic3RqZmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MTQzNjMsImV4cCI6MjEwNjA5MDM2M30.2E9T0aedwzP2MYG5S5X1zfqm1eylHChgGLnKeNKIum4";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}

checkProducts();
