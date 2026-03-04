# T-Level Digital Revision Hub

A complete static revision website for the **T-Level Technical Qualification in Digital: Digital Production, Design and Development** Occupational Specialism Project (OSP).

## 🎯 Purpose

This revision hub helps students achieve a **Distinction** grade by:
- Providing code examples with syntax highlighting (HTML, CSS, JS, PHP, SQL)
- Explaining cyber security best practices aligned to the mark scheme
- Demonstrating WCAG 2.1 accessibility requirements
- Showing Pass vs Merit vs Distinction answer comparisons
- Including mock OSP practice tasks
- Providing interactive revision checklists with saved progress

## 📁 File Structure

```
/
├── index.html                      ← Dashboard / Home
├── pages/
│   ├── code-examples.html          ← HTML, CSS, JS, PHP, SQL examples
│   ├── security.html               ← Cyber security best practices
│   ├── accessibility.html          ← WCAG 2.1 & ARIA
│   ├── documentation.html          ← Design docs, test plans, ERD, user stories
│   ├── distinction-examples.html   ← P/M/D answer comparisons (mark scheme based)
│   ├── mock-tasks.html             ← Practice OSP tasks
│   └── checklists.html             ← Interactive revision checklists
├── assets/
│   ├── css/style.css               ← All styles (dark/light mode, responsive)
│   ├── js/script.js                ← All interactivity
│   └── docs/sample-design-doc.md  ← Example design document template
└── README.md
```

## 🚀 Hosting on GitHub Pages

1. Create a new GitHub repository
2. Upload all files maintaining the folder structure
3. Go to **Settings → Pages**
4. Set Source to: `main` branch, `/ (root)` folder
5. Your site will be live at `https://yourusername.github.io/repo-name/`

## ✨ Features

- **Dark/Light mode** toggle (saved to localStorage)
- **Sidebar navigation** with search filter
- **Responsive design** (mobile hamburger menu)
- **Syntax-highlighted code blocks** with copy buttons
- **Band tabs** (Pass/Merit/Distinction comparisons)
- **Accordion FAQs** for quick reference
- **Interactive checklists** with persistent progress (localStorage)
- **Exam countdown** timer
- **Scroll-reveal animations**

## 🏆 Mark Scheme Alignment

Content is directly based on the **T-Level Digital Production, Design and Development Sample Assessment Material Mark Scheme (April 2020)**. Distinction examples reflect Band 3 language: *comprehensive, thorough, perceptive, convincing, fully, consistently.*

## 📚 Topics Covered

| Topic | Page |
|-------|------|
| HTML, CSS, JavaScript, PHP, SQL | code-examples.html |
| CIA Triad, OWASP, GDPR, Computer Misuse Act | security.html |
| WCAG 2.1 POUR, ARIA, Equality Act | accessibility.html |
| Design docs, ERD, Test plans, User stories, Risk assessment | documentation.html |
| Pass/Merit/Distinction answer comparisons for all criteria | distinction-examples.html |
| Full mock tasks for Tasks 1A, 1B, 2, 3 | mock-tasks.html |
| Interactive progress tracking | checklists.html |

## 🛠️ Technical Standards

- Pure HTML5, CSS3, JavaScript (ES6+) — no frameworks required
- Zero external dependencies (Google Fonts loaded from CDN)
- Semantic HTML with ARIA landmarks
- WCAG 2.1 AA compliant
- Mobile-first responsive design
- Well-commented code throughout
