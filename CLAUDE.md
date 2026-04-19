# CLAUDE.md - AI Assistant Development Guide

## Project Overview

This is a **personal portfolio website** built with Next.js for showcasing professional accomplishments, experience, publications, and projects. The current instance is customized for Naveen Chatlapalli, Manager of Solution Architecture and Gen AI Engineer based in Dallas, Texas.

**Key Features:**
- Portfolio showcase with projects, publications, talks, and videos
- Lead capture system for document downloads
- Admin dashboard for analytics
- Dark/light mode theme support
- GitHub integration for latest repositories
- Serverless PostgreSQL database integration
- SEO-optimized with Open Graph meta tags

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 14.2.35 | React framework with SSR/SSG and API routes |
| **React** | 18.2.0 | UI component library |
| **Tailwind CSS** | 3.2.1 | Utility-first CSS framework |
| **PostgreSQL** | via pg 8.16.3 | Relational database |
| **Neon** | @neondatabase/serverless | Serverless PostgreSQL driver |
| **next-themes** | latest | Dark mode support |
| **react-rough-notation** | 1.0.2 | Animated text highlighting |
| **Axios** | 1.7.9 | HTTP client |
| **Vercel Analytics** | 1.0.2 | Analytics tracking |

---

## Project Structure

```
/home/user/aifanatic.pro/
├── pages/                      # Next.js pages and API routes
│   ├── _app.js                # App wrapper with ThemeProvider
│   ├── index.js               # Home page (getServerSideProps for GitHub)
│   ├── about.js, bio.js, contact.js, etc.
│   ├── admin/
│   │   └── leads.js          # Admin dashboard for lead analytics
│   └── api/
│       ├── download.js        # POST - Lead capture endpoint
│       ├── leads.js           # GET - Admin API (protected)
│       └── hello.js           # GET - Health check
│
├── components/                 # Reusable React components
│   ├── ContainerBlock.js      # Layout wrapper with SEO meta tags
│   ├── Hero.js                # Hero banner with CTA buttons
│   ├── Navbar.js              # Navigation with theme toggle
│   ├── Footer.js              # Footer section
│   ├── DownloadForm.js        # Lead capture form
│   └── [Other components]     # AboutMe, Bio, Experience, etc.
│
├── lib/                        # Utility functions
│   ├── database.js            # PostgreSQL connection and CRUD functions
│   └── getLatestRepos.js      # GitHub API integration
│
├── constants/                  # Static data
│   └── data.js                # Single source of truth for portfolio data
│
├── styles/                     # CSS files
│   ├── globals.css            # Global Tailwind and custom styles
│   ├── Home.module.css        # CSS modules
│   └── fonts.css              # Custom fonts
│
├── public/                     # Static assets
│   ├── documents/             # Downloadable PDFs
│   └── *.png, *.jpg, *.webp  # Images and avatars
│
└── Configuration Files
    ├── package.json           # Dependencies and scripts
    ├── jsconfig.json          # Path aliases
    ├── tailwind.config.js     # Tailwind configuration
    ├── postcss.config.js      # PostCSS plugins
    └── .env.example           # Environment variables template
```

---

## Key Conventions and Patterns

### 1. Path Aliases (jsconfig.json)

Use these import aliases throughout the codebase:

```javascript
import Component from '@components/Component'
import { userData } from '@constants/data'
import { storeLead } from '@lib/database'
import '@styles/globals.css'
```

**Available aliases:**
- `@components/*` → `components/`
- `@constants/*` → `constants/`
- `@lib/*` → `lib/`
- `@styles/*` → `styles/`
- `@data/*`, `@utils/*`, `@layouts/*`, `@hooks/*` (available but not currently used)

### 2. Centralized Data Management

**IMPORTANT:** All portfolio data is stored in `/constants/data.js`. This is the **single source of truth** for:
- Personal information (name, email, address, avatar)
- Projects, publications, talks, videos
- Experience, education, certifications
- Social media links
- Recent highlights

