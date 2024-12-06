// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13); // Initial view at coordinates (London)

// Tile layer for the map background
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example data for charging stations (replace with actual API response)
const chargingStations = [
    {
        lat: 52.343197,
        lon: -0.170632,
        title: 'Charging Station 1'
    },
    {
        lat: 51.505,
        lon: -0.09,
        title: 'Charging Station 2'
    }
];

// Add markers for each charging station
chargingStations.forEach(station => {
    L.marker([station.lat, station.lon])
        .addTo(map)
        .bindPopup(station.title);
});

// Fetching data from Open Charge Map API (replace 'your_api_key' with your actual API key)
fetch('https://api.openchargemap.io/v3/poi?key=your_api_key&countrycode=GB') // Use correct endpoint and API key
    .then(response => response.json())
    .then(data => {
        data.forEach(station => {
            const lat = station.AddressInfo.Latitude;
            const lon = station.AddressInfo.Longitude;
            const title = station.AddressInfo.Title;

            L.marker([lat, lon])
                .addTo(map)
                .bindPopup(title);
        });
    })
    .catch(error => console.error('Error fetching charging stations:', error));
