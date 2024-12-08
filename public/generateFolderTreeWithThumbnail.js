const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

// Define the root directory and base path for your output JSON
const ROOT_DIR = path.join(__dirname, "documents");
const BASE_PATH = "./documents";
const THUMBNAILS_DIR = path.join(__dirname, "thumbnails");
const THUMBNAILS_URL = "./thumbnails";

// Ensure the thumbnails directory exists
if (!fs.existsSync(THUMBNAILS_DIR)) {
  fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
}

// Helper function to get file type
function getFileType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if ([".pdf", ".doc", ".docx"].includes(ext)) return "document";
  if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) return "image";
  if ([".mp4", ".avi", ".mov"].includes(ext)) return "video";
  return "other";
}

// Sleep function for Puppeteer
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to generate a thumbnail for a PDF
async function generateThumbnail(pdfPath, thumbnailPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    // Load the PDF file
    await page.goto(`file://${pdfPath}`, { waitUntil: "networkidle0" });

    // Adjust viewport to capture the first page of the PDF
    await page.setViewport({ width: 500, height: 800 });

    // Add delay to ensure rendering is complete
    await sleep(1000);

    // Capture screenshot of the first page
    await page.screenshot({
      path: thumbnailPath,
      clip: { x: 0, y: 60, width: 500, height: 300 }, // Adjust as necessary
    });
  } catch (error) {
    console.error(`Failed to generate thumbnail for ${pdfPath}:`, error);
  } finally {
    await browser.close();
  }
}

// Recursive function to build the folder tree
async function buildTree(directory, isRoot = false) {
  const items = fs.readdirSync(directory, { withFileTypes: true });
  const tree = {
    name: isRoot ? "Home" : path.basename(directory),
    thumbnail: "",
    files: [],
    folders: [],
  };

  for (const item of items) {
    // Ignore hidden files and folders
    if (item.name.startsWith(".")) continue;

    const itemPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      // Recursively process subfolders
      tree.folders.push(await buildTree(itemPath));
    } else {
      // Process files
      const fileType = getFileType(item.name);
      const relativePath = path
        .relative(ROOT_DIR, itemPath)
        .replace(/\\/g, "/");
      const srcPath = `${BASE_PATH}/${relativePath}`;

      let thumbnail = "";
      if (
        fileType === "document" &&
        path.extname(item.name).toLowerCase() === ".pdf"
      ) {
        const thumbnailName =
          path.basename(item.name, path.extname(item.name)) + ".jpg";
        const thumbnailPath = path.join(THUMBNAILS_DIR, thumbnailName);
        if (!fs.existsSync(thumbnailPath)) {
          console.log(`Generating thumbnail for ${item.name}...`);
          await generateThumbnail(itemPath, thumbnailPath);
        }
        thumbnail = `${THUMBNAILS_URL}/${thumbnailName}`;
      } else if (fileType === "image") {
        thumbnail = srcPath;
      }

      tree.files.push({
        name: item.name,
        type: fileType,
        thumbnail,
        src: srcPath,
      });
    }
  }

  return tree;
}

// Generate the folder tree and write to JSON
async function generateJSON() {
  const folderTree = await buildTree(ROOT_DIR, true); // Set isRoot to true for the top-level directory
  const outputPath = path.join(__dirname, "folderTree.json");

  fs.writeFileSync(outputPath, JSON.stringify(folderTree, null, 2), "utf8");
  console.log(`Folder tree JSON saved to ${outputPath}`);
}

// Run the script
generateJSON().catch((err) => console.error(err));
