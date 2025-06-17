// pages/api/jobs.js
import dbConnect from '../../lib/dbConnect';
import Job from '../../lib/models/Job';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    const jobs = await Job.find().populate('user', 'name');
    return res.json(jobs);
  }
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).end();
    const { title, description, budget } = req.body;
    const job = await Job.create({
      title,
      description,
      budget,
      user: session.user.id,
    });
    return res.status(201).json(job);
  }
  res.status(405).end();
}