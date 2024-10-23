import React from 'react';

const WeatherCard = ({ summary, scale }) => (
    <div className="weather-card">
        <h2>{summary.city} Weather Summary</h2>
        {summary ? (
            <>
                <p>Current Temperature: {summary.currentTemp} {scale}</p>
                <p>Humidity: {summary.humidity}%</p>
                <p>Wind Speed: {summary.windSpeed} m/s</p>
                <p>Condition: {summary.condition}</p>
                <p>Dominant Weather Condition: {summary.dominantCondition}</p>
                <p>Reason: {summary.reason}</p>
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
);

export default WeatherCard;
