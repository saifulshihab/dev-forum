import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SocialSchema = mongoose.Schema({
  platform: {
    type: String,
  },
  link: {
    type: String,
  },
});

const EduSchema = mongoose.Schema({
  institute: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  present: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
  },
  type: {
    type: String,
  },
});

const ExperienceSchema = mongoose.Schema({
  role: {
    type: String,
  },
  company: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  present: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
  },
});

const DeveloperSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    dp: {
      type: String,
      default: '/server/uploads/default_dp.png',
    },
    cover: {
      type: String,
      default: '/server/uploads/default_dp.png',
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    social: [SocialSchema],
    education: [EduSchema],
    experience: [ExperienceSchema],
    github: {
      type: String,
    },
    topSkills: [],
    otherSkills: [],
    workStatus: {
      type: String,
      default: 'off',
    },
    googleId: { type: String },
    twitterId: { type: String },
    githubId: { type: String },
  },
  {
    timestamps: true,
  }
);

DeveloperSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

DeveloperSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Developer = mongoose.model('Developer', DeveloperSchema);

export default Developer;
