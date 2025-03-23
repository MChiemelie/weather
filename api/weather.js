<<<<<<< HEAD
export default async function handler(req, res) {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  const apiKey = process.env.OPENWEATHERMAPAPI;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&APPID=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Error fetching weather" });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
=======
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
>>>>>>> 36c0141240f7b7fc7bbc8359504eb858f62d72ec
