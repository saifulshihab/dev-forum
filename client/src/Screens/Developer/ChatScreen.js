import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { baseURL } from '../../baseURL';
import Alert from '../../Components/Alert';
import { devGetChatRooms } from '../../redux/action/DeveloperAction';
import OpenChatScreen from './OpenChatScreen';
import Loader from '../../Components/Loader';
import { useLocalStorage } from '../../useLocalStorage';

const recId = JSON.parse(localStorage?.getItem('recInfo'))?._id;

const ChatScreen = ({ recruiter }) => {
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();

  const devChatRoomsGet = useSelector((state) => state.devChatRoomsGet);
  const { loading: roomLoading, rooms, error: roomError } = devChatRoomsGet;

  const { loggedUserId } = useLocalStorage('devInfo');

  useEffect(() => {
    // get user chat rooms
    dispatch(devGetChatRooms(recruiter ? recId : loggedUserId, recruiter));
  }, [recruiter, dispatch, loggedUserId]);

  return (
    <div className='grid grid-cols-4 w-full h-full'>
      <div className='col-span-1 bg-white border-l'>
        <div className='h-12 border-b-2'>
          <p className='inline-block text-xl p-2 font-bold text-gray-600'>
            Chats
          </p>
          <span className='italic text-xs text-gray-400'>Beta</span>
        </div>
        <div>
          {roomLoading ? (
            <Loader />
          ) : roomError ? (
            <Alert fail msg={roomError} />
          ) : rooms?.length > 0 ? (
            rooms?.map((room) => (
              <Link key={room?._id} to={`${url}/${room?.roomId}`}>
                <div className='flex items-center h-12 border-b p-1 hover:bg-gray-100 cursor-pointer'>
                  <div className='ml-2 flex items-center'>
                    <div className='h-8 w-8 mr-2'>
                      <img
                        alt='dp'
                        src={
                          room?.sender === loggedUserId
                            ? baseURL + room?.user_dp
                            : baseURL + room?.sender_dp
                        }
                        className='w-full h-full rounded-full'
                      />
                    </div>
                    <div>
                      {loggedUserId ? (
                        <p className='text-gray-500 font-semibold'>
                          {room?.sender === loggedUserId
                            ? room?.user_fname
                            : room?.sender_fname}
                        </p>
                      ) : (
                        <p className='text-gray-500 font-semibold'>
                          {room?.sender === recId
                            ? room?.user_fname
                            : room?.sender_fname}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className='text-gray-400 p-1 text-center text-sm'>Empty chat</p>
          )}
        </div>
      </div>
      <div className='col-span-3 border-l'>
        {/* chat open here */}
        <Route
          path={`${path}/:roomId`}
          component={() => <OpenChatScreen recruiter={recruiter} />}
        />
      </div>
    </div>
  );
};

export default ChatScreen;
