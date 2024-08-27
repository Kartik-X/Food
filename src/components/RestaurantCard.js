import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, sla } = resData?.info;
  return (
    <div
      data-testid="resCard"
      className="res-card m-4 p-4 w-[200px] h-[350px] bg-gray-200 rounded-lg transition-transform duration-300 hover:bg-gray-300 flex flex-col justify-between"
    >
      <img
        className="resImg rounded-lg h-[150px] object-cover"
        src={CDN_URL + cloudinaryImageId}
        alt={name}
      />
      <div className="text-center">
        <h3 className="font-bold py-2 text-lg ">{name}</h3>
        <h4 className="text-sm">{cuisines.join(", ")}</h4>
        <h4 className="text-sm">Ratings: {avgRating}</h4>
        <h4 className="text-sm">ETA: {sla.deliveryTime} minutes</h4>
      </div>
    </div>
  );
};
//  Higher order function for "PROMOTED" Label

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label>Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