**When updating content:** Always modify `data.js` rather than hardcoding values in components.

### 3. Layout Pattern (ContainerBlock)

All pages should use `ContainerBlock` wrapper for consistent layout and SEO:

```javascript
import ContainerBlock from "@components/ContainerBlock";

export default function PageName() {
  return (
    <ContainerBlock
      title="Custom Page Title"
      description="Custom page description for SEO"
    >
      {/* Page content */}
    </ContainerBlock>
  );
}
```

**ContainerBlock provides:**
- Navbar and Footer on all pages
- SEO meta tags (Open Graph, Twitter Cards)
- Dark mode background styling
- Consistent layout structure

### 4. Styling Conventions

**Primary approach:** Tailwind CSS utility classes

```javascript
// Dark mode support
<div className="bg-white dark:bg-gray-800">

// Responsive design
<div className="hidden md:block lg:flex">

// Common color scheme
- Primary: blue-500, purple-600
- Accent: emerald-500, teal-500
- Dark mode: gray-800, gray-900
```

**CSS Modules:** Use for page-specific styles when utilities aren't sufficient

```javascript
import styles from '@styles/Home.module.css'
<div className={styles.container}>
```

### 5. Component Architecture

**Functional components only** - No class components in this codebase

```javascript
export default function ComponentName({ prop1, prop2 }) {
  // Component logic
  return (
    // JSX
  );
}
```

**Common patterns:**
- Use React hooks (useState, useEffect, useRouter)
- Props destructuring in function parameters
- Early returns for conditional rendering
- Tailwind for styling (inline classes)

### 6. API Route Pattern

All API routes follow Next.js API route conventions:

```javascript
export default async function handler(req, res) {
  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Business logic
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

**Authentication pattern (admin endpoints):**
```javascript
const authHeader = req.headers.authorization;
if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

---

## Database Schema

**Type:** PostgreSQL (via Neon serverless)

### Tables

#### `leads` table
```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, document_name)  -- Prevents duplicate downloads
);
```

#### `downloads` table
```sql
CREATE TABLE downloads (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id),
  document_path VARCHAR(500) NOT NULL,
  downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Database Functions (lib/database.js)

```javascript
import { initializeDatabase, storeLead, logDownload, getLeads } from '@lib/database'

// Initialize schema (runs automatically on app start)
await initializeDatabase()

// Store lead (upserts on conflict)
const leadId = await storeLead(name, email, documentName, ipAddress, userAgent)

// Log download event
await logDownload(leadId, documentPath)

// Get leads with pagination and download counts
const leads = await getLeads(limit, offset)
```

**Key features:**
- Automatic schema initialization on startup
- Connection pooling for performance
- Upsert pattern (INSERT ... ON CONFLICT DO UPDATE)
- SSL connection to database

---

## API Endpoints

### POST /api/download
**Purpose:** Capture lead information and log document downloads

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "documentName": "Resume",
  "documentPath": "/documents/resume.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead captured and download initiated",
  "leadId": 123,
  "downloadUrl": "/documents/resume.pdf"
}
```

**Validation:**
- All fields required
- Email format validation
- IP address and user-agent captured automatically
- Duplicate email+document combinations handled gracefully

### GET /api/leads
**Purpose:** Admin endpoint to retrieve captured leads

**Authentication:** Bearer token required
```
Authorization: Bearer YOUR_ADMIN_SECRET_KEY
```

**Query parameters:**
- `limit` (default: 100)
- `offset` (default: 0)

**Response:**
```json
{
  "leads": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "document_name": "Resume",
      "ip_address": "192.168.1.1",
      "created_at": "2024-01-01T00:00:00Z",
      "download_count": 3
    }
  ]
}
```

### GET /api/hello
**Purpose:** Health check endpoint
**Response:** `{ name: 'John Doe' }`

---

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# GitHub API Integration
GITHUB_CLIENT_ID=''           # GitHub OAuth client ID
GITHUB_CLIENT_SECRET=''       # GitHub OAuth client secret
GITHUB_AUTH_TOKEN=''          # Personal access token for API

