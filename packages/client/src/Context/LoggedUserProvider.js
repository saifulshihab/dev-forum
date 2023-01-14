import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const LoggedUserContext = createContext();

export const useLoggedUser = () => {
  return useContext(LoggedUserContext);
};

export const LoggedUserProvider = ({ children }) => {
  const { devInfo } = useSelector((state) => state.signInDev);
  return (
    <LoggedUserContext.Provider value={{ loggedUserId: devInfo?._id }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
