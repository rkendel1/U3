// lib/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);