# Database
DATABASE_URL=''               # PostgreSQL connection string (Neon)

# Admin Authentication
ADMIN_SECRET_KEY=''           # Backend secret for API auth
NEXT_PUBLIC_ADMIN_SECRET=''   # Frontend secret for admin pages
```

**Setup:**
1. Copy `.env.example` to `.env.local`
2. Fill in all required values
3. Never commit `.env.local` to git

---

## Common Development Tasks

### Starting Development Server
```bash
npm run dev
# Server runs on http://localhost:3000
```

### Building for Production
```bash
npm run build    # Creates optimized production build
npm start        # Runs production server
```

### Updating Portfolio Content
1. Edit `/constants/data.js`
2. Update relevant sections (projects, experience, publications, etc.)
3. Changes are reflected immediately (no code changes needed)

### Adding a New Page
1. Create file in `/pages/` directory (e.g., `new-page.js`)
2. Wrap content in `ContainerBlock`
3. Add navigation link in `Navbar.js` if needed

```javascript
import ContainerBlock from "@components/ContainerBlock";

export default function NewPage() {
  return (
    <ContainerBlock title="Page Title" description="Page description">
      <section className="bg-white dark:bg-gray-800">
        {/* Content */}
      </section>
    </ContainerBlock>
  );
}
```

### Adding a New Component
1. Create file in `/components/` directory
2. Use functional component pattern
3. Style with Tailwind utilities
4. Import data from `@constants/data` if needed

```javascript
export default function NewComponent({ data }) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Component content */}
    </div>
  );
}
```

### Creating New API Endpoint
1. Create file in `/pages/api/` directory
2. Export default async function `handler(req, res)`
3. Validate HTTP method
4. Handle errors with try/catch
5. Return appropriate status codes

### Database Operations
1. Import functions from `@lib/database`
2. Use try/catch for error handling
3. Connection pool is managed automatically
4. Schema initializes on app startup

---

## Server-Side Rendering (SSR)

**Home page uses getServerSideProps** to fetch GitHub repositories:

```javascript
// pages/index.js
export async function getServerSideProps() {
  const repositories = await getLatestRepos(userData, 6);
  return {
    props: { repositories }
  };
}
```

**When to use SSR:**
- Data changes frequently (GitHub repos, etc.)
- Need fresh data on every request
- SEO is critical

**When to use Static Generation (default):**
- Content doesn't change often
- Faster page loads
- Most pages in this project

---

## Theme System

**Implementation:** `next-themes` with Tailwind CSS

**Usage in components:**
```javascript
import { useTheme } from 'next-themes'

const { theme, setTheme } = useTheme()

// Toggle theme
<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Theme
</button>

// Style based on theme
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
```

**Configuration:**
- Default theme: `light`
- Theme attribute: `class` (adds `dark` class to `<html>`)
- Configured in `pages/_app.js`

---

## Code Style Best Practices

### 1. Import Order
```javascript
// External libraries
import React from 'react'
import { useRouter } from 'next/router'

// Internal components (with aliases)
import Component from '@components/Component'

// Constants and data
import { userData } from '@constants/data'

// Styles
import styles from '@styles/Home.module.css'
```

### 2. Component Structure
```javascript
export default function Component({ props }) {
  // Hooks
  const router = useRouter()
  const [state, setState] = useState(initial)

  // Functions
  const handleClick = () => {
    // Handler logic
  }

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies])

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### 3. Conditional Rendering
```javascript
// Early return for loading/error states
if (loading) return <div>Loading...</div>
if (error) return <div>Error: {error}</div>

// Ternary for inline conditions
{isVisible ? <Component /> : null}

// Logical AND for simple conditions
{isVisible && <Component />}
```

### 4. Data Handling
```javascript
// Trim and normalize user input
const normalizedEmail = email.trim().toLowerCase()

// Destructure with defaults
const { name = 'Unknown', email } = userData

// Safe property access
const username = user?.profile?.username || 'Anonymous'
```

