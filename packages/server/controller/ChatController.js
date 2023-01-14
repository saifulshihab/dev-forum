import asyncHandler from 'express-async-handler';
import ChatRoom from '../models/ChatRoomModel.js';
import Developer from '../models/DeveloperModel.js';
import Recruiter from '../models/RecruiterModel.js';
import Conversation from '../models/ConversationModel.js';

// desc: create new room
// routes: api/chat/createRoom
// method: POST
export const createNewRoom = asyncHandler(async (req, res) => {
  const newRoom = await ChatRoom.create({
    sender: req.user._id,
    sender_fname: req.user.full_name,
    sender_dp: req.user.dp,
    ...req.body,
  });
  if (newRoom) {
    res.status(200).json(newRoom);
  } else {
    res.status(500);
    throw new Error('Can not create room!');
  }
});
export const createNewRoom2 = asyncHandler(async (req, res) => {
  const newRoom = await ChatRoom.create({
    sender: req.user._id,
    sender_fname: req.user.fullname,
    sender_dp: '/server/uploads/default_dp.png',
    ...req.body,
  });
  if (newRoom) {
    res.status(200).json(newRoom);
  } else {
    res.status(500);
    throw new Error('Can not create room!');
  }
});

// get chat rooms
// routes: api/chat/getChatRooms/:userId
// method: GET
export const getChatRooms = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  let user;
  const isRecruiter = req.query.recruiter;
  if (isRecruiter) {
    user = await Recruiter.findById(userId);
  } else {
    user = await Developer.findById(userId);
  }
  if (user) {
    const isSender = await ChatRoom.find({ sender: userId });
    const isReceiver = await ChatRoom.find({ receiver: userId });
    if (isReceiver.length > 0 && isSender.length > 0) {
      const rooms = isReceiver.concat(isSender);
      res.status(200).json(rooms);
    } else if (isSender.length > 0) {
      res.status(200).json(isSender);
    } else if (isReceiver.length > 0) {
      res.status(200).json(isReceiver);
    } else {
      res.status(200).json([]);
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// delete chat
// routes: api/chat/deleteChat/:roomId
// method: DELETE
export const deleteChat = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;
  const room = await ChatRoom.findOne({ roomId: roomId });
  if (room) {
    const deleteRoom = await room.delete();
    const deleteConversation = await Conversation.deleteMany({ room: roomId });
    if (deleteRoom && deleteConversation) {
      res.status(200).json({ message: 'Chat deleted!' });
    } else {
      res.status(500);
      throw new Error('Failed to delete chat!');
    }
  } else {
    res.status(404);
    throw new Error('Chat room not found!');
  }
});
