import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Message from '../../Components/Message';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5001');

const DevOpenChat = ({recruiter}) => {
  const bottomListRef = useRef();
  const inputRef = useRef();

  const { roomId } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const devProfile = useSelector((state) => state.devProfile);
  const { user: loggedUser } = devProfile;

  useEffect(() => {
    if (loggedUser?.username || recruiter) {
      socket.emit('join', { name: recruiter ? 'recruiter' : loggedUser?.username, room: roomId });
    }
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, [roomId, loggedUser?.username, recruiter]);

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', newMessage, () => {
      setNewMessage('');
    });
    bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='w-full h-full'>
      <div className='h-12 text-center w-full bg-white border-b-2 '></div>
      <div className='flex flex-col h-full' style={{ height: '80vh' }}>
        <div className='overflow-auto h-full w-full'>
          <div className='py-4 max-w-screen-lg mx-auto w-full'>
            <ul className='text-right mr-2 pb-8'>
              {messages?.map((data) => (
                <li key={data?.id}>
                  <Message {...data} />
                </li>
              ))}
            </ul>
            <div ref={bottomListRef}></div>
          </div>
        </div>
        <div className='w-full'>
          <form
            onSubmit={submitHandler}
            className='flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md'
          >
            <input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='Write here...'
              className='flex-1 bg-transparent outline-none'
            />
            <button
              disabled={newMessage === ''}
              className='focus:outline-none uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors'
            >
              <i className='fas fa-paper-plane'></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DevOpenChat;
