// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== FADE IN ON SCROLL =====
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply animation to key elements
const animatableSelectors = [
  '.pillar-card',
  '.learn-list li',
  '.trainer-inner',
  '.partner-card',
  '.register-inner > *',
  '.section-label',
  '.section-title',
  '.section-desc',
  '.register-title',
  '.trainer-heading',
];

animatableSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
  });
});

// ===== FORM SUBMISSION =====
const form = document.getElementById('register-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic validation
  const requiredFields = form.querySelectorAll('[required]');
  let valid = true;

  requiredFields.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = 'rgba(239, 68, 68, 0.6)';
      field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
      valid = false;
    }
  });

  // Email validation
  const emailField = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailField.value && !emailRegex.test(emailField.value)) {
    emailField.style.borderColor = 'rgba(239, 68, 68, 0.6)';
    emailField.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    valid = false;
  }

  if (!valid) return;

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Show success state
      form.style.display = 'none';
      formSuccess.style.display = 'block';
      formSuccess.style.animation = 'fadeInDown 0.5s ease both';
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    submitBtn.textContent = 'Reserve My Spot →';
    submitBtn.disabled = false;
    submitBtn.style.background = 'rgba(239,68,68,0.8)';
    submitBtn.textContent = 'Something went wrong — please try again';
    setTimeout(() => {
      submitBtn.style.background = '';
      submitBtn.textContent = 'Reserve My Spot →';
    }, 3500);
  }
});

// Clear error state on input
form.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('input', () => {
    field.style.borderColor = '';
    field.style.boxShadow = '';
  });
});

// ===== SMOOTH ACTIVE NAV (optional subtle effect) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
