import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "./config";
import { message } from "antd";

const context = createContext(null);

const ContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await axios.get(`${config.apiHost}/auth`, { withCredentials: true });

        setAuthenticated(true);
      } catch (error) {
        return message.error("Something went wrong");
      }
    })();
  }, []);
  return (
    <context.Provider value={{ authenticated }}>{children}</context.Provider>
  );
};

export const useAppContext = () => useContext(context);

export default ContextProvider;
