const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        // We now call OUR server instead of OpenWeather
        // The Middleman is running on port 3000
        const response = await fetch(`http://localhost:3000/weather?city=${city}`);
        const data = await response.json();

        if (response.ok) {
            // Show the weather info panel
            weatherInfo.style.display = "block";
            
            // Update the UI with data from our middleman
            document.getElementById('city-name').innerText = data.name;
            document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById('desc').innerText = data.weather[0].description;
        } else {
            alert("City not found or server error.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to the Middleman. Make sure server.js is running!");
    }
});