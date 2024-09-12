import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white tracking-tight font-bold">
          <Link to="/">Bookings.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/signup"
            className="bg-white font-semibold px-3 rounded-lg flex items-center justify-center hover:bg-gray-100 hover:text-blue-800 "
          >
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Header;
