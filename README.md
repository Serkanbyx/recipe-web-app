# 🍳 Recipe Web App

A modern, responsive recipe discovery application built with React and TypeScript. Search thousands of recipes, explore world cuisines, and save your favorites for offline access!

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **Recipe Search**: Search thousands of recipes by name with real-time results
- **Cuisine Categories**: Browse recipes by world cuisines (Italian, Mexican, Chinese, Indian, Japanese, Thai, and more)
- **Detailed Recipe View**: View complete recipe information including ingredients, step-by-step instructions, cooking time, and servings
- **Favorites System**: Save your favorite recipes with localStorage persistence
- **Offline Access**: Access saved favorites even without internet connection (PWA support)
- **Diet Labels**: Quick identification of Vegetarian, Vegan, and Gluten-Free recipes
- **Health Score**: View health scores for each recipe
- **Responsive Design**: Beautiful mobile-first design with desktop sidebar and mobile bottom navigation
- **Modern UI**: Glassmorphism effects, smooth animations, and gradient accents

## Live Demo

[🎮 View Live Demo](https://recipe-web-appp.netlify.app/)

## Screenshots

### Home Screen

Browse recipes by cuisine categories with a beautiful card-based layout.

### Recipe Details

View complete recipe information with ingredients list and step-by-step instructions.

### Favorites

Access your saved recipes anytime, even offline.

## Technologies

- **React 18**: Modern React with Hooks and functional components
- **TypeScript**: Type-safe development with full TypeScript support
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Zustand**: Lightweight state management with minimal boilerplate
- **React Router v6**: Client-side routing with dynamic routes
- **Radix UI**: Accessible, unstyled UI primitives (Drawer, Tabs, Dialog)
- **Lucide React**: Beautiful, consistent icon library
- **Axios**: Promise-based HTTP client for API requests
- **Zod**: TypeScript-first schema validation
- **React Hook Form**: Performant form handling with validation
- **DOMPurify**: XSS sanitization for safe HTML rendering
- **Netlify Functions**: Serverless functions for secure API key handling
- **PWA Support**: Progressive Web App capabilities for offline access

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Spoonacular API key ([Get one free](https://spoonacular.com/food-api))

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/Serkanbyx/recipe-web-app.git
cd s2.2_Recipe-Web-App
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_SPOONACULAR_API_KEY=your_api_key_here
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open in browser**

Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

### Netlify Deployment

1. Connect your repository to Netlify
2. Add `SPOONACULAR_API_KEY` to Netlify environment variables
3. Deploy automatically on push

## Usage

1. **Browse Recipes**: Select a cuisine category from the sidebar (desktop) or drawer menu (mobile)
2. **Search**: Use the search bar to find specific recipes by name
3. **View Details**: Click on any recipe card to see full details, ingredients, and instructions
4. **Save Favorites**: Click the heart icon to save recipes for later
5. **Access Offline**: Saved favorites are available even without internet connection

## How It Works?

### API Architecture

The app uses Spoonacular API for recipe data. In production, API calls are proxied through Netlify Functions to protect the API key:

```
Client → Netlify Functions → Spoonacular API
```

### State Management

Zustand store manages:

- Recipe list and search results
- Category filtering
- Favorites (persisted to localStorage)
- Loading and error states

```typescript
// Example store usage
const { recipes, fetchRecipesByCategory, addToFavorites } = useRecipeStore();
```

### Offline Support

Favorites are stored in localStorage and accessible offline:

```typescript
// Favorites persistence
localStorage.setItem("recipe-app-favorites", JSON.stringify(favorites));
```

## Customization

### Add New Cuisine Categories

Edit `src/lib/api.ts` to add new categories:

```typescript
const categories = [
  { id: "italian", name: "Italian", image: "..." },
  { id: "your-cuisine", name: "Your Cuisine", image: "..." },
  // Add more cuisines
];
```

### Change Color Theme

Modify `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: 'your-color',
      // Add custom colors
    }
  }
}
```

### Modify Layout

Components are organized in `src/components/layout/`:

- `Header.tsx` - Top navigation and search
- `Sidebar.tsx` - Desktop category sidebar
- `MobileNav.tsx` - Mobile bottom navigation
- `Footer.tsx` - Site footer

## Features in Detail

### Completed Features

- ✅ Recipe search with instant results
- ✅ Cuisine-based filtering
- ✅ Detailed recipe view with ingredients and instructions
- ✅ Favorites with localStorage persistence
- ✅ Responsive mobile-first design
- ✅ Diet labels (Vegetarian, Vegan, Gluten-Free)
- ✅ Health score display
- ✅ Loading skeletons for better UX
- ✅ Error handling with user-friendly messages
- ✅ Secure API key handling with serverless functions

### Future Features

- [ ] User authentication
- [ ] Shopping list generation
- [ ] Meal planning calendar
- [ ] Nutritional information display
- [ ] Recipe sharing functionality
- [ ] Dark mode toggle
- [ ] Recipe rating system
- [ ] Print-friendly recipe view

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. **Commit** your changes

```bash
git commit -m "feat: add amazing feature"
```

4. **Push** to the branch

```bash
git push origin feature/amazing-feature
```

5. **Open** a Pull Request

### Commit Message Format

| Prefix      | Description              |
| ----------- | ------------------------ |
| `feat:`     | New feature              |
| `fix:`      | Bug fix                  |
| `docs:`     | Documentation changes    |
| `style:`    | Code style changes       |
| `refactor:` | Code refactoring         |
| `test:`     | Adding or updating tests |
| `chore:`    | Maintenance tasks        |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

**Serkanby**

- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)
- GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- Email: serkanbyx1@gmail.com

## Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) - Recipe data provider
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Unsplash](https://unsplash.com/) - Category images

## Contact

Have questions or suggestions?

- Open an [Issue](https://github.com/Serkanbyx/recipe-web-app/issues)
- Email: serkanbyx1@gmail.com
- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
