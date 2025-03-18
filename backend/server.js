
const path = require('path');
const express = require('express');
//const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5503;  // Use Render's port in production, default to 5503 locally


// app.use(cors({

// })); // Allow frontend to access backend

// Serve static files from the 'public' folder
//app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.static(path.resolve(__dirname, 'Public')));

// Weather API route
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: 'City is required' });

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));







