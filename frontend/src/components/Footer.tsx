import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-blue-800 py-10 text-white ">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white tracking-tight font-bold">
          <Link to="/">Bookings.com</Link>
        </span>
        <span className="text-whiet font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">privacy policy</p>
          <p className="cursor-pointer">Terms and Condition</p>
        </span>
      </div>
    </div>
  );
}

export default Footer;
