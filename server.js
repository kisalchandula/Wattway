const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Open Charge Map API key
const API_KEY = ''; // Replace with your actual API key

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Charging Stations API!');
});

// Endpoint to handle incoming queries based on bounding box
app.get('/query', async (req, res) => {
    const { swLat, swLon, neLat, neLon } = req.query;

    // Check if all parameters are present
    if (!swLat || !swLon || !neLat || !neLon) {
        return res.status(400).send('Missing required parameters: swLat, swLon, neLat, neLon'); // Bad Request
    }

    console.log("Received bounding box query:", swLat, swLon, neLat, neLon);

    // Constructing the API URL using bounding box parameters
    const apiUrl = `https://api.openchargemap.io/v3/poi?key=${API_KEY}&boundingbox=(${swLat},${swLon}),(${neLat},${neLon})&maxresults=500`;

    try {
        // Fetch data from Open Charge Map API
        const response = await axios.get(apiUrl);
        console.log("Response from Open Charge Map API:", response.data); // Log full response
        
        // Extract relevant information about each charging point based on your requirements.
        const chargingPoints = response.data.map(station => ({
            userComments: station.UserComments ? station.UserComments.map(comment => ({
                Comment: comment.Comment,
                DateCreated: comment.DateCreated,
            })) : [],
            dateLastVerified: station.DateLastVerified || "Not available",
            usageCost: station.UsageCost || "Not specified",
            addressInfo: {
                AddressLine1: station.AddressInfo?.AddressLine1 || "Not specified",
                AddressLine2: station.AddressInfo?.AddressLine2 || "",
                Town: station.AddressInfo?.Town || "Not specified",
                StateOrProvince: station.AddressInfo?.StateOrProvince || "Not specified",
                Postcode: station.AddressInfo?.Postcode || "Not specified",
                Country: station.AddressInfo?.Country?.Title || "Not specified",
                Latitude: station.AddressInfo?.Latitude || 0,
                Longitude: station.AddressInfo?.Longitude || 0,
                AccessComments: station.AddressInfo?.AccessComments || "",
                Title: station.AddressInfo?.Title || "Not specified",
            },
            connections: station.Connections ? station.Connections.map(connection => ({
                ConnectionType: {
                    FormalName: connection.ConnectionType?.FormalName || "Not specified",
                    IsDiscontinued: connection.ConnectionType?.IsDiscontinued || false,
                    Title: connection.ConnectionType?.Title || "Not specified",
                    ConnectionTypeID: connection.ConnectionType?.ID || null
                },
                StatusType: {
                    IsOperational: connection.StatusType?.IsOperational || false,
                    IsUserSelectable: connection.StatusType?.IsUserSelectable || false,
                    Title: connection.StatusType?.Title || "Not specified",
                },
                LevelID: connection.LevelID || 0, // Keep LevelID for reference
                Level: {
                    Title: connection.Level?.Title || "Not specified",
                    IsFastChargeCapable: connection.Level?.IsFastChargeCapable || false,
                    Comments: connection.Level?.Comments || "",
                },
                PowerKW: connection.PowerKW !== null ? connection.PowerKW : "Data not available", // Extract directly
                CurrentType: {
                    Title: connection.CurrentType?.Title || "Not specified",
                    Description: connection.CurrentType?.Description || "",
                    ID: connection.CurrentType?.ID || null,
                },
            })) : [],
            
            numberOfPoints: station.NumberOfPoints || 0,
            generalComments: station.GeneralComments || "",
            dateLastConfirmed: station.DateLastConfirmed || "Not available",
            dateLastStatusUpdate: station.DateLastStatusUpdate || "Not available",
            operatorInfo: {
                WebsiteURL: station.OperatorInfo?.WebsiteURL || "",
                PhonePrimaryContact: station.OperatorInfo?.PhonePrimaryContact || "",
            },
            usageType: {
                IsPayAtLocation: station.UsageType?.IsPayAtLocation || false,
                IsMembershipRequired: station.UsageType?.IsMembershipRequired || false,
                IsAccessKeyRequired: station.UsageType?.IsAccessKeyRequired || false,
                Title: station.UsageType?.Title || "Not specified",
            },
            statusType: {
                IsOperational: station.StatusType?.IsOperational || false,
                IsUserSelectable: station.StatusType?.IsUserSelectable || false,
                Title: station.StatusType?.Title || "Not specified",
            },
            submissionStatus : {
                Title : station.SubmissionStatus.Title || "",
                IsLive : station.SubmissionStatus.IsLive || false 
            }
        }));

        // Send back the extracted data to the client
        res.json(chargingPoints);
    } catch (error) {
        console.error('Error fetching data from Open Charge Map API:', error);
        res.status(500).send('Error fetching data from Open Charge Map API');
        console.log("Processed Charging Points:", JSON.stringify(chargingPoints, null, 2));

    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
