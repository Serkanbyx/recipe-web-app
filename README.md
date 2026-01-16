# 🍳 Recipe App

Modern, PWA destekli tarif uygulaması. React, TypeScript ve Tailwind CSS ile geliştirildi.

## ✨ Özellikler

- 🔍 **Tarif Arama** - En az 2 karakter ile tarif arayın
- 🌍 **Mutfak Filtresi** - İtalyan, Meksika, Çin vb. mutfaklara göre filtreleyin
- ❤️ **Favoriler** - Tarifleri çevrimdışı erişim için kaydedin
- 📱 **PWA Desteği** - Uygulama olarak kurun, çevrimdışı çalışsın
- 📱 **Responsive Tasarım** - Tüm cihazlarda güzel görünüm

## 🛠️ Teknoloji Stack

| Kategori | Teknoloji |
|----------|-----------|
| Framework | React 18 + Vite |
| Dil | TypeScript |
| State | Zustand |
| Form | React Hook Form + Zod |
| Routing | React Router v6 |
| API | Axios + Spoonacular |
| Styling | Tailwind CSS + shadcn/ui |
| PWA | vite-plugin-pwa |
| Backend | Netlify Functions |

## 🔐 API Güvenliği

Bu proje **Netlify Functions** kullanarak API anahtarını güvenli bir şekilde saklar:

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Frontend  │ --> │ Netlify Function │ --> │  Spoonacular    │
│  (Browser)  │     │  (Server-side)   │     │     API         │
└─────────────┘     └──────────────────┘     └─────────────────┘
                           │
                    API Key burada
                    (Güvenli!)
```

## 🚀 Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Environment Variables

#### Lokal Geliştirme İçin

Proje kök dizininde `.env` dosyası oluşturun:

```env
# Lokal geliştirme için (Vite ile)
VITE_SPOONACULAR_API_KEY=your_api_key_here

# Netlify Functions için
SPOONACULAR_API_KEY=your_api_key_here
```

#### Netlify Deploy İçin

Netlify Dashboard'da environment variable ekleyin:

1. **Site Settings** → **Environment variables**
2. Yeni variable ekleyin:
   - Key: `SPOONACULAR_API_KEY`
   - Value: `your_api_key_here`

### 3. Geliştirme Sunucusunu Başlat

```bash
# Sadece Vite (doğrudan API çağrıları)
npm run dev

# Netlify Functions ile (production simülasyonu)
npm run netlify
```

### 4. Production Build

```bash
npm run build
```

## 📁 Proje Yapısı

```
├── netlify/
│   └── functions/
│       └── recipes.ts      # API proxy (güvenli)
├── public/
│   ├── favicon.svg
│   └── pwa-*.png          # PWA ikonları
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Sidebar, Layout
│   │   ├── recipe/        # RecipeCard, Grid, Filter
│   │   └── ui/            # Button, Input, Tabs, Drawer
│   ├── lib/
│   │   ├── api.ts         # API fonksiyonları
│   │   └── utils.ts       # Utility fonksiyonlar
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── RecipeDetailPage.tsx
│   │   └── FavoritesPage.tsx
│   ├── store/
│   │   └── recipeStore.ts # Zustand store
│   └── types/
│       └── recipe.ts      # TypeScript tipler
├── .env                   # Environment variables (gitignore'da)
├── .env.example           # Örnek env dosyası
└── netlify.toml           # Netlify konfigürasyonu
```

## 🌐 API Endpoints

Netlify Functions aracılığıyla:

| Endpoint | Açıklama |
|----------|----------|
| `/api/recipes?action=search&query=pasta` | Tarif ara |
| `/api/recipes?action=detail&id=123` | Tarif detayı |
| `/api/recipes?action=categories` | Mutfak listesi |
| `/api/recipes?action=byCategory&cuisine=italian` | Mutfağa göre |
| `/api/recipes?action=random&number=12` | Rastgele tarifler |

## 🚀 Netlify'a Deploy

### Otomatik Deploy (Önerilen)

1. GitHub'a push edin
2. Netlify'da yeni site oluşturun
3. GitHub repo'yu bağlayın
4. Environment variable ekleyin:
   - `SPOONACULAR_API_KEY`
5. Deploy!

### Manuel Deploy

```bash
npm run build
netlify deploy --prod
```

## 📝 Notlar

- **API Limiti**: Spoonacular ücretsiz plan günde 150 istek
- **Offline**: Favoriler localStorage'da saklanır
- **PWA**: Service Worker ile cache yönetimi
- **Güvenlik**: API anahtarı asla frontend'de açığa çıkmaz

## 📄 Lisans

MIT
