import Notification from '../models/NotificationModel.js';

export const getUserUnseenNotifications = async (userId) => {
  const notifications = await Notification.find({
    toUserId: userId,
  }).sort({ createdAt: '-1' });

  const unseenNotifications = notifications.filter(
    (notification) => notification.seen === false
  );

  return { unseenNotifications };
};
