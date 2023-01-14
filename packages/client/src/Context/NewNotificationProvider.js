import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../redux/action/DeveloperAction';
import { useLoggedUser } from './LoggedUserProvider';

const NewNotificationContext = createContext();

export const useNewNotification = () => {
  return useContext(NewNotificationContext);
};

export const NewNotificationProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { loggedUserId } = useLoggedUser();

  const [newNotification, setNewNotification] = useState({
    visible: false,
    length: 0,
  });

  const { notifications } = useSelector((state) => state.notificationsGet);

  let unseenNotifications = useRef();
  useEffect(() => {
    if (loggedUserId) {
      dispatch(getNotifications(loggedUserId));
      if (notifications?.length > 0) {
        const un = notifications?.filter((n) => n.seen === false);

        unseenNotifications.current = un;

        if (unseenNotifications?.current?.length > 0) {
          setNewNotification({
            visible: true,
            length: unseenNotifications?.current?.length,
          });
        }
      }
    }
  }, [dispatch, loggedUserId, notifications?.length]);

  return (
    <NewNotificationContext.Provider
      value={{
        newNotification,
        setNewNotification,
        notifications,
        unseenNotifications,
      }}
    >
      {children}
    </NewNotificationContext.Provider>
  );
};
