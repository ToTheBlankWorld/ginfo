# Google OAuth Setup Guide

Detailed instructions for configuring Google OAuth authentication for the GITAM Student Portal.

## Prerequisites

- Google account with access to Google Cloud Console
- Domain or deployment URL (can use localhost for development)

## Step-by-Step Setup

### 1. Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top
4. Click "NEW PROJECT"
5. Enter project name: "GITAM Student Portal"
6. Click "CREATE"

### 2. Enable Google+ API

1. In the left sidebar, click "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on "Google+ API"
4. Click "ENABLE"

### 3. Configure OAuth Consent Screen

1. In left sidebar, go to "APIs & Services" → "OAuth consent screen"
2. Select "External" as the User Type
3. Click "CREATE"

#### Fill in the form:

**App Information:**
- App name: "GITAM Student Portal"
- User support email: your-email@gitam.in (choose an admin email)
- App logo: (optional - upload a logo)

**Developer contact:**
- Email addresses: your-email@gitam.in

**Scopes:**
1. Click "ADD OR REMOVE SCOPES"
2. Search for and select:
   - `email`
   - `profile`
   - `openid`
3. Click "UPDATE"
4. Click "SAVE AND CONTINUE"

**Test users (for development):**
1. Click "ADD USERS"
2. Add your GITAM email address(es)
3. These are the only accounts that can access during testing

Then click "SAVE AND CONTINUE" through all remaining screens.

### 4. Create OAuth 2.0 Credentials

1. In left sidebar, go to "APIs & Services" → "Credentials"
2. Click "CREATE CREDENTIALS" → "OAuth client ID"
3. Select "Web application"
4. Give it a name: "GITAM Student Portal Web"

#### Authorized JavaScript origins (add for each domain):

**For Development:**
- `http://localhost:3000`
- `http://127.0.0.1:3000`

**For Production:**
- `https://yourdomain.com`
- `https://www.yourdomain.com`
- `https://portal.yourdomain.com`

#### Authorized redirect URIs:

**For Development:**
- `http://localhost:3000/api/auth/callback`
- `http://localhost:3000`

**For Production:**
- `https://yourdomain.com/api/auth/callback`
- `https://yourdomain.com`

5. Click "CREATE"
6. Copy the **Client ID** and **Client Secret**

### 5. Configure Your Application

#### Development Environment

1. Create `.env.local` in project root:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=578341894012-0edjh4oiahk0m3rv8b01peug0avulrfd.apps.googleusercontent.com
NEXTAUTH_SECRET=dev-secret-key-change-in-production
```

#### Production Environment

Create `.env.production`:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-production-client-id>
NEXTAUTH_SECRET=<strong-random-string>
```

**Generate a strong secret:**

```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)

# Or use online tool
# https://generate-secret.vercel.app/32
```

### 6. Test the Integration

1. Start development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Click "Sign In with Google"

4. Select any Google account

5. You should be redirected to the search page

## Advanced Configuration

### Client Secret for Server-Side Validation (Optional)

If you need server-side token verification (not required for this app):

1. Save the Client Secret from Google Console
2. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_SECRET=<your-client-secret>
   ```

### Scopes

The application requests the following scopes:
- `email` - Access to user's email address
- `profile` - Access to user's profile name and picture

## Security Recommendations

1. **Never commit secrets** to version control
2. **Use environment variables** for sensitive data
3. **Rotate secrets regularly** in production
4. **Use strong NEXTAUTH_SECRET** (minimum 32 characters)
5. **Enable 2FA** on Google Cloud Console account
6. **Restrict API access** to necessary scopes only
7. **Monitor unauthorized attempts** through Google Cloud metrics

## Troubleshooting

### "Redirect URI Mismatch" Error

**Cause**: The redirect URI in code doesn't match what's registered in Google Console

**Solution**:
1. Check exact URL format (with/without trailing slash)
2. Ensure http/https matches
3. Add both `http://localhost:3000` and `http://localhost:3000/` if in doubt

### "Invalid Client ID" Error

**Cause**: Client ID is incorrect or expired

**Solution**:
1. Verify Client ID in Google Console
2. Ensure it's copied exactly
3. Check `.env.local` has correct Client ID
4. Restart dev server after changing `.env.local`

### Users Can't Sign In

**Cause**: Google Console configuration issues

**Solution**:
1. Verify domain is added to "Authorized JavaScript origins"
2. Verify domain is added to "Authorized redirect URIs"
3. Check realm matches exactly (http/https, with/without www)
4. Restart dev server after changing `.env.local`

### "The redirect URI is missing or does not match" in Vercel

**Cause**: Production URL not added to Google Console

**Solution**:
1. Go to Google Cloud Console
2. Edit OAuth 2.0 credential
3. Add your Vercel URL to both:
   - Authorized JavaScript origins
   - Authorized redirect URIs
4. Use exact URL: `https://your-project.vercel.app`

### Stuck in Login Loop

**Cause**: Session cookie not being set properly

**Solution**:
1. Verify `NEXTAUTH_SECRET` is set
2. Check browser allows cookies
3. Clear browser cache and cookies
4. Try incognito mode
5. Verify domain matches in OAuth Console

## Monitoring

Monitor OAuth usage:

1. Go to "APIs & Services" → "Credentials"
2. View API quota and usage
3. Check error logs for failed authentication attempts

## Getting Help

For Google Cloud issues:
- [Google Cloud Support](https://cloud.google.com/support)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for Web](https://developers.google.com/identity/sign-in/web)

For application issues:
- Check the README.md for general troubleshooting
- Contact your development team
- Check application logs

## Renewal / Updates

### Updating Client ID

1. Generate new Client ID in Google Console
2. Update `.env.local` and `.env.production`
3. Test in development first
4. Deploy to production

### Credential Rotation

For enhanced security, rotate credentials quarterly:

1. Create new OAuth credentials in Google Console
2. Update application environment variables
3. Keep old credentials for 1 week during rotation
4. Remove old credentials after week
5. Document rotation in logs

---

**Last Updated**: 2024
**Version**: 1.0
