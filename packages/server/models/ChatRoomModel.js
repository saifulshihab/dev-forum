import mongoose from 'mongoose';

const ChatRoomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    user_fname: {
      type: String,
      required: true,
    },
    user_dp: {
      type: String,
      required: true,
    },
    sender_fname: {
      type: String,
      required: true,
    },
    sender_dp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);
export default ChatRoom;
