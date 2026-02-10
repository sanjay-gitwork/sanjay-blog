const categoryStructure = {
    "Engineering": ["DevOps", "Backend", "Frontend", "Architecture", "Cloud", "Database"],
    "Tech & Tools": ["AI", "Tools", "QA", "Tutorial"],
    "Thought": ["Opinion", "Culture", "Philosophy", "Future", "Design"]
};

const posts = [
    // --- NEW EXTERNAL FILE POST ---
    { 
        id: 99, 
        slug: "pie-chart-tutorial", 
        category: "Tutorial", 
        tags: ["charts", "css"], 
        date: "Feb 14, 2026", 
        title: "How to Make a Pie Chart", 
        desc: "A deep dive into creating pie charts with CSS conic gradients.", 
        file: "posts/pie.md" // <--- This looks for a folder named 'post' and a file 'pie.md'
    },
    // --- EXISTING POSTS ---
    { id: 1, slug: "future-of-dev", category: "Opinion", tags: ["cloud", "devops"], date: "Feb 10, 2026", title: "The End of Localhost", desc: "Why spinning up a local dev environment is becoming a relic of the past.", content: "# Cloud Dev\nIt is faster.\n## The Problem\nLocal environments drift from production.\n### Config Hell\nNobody likes YAML." },
    { id: 2, slug: "rust-vs-go", category: "Engineering", tags: ["rust", "go", "backend"], date: "Feb 08, 2026", title: "Rust vs Go: 2026 Benchmark", desc: "A pragmatic look at which language to choose for microservices.", content: "# Benchmarks\nRust wins on memory.\n## Methodology\nWe tested 500M reqs.\n### Throughput\nGo was close." },
    { id: 3, slug: "design-systems", category: "Design", tags: ["figma", "css"], date: "Feb 05, 2026", title: "Systemizing Chaos", desc: "Automating design tokens from Figma to React.", content: "# Tokens\nJSON is king.\n## Setup\nExport from Figma." },
    { id: 4, slug: "ai-agents", category: "AI", tags: ["llm", "python"], date: "Feb 01, 2026", title: "Autonomous Agents", desc: "Moving beyond chatbots to action-oriented AI loops.", content: "# Agents\nThey do work.\n## Loop\nObserve, Act, Reflect." },
    { id: 5, slug: "react-rsc", category: "Frontend", tags: ["react", "javascript"], date: "Jan 28, 2026", title: "React Server Components", desc: "Deleting client-side JS for better performance.", content: "# RSC\nServer first.\n## Hydration\nOnly what matters." },
    { id: 6, slug: "sharding", category: "Backend", tags: ["database", "sql"], date: "Jan 20, 2026", title: "Database Sharding", desc: "Horizontal partitioning strategies for high scale.", content: "# Scale\nPartitioning is hard.\n## Strategy\nKey based." },
    { id: 7, slug: "minimalism", category: "Philosophy", tags: ["productivity"], date: "Jan 15, 2026", title: "Digital Minimalism", desc: "Reducing friction to maximize creative output.", content: "# Focus\nLess is more." },
    { id: 8, slug: "css-grid", category: "Tutorial", tags: ["css", "frontend"], date: "Jan 10, 2026", title: "Mastering CSS Grid", desc: "Stop using Flexbox for everything.\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 1.5rem;\n}\n```\n## Areas\nNamed areas are powerful.", image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" },
    { id: 9, slug: "micro-frontends", category: "Architecture", tags: ["architecture", "frontend"], date: "Jan 05, 2026", title: "The State of Micro-Frontends", desc: "When to split your UI and when to keep the monolith.", content: "# Federation\nModule Federation changed the game." },
    { id: 10, slug: "k8s-101", category: "DevOps", tags: ["kubernetes", "docker"], date: "Jan 01, 2026", title: "Kubernetes for Developers", desc: "Pods, Nodes, and Clusters explained simply.", content: "# K8s\nIt's an operating system for the cloud." },
    { id: 11, slug: "ts-generics", category: "Tutorial", tags: ["typescript"], date: "Dec 28, 2025", title: "TypeScript Generic Tricks", desc: "Advanced patterns for type-safe code.", content: "# Generics\nMake your code reusable." },
    { id: 12, slug: "code-reviews", category: "Culture", tags: ["management"], date: "Dec 25, 2025", title: "The Psychology of Code Reviews", desc: "How to give feedback without being a jerk.", content: "# Empathy\nCode is personal." },
    { id: 13, slug: "graphql-scaling", category: "Backend", tags: ["graphql", "api"], date: "Dec 20, 2025", title: "Scaling GraphQL", desc: "Solving the N+1 problem with Dataloaders.", content: "# Data\nFetch what you need." },
    { id: 14, slug: "wasm-future", category: "Future", tags: ["wasm", "rust"], date: "Dec 15, 2025", title: "WebAssembly Beyond the Browser", desc: "Running Wasm on the server/edge.", content: "# Speed\nNear native performance." },
    { id: 15, slug: "testing-pyramid", category: "QA", tags: ["testing"], date: "Dec 10, 2025", title: "Rethinking the Testing Pyramid", desc: "Why integration tests matter more than unit tests.", content: "# Tests\nConfidence is key." },
    { id: 16, slug: "serverless-patterns", category: "Cloud", tags: ["aws", "serverless"], date: "Dec 05, 2025", title: "Serverless Design Patterns", desc: "Event-driven architectures on AWS Lambda.", content: "# Events\nDecouple everything." },
    { id: 17, slug: "docker-slim", category: "DevOps", tags: ["docker"], date: "Dec 01, 2025", title: "Slimming Down Docker Images", desc: "Multi-stage builds and Alpine linux.", content: "# Small\nFaster deployments." },
    { id: 18, slug: "postgres-perf", category: "Database", tags: ["sql", "postgres"], date: "Nov 28, 2025", title: "Postgres Performance Tuning", desc: "Indexes, VACUUM, and query planning.", content: "# SQL\nIt's all about the index." },
    { id: 19, slug: "redis-caching", category: "Backend", tags: ["redis", "cache"], date: "Nov 25, 2025", title: "Redis Caching Strategies", desc: "Cache-aside vs Write-through patterns.", content: "# Cache\nSpeed up reads." },
    { id: 20, slug: "git-mastery", category: "Tools", tags: ["git"], date: "Nov 20, 2025", title: "Git Rebase vs Merge", desc: "Keeping your history clean and linear.", content: "# History\nLinear is better." }
];

// Global State
const state = { 
    currentCategory: 'All', 
    currentTag: null,
    sortBy: 'newest',
    focusedIndex: -1,
    viewMode: 'grid',
    currentPage: 1, 
    postsPerPage: 9 // Keeps the 9 posts per page logic
};

// --- CORE FETCHING LOGIC (UPDATED FOR LIVE SERVER) ---
async function fetchMarkdown(post) {
    // 1. If we already fetched content previously, reuse it (Caching)
    if (post.content) return post.content;

    // 2. If it is an external file, fetch it
    if (post.file) {
        try {
            const response = await fetch(post.file);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const text = await response.text();
            
            // Save it so we don't fetch again next time
            post.content = text; 
            return text;
        } catch (error) {
            console.error("Failed to load markdown file:", error);
            return "# Error\nCould not load the post content. Ensure the file path is correct.";
        }
    }

    return ""; // Fallback
}

// --- ROUTER (UPDATED TO ASYNC) ---
async function router() { 
    const hash = window.location.hash.slice(1); 
    const container = document.getElementById('app'); 
    
    // Simple Loading State (Optional)
    if (!container.innerHTML || container.innerHTML === "") {
        // container.innerHTML = '<div style="padding:4rem; text-align:center;">Loading...</div>';
    }

    if (!hash || hash.includes('search-')) { 
        renderHome(container); 
    } else if (hash === 'contact') { 
        renderContact(container); 
    } else if (hash === 'about') { 
        renderAbout(container); 
    } else { 
        const post = posts.find(p => p.slug === hash); 
        if (post) { 
            // Await the content fetch before rendering
            if (!post.content) {
                await fetchMarkdown(post);
            }
            renderPost(container, post); 
        } else { 
            render404(container); 
        } 
    } 
    window.scrollTo(0, 0); 
    lucide.createIcons(); 
}

// --- INITIALIZATION ---
function init() {
    const container = document.getElementById('app');
    if (!container) return; // Wait for DOM

    setupTheme(); 
    populateCategories(); 
    setupSearch(); 
    setupKeyboardNav();
    setupScrollListener(); 
    
    window.addEventListener('hashchange', router);
    router(); // Initial Render
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Ensure DOM is ready before running
document.addEventListener('DOMContentLoaded', init);


// --- HELPER FUNCTIONS (UNCHANGED LOGIC) ---

function calculateReadTime(content) {
    if (!content) return 0;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
}

function setupScrollListener() {
    window.addEventListener('scroll', () => {
        const progressBar = document.getElementById('progress-bar');
        const container = document.getElementById('progress-container');
        
        if (!window.location.hash || window.location.hash.includes('search-') || window.location.hash === '#contact' || window.location.hash === '#about') {
            if(container) container.style.opacity = '0';
            return;
        }
        if(container) container.style.opacity = '1';

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(progressBar) progressBar.style.width = scrolled + "%";
    });
}

function filterTag(tagName) {
    state.currentTag = tagName;
    state.currentCategory = 'All'; 
    state.currentPage = 1;
    state.focusedIndex = -1;
    window.location.hash = ''; 
    renderHome(document.getElementById('app'));
}

function populateTagFilter() {
    const uniqueTags = [...new Set(posts.flatMap(p => p.tags))].sort();
    return `
        <div class="dropdown toolbar-dropdown">
            <button type="button" class="toolbar-btn">
                <i data-lucide="tag" style="width:14px;"></i> 
                ${state.currentTag ? state.currentTag : 'Filter by Tag'}
                <i data-lucide="chevron-down" style="width:12px; margin-left:4px;"></i>
            </button>
            <div class="toolbar-dropdown-content">
                <div class="toolbar-option ${state.currentTag === null ? 'selected' : ''}" onclick="filterTag(null)">
                    <span>All Tags</span>
                </div>
                ${uniqueTags.map(tag => `
                    <div class="toolbar-option ${state.currentTag === tag ? 'selected' : ''}" onclick="filterTag('${tag}')">
                        <span>#${tag}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function populateSortFilter() {
    const options = [
        { id: 'newest', label: 'Newest First' },
        { id: 'oldest', label: 'Oldest First' },
        { id: 'az', label: 'Alphabetical (A-Z)' },
        { id: 'za', label: 'Alphabetical (Z-A)' }
    ];
    const currentLabel = options.find(o => o.id === state.sortBy).label;
    
    return `
        <div class="dropdown toolbar-dropdown">
            <button type="button" class="toolbar-btn">
                <i data-lucide="arrow-up-down" style="width:14px;"></i> 
                ${currentLabel}
                <i data-lucide="chevron-down" style="width:12px; margin-left:4px;"></i>
            </button>
            <div class="toolbar-dropdown-content">
                ${options.map(opt => `
                    <div class="toolbar-option ${state.sortBy === opt.id ? 'selected' : ''}" onclick="setSort('${opt.id}')">
                        <span>${opt.label}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function setSort(sortId) {
    state.sortBy = sortId;
    renderHome(document.getElementById('app'));
}

function sortPosts(postsToSort) {
    const sorted = [...postsToSort]; 
    switch (state.sortBy) {
        case 'newest': return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'oldest': return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'az': return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'za': return sorted.sort((a, b) => b.title.localeCompare(a.title));
        default: return sorted;
    }
}

function setView(mode) {
    state.viewMode = mode;
    renderHome(document.getElementById('app'));
}

function filterCategory(cat) { 
    state.currentCategory = cat; 
    state.currentTag = null; 
    state.focusedIndex = -1; 
    state.currentPage = 1; 
    window.location.hash = ''; 
    renderHome(document.getElementById('app')); 
}

function changePage(direction) { 
    const filteredPosts = getFilteredPosts(); 
    const totalPages = Math.ceil(filteredPosts.length / state.postsPerPage); 
    const nextPage = state.currentPage + direction; 
    if (nextPage > 0 && nextPage <= totalPages) { 
        state.currentPage = nextPage; 
        renderHome(document.getElementById('app')); 
        window.scrollTo(0, 0); 
    } 
}

function getFilteredPosts() { 
    let results = posts;
    if (state.currentTag) {
        results = posts.filter(p => p.tags && p.tags.includes(state.currentTag));
    } else if (state.currentCategory !== 'All') {
        if (categoryStructure[state.currentCategory]) { 
            const children = categoryStructure[state.currentCategory]; 
            results = posts.filter(p => children.includes(p.category)); 
        } else {
            results = posts.filter(p => p.category === state.currentCategory); 
        }
    }
    return sortPosts(results);
}

function updateMeta(post) { 
    if (post) { 
        document.title = `${post.title} | Engineering Journal`; 
        document.querySelector('meta[name="description"]').setAttribute("content", post.desc); 
    } else { 
        document.title = 'Engineering Journal'; 
        document.querySelector('meta[name="description"]').setAttribute("content", "A curated collection of thoughts on software architecture, design systems, and the future of technology."); 
    } 
}

function getGridSpan(index) { 
    if (index === 0) return 'span-12'; 
    if (index === 1 || index === 2) return 'span-6'; 
    return 'span-4'; 
}

function renderHome(container) {
    updateMeta(null);
    const filteredPosts = getFilteredPosts();
    const totalPages = Math.ceil(filteredPosts.length / state.postsPerPage);
    const startIndex = (state.currentPage - 1) * state.postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + state.postsPerPage);

    let postsHtml = '';
    
    const renderTags = (tags) => { if (!tags) return ''; return tags.map(t => `<span class="hashtag" onclick="event.preventDefault(); event.stopPropagation(); filterTag('${t}')">#${t}</span>`).join(''); };

    if (state.viewMode === 'grid') {
        const gridContent = currentPosts.map((post, index) => {
            const spanClass = getGridSpan(index);
            const readTime = calculateReadTime(post.content);
            return `
            <a href="#${post.slug}" class="card ${spanClass}">
                <div>
                    <div class="card-meta">
                        <span class="tag" onclick="event.preventDefault(); event.stopPropagation(); filterCategory('${post.category}')">${post.category}</span>
                        <span class="read-time">${post.date} • ${readTime} min read</span>
                    </div>
                    <h2>${post.title}</h2>
                    <p>${post.desc}</p>
                    <div style="margin-top:1rem;">${renderTags(post.tags)}</div>
                </div>
                <div class="card-footer">Read Article <i data-lucide="arrow-right" style="width:16px;"></i></div>
            </a>`;
        }).join('');
        postsHtml = `<div class="bento-grid">${gridContent}</div>`;
    } else {
        const listContent = currentPosts.map(post => {
            const readTime = calculateReadTime(post.content);
            return `
            <a href="#${post.slug}" class="list-card">
                <div class="list-date">${post.date}</div>
                <div class="list-content">
                    <div style="margin-bottom: 6px; display:flex; align-items:center; gap:8px;">
                        <span class="tag" onclick="event.preventDefault(); event.stopPropagation(); filterCategory('${post.category}')">${post.category}</span>
                        <span class="read-time" style="font-size:0.75rem;">${readTime} min read</span>
                    </div>
                    <div class="list-title">${post.title}</div>
                    <div class="list-desc">${post.desc}</div>
                    <div style="margin-top:0.5rem;">${renderTags(post.tags)}</div>
                </div>
                <div class="list-arrow"><i data-lucide="arrow-right" style="width:18px;"></i></div>
            </a>
        `}).join('');
        postsHtml = `<div class="list-layout">${listContent}</div>`;
    }

    const paginationHtml = totalPages > 1 ? `
        <div class="pagination">
            <button type="button" class="page-btn" onclick="changePage(-1)" ${state.currentPage === 1 ? 'disabled' : ''}><i data-lucide="chevron-left" style="width:16px;"></i> Prev</button>
            <span class="page-info">Page ${state.currentPage} of ${totalPages}</span>
            <button type="button" class="page-btn" onclick="changePage(1)" ${state.currentPage === totalPages ? 'disabled' : ''}>Next <i data-lucide="chevron-right" style="width:16px;"></i></button>
        </div>
    ` : '';

    let headerText = "Engineering the<br>Next Generation.";
    let subText = "A curated collection of thoughts on software architecture, design systems, and the future of technology.";

    if (state.currentTag) {
        headerText = `Tagged: #${state.currentTag}`;
        subText = `Showing all articles tagged with #${state.currentTag}. <a href="#" onclick="filterCategory('All')" style="text-decoration:underline;">Clear filter</a>`;
    } else if (state.currentCategory !== 'All') {
        headerText = categoryStructure[state.currentCategory] 
            ? `Browsing ${state.currentCategory}` 
            : `${state.currentCategory} Archives`;
        subText = `Reading list for ${state.currentCategory}.`;
    }

    container.innerHTML = `
        <section class="hero">
            <h1>${headerText}</h1>
            <p>${subText}</p>
        </section>
        
        <div class="toolbar">
            ${populateTagFilter()}
            ${populateSortFilter()}
            
            <div class="view-controls">
                <button type="button" onclick="setView('grid')" class="view-btn ${state.viewMode === 'grid' ? 'active' : ''}" aria-label="Grid View"><i data-lucide="layout-grid" style="width:18px;"></i></button>
                <button type="button" onclick="setView('list')" class="view-btn ${state.viewMode === 'list' ? 'active' : ''}" aria-label="List View"><i data-lucide="list" style="width:18px;"></i></button>
            </div>
        </div>

        ${filteredPosts.length > 0 ? postsHtml : '<p style="text-align:center;">No posts found.</p>'}
        ${paginationHtml}
    `;
    lucide.createIcons();
}

function renderContact(container) {
    updateMeta(null);
    container.innerHTML = `
        <div class="wrapper-centered">
            <div class="card single-card">
                <h1>Get in Touch</h1>
                <p style="color:var(--text-muted); margin-bottom:2rem;">Have a question about the blog or want to collaborate? Drop me a line.</p>
                
                <form id="contact-form" onsubmit="event.preventDefault(); handleContactSubmit();">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" required placeholder="Jane Doe" class="form-input">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" required placeholder="jane@example.com" class="form-input">
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <textarea required rows="5" placeholder="Your message here..." class="form-input"></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send Message <i data-lucide="send" style="width:16px"></i></button>
                </form>
                <div id="success-message" style="display:none; text-align:center; padding:2rem; color:var(--text-main);">
                    <i data-lucide="check-circle" style="width:48px; height:48px; color:green; margin-bottom:1rem;"></i>
                    <h3>Message Sent!</h3>
                    <p style="color:var(--text-muted);">Thanks for reaching out. I'll get back to you soon.</p>
                    <button onclick="window.location.hash=''" class="view-btn" style="margin-top:1rem; width:100%;">Back to Home</button>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function handleContactSubmit() {
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
    lucide.createIcons();
}

function renderAbout(container) {
    updateMeta(null);
    container.innerHTML = `
        <div class="wrapper-centered">
            <div class="card single-card">
                <div class="about-header">
                    <div class="avatar-placeholder"><i data-lucide="user" style="width:40px; height:40px;"></i></div>
                    <div>
                        <h1 style="font-size:2rem; margin-bottom:4px;">About Me</h1>
                        <p style="color:var(--text-muted);">Engineering Lead & Writer</p>
                    </div>
                </div>
                <div class="prose" style="font-size:1rem;">
                    <p>Welcome to my Engineering Journal. I'm a passionate software engineer with over 10 years of experience building scalable distributed systems and user-centric frontend applications.</p>
                    <p>This blog is my digital garden where I document my learning process, share technical deep dives, and explore the future of software development.</p>
                    
                    <h3 style="margin-top:2rem;">Tech Stack</h3>
                    <div class="tech-stack">
                        <span class="tag">TypeScript</span>
                        <span class="tag">Rust</span>
                        <span class="tag">React</span>
                        <span class="tag">Kubernetes</span>
                        <span class="tag">AWS</span>
                        <span class="tag">PostgreSQL</span>
                    </div>

                    <h3 style="margin-top:2rem;">Connect</h3>
                    <p>Feel free to reach out via the <a href="#contact" style="text-decoration:underline;">contact page</a> or find me on social media.</p>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function renderPost(container, post) {
    updateMeta(post);
    let related = posts.filter(p => p.category === post.category && p.id !== post.id);
    if (related.length < 2) { const more = posts.filter(p => p.id !== post.id && !related.includes(p)); related = [...related, ...more]; }
    const relatedHTML = related.slice(0, 2).map(p => `
        <a href="#${p.slug}" class="card">
            <div><div class="card-meta"><span class="tag">${p.category}</span></div><h2 style="font-size:1.2rem;">${p.title}</h2><p style="font-size:0.95rem; margin-top:0.5rem;">${p.desc}</p></div>
            <div class="card-footer" style="margin-top:1rem;">Read <i data-lucide="arrow-right" style="width:14px;"></i></div>
        </a>`).join('');

    const breadcrumbsHTML = `<nav class="breadcrumb-nav"><span class="breadcrumb-item" onclick="filterCategory('All')">Home</span><span class="breadcrumb-sep">/</span><span class="breadcrumb-item" onclick="filterCategory('${post.category}')">${post.category}</span><span class="breadcrumb-sep">/</span><span class="breadcrumb-current">${post.title.substring(0, 30)}${post.title.length>30 ? '...' : ''}</span></nav>`;
    const tagsHtml = post.tags ? `<div style="margin-bottom:2rem;">${post.tags.map(t => `<span class="tag" style="margin-right:6px; cursor:pointer;" onclick="event.preventDefault(); event.stopPropagation(); filterTag('${t}')">#${t}</span>`).join('')}</div>` : '';

    let contentHTML = marked.parse(post.content);
    
    container.innerHTML = `
        <div class="post-layout">
            <div class="prose-wrapper">
                ${breadcrumbsHTML}
                <a href="#" onclick="filterCategory('All')" class="nav-link" style="display:inline-flex; align-items:center; gap:8px; margin-bottom:2rem; padding-left:0;"><i data-lucide="arrow-left" style="width:16px;"></i> Back to Journal</a>
                <div style="margin-bottom:1rem; display:flex; gap:12px; align-items:center;"><span class="tag" onclick="event.stopPropagation(); filterCategory('${post.category}')">${post.category}</span><span style="color:var(--text-muted); font-size:0.9rem;">${post.date}</span></div>
                <div class="prose" id="post-content">
                    <h1>${post.title}</h1>
                    <p style="font-size:1.2rem; color:var(--text-main); margin-bottom:2rem; border-bottom:1px solid var(--border); padding-bottom:2rem;">${post.desc}</p>
                    ${post.image ? `<img src="${post.image}" alt="${post.title}" style="width:100%; border-radius:8px; margin-bottom:2rem;">` : ''}
                    ${tagsHtml}
                    ${contentHTML}
                </div>
                <div class="related-section"><h3 class="related-header">Read Next</h3><div class="related-grid">${relatedHTML}</div></div>
            </div>
            <aside class="toc-sidebar"><div class="toc-title">On this page</div><ul class="toc-list" id="toc-list"></ul></aside>
        </div>
    `;
    
    const headings = container.querySelectorAll('#post-content h2, #post-content h3'); const tocList = document.getElementById('toc-list');
    if (headings.length > 0) headings.forEach((h) => { const id = h.innerText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''); h.id = id; const depth = h.tagName === 'H2' ? 2 : 3; tocList.innerHTML += `<li><a href="#${id}" class="toc-link depth-${depth}" onclick="document.getElementById('${id}').scrollIntoView({behavior: 'smooth'}); return false;">${h.innerText}</a></li>`; }); else document.querySelector('.toc-sidebar').style.display = 'none';
    container.querySelectorAll('pre').forEach(pre => { const btn = document.createElement('button'); btn.className = 'copy-btn'; btn.innerHTML = 'Copy'; btn.onclick = () => { navigator.clipboard.writeText(pre.querySelector('code').innerText); btn.innerHTML = 'Copied!'; setTimeout(() => btn.innerHTML = 'Copy', 2000); }; pre.appendChild(btn); });
    
    hljs.highlightAll(); 
    lucide.createIcons();
}

function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        if (document.querySelector('.search-modal-backdrop').style.display === 'flex') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        const hash = window.location.hash; const isHome = !hash || hash.includes('search-');
        if (isHome) {
            const selector = state.viewMode === 'grid' ? '.card' : '.list-card'; const cards = document.querySelectorAll(selector); if (cards.length === 0) return;
            if (e.key === 'j') { state.focusedIndex = Math.min(state.focusedIndex + 1, cards.length - 1); highlightCard(cards); }
            else if (e.key === 'k') { state.focusedIndex = Math.max(state.focusedIndex - 1, 0); highlightCard(cards); }
            else if (e.key === 'Enter' && state.focusedIndex !== -1) cards[state.focusedIndex].click();
            else if (e.key === 'ArrowRight') changePage(1); else if (e.key === 'ArrowLeft') changePage(-1);
        } else if (e.key === 'Escape') filterCategory('All');
    });
}

