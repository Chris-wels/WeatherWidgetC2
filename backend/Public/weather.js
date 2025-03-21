
     let timer;
     const cacheDuration = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
     const maxCities = 5; // Limit of  cities
     
     window.onload = function() {
        //const darkModeToggle = document.getElementById("dark-mode-toggle");
         const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
         const savedCity = localStorage.getItem("city");
         const cachedWeather = JSON.parse(localStorage.getItem("weatherData"));
         const cachedTimestamp = localStorage.getItem("weatherTimestamp");
        
         document.addEventListener("DOMContentLoaded", () => {
            const darkModeToggle = document.getElementById("dark-mode-toggle");
        
            if (!darkModeToggle) {
                console.error("Dark mode button not found!");
                return;
            }
        
            function toggleDarkMode() {
                document.body.classList.toggle("dark-mode");
        
                if (document.body.classList.contains("dark-mode")) {
                    localStorage.setItem("darkMode", "enabled");
                    darkModeToggle.innerHTML = "Light Mode";
                } else {
                    localStorage.removeItem("darkMode");
                    darkModeToggle.innerHTML = "Dark Mode";
                }
            }
        
            darkModeToggle.addEventListener("click", toggleDarkMode);
        
            if (localStorage.getItem("darkMode") === "enabled") {
                document.body.classList.add("dark-mode");
                darkModeToggle.innerHTML = "Light Mode";
            } else {
                darkModeToggle.innerHTML = "Dark Mode";
            }
        });





         document.addEventListener("DOMContentLoaded", () => {
            const darkModeToggle = document.getElementById("dark-mode-toggle");
        
            if (!darkModeToggle) {
                console.error("Dark mode button not found!");
                return;
            }
        
            // Function to toggle dark mode
            function toggleDarkMode() {
                document.body.classList.toggle("dark-mode");
        
                if (document.body.classList.contains("dark-mode")) {
                    localStorage.setItem("darkMode", "enabled");
                    darkModeToggle.innerHTML = "Light Mode";
                } else {
                    localStorage.removeItem("darkMode");
                    darkModeToggle.innerHTML = "Dark Mode";
                }
            }
        
            darkModeToggle.addEventListener("click", toggleDarkMode);
        
            // Keep dark mode enabled on page reload
            if (localStorage.getItem("darkMode") === "enabled") {
                document.body.classList.add("dark-mode");
                darkModeToggle.innerHTML = "Light Mode";
            } else {
                darkModeToggle.innerHTML = "Dark Mode";
            }
        });
        // Load dark mode preference when the page loads
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
        }
         console.log("🎉 Loaded weather widget!");
 
         if (savedCities.length > 0) {
             console.log(`📍 Cached cities: ${savedCities.join(", ")}`);
         }
 
         if (savedCity) {
             document.getElementById("city-input").value = savedCity.toLowerCase();  // Normalize the city input
             if (cachedWeather && cachedTimestamp && (Date.now() - cachedTimestamp) < cacheDuration) {
                 console.log("🔄 Using cached weather data...");
                 updateWeatherUI(cachedWeather);
             } else {
                 console.log("🔄 Fetching new weather data...");
                 fetchWeatherByCity(true);
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
 
     //  fetch(`http://localhost:5503/api/weather?city=${city}`)
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
 
                 // Normalize city name for cache comparison
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
 
     function updateWeatherUI(data) {
         document.getElementById("city-name").textContent = data.location.name;
         document.getElementById("temperature").textContent = data.current.temp_c;
         document.getElementById("weather-condition").textContent = data.current.condition.text;
         document.getElementById("weather-icon").src = `https:${data.current.condition.icon}`;
 
         if (timer) clearInterval(timer);
         updateRealTime(data.location.tz_id);
         timer = setInterval(() => updateRealTime(data.location.tz_id), 1000); 
         updateForecastUI(data.forecast.forecastday);
         document.getElementById("city-input").disabled = true;
     }
 
     function updateRealTime(timezone) {
         let now = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
         document.getElementById("local-time").textContent = now.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
         document.getElementById("local-date").textContent = now.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
     }
 
     function updateForecastUI(forecast) {
         const forecastContainer = document.getElementById("forecast-container");
         forecastContainer.innerHTML = "";
         let today = new Date().getDate();
         forecast.forEach(day => {
             let forecastDate = new Date(day.date).getDate();
             if (forecastDate >= today) {
                 let div = document.createElement("div");
                 div.className = "forecast-day";
                 div.innerHTML = `
                     <p>${new Date(day.date).toLocaleDateString("en-US", { weekday: 'short' })}</p>
                     <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                     <p>${day.day.avgtemp_c}°C</p>
                 `;
                 forecastContainer.appendChild(div);
             }
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
     
   

