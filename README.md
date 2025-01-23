# **Wattway**

**Happy EV Journey!**  
Wattway plans trips for electric vehicles (EVs), calculates and finds charging points when your battery reaches 10%. Using the remaining battery percentage and mileage input, it shows reachable charging points and provides options for charging time. It also calculates the next lower battery point until you reach your destination.

## **Features**
- Display charging stations on a base map.
- Implement route planning for EVs with charging stops.
- Direction instructions and lane instructions.
- Waypoints feature to add multiple stops.
- Input for time to charge the EV.

## **Installation**

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You can check if Node.js is installed by running the following command in your terminal:

```bash
node -v
```

### Installation Steps

#### For Windows
1. **Install Node.js**:  
   Download the Windows Installer from the [Node.js website](https://nodejs.org/), run the installer, and follow the instructions.

2. **Clone the Repository**:  
   Run the following commands:
   ```bash
   git clone https://github.com/HKA-OSGIS/Wattway.git
   cd wattway
   ```

3. **Install Dependencies**:  
   Run the following command:
   ```bash
   npm install express axios cors
   ```

4. **Run the Application**:  
   Use this command to start the application:
   ```bash
   node app.js
   ```

#### For Linux
1. **Install Node.js**:  
   Update your package manager and install Node.js and npm:
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

2. **Clone the Repository**:  
   Run the following commands:
   ```bash
   git clone https://github.com/HKA-OSGIS/Wattway.git
   cd wattway
   ```

3. **Install Dependencies**:  
   Run the following command:
   ```bash
   npm install express axios cors
   ```

4. **Run the Application**:  
   Use this command to start the application:
   ```bash
   node app.js
   ```

#### For macOS
1. **Install Node.js**:  
   Use Homebrew to install Node.js:
   ```bash
   brew install node
   ```

2. **Clone the Repository**:  
   Run the following commands:
   ```bash
   git clone https://github.com/HKA-OSGIS/Wattway.git
   cd wattway
   ```

3. **Install Dependencies**:  
   Run the following command:
   ```bash
   npm install express axios cors
   ```

4. **Run the Application**:  
   Use this command to start the application:
   ```bash
   node app.js
   ```

## **Usage**
- After starting the application, open your browser and navigate to `http://localhost:3000/query?swLat=48.93074305571456&swLon=8.676160408522128&neLat=49.4703360192658&neLon=9.501966706880955`.
- Enter your trip details such as start location, end location, waypoints, current battery percentage, mileage per percentage of battery, and battery capacity.
- Click on "Get Route" to see the route with charging stations displayed on the map.

## **Contributing**
Feel free to submit pull requests or open issues if you have suggestions or improvements!

## **Contact**
For any inquiries, please reach out to [bhikadiyabhavin258@gmail.com].

## License

[WattWay](https://github.com/HKA-OSGIS/Wattway) by [HKA-OSGEO Bhavin, Kiasal, Sandys, Ravi](https://github.com/bhikadiyabhavin) is licensed under the  
[Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1).  

![CC License](https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1)
![BY License](https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1)
![NC License](https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1)
