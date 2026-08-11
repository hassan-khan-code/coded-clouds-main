// ==========================================
// THEME TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  const themeToggleDesktop = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcons(savedTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcons(next);
  }

  function updateIcons(theme) {
    const cls = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    if (themeToggleDesktop) themeToggleDesktop.querySelector('i').className = cls;
    if (themeToggleMobile) themeToggleMobile.querySelector('i').className = cls;
  }

  if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
});

// ==========================================
// ACHIEVEMENT COUNTER
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  const section = document.getElementById('achievements');
  const counters = document.querySelectorAll('.counter');
  if (!section || counters.length === 0) return;

  const speed = 900;
  const intervals = {};

  function runCounter(counter, i) {
    if (intervals[i]) clearInterval(intervals[i]);
    const target = +counter.getAttribute('data-target');
    counter.innerText = '0';
    const inc = Math.max(1, Math.ceil(target / (speed / 20)));
    intervals[i] = setInterval(function () {
      const val = +counter.innerText;
      if (val < target) {
        counter.innerText = Math.min(val + inc, target);
      } else {
        counter.innerText = target;
        clearInterval(intervals[i]);
      }
    }, 20);
  }

  function resetCounter(counter, i) {
    if (intervals[i]) clearInterval(intervals[i]);
    counter.innerText = '0';
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        counters.forEach(function (c, idx) { runCounter(c, idx); });
      } else {
        counters.forEach(function (c, idx) { resetCounter(c, idx); });
      }
    });
  }, { threshold: 0.25 });

  observer.observe(section);
});

// ==========================================
// INSIGHTS FEATURE CARDS
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  var cards = document.querySelectorAll('.feature-card');
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      cards.forEach(function (c) { c.classList.remove('active'); });
      card.classList.add('active');
    });
  });
});

// ==========================================
// FAQ ACCORDION
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Cloud Rating (clean, no particles)
  var clouds = document.querySelectorAll('.rating-cloud');
  clouds.forEach(function (cloud) {
    cloud.addEventListener('click', function () {
      clouds.forEach(function (c) { c.classList.remove('selected'); });
      cloud.classList.add('selected');
    });
  });
});

// ==========================================
// SERVICES TOGGLE
// ==========================================
function toggleServices() {
  var grid = document.querySelector('.services-grid');
  var btn = document.getElementById('loadMoreBtn');
  if (!grid || !btn) return;

  var btnText = btn.querySelector('span');
  grid.classList.toggle('show-all');
  btn.classList.toggle('active');

  if (grid.classList.contains('show-all')) {
    btnText.textContent = 'Show Less';
  } else {
    btnText.textContent = 'Load More Services';
    document.querySelector('.services-section').scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================
// INDUSTRIES TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.getElementById('toggleIndustriesBtn');
  if (!toggleBtn) return;

  var btnText = document.getElementById('btnText');
  var btnIcon = document.getElementById('btnIcon');
  var extraCards = document.querySelectorAll('.extra-card');
  var isExpanded = false;

  toggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    isExpanded = !isExpanded;

    if (isExpanded) {
      extraCards.forEach(function (card, i) {
        card.classList.remove('hidden-card');
        setTimeout(function () { card.style.opacity = '1'; }, i * 50);
      });
      btnText.textContent = 'SHOW LESS';
      btnIcon.className = 'fa-solid fa-arrow-up-long';
    } else {
      extraCards.forEach(function (card) {
        card.style.opacity = '0';
        card.classList.add('hidden-card');
      });
      btnText.textContent = 'EXPLORE ALL INDUSTRIES';
      btnIcon.className = 'fa-solid fa-arrow-right-long';
      document.querySelector('.industries-section').scrollIntoView({ behavior: 'smooth' });
    }
  });
});