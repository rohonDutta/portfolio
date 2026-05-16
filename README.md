<![CDATA[<div align="center">

# 🚀 Rohon Kumar Dutta — Portfolio

A **production-ready**, full-stack developer portfolio built with **Next.js 14**, **MongoDB**, and **Tailwind CSS**.

Features a playful geometric design system, a secure admin panel with full CRUD operations, contact form with email delivery, ImageKit-powered media uploads, and JWT authentication — all ready to deploy on Vercel.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0050?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Design System](#-design-system)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Customization](#-customization)
- [Security](#-security)
- [Testing](#-testing)
- [License](#-license)

---

## ✨ Features

### 🌐 Public Site

| Section      | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| **Hero**     | Animated type-writer effect, live stats, social links, scroll indicator  |
| **Projects** | Dynamic cards from MongoDB, filterable by tech tags, featured highlights |
| **Skills**   | Grouped by category with animated progress bars                          |
| **Contact**  | Form with validation, saves to DB, sends email notification via SMTP     |

### 🔒 Admin Panel (`/admin`)

| Feature        | Description                                               |
| -------------- | --------------------------------------------------------- |
| **Auth**       | JWT via HTTP-only cookies, 7-day session, edge middleware  |
| **Dashboard**  | Stats overview, quick-action cards                        |
| **Projects**   | Full CRUD, featured toggle, tech tags, ImageKit image URL |
| **Skills**     | Full CRUD, category grouping, proficiency level slider    |
| **Messages**   | Read inbox, mark as read, reply via mailto                |

### ⚡ Performance & DX

- **Edge Middleware** — lightweight JWT verification at the edge (no Node.js runtime)
- **Connection Pooling** — cached Mongoose connection prevents leaks during hot reload
- **Optimistic UI** — toast notifications & instant feedback via `react-hot-toast`
- **SEO Ready** — Open Graph, Twitter cards, meta tags, semantic HTML

---

## 🛠 Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| **Framework**  | Next.js 14 (App Router)             |
| **Styling**    | Tailwind CSS 3.3 + Framer Motion 11 |
| **Database**   | MongoDB Atlas + Mongoose 8          |
| **Auth**       | JWT (`jsonwebtoken` + `bcryptjs`)   |
| **Email**      | Nodemailer (Gmail / SMTP)           |
| **Media**      | ImageKit SDK                        |
| **Typography** | Outfit · Plus Jakarta Sans · DM Mono (Google Fonts) |
| **Deployment** | Vercel (recommended)                |

---

## 🎨 Design System

The portfolio uses a **Playful Geometric** design language with:

- **Color Palette** — Warm cream background (`#FFFDF5`), violet accent (`#8B5CF6`), pink secondary (`#F472B6`), amber tertiary (`#FBBF24`), emerald quaternary (`#34D399`)
- **Typography** — `Outfit` for headings (bold, geometric), `Plus Jakarta Sans` for body text, `DM Mono` for code
- **Shadows** — Hard-edge "pop" shadows (`4px 4px 0px`) for a sticker/card aesthetic
- **Components** — Candy buttons, sticker cards, speech-bubble type animation, dot-grid backgrounds, blob decorations
- **Animations** — `fade-up`, `pop-in`, `wiggle`, `float` via Tailwind keyframes + Framer Motion spring physics

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.jsx                    # Public portfolio (home)
│   ├── layout.jsx                  # Root layout, fonts, metadata
│   ├── globals.css                 # Tailwind config + design tokens
│   ├── loading.jsx                 # Global loading state
│   ├── error.jsx                   # Global error boundary
│   ├── not-found.jsx               # Custom 404 page
│   ├── admin/
│   │   ├── layout.jsx              # Admin auth guard (server-side)
│   │   ├── page.jsx                # Admin dashboard
│   │   ├── login/page.jsx          # Login form
│   │   ├── projects/page.jsx       # Projects CRUD
│   │   ├── skills/page.jsx         # Skills CRUD
│   │   └── messages/page.jsx       # Messages inbox
│   └── api/
│       ├── auth/route.js           # POST (login) · DELETE (logout)
│       ├── projects/
│       │   ├── route.js            # GET · POST
│       │   └── [id]/route.js       # GET · PUT · DELETE
│       ├── skills/
│       │   ├── route.js            # GET · POST
│       │   └── [id]/route.js       # PUT · DELETE
│       ├── contact/
│       │   ├── route.js            # POST (public) · GET (admin)
│       │   └── [id]/route.js       # PATCH · DELETE
│       └── upload/                 # ImageKit upload endpoint
│
├── components/
│   ├── Navbar.jsx                  # Sticky nav with scroll detection
│   ├── Hero.jsx                    # Animated hero section
│   ├── Projects.jsx                # Projects grid + filter
│   ├── Skills.jsx                  # Skills by category
│   ├── Contact.jsx                 # Contact form
│   ├── Footer.jsx                  # Footer
│   └── admin/
│       └── AdminSidebar.jsx        # Admin navigation sidebar
│
├── lib/
│   ├── db.js                       # MongoDB connection (cached/pooled)
│   ├── auth.js                     # JWT sign/verify/cookie helpers
│   ├── api.js                      # API response helpers
│   └── imagekit.js                 # ImageKit SDK instance
│
├── models/
│   ├── Project.js                  # Project schema (title, tech, image, etc.)
│   ├── Skill.js                    # Skill schema (category, proficiency)
│   ├── Admin.js                    # Admin schema (email, hashed password)
│   └── Contact.js                  # Contact message schema
│
├── scripts/
│   └── seed-admin.js               # One-time admin user creation
│
├── middleware.js                    # Edge JWT guard for /admin & /api
├── tailwind.config.js              # Design tokens, colors, animations
├── next.config.js                  # Image domains (ImageKit)
├── package.json
└── .env.example                    # Template for environment variables
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn / pnpm)
- **MongoDB Atlas** account ([free tier](https://www.mongodb.com/atlas/database))
- **ImageKit** account ([free tier](https://imagekit.io/)) — for image uploads

### 1. Clone & Install

```bash
git clone https://github.com/rohonDutta/portfolio.git
cd portfolio
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Fill in your values (see [Environment Variables](#-environment-variables) below).

### 3. Seed Admin User

Run the seed script **once** to create your admin account:

```bash
node scripts/seed-admin.js
```

> **Note:** The script reads from `.env.local`. Make sure `MONGO_URI`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` are set before running.

### 4. Start Development Server

```bash
npm run dev
```

| URL                                                    | Description       |
| ------------------------------------------------------ | ----------------- |
| [http://localhost:3000](http://localhost:3000)           | Public portfolio  |
| [http://localhost:3000/admin](http://localhost:3000/admin) | Admin panel login |

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root using `.env.example` as a template:

| Variable                  | Required | Description                                |
| ------------------------- | -------- | ------------------------------------------ |
| `MONGO_URI`               | ✅       | MongoDB Atlas connection string            |
| `JWT_SECRET`              | ✅       | Long random string (32+ characters)        |
| `ADMIN_EMAIL`             | ✅       | Admin login email                          |
| `ADMIN_PASSWORD`          | ✅       | Admin login password (hashed on seed)      |
| `EMAIL_HOST`              | ✅       | SMTP host (e.g., `smtp.gmail.com`)         |
| `EMAIL_PORT`              | ✅       | SMTP port (e.g., `587`)                    |
| `EMAIL_USER`              | ✅       | SMTP email address                         |
| `EMAIL_PASS`              | ✅       | SMTP password / Gmail App Password         |
| `EMAIL_TO`                | ✅       | Inbox to receive contact form emails       |
| `IMAGEKIT_PUBLIC_KEY`     | ✅       | ImageKit public API key                    |
| `IMAGEKIT_PRIVATE_KEY`    | ✅       | ImageKit private API key                   |
| `IMAGEKIT_URL_ENDPOINT`   | ✅       | ImageKit URL endpoint                      |
| `NEXT_PUBLIC_APP_URL`     | ❌       | App URL (defaults to `http://localhost:3000`) |

### Gmail App Password Setup

1. Enable **2-Factor Authentication** on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Generate an app password for "Mail"
4. Use the 16-character password as `EMAIL_PASS`

---

## 📡 API Reference

All API routes are under `/api`. Non-GET requests to protected routes require a valid JWT in the `portfolio_admin_token` cookie.

### Authentication

| Method   | Endpoint     | Auth     | Description          |
| -------- | ------------ | -------- | -------------------- |
| `POST`   | `/api/auth`  | Public   | Login (returns JWT)  |
| `DELETE` | `/api/auth`  | Admin    | Logout (clears cookie) |

### Projects

| Method   | Endpoint              | Auth     | Description            |
| -------- | --------------------- | -------- | ---------------------- |
| `GET`    | `/api/projects`       | Public   | List all projects      |
| `POST`   | `/api/projects`       | Admin    | Create a project       |
| `GET`    | `/api/projects/:id`   | Public   | Get project by ID      |
| `PUT`    | `/api/projects/:id`   | Admin    | Update a project       |
| `DELETE` | `/api/projects/:id`   | Admin    | Delete a project       |

### Skills

| Method   | Endpoint             | Auth     | Description          |
| -------- | -------------------- | -------- | -------------------- |
| `GET`    | `/api/skills`        | Public   | List all skills      |
| `POST`   | `/api/skills`        | Admin    | Create a skill       |
| `PUT`    | `/api/skills/:id`    | Admin    | Update a skill       |
| `DELETE` | `/api/skills/:id`    | Admin    | Delete a skill       |

### Contact

| Method   | Endpoint              | Auth     | Description                  |
| -------- | --------------------- | -------- | ---------------------------- |
| `POST`   | `/api/contact`        | Public   | Submit a contact message     |
| `GET`    | `/api/contact`        | Admin    | List all messages            |
| `PATCH`  | `/api/contact/:id`    | Admin    | Mark message as read         |
| `DELETE` | `/api/contact/:id`    | Admin    | Delete a message             |

---

## 🌍 Deployment

### Vercel (Recommended)

1. **Push** your repository to GitHub
2. **Import** the repo at [vercel.com/new](https://vercel.com/new)
3. **Add** all environment variables in the Vercel dashboard under *Settings → Environment Variables*
4. **Deploy** — Vercel auto-detects Next.js and handles the build

> ⚠️ **Important:** Run the seed script **locally** with your production `MONGO_URI` before deploying to create the admin user:
>
> ```bash
> # Temporarily set MONGO_URI in .env.local to your production connection string
> node scripts/seed-admin.js
> ```

### Other Platforms

This is a standard Next.js app. It can be deployed on any platform supporting Node.js:

```bash
npm run build    # Create production build
npm run start    # Start production server
```

---

## 🎛 Customization

| What               | Where                                  | Details                                                       |
| ------------------ | -------------------------------------- | ------------------------------------------------------------- |
| **Personal Info**  | `components/Hero.jsx`                  | Name, bio, social links, type-animation roles                 |
| **Colors**         | `tailwind.config.js` + `globals.css`   | Design tokens (CSS variables + Tailwind `extend.colors`)      |
| **Fonts**          | `app/layout.jsx`                       | Swap Google Fonts via `next/font`                             |
| **SEO / Metadata** | `app/layout.jsx`                       | Title, description, Open Graph, Twitter card                  |
| **Resume**         | `/public/resume.pdf`                   | Place your resume PDF in the public directory                 |
| **Image Domains**  | `next.config.js`                       | Add external image hostnames for `next/image`                 |
| **Animations**     | `tailwind.config.js`                   | Keyframes & animation durations under `extend.animation`      |

---

## 🔐 Security

- **JWT Authentication** — tokens are signed with HMAC-SHA256 and stored in HTTP-only cookies (not accessible via JavaScript)
- **Edge Middleware** — all `/admin` routes and non-GET `/api` routes are protected at the edge before reaching the application
- **Password Hashing** — admin passwords are hashed with `bcryptjs` (12 salt rounds)
- **Input Validation** — Mongoose schema validation with `required`, `trim`, `maxlength` constraints
- **CORS** — handled by Next.js defaults (same-origin)

---

## 🧪 Testing

The project includes Jest for unit testing:

```bash
# Run all tests
npm test
```

Test files are co-located with components (e.g., `components/Hero.test.js`).

---

## 📜 License

This project is licensed under the **MIT License** — fork it, customize it, ship it.

---

<div align="center">

**Built with ❤️ by [Rohon Kumar Dutta](https://github.com/rohonDutta)**

</div>
]]>
