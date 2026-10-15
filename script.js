const apiKey = "6b575486416d11eb1c6dda55b47ea58a";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    const errorMessage = document.getElementById("errorMessage");
    const weatherCard = document.getElementById("weatherCard");

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        weatherCard.style.display = "none";
        return;
    }

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?q=${encodeURIComponent(city)}` +
            `&appid=${apiKey}` +
            `&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        console.log("API response:", data);

        if (!response.ok) {

            if (response.status === 401) {
                throw new Error("API key is invalid or not activated yet.");
            }

            if (response.status === 404) {
                throw new Error("City not found.");
            }

            throw new Error(data.message || "Weather API error.");
        }

        document.getElementById("cityName").textContent =
            data.name;

        document.getElementById("temperature").textContent =
            `${data.main.temp} °C`;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;

        document.getElementById("condition").textContent =
            data.weather[0].description;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherCard.style.display = "block";
        errorMessage.textContent = "";

    } catch (error) {

        console.error(error);

        weatherCard.style.display = "none";
        errorMessage.textContent = error.message;
    }
}
