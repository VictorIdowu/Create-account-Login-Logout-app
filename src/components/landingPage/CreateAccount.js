import { Fragment, useContext, useState } from "react";
import classes from "./LoginAndSignUp.module.css";
import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal";

const CreateAccount = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [invalidSignUp, setInvalidSignUp] = useState(false);

  const ctx = useContext(AuthContext);

  const toLoginHandler = () => {
    props.onSwitch(true);
  };

  const usernameHandler = (e) => {
    setEnteredUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setEnteredConfirmPassword(e.target.value);
  };

  const keydownHandler = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const strongPass = enteredConfirmPassword.length > 5;
      const accurate = enteredPassword === enteredConfirmPassword;

      if (!strongPass) {
        throw new Error("Password should be at least 6 characters.");
      }

      if (!accurate) {
        throw new Error("Password does not match.");
      }

      let regAcc = {
        username: enteredUsername,
        password: enteredConfirmPassword,
        id: enteredUsername,
      };

      if (ctx.users.includes(regAcc.username)) {
        throw new Error(
          `Username "@${regAcc.username}" is already in use. Try a diffrent one.`
        );
      }

      const res = await fetch(
        "https://react-http-cec6a-default-rtdb.firebaseio.com/accounts.json",
        {
          method: "POST",
          headers: { "content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(regAcc),
        }
      );

      if (!res.ok) {
        throw new Error("Something Went wrong. Please try again.");
      }

      if (res.ok) ctx.login(regAcc, "Welcome on board");
    } catch (err) {
      await setErrMsg(err.message);
      return setInvalidSignUp(true);
    }
  };

  const tryAgainHandler = () => {
    setInvalidSignUp(false);
  };

  return (
    <Fragment>
      {invalidSignUp && <Modal onRetry={tryAgainHandler} msg={errMsg} />}
      <form onSubmit={signUpHandler} className={classes.form}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={usernameHandler}
            type="text"
            value={enteredUsername}
            onKeyDown={keydownHandler}
            id="username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={passwordHandler}
            type="password"
            value={enteredPassword}
            onKeyDown={keydownHandler}
            id="password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            onChange={confirmPasswordHandler}
            type="password"
            value={enteredConfirmPassword}
            onKeyDown={keydownHandler}
            id="confirm-password"
            required
          />
        </div>
        <div className={classes.action}>
          <button>Create Account</button>
          <p>
            Already have an account?{" "}
            <span onClick={toLoginHandler}>Log in!</span>
          </p>
        </div>
      </form>
    </Fragment>
  );
};

export default CreateAccount;
