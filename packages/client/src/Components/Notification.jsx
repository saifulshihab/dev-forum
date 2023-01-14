import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Notification = ({ notification }) => {
  const { seen } = useSelector((state) => state.notificationsSeen);
  return (
    <Link
      to={`${
        notification?.postType === 'question'
          ? `/h/forum/questions/${notification?.postId}`
          : notification?.postType === 'user'
          ? `/h/user/${notification?.postId}`
          : `/h/forum/articles/${notification?.postId}`
      }`}
    >
      <div
        className={`w-full h-10 p-2 rounded-md shadow  ${
          notification?.seen
            ? `bg-gray-100 dark:bg-gray-900`
            : `${
                seen
                  ? 'bg-gray-100 dark:bg-gray-900'
                  : 'bg-gray-300 dark:bg-gray-700'
              }`
        } flex items-center  mb-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200`}
      >
        <div className="w-8 h-full flex items-center justify-center mr-2">
          <i
            className={`text-indigo-400 fas fa-${
              notification?.type === 'comment'
                ? 'comment'
                : notification?.type === 'share'
                ? 'share'
                : notification?.type === 'follow' && 'user-plus'
            } text-xl`}
          ></i>
        </div>
        <div className="flex-1 h-full">
          <p className="text-sm truncate">
            <span className="font-semibold">{notification?.fromUserName}</span>{' '}
            {notification?.text}
          </p>
        </div>
        <div className="h-full flex items-center justify-center">
          <p className="text-xs italic">
            {moment(notification?.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Notification;
