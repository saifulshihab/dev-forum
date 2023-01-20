import React, { ElementType, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { LOGIN } from "./routes";

interface IProps {
  layout: ElementType;
}

const PrivateRoute: React.FC<PropsWithChildren<IProps>> = (props) => {
  const { children, layout: Layout } = props;
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate
      to={{
        pathname: LOGIN,
        search:
          pathname && pathname !== "/" ? `?redirect=${pathname}` : undefined,
      }}
    />
  );
};

export { PrivateRoute };
