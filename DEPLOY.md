# Deploy to Netlify

## 🚀 Quick Deploy

### Option 1: Netlify CLI (Recommended)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Option 2: GitHub Integration (Easiest)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to **GitHub**
4. Select **`Druiz73/phrases-challenge-app`**
5. Netlify will auto-detect the `netlify.toml` configuration
6. Click **"Deploy site"**

✅ Done! Your site will be live at `https://your-site-name.netlify.app`

---

## ⚙️ Configuration

The project is already configured with `netlify.toml`:

```toml
[build]
  command = "npx expo export -p web"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🧪 Test Build Locally

Before deploying, test the build locally:

```bash
# Build for web
npm run build:web

# Preview the build (optional)
npx serve dist
```

---

## 🌐 After Deploy

Once deployed, you'll get a URL like:
`https://phrases-challenge-app.netlify.app`

You can:

- Share this URL with the company
- Use it in your CV/portfolio
- Test all features online

---

## 🔧 Custom Domain (Optional)

In Netlify dashboard:

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions

---

## 📱 Features Available in Web

✅ Add, search, and delete phrases  
✅ Persistent storage (localStorage)  
✅ Fixed-height cards with expand/collapse  
✅ Responsive grid layout  
✅ Search with debouncing and highlighting  
✅ Modal confirmations  
✅ All optimizations working

---

## 🎯 For the Technical Team

The deployed web app demonstrates:

- Production-ready React web application
- Performance optimizations
- Responsive design
- Clean Architecture
- TypeScript strict mode
- All features working cross-platform

---

**Your live demo will be ready in ~2 minutes after deployment!** 🚀
