// /* global google */
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

// const MapWithDirectionsRenderer = () => {
//   const [directions, setDirections] = useState(null);
//   const [origin, setOrigin] = useState({ lat: 11.8507300, lng: -87.6512600 });
//   const [inputLocation, setInputLocation] = useState('');
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your actual API key
//     libraries: ['geometry', 'drawing', 'places'],
//   });
//   const location = useLocation();
//   const { useraddress } = location.state || {};

//   useEffect(() => {
//     if (isLoaded) {
//       const directionsService = new google.maps.DirectionsService();

//       directionsService.route(
//         {
//           origin: new google.maps.LatLng(origin.lat, origin.lng),
//           destination: new google.maps.LatLng(12.9756, 77.5354),
//           travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === google.maps.DirectionsStatus.OK) {
//             setDirections(result);
//           } else {
//             console.error(`Error fetching directions: ${result}`);
//           }
//         }
//       );
//     }
//   }, [isLoaded, origin]);

//   const handleUseCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setOrigin({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.error('Error fetching current location:', error.message);
//       }
//     );
//   };

//   const handleInputChange = (e) => {
//     setInputLocation(e.target.value);
//   };

//   const handleSetLocation = () => {
//     const geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ address: inputLocation }, (results, status) => {
//       if (status === 'OK') {
//         const location = results[0].geometry.location;
//         setOrigin({ lat: location.lat(), lng: location.lng() });
//       } else {
//         console.error('Error geocoding input address:', status);
//       }
//     });
//   };

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div style={{ marginBottom: '10px' }}>
//         <button onClick={handleUseCurrentLocation}>Use Current Location</button>
//         <input
//           type="text"
//           placeholder="Enter a location"
//           value={inputLocation}
//           onChange={handleInputChange}
//           style={{ marginLeft: '10px' }}
//         />
//         <button onClick={handleSetLocation} style={{ marginLeft: '10px' }}>
//           Set Location
//         </button>
//       </div>
//       <GoogleMap
//         mapContainerStyle={{ height: '400px', width: '100%' }}
//         center={origin}
//         zoom={7}
//       >
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//     </div>
//   );
// };

// export default MapWithDirectionsRenderer;

/* global google */

import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const MapWithDirectionsRenderer = ({ location }) => {
  const [directions, setDirections] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); // Default center
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries: ['geometry', 'drawing', 'places'],
  });

  const { user_location, driver_location } = location;

  useEffect(() => {
    if (isLoaded && user_location && driver_location) {
      const geocoder = new google.maps.Geocoder();

      // Geocode both user and driver locations
      Promise.all([
        geocodeAddress(geocoder, user_location),
        geocodeAddress(geocoder, driver_location),
      ])
        .then(([origin, destination]) => {
          setMapCenter(origin); // Set the map center to the user's location

          const directionsService = new google.maps.DirectionsService();
          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error(`Error fetching directions: ${status}`);
              }
            }
          );
        })
        .catch((error) => console.error('Error geocoding locations:', error));
    }
  }, [isLoaded, user_location, driver_location]);

  // Helper function to geocode an address or postal code
  const geocodeAddress = (geocoder, address) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          resolve(results[0].geometry.location);
        } else {
          reject(`Geocoding failed: ${status}`);
        }
      });
    });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-6 rounded-lg shadow-md overflow-hidden">
      <GoogleMap
        mapContainerStyle={{
          height: '400px',  
          width: '100%',
        }}
        center={mapCenter}
        zoom={12}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>

  );
};

export default MapWithDirectionsRenderer;

