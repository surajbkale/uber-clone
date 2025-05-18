# 🚖 Real-Time Ride Booking & Location Tracking Platform

Welcome to the **Real-Time Ride Booking & Location Tracking System** — a web-based application designed to connect users with captains (drivers) in real time. This platform features location tracking, ride creation, and instant two-way communication using **Socket.io**.

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API & WebSocket Events](#api--websocket-events)
- [Known Issues](#known-issues)
- [License](#license)
- [Credits](#credits)

## 📌 About the Project

This platform allows **users to book rides** and **captains to share their live location**. It uses **real-time location tracking** and **live ride updates via Socket.io**, integrated with **Google Maps API** for geolocation-based services such as autocomplete address suggestions and finding nearby captains within a specific radius.

The system is built with a clean separation of responsibilities across frontend, backend, and services, and uses MongoDB for persistent data storage.

## 🚀 Features

- **User & Captain Registration/Login**
- **Real-Time Socket.io-based Communication**
- **Live Location Tracking of Captains**
- **Booking Rides with Pickup & Destination**
- **Find Nearby Captains within a Specified Radius**
- **Google Maps API Integration for Address Autocomplete**
- **REST APIs and WebSocket Events**
- **Data Persistence with MongoDB Atlas**

## 🛠️ Tech Stack

**Frontend**

- React.js
- Socket.io-client
- Google Maps JavaScript API

**Backend**

- Node.js
- Express.js
- Socket.io (server-side)
- Mongoose (MongoDB ODM)

**Database**

- MongoDB Atlas / Local

**Third-Party Services**

- Google Maps API (Places, Geocoding)

## 📂 Project Structure

```
/server
├── /models
├── /routes
├── /controllers
├── /services
├── socket.js
└── server.js
/frontend
├── /components
├── /pages
├── SocketContext.jsx
└── App.js
.env
```

## 🖥️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2️⃣ Install Dependencies

**Backend**

```bash
cd server
npm install
```

**Frontend**

```bash
cd frontend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the `/server` folder with the following:

```ini
PORT=4000
MONGODB_URI=<your_mongo_uri>
GOOGLE_MAPS_API=<your_google_maps_api_key>
```

### 4️⃣ Run the Application

**Backend**

```bash
cd server
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

### 5️⃣ Start Socket Server

The backend server automatically initializes Socket.io on server start.

## 🌐 API & WebSocket Events

### 📌 API Endpoints

| Method | Endpoint                      | Description                                 |
| ------ | ----------------------------- | ------------------------------------------- |
| POST   | `/register`                   | Register new user/captain                   |
| POST   | `/login`                      | Login user/captain                          |
| POST   | `/create-ride`                | Create a ride booking                       |
| GET    | `/autocomplete?input=<query>` | Get address suggestions via Google Maps API |

### 📡 WebSocket Events

| Event Name                | Description                                       |
| ------------------------- | ------------------------------------------------- |
| `join`                    | Join socket room and store user/captain socket ID |
| `update-location-captain` | Send captain's live location data                 |
| `disconnect`              | Handle user disconnect                            |

## ⚠️ Known Issues

- **CORS on Socket.io**: Ensure your mobile devices use the same public URL via tunneling (e.g., devtunnels, ngrok) for sockets to work.
- **Localhost Tunnel Limitations**: Some features (login/register via sockets) might not function fully on mobile due to device restrictions on websockets or tracking prevention.
- **Google Maps API Limit**: Make sure your API key has permissions for Places and Geocoding APIs.

## 📄 License

This project is for educational and personal learning purposes.

## ✨ Credits

Built with ❤️ by Suraj Kale
