# 🔐 Environment Variables Kurulumu

## Lokal Geliştirme

### 1. `.env` Dosyası Oluşturun

Proje kök dizininde `.env` adında bir dosya oluşturun:

```bash
# Windows PowerShell
New-Item -Path ".env" -ItemType File
```

```bash
# Mac/Linux
touch .env
```

### 2. API Anahtarını Ekleyin

`.env` dosyasını açın ve şu içeriği ekleyin:

```env
# Spoonacular API Key
# https://spoonacular.com/food-api adresinden ücretsiz alabilirsiniz
SPOONACULAR_API_KEY=7b90a486e6a745b7aef015accb1afa66

# Lokal geliştirme için (Vite kullanır)
VITE_SPOONACULAR_API_KEY=7b90a486e6a745b7aef015accb1afa66
```

## Netlify Deploy

### Dashboard'dan Ekleme

1. [Netlify Dashboard](https://app.netlify.com) açın
2. Sitenizi seçin
3. **Site configuration** → **Environment variables**
4. **Add a variable** tıklayın
5. Ekleyin:
   - **Key**: `SPOONACULAR_API_KEY`
   - **Value**: `7b90a486e6a745b7aef015accb1afa66`
6. **Save** tıklayın

### CLI ile Ekleme

```bash
netlify env:set SPOONACULAR_API_KEY "7b90a486e6a745b7aef015accb1afa66"
```

## ⚠️ Güvenlik Notları

1. **`.env` dosyası asla GitHub'a push edilmemeli!**

   - `.gitignore` dosyasında zaten var

2. **API anahtarını kimseyle paylaşmayın**

   - Spoonacular ücretsiz plan: 150 istek/gün

3. **Production'da Netlify Functions kullanılır**
   - API anahtarı server-side'da kalır
   - Frontend'de asla görünmez

## 🧪 Test Etme

Kurulumdan sonra test edin:

```bash
# Geliştirme sunucusunu başlat
npm run dev

# veya Netlify Functions ile
npm run netlify
```

Tarayıcıda `http://localhost:5173` açın ve tariflerin yüklendiğini kontrol edin.
