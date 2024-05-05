import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
    component: JSX.Element;
  };
  
  export default function ProtectedRoute({isAuthenticated, authenticationPath, component}: ProtectedRouteProps) {
    if(isAuthenticated) {
      return component;
    } else {
      return <Navigate to={{ pathname: authenticationPath }} />;
    }
  };
  