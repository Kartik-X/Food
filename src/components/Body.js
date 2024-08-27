import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    setlistOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus == false) {
    return (
      <h1>
        Looks like you are offline.Please check your internet connection !!
      </h1>
    );
  }
  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex items-center bg-gray-200">
        <div className="res-search m-4 p-4">
          <input
            type="text"
            data-testid="searchInput"
            className="search-box border border-solid border-black rounded-md h-8 w-60"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-1 rounded-md bg-green-200 m-4"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <button
            className="filter-btn px-4 py-2 rounded-lg bg-red-300"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.5
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated restaurants
          </button>
        </div>
        <div>
          <label className="ml-16">UserName :</label>
          <input
            className=" ml-1 border border-black rounded-lg h-8 p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      <div className="res-container flex flex-wrap mx-4 bg-gray-50 rounded-lg mt-2">
        {filteredRestaurant.length === 0 ? (
          <p
            style={{
              fontSize: "50px",
              marginLeft: "350px",
              marginTop: "150px",
            }}
          >
            No Restaurant Found !!
          </p>
        ) : (
          (console.log("sd", filteredRestaurant),
          filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              {restaurant.info.promoted ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} /> //HIGHER ORDER COMPONENTS FOR PROMOTED
              )}

              {/* <RestaurantCard resData={restaurant} /> */}
            </Link>
          )))
        )}
      </div>
    </div>
  );
};

export default Body;
