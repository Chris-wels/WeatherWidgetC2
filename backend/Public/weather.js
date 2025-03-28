
     let timer;
     const cacheDuration = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
     const maxCities = 5; // Limit of  cities
 
    //  window.onload = function() {
    //      const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
    //      const savedCity = localStorage.getItem("city");
    //      const cachedWeather = JSON.parse(localStorage.getItem("weatherData"));
    //      const cachedTimestamp = localStorage.getItem("weatherTimestamp");
        
        
        
    //      console.log("🎉 Loaded weather widget!");
 
    //      if (savedCities.length > 0) {
    //          console.log(`📍 Cached cities: ${savedCities.join(", ")}`);
    //      }
 
    //      if (savedCity) {
    //          document.getElementById("city-input").value = savedCity.toLowerCase();  // Normalize the city input
    //          if (cachedWeather && cachedTimestamp && (Date.now() - cachedTimestamp) < cacheDuration) {
    //              console.log("🔄 Using cached weather data...");
    //              updateWeatherUI(cachedWeather);
    //          } else {
    //              console.log("🔄 Fetching new weather data...");
    //              fetchWeatherByCity(true);
    //          }
    //      }
    //  };
 
    //  function fetchWeatherByCity(isReload = false) {
    //      let city = document.getElementById("city-input").value.trim().toLowerCase();  // Normalize city input for consistency
    //      if (!city) {
    //          showError("❌ Please enter a city.");
    //          console.log("❌ Error: City input is empty.");
    //          return;
    //      }
 
    //      console.log(`🌍 Fetching weather data for city: ${city}`);
 
    //      localStorage.setItem("city", city);
 
    //  //  fetch(`http://localhost:5503/api/weather?city=${city}`)
    //   fetch(`/api/weather?city=${city}`)
   

    //          .then(response => {
    //              if (!response.ok) {
    //                  console.log(`❌ Error response: ${response.status} ${response.statusText}`);
    //                  throw new Error("City not found or API request failed.");
    //              }
    //              return response.json();
    //          })
    //          .then(data => {
    //              if (data.error) {
    //                  showError("❌ City not found. Please check the city name.");
    //                  console.log("❌ API error:", data.error.message);
    //                  return;
    //              }
 
    //              // Normalize city name for cache comparison
    //              let savedCities = JSON.parse(localStorage.getItem("cities")) || [];
    //              let normalizedCity = city.toLowerCase();
 
    //              if (!savedCities.includes(normalizedCity)) {
    //                  if (savedCities.length >= maxCities) {
    //                      savedCities.shift(); // Remove the oldest city if more than 3 cities
    //                      console.log("⚡ Removed oldest city to make space.");
    //                  }
    //                  savedCities.push(normalizedCity);
    //                  localStorage.setItem("cities", JSON.stringify(savedCities));
    //                  console.log(`✅ Cached city: ${city}`);
    //              } else {
    //                  console.log(`🔁 Using cached weather data for city: ${city}`);
    //              }
 
    //              localStorage.setItem("weatherData", JSON.stringify(data));
    //              localStorage.setItem("weatherTimestamp", Date.now());
    //              updateWeatherUI(data);
    //              hideError();
    //              console.log("✅ Weather data fetched successfully:", data);
    //          })
    //          .catch(error => {
    //              showError("❌ Could not find location.");
    //              console.error("❌ Weather fetch error:", error);
    //          });
    //  }
 
    //  function updateWeatherUI(data) {
    //      document.getElementById("city-name").textContent = data.location.name;
    //      document.getElementById("temperature").textContent = data.current.temp_c;
    //      document.getElementById("weather-condition").textContent = data.current.condition.text;
    //      document.getElementById("weather-icon").src = `https:${data.current.condition.icon}`;
 
    //      if (timer) clearInterval(timer);
    //      updateRealTime(data.location.tz_id);
    //      timer = setInterval(() => updateRealTime(data.location.tz_id), 1000); 
    //      updateForecastUI(data.forecast.forecastday);
    //      document.getElementById("city-input").disabled = true;
    //  }
 
     
    //  function updateRealTime(timezone) {
    //      let now = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    //      document.getElementById("local-time").textContent = now.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
    //      document.getElementById("local-date").textContent = now.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    //  }
 
    //  function updateForecastUI(forecast) {
    //      const forecastContainer = document.getElementById("forecast-container");
    //      forecastContainer.innerHTML = "";
    //      let today = new Date().getDate();
    //      forecast.forEach(day => {
    //          let forecastDate = new Date(day.date).getDate();
    //          if (forecastDate >= today) {
    //              let div = document.createElement("div");
    //              div.className = "forecast-day";
    //              div.innerHTML = `
    //                  <p>${new Date(day.date).toLocaleDateString("en-US", { weekday: 'short' })}</p>
    //                  <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
    //                  <p>${day.day.avgtemp_c}°C</p>
    //              `;
    //              forecastContainer.appendChild(div);
    //          }
    //      });
    //  }
 
    //  function enableEdit() {
    //      document.getElementById("city-input").disabled = false;
    //      hideError();
    //  }
 
    //  function showError(message) {
    //      document.getElementById("error-container").textContent = message;
    //  }
 
    //  function hideError() {
    //      document.getElementById("error-container").textContent = "";
    //  }
    //  document.addEventListener("DOMContentLoaded", () => {
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
    //     document.addEventListener("mousemove", (event) => {
    //         const buttonRect = toggleButton.getBoundingClientRect();
    //         const cursorX = event.clientX;
    //         const cursorY = event.clientY;
    
    //         const distance = Math.sqrt(
    //             Math.pow(cursorX - (buttonRect.left + buttonRect.width / 2), 2) +
    //             Math.pow(cursorY - (buttonRect.top + buttonRect.height / 2), 2)
    //         );
    
    //         // Show button if cursor is within 100px, hide otherwise
    //         if (distance < 100) {
    //             toggleButton.style.opacity = "1";
    //         } else {
    //             toggleButton.style.opacity = "0";
    //         }
    //     });
    // });

    
    window.onload = function() {
        const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
        const savedCity = localStorage.getItem("city");
        const cachedWeather = JSON.parse(localStorage.getItem("weatherData"));
        const cachedTimestamp = localStorage.getItem("weatherTimestamp");
        
        console.log("🎉 Loaded weather widget!");
    
        if (savedCities.length > 0) {
            console.log(`📍 Cached cities: ${savedCities.join(", ")}`);
        }
    
        if (savedCity) {
            document.getElementById("city-input").value = savedCity.toLowerCase();  // Normalize the city input
            
            // Check if the cache exists and is still valid
            if (cachedWeather && cachedTimestamp && (Date.now() - cachedTimestamp) < cacheDuration) {
                console.log("🔄 Using cached weather data...");
                updateWeatherUI(cachedWeather);
            } else {
                console.log("🔄 Fetching new weather data...");
                fetchWeatherByCity(); // Fetch new weather data when the cache is invalid
            }
        }
    };
    
    function fetchWeatherByCity(isReload = false) {
        let city = document.getElementById("city-input").value.trim().toLowerCase();  // Normalize city input for consistency
        if (!city) {
            showError("❌ Please enter a city.");
            console.log("❌ Error: City input is empty.");
            return;
        }
    
        console.log(`🌍 Fetching weather data for city: ${city}`);
    
        localStorage.setItem("city", city);
    
        fetch(`/api/weather?city=${city}`)
            .then(response => {
                if (!response.ok) {
                    console.log(`❌ Error response: ${response.status} ${response.statusText}`);
                    throw new Error("City not found or API request failed.");
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    showError("❌ City not found. Please check the city name.");
                    console.log("❌ API error:", data.error.message);
                    return;
                }
    
                let savedCities = JSON.parse(localStorage.getItem("cities")) || [];
                let normalizedCity = city.toLowerCase();
    
                if (!savedCities.includes(normalizedCity)) {
                    if (savedCities.length >= maxCities) {
                        savedCities.shift(); // Remove the oldest city if more than 3 cities
                        console.log("⚡ Removed oldest city to make space.");
                    }
                    savedCities.push(normalizedCity);
                    localStorage.setItem("cities", JSON.stringify(savedCities));
                    console.log(`✅ Cached city: ${city}`);
                } else {
                    console.log(`🔁 Using cached weather data for city: ${city}`);
                }
    
                localStorage.setItem("weatherData", JSON.stringify(data));
                localStorage.setItem("weatherTimestamp", Date.now());
                updateWeatherUI(data);
                hideError();
                console.log("✅ Weather data fetched successfully:", data);
            })
            .catch(error => {
                showError("❌ Could not find location.");
                console.error("❌ Weather fetch error:", error);
            });
    }
    
    

// Update UI with current weather and 7-day forecast
function updateWeatherUI(data) {
    // Update current weather
    const currentWeather = data.current;
    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.innerHTML = `
        <h2>Current Weather in ${data.location.name}</h2>
        <p>Temperature: ${currentWeather.temp}°C</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>Condition: ${currentWeather.weather[0].description}</p>
        <p>Wind: ${currentWeather.wind_speed} km/h</p>
    `;
    
    // Update 7-day forecast
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "<h3>7-Day Forecast</h3>";
    
    data.forecast.forecastday.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("forecast-day");
        dayElement.innerHTML = `
            <p><strong>${new Date(day.date).toLocaleDateString()}</strong></p>
            <p>Max Temp: ${day.day.maxtemp_c}°C | Min Temp: ${day.day.mintemp_c}°C</p>
            <p>Condition: ${day.day.condition.text}</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

// Show an error message if the city is not found or other issues occur
function showError(message) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.textContent = message;
    errorContainer.style.display = "block";
}

// Hide the error message
function hideError() {
    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "none";
}