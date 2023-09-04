import AuthContext from "../store/auth-context";
import classes from "./Home.module.css";
import { Fragment, useContext, useState } from "react";
import Modal from "./UI/Modal";

const Home = (props) => {
  const [areYouSure, setAreYouSure] = useState(false);
  const [yesDelete, setYesDelete] = useState(false);
  const ctx = useContext(AuthContext);
  const username = ctx.activeAcc.username.toUpperCase();

  const onLogOut = () => {
    setAreYouSure(true);
  };

  const onDelete = () => {
    setYesDelete(true);
    setAreYouSure(true);
  };

  const cancelHandler = () => {
    setAreYouSure(false);
    setYesDelete(false);
  };

  const logOutHandler = () => {
    setAreYouSure(false);

    setTimeout(() => {
      ctx.logOut();
    }, 300);
  };

  const deleteHandler = async () => {
    try {
      const res = await fetch(
        `https://react-http-cec6a-default-rtdb.firebaseio.com/accounts.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      // return console.log(res);
      if (!res.ok) {
        throw new Error(
          "Unable to delete account at the moment. Try again later."
        );
      }

      logOutHandler();
    } catch (err) {
      console.error(`${err.message}`);
    }
  };

  return (
    <Fragment>
      {areYouSure && (
        <Modal
          msg={"Are you sure?"}
          youSure={areYouSure}
          onRetry={cancelHandler}
          logOut={logOutHandler}
          delete={deleteHandler}
          yes={yesDelete}
        />
      )}
      <div className={classes.container}>
        <p className={classes.hello}>Hello {username}</p>
        <p className={classes.msg}>{ctx.msg}</p>
        <div className={classes.action}>
          <button className={classes["home-btn"]} onClick={onLogOut}>
            Logout
          </button>
          <button className={classes["home-btn"]} onClick={onDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
