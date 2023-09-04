import classes from "./Header.module.css";

const NavLink = (props) => {
  const navClass = classes["nav-link"];

  const activeNav = (e) => {
    e.target.style.boxShadow = "0 1px #eee";
    // e.target.
  };

  return (
    <nav>
      <a className={navClass} href="/#" onClick={activeNav}>
        Home
      </a>
      <a className={navClass} href="/#">
        About
      </a>
      <a className={navClass} href="/#">
        Contact
      </a>
    </nav>
  );
};

export default NavLink;
