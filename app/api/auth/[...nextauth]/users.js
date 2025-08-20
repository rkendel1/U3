// pages/api/users.js
import { userDb } from '../../app/db/index.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password, name } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' });
  const existing = await userDb.findByEmail(email);
  if (existing) return res.status(400).json({ error: 'User exists' });
  const hashed = bcrypt.hashSync(password, 10);
  const user = await userDb.create({ email, password: hashed, name, userType: 'client' });
  res.status(201).json({ email: user.email, name: user.name });
}