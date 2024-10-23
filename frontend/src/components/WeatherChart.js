import React from 'react';
import { Bar } from 'react-chartjs-2';

const WeatherChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.city),
        datasets: [
            {
                label: 'Max Temp',
                backgroundColor: 'rgba(75,192,192,0.4)',
                data: data.map(d => d.maxTemp)
            },
            {
                label: 'Min Temp',
                backgroundColor: 'rgba(153,102,255,0.4)',
                data: data.map(d => d.minTemp)
            },
            {
                label: 'Aggregate Temp',
                backgroundColor: 'rgba(255,159,64,0.4)',
                data: data.map(d => (d.maxTemp + d.minTemp)/2)
            }
        ]
    };

    return (
        <div>
            <Bar data={chartData} />
        </div>
    );
};

export default WeatherChart;
