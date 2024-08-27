import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId); //custom hook for fetching the data via api call

  const [showIndex, setShowIndex] = useState(null);

  const handleSetShowIndex = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index)); //PrevIndex is the current state of showIndex
  };

  if (resInfo == null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const { itemCards, price } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="menu text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {" "}
        {cuisines.join(", ")}
        {" - "}
        {costForTwoMessage}
      </p>
      {/* categories accordian */}
      {categories.map((category, index) => (
        //Controlled component
        <RestaurantCategory
          key={category.card.card.title}
          data={category?.card?.card}
          showItems={index == showIndex ? true : false}
          setShowIndex={() => handleSetShowIndex(index)}
        />
      ))}
    </div>
  );
};
export default RestaurantMenu;
