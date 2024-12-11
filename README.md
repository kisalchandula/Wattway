 
# Wattway - Electric Vehicle Charging and Route Planning solution for Karlsruhe  <br>
WattWay is an open-source project designed to help Electric Vehicle (EV) owners plan the most efficient routes and find optimal charging stations based on their current location, battery levels, and route preferences. This system integrates advanced algorithms to calculate the best routes that minimize travel time and energy consumption while ensuring that users have access to charging stations along the way.

## Table of Contents </h4>  
Project Overview <br>
Features <br>
Installation<br>
Usage <br>
Technologies Used <br>
Project Structure <br>
Contributing <br>
License <br>
Acknowledgments <br>

## Project Overview  <br>
The WattWay project aims to make long-distance travel in electric vehicles more feasible and efficient. By considering variables such as battery capacity, energy consumption, route distance, and charging station availability, WattWay provides the best route options, including stops for charging, to ensure that drivers can reach their destination without running out of power. <br>

## Core Features <br>
**Route Planning:** Calculate the most efficient route from the user's starting point to the destination. <br>
**Charging Station Mapping:** Locate charging stations along the route, considering the vehicle's current battery level and range. <br>
**Charging Station Recommendations:** Suggest optimal charging stations based on user preferences, such as charging speed, availability, and distance. <br>
**Real-time Updates:** Get updated information on charging station availability (e.g., occupied or free). <br>
**Energy Consumption Estimation:** Estimate the energy usage for a trip, factoring in terrain, speed limits, and vehicle specifics. <br>
**User-Friendly Interface:** Easy-to-use web or mobile interface to visualize the route and charging stations.

 ## Key Technologies Used:  <br>
 **OpenCharge API :** The OpenCharge API provides a comprehensive database of EV charging stations worldwide. It includes real-time information on  
            <ul>
                <li>Station locations</li>
                <li>Availability and pricing</li>
                <li>Operational status</li>
            </ul>
 This API is pivotal in offering accurate data for EV users, ensuring that they can locate and utilize charging stations with ease. 
       
**OpenRouteService (ORS):** OpenRouteService is an open-source routing platform powered by OpenStreetMap. It enables advanced route planning for various transportation modes, including electric vehicles. Key features include
           <ul>
                <li>Customizable route preferences (e.g., avoiding tolls or restricted areas)</li>
                <li>EV-specific routing that considers charging station locations and battery range</li>
                <li>Isochrone maps for estimating reachable areas within a given time</li>
            </ul>
            
<h2>Project Features</h2>
    <ul>
        <li>Real-time EV charging station locator</li>
        <li>Optimized route planning for EV drivers</li>
        <li>User-friendly interface for seamless navigation</li>
        <li>Integration of OpenCharge API and OpenRouteService for enhanced functionality</li>
    </ul>

<h2>How to Get Started</h2>
    <ol>
        <li>Clone the repository: <code>git clone https://github.com/HKA-OSGIS/wattway.git</code></li>
        <li>Install required dependencies.</li>
        <li>Configure API keys for OpenCharge and OpenRouteService in the project settings.</li>
        <li>Run the application and start planning your EV-friendly routes!</li>
    </ol>
   <h2>Contributing</h2>
    <p>We welcome contributions to WattWay! Feel free to fork the repository, submit pull requests, or report issues to improve the project.</p>

<h2>License</h2>
    <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

<footer>
        <p>Created by <strong> Bhavin, Kisal, Ravi and Sandy </strong>. Follow the project on <a href="https://github.com/HKA-OSGIS/wattway">GitHub</a>.</p>
    </footer>
</body>
</html>
