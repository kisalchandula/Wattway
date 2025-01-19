require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json());

// POST endpoint: Get charging stations near a given location
app.post("/api/charging-stations", async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        // Fetch charging stations from OpenCharge API
        const openChargeApiKey = process.env.OPENCHARGE_API_KEY;
        const response = await axios.get("https://api.openchargemap.io/v3/poi/", {
            params: {
                latitude,
                longitude,
                distance: 10, // 10 km radius
                distanceunit: "KM",
                key: openChargeApiKey,
            },
        });

        // Respond with the fetched data
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
