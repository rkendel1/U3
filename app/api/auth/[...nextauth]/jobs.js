// pages/api/jobs.js
import { userDb, jobDb } from '../../app/db/index.js';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const jobs = await jobDb.findAll();
    return res.json(jobs);
  }
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).end();
    const { title, description, budget } = req.body;
    const job = await jobDb.create({
      title,
      description,
      budget,
      clientId: parseInt(session.user.id),
    });
    return res.status(201).json(job);
  }
  res.status(405).end();
}