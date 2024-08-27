import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="sticky top-0  flex justify-between bg-gray-100 shadow-lg rounded-lg">
      <div className="logo-container">
        <img className="w-28" src={LOGO_URL} />
      </div>
      <div className="flex">
        <ul className="flex items-center p-4 m-4">
          <li className="px-4 font-semibold">
            Online Status :{onlineStatus ? "🟢" : "🔴"}
          </li>
          <li className="px-4 font-semibold text-lg  hover:text-red-600">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 font-semibold text-lg hover:text-red-600">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4 font-semibold text-lg hover:text-red-600">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4 font-semibold text-lg hover:text-red-600">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 font-semibold text-lg hover:text-red-600">
            <Link to="/cart">Cart ({cartItems.length})</Link>
          </li>
          <button
            className="ml-3  px-4 py-2 rounded-lg bg-green-400"
            onClick={() => {
              btnNameReact == "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
