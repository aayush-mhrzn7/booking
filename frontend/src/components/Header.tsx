import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Signout from "./Signout";
function Header() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white tracking-tight font-bold">
          <Link to="/">Bookings.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="text-white font-semibold px-3 rounded-lg flex items-center justify-center "
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="text-white font-semibold px-3 rounded-lg flex items-center justify-center "
              >
                My Hotels
              </Link>
              <Signout />
            </>
          ) : (
            <Link
              to="/register"
              className=" font-semibold px-3 rounded-lg flex items-center justify-center  text-white "
            >
              Signup
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
