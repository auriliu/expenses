//

import styles from "./Navbar.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";
// import { useTheme } from "../hooks/useTheme";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import logo from "../assets/logo-no-background.png";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const { color } = useContext(ThemeContext);

  return (
    <>
      <nav className={styles.navbar} style={{ backgroundColor: color }}>
        <ul>
          <li className={styles.title}>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </li>
          {/* user is NOT logged in */}
          {!user && (
            <>
              <li>
                <Link className="nav-btn" to="./login">
                  login
                </Link>
              </li>
              <li>
                <Link className="nav-btn" to="./signup">
                  signup
                </Link>
              </li>
            </>
          )}

          {/* user is logged in */}
          {user && (
            <>
              <li className="nav-btn">hello, {user.displayName}</li>
              <button onClick={logout} className="btn">
                logout
              </button>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
