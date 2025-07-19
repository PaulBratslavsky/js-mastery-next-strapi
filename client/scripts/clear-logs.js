import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the project root (go up from scripts folder)
const projectRoot = path.join(__dirname, "..");
const logFile = path.join(projectRoot, "logs", "app.jsonl");

try {
  if (fs.existsSync(logFile)) {
    fs.unlinkSync(logFile); // Delete the file instead of clearing it
    console.log("✅ Log file deleted successfully");
    console.log(`📁 File: ${logFile}`);
  } else {
    console.log("ℹ️  No log file found");
    console.log(` Looking for: ${logFile}`);
  }
} catch (error) {
  console.error("❌ Failed to delete log file:", error.message);
  process.exit(1);
}
