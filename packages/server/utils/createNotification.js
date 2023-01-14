import Notification from '../models/NotificationModel.js';

export const createNotification = async (
  fromUserName,
  toUserId,
  text,
  type,
  postType,
  postId
) => {
  const newNotification = await Notification.create({
    fromUserName,
    toUserId,
    text,
    type,
    postType,
    postId,
  });

  return { newNotification };
};
