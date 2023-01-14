import { io } from '../index.js';
import { getUserUnseenNotifications } from './getUserUnseenNotifications.js';

export const sendNotification = async (event, userId, newNotification) => {
  // get unseen notifications
  const { unseenNotifications } = await getUserUnseenNotifications(userId);

  io.local.emit(event, {
    toUserId: userId,
    newNotificationLength: unseenNotifications?.length,
    newNotification: newNotification,
  });
};
