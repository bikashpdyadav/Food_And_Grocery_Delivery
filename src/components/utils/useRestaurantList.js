// import { useState,useEffect } from "react";

// const useRestaurantList = () => {
//     const [ListofRestaurants, setListofRestaurants] = useState([]);
//     const [filteredRestaurants, setfilteredRestaurants] = useState([]);

//     useEffect(() => {
//         const fetchData = async () =>{
//           const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
//           const json = await response.json();
//           setListofRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
//           setfilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
//         }
//         fetchData();
//     }, []);
//     return [ListofRestaurants, filteredRestaurants]; 
// };

// export default useRestaurantList;