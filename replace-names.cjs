const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedCount = 0;
walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css') || filePath.endsWith('.json')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Replace names
    content = content.replace(/Loleta Store/gi, 'Luna Store');
    content = content.replace(/Loleta/g, 'Luna');
    content = content.replace(/loleta/g, 'luna');
    content = content.replace(/لوليتا/g, 'لونا');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedCount++;
      console.log(`Updated: ${filePath}`);
    }
  }
});

console.log(`Done. Modified ${modifiedCount} files.`);
