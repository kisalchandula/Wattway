import requests
import folium
from folium.plugins import MarkerCluster, Search, HeatMap
from geopy.distance import geodesic

# Open Charge Map API base URL and API Key
OCM_API_URL = "https://api.openchargemap.io/v3/poi/"
OCM_API_KEY = "ba1bd022-b56f-496c-82a9-e96542fb6432"  # Replace with your API key

def fetch_charging_stations(city="Karlsruhe", country_code="DE", max_results=50):
    """
    Fetches charging station data for a specific city using the Open Charge Map API.
    """
    params = {
        "key": "ba1bd022-b56f-496c-82a9-e96542fb6432",
        "output": "json",
        "countrycode": "DE",
        "maxresults": "50",
        "city": "Karlsruhe",
    }
    try:
        response = requests.get("https://api.openchargemap.io/v3/poi/", params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"An error occurred while fetching data: {e}")
        return []

def create_interactive_map(stations, city_center_coords=(49.0069, 8.4037), user_location=None, output_file="karlsruhe_map_enhanced.html"):
    """
    Creates an enhanced interactive map using Folium and plots charging stations with clustering, detailed popups,
    a search bar, heatmap, and more.
    """
    # Initialize the map centered on the city
    charging_map = folium.Map(location=city_center_coords, zoom_start=13, tiles="Stamen Terrain")

    # Add a MarkerCluster to the map
    marker_cluster = MarkerCluster().add_to(charging_map)

    # Collect heatmap data
    heat_data = []

    # Add each station to the marker cluster
    for station in stations:
        address_info = station.get("AddressInfo", {})
        name = address_info.get("Title", "Unknown Station")
        address = address_info.get("AddressLine1", "No address provided")
        lat = address_info.get("Latitude")
        lon = address_info.get("Longitude")
        station_type = station.get("Connections", [{}])[0].get("ConnectionType", {}).get("Title", "Unknown Type")
        operator_info = station.get("OperatorInfo")
        operator = operator_info.get("Title", "Unknown Operator") if operator_info else "Unknown Operator"


        if lat and lon:
            heat_data.append((lat, lon))

            # Calculate distance if user location is provided
            distance_info = ""
            if user_location:
                try:
                    distance = geodesic(user_location, (lat, lon)).km
                    distance_info = f"<br>Distance: {distance:.2f} km"
                except ValueError:
                    distance_info = "<br>Distance: Unable to calculate"

            # Add a marker with a detailed popup
            popup_content = (
                f"<strong>{name}</strong><br>"
                f"Address: {address}<br>"
                f"Type: {station_type}<br>"
                f"Operator: {operator}{distance_info}"
            )
            folium.Marker(
                location=(lat, lon),
                popup=folium.Popup(popup_content, max_width=300),
                icon=folium.Icon(color="green", icon="bolt", prefix="fa")
            ).add_to(marker_cluster)

    # Add heatmap layer if any data available
    if heat_data:
        HeatMap(heat_data).add_to(charging_map)

    # Add a search bar to search for stations by name
    Search(
        layer=marker_cluster,
        search_label="name",  # Search will use the popup content
        placeholder="Search for a station...",
        collapsed=False
    ).add_to(charging_map)

    # Save the map to an HTML file
    charging_map.save(output_file)
    print(f"Enhanced interactive map saved to {output_file}")

if __name__ == "__main__":
    # Example user location (optional)
    user_coords = (49.0102, 8.4044)  # Replace with user's coordinates, if available

    # Fetch data for Karlsruhe
    charging_stations = fetch_charging_stations()

    if charging_stations:
        print(f"Found {len(charging_stations)} charging stations in Karlsruhe.")
        # Create and save the interactive map
        create_interactive_map(charging_stations, user_location=user_coords)
    else:
        print("No charging stations found.")

if charging_stations:
    print(f"Number of stations: {len(charging_stations)}")
    print(f"Example station: {charging_stations[0]}")  # Ensure stations are in expected format

if user_coords:
    print(f"User coordinates: {user_coords}")

print(charging_stations)
import folium

test_map = folium.Map(location=[49.0069, 8.4037], zoom_start=13)
folium.Marker([49.0069, 8.4037], popup="Test Marker").add_to(test_map)
test_map.save("test_map.html")
print("Test map saved as test_map.html")
charging_stations = fetch_charging_stations()
if not charging_stations:
    print("No charging stations found or API response is empty.")

charging_stations = fetch_charging_stations()

# Check if any charging stations were returned
if not charging_stations:
    print("No charging stations found or API response is empty.")
else:
    print(f"Found {len(charging_stations)} charging stations in Karlsruhe.")
    print(f"Example station data: {charging_stations[0]}")