function highlightCard(cards) { 
    cards.forEach(c => c.classList.remove('keyboard-focused')); 
    const target = cards[state.focusedIndex]; 
    if (target) { 
        target.classList.add('keyboard-focused'); 
        target.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
    } 
}

function setupSearch() {
    const input = document.getElementById('search-input'); 
    input.addEventListener('keyup', (e) => { 
        const term = e.target.value.toLowerCase(); 
        const results = posts.filter(p => p.title.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term)); 
        const html = results.map(p => `<a href="#${p.slug}" onclick="toggleSearch()" class="search-result-item"><span class="search-result-title">${p.title}</span><span class="search-result-meta">${p.date} • ${p.category}</span></a>`).join(''); 
        document.getElementById('search-results').innerHTML = results.length ? html : '<div style="padding:1rem; color:var(--text-muted)">No results found.</div>'; 
    });
    document.addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); toggleSearch(); } if (e.key === 'Escape') document.querySelector('.search-modal-backdrop').style.display = 'none'; });
}

function toggleSearch() { 
    const modal = document.querySelector('.search-modal-backdrop'); 
    modal.style.display = getComputedStyle(modal).display === 'none' ? 'flex' : 'none'; 
    if (modal.style.display === 'flex') document.getElementById('search-input').focus(); 
}

