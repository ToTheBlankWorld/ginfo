# Quick Reference Guide

## 🚀 Essential Commands

### Development
```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Build for production
npm start             # Start production server
npm run type-check    # Check TypeScript errors
npm run lint          # Check code quality
npm run format        # Format code with Prettier
```

### Installation & Cleanup
```bash
npm install           # Install dependencies
npm install --save package-name  # Add new package
npm uninstall package-name       # Remove package
npm cache clean --force          # Clear npm cache
rm -rf node_modules && npm install  # Clean reinstall
```

### Maintenance
```bash
npm audit             # Check for security issues
npm audit fix         # Fix security issues
npm outdated          # Check for outdated packages
npm update            # Update packages
```

---

## 📁 Important File Locations

| File | Purpose |
|------|---------|
| `/app/page.tsx` | Homepage/redirect logic |
| `/app/login/page.tsx` | Login page |
| `/app/search/page.tsx` | Search page |
| `/app/student/[id]/page.tsx` | Student detail page |
| `/app/api/auth/verify/route.ts` | Auth endpoint |
| `/app/api/search/route.ts` | Search API |
| `/data/students.csv` | Student database |
| `.env.local` | Environment variables |
| `tailwind.config.ts` | Tailwind customization |
| `middleware.ts` | Route protection |

---

## 🔑 Environment Variables

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=578341894012-0edjh4oiahk0m3rv8b01peug0avulrfd.apps.googleusercontent.com
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_ALLOWED_DOMAINS=gitam.in,student.gitam.edu
```

> **Note**: Variables with `NEXT_PUBLIC_` prefix are exposed to browser

---

## 🎨 Tailwind CSS Classes

### Clay Components
```tsx
// Cards
<div className="clay-card">Content</div>

// Buttons
<button className="clay-button-primary">Primary</button>
<button className="clay-button-secondary">Secondary</button>

// Inputs
<input className="clay-input" placeholder="Input" />

// Shadows
<div className="shadow-clay">Soft shadow</div>
<div className="shadow-clay-lg">Large shadow</div>
```

### Responsive Design
```tsx
// Mobile first
className="p-2 sm:p-4 md:p-6 lg:p-8"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// Hidden on small screens
className="hidden sm:block"

// Show only on mobile
className="sm:hidden"
```

---

## 🔐 Authentication Flow

```
User visits app
    ↓
Check cookie 'gitam_user_token'
    ↓
If exists → Redirect to /search
If not → Redirect to /login
    ↓
User clicks "Sign In with Google"
    ↓
Google OAuth popup opens
    ↓
User signs in
    ↓
POST /api/auth/verify with token
    ↓
Verify email domain
    ↓
If @gitam.in or @student.gitam.edu → Set cookie → Redirect to /search
If not → Show error message
```

---

## 🔍 API Routes Reference

### Authentication
```
POST /api/auth/verify
Body: { token: string }
Response: { message: string, user: { email: string } }

GET /api/auth/verify
Response: { user: { email: string }, authenticated: boolean }

POST /api/auth/logout
Response: { message: string }
```

### Search
```
GET /api/search?name=query
Response: { students: [], count: number }
```

### Student Details
```
GET /api/student/{registrationNo}
Response: { student: {...} }
```

---

## 📊 CSV Data Structure

### Columns Required
```
Registration no, Name, Campus, College, Program, Branch, Batch, Email
```

### Example Row
```
2023001154, Rahul Kumar, Visakhapatnam, GITAM School of Technology, B.Tech, CSE, 2023-2027, rahul@student.gitam.edu
```

### Import CSV Data
```bash
cp /path/to/new/file.csv data/students.csv
npm run dev  # Restart server
```

---

## 🐛 Common Issues Quick Fix

| Issue | Fix |
|-------|-----|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Module not found | `npm install && npm run dev` |
| TypeScript error | `npm run type-check` |
| OAuth not working | Check `.env.local` has correct Client ID |
| CSS not applying | Hard refresh: `Ctrl+Shift+R` |
| CSV not found | Check `/data/students.csv` exists |
| Email rejected | Use @gitam.in or @student.gitam.edu |

---

## 🚀 Deployment Quick Start

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Follow prompts
```

### Local Production Test
```bash
npm run build
npm start
# Visit http://localhost:3000
```

### Docker
```bash
docker build -t gitam-portal .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_GOOGLE_CLIENT_ID=<id> \
  -e NEXTAUTH_SECRET=<secret> \
  gitam-portal
```

