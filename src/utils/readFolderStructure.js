import fs from "fs";
import path from "path";

const documentsDirectory = path.join(process.cwd(), "public/documents");

export const getFolderStructure = (dir = documentsDirectory) => {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const structure = {};

  items.forEach((item) => {
    const itemPath = path.join(dir, item.name);

    // Skip hidden files and folders (those starting with a dot)
    if (item.name.startsWith(".")) return;

    if (item.isDirectory()) {
      // Recursively get the structure for subdirectories
      structure[item.name] = getFolderStructure(itemPath);
    } else {
      // Files are represented by null values
      structure[item.name] = null;
    }
  });

  return structure;
};
