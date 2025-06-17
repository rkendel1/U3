// pages/api/users.js
import dbConnect from '../../lib/dbConnect';
import User from '../../lib/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await dbConnect();
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'User exists' });
  const hashed = bcrypt.hashSync(password, 10);
  const user = await User.create({ email, password: hashed, name });
  res.status(201).json({ email: user.email, name: user.name });
}