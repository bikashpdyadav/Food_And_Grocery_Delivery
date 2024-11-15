import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { EACH_RESTRO } from "../utils/constants";
import Header from "../Header";
import Contact from "../Contact";

const RestaurantMenu = () => {
    const [showIndex, setShowIndex] = useState({ value: false, idx: null });
    const resInfo = EACH_RESTRO[0];
    const location = useLocation();
    const { restaurantInfo } = location.state;

    if (resInfo === null) return <Shimmer />;
    //console.log(resInfo)
    const categories = resInfo?.cart?.items[0];
    const {
        name,
        cuisines,
    } = restaurantInfo;
    return (
        <>
            <Header />
            <div className="p-4">
                <div className="text-center m-6">
                    <h1 className="font-extrabold text-4xl p-4">{name}</h1>
                    <p className="font-bold text-xl">
                        {cuisines.join(', ')}
                    </p>
                </div>
                {categories.map((category, index) => (
                    <RestaurantCategory
                        key={index}
                        data={category?.card?.card}
                        setshowIndex={() =>
                            setShowIndex({
                                value: !(showIndex.idx === index && showIndex.value),
                                idx: index,
                            })
                        }
                        showItems={index === showIndex.idx && showIndex.value}
                    />
                ))}
            </div>
            <Contact />
        </>
    );
};

export default RestaurantMenu;
