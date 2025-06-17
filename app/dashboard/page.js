'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {session.user.userType === 'freelancer' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Jobs */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Active Jobs</h2>
            <div className="space-y-4">
              <p className="text-gray-600">No active jobs</p>
            </div>
          </div>

          {/* Proposals */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Proposals</h2>
            <div className="space-y-4">
              <p className="text-gray-600">No recent proposals</p>
            </div>
          </div>

          {/* Earnings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Earnings</h2>
            <div className="space-y-4">
              <p className="text-gray-600">No earnings yet</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Posted Jobs */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
            <div className="space-y-4">
              <p className="text-gray-600">No jobs posted yet</p>
            </div>
          </div>

          {/* Active Contracts */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Active Contracts</h2>
            <div className="space-y-4">
              <p className="text-gray-600">No active contracts</p>
            </div>
          </div>

          {/* Proposals Received */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Proposals Received</h2>
            <div className="space-y-4">
              <p className="text-gray-600">No proposals received</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          {session.user.userType === 'freelancer' ? (
            <button
              onClick={() => router.push('/jobs')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Find Work
            </button>
          ) : (
            <button
              onClick={() => router.push('/post-job')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Post a Job
            </button>
          )}
          <button
            onClick={() => router.push('/messages')}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200"
          >
            Messages
          </button>
        </div>
      </div>
    </div>
  )
} 