import { createContext, useEffect, useState } from "react";
import { User, UserContextType } from "@/types";
import { getToken, removeToken, setToken, validateToken } from "@/helpers/tokenHelper";
import { useRouter } from "next/router";

export const UserContext = createContext({} as UserContextType);

export default function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (getToken()) {
      validateToken().then((user) => {
        if (user) {
          setUser(user)
        }
      })
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:5000/auth/authorize", {
      method: "post",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        email,
        secret: password
      })
    })

    if (res.ok) {
      const jsonRes = await res.json();
      const { id, firstname, lastname, email } = jsonRes.profile;
      setToken(jsonRes.token)
      setUser({
        id,
        firstname,
        lastname,
        email
      })
      router.replace("/")
    }
  }

  const register = async (firstname: string, lastname: string, email: string, password: string) => {
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        secret: password
      })
    })

    if (res.ok) {
      const jsonRes = await res.json();
      const { id, firstname, lastname, email } = jsonRes.profile;
      setUser({ id, firstname, lastname, email })
      setToken(jsonRes.token)
      router.replace("/")
    }
  }

  const logout = () => {
    setUser(null)
    removeToken();
    router.replace("/")
  }

  return (
    <UserContext.Provider value={{
      user: user,
      setUser: setUser,
      login: login,
      logout: logout,
      register,
    }}>
      {children}
    </UserContext.Provider>
  )
}