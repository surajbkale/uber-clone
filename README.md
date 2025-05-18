Welcome to the Real-Time Ride Booking & Location Tracking System — a web-based application designed to connect users with captains (drivers) in real time. This platform features location tracking, ride creation, and instant two-way communication using Socket.io.

📖 Table of Contents
About the Project

Features

Tech Stack

Project Structure

Setup Instructions

API & WebSocket Events

Known Issues

License

📌 About the Project
This platform allows users to book rides and captains to share their live location. It uses real-time location tracking and live ride updates via Socket.io, integrated with Google Maps API for geolocation-based services such as autocomplete address suggestions and finding nearby captains within a specific radius.

The system is built with a clean separation of responsibilities across frontend, backend, and services, and uses MongoDB for persistent data storage.

🚀 Features
🔑 Authentication & User Management
Register & Login for Users and Captains

Store socket IDs in MongoDB for real-time communication.

📍 Real-Time Location Tracking
Captains share their live location periodically via Socket.io.

Locations are saved in MongoDB for proximity-based querying.

🛣️ Ride Booking & Management
Users can book rides by providing a pickup and destination address.

System finds nearby captains within a specified radius from the pickup point.

Rides are stored in the database and captains are notified in real-time.

🗺️ Google Maps API Integration
Autocomplete suggestions for addresses while typing.

Fetch geocoordinates for given addresses.

📡 WebSocket-Based Communication
Real-time events:

join (register user/captain to socket room)

update-location-captain (live location sharing)

Real-time ride status updates

🛠️ Tech Stack
Frontend

React.js

Socket.io-client

Google Maps JavaScript API

Backend

Node.js

Express.js

Socket.io (server-side)

Mongoose (MongoDB ODM)

Database

MongoDB Atlas / Local

Third-Party Services

Google Maps API (Places, Geocoding)

📂 Project Structure
pgsql
Copy
Edit
/server
  |-- /models
  |-- /routes
  |-- /controllers
  |-- /services
  |-- socket.js
  |-- server.js
/frontend
  |-- /components
  |-- /pages
  |-- SocketContext.jsx
  |-- App.js
.env
README.md
🖥️ Setup Instructions
1️⃣ Clone the Repository:
bash
Copy
Edit
git clone <repository-url>
cd <project-folder>
2️⃣ Install Dependencies:
Backend

bash
Copy
Edit
cd server
npm install
Frontend

bash
Copy
Edit
cd frontend
npm install
3️⃣ Configure Environment Variables:
Create a .env file for backend with:

ini
Copy
Edit
PORT=4000
MONGODB_URI=<your_mongo_uri>
GOOGLE_MAPS_API=<your_google_maps_api_key>
4️⃣ Run the Application:
Backend

bash
Copy
Edit
npm run dev
Frontend

bash
Copy
Edit
npm run dev
5️⃣ Start Socket Server:
The backend server automatically initializes Socket.io on server start.

🌐 API & WebSocket Events
API Endpoints

POST /register

POST /login

POST /create-ride

GET /autocomplete?input=<query>

WebSocket Events

join

update-location-captain

disconnect

⚠️ Known Issues
CORS on Socket.io: Ensure your mobile devices use the same public URL via tunneling (e.g., devtunnels or ngrok).

Localhost Dev Tunnel Limitations: Some features (login/register via sockets) might not function fully on mobile due to device restrictions on websockets or tracking prevention.

Google Maps API Limit: Ensure your API key has the correct permissions for Places and Geocoding APIs.

📄 License
This project is for educational and personal learning purposes.

✨ Credits
Built with ❤️ by Suraj Kale.
