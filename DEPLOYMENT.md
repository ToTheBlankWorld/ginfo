# Deployment Guide

This guide covers deploying the GITAM Student Portal to production.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository with the code
- Google OAuth Client ID
- Production environment variables

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the optimal choice as it's built by the Next.js creators.

#### Step 1: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub, GitLab, or Bitbucket

#### Step 2: Connect Your Repository

1. Click "Add New..." → "Project"
2. Select your Git provider
3. Import the `gitam-student-portal` repository
4. Vercel will auto-detect Next.js configuration

#### Step 3: Configure Environment Variables

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=578341894012-0edjh4oiahk0m3rv8b01peug0avulrfd.apps.googleusercontent.com
NEXTAUTH_SECRET=<generate_strong_random_string>
NEXT_PUBLIC_ALLOWED_DOMAINS=gitam.in,student.gitam.edu
```

**To generate a strong secret:**

```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object {[char][byte](Get-Random -Min 33 -Max 127)})))

# Or use online generator
# https://generate-secret.vercel.app/32
```

#### Step 4: Deploy

Click the "Deploy" button. Vercel will:
- Install dependencies
- Build the application
- Run checks
- Deploy to production

Your site will be available at `https://<project-name>.vercel.app`

#### Step 5: Custom Domain

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Google OAuth redirect URIs

### Option 2: Docker (Advanced)

#### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Build and Run

```bash
docker build -t gitam-portal .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_GOOGLE_CLIENT_ID=<client_id> \
  -e NEXTAUTH_SECRET=<secret> \
  -e NEXT_PUBLIC_ALLOWED_DOMAINS=gitam.in,student.gitam.edu \
  gitam-portal
```

### Option 3: Traditional VPS/Server

#### Prerequisites

- Node.js 18+ installed
- PM2 or similar process manager
- Nginx or Apache for reverse proxy
- SSL certificate (Let's Encrypt)

#### Steps

1. **Install dependencies**
   ```bash
   cd /var/www/gitam-portal
   npm install
   npm run build
   ```

2. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "gitam-portal" -- start
   pm2 startup
   pm2 save
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 443 ssl http2;
       server_name yourdomain.com;

       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

## Google OAuth Setup for Production

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select or create a project
3. Enable the Google+ API
4. Go to **OAuth Consent Screen**
   - Choose "External" user type
   - Fill in app name, support email, etc.
   - Add scopes: `email`, `profile`

5. Go to **Credentials**
   - Create OAuth 2.0 Client ID
   - Type: Web application
   - Add production domain to **Authorized JavaScript origins**
   - Add callback URL to **Authorized redirect URIs**: `https://yourdomain.com/api/auth/callback`

6. Copy the Client ID and update it in environment variables

## Pre-Deployment Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format check
npm run format

# Build test
npm run build

# Start test
npm start
```

## Post-Deployment

### Monitoring

- Set up error tracking (Sentry, LogRocket)
- Monitor performance metrics
- Set up alerts for failures

### Database Backups

If using a database:
- Set up automated backups
- Test recovery procedures
- Keep backup copies off-site

### Security

- Enable HTTPS only (Vercel does this by default)
- Set up rate limiting
- Monitor for unusual activity
- Keep dependencies updated: `npm audit fix`

### Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Install latest versions (careful!)
npm install @latest
```

## Rollback Strategy

### Vercel

1. Go to Dashboard → Deployments
2. Find the previous stable deployment
3. Click the deployment and select "Promote to Production"

### Other Platforms

```bash
git revert <commit-hash>
git push
# Redeploy
```

## Environment-Specific Configuration

### Development (.env.local)
```
NODE_ENV=development
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<dev-client-id>
NEXTAUTH_SECRET=dev-secret
```

### Production (.env.production)
```
NODE_ENV=production
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<prod-client-id>
NEXTAUTH_SECRET=<strong-production-secret>
```

## Performance Optimization

1. **Image Optimization**: Images from GITAM server are automatically cached
2. **Code Splitting**: Next.js auto-splits code by page
3. **Compression**: Enable gzip compression in your server
4. **Caching**: Set appropriate cache headers:
   ```
   Cache-Control: public, max-age=31536000, immutable
   ```

## Troubleshooting

### OAuth Redirect URI Mismatch

- Ensure your deployment URL matches exactly in Google Console
- Include or exclude trailing slashes consistently

### CSV File Not Found

- Verify `data/students.csv` exists in production
- For Vercel, place in repository root

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Performance Issues

1. Check database query performance
2. Enable Vercel Analytics
3. Use Chrome DevTools to profile

## Maintenance

### Regular Updates

```bash
# Monthly
npm audit
npm audit fix

# Quarterly
npm update
```

### Health Checks

Set up monitoring for:
- API endpoint availability
- Database connectivity
- Auth service status

### Logging

Configure centralized logging:
- Vercel: Built-in logs
- Other platforms: Sentry, LogRocket, etc.

---

**Support**: Contact your platform support or DevOps team for assistance.
