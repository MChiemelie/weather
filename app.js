const OPENWEATHERMAPAPI = CONFIG.OPENWEATHERMAPAPI;

// Function to fetch the full country details from REST Countries API
async function getCountryDetails(alpha2Code) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${alpha2Code}`
    );
    if (!response.ok) {
      throw new Error("Error fetching country details");
    }
    const data = await response.json();
    return {
      name: data[0]?.name?.common || "Unknown Country",
      flag: data[0]?.flags?.svg || "",
    };
  } catch (error) {
    console.error("Failed to fetch country details:", error);
    return { name: "Unknown Country", flag: "" };
  }
}

// Main function to get weather data
async function getWeather(event) {
  if (event) event.preventDefault();

  const cityInput = document.getElementById("searchbar").value;
  if (!cityInput) {
    console.warn("No city entered");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&APPID=${OPENWEATHERMAPAPI}&units=metric`;

  try {
    console.log("Fetching weather for:", cityInput);
    console.log("API URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    // Get country details
    const countryCode = data.sys.country.toUpperCase();
    const countryDetails = await getCountryDetails(countryCode);

    // Weather data object to store
    const weatherData = {
      city: data.name,
      description: data.weather[0].description,
      weatherIcon: `icons/${data.weather[0].icon}.png`,
      temperature: `${Math.round(data.main.temp)}°C`,
      feelsLike: `${Math.round(data.main.feels_like)}°C`,
      wind: `${data.wind.speed} m/s`,
      humidity: `${data.main.humidity}%`,
      pressure: `${data.main.pressure} hPa`,
      countryName: countryDetails.name,
      countryCode: countryCode,
      countryFlag: countryDetails.flag,
    };

    // Save to localStorage
    localStorage.setItem("weatherData", JSON.stringify(weatherData));

    // Display the weather data
    displayWeather(weatherData);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// Function to display weather data
function displayWeather(data) {
  document.getElementById("city").innerText = data.city;
  document.getElementById("description").innerText = data.description;
  document.getElementById("weatherIcon").src = data.weatherIcon;
  document.getElementById("temperature").innerText = data.temperature;
  document.getElementById("feelsLike").innerText = data.feelsLike;
  document.getElementById("wind").innerText = data.wind;
  document.getElementById("humidity").innerText = data.humidity;
  document.getElementById("pressure").innerText = data.pressure;
  document.getElementById("country_name").innerText = data.countryName;
  document.getElementById("country_code").innerText = data.countryCode;
  document.getElementById(
    "country_flag"
  ).innerHTML = `<img src="${data.countryFlag}" alt="${data.countryName} flag" class="flag">`;

  // Show the result container
  document.getElementById("result").style.display = "block";
}

// Function to load saved weather data on page load
function loadSavedWeather() {
  const savedData = localStorage.getItem("weatherData");
  if (savedData) {
    displayWeather(JSON.parse(savedData));
  }
}

// Ensure DOM is fully loaded before attaching events
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("weatherForm").addEventListener("submit", getWeather);
  loadSavedWeather(); // Restore state on page load
});
