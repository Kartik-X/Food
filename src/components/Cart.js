import { useSelector } from "react-redux";
import ItemList from "./ItemList";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-5 p-5">
      <h1 className=" mb-2 text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto text-right">
        {cartItems.length > 0 && (
          <button
            className="px-4 py-2 m-2 bg-black text-white rounded-lg "
            onClick={() => handleClearCart()}
          >
            {" "}
            Clear Cart
          </button>
        )}
        {cartItems.length === 0 && (
          <div className="flex justify-center">
            <h1 className="font-bold text-center text-2xl mt-10 ml-8">
              Cart is empty. Add items to the cart !!
            </h1>
          </div>
        )}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};
export default Cart;
