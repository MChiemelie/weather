document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("getWeather").addEventListener("click", async () => {
    const selectedValue = document.getElementById("country").value;
    const [latitude, longitude] = selectedValue.split(",");

    // Use 'current_weather=true' for instant weather data
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      if (data.current_weather) {
        // Extract current weather details
        const temperature = data.current_weather.temperature;
        const windspeed = data.current_weather.windspeed;
        const time = data.current_weather.time;

        document.getElementById("weatherResult").innerHTML =
          `Current Temperature: ${temperature}°C<br>` +
          `Wind Speed: ${windspeed} km/h<br>` +
          `Time: ${new Date(time).toLocaleString()}`;
      } else {
        document.getElementById("weatherResult").innerHTML =
          "No current weather data available.";
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      document.getElementById("weatherResult").innerHTML =
        "Failed to fetch weather data.";
    }
  });
});
