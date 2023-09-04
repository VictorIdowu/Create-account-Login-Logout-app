import { Fragment, useState, useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./LoginAndSignUp.module.css";
import AuthContext from "../../store/auth-context";

const Login = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [noAcc, setNoAcc] = useState(false);

  const ctx = useContext(AuthContext);

  const toSignUpHandler = async () => {
    props.onSwitch(false);
  };

  const usernameHandler = (e) => {
    setEnteredUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const keydownHandler = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const onSubmitHandler = async (e) => {
    await e.preventDefault();

    try {
      const res = await fetch(
        "https://react-http-cec6a-default-rtdb.firebaseio.com/accounts.json"
      );

      if (!res.ok) {
        throw new Error("Couldn't fetch data");
      }

      const data = await res.json();
      if (!data) {
        setNoAcc(true);
        throw new Error("Please Create an account first");
      }
      const acc = await Object.values(data);

      const currentAcc = await acc.find(
        (item) =>
          item.username === enteredUsername && item.password === enteredPassword
      );

      if (!currentAcc) {
        throw new Error("Username or Password is incorrect");
      }

      if (currentAcc) {
        ctx.login(currentAcc, "Welcome Back");
      }
    } catch (err) {
      console.error(`An error occured, ${err.message}`);
      setErrorMsg(err.message);
      return setInvalidLogin(true);
    }
  };

  const tryAgainHandler = () => {
    setInvalidLogin(false);
    if (noAcc) {
      setTimeout(() => {
        props.onSwitch(false);
      }, 300);
    }
  };

  return (
    <Fragment>
      {invalidLogin && <Modal onRetry={tryAgainHandler} msg={errorMsg} />}
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            required
            value={enteredUsername}
            onChange={usernameHandler}
            id="username"
            onKeyDown={keydownHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            value={enteredPassword}
            onChange={passwordHandler}
            id="password"
            onKeyDown={keydownHandler}
          />
        </div>
        <div className={classes.action}>
          <button>Login</button>
          <p>
            You don't have an account?{" "}
            <span onClick={toSignUpHandler}>Create Account!</span>
          </p>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
