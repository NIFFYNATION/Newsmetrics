import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({ token: "", refresh: "" });

  return (
    <UserContext.Provider value={{ user, auth, setUser, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
