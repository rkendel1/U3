import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '@/lib/mongodb'

export async function POST(req) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, description, budget, category, skills, duration, clientId } =
      await req.json()

    // Validate input
    if (!title || !description || !budget || !category || !skills || !duration) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Create job
    const job = {
      title,
      description,
      budget: Number(budget),
      category,
      skills,
      duration,
      clientId,
      status: 'open',
      createdAt: new Date(),
      proposals: [],
    }

    const result = await db.collection('jobs').insertOne(job)

    return NextResponse.json(
      { message: 'Job created successfully', jobId: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Job creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const { db } = await connectToDatabase()

    // Build query
    const query = {}
    if (category && category !== 'all') {
      query.category = category
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    // Get jobs
    const jobs = await db
      .collection('jobs')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Jobs fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 