import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rzpjurczgjzbpbstjfht.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6cGp1cmN6Z2p6YnBic3RqZmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MTQzNjMsImV4cCI6MjEwNjA5MDM2M30.2E9T0aedwzP2MYG5S5X1zfqm1eylHChgGLnKeNKIum4";
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const row = {
    name: "Test",
    slug: "test-slug",
    main_image: "test.jpg",
    price: 10,
    quantity: 1,
    type: "luna",
    brand_id: null,
    is_new: false,
    is_bestseller: false,
    show_in_featured: false,
    has_offer: false,
    is_visible: true,
  };
  const { data, error } = await supabase.from("products").insert(row).select().single();
  if (error) console.error("DB Error:", error);
  else console.log("Success:", data);
}
testInsert();
