var map = L.map('map').setView([20, 0], 2); // Centered at (20, 0) with zoom level 2

// OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addFlightMarker(latitude, longitude, flightData) {
    var marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`
        <b>Flight:</b> ${flightData.flightNumber} <br>
        <b>Airline:</b> ${flightData.airline} <br>
        <b>Status:</b> ${flightData.status} <br>
        <b>From:</b> ${flightData.departure} <br>
        <b>To:</b> ${flightData.arrival}
    `).openPopup();
}

// Function to send an email notification using EmailJS
function sendEmailNotification(flightData) {
    emailjs.init('wIkZ-OV3mHp_xdfZY'); // EmailJS Public Key

    const emailParams = {
        flightNumber: flightData.flightNumber,
        airline: flightData.airline,
        status: flightData.status,
        departure: flightData.departure,
        arrival: flightData.arrival
    };

    emailjs.send('service_kcl15wh', 'template_6xj66w', emailParams) // Service ID and Template ID of the EmailJS
        .then((response) => {
            console.log('Email sent successfully:', response);
        })
        .catch((error) => {
            console.error('Error sending email:', error);
        });
}

// Function to fetch flight data using the Aviationstack API
async function fetchFlightData(flightNumber) {
    const apiKey = "01c48a3329e8c49098dfb40087bce377"; 
    const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.data && data.data.length > 0) {
            const flight = data.data[0]; // Assuming the first result is the desired flight
            const flightData = {
                flightNumber: flight.flight.iata || "Unknown",
                airline: flight.airline.name || "Unknown",
                status: flight.flight_status || "Unknown",
                departure: flight.departure.airport || "Unknown",
                arrival: flight.arrival.airport || "Unknown",
                latitude: flight.live?.latitude || 0,
                longitude: flight.live?.longitude || 0
            };

            if (flightData.latitude && flightData.longitude) {
                addFlightMarker(flightData.latitude, flightData.longitude, flightData);
            } else {
                alert("No live location available for this flight.");
            }

            // Trigger email notification if the flight is delayed
            if (flightData.status.toLowerCase() === "delayed") {
                sendEmailNotification(flightData);
                alert("Flight is delayed. Notification email sent.");
            } else {
                alert(`Flight ${flightNumber} is not delayed.`);
            }
        } else {
            alert("Flight not found.");
        }
    } catch (error) {
        console.error("Error fetching flight data:", error);
        alert("Failed to fetch flight data. Please try again.");
    }
}

// Event listener for the search button
document.querySelector('.sidebar button').addEventListener('click', function () {
    const flightNumber = document.querySelector('.sidebar input').value.trim();

    if (flightNumber === "") {
        alert("Please enter a flight number.");
        return;
    }

    // Clear existing markers and fetch new data
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    fetchFlightData(flightNumber);
});
