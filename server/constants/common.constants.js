// DIR constants
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the current file URL
const __filename = fileURLToPath(import.meta.url);

// Get the directory path (equivalent to __dirname)
export const __dirname = dirname(__filename);

// Common constants
export const SMS_DATE_TYPE = "YYYY-MM-DDTHH:mm:ss";
