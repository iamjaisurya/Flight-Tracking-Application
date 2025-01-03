Live Flight Tracking Application

Overview

Welcome to the Live Flight Tracking Application! This project is a simple, user-friendly web application that allows you to track flights in real-time. By entering a flight number, you can view details such as departure and arrival airports, the flight's current status, and its live location on a map. If the flight is delayed, the application sends an automated email notification.

Features

Real-Time Flight Data: Fetch flight details like departure, arrival, and current status using the Aviationstack API.

Interactive Map: View live flight locations displayed on a map using Leaflet.js.

Automation: Receive email notifications if a flight is delayed (powered by EmailJS).

How It Works

The user enters a flight number into the search bar and clicks "Search."

The application fetches the flight data from the Aviationstack API.

Flight details are displayed, and the flight's location is marked on the map.

If the flight is delayed, an email notification is automatically sent to the configured recipient.

Setup Instructions

Follow these steps to set up and run the application:

Clone the Repository

git clone <your-repository-link>

Navigate to the Project Directory

cd <project-folder>

Install Dependencies

If using a Node.js environment:

npm install

Configure API Keys

Replace placeholders in script.js with your own keys:

Aviationstack API Key: Replace YOUR_API_KEY.

EmailJS Public Key: Replace YOUR_PUBLIC_KEY.

EmailJS Service ID and Template ID: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID.

Start a Local Server

Use a tool like Live Server in VS Code or a simple HTTP server:

npx http-server

Open in Browser

Navigate to http://localhost:8080 (or the provided URL) to access the application.

Usage

Enter the flight number in the input field on the left sidebar.

Click the "Search" button to fetch flight data.

View the flight's live location and details on the map.

If the flight is delayed, you will receive an email notification.

API & Tools Used

Aviationstack API for fetching real-time flight data.

Leaflet.js for rendering maps and adding flight markers.

EmailJS for email automation when a flight is delayed.

Deliverables

Source Code: All files are in this repository.

Requirements:

index.html: The main HTML structure.

style.css: For styling the application.

script.js: Contains the JavaScript logic.

requirements.txt: EmailJS for email automation and Leaflet.js for map

Screenshots

Add screenshots of the application interface here.






Contact

For any questions or issues, feel free to reach out at: jaisuryajaisankar@gmail.com.

Enjoy tracking flights in real-time! ✈️


