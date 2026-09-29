const fs = require("fs");
let content = fs.readFileSync("src/components/luna/Footer.tsx", "utf8");

const regex = /<p>.*?\{new Date\(\)\.getFullYear\(\)\}.*?<\/p>/;
const replacement = `
          <div className="flex flex-col gap-2">
            <p>© {new Date().getFullYear()} Loleta Store. جميع الحقوق محفوظة.</p>
            <p className="text-white/60 text-xs">
              تم التطوير بواسطة{" "}
              <a 
                href="https://wa.me/967714191142" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-white/80 transition-colors inline-flex items-center gap-1"
                title="تواصل معنا عبر واتساب"
              >
                تكنك
                <span dir="ltr" className="inline-block text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full ml-1">+967 714191142</span>
              </a>
            </p>
          </div>`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync("src/components/luna/Footer.tsx", content, "utf8");
  console.log("Successfully updated footer");
} else {
  console.log("String not found");
}
