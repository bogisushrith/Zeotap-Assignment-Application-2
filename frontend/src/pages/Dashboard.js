import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import WeatherChart from '../components/WeatherChart';

const Dashboard = () => {
    const [weatherSummaries, setWeatherSummaries] = useState([]);
    const [tempScale, setTempScale] = useState('Celsius');
    const [userCity, setUserCity] = useState('');
    const [thresholdTemp, setThresholdTemp] = useState('');
    const [exceedsThresholdChecks, setExceedsThresholdChecks] = useState([false, false]); 

    const fetchWeatherSummaries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/weather/summary?scale=${tempScale}`);
            setWeatherSummaries(response.data);

            
            const currentWeather = response.data.find(summary => summary.city === userCity);
            if (currentWeather) {
                const currentTemp = currentWeather.currentTemp; 
                const isExceedingThreshold = currentTemp > thresholdTemp;

               
                setExceedsThresholdChecks(prevChecks => {
                    const newChecks = [...prevChecks.slice(1), isExceedingThreshold];

                    
                    if (newChecks[0] && newChecks[1]) {
                        console.log(`Alert! Current Temp: ${currentTemp}, Threshold: ${thresholdTemp}`);
                    }
                    return newChecks; 
                });
            }
        } catch (error) {
            console.error('Error fetching weather summaries:', error);
        }
    };

    useEffect(() => {
       
        fetchWeatherSummaries();
        const interval = setInterval(fetchWeatherSummaries, 300000); 

        return () => clearInterval(interval);
    }, [tempScale, userCity]); 

    const handleThresholdCheck = () => {
        
        setExceedsThresholdChecks([false, false]); 
        fetchWeatherSummaries(); 
    };

    return (
        <div className="container">
            <h1>Weather Monitoring Dashboard</h1>

            <div>
                <label htmlFor="temp-scale">Choose Temperature Scale: </label>
                <select id="temp-scale" value={tempScale} onChange={(e) => setTempScale(e.target.value)}>
                    <option value="Celsius">Celsius</option>
                    <option value="Fahrenheit">Fahrenheit</option>
                    <option value="Kelvin">Kelvin</option>
                </select>

                <div>
                    <label>User City: </label>
                    <input type="text" value={userCity} onChange={(e) => setUserCity(e.target.value)} />
                    <label>Threshold Temperature: </label>
                    <input type="number" value={thresholdTemp} onChange={(e) => setThresholdTemp(e.target.value)} />
                    <button onClick={handleThresholdCheck}>Set Threshold</button>
                </div>
            </div>

            {weatherSummaries.length > 0 ? (
                <>
                    {weatherSummaries.map((summary, index) => (
                        <WeatherCard key={index} summary={summary} scale={tempScale} />
                    ))}
                    <h2>Daily Weather Summary</h2>
                    <WeatherChart data={weatherSummaries} />
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default Dashboard;
