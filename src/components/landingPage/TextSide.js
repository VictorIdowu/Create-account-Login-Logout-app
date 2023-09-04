import { useState } from "react";
import classes from "./TextSide.module.css";

const TextSide = (props) => {
  const [acc, setAcc] = useState(false);

  const onSwitch = async () => {
    await setAcc((prevState) => !prevState);
    props.togglehandler(acc);
  };
  return (
    <aside className={classes["landing-div"]}>
      <h3 className={classes["landing-text"]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, illo
        perferendis voluptate cumque culpa nisi debitis voluptates nihil
        pariatur beatae vel libero velit nam minus dolores aspernatur labore
        veniam tempore?
      </p>
      <button onClick={onSwitch} className={classes["landing-btn"]}>
        {props.hasAccount ? "Create an Account" : "Log in"}
      </button>
    </aside>
  );
};

export default TextSide;
