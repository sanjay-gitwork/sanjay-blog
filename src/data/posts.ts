import { Post, CategoryStructure } from '../types';

export const categoryStructure: CategoryStructure = {
    "Engineering": ["DevOps", "Backend", "Frontend", "Architecture", "Cloud", "Database"],
    "Tech & Tools": ["AI", "Tools", "QA", "Tutorial"],
    "Thought": ["Opinion", "Culture", "Philosophy", "Future", "Design"]
};

export const posts: Post[] = [
    { 
        id: 107, 
        slug: "micro-frontends", 
        category: "Architecture", 
        tags: ["architecture", "micro-frontends", "module-federation"], 
        date: "March 10, 2026", 
        title: "Micro-Frontends: Scalable UI Architecture", 
        desc: "When your frontend team grows from 5 developers to 50, a single monolithic React app becomes a bottleneck. Enter Micro-Frontends.",
        file: "posts/micro-frontends.md"
    },
    { 
        id: 106, 
        slug: "ai-agents", 
        category: "AI", 
        tags: ["ai", "agents", "llm", "automation"], 
        date: "March 9, 2026", 
        title: "The Rise of Autonomous AI Agents", 
        desc: "We've moved past simple chatbots. The next frontier is Autonomous AI Agents—systems that can plan, reason, and use tools to achieve a goal.",
        file: "posts/ai-agents.md"
    },
    { 
        id: 105, 
        slug: "rust-for-js", 
        category: "Engineering", 
        tags: ["rust", "javascript", "webassembly"], 
        date: "March 8, 2026", 
        title: "Rust for JavaScript Developers", 
        desc: "Rust is consistently voted the most loved language. If you're coming from a JS background, the mental models are more similar than you think.",
        file: "posts/rust-for-js.md"
    },
    { 
        id: 104, 
        slug: "kubernetes-101", 
        category: "DevOps", 
        tags: ["kubernetes", "docker", "cloud", "devops"], 
        date: "March 7, 2026", 
        title: "Kubernetes for Frontend Developers", 
        desc: "Basic concepts of K8s for developers to help debug deployments and understand the full lifecycle of your application.",
        file: "posts/kubernetes-101.md"
    },
    { 
        id: 103, 
        slug: "typescript-generics", 
        category: "Engineering", 
        tags: ["typescript", "javascript", "web-dev"], 
        date: "March 6, 2026", 
        title: "Mastering TypeScript Generics", 
        desc: "Generics are one of the most powerful features of TypeScript, allowing you to create reusable, type-safe components.",
        file: "posts/typescript-generics.md"
    },
    { 
        id: 102, 
        slug: "docker-react-guide", 
        category: "DevOps", 
        tags: ["docker", "react", "deployment", "nginx"], 
        date: "March 5, 2026", 
        title: "Dockerizing Your React App: A Production-Ready Guide", 
        desc: "Learn how to use multi-stage Docker builds to create lean, production-ready containers for your React applications.",
        file: "posts/docker-react-guide.md"
    },
    { 
        id: 101, 
        slug: "react-hello-world", 
        category: "Engineering", 
        tags: ["react", "javascript", "tutorial"], 
        date: "March 4, 2026", 
        title: "React Hello World: A Deep Dive", 
        desc: "An in-depth look at what actually happens when you create a simple Hello World application in React.",
        file: "posts/react-hello-world.md"
    },
    { 
        id: 100, 
        slug: "first-article", 
        category: "Test", 
        tags: ["testing", "markdown", "development"], 
        date: "Feb 16, 2026", 
        title: "How to Create First Post", 
        desc: "This is a sample post designed to test all standard Markdown rendering features including code blocks, lists, and typography.",
        file: "posts/first.md"
    },
    { 
        id: 99, 
        slug: "pie-chart-tutorial", 
        category: "Tutorial", 
        tags: ["charts", "css"], 
        date: "Feb 14, 2026", 
        title: "How to Make a Pie Chart", 
        desc: "A deep dive into creating pie charts with CSS conic gradients.", 
        file: "posts/pie.md"
    },
    { id: 1, slug: "future-of-dev", category: "Opinion", tags: ["cloud", "devops"], date: "Feb 10, 2026", title: "The End of Localhost", desc: "Why spinning up a local dev environment is becoming a relic of the past.", content: `# Cloud Dev
It is faster.
## The Problem
Local environments drift from production.
### Config Hell
Nobody likes YAML.` },
    { id: 2, slug: "rust-vs-go", category: "Engineering", tags: ["rust", "go", "backend"], date: "Feb 08, 2026", title: "Rust vs Go: 2026 Benchmark", desc: "A pragmatic look at which language to choose for microservices.", content: `# Benchmarks
Rust wins on memory.
## Methodology
We tested 500M reqs.
### Throughput
Go was close.` },
    { id: 3, slug: "design-systems", category: "Design", tags: ["figma", "css"], date: "Feb 05, 2026", title: "Systemizing Chaos", desc: "Automating design tokens from Figma to React.", content: `# Tokens
JSON is king.
## Setup
Export from Figma.` },
    { id: 4, slug: "ai-agents", category: "AI", tags: ["llm", "python"], date: "Feb 01, 2026", title: "Autonomous Agents", desc: "Moving beyond chatbots to action-oriented AI loops.", content: `# Agents
They do work.
## Loop
Observe, Act, Reflect.` },
    { id: 5, slug: "react-rsc", category: "Frontend", tags: ["react", "javascript"], date: "Jan 28, 2026", title: "React Server Components", desc: "Deleting client-side JS for better performance.", content: `# RSC
Server first.
## Hydration
Only what matters.` },
    { id: 6, slug: "sharding", category: "Backend", tags: ["database", "sql"], date: "Jan 20, 2026", title: "Database Sharding", desc: "Horizontal partitioning strategies for high scale.", content: `# Scale
Partitioning is hard.
## Strategy
Key based.` },
    { id: 7, slug: "minimalism", category: "Philosophy", tags: ["productivity"], date: "Jan 15, 2026", title: "Digital Minimalism", desc: "Reducing friction to maximize creative output.", content: `# Focus
Less is more.` },
    { id: 8, slug: "css-grid", category: "Tutorial", tags: ["css", "frontend"], date: "Jan 10, 2026", title: "Mastering CSS Grid", desc: `Stop using Flexbox for everything.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}
\`\`\`
## Areas
Named areas are powerful.`, image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" },
    { id: 9, slug: "micro-frontends", category: "Architecture", tags: ["architecture", "frontend"], date: "Jan 05, 2026", title: "The State of Micro-Frontends", desc: "When to split your UI and when to keep the monolith.", content: `# Federation
Module Federation changed the game.` },
    { id: 10, slug: "k8s-101", category: "DevOps", tags: ["kubernetes", "docker"], date: "Jan 01, 2026", title: "Kubernetes for Developers", desc: "Pods, Nodes, and Clusters explained simply.", content: `# K8s
It's an operating system for the cloud.` },
    { id: 11, slug: "ts-generics", category: "Tutorial", tags: ["typescript"], date: "Dec 28, 2025", title: "TypeScript Generic Tricks", desc: "Advanced patterns for type-safe code.", content: `# Generics
Make your code reusable.` },
    { id: 12, slug: "code-reviews", category: "Culture", tags: ["management"], date: "Dec 25, 2025", title: "The Psychology of Code Reviews", desc: "How to give feedback without being a jerk.", content: `# Empathy
Code is personal.` },
    { id: 13, slug: "graphql-scaling", category: "Backend", tags: ["graphql", "api"], date: "Dec 20, 2025", title: "Scaling GraphQL", desc: "Solving the N+1 problem with Dataloaders.", content: `# Data
Fetch what you need.` },
    { id: 14, slug: "wasm-future", category: "Future", tags: ["wasm", "rust"], date: "Dec 15, 2025", title: "WebAssembly Beyond the Browser", desc: "Running Wasm on the server/edge.", content: `# Speed
Near native performance.` },
    { id: 15, slug: "testing-pyramid", category: "QA", tags: ["testing"], date: "Dec 10, 2025", title: "Rethinking the Testing Pyramid", desc: "Why integration tests matter more than unit tests.", content: `# Tests
Confidence is key.` },
    { id: 16, slug: "serverless-patterns", category: "Cloud", tags: ["aws", "serverless"], date: "Dec 05, 2025", title: "Serverless Design Patterns", desc: "Event-driven architectures on AWS Lambda.", content: `# Events
Decouple everything.` },
    { id: 17, slug: "docker-slim", category: "DevOps", tags: ["docker"], date: "Dec 01, 2025", title: "Slimming Down Docker Images", desc: "Multi-stage builds and Alpine linux.", content: `# Small
Faster deployments.` },
    { id: 18, slug: "postgres-perf", category: "Database", tags: ["sql", "postgres"], date: "Nov 28, 2025", title: "Postgres Performance Tuning", desc: "Indexes, VACUUM, and query planning.", content: `# SQL
It's all about the index.` },
    { id: 19, slug: "redis-caching", category: "Backend", tags: ["redis", "cache"], date: "Nov 25, 2025", title: "Redis Caching Strategies", desc: "Cache-aside vs Write-through patterns.", content: `# Cache
Speed up reads.` },
    { id: 20, slug: "git-mastery", category: "Tools", tags: ["git"], date: "Nov 20, 2025", title: "Git Rebase vs Merge", desc: "Keeping your history clean and linear.", content: `# History
Linear is better.` }
];
