import mongoose from 'mongoose';

const CircularSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    skills: [],
    salaryFrom: {
      type: Number,
    },
    salaryTo: {
      type: Number,
    },
    jobType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    negotiable: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recruiter',
    },
  },
  {
    timestamps: true,
  }
);

const Circular = mongoose.model('Circular', CircularSchema);
export default Circular;
