const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_TOKEN = process.env.HF_TOKEN;

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;
  console.log("⚡️ Received prompt:", prompt);

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(response.data).toString("base64");
    console.log("✅ Image generated, sending base64");
    res.json({ image: `data:image/png;base64,${base64Image}` });
  } catch (error) {
    console.error("❌ Image generation failed:");
    console.error("Message:", error.message);
    console.error("Status:", error?.response?.status);
    console.error("Data:", error?.response?.data?.toString?.() || error?.response?.data);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

app.listen(5000, () => console.log("🔥 Server running on http://localhost:5000"));
