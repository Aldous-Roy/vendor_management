import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// OpenRouteService API Key (Replace with your key)
const ORS_API_KEY = "5b3ce3597851110001cf6248b9d89afac2104f64b37d7e51c97003e7";

// Custom Icons
const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
});

const deliveryIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    iconSize: [40, 40],
});

const DeliveryPartner = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [deliveryPartner, setDeliveryPartner] = useState({
        name: "John Doe",
        location: { lat: 12.9716, lng: 77.5946 }, // Default (Bangalore)
    });
    const [route, setRoute] = useState([]); // Store the real route

    // Fetch User's Current Location
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Geolocation Error:", error);
                    alert("⚠️ Unable to retrieve location. Please check permissions.");
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 5000 }
            );
        } else {
            console.error("Geolocation not supported.");
        }
    }, []);

    // Fetch Route from OpenRouteService
    const fetchRoute = async () => {
        if (!userLocation) return;

        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${userLocation.lng},${userLocation.lat}&end=${deliveryPartner.location.lng},${deliveryPartner.location.lat}`;

        try {
            const response = await axios.get(url);
            if (response.data.routes && response.data.routes.length > 0) {
                const coordinates = response.data.routes[0].geometry.coordinates;
                setRoute(coordinates.map(([lng, lat]) => [lat, lng])); // Convert to Leaflet format
            } else {
                console.error("No route found.");
            }
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    // Fetch route when user & delivery partner locations are available
    useEffect(() => {
        if (userLocation) fetchRoute();
    }, [userLocation, deliveryPartner.location]);

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Page Header */}
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold">🚚 Delivery Partner Dashboard</h1>
                <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
                    Track real-time delivery routes and partner locations.
                </p>
            </header>

            {/* Map Container */}
            <div className="w-full max-w-4xl h-96 rounded-lg overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
                <MapContainer
                    center={userLocation || deliveryPartner.location}
                    zoom={14}
                    className="h-full w-full"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* User Location */}
                    {userLocation && (
                        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                            <Popup>📍 You are here</Popup>
                        </Marker>
                    )}

                    {/* Delivery Partner Location */}
                    <Marker position={[deliveryPartner.location.lat, deliveryPartner.location.lng]} icon={deliveryIcon}>
                        <Popup>🛵 Delivery Partner</Popup>
                    </Marker>

                    {/* Real Route */}
                    {route.length > 0 && <Polyline positions={route} color="blue" weight={5} />}
                </MapContainer>
            </div>

            {/* Info Section */}
            <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-lg w-full text-center">
                <h2 className="text-xl font-semibold">📦 Delivery Details</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    <strong>Partner:</strong> {deliveryPartner.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                    <strong>Destination:</strong> {deliveryPartner.location.lat}, {deliveryPartner.location.lng}
                </p>
            </div>
        </div>
    );
};

export default DeliveryPartner;