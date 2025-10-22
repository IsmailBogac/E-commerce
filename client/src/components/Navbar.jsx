import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div className="nav-container">
          <div className="logo">
            <h1 className="text-success">Shop</h1>
          </div>

          <div className="search-bar">
            <input
              type="search"
              placeholder="Type the product or brand you are looking for..."
            />
            <button>
              <i className="bi bi-search"></i>
            </button>
          </div>

          <ul className="all-links">
            <li>
              <Link className="link" to="/">Home</Link>
            </li>
            <li>
              <Link className="link" to="/allproducts">Products</Link>
            </li>

            {token ? (
              role === "admin" ? (
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-shop link"></i> <span>Profile</span>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/admindashboard">
                        Add new products
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/producttable">
                        Profile
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <Link to="/cart" className="mx-3 link">
                    <i className="bi bi-cart"></i> Cart
                  </Link>

                  <li className="nav-item dropdown">
                    <a
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-fill"></i> <span>Profile</span>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link className="dropdown-item" to="/userdashboard">
                          Profile
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )
            ) : (
              <>
                <button
                  className="btn btn-outline-success mx-1 py-1"
                  onClick={() => navigate("/userregistration")}
                >
                  Sign Up
                </button>
                <button
                  className="btn btn-success py-1"
                  onClick={() => navigate("/userlogin")}
                >
                  Login
                </button>
              </>
            )}

            {!token && (
              <li>
                <Link className="dropdown-item link" to="/adminpanel">
                  <i className="bi bi-shop me-2 fs-4"></i> Become a seller
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
