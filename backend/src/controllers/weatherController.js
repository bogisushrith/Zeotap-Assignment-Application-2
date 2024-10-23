const weatherService = require('../services/weatherService');

exports.getWeatherSummary = async (req, res) => {
    try {
        const { scale } = req.query;
        const summary = await weatherService.fetchDailySummary(scale);
        console.log('Summary:', summary); 
        
        if (summary && summary.length > 0) {
            res.json(summary);
        } else {
            res.status(404).json({ message: 'No data available' });
        }
    } catch (error) {
        console.error('Error fetching weather summary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.checkThreshold = async (req, res) => {
    try {
        const { userCity, thresholdTemp, scale } = req.body;
        
        if (!userCity || !thresholdTemp) {
            return res.status(400).json({ message: 'City and threshold temperature are required' });
        }
        
        const result = await weatherService.trackThreshold(userCity, thresholdTemp, scale || 'Celsius');
    
        res.json(result);
    } catch (error) {
        console.error('Error checking threshold:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
