# Upwork Clone - Freelance Platform

A modern freelance platform built with Next.js and SQLite, featuring user authentication, job posting, and job searching capabilities.

## Features

- **User Authentication**: Secure signup/login with NextAuth.js
- **Job Management**: Post jobs, browse available jobs, and manage proposals
- **SQLite Database**: Local database storage for development with automatic schema initialization
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Dynamic content loading and form handling

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Authentication**: NextAuth.js with credentials provider
- **Database**: SQLite with automatic schema migration
- **Password Hashing**: bcryptjs for secure password storage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd U3
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-make-this-random-in-production
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The application uses SQLite for local development with automatic schema initialization:

- **Database Location**: `./app/db/database.sqlite`
- **Schema File**: `./app/db/schema.sql`
- **Auto-initialization**: Database and tables are created automatically on first run

### Database Schema

The application includes two main tables:

**Users Table:**
- `id` (INTEGER PRIMARY KEY)
- `email` (TEXT UNIQUE)
- `password` (TEXT - hashed)
- `name` (TEXT)
- `userType` (TEXT - 'client' or 'freelancer')
- `createdAt`, `updatedAt` (DATETIME)

**Jobs Table:**
- `id` (INTEGER PRIMARY KEY)
- `title`, `description` (TEXT)
- `budget` (REAL)
- `category`, `skills` (TEXT - JSON array for skills)
- `duration`, `status` (TEXT)
- `clientId` (INTEGER - foreign key to users)
- `createdAt`, `updatedAt` (DATETIME)

## Usage

### User Registration
1. Navigate to `/signup`
2. Fill in name, email, password, and user type (client/freelancer)
3. Submit to create account and automatic login

### Job Posting
1. Login as a client user
2. Navigate to `/post-job`
3. Fill in job details including title, description, budget, category, skills, and duration
4. Submit to create job listing

### Job Browsing
1. Visit `/jobs` to view all available jobs
2. Use search and category filters to find specific jobs
3. Jobs display title, description, budget, client name, and required skills

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/[...nextauth]` - Authentication (NextAuth.js)
- `GET /api/jobs` - Fetch all jobs with optional filtering
- `POST /api/jobs` - Create new job posting (requires authentication)

## Development

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Database Operations

The SQLite database operations are handled through:
- `app/db/index.js` - Database connection and query utilities
- `app/db/schema.sql` - Database schema definition

## Recent Changes

This application was recently migrated from MongoDB to SQLite for local development:

- ✅ Removed MongoDB/Mongoose dependencies
- ✅ Implemented SQLite with comprehensive query utilities
- ✅ Updated all API routes to use SQLite
- ✅ Maintained all existing functionality
- ✅ Added automatic database schema initialization
- ✅ Preserved user relationships and data integrity

## Deployment

For production deployment:

1. Consider using a production database (PostgreSQL, MySQL, etc.)
2. Update environment variables for production URLs
3. Ensure proper security measures for NEXTAUTH_SECRET
4. Build and deploy using your preferred platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
