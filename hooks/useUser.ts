import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export default function useUser() {
  const { user, setUser, login, logout, register } = useContext(UserContext);

  return { user, setUser, login, logout, register };
}
