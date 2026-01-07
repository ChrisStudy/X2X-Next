# Personal Portfolio – Next.js (Page Router)

This is a personal portfolio website built with **Next.js (Pages Router)** and **Tailwind CSS**, designed as a **one-page layout** with modular sections such as Hero, About, Projects, and more.

The site is statically generated (SSG) for performance and SEO, and project content is powered by **Markdown files**.

---

## ✨ Features

- ⚡ **Next.js Page Router** (no App Router)
- 🧱 **One-pager layout** with reusable sections
- 🗂 **Projects powered by Markdown**
- 🧩 Modular components (Hero / About / Projects / Modal)
- 🎨 Tailwind CSS styling
- 📦 Static Site Generation (`getStaticProps`)
- 🔗 Project detail pages via dynamic routes (`/projects/[id]`)

---

## 📁 Project Structure

```txt
pages/
  ├─ index.tsx              # Home (one-page layout)
  └─ projects/
      └─ [id].tsx           # Project detail page (SSG)

lib/
  ├─ projects.ts            # Markdown parsing & data helpers
  └─ weather.ts             # Example external data (SSG)

projects/
  ├─ project-one.md
  └─ project-two.md

components/
  ├─ HomeHero.tsx
  ├─ AboutSection.tsx
  └─ projects/
      └─ ProjectsSection.tsx

