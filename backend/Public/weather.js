let timer;
const cacheDuration = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
const maxCities = 5; // Limit of cached cities

window.onload = function () {
    const savedCity = localStorage.getItem("city");
    const cachedWeatherData = JSON.parse(localStorage.getItem("weatherData")) || {};
    const cachedTimestamp = JSON.parse(localStorage.getItem("weatherTimestamp")) || {};

    console.log("🎉 Loaded weather widget!");

    if (savedCity) {
        document.getElementById("city-input").value = savedCity.toLowerCase();

        if (cachedWeatherData[savedCity] && (Date.now() - cachedTimestamp[savedCity]) < cacheDuration) {
            console.log(`🔄 Using cached weather data for ${savedCity}`);
            updateWeatherUI(cachedWeatherData[savedCity]);
        } else {
            console.log(`🔄 Fetching new weather data for ${savedCity}`);
            fetchWeatherByCity(true);
        }
    }
};

function fetchWeatherByCity(isReload = false) {
    let city = document.getElementById("city-input").value.trim().toLowerCase();
    if (!city) {
        showError("❌ Please enter a city.");
        return;
    }

    let cachedWeatherData = JSON.parse(localStorage.getItem("weatherData")) || {};
    let cachedTimestamp = JSON.parse(localStorage.getItem("weatherTimestamp")) || {};
    let savedCities = JSON.parse(localStorage.getItem("cities")) || [];

    console.log(`🔍 Checking cache for ${city}...`);
    
    // Ensure timestamp exists and is within valid cache duration
    if (cachedWeatherData[city] && cachedTimestamp[city] && (Date.now() - cachedTimestamp[city]) < cacheDuration) {
        console.log(`✅ Using cached data for ${city}`);
        updateWeatherUI(cachedWeatherData[city]);
        return; // STOP here and do NOT fetch
    }

    console.log(`🌍 Fetching new weather data for city: ${city}`);
    localStorage.setItem("city", city);  // Save current city to localStorage

    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
        .then(response => {
            if (!response.ok) throw new Error("City not found or API request failed.");
            return response.json();
        })
        .then(data => {
            if (!data.address) {
                showError("❌ City not found. Please check the city name.");
                return;
            }

            console.log("📝 Saving to cache:", city);

            let savedCities = JSON.parse(localStorage.getItem("cities")) || [];
            let cachedWeatherData = JSON.parse(localStorage.getItem("weatherData")) || {};
            let cachedTimestamp = JSON.parse(localStorage.getItem("weatherTimestamp")) || {};

            // Ensure we don't exceed maxCities in cache
            if (!savedCities.includes(city)) {
                if (savedCities.length >= maxCities) {
                    let removedCity = savedCities.shift();
                    delete cachedWeatherData[removedCity];
                    delete cachedTimestamp[removedCity];
                    console.log(`⚡ Removed oldest city: ${removedCity}`);
                }
                savedCities.push(city);
            }

            // Save fetched data to localStorage
            cachedWeatherData[city] = data;
            cachedTimestamp[city] = Date.now();

            // Update localStorage with the new data
            localStorage.setItem("cities", JSON.stringify(savedCities));
            localStorage.setItem("weatherData", JSON.stringify(cachedWeatherData));
            localStorage.setItem("weatherTimestamp", JSON.stringify(cachedTimestamp));

            console.log("✅ Saved weatherData:", cachedWeatherData);
            console.log("✅ Saved timestamps:", cachedTimestamp);

            updateWeatherUI(data);
            hideError();
            console.log(`✅ Weather data fetched successfully for ${city}`);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            showError("❌ Failed to fetch weather data.");
        });
}

