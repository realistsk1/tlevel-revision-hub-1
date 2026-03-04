/**
 * T-Level Digital Revision Hub
 * Main JavaScript - script.js
 * Features: Dark mode, sidebar, accordion, tabs, copy code, search, countdown, progress
 */

/* ============================
   1. THEME TOGGLE (Dark / Light)
   ============================ */
const themeToggleBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeBtn(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeBtn(next);
  });
}

function updateThemeBtn(theme) {
  if (!themeToggleBtn) return;
  themeToggleBtn.innerHTML = theme === 'dark'
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
}

/* ============================
   2. SIDEBAR TOGGLE (Mobile)
   ============================ */
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });
}

if (overlay) {
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
}

/* ============================
   3. ACTIVE NAV ITEM
   ============================ */
document.querySelectorAll('.nav-item').forEach(item => {
  const href = item.getAttribute('href');
  if (href && window.location.pathname.endsWith(href.replace('../', '').replace('./', ''))) {
    item.classList.add('active');
  }
  // Special case for index
  if (href === '../index.html' || href === './index.html') {
    if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
      item.classList.add('active');
    }
  }
});

/* ============================
   4. ACCORDION
   ============================ */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.accordion-item.open').forEach(el => el.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

/* ============================
   5. BAND TABS (Pass/Merit/Distinction)
   ============================ */
document.querySelectorAll('.band-tabs').forEach(tabGroup => {
  tabGroup.querySelectorAll('.band-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabset = tab.closest('.band-tabset') || tab.closest('.card') || tab.parentElement.parentElement;
      const target = tab.dataset.band;

      // Deactivate all tabs in this group
      tabGroup.querySelectorAll('.band-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show correct content - look in nearest parent container
      const container = tabGroup.closest('.band-container') || tabGroup.parentElement;
      container.querySelectorAll('.band-content').forEach(c => {
        c.classList.remove('active');
        if (c.dataset.band === target) c.classList.add('active');
      });
    });
  });
  // Activate first tab by default
  const firstTab = tabGroup.querySelector('.band-tab');
  if (firstTab) firstTab.click();
});

/* ============================
   6. COPY CODE BUTTONS
   ============================ */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const codeBlock = btn.closest('.code-block');
    const code = codeBlock ? codeBlock.querySelector('pre').innerText : '';
    navigator.clipboard.writeText(code).then(() => {
      const original = btn.textContent;
      btn.textContent = '✓ Copied!';
      btn.style.color = '#a6e3a1';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.color = '';
      }, 2000);
    });
  });
});

/* ============================
   7. SIDEBAR SEARCH (Filter nav)
   ============================ */
const sidebarSearchInput = document.getElementById('sidebarSearch');
if (sidebarSearchInput) {
  sidebarSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.nav-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = (!query || text.includes(query)) ? 'flex' : 'none';
    });
    document.querySelectorAll('.nav-section-label').forEach(label => {
      label.style.display = query ? 'none' : '';
    });
  });
}

/* ============================
   8. PAGE CONTENT SEARCH
   ============================ */
const pageSearchInput = document.getElementById('pageSearch');
if (pageSearchInput) {
  pageSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    // Remove old highlights
    document.querySelectorAll('.search-highlight').forEach(el => {
      el.outerHTML = el.textContent;
    });
    if (!query) return;

    const walker = document.createTreeWalker(
      document.querySelector('.page-content'),
      NodeFilter.SHOW_TEXT
    );
    const nodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.textContent.toLowerCase().includes(query)) {
        nodes.push(walker.currentNode);
      }
    }
    nodes.forEach(node => {
      const regex = new RegExp(`(${query})`, 'gi');
      const span = document.createElement('span');
      span.innerHTML = node.textContent.replace(regex, '<span class="search-highlight">$1</span>');
      node.parentNode.replaceChild(span, node);
    });
  });
}

/* ============================
   9. EXAM COUNTDOWN
   ============================ */
function updateCountdown() {
  const countdownEl = document.getElementById('examCountdown');
  if (!countdownEl) return;
  // Set your exam date here - 2 weeks from typical use
  const examDate = new Date();
  examDate.setDate(examDate.getDate() + 14);
  examDate.setHours(9, 0, 0, 0);

  const now = new Date();
  const diff = examDate - now;

  if (diff <= 0) {
    countdownEl.textContent = '📋 Exam Day!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  countdownEl.textContent = `⏱ ${days}d ${hours}h to exam`;
}

updateCountdown();
setInterval(updateCountdown, 60000);

/* ============================
   10. CHECKLIST PERSISTENCE
   ============================ */
document.querySelectorAll('.check-input').forEach((checkbox, idx) => {
  const key = `check_${window.location.pathname}_${idx}`;
  // Restore saved state
  if (localStorage.getItem(key) === 'true') {
    checkbox.checked = true;
    checkbox.closest('li')?.classList.add('checked');
  }

  checkbox.addEventListener('change', () => {
    localStorage.setItem(key, checkbox.checked);
    checkbox.closest('li')?.classList.toggle('checked', checkbox.checked);
    updateProgress();
  });
});

function updateProgress() {
  const checkboxes = document.querySelectorAll('.check-input');
  const checked = document.querySelectorAll('.check-input:checked').length;
  const total = checkboxes.length;
  if (total === 0) return;

  const pct = Math.round((checked / total) * 100);
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  const pctEl = document.getElementById('progressPct');
  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

updateProgress();

/* ============================
   11. FADE-IN ANIMATION ON SCROLL
   ============================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .mock-task, .accordion-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

/* ============================
   12. QUIZ FUNCTIONALITY
   ============================ */
document.querySelectorAll('.quiz-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const question = opt.closest('.quiz-question');
    if (question.classList.contains('answered')) return;
    question.classList.add('answered');

    const isCorrect = opt.dataset.correct === 'true';
    opt.classList.add(isCorrect ? 'correct' : 'wrong');

    if (!isCorrect) {
      question.querySelectorAll('.quiz-option[data-correct="true"]').forEach(a => {
        a.classList.add('correct');
      });
    }

    const feedback = question.querySelector('.quiz-feedback');
    if (feedback) {
      feedback.style.display = 'block';
      feedback.classList.add(isCorrect ? 'tip' : 'warn');
    }
  });
});
