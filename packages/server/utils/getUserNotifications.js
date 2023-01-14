import Notification from '../models/NotificationModel.js';

export const getUserNotifications = async (userId) => {
  const notifications = await Notification.find({
    toUserId: userId,
  }).sort({ createdAt: '-1' });

  return { notifications };
};
