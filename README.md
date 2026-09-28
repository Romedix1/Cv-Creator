# CV Creator - Professional Resume Builder

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)

<p align="center">
  A modern, intuitive resume builder empowering users to craft professional, beautifully designed CVs with dynamic layouts and high-quality PDF exports.
</p>

### [**Live Site**](#https://cv-creator-kappa.vercel.app/)

[Explore Features](#features) • [Tech Stack](#tech-stack) • [How to Run](#quick-start--how-to-run) • [Configure .env](#how-to-write-env) • [Architecture](#project-structure)

</div>

---

## Overview

**CV Creator** is a full-stack Next.js application that simplifies the process of creating professional resumes. With a focus on user experience, it features an interactive drag-and-drop builder, real-time preview, multiple professional templates, and full internationalization (English & Polish). User data and documents are securely managed via Supabase, with a robust backend capable of pixel-perfect PDF rendering powered by Puppeteer.

---

## Features

### Interactive CV Builder & Templates
- **Real-Time Editor**: Instantly see how your resume looks as you type, add sections, and update information.
- **Drag-and-Drop Layout**: Reorder sections (Experience, Education, Skills, Custom Sections) effortlessly using `@hello-pangea/dnd`.
- **Multiple Professional Templates**: Choose from various polished designs (e.g., `modern-blue`) tailored for different industries.
- **Dark Mode & Theming**: Seamless switching between light and dark themes across the platform.

### Document Management & Export
- **High-Quality PDF Generation**: Serverless, pixel-perfect PDF rendering handled by Puppeteer & Chromium.
- **Resume Dashboard**: Authenticated users can manage, edit, and duplicate up to 5 individual resumes.
- **Instant Snapshots**: Generates and saves visual thumbnails of your current CV layouts to your dashboard.

### Comprehensive Personalization
- **Flexible Sections**: Built-in forms for Personal Info, Experience, Education, Skills, Languages, Certificates, and Interests.
- **Custom Elements & RODO**: Add fully custom sections or mandatory legal compliance clauses (like GDPR/RODO) with a click.
- **Profile Avatars**: Integrated user profile and avatar picture uploads powered by Supabase Storage.

### Global & Accessible
- **Bilingual Interface**: Full internationalization support (English and Polish) via `next-intl`.
- **Responsive Design**: Carefully crafted Tailwind CSS interface ensuring usability across devices and screen sizes.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI & Styling** | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) |
| **State Management** | React Context API, Custom Hooks, [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL), `@supabase/ssr`, Row Level Security (RLS) |
| **PDF Rendering** | [Puppeteer](https://pptr.dev/), `@sparticuz/chromium-min`, `html2pdf.js` |
| **Internationalization** | [next-intl](https://next-intl-docs.vercel.app/) |
| **Form Validation** | [Zod](https://zod.dev/) |
| **Tooling & Quality** | [TypeScript](https://www.typescriptlang.org/), [ESLint 9](https://eslint.org/) |

---

## Project Structure

```text
cv-creator/
├── db/
│   └── schema.sql            # PostgreSQL schema and RLS policies
├── public/                   # Static assets, fonts, icons, template thumbnails
├── src/
│   ├── actions/              # Next.js Server Actions (auth, resume management)
│   ├── app/
│   │   ├── [locale]/         # Internationalized route groups
│   │   ├── api/              # API Route Handlers (PDF generation)
│   │   ├── globals.css       # Tailwind CSS v4 design tokens
│   │   └── loading.tsx       # Global loading states
│   ├── components/
│   │   ├── layout/           # Shared navigation and structural components
│   │   ├── templates/        # Resume visual templates (e.g., modern-blue)
│   │   ├── ui/               # Radix UI primitives and base components
│   │   └── ...               # Domain components (AvatarUpload, ThemeSwitcher)
│   ├── context/              # React Context providers (ResumeContext)
│   ├── hooks/                # Custom hooks (useSectionOrder, useCreateResume)
│   ├── i18n/                 # next-intl configuration and routing
│   ├── lib/                  # Utilities (Supabase client, Puppeteer browser, constants)
│   ├── messages/             # i18n translation files (en.json, pl.json)
│   └── types/                # TypeScript type definitions and Zod schemas
├── .env.example              # Environment variables template
├── components.json           # shadcn/ui configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies and scripts
└── tailwind.config.ts        # Tailwind configuration (v4)
```

---

## Quick Start & How to Run

Follow these steps to set up CV Creator locally on your machine.

### Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Supabase Project**: Free database and auth project via [Supabase](https://supabase.com)

---

### Step-by-Step Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/Romedix1/Cv-Creator.git
cd Cv-Creator
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Create and Populate `.env`
Create your `.env.local` file in the project root by copying the template:
```bash
cp .env.example .env.local
```
Open `.env.local` in your editor and fill in your Supabase credentials. (See the detailed [How to Write `.env`](#-how-to-write-env) guide below).

#### 4. Setup Database Schema
Execute the SQL script located in `db/schema.sql` within your Supabase project's SQL Editor to set up the necessary tables (`profiles`, `resumes`), triggers, and Row Level Security (RLS) policies.

Ensure you also create two storage buckets in Supabase:
- `avatars` (Public access allowed for viewing)
- `cv-images` (Restricted to authenticated users)

#### 5. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start building resumes!

---

## How to Write `.env`

Create a file named `.env.local` in the root of your project. Below is a complete template ready to copy and fill:

```env
# ==============================================================================
# SUPABASE CONFIGURATION
# ==============================================================================
# Found in your Supabase Dashboard under Project Settings -> API
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="eyJh..."

# Found in Project Settings -> API (Service Role Secret)
# Keep this secure! Do not expose it to the client.
SUPABASE_SERVICE_ROLE_KEY="eyJh..."

# ==============================================================================
# APPLICATION
# ==============================================================================
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# ==============================================================================
# PUPPETEER / PDF GENERATION (Optional / Environment Specific)
# ==============================================================================
# If running locally on Windows and encountering Puppeteer path issues:
# CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"

# Remote serverless chromium path (used in production environments like Vercel)
CHROMIUM_URL="https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar"
```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Builds the application for production |
| `npm run start` | Runs the production build server |
| `npm run lint` | Runs ESLint to check for code quality and errors |

---

## License

This project is licensed under the MIT License.
