import { useEffect } from "react";
import "./Navbar.css";
import Logo from "./assets/Logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const token = localStorage.getItem("token");
  // const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
            <Link to='/'><img src={Logo} alt="" /></Link>
        </div>
        <div className="right">
            <ul>
            <li><Link to="/">Our Story</Link></li>
            <li><Link to="/">Membership</Link></li>
            <li><Link to="/">Write</Link></li>
            {token ? "" : <li><Link to="/signin">Sign in</Link></li>}
            <li><Link to={token ? "/dashboard" : "/signup"} className="get-started">{token ? "Dashboard" : "Get started" }</Link></li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