function toggleSidebar() { 
    document.querySelector('.sidebar-overlay').classList.toggle('active'); 
    document.getElementById('mobile-sidebar').classList.toggle('active'); 
}

function toggleAccordion(id, iconId) { 
    const content = document.getElementById(id); 
    const icon = document.getElementById(iconId); 
    if (content.style.maxHeight && content.style.maxHeight !== '0px') { 
        content.style.maxHeight = '0px'; 
        icon.classList.remove('rotate'); 
    } else { 
        content.style.maxHeight = content.scrollHeight + "px"; 
        icon.classList.add('rotate'); 
    } 
}

function populateCategories() {
    const dropdown = document.getElementById('category-dropdown');
    let deskHtml = `<div class="dropdown-group"><div class="group-header" onclick="filterCategory('All')">All Posts</div></div>`;
    const mobileList = document.getElementById('mobile-category-list');
    let mobHtml = `<a onclick="filterCategory('All'); toggleSidebar()" class="mobile-group-header" style="border-bottom:1px solid var(--border);">All Posts</a>`;
    let groupCount = 0;
    for (const [parent, children] of Object.entries(categoryStructure)) {
        groupCount++;
        const isFirst = groupCount === 1; const initialHeight = isFirst ? '500px' : '0px'; const initialRotate = isFirst ? 'rotate' : '';
        const deskId = `desk-group-${groupCount}`; const deskIconId = `desk-icon-${groupCount}`; const mobId = `mob-group-${groupCount}`; const mobIconId = `mob-icon-${groupCount}`;
        deskHtml += `<div class="dropdown-group"><div class="group-header" onclick="toggleAccordion('${deskId}', '${deskIconId}')"><span onclick="event.stopPropagation(); filterCategory('${parent}')">${parent}</span><i data-lucide="chevron-down" id="${deskIconId}" class="chevron-icon ${initialRotate}"></i></div><div id="${deskId}" class="group-children" style="max-height: ${initialHeight};">${children.map(child => `<a href="#" onclick="filterCategory('${child}')" class="dropdown-item">${child}</a>`).join('')}</div></div>`;
        mobHtml += `<div class="mobile-group"><div class="mobile-group-header" onclick="toggleAccordion('${mobId}', '${mobIconId}')"><span onclick="event.stopPropagation(); filterCategory('${parent}'); toggleSidebar()">${parent}</span><i data-lucide="chevron-down" id="${mobIconId}" class="chevron-icon ${initialRotate}"></i></div><div id="${mobId}" class="group-children" style="max-height: ${initialHeight};">${children.map(child => `<a onclick="filterCategory('${child}'); toggleSidebar()" class="mobile-sub-link">${child}</a>`).join('')}</div></div>`;
    }
    dropdown.innerHTML = deskHtml; mobileList.innerHTML = mobHtml;
}

function render404(container) { 
    updateMeta(null); 
    container.innerHTML = `<div class="error-state"><i data-lucide="file-warning" class="error-icon"></i><h1 class="error-title">Page Not Found</h1><p style="color:var(--text-muted); margin-bottom:1.5rem;">The article you are looking for doesn't exist or has been moved.</p><a href="#" onclick="filterCategory('All')" class="error-btn">Go Back Home</a></div>`; 
    lucide.createIcons(); 
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    document.getElementById('theme-icon').setAttribute('data-lucide', next === 'dark' ? 'sun' : 'moon');
    lucide.createIcons();
}

function setupTheme() { 
    const saved = localStorage.getItem('theme') || 'light'; 
    document.documentElement.setAttribute('data-theme', saved); 
    document.getElementById('theme-icon').setAttribute('data-lucide', saved === 'dark' ? 'sun' : 'moon'); 
}