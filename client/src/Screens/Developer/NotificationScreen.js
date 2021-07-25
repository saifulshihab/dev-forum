import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../../Components/Notification';
import { useNewNotification } from '../../Context/NewNotificationProvider';
import { seenNotifications } from '../../redux/action/DeveloperAction';

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const { notifications } = useNewNotification();

  const { error } = useSelector((state) => state.notificationsSeen);

  useEffect(() => {
    // seen new notfications

    dispatch(seenNotifications());

    return () => {};
  }, [dispatch]);

  return (
    <div className="w-full h-full p-1 bg-white dark:bg-gray-800">
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {notifications?.map((notify) => (
        <Notification key={notify?._id} notification={notify} />
      ))}
    </div>
  );
};

export default NotificationScreen;
