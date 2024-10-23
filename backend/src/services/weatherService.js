const axios = require('axios');
const mongoose = require('mongoose');
const { convertTemperature } = require('../utils/temperatureConversion');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));



const summarySchema = new mongoose.Schema({
    city: String,
    maxTemp: Number,
    minTemp: Number,
    currentTemp: Number,
    humidity: Number,
    windSpeed: Number,
    condition: String,
    dominantCondition: String,
    reason: String,
    date: { type: Date, default: Date.now }
});

const Summary = mongoose.model('Summary', summarySchema);

const fetchWeatherData = async () => {
    const cities = ['Delhi,IN', 'Mumbai,IN', 'Chennai,IN', 'Bangalore,IN', 'Kolkata,IN', 'Hyderabad,IN'];
    const responses = await Promise.all(cities.map(city => axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: process.env.OPENWEATHERMAP_API_KEY,
            units: 'metric' 
        }
    })));
    console.log('Weather Data:', responses.map(res => res.data)); 
    return responses.map(response => response.data);
};

const fetchDailySummary = async (scale = 'Celsius') => {
    const data = await fetchWeatherData();
    const summary = data.map(cityData => {
        const maxTemp = convertTemperature(cityData.main.temp_max + 273.15, scale);
        const minTemp = convertTemperature(cityData.main.temp_min + 273.15, scale);
        const currentTemp = convertTemperature(cityData.main.temp + 273.15, scale); 

        let dominantCondition;
        let reason;
        if (aggregateTemp > 26) {
            dominantCondition = 'Sunny';
            reason = 'The aggregate temperature > 26';
        } else {
            dominantCondition = 'Cloudy';
            reason = 'The aggregate temperature < 26';
        }

        return {
            city: cityData.name,
            maxTemp,
            minTemp,
            currentTemp,
            humidity: cityData.main.humidity,
            windSpeed: cityData.wind.speed,
            condition: cityData.weather[0].main,
            dominantCondition,
            reason
        };
    });
    console.log('Summary:', summary); 
    return summary;
};

const saveSummariesToDB = async (summaries) => {
    try {
        console.log('Data to be saved:', summaries); 
        const result = await Summary.insertMany(summaries);
        console.log('Summaries saved to DB:', result); 
    } catch (error) {
        console.error('Error saving summaries to DB:', error);
    }
};

let thresholdChecks = {}; 

const trackThreshold = async (city, threshold, scale = 'Celsius') => {
    const weatherData = await fetchWeatherData();
    const cityData = weatherData.find(data => data.name.toLowerCase() === city.toLowerCase());
    
    if (!cityData) {
        return { message: 'City not found' };
    }

    const currentTemp = convertTemperature(cityData.main.temp + 273.15, scale);
    console.log(`Current Temp: ${currentTemp}, Threshold: ${threshold}`);

    if (!thresholdChecks[city]) {
        thresholdChecks[city] = 0;
    }

   
    if (currentTemp > threshold) {
        thresholdChecks[city]++;
        
        if (thresholdChecks[city] >= 2) {
            console.log(`Threshold exceeded for ${city}. Current temperature: ${currentTemp}`);
            thresholdChecks[city] = 0; 
            return { message: `Threshold exceeded for ${city}. Alert triggered.` };
        } else {
            console.log(`Temperature exceeded the threshold once. No alert yet.`);
        }
    } else {
        
        thresholdChecks[city] = 0;
        console.log(`Temperature for ${city} is below the threshold.`);
    }

    return { message: `Current temperature for ${city} is ${currentTemp} ${scale}` };
};

module.exports = {
    fetchDailySummary,
    saveSummariesToDB,
    trackThreshold
};
