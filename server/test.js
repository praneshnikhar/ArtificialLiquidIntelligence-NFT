require("dotenv").config();
const axios = require("axios");

(async () => {
  const HF_TOKEN = process.env.HF_TOKEN;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
      {
        inputs: "A futuristic astronaut fox in a cyberpunk city",
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
        },
        responseType: "arraybuffer",
      }
    );

    const imageBuffer = Buffer.from(response.data);
    console.log("✅ Image generated — bytes:", imageBuffer.length);

    // Optional: Save image for inspection
    const fs = require("fs");
    fs.writeFileSync("output.png", imageBuffer);
    console.log("🖼️ Image saved as output.png");
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.error("📦 Status:", err?.response?.status);
    console.error("📨 Data:", err?.response?.data?.toString?.() || err?.response?.data);
  }
})();
