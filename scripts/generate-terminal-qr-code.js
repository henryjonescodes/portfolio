import os from "os";
import qrcode from "qrcode-terminal";

// Get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const localIP = getLocalIP();
const port = 5173; // Make sure this matches your Vite port

// Start Vite and generate QR code
qrcode.generate(`http://${localIP}:${port}`, { small: true });
