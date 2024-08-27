import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  let [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
}
// 

