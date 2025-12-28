# Deployment Guide - Connecting to GoDaddy Domain

This guide will help you deploy your First Up Financial website and connect it to your GoDaddy domain.

## Step 1: Build Your Production App

First, build your app for production:

```bash
npm install
npm run build
```

This creates a `dist` folder with your production-ready files.

## Step 2: Choose a Hosting Service

You have several options. Here are the most popular:

### Option A: Vercel (Recommended - Free & Easy)

**Why Vercel?** Free tier, automatic HTTPS, easy domain connection, great for React apps.

1. **Sign up at [vercel.com](https://vercel.com)** (free account)
2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```
3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - It will detect your Vite app automatically
   - Your app will be live at a `vercel.app` URL

4. **Connect GoDaddy Domain:**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Domains
   - Add your GoDaddy domain (e.g., `yourdomain.com`)
   - Vercel will show you DNS records to add

5. **Update GoDaddy DNS:**
   - Log into GoDaddy
   - Go to DNS Management for your domain
   - Add the DNS records Vercel provided:
     - **A Record**: `@` → Vercel's IP (usually shown in dashboard)
     - **CNAME Record**: `www` → `cname.vercel-dns.com`
   - Wait 24-48 hours for DNS to propagate

### Option B: Netlify (Free & Easy)

**Why Netlify?** Similar to Vercel, free tier, drag-and-drop deployment.

1. **Sign up at [netlify.com](https://netlify.com)**
2. **Deploy:**
   - Option 1: Drag and drop your `dist` folder to Netlify dashboard
   - Option 2: Use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=dist
     ```

3. **Connect Domain:**
   - In Netlify dashboard → Site settings → Domain management
   - Add your GoDaddy domain
   - Follow Netlify's DNS instructions

4. **Update GoDaddy DNS:**
   - Add the DNS records Netlify provides (similar to Vercel process)

### Option C: GitHub Pages (Free)

**Why GitHub Pages?** Free if you have a GitHub account.

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Install GitHub Pages plugin:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json:**
   Add to scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages:**
   - Go to repo Settings → Pages
   - Select source branch (usually `gh-pages`)
   - Add custom domain

6. **Update GoDaddy DNS:**
   - Add A records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or CNAME: `www` → `YOUR_USERNAME.github.io`

### Option D: Traditional Web Hosting (cPanel, etc.)

If you have traditional hosting (shared hosting, VPS, etc.):

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder contents** to your hosting's `public_html` folder via FTP/cPanel File Manager

3. **Update GoDaddy DNS:**
   - Point A record to your hosting's IP address
   - Or update nameservers to your hosting provider's nameservers

## Step 3: Configure GoDaddy DNS

The exact steps depend on your hosting choice, but generally:

1. **Log into GoDaddy**
2. **Go to My Products → Domains → Manage DNS**
3. **Add/Edit DNS Records:**

   **For Vercel/Netlify:**
   - A Record: `@` → IP address provided by hosting service
   - CNAME: `www` → CNAME provided by hosting service

   **For GitHub Pages:**
   - A Records: `@` → GitHub IPs (listed above)
   - CNAME: `www` → `yourusername.github.io`

4. **Wait for DNS Propagation** (can take 24-48 hours)

## Step 4: Enable HTTPS/SSL

Most modern hosting services (Vercel, Netlify) automatically provide SSL certificates. For traditional hosting, you may need to:
- Install Let's Encrypt SSL certificate
- Or purchase SSL from GoDaddy

## Important Notes

- **Environment Variables:** If you're using `GEMINI_API_KEY`, make sure to add it in your hosting service's environment variables settings (Vercel/Netlify have this in project settings)
- **Build Command:** Most services auto-detect Vite, but if needed, set:
  - Build command: `npm run build`
  - Output directory: `dist`
- **DNS Propagation:** Changes can take up to 48 hours, but usually happen within a few hours

## Quick Start (Recommended: Vercel)

```bash
# 1. Build locally to test
npm run build
npm run preview

# 2. Deploy to Vercel
npm install -g vercel
vercel

# 3. Add domain in Vercel dashboard
# 4. Update GoDaddy DNS with Vercel's instructions
```

## Troubleshooting

- **Domain not working?** Check DNS propagation: https://www.whatsmydns.net
- **404 errors?** Make sure your hosting service is configured for SPA (Single Page App) routing
- **Build errors?** Check that all dependencies are in `package.json` and environment variables are set