function updateWeatherUI(data) {
    document.getElementById("city-name").textContent = formatCityName(data.address);
    originalCurrentTempF = data.currentConditions.temp;
    let isCelsius = localStorage.getItem("isCelsius") === "true";
    let displayTemp = isCelsius ? ((originalCurrentTempF - 32) * 5 / 9).toFixed(1) : originalCurrentTempF.toFixed(1);
    document.getElementById("temperature").textContent = displayTemp;
    document.getElementById("temp-unit").textContent = isCelsius ? "°C" : "°F";
        document.getElementById("temp-unit").textContent = "°F"; // Default to Fahrenheit
    document.getElementById("weather-condition").textContent = data.currentConditions.conditions;
    document.getElementById("weather-icon").src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${data.currentConditions.icon}.png`;

    if (timer) clearInterval(timer);
    updateRealTime(data.timezone);
    timer = setInterval(() => updateRealTime(data.timezone), 1000);
    updateForecastUI(data.days);

    document.getElementById("city-input").disabled = true;
}

function formatCityName(city) {
    return city.replace(/\b\w/g, (char) => char.toUpperCase());
}

function updateRealTime(timezone) {
    let now = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    document.getElementById("local-time").textContent = now.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    document.getElementById("local-date").textContent = now.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

// function updateForecastUI(forecast) {
//     const forecastContainer = document.getElementById("forecast-container");
//     forecastContainer.innerHTML = "";
//     forecast.slice(1, 6).forEach(day => {
//         let div = document.createElement("div");
//         div.className = "forecast-day";
//         div.innerHTML = `
//             <p>${new Date(day.datetime).toLocaleDateString("en-US", { weekday: 'short' })}</p>
//             <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${day.icon}.png" alt="${day.conditions}">
//             <p>${day.temp}°F</p>
//         `;
//         forecastContainer.appendChild(div);
//     });
// }


function updateForecastUI(forecast) {
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    forecast.slice(1, 6).forEach(day => {
        let div = document.createElement("div");
        div.className = "forecast-day";
        div.innerHTML = `
            <p>${new Date(day.datetime).toLocaleDateString("en-US", { weekday: 'short' })}</p>
            <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${day.icon}.png" alt="${day.conditions}">
            <p class="forecast-temp" data-temp-f="${day.temp}" data-temp-c="${((day.temp - 32) * 5 / 9).toFixed(1)}">${day.temp}°F</p>
        `;
        forecastContainer.appendChild(div);
    });

    // Sync forecast units with selected preference
    if (localStorage.getItem("isCelsius") === "true") {
        convertForecastToCelsius();
    } else {
        convertForecastToFahrenheit();
    }
}


function convertForecastToCelsius() {
    document.querySelectorAll(".forecast-temp").forEach(el => {
        el.textContent = `${el.dataset.tempC}°C`;
    });
}

function convertForecastToFahrenheit() {
    document.querySelectorAll(".forecast-temp").forEach(el => {
        el.textContent = `${el.dataset.tempF}°F`;
    });
}


function enableEdit() {
    document.getElementById("city-input").disabled = false;
    hideError();
}

function showError(message) {
    document.getElementById("error-container").textContent = message;
}

function hideError() {
    document.getElementById("error-container").textContent = "";
}


document.addEventListener("DOMContentLoaded", () => {
    console.log("Script is running!");

    const toggleButton = document.createElement("button");
    toggleButton.id = "dark-mode-toggle";
    toggleButton.textContent = "🌙";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "20px";
    toggleButton.style.right = "20px";
    toggleButton.style.width = "40px";
    toggleButton.style.height = "40px";
    toggleButton.style.borderRadius = "50%";
    toggleButton.style.background = "black";
    toggleButton.style.color = "white";
    toggleButton.style.border = "none";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.display = "flex";
    toggleButton.style.alignItems = "center";
    toggleButton.style.justifyContent = "center";
    toggleButton.style.fontSize = "18px";
    toggleButton.style.transition = "opacity 0.3s ease-in-out";
    toggleButton.style.opacity = "0"; // Start hidden

    document.body.appendChild(toggleButton);

    const widget = document.querySelector(".widget");

    if (!widget) {
        console.error("Widget not found!");
        return;
    }

    if (localStorage.getItem("darkMode") === "enabled") {
        widget.classList.add("dark-mode");
    }

    toggleButton.addEventListener("click", () => {
        widget.classList.toggle("dark-mode");

        if (widget.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // Handle cursor proximity
    document.addEventListener("mousemove", (event) => {
        const buttonRect = toggleButton.getBoundingClientRect();
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        const distance = Math.sqrt(
            Math.pow(cursorX - (buttonRect.left + buttonRect.width / 2), 2) +
            Math.pow(cursorY - (buttonRect.top + buttonRect.height / 2), 2)
        );

        // Show button if cursor is within 100px, hide otherwise
        if (distance < 100) {
            toggleButton.style.opacity = "1";
        } else {
            toggleButton.style.opacity = "0";
        }
    });
});
//Converts Farenheit to Celcius Vice Versa
// document.getElementById("temp-unit").addEventListener("click", () => {
//     let tempElement = document.getElementById("temperature");
//     let tempUnit = document.getElementById("temp-unit");

//     let currentTemp = parseFloat(tempElement.textContent);
//     let isCelsius = localStorage.getItem("isCelsius") === "true";

//     if (isCelsius) {
//         // Convert to Fahrenheit
//         tempElement.textContent = ((currentTemp * 9) / 5 + 32).toFixed(1);
//         tempUnit.textContent = "°F";
//         localStorage.setItem("isCelsius", "false");
//     } else {
//         // Convert to Celsius
//         tempElement.textContent = ((currentTemp - 32) * 5 / 9).toFixed(1);
//         tempUnit.textContent = "°C";
//         localStorage.setItem("isCelsius", "true");
//     }
// });

document.getElementById("temp-unit").addEventListener("click", () => {
    let isCelsius = localStorage.getItem("isCelsius") === "true";

    isCelsius = !isCelsius;
    localStorage.setItem("isCelsius", isCelsius.toString());

    // Update current temperature
    const tempElement = document.getElementById("temperature");
    const tempUnit = document.getElementById("temp-unit");

    const displayTemp = isCelsius
        ? ((originalCurrentTempF - 32) * 5 / 9).toFixed(1)
        : originalCurrentTempF.toFixed(1);

    tempElement.textContent = displayTemp;
    tempUnit.textContent = isCelsius ? "°C" : "°F";

    // Also update forecast
    const forecast = JSON.parse(localStorage.getItem("weatherData"))?.[localStorage.getItem("city")]?.days;
    if (forecast) updateForecastUI(forecast);
});










//     console.log("Script is running!"); // Debugging check

//     const toggleButton = document.createElement("button");
//     toggleButton.id = "dark-mode-toggle";
//     toggleButton.textContent = "🌙";
//     toggleButton.style.position = "fixed";
//     toggleButton.style.bottom = "20px";
//     toggleButton.style.right = "20px";
//     toggleButton.style.width = "40px";
//     toggleButton.style.height = "40px";
//     toggleButton.style.borderRadius = "50%";
//     toggleButton.style.background = "black";
//     toggleButton.style.color = "white";
//     toggleButton.style.border = "none";
//     toggleButton.style.cursor = "pointer";
//     toggleButton.style.display = "flex";
//     toggleButton.style.alignItems = "center";
//     toggleButton.style.justifyContent = "center";
//     toggleButton.style.fontSize = "18px";
//     toggleButton.style.transition = "background 0.3s, color 0.3s";

//     document.body.appendChild(toggleButton);

//     const widget = document.querySelector(".widget");

//     if (!widget) {
//         console.error("Widget not found!");
//         return;
//     }

//     // Load dark mode state
//     if (localStorage.getItem("darkMode") === "enabled") {
//         widget.classList.add("dark-mode");
//     }

//     toggleButton.addEventListener("click", () => {
//         widget.classList.toggle("dark-mode");

//         if (widget.classList.contains("dark-mode")) {
//             localStorage.setItem("darkMode", "enabled");
//         } else {
//             localStorage.setItem("darkMode", "disabled");
//         }
//     });
// });