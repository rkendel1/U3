// components/Navbar.js
"use client";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            UpworkClone
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600">
              Find Work
            </Link>
            <Link href="/talent" className="text-gray-700 hover:text-blue-600">
              Find Talent
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}