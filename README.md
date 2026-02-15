# CV Creator - Resume Builder

[English Version](#english-version) • [Wersja Polska](#wersja-polska)

---

<h2 id="english-section">🇬🇧 English Version</h2>

**CV Creator** is a modern web application for building professional resumes. It offers cloud-based PDF generation, secure data storage, and full bilingual support.

### Live Demo
App link: [https://cv-creator-kappa.vercel.app](https://cv-creator-kappa.vercel.app)

### Key Features
* **PDF Generation:** Server-side document rendering using `Puppeteer` – ensuring perfect print quality.
* **Secure Authentication:** Integrated with **Supabase Auth** (Email/Password and Google OAuth) for fast and secure data access.
* **Internationalization (i18n):** Full support for English and Polish languages via `next-intl`.
* **Database Automation:** SQL triggers automatically managing update timestamps and user profiles upon registration.
* **Resource Limits:** Server-side validation of resume count (max. 5 per user) to protect system resources.

### Technologies
* **Framework:** Next.js 15 (App Router), TypeScript
* **Backend:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
* **Styling:** Tailwind CSS
* **PDF Engine:** Optimized Puppeteer for Serverless environments
* **Icons:** Lucide React

### Technical Challenges
* **Function Size Optimization:** Solved the 50MB Vercel limit issue by configuring `serverExternalPackages`. This allows for stable PDF generation without overloading the cloud infrastructure.
* **Data Handling:** Support for document generation for both logged-in users (with database persistence) and guests (stored via local storage).

---

<h2 id="polish-section">🇵🇱 Wersja Polska</h2>

**CV Creator** to nowoczesna aplikacja webowa do tworzenia profesjonalnych CV. Oferuje generowanie plików PDF w chmurze, bezpieczne przechowywanie danych oraz dwujęzyczność.

### Demo Na Żywo
Link do aplikacji: [https://cv-creator-kappa.vercel.app](https://cv-creator-kappa.vercel.app)

### Główne Funkcje
* **Generowanie PDF:** Renderowanie dokumentów bezpośrednio na serwerze z wykorzystaniem `Puppeteer` – idealna jakość wydruku.
* **Bezpieczna Autoryzacja:** Integracja z **Supabase Auth** (Email/Hasło oraz Google OAuth) zapewniająca szybki dostęp do danych.
* **Wielojęzyczność:** Pełna obsługa języka polskiego i angielskiego za pomocą `next-intl`.
* **Automatyzacja Bazy Danych:** Triggery SQL automatycznie zarządzające datami aktualizacji i profilami użytkowników przy rejestracji.
* **Limity Zasobów:** Serwerowa weryfikacja liczby CV (maks. 5 na użytkownika) dla ochrony zasobów systemowych.

### Technologie
* **Framework:** Next.js 15 (App Router), Typescript
* **Backend:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
* **Stylizacja:** Tailwind CSS
* **PDF Engine:** Zoptymalizowany Puppeteer dla środowisk Serverless
* **Ikony:** Lucide React

### Wyzwania Techniczne
* **Optymalizacja Rozmiaru Funkcji:** Rozwiązano problem limitu 50MB na Vercelu poprzez konfigurację `serverExternalPackages`. Pozwala to na stabilne generowanie PDF bez przeciążania infrastruktury chmurowej.
* **Zapis danych:** Obsługa generowania dokumentów zarówno dla użytkowników zalogowanych (z zapisem do bazy), jak i gości (zapisywane w localstorage).

---

## Setup & Installation / Instalacja

1.  **Clone the repo / Sklonuj repozytorium:**
    ```bash
    git clone https://github.com/Romedix1/Cv-Creator
    cd cv-creator
    ```

2.  **Install dependencies / Zainstaluj zależności:**
    ```bash
    npm install
    ```

3.  **Environment Variables / Zmienne środowiskowe:**
    Create a `.env.local` file and fill in your Supabase credentials:
    ```env
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
    SUPABASE_SERVICE_ROLE_KEY=your-secret-service-role-key-here

    # App URL
    NEXT_PUBLIC_SITE_URL=http://localhost:3000

    # Chromium (PDF)
    CHROME_PATH=local_chromium_path
    CHROMIUM_URL=https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar
    ```

4.  **Run locally / Uruchom lokalnie:**
    ```bash
    npm run dev
    ```