# Weather Monitoring System

This project is a Weather Monitoring System that tracks weather data for different cities, allowing users to set temperature thresholds and receive alerts if the threshold is exceeded for two consecutive API calls (10 minutes apart).

## Features
- Fetches live weather data from an API every 5 minutes.
- Stores weather summaries in a MongoDB database every 24 hours.
- Allows users to set a threshold temperature for their city and receive alerts when the current temperature exceeds the threshold for two consecutive API calls.
- Displays weather summaries on a dashboard with support for Celsius, Fahrenheit, and Kelvin temperature scales.

## Dependencies

### Backend
- **Node.js** (v18.12.1)
- **Express** (v4.x)
- **Axios** (v1.x)
- **Mongoose** (v6.x)
- **dotenv** (v16.x)
- **Nodemon** (v2.x) (for development)

### Frontend
- **React** (v18.x)
- **Axios** (v1.x)
- **Chart.js** (v4.x)
- **React Chart.js** (v4.x)

## Setup Instructions

1. **Clone the Repository**

2. **Backend Setup**

   Install the necessary backend dependencies:
   ```bash
   cd backend
   npm install

   Create a .env file in the backend directory and add your MongoDB and Weather API credentials:
   MONGO_URI=your_mongodb_connection_string
   WEATHER_API_KEY=your_weather_api_key

   Start the backend server:
   npm run dev
   
2. **Frontend Setup**
    
    Install the necessary frontend dependencies:
    cd ../frontend
    npm install

    Start the frontend React development server:
    npm start

 
