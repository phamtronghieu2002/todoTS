import { useContext } from "react";
import { authContext } from "../../providers/AuthProvider";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  return auth?.isAuth ? children : <Loading />;
}


interface Task {
  username: string;
  ten: string;
}
