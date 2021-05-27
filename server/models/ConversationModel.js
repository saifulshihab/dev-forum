import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;
