import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  async function handleLogOut() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: { Authorization: "Bearer " + token },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }
  return (
    <div className="contaner shadow">
      <nav className="d-flex p-2">
        <div className="d-flex flex-1">
          <Link to="/" className="item-link">
            Home
          </Link>
          <Link to="/About" className="item-link">
            About
          </Link>
        </div>
        <div className="d-flex">
          {!token ? (
            <>
              <Link
                to="/register"
                style={{ textAlign: "center" }}
                className="register-nav"
              >
                Register
              </Link>
              <Link
                to="/login"
                style={{ textAlign: "center" }}
                className="register-nav"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                style={{ textAlign: "center" }}
                className="register-nav"
              >
                Dashboard
              </Link>
              <div className="register-nav" onClick={handleLogOut}>
                Log Out
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
