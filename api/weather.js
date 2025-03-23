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
