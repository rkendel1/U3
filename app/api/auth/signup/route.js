import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/mongodb'

export async function POST(req) {
  try {
    const { name, email, password, userType } = await req.json()

    // Validate input
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = {
      name,
      email,
      password: hashedPassword,
      userType,
      createdAt: new Date(),
    }

    await db.collection('users').insertOne(user)

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 