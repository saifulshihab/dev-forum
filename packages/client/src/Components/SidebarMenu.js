import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../App';
import { useLoggedUser } from '../Context/LoggedUserProvider';
import { useNewNotification } from '../Context/NewNotificationProvider';
import { ADD_NEW_NOTIFICATION } from '../redux/ActionTypes';

const SidebarSVG = ({ fontAwesome, text, notifyMenu }) => {
  const dispatch = useDispatch();
  const { loggedUserId } = useLoggedUser();

  const { newNotification, setNewNotification } = useNewNotification();

  useEffect(() => {
    socket.on(
      'newNotification',
      ({ toUserId, newNotificationLength, newNotification }) => {
        if (toUserId === loggedUserId) {
          dispatch({
            type: ADD_NEW_NOTIFICATION,
            payload: newNotification,
          });
          setNewNotification({
            visible: true,
            length: newNotificationLength,
          });
        }
      }
    );
    return () => {};
  }, [loggedUserId, setNewNotification, dispatch]);

  return (
    <div className="w-full px-4 h-10 mb-1 rounded-full hover:bg-indigo-100 dark:hover:bg-transparent flex justify-start items-center text-lg font-semibold hover:text-indigo-600 cursor-pointer">
      <div className="w-6 mr-3 relative">
        {notifyMenu &&
          (newNotification.visible ? (
            <div className="w-4 h-4 text-white flex items-center justify-center rounded-full bg-red-600 absolute top-0 right-0">
              <span className="" style={{ fontSize: 10 }}>
                {newNotification?.length > 9 ? (
                  <span className="w-full h-full">
                    9<sup>+</sup>
                  </span>
                ) : (
                  newNotification?.length
                )}
              </span>
            </div>
          ) : null)}
        <i className={fontAwesome}></i>
      </div>
      <div className="hidden md:block">{text}</div>
    </div>
  );
};

export default SidebarSVG;
