import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutside } from "../utils/util";
import authSlice from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(authSlice.actions.logout());
    navigate("/auth/login");
  };
  useOutside(ref, () => setDropdown(false));
  return (
    <header className="bg-white shadow-md px-4 py-2 sticky top-0 right-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome,{" "}
          {(currentUser?.first_name || "--") +
            " " +
            (currentUser?.last_name || "--")}
        </h2>
        <div className="flex items-center">
          <button className="bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-gray-300 focus:outline-none">
            <i className="fas fa-bell"></i>
          </button>
          <div className="ml-4 relative">
            <button
              className="bg-gray-200 p-2 rounded-full text-gray-600 hover:bg-gray-300 focus:outline-none"
              onClick={() => setDropdown(true)}
            >
              <i className="fas fa-user"></i>
            </button>
            {dropdown && (
              <ul
                className="absolute bg-white rounded overflow-hidden shadow-md right-0 top-11"
                ref={ref}
              >
                <li
                  className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer text-nowrap text-base"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket mr-2"></i>
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
