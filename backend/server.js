// Load environment variables from the .env file
require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch"); // Import node-fetch correctly
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5503;

// Log the API key to check if it's being read correctly
const apiKey = process.env.VISUAL_API_KEY;
console.log("API Key:", apiKey);  // Should log your actual API key

// Serve static files from the "public" directory
app.use(express.static(path.resolve(__dirname, "Public")));

// API endpoint to fetch weather data based on city
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;

  if (!apiKey) {
    // API Key is missing
    return res.status(500).json({ error: "API Key not found in environment variables" });
  }

  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;

  console.log("API URL:", apiUrl);  // Log full API URL for debugging

  try {
    // Make sure node-fetch is being used correctly
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong with the weather API.");
    }

    res.json(data);  // Send the weather data back
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: error.message });
  }
});

// Serve the main HTML file for the frontend
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Public", "weatherAPI2.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const fetch = require('node-fetch');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const PORT = process.env.PORT || 5503;
// const API_KEY = process.env.WEATHER_API_KEY;

// app.get('/api/weather', async (req, res) => {
//     const city = req.query.city;
//     if (!city) {
//         return res.status(400).json({ error: 'City parameter is required' });
//     }

//     try {
//         const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current,forecast&key=${API_KEY}&contentType=json`);
//         if (!response.ok) {
//             throw new Error(`API error: ${response.statusText}`);
//         }

//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.listen(PORT, 'localhost', () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


// const path = require('path');
// const express = require('express');
// //const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5503;  // Use Render's port in production, default to 5503 locally


// // app.use(cors({

// // })); // Allow frontend to access backend
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'Public', 'weatherAPI2.html'));
// });
// // Serve static files from the 'public' folder
// //app.use(express.static(path.join(__dirname, 'Public')));
// app.use(express.static(path.resolve(__dirname, 'Public')));

// // Weather API route
// app.get('/api/weather', async (req, res) => {
//     const city = req.query.city;
//     if (!city) return res.status(400).json({ error: 'City is required' });

//     try {
//         const apiKey = process.env.WEATHER_API_KEY;
//         const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=${apiKey}`);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         res.status(500).json({ error: 'Failed to fetch weather data' });
//     }
// });

// // Start server
// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));







