import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Stellium Bridge Online ✅");
});

// Natal chart
app.post("/natal", async (req, res) => {
  try {
    const r = await axios.post(
      "https://json.astrologyapi.com/v1/natal_chart",
      req.body,
      {
        headers: {
          "Content-Type": "application/json"
        },
        auth: {
          username: process.env.ASTRO_USER || "",
          password: process.env.ASTRO_PASS || ""
        }
      }
    );

    res.json(r.data);
  } catch (err) {
    console.error("NATAL ERROR:", err?.response?.data || err.message);
    res.status(500).json({ error: "Error generando carta natal" });
  }
});

// Western Horoscope
app.post("/horoscope", async (req, res) => {
  try {
    const r = await axios.post(
      "https://json.astrologyapi.com/v1/western_horoscope",
      req.body,
      {
        headers: {
          "Content-Type": "application/json"
        },
        auth: {
          username: process.env.ASTRO_USER || "",
          password: process.env.ASTRO_PASS || ""
        }
      }
    );

    res.json(r.data);
  } catch (err) {
    console.error("HOROSCOPE ERROR:", err?.response?.data || err.message);
    res.status(500).json({ error: "Error generando horóscopo" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
