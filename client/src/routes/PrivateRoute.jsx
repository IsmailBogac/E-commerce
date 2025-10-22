import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children,role }) => {
  const token = localStorage.getItem("token");

  if (role==="user" && !token) return <Navigate to="/userlogin" />;
  if (role==="admin" && !token) return <Navigate to="/adminpanel" />;
  return children;
};

export default PrivateRoute;
