// /* global google */
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
// import { useLocation } from 'react-router-dom';

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
import { useLocation } from 'react-router-dom';

const MapWithDirectionsRenderer = () => {
  const [directions, setDirections] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your actual API key
    libraries: ['geometry', 'drawing', 'places'],
  });
  const location = useLocation();
  const { useraddress } = location.state || {};
  
  useEffect(() => {
    if (isLoaded && useraddress) {
      const geocoder = new google.maps.Geocoder();
      
      geocoder.geocode({ address: useraddress }, (results, status) => {
        if (status === 'OK') {
          const origin = results[0].geometry.location;
          const directionsService = new google.maps.DirectionsService();

          directionsService.route(
            {
              origin: origin,
              destination: new google.maps.LatLng(12.9756, 77.5354), // Set your desired destination
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error(`Error fetching directions: ${result}`);
              }
            }
          );
        } else {
          console.error('Error geocoding user address:', status);
        }
      });
    }
  }, [isLoaded, useraddress]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={{ lat: 0, lng: 0 }} // Temporary center until directions are loaded
        zoom={7}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default MapWithDirectionsRenderer;