---

## 📱 Page Routes

| Path | Purpose | Auth Required |
|------|---------|--------------|
| `/` | Home/redirect | No |
| `/login` | Login page | No |
| `/search` | Search students | Yes |
| `/student/:id` | Student details | Yes |

---

## 🎯 Component Props Quick Ref

### StudentCard
```tsx
<StudentCard
  registrationNo="2023001154"
  name="Rahul Kumar"
  program="B.Tech"
  branch="CSE"
  campus="Visakhapatnam"
/>
```

### SearchBar
```tsx
<SearchBar
  onSearch={(query) => console.log(query)}
  isLoading={false}
/>
```

### Navbar
```tsx
<Navbar userEmail="user@gitam.in" />
```

---

## 🔍 TypeScript Quick Tips

```typescript
// Interface for Student
interface Student {
  "Registration no": string;
  Name: string;
  Campus: string;
  College: string;
  Program: string;
  Branch: string;
  Batch: string;
  Email: string;
}

// API Response Type
interface SearchResponse {
  students: Student[];
  count: number;
}

// Component Props Type
interface ComponentProps {
  title: string;
  isLoading?: boolean;
  onSubmit: (data: string) => void;
}

// React.ReactElement return type
function MyComponent(): React.ReactElement {
  return <div>Component</div>;
}
```

---

## 📝 Useful Shortcuts

### VS Code
- `Ctrl+K Ctrl+F` - Format document
- `Ctrl+Shift+F` - Find in files
- `Ctrl+Shift+H` - Find and replace
- `F12` - Toggle DevTools

### Browser DevTools (F12)
- `Console` - View errors and logs
- `Network` - Check API calls
- `Application` - View cookies and storage
- `Elements` - Inspect HTML/CSS
- `Lighthouse` - Performance audit

---

## 🎨 Color Palette (Clay Theme)

```
Primary:     Blue (#3B82F6)
Secondary:   Purple (#A855F7)
Success:     Green (#10B981)
Warning:     Yellow (#F59E0B)
Error:       Red (#EF4444)
Background: Clay-50 (#FAF9F7)
Text:        Gray-900 (#111827)
```

---

## 📚 Documentation Quick Links

| Document | Content |
|----------|---------|
| README.md | Overview, features, quick start |
| SETUP.md | Installation and development |
| DEPLOYMENT.md | Production deployment |
| GOOGLE_OAUTH_SETUP.md | OAuth configuration |
| TROUBLESHOOTING.md | Common issues and fixes |
| PROJECT_SUMMARY.md | Complete project overview |

---

## ⚡ Performance Tips

1. **Search is slow on first run** → Normal, CSV is parsed once then cached
2. **Images not loading** → GITAM server might be down, placeholders show
3. **Page load slow** → Check network tab in DevTools
4. **Optimize images** → Already done with Next.js Image component
5. **Enable cache** → Use revalidate for static routes

---

## 🔒 Security Checklist

- [ ] `.env.local` in `.gitignore`
- [ ] Never commit secrets to Git
- [ ] Use HTTPS in production
- [ ] Strong `NEXTAUTH_SECRET` (32+ chars)
- [ ] Email verification required
- [ ] Domain whitelist configured
- [ ] HTTP-only cookies enabled
- [ ] CSRF protection enabled

---

## 📞 Getting Help

1. **Check** TROUBLESHOOTING.md first
2. **Search** error messages online
3. **Check** browser console (F12)
4. **Review** related documentation file
5. **Debug** with console.log() statements
6. **Ask** development team

---

## 🎯 Pre-Deployment Checklist

- [ ] `npm run type-check` passes
- [ ] `npm run lint` has no errors
- [ ] `npm run build` succeeds
- [ ] `npm start` works (test production)
- [ ] Environment variables set
- [ ] CSV file present
- [ ] OAuth configured
- [ ] No console errors
- [ ] All links work
- [ ] Mobile responsive

---

## 🚀 Deploy Checklist

- [ ] Code committed to Git
- [ ] Pushed to GitHub
- [ ] Connected to Vercel
- [ ] Environment variables set in Vercel
- [ ] Build succeeds on Vercel
- [ ] Site loads correctly
- [ ] OAuth working with domain
- [ ] All features tested
- [ ] Custom domain configured (if needed)
- [ ] Monitoring set up

---

**Last Updated**: March 17, 2026
**Quick Ref Version**: 1.0
