# GITAM Student Portal

A modern, production-ready web application for searching and viewing GITAM University student profiles. Built with Next.js, React, TypeScript, and Tailwind CSS featuring a beautiful Claymorphism UI design.

## 🎯 Features

- **Google OAuth Authentication** - Secure login with GITAM Google accounts
- **Email Domain Verification** - Only @gitam.in and @student.gitam.edu emails allowed
- **Student Search** - Search students by name with real-time results
- **Student Profiles** - Detailed view of student information including registration number, program, branch, etc.
- **Profile Pictures** - Dynamic profile images from GITAM results server
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Claymorphism UI** - Modern, soft, Apple-like design with smooth animations
- **Production Ready** - TypeScript strict mode, error handling, security best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Authentication**: Google OAuth 2.0
- **UI Library**: React 19
- **Data Format**: CSV (Papa Parse)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/bun
- Google OAuth Client ID (provided)
- CSV file with student data

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd gitam-student-portal
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=578341894012-0edjh4oiahk0m3rv8b01peug0avulrfd.apps.googleusercontent.com

# Session Configuration (use a strong random string in production)
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# Allowed Email Domains
NEXT_PUBLIC_ALLOWED_DOMAINS=gitam.in,student.gitam.edu
```

### 3. CSV Data Setup

Place your CSV file at `/data/students.csv` with the following columns:

```
Registration no,Name,Campus,College,Program,Branch,Batch,Email
```

Example row:
```
2023001154,John Doe,Visakhapatnam,GITAM School of Technology,Master of Technology,VLSI Design,2023-2025,john.doe@student.gitam.edu
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Project Structure

```
gitam-student-portal/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── verify/route.ts       # Google OAuth verification
│   │   │   └── logout/route.ts       # Logout handler
│   │   ├── search/route.ts           # Student search endpoint
│   │   └── student/[id]/route.ts     # Student details endpoint
│   ├── login/
│   │   └── page.tsx                  # Login page
│   ├── search/
│   │   └── page.tsx                  # Search page
│   ├── student/
│   │   └── [id]/
│   │       └── page.tsx              # Student detail page
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home redirect
├── components/
│   ├── GoogleSignInButton.tsx        # OAuth button
│   ├── StudentCard.tsx               # Student result card
│   ├── SearchBar.tsx                 # Search input
│   └── Navbar.tsx                    # Navigation bar
├── lib/
│   ├── csvParser.ts                  # CSV parsing utilities
│   └── auth.ts                       # Authentication helpers
├── data/
│   └── students.csv                  # Student data
├── public/                           # Static files
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment variables
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🔐 Authentication Flow

1. User visits the application
2. Login page displays Google Sign In button
3. User authenticates with their Google account
4. Application verifies email domain (@gitam.in or @student.gitam.edu)
5. If valid, authentic token is stored in secure HTTP-only cookie
6. User is redirected to search page
7. If invalid domain, error message is displayed

## 🔍 API Routes

### Authentication

- **POST /api/auth/verify** - Verify Google token and authenticate
  - Body: `{ token: string }`
  - Response: `{ message: string, user: { email: string } }`

- **GET /api/auth/verify** - Check if user is authenticated
  - Headers: Uses cookies
  - Response: `{ user: { email: string }, authenticated: boolean }`

- **POST /api/auth/logout** - Logout user
  - Response: `{ message: string }`

### Search

- **GET /api/search?name=query** - Search students
  - Query: `name=<search_term>`
  - Response: `{ students: Student[], count: number }`

### Student Details

- **GET /api/student/[registrationNo]** - Get student details
  - Params: `[id]` - Registration number
  - Response: `{ student: Student }`

## 🎨 Design Features

### Claymorphism Styling

- Soft, rounded corners (border-radius: 24px)
- Subtle shadows with blur effects
- Soft gradient backgrounds
- Smooth hover animations
- Glass-morphism backdrop blur
- Warm, neutral color palette

### UI Components

- **clay-card**: Floating card containers
- **clay-button-primary**: Primary action buttons
- **clay-button-secondary**: Secondary action buttons
- **clay-input**: Styled input fields

## 🔒 Security Features

- ✅ Google OAuth 2.0 authentication
- ✅ Email domain verification
- ✅ Secure HTTP-only cookies
- ✅ CSRF protection via SameSite cookies
- ✅ TypeScript strict mode
- ✅ Input validation and sanitization
- ✅ Protected API routes
- ✅ Environment variables for sensitive data

## 📦 Building for Production

### 1. Environment Setup

Create a `.env.production` file with production values. Generate a strong secret:

```bash
openssl rand -base64 32
```

### 2. Build

```bash
npm run build
npm start
```

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
npm i -g vercel
vercel
```

#### Option B: GitHub Integration

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXTAUTH_SECRET`
   - `NEXT_PUBLIC_ALLOWED_DOMAINS`
4. Deploy

#### Option C: Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting provider
3. Set environment variables on the hosting platform

## 🧪 Type Safety

This project uses TypeScript in strict mode for maximum type safety:

```bash
npm run type-check
```

## 🎯 Code Quality

Run linting:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

## 📊 CSV File Format

Required columns in `data/students.csv`:

| Column | Type | Example |
|--------|------|---------|
| Registration no | string | 2023001154 |
| Name | string | Rahul Kumar |
| Campus | string | Visakhapatnam |
| College | string | GITAM School of Technology |
| Program | string | Bachelor of Technology |
| Branch | string | Computer Science |
| Batch | string | 2023-2027 |
| Email | string | rahul@student.gitam.edu |

## 🖼️ Profile Images

Profile images are dynamically loaded from GITAM's official server:

```
https://doeresults.gitam.edu/photo/img.aspx?id=<REGISTRATION_NUMBER>
```

If an image fails to load, a placeholder is displayed.

## 🚨 Troubleshooting

### Google Login Not Working

1. Verify Google Client ID in `.env.local`
2. Check that OAuth consent screen is configured
3. Ensure domain is added to authorized redirect URIs

### Student Data Not Appearing

1. Verify CSV file is at `data/students.csv`
2. Check CSV headers match expected format
3. Ensure CSV is properly formatted (UTF-8 encoding)

### Email Verification Failed

1. Confirm user's Google account email domain is @gitam.in or @student.gitam.edu
2. Check `NEXT_PUBLIC_ALLOWED_DOMAINS` environment variable
3. Verify email is verified in Google account

### Build Errors

1. Clear `.next` folder: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules`
3. Reinstall dependencies: `npm install`
4. Try building again: `npm run build`

## 📝 License

This project is developed for GITAM University.

## 👨‍💻 Development

To contribute:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Format code: `npm run format`
4. Run type check: `npm run type-check`
5. Commit changes: `git commit -am 'Add feature'`
6. Push to branch: `git push origin feature/your-feature`
7. Create a Pull Request

## 📞 Support

For issues or questions, contact the development team or create an issue in the repository.

## 🎉 Features Coming Soon

- Student profile photos with hover preview
- Advanced search filters (program, branch, batch)
- Semester-wise grades display
- Student statistics and analytics dashboard
- Export student data to PDF
- Batch operations and downloads

---

**Version**: 1.0.0
**Last Updated**: 2024
**Built with ❤️ for GITAM University**
