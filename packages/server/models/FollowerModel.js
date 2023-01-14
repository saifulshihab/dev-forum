import mongoose from 'mongoose';

const FollowerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
    },
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
    },
  },
  {
    timestamps: true,
  }
);

const Follower = mongoose.model('Follower', FollowerSchema);
export default Follower;
