import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "API Key is missing from .env file" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url); // Built-in in Node v24
        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json(data);
        }
        
        res.json(data);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Middleman is active at http://localhost:${PORT}`);
});