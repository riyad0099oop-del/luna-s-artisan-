const fs = require("fs");
let content = fs.readFileSync("src/components/luna/Footer.tsx", "utf8");

const regex =
  /<Link\s*to="\/"\s*className="flex items-center gap-3 mb-6 bg-white\/10 p-2 pr-2 pl-6 rounded-full backdrop-blur-sm"\s*>[\s\S]*?<\/Link>/;
const replacement = `<Link
              to="/"
              className="inline-block mb-6 bg-white p-3 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform"
            >
              <img
                src={logoUrl}
                alt="Loleta Store"
                className="h-16 w-auto object-contain"
              />
            </Link>`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync("src/components/luna/Footer.tsx", content, "utf8");
  console.log("Successfully updated footer logo");
} else {
  console.log("String not found in footer");
}
