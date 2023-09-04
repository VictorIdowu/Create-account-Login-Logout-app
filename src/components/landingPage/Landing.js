import { useState } from "react";
import Card from "../UI/Card";
import CreateAccount from "./CreateAccount";
import classes from "./Landing.module.css";
import Login from "./Login";
import TextSide from "./TextSide";

const Landing = (props) => {
  const [hasAccount, setHasAccount] = useState(true);
  const [sideIsActive, setSideIsActive] = useState(false);

  const sideClasses = `${classes["form-side"]} ${
    sideIsActive ? classes.bump : ""
  }`;

  const toggleAccHandler = async (acc) => {
    try {
      await setHasAccount(acc);

      await setSideIsActive(true);

      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        document.documentElement.scrollIntoView({
          behavior: "smooth",
        });
        document.body.scrollIntoView({
          behavior: "smooth",
        });
      }

      const timer = setTimeout(() => {
        setSideIsActive(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className={classes.landing}>
      <TextSide togglehandler={toggleAccHandler} hasAccount={hasAccount} />
      <aside className={sideClasses}>
        <Card>
          <h3 className={classes.header}>
            {!hasAccount ? "SIGN UP" : "LOG IN"}
          </h3>
          {hasAccount && <Login onSwitch={toggleAccHandler} />}
          {!hasAccount && <CreateAccount onSwitch={toggleAccHandler} />}
        </Card>
      </aside>
    </section>
  );
};

export default Landing;
