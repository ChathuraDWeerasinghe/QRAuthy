import QRCode from "qrcode";
import fs from "fs";
import path from "path";

const qrFolderPath = "tmp"; // Set the path to the 'tmp' folder

export const generateQRCode = async (url, userId) => {
  try {
    // Generate the QR code as a PNG buffer
    const qrCodeBuffer = await QRCode.toBuffer(url, { type: "png" });

    // Generate a unique filename
    const filename = "QR-" + userId + ".png";

    if (!fs.existsSync(qrFolderPath)) {
      fs.mkdirSync(qrFolderPath, { recursive: true });
    }

    // Save the QR code buffer to a temporary file
    const tempFilePath = path.join(qrFolderPath, filename);

    fs.writeFileSync(tempFilePath, qrCodeBuffer);

    const qrCodeDataUrl = `data:image/png;base64,${qrCodeBuffer.toString(
      "base64"
    )}`;

    return qrCodeDataUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};
