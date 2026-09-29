const fs = require("fs");
let content = fs.readFileSync("src/routes/index.tsx", "utf8");

const oldCode = `  const productsToDisplay: Product[] = dbProducts?.slice(0, 4).map(p => ({
    name: p.name,
    note: p.shortDescription || "",
    price: p.price + " ريال",
    oldPrice: p.oldPrice ? p.oldPrice + " ريال" : undefined,
    image: p.mainImage || heroImg,
    tag: p.offerBadge || (p.isNew ? "جديد" : undefined),
    id: p.id,
  })) || FEATURED_PRODUCTS;`;

const newCode = `  const productsToDisplay: Product[] = dbProducts
    ?.filter(p => p.isVisible && (p.showInFeatured || p.type === 'loleta'))
    .slice(0, 4).map(p => ({
      name: p.name,
      note: p.shortDescription || "",
      price: p.price + " ريال",
      oldPrice: p.oldPrice ? p.oldPrice + " ريال" : undefined,
      image: p.mainImage || heroImg,
      tag: p.offerBadge || (p.isNew ? "جديد" : undefined),
      id: p.id,
    })) || FEATURED_PRODUCTS;`;

if (content.includes("dbProducts?.slice(0, 4)")) {
  // Find the whole block and replace it
  const start = content.indexOf("  const productsToDisplay");
  const end = content.indexOf("|| FEATURED_PRODUCTS;") + "|| FEATURED_PRODUCTS;".length;
  content = content.substring(0, start) + newCode + content.substring(end);
  fs.writeFileSync("src/routes/index.tsx", content, "utf8");
  console.log("Successfully updated homepage filter");
} else {
  console.log("Block not found");
}
