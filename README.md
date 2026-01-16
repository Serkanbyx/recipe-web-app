# 🍳 Recipe App

Modern, PWA-supported recipe application. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🔍 **Recipe Search** - Search recipes with at least 2 characters
- 🌍 **Cuisine Filter** - Filter by cuisines like Italian, Mexican, Chinese, etc.
- ❤️ **Favorites** - Save recipes for offline access
- 📱 **PWA Support** - Install as an app, works offline
- 📱 **Responsive Design** - Beautiful on all devices

## 🛠️ Tech Stack

| Category  | Technology               |
| --------- | ------------------------ |
| Framework | React 18 + Vite          |
| Language  | TypeScript               |
| State     | Zustand                  |
| Form      | React Hook Form + Zod    |
| Routing   | React Router v6          |
| API       | Axios + Spoonacular      |
| Styling   | Tailwind CSS + shadcn/ui |
| PWA       | vite-plugin-pwa          |
| Backend   | Netlify Functions        |

## 🔐 API Security

This project uses **Netlify Functions** to securely store the API key:

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Frontend  │ --> │ Netlify Function │ --> │  Spoonacular    │
│  (Browser)  │     │  (Server-side)   │     │     API         │
└─────────────┘     └──────────────────┘     └─────────────────┘
                           │
                    API Key here
                    (Secure!)
```

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

#### For Local Development

Create a `.env` file in the project root:

```env
# For local development (with Vite)
VITE_SPOONACULAR_API_KEY=your_api_key_here

# For Netlify Functions
SPOONACULAR_API_KEY=your_api_key_here
```

#### For Netlify Deploy

Add environment variable in Netlify Dashboard:

1. **Site Settings** → **Environment variables**
2. Add new variable:
   - Key: `SPOONACULAR_API_KEY`
   - Value: `your_api_key_here`

### 3. Start Development Server

```bash
# Vite only (direct API calls)
npm run dev

# With Netlify Functions (production simulation)
npm run netlify
```

### 4. Production Build

```bash
npm run build
```

## 📁 Project Structure

```
├── netlify/
│   └── functions/
│       └── recipes.ts      # API proxy (secure)
├── public/
│   ├── favicon.svg
│   └── pwa-*.png          # PWA icons
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Sidebar, Layout
│   │   ├── recipe/        # RecipeCard, Grid, Filter
│   │   └── ui/            # Button, Input, Tabs, Drawer
│   ├── lib/
│   │   ├── api.ts         # API functions
│   │   └── utils.ts       # Utility functions
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── RecipeDetailPage.tsx
│   │   └── FavoritesPage.tsx
│   ├── store/
│   │   └── recipeStore.ts # Zustand store
│   └── types/
│       └── recipe.ts      # TypeScript types
├── .env                   # Environment variables (in gitignore)
├── .env.example           # Example env file
└── netlify.toml           # Netlify configuration
```

## 🌐 API Endpoints

Via Netlify Functions:

| Endpoint                                         | Description    |
| ------------------------------------------------ | -------------- |
| `/api/recipes?action=search&query=pasta`         | Search recipes |
| `/api/recipes?action=detail&id=123`              | Recipe detail  |
| `/api/recipes?action=categories`                 | Cuisine list   |
| `/api/recipes?action=byCategory&cuisine=italian` | By cuisine     |
| `/api/recipes?action=random&number=12`           | Random recipes |

## 🚀 Deploy to Netlify

### Automatic Deploy (Recommended)

1. Push to GitHub
2. Create new site on Netlify
3. Connect GitHub repo
4. Add environment variable:
   - `SPOONACULAR_API_KEY`
5. Deploy!

### Manual Deploy

```bash
npm run build
netlify deploy --prod
```

## 📝 Notes

- **API Limit**: Spoonacular free plan allows 150 requests per day
- **Offline**: Favorites are stored in localStorage
- **PWA**: Cache management with Service Worker
- **Security**: API key is never exposed in frontend

## 📄 License

MIT
