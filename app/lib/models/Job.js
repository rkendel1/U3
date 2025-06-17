// lib/models/Job.js
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);