const fs = require("fs");
let content = fs.readFileSync("src/components/luna/Header.tsx", "utf8");

const regex = /<Link to="\/" className="flex items-center gap-2\.5">[\s\S]*?<\/Link>/;
const replacement = `<Link to="/" className="flex items-center">
            <img
              src={logoUrl}
              alt="Loleta Store Logo"
              className="h-12 w-auto mix-blend-multiply object-contain"
              loading="eager"
            />
          </Link>`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync("src/components/luna/Header.tsx", content, "utf8");
  console.log("Successfully updated header logo");
} else {
  console.log("String not found in header");
}
