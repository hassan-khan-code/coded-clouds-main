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
// ==========================================
// COUNTER ANIMATION FOR ACHIEVEMENTS
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  
  // Function to animate counters
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const step = Math.max(1, Math.floor(target / 60)); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          return;
        }
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      };
      
      updateCounter();
    });
  }

  // Intersection Observer for scroll-triggered animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const achievementSection = document.querySelector('.achievements-merged');
  if (achievementSection) {
    observer.observe(achievementSection);
  }
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
// ==========================================
// INDUSTRIES TOGGLE - DARK
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleIndustriesDark');
  const grid = document.getElementById('industriesGridDark');
  const btnText = document.getElementById('btnTextDark');
  const btnIcon = document.getElementById('btnIconDark');

  if (toggleBtn && grid) {
    toggleBtn.addEventListener('click', function() {
      grid.classList.toggle('show-all');
      
      if (grid.classList.contains('show-all')) {
        btnText.textContent = 'SHOW LESS';
        btnIcon.style.transform = 'rotate(180deg)';
        btnIcon.style.transition = 'transform 0.3s ease';
      } else {
        btnText.textContent = 'EXPLORE ALL INDUSTRIES';
        btnIcon.style.transform = 'rotate(0deg)';
        btnIcon.style.transition = 'transform 0.3s ease';
        
        // Smooth scroll to section
        document.querySelector('.industries-section-dark').scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    });
  }
});

//show more services in footer button
function toggleServices(btn) {
  // Button ke parent column me se hi '.more-services' ko dhoondega
  const parentCol = btn.closest('.col-xl-2, .col-lg-2, .col-md-3, .col-6');
  const moreServices = parentCol.querySelector('.more-services');

  if (moreServices.style.display === "none" || moreServices.style.display === "") {
    moreServices.style.display = "block";
    btn.innerHTML = 'View Less <i class="fa-solid fa-chevron-up ms-1"></i>';
  } else {
    moreServices.style.display = "none";
    btn.innerHTML = 'View More <i class="fa-solid fa-chevron-down ms-1"></i>';
  }
}