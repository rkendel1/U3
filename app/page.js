// pages/index.js
"use client";
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import JobCard from './components/Jobcard';
import Link from 'next/link'

export default function Home() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch('/api/jobs').then(res => res.json()).then(setJobs);
  }, []);
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">
            Hi Sibin!
          </h1>
          <p className="text-xl mb-8">
            Connect with talented freelancers and get your projects done
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/jobs"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100"
            >
              Find Work
            </Link>
            <Link
              href="/talent"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600"
            >
              Find Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Navbar />
      <h1>Upwork Clone</h1>
      {jobs.map(job => <JobCard key={job._id} job={job} />)}
    </div>
  );
}

const categories = [
  {
    name: 'Web Development',
    description: 'Custom websites, web applications, and e-commerce solutions',
  },
  {
    name: 'Mobile Development',
    description: 'iOS and Android app development services',
  },
  {
    name: 'Design & Creative',
    description: 'UI/UX design, graphic design, and branding services',
  },
]

const steps = [
  {
    title: 'Post a Job',
    description: 'Describe your project and set your budget',
  },
  {
    title: 'Review Proposals',
    description: 'Compare freelancer proposals and choose the best match',
  },
  {
    title: 'Get It Done',
    description: 'Work with your chosen freelancer and pay securely',
  },
]