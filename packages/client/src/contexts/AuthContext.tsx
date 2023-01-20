import React, { PropsWithChildren, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
