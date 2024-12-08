const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Define the path to your project's documents folder
const projectDirectory = path.join(__dirname, "test_images");

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

// Function to compress an image and log sizes
async function compressImage(filePath) {
  try {
    // Get the original file size
    const originalSize = fs.statSync(filePath).size;

    // Compress the image
    const outputBuffer = await sharp(filePath)
      .jpeg({
        quality: 50, // Reduce quality significantly for smaller size
        chromaSubsampling: "4:2:0", // Use chroma subsampling for better compression
        mozjpeg: true, // Enable MozJPEG for more efficient compression
      })
      .toBuffer();

    // Overwrite the original file with the compressed version
    fs.writeFileSync(filePath, outputBuffer);

    // Get the compressed file size
    const compressedSize = outputBuffer.length;

    // Log the sizes
    console.log(`Compressed: ${filePath}`);
    console.log(`  Original Size: ${formatBytes(originalSize)}`);
    console.log(`  Compressed Size: ${formatBytes(compressedSize)}`);
  } catch (err) {
    console.error(`Error compressing ${filePath}: ${err.message}`);
  }
}

// Recursively iterate through the directory
function processDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (/\.(png|jpg|jpeg|bmp|tiff)$/i.test(filePath)) {
      // Compress image files
      compressImage(filePath);
    }
  });
}

// Start processing
processDirectory(projectDirectory);
