const apiKey = "e8cfb36b596b7feb57307d9172ee2742";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML =
            '<p class="error">Please enter a city name!</p>';
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        weatherResult.innerHTML =
            '<p class="loading">Getting weather information...</p>';

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found! Please try another city.");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;

        const condition = data.weather[0].main;

        let weatherIcon = "🌤️";

        if (condition === "Clear") {
            weatherIcon = "☀️";
        } else if (condition === "Clouds") {
            weatherIcon = "☁️";
        } else if (condition === "Rain") {
            weatherIcon = "🌧️";
        } else if (condition === "Drizzle") {
            weatherIcon = "🌦️";
        } else if (condition === "Thunderstorm") {
            weatherIcon = "⛈️";
        } else if (condition === "Snow") {
            weatherIcon = "❄️";
        } else if (condition === "Mist" || condition === "Fog" || condition === "Haze") {
            weatherIcon = "🌫️";
        }

        weatherResult.innerHTML = `
            <div class="weather-card">

                <h2>${data.name}, ${data.sys.country}</h2>

                <div class="weather-icon">${weatherIcon}</div>

                <div class="temperature">${temperature}°C</div>

                <p class="description">${description}</p>

                <div class="weather-details">

                    <div class="detail-box">
                        <div class="icon">🌡️</div>
                        <p>Feels Like</p>
                        <h3>${feelsLike}°C</h3>
                    </div>

                    <div class="detail-box">
                        <div class="icon">💧</div>
                        <p>Humidity</p>
                        <h3>${humidity}%</h3>
                    </div>

                    <div class="detail-box">
                        <div class="icon">💨</div>
                        <p>Wind Speed</p>
                        <h3>${windSpeed} m/s</h3>
                    </div>

                </div>
            </div>
        `;

    } catch (error) {
        weatherResult.innerHTML =
            `<p class="error">${error.message}</p>`;
    }
}
