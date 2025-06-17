'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Work</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search jobs..."
            className="flex-1 p-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="design">Design & Creative</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/jobs/${job.id}`} className="hover:text-blue-600">
                    {job.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Budget: ${job.budget}</span>
                  <span>Posted: {job.postedDate}</span>
                  <span>Proposals: {job.proposals}</span>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {job.category}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const jobs = [
  {
    id: 1,
    title: 'Full Stack Developer Needed for E-commerce Platform',
    description:
      'Looking for an experienced full stack developer to build a modern e-commerce platform with React and Node.js.',
    budget: '5000',
    postedDate: '2 days ago',
    proposals: 12,
    category: 'web-development',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
  },
  {
    id: 2,
    title: 'UI/UX Designer for Mobile App',
    description:
      'Need a talented UI/UX designer to create beautiful and intuitive interfaces for our mobile application.',
    budget: '3000',
    postedDate: '1 day ago',
    proposals: 8,
    category: 'design',
    skills: ['UI/UX', 'Figma', 'Mobile Design', 'Prototyping'],
  },
  {
    id: 3,
    title: 'iOS Developer for Social Media App',
    description:
      'Seeking an iOS developer to help build and maintain our social media application.',
    budget: '4000',
    postedDate: '3 days ago',
    proposals: 15,
    category: 'mobile-development',
    skills: ['Swift', 'iOS', 'Xcode', 'Firebase'],
  },
] 