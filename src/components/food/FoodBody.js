import RestroCardComponent from "./RestroCardComponent";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { RESTRO_LIST } from "../utils/constants";
import Axios from 'axios';
import Header from "../Header";
import Contact from "../Contact";

const FoodBody = () => {
  const [data, setdata] = useState([]);
  const ListofRestaurants = RESTRO_LIST;
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [SearchText, setSearchText] = useState("");
  const [isFiltered, setisFiltered] = useState(false);

  // const getData = async() => {
  //   const response = await Axios.get("http://localhost:3000/data");
  //   console.log(response,"HI");
  //   //console.log(response.json(),"HELLO");
  // }
  useEffect(() => {
    setfilteredRestaurants(ListofRestaurants);
    //getData();
  }, []);
  //console.log(ListofRestaurants);
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return <h1>Looks like you are offline!! Check your internet connection</h1>;

  const handleFilter = () => {
    if (!isFiltered)
      setfilteredRestaurants(ListofRestaurants.filter((res) => res.info.avgRating > 4.4));
    else setfilteredRestaurants(ListofRestaurants);
    setisFiltered(!isFiltered);
  }

  return !ListofRestaurants ? (
    <Shimmer />
  ) : (
    <div className="flex flex-col min-h-screen">
    <Header />
    <div className="p-4">
      <div className="flex flex-wrap flex-grow items-center justify-center my-4 gap-4 sm:gap-6 md:gap-8">
        <button
          className="border border-solid border-black px-4 py-2 font-bold rounded-lg hover:bg-gray-200 transition duration-300"
          onClick={handleFilter}
        >
          {isFiltered ? "Reset" : "Top Rated Restaurants"}
        </button>

        <div className="w-full sm:w-3/4 md:w-1/2 flex items-center justify-center mb-4 sm:mb-0">
          <input
            type="text"
            className="border border-solid border-black p-2 w-full rounded-lg hover:shadow-black hover:shadow-lg transition duration-300 placeholder-black placeholder:font-semibold"
            value={SearchText}
            placeholder="Search restaurants..."
            onChange={(e) => {
              setSearchText(e.target.value);
              setfilteredRestaurants(
                ListofRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
        </div>
      </div>

      {/* Flexbox Layout */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredRestaurants.length === 0 ? (
          <h1 className="text-2xl font-semibold m-4 p-4">Nothing to Show!!</h1>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={'/food/restaurant/'+restaurant.info.id}
              state={{ restaurantInfo: restaurant.info }}
              className="m-2 flex-grow max-w-xs"
            >
              <RestroCardComponent resObj={restaurant} />
            </Link>
          ))
        )}
      </div>
    </div>
    <Contact />
    </div>
  );
};

export default FoodBody;
