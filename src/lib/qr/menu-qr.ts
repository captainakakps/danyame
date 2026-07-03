import QRCode from "qrcode";

export async function generateMenuQrDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 1200,
    color: {
      dark: "#111111",
      light: "#ffffff",
    },
  });
}

export async function generateMenuQrPngBuffer(url: string): Promise<Buffer> {
  return QRCode.toBuffer(url, {
    type: "png",
    errorCorrectionLevel: "H",
    margin: 2,
    width: 1200,
    color: {
      dark: "#111111",
      light: "#ffffff",
    },
  });
}
