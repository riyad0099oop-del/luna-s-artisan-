const fs = require("fs");
let content = fs.readFileSync("src/components/luna/Footer.tsx", "utf8");

content = content.replace("تكنك", "شركة تكنيك");

fs.writeFileSync("src/components/luna/Footer.tsx", content, "utf8");
console.log("Successfully updated footer to شركة تكنيك");
