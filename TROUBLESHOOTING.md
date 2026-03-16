# Troubleshooting Guide

Common issues and solutions for the GITAM Student Portal.

## Installation & Setup Issues

### ❌ "npm: command not found"

**Problem**: Node.js/npm not installed or not in PATH

**Solution**:
1. Download and install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart terminal/command prompt
3. Verify: `node --version && npm --version`

### ❌ "Port 3000 already in use"

**Problem**: Another process is using port 3000

**Solution**:
```bash
# Use different port
npm run dev -- -p 3001

# Or kill the process (macOS/Linux)
lsof -i :3000
kill -9 <PID>

# Or find and kill process (Windows PowerShell)
Get-Process node | Stop-Process -Force
```

### ❌ "Cannot find module" error

**Problem**: Dependencies not installed or cached incorrectly

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall
npm install

# Restart dev server
npm run dev
```

### ❌ "EACCES: permission denied"

**Problem**: Insufficient permissions to install packages

**Solution**:
```bash
# Fix npm permissions (macOS/Linux)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Then try npm install again
npm install
```

## Development Issues

### ❌ "Build fails with TypeScript errors"

**Problem**: Type checking failures preventing build

**Solution**:
```bash
# Check specific errors
npm run type-check

# Fix TypeScript strict mode violations
# Add 'any' type if necessary as temporary fix
// @ts-ignore
const value: any = something;
```

### ❌ "Hot reload not working"

**Problem**: File changes not reflecting in browser

**Solution**:
1. Restart dev server: `npm run dev`
2. Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`
3. Clear `.next` folder:
   ```bash
   rm -rf .next
   npm run dev
   ```

### ❌ "Styling not applying"

**Problem**: Tailwind CSS classes not working

**Solution**:
1. Verify class names are spelled correctly
2. Check `tailwind.config.ts` includes correct file paths
3. Restart dev server after config changes
4. Browser cache - hard refresh: `Ctrl+Shift+R`

### ❌ "API route returning 404"

**Problem**: API endpoint not found

**Solution**:
1. Check file is in `app/api/` directory
2. Verify filename matches route: `route.ts` for `GET`, `POST`
3. Check export function name matches HTTP method
4. Test with correct path: `/api/search` not `/api/search/route.ts`

## Authentication Issues

### ❌ "Google Sign In button does nothing"

**Problem**: OAuth not loading or configured incorrectly

**Solution**:
1. Check `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in `.env.local`
2. Verify Client ID is correct from Google Console
3. Restart dev server after changing `.env.local`
4. Check browser console for errors: `F12` → Console tab

### ❌ "Redirect URI mismatch" error

**Problem**: OAuth callback URL doesn't match Google Console

**Solution**:
1. In `App Router, go to "Credentials"`
2. Click OAuth 2.0 Client ID
3. Set **Authorized redirect URIs**:
   - For dev: `http://localhost:3000`
   - For prod: `https://yourdomain.com`
4. Save and wait 5-10 minutes for changes to take effect

### ❌ "Only GITAM emails allowed" error

**Problem**: User's email domain is not allowed

**Solution**:
1. User must use @gitam.in or @student.gitam.edu email
2. If adding new domain, edit `.env.local`:
   ```env
   NEXT_PUBLIC_ALLOWED_DOMAINS=gitam.in,student.gitam.edu,yourdomain.com
   ```
3. Restart dev server

### ❌ "User not verified" error

**Problem**: Google account email not verified

**Solution**:
1. In your Google account (myaccount.google.com)
2. Go to "Personal info" → "Email"
3. Verify your email address if needed
4. Try logging in again

### ❌ "Stuck in login loop"

**Problem**: Keeps redirecting back to login page

**Solution**:
1. Clear browser cookies: Settings → Privacy → Clear cookies
2. Try incognito/private mode
3. Check `localStorage` in DevTools: `F12` → Application
4. Verify `gitam_user_token` cookie is being set:
   - `F12` → Application → Cookies → http://localhost:3000
   - Should see `gitam_user_token` cookie

## Search & Data Issues

### ❌ "No students found"

**Problem**: Search returns no results

**Solution**:
1. Verify CSV file exists: `data/students.csv`
2. Check CSV has data:
   ```bash
   head -5 data/students.csv
   ```
3. Verify search query matches student names exactly
4. Try partial search: "Rahul" not "Rahul Kumar Rao"
5. Check if email domain matches allowed domains

### ❌ "CSV file not found" error

**Problem**: `data/students.csv` is missing

**Solution**:
1. Verify file path:
   ```bash
   ls -la data/students.csv
   ```
2. If missing, copy CSV file:
   ```bash
   cp /path/to/file.csv data/students.csv
   ```
3. Restart dev server

### ❌ "CSV parsing error"

**Problem**: Error parsing CSV file

**Solution**:
1. Check CSV format:
   - Ensure headers match: `Registration no, Name, Campus, ...`
   - Check for encoding issues: Should be UTF-8
   - Remove extra blank lines at end

2. Validate CSV:
   ```bash
   head -1 data/students.csv  # Check headers
   wc -l data/students.csv    # Check line count
   ```

3. If CSV is corrupted, get fresh copy

### ❌ "Student profile image not loading"

**Problem**: Profile pictures show as placeholder

