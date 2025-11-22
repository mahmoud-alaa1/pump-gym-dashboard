import fs from "fs";
import path from "path";

const componentsDir = path.join("..", "..", "frontend", "components");

const logicalMap: Record<string, string> = {
  "ml-": "ms-",
  "mr-": "me-",
  "pl-": "ps-",
  "pr-": "pe-",
  left: "start",
  right: "end",
};

function convertClassesToLogical(className: string): string {
  let newClass = className;

  for (const [ltr, logical] of Object.entries(logicalMap)) {
    const regex = new RegExp(`\\b${ltr}`, "g");
    newClass = newClass.replace(regex, logical);
  }

  return newClass;
}

function processComponent(filePath: string) {
  let content = fs.readFileSync(filePath, "utf-8");

  content = content.replace(/className="([^"]+)"/g, (match, p1) => {
    const logicalClasses = convertClassesToLogical(p1);
    return `className="${logicalClasses}"`;
  });

  fs.writeFileSync(filePath, content, "utf-8");
}

function traverseDir(dir: string) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) traverseDir(fullPath);
    else if (fullPath.endsWith(".tsx")) processComponent(fullPath);
  });
}

traverseDir(componentsDir);
