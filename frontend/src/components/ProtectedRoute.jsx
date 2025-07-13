import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    console.log("Loading");
    return <div>Loading ...</div>;
  }

  if (!auth) {
    console.log("No auth");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
