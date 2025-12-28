# GoDaddy Hosting Deployment Guide

This guide will help you deploy your First Up Financial website to GoDaddy's web hosting.

## Step 1: Build Your Production App

1. **Install dependencies** (if you haven't already):
   ```bash
   npm install
   ```

2. **Build your app for production**:
   ```bash
   npm run build
   ```
   
   This creates a `dist` folder with all your production-ready files.

## Step 2: Access Your GoDaddy Hosting

1. **Log into GoDaddy**
2. **Go to "My Products"** → Find your hosting plan
3. **Click "Manage"** or "cPanel Admin"
4. **Open File Manager** (or use FTP)

## Step 3: Upload Your Files

### Option A: Using File Manager (Easiest)

1. In File Manager, navigate to `public_html` (or `htdocs` depending on your hosting type)
2. **Delete any existing files** in `public_html` (or move them to a backup folder)
3. **Upload all contents** from your `dist` folder:
   - Select all files in the `dist` folder
   - Upload them to `public_html`
   - **Important**: Upload the CONTENTS of `dist`, not the `dist` folder itself

### Option B: Using FTP

1. **Get your FTP credentials** from GoDaddy:
   - Go to cPanel → FTP Accounts
   - Note your FTP host, username, and password
2. **Use an FTP client** (FileZilla, WinSCP, etc.):
   - Connect to your GoDaddy FTP server
   - Navigate to `public_html`
   - Upload all contents from your `dist` folder

## Step 4: Verify File Structure

Your `public_html` folder should contain:
- `index.html`
- `.htaccess` (this fixes the 404 routing issue)
- `assets/` folder (with your JS, CSS, and other assets)
- Any other files from your `dist` folder

## Step 5: Test Your Website

1. Visit your domain (e.g., `yourdomain.com`)
2. The site should load without 404 errors
3. Test navigation - all routes should work

## Step 6: Configure Domain (If Not Already Done)

If your domain isn't connected yet:

1. **In GoDaddy DNS Management**:
   - Go to "My Products" → Domains → Manage DNS
   - Make sure your A record points to your hosting IP
   - Or update nameservers to GoDaddy's hosting nameservers

2. **Wait for DNS propagation** (can take 24-48 hours, usually faster)

## Important Notes

### Environment Variables

If you're using `GEMINI_API_KEY` or other environment variables:

1. **For client-side variables**: They need to be in your build, but be careful not to expose sensitive keys
2. **For server-side variables**: GoDaddy hosting typically doesn't support Node.js environment variables for static sites
3. **Consider**: Using a service like Vercel/Netlify if you need server-side environment variables

### Updating Your Site

When you make changes:

1. **Build again**:
   ```bash
   npm run build
   ```

2. **Upload the new `dist` contents** to `public_html` (replace old files)

3. **Clear browser cache** if changes don't appear immediately

### Troubleshooting

**404 Errors:**
- Make sure `.htaccess` file is in `public_html` root
- Check that `.htaccess` file permissions allow reading
- Verify Apache mod_rewrite is enabled (contact GoDaddy support if needed)

**Files Not Loading:**
- Check file paths are correct
- Verify all files uploaded successfully
- Check file permissions (should be 644 for files, 755 for folders)

**SSL/HTTPS:**
- GoDaddy hosting usually includes free SSL
- Enable it in cPanel → SSL/TLS Status
- Force HTTPS redirect if needed (can add to `.htaccess`)

## Quick Deployment Checklist

- [ ] Built production files (`npm run build`)
- [ ] Accessed GoDaddy File Manager or FTP
- [ ] Uploaded all `dist` contents to `public_html`
- [ ] Verified `.htaccess` file is present
- [ ] Tested website loads correctly
- [ ] Tested navigation/routing works
- [ ] Configured domain DNS (if needed)
- [ ] Enabled SSL certificate (recommended)