### 5. Error Handling
```javascript
// API routes
try {
  // Logic
  return res.status(200).json({ success: true })
} catch (error) {
  console.error('Error:', error)
  return res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  })
}

// Client-side
try {
  const response = await axios.post('/api/endpoint', data)
} catch (error) {
  console.error('Request failed:', error)
  setError(error.response?.data?.error || 'Request failed')
}
```

---

## Security Considerations

### 1. API Authentication
- Admin endpoints require Bearer token authentication
- Tokens stored in environment variables
- Never expose `ADMIN_SECRET_KEY` in client-side code

### 2. Input Validation
- Always validate email format
- Trim and sanitize user input
- Use parameterized queries (prevents SQL injection)

```javascript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(email)) {
  return res.status(400).json({ error: 'Invalid email format' })
}

// Parameterized queries
const query = 'INSERT INTO leads (name, email) VALUES ($1, $2)'
await pool.query(query, [name, email])  // Safe from SQL injection
```

### 3. Environment Variables
- Never commit `.env.local` to version control
- Use `NEXT_PUBLIC_` prefix only for client-exposed variables
- Rotate secrets regularly

### 4. Database Security
- SSL enabled for database connections
- Connection string stored in environment variables
- UNIQUE constraints prevent duplicate data

---

## Testing Guidelines

**Current status:** No formal testing framework configured

**Recommended setup (if adding tests):**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Test structure suggestion:**
```
/home/user/aifanatic.pro/
├── __tests__/
│   ├── components/
│   ├── pages/
│   └── api/
```

---

## Deployment

**Primary platform:** Vercel (optimized for Next.js)

**Deployment process:**
1. Push to GitHub
2. Vercel auto-deploys from main branch
3. Preview deployments for PRs

**Environment variables:**
- Configure in Vercel dashboard
- Settings → Environment Variables
- Add all variables from `.env.example`

**Build command:** `npm run build`
**Output directory:** `.next`

**Custom domain:** `naveen.aifanatic.pro`

---

## Common Pitfalls and Solutions

### 1. Database Connection Issues
**Problem:** "Error connecting to database"
**Solution:**
- Check `DATABASE_URL` in environment variables
- Verify Neon database is active
- Ensure SSL is enabled in connection string

### 2. GitHub API Rate Limiting
**Problem:** "API rate limit exceeded"
**Solution:**
- Add `GITHUB_AUTH_TOKEN` to environment variables
- Use authenticated requests for higher limits

### 3. Dark Mode Flickering
**Problem:** Flash of wrong theme on page load
**Solution:**
- `next-themes` handles this automatically
- Ensure `ThemeProvider` wraps entire app in `_app.js`

### 4. Path Alias Not Working
**Problem:** "Module not found" with `@components/...`
**Solution:**
- Check `jsconfig.json` configuration
- Restart development server after changing jsconfig

### 5. Build Errors
**Problem:** Build fails in production but works locally
**Solution:**
- Check for unused imports
- Verify all environment variables are set in Vercel
- Review build logs for specific errors

---

## Important Files to Reference

When making changes, always consult these key files:

1. **`/constants/data.js`** - Portfolio content (31.8 KB)
2. **`/components/ContainerBlock.js`** - Layout and SEO
3. **`/lib/database.js`** - Database operations
4. **`/pages/_app.js`** - App configuration
5. **`/tailwind.config.js`** - Styling configuration
6. **`/jsconfig.json`** - Path aliases

---

## Git Workflow

### Branch Naming Convention
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Documentation: `docs/description`

### Commit Message Format
```
type: Brief description

Detailed explanation if needed

Examples:
- feat: Add new component for testimonials
- fix: Resolve dark mode toggle issue
- docs: Update README with setup instructions
- style: Format code with Prettier
- refactor: Simplify database connection logic
```