**Solution**:
1. Check Registration Number is correct
2. Verify GITAM server is accessible:
   ```bash
   curl "https://doeresults.gitam.edu/photo/img.aspx?id=2023001154"
   ```
3. If GITAM server is down, placeholder will show (expected behavior)
4. Check browser Network tab for image request status

### ❌ "Search is very slow"

**Problem**: Search takes too long

**Solution**:
1. CSV file is large (>10k students) - this is normal
2. Search is cached after first load - subsequent searches are faster
3. Reduce CSV size if needed for testing
4. Try more specific search terms

## Deployment Issues

### ❌ "Build fails on Vercel"

**Problem**: Production build fails

**Solution**:
1. Check build logs on Vercel dashboard
2. Common causes:
   - Missing environment variables
   - TypeScript errors
   - Missing data files

3. Add environment variables in Vercel:
   - Settings → Environment Variables
   - Add all variables from `.env.local`

4. Build locally to test:
   ```bash
   npm run build
   npm start
   ```

### ❌ "CSV file not found on Vercel"

**Problem**: Data/students.csv missing in production

**Solution**:
1. Commit CSV to Git:
   ```bash
   git add data/students.csv
   git commit -m "Add student data"
   git push
   ```
2. Ensure `.gitignore` doesn't exclude `/data/`
3. Re-deploy on Vercel

### ❌ "Environment variables not working"

**Problem**: .env variables undefined in production

**Solution**:
1. Variables starting with `NEXT_PUBLIC_` are exposed to browser
2. Other variables only work server-side
3. Verify in Vercel dashboard under Settings → Environment Variables
4. Changes take effect after re-deployment
5. For immediate testing, deploy again

### ❌ "CORS errors"

**Problem**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution**:
1. This shouldn't happen if using same-origin requests
2. If using external API:
   ```typescript
   // Add CORS headers in API route
   const headers = {
     'Access-Control-Allow-Origin': '*',
     'Content-Type': 'application/json',
   };
   ```

## Performance Issues

### ❌ "App is slow / loading takes long"

**Problem**: Page load is slow

**Solution**:
1. Check network tab in DevTools: `F12` → Network
2. Identify large requests
3. Enable caching:
   ```typescript
   export const revalidate = 3600; // Cache for 1 hour
   ```

4. Optimize images - already done for GITAM server images
5. Check if CSV parsing is bottleneck

### ❌ "Search results appear slowly"

**Problem**: Search has high latency

**Solution**:
1. First search is slower (CSV parsing) - subsequent searches cached
2. CSV is loaded in memory after first use
3. Normal for large CSV files
4. Alternatively, use database instead of CSV

## Browser Issues

### ❌ "Page styling looks broken"

**Problem**: Layout is messed up, styles not applied

**Solution**:
1. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
2. Clear cache: Settings → Clear browsing data
3. Try different browser (Chrome, Firefox, Safari)
4. Check for console errors: `F12` → Console tab

### ❌ "OAuth popup blocked"

**Problem**: Google login popup doesn't open

**Solution**:
1. Check popup blocker settings in browser
2. Add site to popup blocker whitelist
3. Try allowing all popups temporarily
4. Some browsers require user gesture before popup

### ❌ "Mobile responsiveness issues"

**Problem**: App looks broken on mobile

**Solution**:
1. Check viewport meta tag in `layout.tsx`
2. Test in browser mobile emulator: `F12` → Toggle device toolbar
3. Check Tailwind responsive classes are used correctly
4. Verify touch targets are large enough (44px minimum)

## Database/CSV Issues

### ❌ "Special characters showing as ???"

**Problem**: Non-English characters not displaying

**Solution**:
1. Ensure CSV file is UTF-8 encoded:
   ```bash
   file -i data/students.csv  # Check encoding
   ```

2. If not UTF-8, convert:
   ```bash
   iconv -f ISO-8859-1 -t UTF-8 input.csv > output.csv
   ```

3. Restart dev server

### ❌ "Duplicate students in results"

**Problem**: Same student appears multiple times

**Solution**:
1. Check source CSV for duplicates
2. Remove duplicates from CSV manually or with tool:
   ```bash
   sort -u -t',' -k2,2 data/students.csv > temp.csv
   mv temp.csv data/students.csv
   ```

## Getting More Help

### Check This First
1. ✅ Read error message carefully - usually very helpful
2. ✅ Check browser console: `F12` → Console tab
3. ✅ Check server terminal output
4. ✅ Search documentation for similar issues

### Enable Debug Mode

```typescript
// Add to component for debugging
console.log('Current state:', state);
console.error('Error details:', error);
console.warn('Warning:', warning);

// Use React DevTools
// Chrome/Firefox: Install "React Developer Tools" extension
// Then use Components and Profiler tabs
```

### Get More Information

```bash
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list

# Check for security issues
npm audit

# Get detailed build info
npm run build --verbose
```

### Contact Support

Include:
1. Operating system and Node.js version
2. Full error message from console
3. Steps to reproduce the issue
4. `.env.local` (without secrets)
5. Relevant code snippet

---

**Happy debugging! 🐛**

For more help, check:
- README.md - Overview and features
- SETUP.md - Installation guide
- DEPLOYMENT.md - Deployment guide
- GOOGLE_OAUTH_SETUP.md - Authentication setup
