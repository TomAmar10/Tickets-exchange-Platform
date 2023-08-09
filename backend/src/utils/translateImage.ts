import { createWorker } from "tesseract.js";

const translateImg = async (
  imagePath: string | Buffer
): Promise<{ price: number; currency: string }> => {
  const worker = await createWorker({});
  await worker.loadLanguage("eng");
  await worker.loadLanguage("heb");
  await worker.initialize("eng+heb"); // HEBREW + ENGLISH
  // await worker.initialize("eng");

  const {
    data: { text },
  } = await worker.recognize(imagePath);

  await worker.terminate();

  if (text) {
    console.log(text);
    const priceRegex = /(?:\$[\d,]+(\.\d+)?|€[\d,]+(\.\d+)?|₪[\d,]+(\.\d+)?)/;
    const priceMatch = text.match(priceRegex);
    if (priceMatch) {
      const symbol = priceMatch[0][0];
      const price = +priceMatch[0].substring(1).replace(",", ".");
      let currency = "";
      if (symbol === "$") currency = "USD";
      else if (symbol === "€") currency = "EUR";
      else if (symbol === "₪" || symbol === "ש" || symbol === "ח")
        currency = "ILS";
      return { price, currency };
    }
  }

  return { price: 0, currency: "" };
};

export default translateImg;