### Pull Request Guidelines
1. Branch from `main`
2. Make focused, single-purpose changes
3. Test locally before pushing
4. Include screenshots for UI changes
5. Update documentation if needed

---

## Performance Optimization Tips

### 1. Image Optimization
- Use Next.js `<Image>` component when possible
- Store images in `/public/` directory
- Use WebP format for smaller file sizes

### 2. Code Splitting
- Next.js automatically code-splits by page
- Use dynamic imports for large components

```javascript
import dynamic from 'next/dynamic'
const HeavyComponent = dynamic(() => import('@components/HeavyComponent'))
```

### 3. Database Queries
- Connection pooling enabled by default
- Use `LIMIT` and `OFFSET` for pagination
- Create indexes on frequently queried columns

### 4. CSS Optimization
- Tailwind's JIT mode compiles only used utilities
- Purge configuration removes unused CSS in production

---

## Analytics and Monitoring

**Vercel Analytics** integrated in `_app.js`:
```javascript
import { Analytics } from '@vercel/analytics/react'

<Analytics />
```

**What's tracked:**
- Page views
- Unique visitors
- Geographic distribution
- Device and browser info

**Admin Dashboard:** `/admin/leads`
- View captured leads
- Download counts per lead
- Export to CSV
- Requires `NEXT_PUBLIC_ADMIN_SECRET` authentication

---

## Customization Guide for New Users

To customize this portfolio for a different person:

### 1. Update Personal Information
Edit `/constants/data.js`:
```javascript
const userData = {
  githubUsername: "your-username",
  name: "Your Name",
  designation: "Your Title",
  avatarUrl: "/your-avatar.png",
  email: "your@email.com",
  // ... update all fields
}
```

### 2. Replace Images
- Add your avatar to `/public/avatar.png`
- Replace project images in `/public/`
- Update image references in `data.js`

### 3. Update Domain/URLs
- `ContainerBlock.js`: Update canonical URLs (line 26, 30)
- `ContainerBlock.js`: Update social media handles (line 38)
- Vercel: Configure custom domain

### 4. Customize Theme Colors
Edit `/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: colors.blue,  // Change to your brand color
    }
  }
}
```

### 5. Add/Remove Pages
- Add new pages in `/pages/` directory
- Update navigation in `components/Navbar.js`
- Add route to navigation array

---

## Troubleshooting Commands

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Check for outdated packages
npm outdated

# Update all packages (carefully!)
npm update

# Verify build locally
npm run build
npm start

# Check environment variables
echo $DATABASE_URL  # Should output your DB URL
```

---

## Additional Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS Documentation:** https://tailwindcss.com/docs
- **React Documentation:** https://react.dev
- **Neon (PostgreSQL) Documentation:** https://neon.tech/docs
- **Vercel Deployment Guide:** https://vercel.com/docs

---

## Contact and Support

For questions about this codebase:
- **Email:** naveen@aifanatic.pro
- **GitHub:** https://github.com/ai-fanatic
- **Portfolio:** https://naveen.aifanatic.pro

---

## Version History

- **v1.0.0** (2026-01-09) - Initial CLAUDE.md documentation created
  - Comprehensive codebase structure documentation
  - Development workflows and conventions
  - Database schema and API documentation
  - Deployment and troubleshooting guides

---

## Quick Reference Cheat Sheet

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm start            # Run production server

# Common file locations
/constants/data.js                 # Portfolio content
/components/ContainerBlock.js      # Layout wrapper
/lib/database.js                   # Database functions
/pages/api/                        # API endpoints
/styles/globals.css                # Global styles

# Import aliases
@components/*       # components/
@constants/*        # constants/
@lib/*             # lib/
@styles/*          # styles/

# Environment variables
.env.local         # Local development (gitignored)
.env.example       # Template file

# Key ports
3000               # Development server
5432               # PostgreSQL (Neon)
```

---

**Last Updated:** January 9, 2026
**Maintainer:** Naveen Chatlapalli
**AI Assistant:** This document is optimized for Claude and other AI assistants to understand and work with this codebase effectively.


