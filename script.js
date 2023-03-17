const apiKey = "d59891f9073efba1648de1bb5082224e";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Add event listeners for button click and enter key press
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

// Fetch weather data from API and update UI with results
const checkWeather = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    document.querySelector(".city").innerHTML = `${data.name}`;
    document.querySelector(".temp").innerHTML = Math.round(`${data.main.temp}`) + "°C";
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    // Set weather icon based on weather condition
    const weatherCondition = data.weather[0].main.toLowerCase();
    const iconMap = {
      clouds: "clouds.png",
      smoke: "clouds.png",
      rain: "rain.png",
      clear: "clear.png",
      drizzle: "drizzle.png",
      snow: "snow.png",
      mist: "mist.png",
      haze: "mist.png",
    };
    weatherIcon.src = `images/${iconMap[weatherCondition]}`;
  } catch (error) {
    console.error(error);
    alert("Weather data not found. Please enter a valid city.");
  }
};
