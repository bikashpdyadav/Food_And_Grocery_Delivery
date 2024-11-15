import ItemList from "./ItemList";

const RestaurantCategory = ({ data, setshowIndex, showItems }) => {
    const handleClick = () => {
        setshowIndex();
    };

    return (
        <div className="w-full sm:w-8/12 lg:w-6/12 mx-auto my-8 bg-gray-100 shadow-lg p-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={handleClick}>
                <span className="font-bold text-lg">
                    {data.title} ({data.itemCards.length})
                </span>
                <span className="flex items-center transform transition-transform duration-200">
                    {showItems ? "🔺" : "🔻"}
                </span>
            </div>
            {showItems && <ItemList items={data.itemCards} />}
        </div>
    );
};

export default RestaurantCategory;
