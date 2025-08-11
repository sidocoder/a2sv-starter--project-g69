const fs = require("fs");
const path = require("path");

const projectDir = path.resolve(__dirname, "src"); // adjust if your code isn't in src

function getFiles(dir) {
  let files = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getFiles(fullPath));
    } else if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".js") || file.endsWith(".jsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

const importRegex = /from\s+['"]([^'"]+)['"]/g;
const foundDeps = new Set();

getFiles(projectDir).forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const dep = match[1];
    if (
      dep.startsWith("@radix-ui/") ||
      dep === "class-variance-authority" ||
      dep === "tailwind-merge" ||
      dep === "lucide-react"
    ) {
      foundDeps.add(dep);
    }
  }
});

console.log("Dependencies found in project:");
console.log([...foundDeps].join("\n"));
