require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron'); 
const weatherRoutes = require('./routes/weatherRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const weatherService = require('./services/weatherService');

app.use(cors());
app.use(express.json());
app.use('/api/weather', weatherRoutes);
app.get('/', (req, res) => {
    res.send('Weather Monitoring Backend');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const storeSummaries = async () => {
    const summaries = await weatherService.fetchDailySummary();
    console.log('Fetched summaries:', summaries); 
    await weatherService.saveSummariesToDB(summaries);
    console.log('Stored initial summaries');
};


cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task to store daily summaries');
    const summaries = await weatherService.fetchDailySummary();
    console.log('Fetched summaries for schedule:', summaries); 
    await weatherService.saveSummariesToDB(summaries);
});

storeSummaries(); 
