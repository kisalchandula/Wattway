from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Example data to simulate API response
charging_stations = [
    {
        "id": 1,
        "name": "Station 1",
        "latitude": 49.0069,
        "longitude": 8.4037,
        "address": "Street 1, Karlsruhe",
        "type": "Fast Charging",
        "operator": "Operator A"
    },
    {
        "id": 2,
        "name": "Station 2",
        "latitude": 49.0079,
        "longitude": 8.4047,
        "address": "Street 2, Karlsruhe",
        "type": "Slow Charging",
        "operator": "Operator B"
    }
]

@app.route('/api/charging_stations', methods=['GET'])
def get_charging_stations():
    """
    Endpoint to get charging station data.
    This can be extended to filter by city, type, etc.
    """
    city = request.args.get('city', default='Karlsruhe', type=str)
    
    # For simplicity, this example returns all stations.
    # You can add logic here to filter based on the query parameters.
    return jsonify(charging_stations)

if __name__ == '__main__':
    # Run the server on your local machine (localhost)
    app.run(debug=True, host='0.0.0.0', port=5000)
