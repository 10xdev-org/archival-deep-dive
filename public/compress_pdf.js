const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// Define the path to your project's PDF folder
const pdfDirectory = path.join(__dirname, "documents");

// Function to format file sizes
function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }
  return `${bytes.toFixed(2)} ${units[index]}`;
}

// Function to compress a PDF with more aggressive settings
function compressPDF(filePath) {
  return new Promise((resolve, reject) => {
    const tempFilePath = `${filePath}.temp.pdf`;

    // Ghostscript command for more aggressive PDF compression
    const command = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${tempFilePath}" "${filePath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error compressing ${filePath}: ${error.message}`);
        reject(error);
        return;
      }

      // Get the original and compressed file sizes
      const originalSize = fs.statSync(filePath).size;
      const compressedSize = fs.statSync(tempFilePath).size;

      // Check if compression actually reduced the size
      if (compressedSize < originalSize) {
        // Replace the original file with the compressed version
        fs.renameSync(tempFilePath, filePath);
        console.log(`Compressed: ${filePath}`);
        console.log(`  Original Size: ${formatBytes(originalSize)}`);
        console.log(`  Compressed Size: ${formatBytes(compressedSize)}`);
      } else {
        console.log(`No compression: ${filePath}`);
        fs.unlinkSync(tempFilePath); // Remove the temporary file if no compression
      }

      resolve();
    });
  });
}

// Recursively iterate through the directory
function processDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (file.toLowerCase().endsWith(".pdf")) {
      const fileSize = stat.size;

      if (fileSize > 10 * 1024 * 1024) {
        // Only compress files larger than 1 MB
        console.log(`Processing: ${filePath} (Size: ${formatBytes(fileSize)})`);
        compressPDF(filePath).catch((err) => console.error(err));
      } else {
        // console.log(`Skipping: ${filePath} (Size: ${formatBytes(fileSize)})`);
      }
    }
  });
}

// Start processing
processDirectory(pdfDirectory);
