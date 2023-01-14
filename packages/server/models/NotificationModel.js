import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    fromUserName: {
      type: String,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
    },
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    postType: {
      type: String,
    },
    postId: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
