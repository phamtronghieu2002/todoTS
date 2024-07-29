import { useContext } from "react";
import { authContext, userTypes } from "../providers/AuthProvider";
export default function useAuth() {
  const auth = useContext(authContext) as userTypes;

  return auth;
}
