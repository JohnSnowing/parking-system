import { Link } from "react-router-dom";

// import AuthContext from '../../store/auth-context';
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  //   const authCtx = useContext(AuthContext);

  // const logoutHandler = () => {
  //   authCtx.logout();
  //   // optional: redirect the user
  // };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Parking System</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/parked-cars">Car Parked</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
