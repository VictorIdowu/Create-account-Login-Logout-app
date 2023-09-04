import { useState, useEffect } from "react";
import Home from "./components/Home";
import Landing from "./components/landingPage/Landing";
import Header from "./header/Header";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeAcc, setActiveAcc] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [userList, setUserList] = useState([]);

  const fetchData = async () => {
    const res = await fetch(
      "https://react-http-cec6a-default-rtdb.firebaseio.com/accounts.json"
    );

    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getUsernames = async () => {
      try {
        const data = await fetchData();
        if (!data) {
          return;
        }

        const acc = await Object.values(data);

        const users = await acc.map((ac) => ac.username);
        await setUserList(users);
      } catch (err) {
        console.error(err);
      }
    };
    getUsernames();
  }, []);

  const loggedInHandler = async (account, msg) => {
    await setIsLoggedIn(true);
    await setActiveAcc(account);
    setLoginMsg(msg);
  };

  const logOutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        activeAcc: activeAcc,
        msg: loginMsg,
        login: loggedInHandler,
        logOut: logOutHandler,
        users: userList,
      }}
    >
      <Header />
      <main>
        {!isLoggedIn && <Landing />}
        {isLoggedIn && <Home />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
