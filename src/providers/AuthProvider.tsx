import React, { createContext } from "react";
import { useEffect } from "react";
import axios from "..//configs/axios";
import configs from "../configs";
// Define the context type
export interface userTypes {
  isAuth: boolean;
  user: any;
  token: string;
  freshToken: string;
}

// Create the context
export const authContext = createContext<userTypes | null>(null);

// I18nProvider component
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userAuth, setUserAuth] = React.useState<userTypes>({
    isAuth: false,
    user: null,
    token: "",
    freshToken: "",
  });

  useEffect(() => {
    axios
      .get("/auth/profile")
      .then((response) => {
        const result = response;
        const user = result.data?.user;
        if (user) {
          const path = window.location.pathname;
          if (path === configs.paths.login) {
            window.location.href = configs.paths.home;
            return;
          } else {
            const data = result.data;
            login(data);
          }
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const login = (data: any) => {
    const user = data.user;
    setUserAuth({
      isAuth: true,
      user: { id: user.id, username: user.username },
      token: data.accesstoken,
      freshToken: data.freshtoken,
    });
  };

  return (
    <authContext.Provider value={userAuth}>{children}</authContext.Provider>
  );
}

export default AuthProvider;
