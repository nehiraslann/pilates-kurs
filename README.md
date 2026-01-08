# RumeliLearn - Online Pilates Kurs Platformu

Bu proje, React ve Vite kullanılarak geliştirilmiş bir online kurs platformudur. Kullanıcıların Pilates kurslarını keşfetmesini, kurs detaylarını incelemesini, favorilere eklemesini ve kurslara kaydolmasını sağlar. Backend gerektirmeden mock veri ile çalışır.

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Proje dizinine git
cd pilates-website

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresini açarak projeyi görüntüleyebilirsiniz.

### Diğer Komutlar

```bash
# Üretim derlemesi oluştur
npm run build

# Derlemeyi önizle
npm run preview

# Kod kalitesi kontrolü
npm run lint
```

## Proje Yapısı

```
pilates-website/
├── public/                  # Statik dosyalar (kurs görselleri vb.)
├── src/
│   ├── assets/              # Uygulama içi statik dosyalar
│   ├── components/          # React bileşenleri
│   │   ├── Footer.jsx           # Alt bilgi alanı
│   │   ├── Layout.jsx           # Sayfa düzeni wrapper'ı
│   │   ├── Navbar.jsx           # Navigasyon menüsü, logo, arama
│   │   ├── course/              # Kurs bileşenleri
│   │   │   ├── CourseCard.jsx       # Kurs önizleme kartı
│   │   │   ├── Curriculum.jsx       # Müfredat accordion'u
│   │   │   └── InstructorCard.jsx   # Eğitmen bilgi kartı
│   │   └── ui/                  # UI bileşenleri
│   │       ├── Badge.jsx            # Etiket bileşeni
│   │       ├── Button.jsx           # Özelleştirilebilir buton
│   │       ├── Components.jsx       # UI bileşen exportları
│   │       ├── FilterPanel.jsx      # Filtreleme seçenekleri
│   │       └── ProgressBar.jsx      # İlerleme çubuğu
│   ├── context/             # Context API dosyaları
│   │   ├── AuthContext.jsx      # Kullanıcı kimlik doğrulama
│   │   └── CourseContext.jsx    # Kurs state yönetimi
│   ├── data/                # Mock data dosyaları
│   │   ├── courses.json         # 12 adet kurs verisi
│   │   └── user.json            # Kullanıcı verisi
│   ├── pages/               # Sayfa bileşenleri
│   │   ├── Home.jsx             # Ana sayfa
│   │   ├── Courses.jsx          # Kurs listesi
│   │   ├── CourseDetail.jsx     # Kurs detay sayfası
│   │   ├── MyCourses.jsx        # Kayıtlı kurslarım
│   │   ├── Favorites.jsx        # Favoriler
│   │   └── Profile.jsx          # Profil sayfası
│   ├── App.jsx              # Ana uygulama bileşeni
│   ├── main.jsx             # Uygulama giriş noktası
│   └── index.css            # Global stiller
├── package.json
└── vite.config.js
```

## Kullanılan Teknolojiler

### Temel Teknolojiler
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| React | 19.2.0 | UI geliştirme kütüphanesi |
| Vite | 7.2.4 | Build aracı ve geliştirme sunucusu |
| React Router DOM | 7.11.0 | Sayfa yönlendirmeleri |

### UI ve Stil
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| Tailwind CSS | 4.1.18 | Utility-first CSS framework |
| @tailwindcss/vite | 4.1.18 | Vite için Tailwind eklentisi |

### Geliştirme Araçları
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| ESLint | 9.39.1 | Kod kalitesi kontrolü |
| @vitejs/plugin-react | 5.1.1 | React Vite eklentisi |

## Özellikler

- **Kurs Kataloğu** - Kategoriye ve seviyeye göre filtreleme
- **Arama** - Kurs adına göre arama
- **Fiyat Sıralaması** - Artan/azalan fiyata göre sıralama
- **Favoriler** - Beğenilen kursları kaydetme (Local Storage ile kalıcı)
- **Kurs Kaydı** - Kurslara kayıt olma ve ilerleme takibi
- **Kullanıcı Profili** - Profil bilgilerini düzenleme
- **Responsive Tasarım** - Mobil uyumlu arayüz
- **Hero Slider** - Ana sayfada otomatik geçişli slider

## Sayfalar

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| Ana Sayfa | `/` | Hero slider, popüler kurslar, istatistikler |
| Kurslar | `/courses` | Tüm kurslar, filtreleme ve arama |
| Kurs Detay | `/course/:id` | Kurs bilgileri, müfredat, eğitmen, yorumlar |
| Kurslarım | `/my-courses` | Kayıtlı kurslar ve ilerleme durumu |
| Favoriler | `/favorites` | Favori kurslar listesi |
| Profil | `/profile` | Kullanıcı bilgileri ve düzenleme |
| 404 | `*` | Sayfa bulunamadı |

## State Yönetimi

### Context API Kullanımı

**AuthContext** - Kullanıcı işlemleri:
- Giriş/Çıkış
- Profil güncelleme
- Kursa kayıt/ayrılma
- Favorilere ekleme/çıkarma
- Local Storage senkronizasyonu

**CourseContext** - Kurs işlemleri:
- Kurs listesi
- Filtreleme (kategori, seviye)
- Arama
- Fiyat sıralaması

## Mock Data

### Kurs Verisi (12 adet)
Her kurs şu bilgileri içerir:
- id, title, description, image
- instructor, instructorImage
- category, level, price, rating
- reviewCount, studentCount, duration, lessonCount
- curriculum (bölümler ve dersler)

### Kategoriler
- Mat Pilates
- Reformer Pilates
- Hamile Pilatesi
- Klinik Pilates
- 40+ Pilates
- Sporcu Pilatesi

### Seviyeler
- Başlangıç
- Orta
- İleri

## Ekran Görüntüleri

Proje aşağıdaki temel bölümleri içermektedir:

1. **Ana Sayfa** - Hero slider ile öne çıkan kurslar
2. **Kurs Listesi** - Filtreleme paneli ile kurs grid'i
3. **Kurs Detay** - Müfredat, eğitmen bilgisi ve kayıt butonu
4. **Kurslarım** - İlerleme çubuğu ile kayıtlı kurslar
5. **Favoriler** - Favori kurs listesi
6. **Profil** - Kullanıcı bilgileri ve düzenleme formu
