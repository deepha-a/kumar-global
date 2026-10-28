// navbar
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});


const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});


navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

// footer
document.querySelectorAll('.footer-links a, .footer-legal a').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});


const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// contact form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

const scriptURL = "https://script.google.com/macros/s/AKfycbxLjaoefupihBPQBGdo6RIacYW2nS1RHoyMrFavbiR22F-dvNI1A5jokLYH42RDB2F9og/exec";

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot spam check
    const gotcha = contactForm.querySelector('input[name="_gotcha"]');
    if (gotcha && gotcha.value) {
      return;
    }

    const originalBtnText = submitBtn ? submitBtn.innerHTML : "Submit Inquiry \u2192";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }
    formStatus.textContent = "";

    const formData = {
      fullName: document.getElementById("fullName").value,
      companyName: document.getElementById("companyName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      requirement: document.getElementById("requirement").value,
      message: document.getElementById("message").value
    };

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.result === "success") {
        formStatus.textContent = "Inquiry submitted successfully!";
        formStatus.style.color = "green";
        contactForm.reset();
      } else {
        formStatus.textContent = "Submission failed. Please try again.";
        formStatus.style.color = "red";
      }

    } catch (error) {
      formStatus.textContent = "Network error. Please try again or email us directly.";
      formStatus.style.color = "red";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}