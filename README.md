# Rohon Kumar Dutta — Portfolio

A production-ready full-stack developer portfolio built with **Next.js 14**, **MongoDB**, and **Tailwind CSS**. Features a polished public-facing site, a secure admin panel with full CRUD, contact form with email delivery, and JWT auth.

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + Framer Motion |
| Database | MongoDB + Mongoose |
| Auth | JWT (HTTP-only cookies) |
| Email | Nodemailer (Gmail/SMTP) |
| Fonts | Syne + DM Sans + DM Mono |
| Deployment | Vercel (recommended) |

---

## ✦ Features

### Public Site
- **Hero** — animated type effect, stats, social links
- **Projects** — dynamic from DB, filterable by tech tag
- **Skills** — grouped by category with animated progress bars
- **Contact** — form with validation, DB storage, email notification

### Admin Panel (`/admin`)
- JWT auth via HTTP-only cookie (7-day session)
- **Dashboard** — stats overview, quick actions
- **Projects** — full CRUD, featured toggle, tech tags, ImageKit image URL
- **Skills** — full CRUD, category grouping, proficiency level slider
- **Messages** — read inbox, mark as read, reply via mailto

---

## ✦ Getting Started

### 1. Clone & Install

```bash
git clone <your-repo>
cd portfolio
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```
MONGO_URI=               # MongoDB Atlas connection string
JWT_SECRET=              # Long random string (32+ chars)
ADMIN_EMAIL=             # Your admin login email
ADMIN_PASSWORD=          # Your admin login password
EMAIL_HOST=              # SMTP host (smtp.gmail.com)
EMAIL_PORT=              # 587
EMAIL_USER=              # Gmail address
EMAIL_PASS=              # Gmail App Password
EMAIL_TO=                # Where to receive contact emails
```

### 3. Create Admin User

Run the seed script once to create your admin account:

```bash
node scripts/seed-admin.js
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — public site  
Open [http://localhost:3000/admin](http://localhost:3000/admin) — admin panel

---

## ✦ Project Structure

```
/app
  /page.jsx                  ← Public portfolio
  /layout.jsx                ← Root layout + fonts + metadata
  /globals.css               ← Tailwind + design tokens
  /not-found.jsx             ← 404 page
  /error.jsx                 ← Global error boundary
  /admin
    /layout.jsx              ← Auth guard (server-side redirect)
    /page.jsx                ← Dashboard
    /login/page.jsx          ← Login form
    /projects/page.jsx       ← Projects CRUD
    /skills/page.jsx         ← Skills CRUD
    /messages/page.jsx       ← Messages inbox
  /api
    /projects/route.js       ← GET, POST
    /projects/[id]/route.js  ← GET, PUT, DELETE
    /skills/route.js         ← GET, POST
    /skills/[id]/route.js    ← PUT, DELETE
    /contact/route.js        ← POST (public), GET (admin)
    /contact/[id]/route.js   ← PATCH, DELETE
    /auth/route.js           ← POST (login), DELETE (logout)

/components
  Navbar.jsx                 ← Sticky nav with scroll detection
  Hero.jsx                   ← Animated hero section
  Projects.jsx               ← Projects grid with filter
  Skills.jsx                 ← Skills by category
  Contact.jsx                ← Contact form
  Footer.jsx
  /admin
    AdminSidebar.jsx         ← Admin nav

/lib
  db.js                      ← MongoDB connection (pooled)
  auth.js                    ← JWT sign/verify/cookie helpers
  api.js                     ← Response helpers

/models
  Project.js
  Skill.js
  Admin.js
  Contact.js

/middleware.js                ← Edge auth guard for /admin routes
/scripts/seed-admin.js       ← One-time admin user creation
```

---

## ✦ Deployment (Vercel)

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Deploy — done ✓

**Important**: Run the seed script locally pointing at your production MongoDB URI before deploying to create your admin user.

---

## ✦ Adding Content

After deploying, go to `/admin` and:
1. Log in with your admin credentials
2. Add projects with title, description, tech stack, GitHub/live URLs
3. Add skills grouped by category
4. View and reply to contact form messages

---

## ✦ Gmail Setup for Email

1. Enable 2-Factor Authentication on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Generate an app password for "Mail"
4. Use that 16-char password as `EMAIL_PASS` in your env

---

## ✦ Customization

- **Personal info**: Update name, bio, social links in `components/Hero.jsx`
- **Colors**: Modify `tailwind.config.js` and `globals.css` CSS variables  
- **Fonts**: Swap fonts in `app/layout.jsx` (Google Fonts via `next/font`)
- **SEO**: Update metadata in `app/layout.jsx`
- **Resume**: Place `resume.pdf` in `/public` directory

---

## License

MIT — fork, customize, ship.
