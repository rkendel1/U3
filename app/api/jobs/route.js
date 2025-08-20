import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { jobDb } from '../../db/index.js'

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

    // Create job
    const job = await jobDb.create({
      title,
      description,
      budget: Number(budget),
      category,
      skills,
      duration,
      clientId,
    })

    return NextResponse.json(
      { message: 'Job created successfully', jobId: job.id },
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

    // Get jobs with filters
    const jobs = await jobDb.findAll({
      category: category || undefined,
      search: search || undefined
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Jobs fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 