// 1. Import the Express library
const express = require('express');
const axios = require('axios'); // Import Axios for making HTTP requests
const cors = require('cors'); // Import CORS for security

// 2. Create an instance of the Express application
const app = express();

// 2.5 Tell Express to use CORS so our React frontend can talk to it
app.use(cors());

// 3. Define the port number our server will listen on
const PORT = 3000;

// 4. Create a "Route" (A doorway for users to request data)
app.get('/', (req, res) => {
    res.send('Hello! This is our LeetCode Stakes Backend!');
});

// 4.5. Create an API Route to fetch LeetCode data
app.get('/api/contests', async (req, res) => {
    try {
        // Reach out to the internet to get contest data
        const response = await axios.get('https://alfa-leetcode-api.onrender.com/contests');
        // Send the data back as JSON
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// 5. Create a dynamic route to get a specific user's LeetCode stats
app.get('/api/user/:username', async (req, res) => {
    try {
        // 📚 Logic: Grab the variable from the URL
        const leetcodeUsername = req.params.username;

        // 📚 Logic: Use string interpolation (backticks) to inject the username into the URL
        const response = await axios.get(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`);

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user stats' });
    }
});

// 6. Start the server and tell it to listen for requests
app.listen(PORT, () => {
    console.log(`Server is running and listening on http://localhost:${PORT}`);
});