import React from 'react';
import { Store, Home, Bike, MapPin } from 'lucide-react';

interface Location {
  lat: number; // Latitude (e.g., for positioning on a mock map)
  lng: number; // Longitude (e.g., for positioning on a mock map)
  name?: string; // Optional name for the location (e.g., restaurant name, "Your Address")
}

interface OrderTrackerMapProps {
  restaurantLocation: Location;
  customerAddress: Location;
  riderLocation: Location;
  // For a real map, estimatedRoute would be a series of coordinates or a polyline.
  // For this placeholder, we'll just visually connect the points.
}

const OrderTrackerMap: React.FC<OrderTrackerMapProps> = ({
  restaurantLocation,
  customerAddress,
  riderLocation,
}) => {
  console.log('OrderTrackerMap loaded');

  // Placeholder function to convert lat/lng to percentage-based top/left
  // This is a very simplified mock for positioning.
  // A real map would handle projections and zooming.
  const getPositionStyle = (location: Location): React.CSSProperties => {
    // Assuming a conceptual map bounds of 0-100 for lat/lng for simplicity
    // These would need to be scaled to the actual map viewport and coordinate system
    return {
      top: `${Math.min(Math.max(location.lat, 0), 100)}%`,
      left: `${Math.min(Math.max(location.lng, 0), 100)}%`,
      transform: 'translate(-50%, -50%)', // Center the icon
    };
  };

  // Create mock SVG path data for routes.
  // This is highly simplified and assumes direct lines.
  const restaurantToRiderPath = `M${restaurantLocation.lng},${restaurantLocation.lat} L${riderLocation.lng},${riderLocation.lat}`;
  const riderToCustomerPath = `M${riderLocation.lng},${riderLocation.lat} L${customerAddress.lng},${customerAddress.lat}`;


  return (
    <div className="w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden relative shadow-lg">
      {/* 
        NOTE: This is a placeholder map. 
        A real implementation would use a mapping library (e.g., Google Maps, Leaflet, Mapbox)
        to render an interactive map, markers, and routes.
      */}
      <div className="absolute inset-0 text-center p-4">
        <p className="text-sm text-gray-500">
          (Placeholder Map Area - Interactive map functionality requires a mapping library)
        </p>
      </div>

      {/* Mock SVG for routes - coordinates are percentages relative to SVG viewBox */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100" // Using a 100x100 coordinate system for simplicity
        preserveAspectRatio="none"
      >
        {/* Route from Restaurant to Rider */}
        <path
          d={restaurantToRiderPath}
          stroke="#FBBF24" // Amber color for restaurant to rider
          strokeWidth="1"
          fill="none"
          strokeDasharray="2,1"
        />
        {/* Route from Rider to Customer */}
        <path
          d={riderToCustomerPath}
          stroke="#3B82F6" // Blue color for rider to customer
          strokeWidth="1"
          fill="none"
          strokeDasharray="2,1"
        />
      </svg>

      {/* Restaurant Marker */}
      <div
        className="absolute p-2 bg-white rounded-full shadow-md"
        style={getPositionStyle(restaurantLocation)}
        title={`Restaurant: ${restaurantLocation.name || 'Starting Point'}`}
      >
        <Store className="w-5 h-5 text-red-600" />
      </div>

      {/* Customer Address Marker */}
      <div
        className="absolute p-2 bg-white rounded-full shadow-md"
        style={getPositionStyle(customerAddress)}
        title={`Delivery: ${customerAddress.name || 'Your Address'}`}
      >
        <Home className="w-5 h-5 text-blue-600" />
      </div>

      {/* Rider Marker */}
      <div
        className="absolute p-2 bg-green-500 rounded-full shadow-md animate-pulse"
        style={getPositionStyle(riderLocation)}
        title="Rider Location"
      >
        <Bike className="w-5 h-5 text-white" />
      </div>

      {/* Legend (Optional, but good for placeholders) */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-2 rounded shadow text-xs space-y-1">
        <div className="flex items-center">
          <Store className="w-4 h-4 text-red-600 mr-1" /> Restaurant
        </div>
        <div className="flex items-center">
          <Bike className="w-4 h-4 text-green-600 mr-1" /> Rider
        </div>
        <div className="flex items-center">
          <Home className="w-4 h-4 text-blue-600 mr-1" /> Customer
        </div>
         <div className="flex items-center">
          <svg viewBox="0 0 10 2" className="w-4 h-4 mr-1"><path d="M0,1 L10,1" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2,1"/></svg> Route to Rider
        </div>
        <div className="flex items-center">
          <svg viewBox="0 0 10 2" className="w-4 h-4 mr-1"><path d="M0,1 L10,1" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2,1"/></svg> Route to Customer
        </div>
      </div>
    </div>
  );
};

export default OrderTrackerMap;