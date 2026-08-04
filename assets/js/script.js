document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("achievements");
  const counters = document.querySelectorAll(".counter");
  const speed = 900; // Animation duration in ms

  // Har counter ki dynamic intervals save rakhne ke liye object
  const intervals = {};

  const runCounter = (counter, index) => {
    // Purani chalne wali interval stop karein agar active ho
    if (intervals[index]) clearInterval(intervals[index]);

    const target = +counter.getAttribute("data-target");
    counter.innerText = "0";

    const inc = Math.max(1, Math.ceil(target / (speed / 20)));

    intervals[index] = setInterval(() => {
      const count = +counter.innerText;
      if (count < target) {
        counter.innerText = Math.min(count + inc, target);
      } else {
        counter.innerText = target;
        clearInterval(intervals[index]);
      }
    }, 20);
  };

  const resetCounter = (counter, index) => {
    if (intervals[index]) clearInterval(intervals[index]);
    counter.innerText = "0";
  };

  // IntersectionObserver setup
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Jab section viewport me AYEGA tab counting start hogi
          counters.forEach((counter, idx) => runCounter(counter, idx));
        } else {
          // Jab section viewport se BAHAR NIKLEGA tab zero par reset ho jayega
          counters.forEach((counter, idx) => resetCounter(counter, idx));
        }
      });
    },
    { threshold: 0.25 } // 25% section dikhte hi trigger hoga
  );

  if (section) {
    observer.observe(section);
  }
});



    //  INSIGHTS / EXPERTISE SECTION


document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feature-card');
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
});




//   COMMUNITY & HELP / FAQ & RATING

document.addEventListener('DOMContentLoaded', () => {

  /* FAQ Accordion Logic */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
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

  /* Cloud Rating System Logic */
  const clouds = document.querySelectorAll('.rating-cloud');

  clouds.forEach(cloud => {
    cloud.addEventListener('click', (e) => {
      clouds.forEach(c => c.classList.remove('selected'));
      cloud.classList.add('selected');

      // Trigger hearts particle if 5th cloud (Excellent) is selected
      if (cloud.getAttribute('data-value') === "5") {
        for (let i = 0; i < 10; i++) {
          createHeart(e.clientX, e.clientY);
        }
      }
    });
  });

  function createHeart(x, y) {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart blue-heart';
    
    const dirX = (Math.random() - 0.5) * 160;
    heart.style.setProperty('--dirX', `${dirX}px`);
    
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1300);
  }

});


/// services script

  function toggleServices() {
    const grid = document.querySelector('.services-grid');
    const btn = document.getElementById('loadMoreBtn');
    const btnText = btn.querySelector('span');

    grid.classList.toggle('show-all');
    btn.classList.toggle('active');

    if (grid.classList.contains('show-all')) {
      btnText.textContent = 'Show Less';
    } else {
      btnText.textContent = 'Load More Services';
      
      document.querySelector('.services-section').scrollIntoView({ behavior: 'smooth' });
    }
  }



  // industry script

  document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleIndustriesBtn');
  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');
  const extraCards = document.querySelectorAll('.extra-card');

  let isExpanded = false;

  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    isExpanded = !isExpanded;

    if (isExpanded) {
      extraCards.forEach((card, index) => {
        card.classList.remove('hidden-card');
        setTimeout(() => {
          card.style.opacity = '1';
        }, index * 50);
      });

      btnText.textContent = 'SHOW LESS';
      btnIcon.className = 'fa-solid fa-arrow-up-long';
    } else {
      extraCards.forEach((card) => {
        card.style.opacity = '0';
        card.classList.add('hidden-card');
      });

      btnText.textContent = 'EXPLORE ALL INDUSTRIES';
      btnIcon.className = 'fa-solid fa-arrow-right-long';

      document.querySelector('.industries-section').scrollIntoView({ behavior: 'smooth' });
    }
  });
});