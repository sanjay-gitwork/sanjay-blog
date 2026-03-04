# BentoLog | Engineering Journal

A high-end, professional technical blog built with **React**, **Vite**, and **Tailwind CSS**. Designed for engineers who appreciate clean aesthetics and robust technical deep-dives.

## 🚀 Features

- **Modern Architecture**: Built with React 18, TypeScript, and Vite for lightning-fast development and builds.
- **Dynamic Content**: Articles are written in **Markdown (.md)** and served dynamically with a robust frontmatter parser.
- **Premium Reading Experience**:
  - Interactive **Table of Contents** with scroll tracking.
  - Smooth **Reading Progress Bar**.
  - Vibrant **Atom One Dark** syntax highlighting for 20+ languages.
  - Full **Dark Mode** support with seamless transitions.
- **Smart Navigation**:
  - Clean URLs via **React Router**.
  - Persistent filtering via **URL Search Parameters**.
  - Global fuzzy-style search modal.
- **SEO Optimized**: Dynamic metadata management using **React Helmet Async**.
- **MDX Support**: Ability to use React components directly inside Markdown files.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) + [Rehype Highlight](https://github.com/rehypejs/rehype-highlight)
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async)

## 📦 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 📝 Writing a New Post

Simply add a new `.md` file to `public/posts/` and register it in `src/data/posts.ts`. The app will automatically parse the frontmatter and update the SEO tags.

```markdown
---
title: "Your Awesome Title"
date: "March 2026"
category: "Engineering"
tags: ["react", "typescript"]
---
Your content here...
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
