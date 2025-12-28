# GitHub Setup Instructions

Your code has been committed locally! Now follow these steps to push it to GitHub:

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `first-up-financial` (or your preferred name)
   - **Description**: (optional) "First Up Financial website"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

### Option A: If you haven't pushed before (use this)

```powershell
cd "E:\Credit Stuff\FirstUpFinancial\Logo\first-up-financial-1"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with the repository name you created

### Option B: Using SSH (if you have SSH keys set up)

```powershell
cd "E:\Credit Stuff\FirstUpFinancial\Logo\first-up-financial-1"
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Authentication

When you run `git push`, you may be prompted for authentication:

- **If using HTTPS**: You'll need a Personal Access Token (not your password)
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate a new token with `repo` permissions
  - Use this token as your password when prompted

- **If using SSH**: Make sure your SSH key is added to your GitHub account

## Quick Command Reference

```powershell
# Navigate to project
cd "E:\Credit Stuff\FirstUpFinancial\Logo\first-up-financial-1"

# Add remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Future Updates

After the initial push, you can update your repository with:

```powershell
git add .
git commit -m "Your commit message"
git push
```

## Troubleshooting

- **"remote origin already exists"**: Run `git remote remove origin` first, then add it again
- **Authentication failed**: Make sure you're using a Personal Access Token (not password) for HTTPS
- **Branch name issues**: If your branch is `master` instead of `main`, use `git branch -M main` to rename it

