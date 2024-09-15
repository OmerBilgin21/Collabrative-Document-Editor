// hooks
import { useState, useEffect } from "preact/compat";

// context
import { AuthContext } from "./AuthContext";

// utils
import { useAxios } from "../utils/api";

// types
import type { JSX } from "preact/compat";
import type { ReactNode } from "preact/compat";
import type { IUser } from "../interfaces/user";

const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const res: IUser = await useAxios("/auth", "get");
        setIsAuthenticated(true);
        setUser(res);
        console.log("it is set bro we know that");
      } catch (authError) {
        window.alert("Email or password incorrect!");
      }
    };
    isAuthenticated();
  }, []);

  const signIn = async (
    email?: string,
    password?: string,
  ): Promise<IUser | void | Error> => {
    try {
      await useAxios(`/auth/${email}/${password}`, "get");
      await useAxios("/auth", "get");
      setIsAuthenticated(true);
    } catch (authError) {
      window.alert(authError);
    }
  };

  const signUp = async (user: IUser): Promise<IUser | void | Error> => {
    const { email, name, surname, password } = user;
    if (!email || !name || !surname || !password) {
      return;
    }

    try {
      const user: IUser = await useAxios("/auth/signup", "post", {
        name,
        surname,
        password,
        email,
      });

      setUser(user);
    } catch (signUpError) {
      window.alert(signUpError);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signUp,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
