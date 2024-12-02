const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

// FastAPI server URL (update with your actual FastAPI server URL and port)
const FASTAPI_URL = 'http://127.0.0.1:8000/predict';

// Example parameters for the solar power prediction
const exampleParameters = [1.8, 30.0, 233.0, 15.6, 50.0, 12.0, 0.0, 4.0, 10.0, 16.0, 289.0, 42.0, 2017.0];

// Define a GET route to call the FastAPI endpoint
app.get('/get-prediction', async (req, res) => {
    try {
        // Make a POST request to FastAPI with the example input
        const response = await axios.post(FASTAPI_URL, {
            parameters: exampleParameters,
        });

        // Send the prediction response back to the client
        res.json({
            prediction: response.data.prediction,
        });
    } catch (error) {
        console.error('Error calling FastAPI:', error.message);
        res.status(500).json({
            error: 'Failed to get prediction from FastAPI',
        });
    }
});


// Start the Node.js server
app.listen(port, () => {
    console.log(`Node.js server is running on http://localhost:${port}`);
});
