const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const OPENWEATHERMAPAPI = process.env.OPENWEATHERMAPAPI;

app.get("/weather", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${OPENWEATHERMAPAPI}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
