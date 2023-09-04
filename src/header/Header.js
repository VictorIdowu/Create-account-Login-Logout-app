import classes from "./Header.module.css";
import NavLink from "./NavLink";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <h1>LOGO</h1>
      <nav>
        <NavLink />
      </nav>
    </header>
  );
};

export default Header;
