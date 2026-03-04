# Changelog

All notable changes to the **technical infrastructure** and **codebase** of BentoLog will be documented in this file. For article additions and updates, see [CONTENT_CHANGELOG.md](./CONTENT_CHANGELOG.md).

## [2.0.0] - 2026-03-04
### ✨ Major Transformation (Migration to React)
- **Project Rebirth**: Completely migrated from static HTML/Vanilla JS to **React 18 + TypeScript + Vite**.
- **UI Overhaul**: Redesigned the entire site with a professional "Bento" aesthetic using **Tailwind CSS**.
- **Dynamic Routing**: Implemented `react-router-dom` for clean URLs and better state management.
- **Dark Mode 2.0**: Added a robust theme toggle with full Tailwind dark-utility support.

### 🚀 New Technical Features
- **Markdown Engine**: Integrated `react-markdown` with `rehype-highlight` for technical articles.
- **Syntax Highlighting**: Added a vibrant "Atom One Dark" inspired theme for code blocks.
- **Interactive Post UI**: Added a reading progress bar and an auto-generated Table of Contents with section highlighting.
- **SEO Optimization**: Integrated `react-helmet-async` for dynamic page titles and meta descriptions.
- **MDX Integration**: Configured MDX support to allow React components inside blog posts.
- **URL Filtering**: Replaced state-based filtering with URL Search Parameters for shareable links.

### 🛠️ Fixes & Cleanups
- Fixed frontmatter parsing issues where metadata was visible in the body.
- Fixed mobile sidebar scroll-locking and layout ghosting.
- Consolidated CSS from 400+ lines of manual styles to atomic Tailwind utilities.
- Resolved missing Lucide icon imports that caused route crashing.
- Implemented robust frontmatter parsing logic in `PostDetail.tsx`.

## [1.0.0] - 2026-02-16
### Initial Release
- Basic static HTML/JS blog structure.
- Local storage based theme toggling.
- Simple grid-based post layout.
