import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItems = (item) => {
    //dispatch an action

    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="p-2 m-2 border-b-8 text-left flex justify-between"
        >
          <div className="w-9/12 hover:cursor-pointer">
            <div className="py-2">
              <span className="font-bold">{item.card.info.name}</span>
              <br></br>
              <span className="font-bold">
                {" "}
                ₹{" "}
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="font-sans mr-24">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 ">
            <div className="mb-2">
              <button
                className="px-6 py-1 hover:bg-gray-300 bg-white text-green-600 font-bold shadow-lg  rounded-md"
                onClick={() => handleAddItems(item)}
              >
                ADD
              </button>
            </div>
            <img
              src={CDN_URL + item.card.info.imageId}
              className=" rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
