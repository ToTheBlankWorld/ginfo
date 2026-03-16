# GITAM Student Portal - Setup Guide

Complete step-by-step guide for setting up the project locally.

## 📋 System Requirements

- **Node.js**: 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: 8.0.0 or higher (included with Node.js)
- **Git**: Optional but recommended ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

## 🚀 Quick Setup (5 minutes)

### Step 1: Clone or Extract Project

```bash
# If using Git
git clone <your-repo-url>
cd gitam-student-portal

# Or extract the ZIP file and navigate to the directory
cd gitam-student-portal
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### Step 3: Configure Environment

1. Create `.env.local` file (or copy from `.env.example`):

```bash
cp .env.example .env.local
```

2. The file already contains the Google Client ID and allowed domains.

### Step 4: Verify CSV Data

The CSV file should be at `/data/students.csv`. Verify it exists:

```bash
# macOS/Linux
ls -lh data/students.csv

# Windows PowerShell
Get-Item data\students.csv

# Windows Command Prompt
dir data\students.csv
```

### Step 5: Start Development Server

```bash
npm run dev
```

Output should show:
```
▲ Ready in 2.1s
- Local:        http://localhost:3000
- Environments: .env.local
```

### Step 6: Open in Browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Detailed Setup Instructions

### Node.js Installation

#### macOS
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

#### Windows
1. Download installer from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Follow installation wizard
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

### Project Installation

#### 1. Extract/Clone Project

```bash
# Clone with Git
git clone https://github.com/yourusername/gitam-student-portal.git
cd gitam-student-portal

# Or extract ZIP
unzip gitam-student-portal.zip
cd gitam-student-portal
```

#### 2. Install Dependencies

```bash
npm install
```

**What gets installed:**
- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 3
- Google OAuth library
- Papa Parse (CSV parsing)
- Axios (HTTP client)
- ESLint & Prettier (code quality)

#### 3. Environment Configuration

The `.env.local` file is pre-configured with:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=578341894012-0edjh4oiahk0m3rv8b01peug0avulrfd.apps.googleusercontent.com

# Session Configuration
NEXTAUTH_SECRET=development-secret-key-change-in-production

# Allowed Email Domains
NEXT_PUBLIC_ALLOWED_DOMAINS=gitam.in,student.gitam.edu
```

**Important Notes:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- `NEXTAUTH_SECRET` should be changed in production
- Only modify allowed domains if needed

## 🧪 Testing the Setup

### Basic Functionality Test

1. **Start server**: `npm run dev`
2. **Open browser**: `http://localhost:3000`
3. **Expected**: Redirected to login page
4. **Click**: "Sign In with Google"
5. **Login**: Use a test account with @gitam.in or @student.gitam.edu email
6. **Result**: Should redirect to search page
7. **Search**: Try searching for a student name

### Code Quality Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format
```

### Build Test

```bash
# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to test the production build.

## 🛠️ Development Workflow

### Start Development Server

```bash
npm run dev
```

Features:
- Hot reload on file changes
- Source maps for debugging
- TypeScript compilation
- Fast refresh for React

### Create a Component

Example: Creating a new component

```typescript
// components/MyComponent.tsx
export function MyComponent(): React.ReactElement {
  return <div className="p-4">My Component</div>;
}
```

### Create an API Route

Example: Creating a new API endpoint

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ message: "Hello" });
}
```

### Add Styling

Use Tailwind CSS classes:

```typescript
<div className="rounded-2xl bg-white p-4 shadow-clay">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

## 📚 Project Structure Explained

```
gitam-student-portal/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── search/               # Search endpoint
│   │   └── student/              # Student details endpoint
│   ├── login/                    # Login page
│   ├── search/                   # Search page
│   ├── student/[id]/             # Student detail page
│   ├── page.tsx                  # Home page (redirects)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/                   # Reusable React components
│   ├── GoogleSignInButton.tsx    # OAuth login button
│   ├── SearchBar.tsx             # Search input
│   ├── StudentCard.tsx           # Student result card
│   └── Navbar.tsx                # Navigation bar
│
├── lib/                          # Utility functions
│   ├── csvParser.ts              # CSV parsing logic
│   └── auth.ts                   # Authentication helpers
│
├── data/                         # Data files
│   └── students.csv              # Student database
│
├── public/                       # Static assets
│   └── favicon.ico               # Browser tab icon
│
├── .env.local                    # Local environment variables
├── .env.example                  # Environment template
├── .eslintrc.json                # ESLint configuration
├── .prettierrc.json              # Prettier configuration
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
├── middleware.ts                 # Route middleware
├── vercel.json                   # Vercel configuration
└── README.md                     # Project documentation
```

## 🐛 Debugging Tips

### Use VS Code Debugger

1. Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "skipFiles": ["<node_internals>/**"],
      "console": "integratedTerminal"
    }
  ]
}
```

2. Press `F5` to start debugging

### Browser DevTools

Use React Developer Tools and Next.js DevTools:

- Chrome: Install "React Developer Tools" extension
- Check Network tab for API calls
- Check Console for errors
- Use Source tab to debug TypeScript

### Common Issues

**Issue**: Port 3000 already in use
```bash
# Change port
npm run dev -- -p 3001
```

**Issue**: Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: TypeScript errors
```bash
# Run type check
npm run type-check
```

## 🔐 Security Considerations

Before deploying:

1. ✅ Never commit `.env.local` to Git
2. ✅ Change `NEXTAUTH_SECRET` for production
3. ✅ Verify Google OAuth Client ID is for production
4. ✅ Enable HTTPS for production deployments
5. ✅ Run security audit: `npm audit`

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

The build creates `.next` folder with optimized code ready for deployment.

## 🚀 Next Steps

After setup:

1. **Explore the code**: Read through components and pages
2. **Test the features**: Try searching, viewing profiles
3. **Customize**: Modify colors, branding, text
4. **Deploy**: Follow DEPLOYMENT.md guide
5. **Monitor**: Set up error tracking and analytics

## 📞 Getting Help

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Common Questions

**Q: Can I use Yarn or Bun instead of npm?**
A: Yes! The project works with Yarn and Bun:
```bash
yarn install
# or
bun install
```

**Q: How do I change the port?**
A: Use the `-p` flag:
```bash
npm run dev -- -p 3001
```

**Q: How do I test with a different CSV file?**
A: Replace `data/students.csv` and restart the server.

**Q: Can I deploy on platforms other than Vercel?**
A: Yes! See DEPLOYMENT.md for Docker, VPS, and other options.

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm install` completed without errors
- [ ] `.env.local` file exists with correct values
- [ ] `data/students.csv` file exists and is readable
- [ ] `npm run dev` starts without errors
- [ ] Browser opens to http://localhost:3000
- [ ] Can see login page
- [ ] Can click "Sign In with Google"
- [ ] Can search for students (if logged in)
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors: `npm run type-check`

## 🎉 Setup Complete!

You're now ready to:
- Develop new features
- Customize the application
- Deploy to production
- Invite users to test

For deployment, see DEPLOYMENT.md
For Google OAuth setup, see GOOGLE_OAUTH_SETUP.md
For general info, see README.md

---

**Need help?** Check the documentation files or contact support.
