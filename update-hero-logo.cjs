const fs = require("fs");
let content = fs.readFileSync("src/routes/index.tsx", "utf8");

if (!content.includes("import logoUrl")) {
  content = content.replace(
    "import heroImg",
    'import logoUrl from "@/assets/loleta-logo.jpg";\nimport heroImg',
  );
}

const regex =
  /<div className="relative z-10 w-64 md:w-80 rounded-\[3rem\] overflow-hidden shadow-2xl border-4 border-white\/50">[\s\S]*?<\/div>/;
const replacement = `<div className="relative z-10 w-64 md:w-80 rounded-[3rem] bg-white overflow-hidden shadow-2xl border-4 border-white/50 p-4">
              <img
                src={logoUrl}
                alt="Loleta Store"
                className="w-full h-auto object-contain"
              />
            </div>`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync("src/routes/index.tsx", content, "utf8");
  console.log("Successfully updated homepage hero image to logo");
} else {
  console.log("String not found in index.tsx");
}
