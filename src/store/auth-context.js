import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: true,
  activeAcc: "",
  msg: "",
  login: "",
  logOut: "",
  users: "",
});

export default AuthContext;
