document.addEventListener("DOMContentLoaded", () => {
  const speed = 900; // Animation speed in ms

  const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
      const count = +counter.innerText;
      const inc = Math.ceil(target / (speed / 10));

      if (count < target) {
        counter.innerText = Math.min(count + inc, target);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  };

  const observerOptions = { threshold: 0.3 };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counterElements = entry.target.querySelectorAll('.counter');
        counterElements.forEach(counter => startCounting(counter));
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const achievementsSection = document.getElementById('achievements');
  if (achievementsSection) {
    observer.observe(achievementsSection);
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