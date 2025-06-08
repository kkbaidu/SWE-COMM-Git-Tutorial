// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize particles
  createParticles();

  // Initialize scroll animations
  initScrollAnimations();

  // Welcome message
  console.log("🚀 Welcome to COMPSSA Software Engineering Community!");
  console.log("💻 Built with HTML, CSS, and JavaScript");
  console.log("🎓 University of Ghana - Computer Science Student Association");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll progress indicator
window.addEventListener("scroll", () => {
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  document.getElementById("scrollIndicator").style.width = scrolled + "%";
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});

// Create floating particles
function createParticles() {
  const particles = document.getElementById("particles");
  if (!particles) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.width = Math.random() * 10 + 5 + "px";
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particles.appendChild(particle);
  }
}

// Form submission handler
function handleSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const studentId = formData.get("student-id");
  const message = formData.get("message");

  // Validate form data
  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate form submission
  const submitBtn = event.target.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert(
      `Thank you ${name}! Your message has been received. We'll get back to you soon at ${email}.`
    );
    event.target.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  const mobileMenu = document.querySelector(".mobile-menu");

  navLinks.classList.toggle("active");

  // Animate hamburger menu
  const spans = mobileMenu.querySelectorAll("span");
  spans.forEach((span, index) => {
    if (navLinks.classList.contains("active")) {
      if (index === 0)
        span.style.transform = "rotate(45deg) translate(5px, 5px)";
      if (index === 1) span.style.opacity = "0";
      if (index === 2)
        span.style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      span.style.transform = "none";
      span.style.opacity = "1";
    }
  });
}

// Close mobile menu when clicking on links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");

      // Reset hamburger menu
      const spans = mobileMenu.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    }
  });
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".about-card, .event-card, .team-member")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
}

// Enhanced hover effects
document.addEventListener("DOMContentLoaded", function () {
  // Add interactive hover effects to cards
  document.querySelectorAll(".about-card, .team-member").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add ripple effect to buttons
  document.querySelectorAll(".cta-button, .submit-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for performance
function lazyLoad() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoad);

// Smooth reveal animations for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const navLinks = document.querySelector(".nav-links");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");

      // Reset hamburger menu
      const spans = mobileMenu.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    }
  }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Scroll progress indicator
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    document.getElementById("scrollIndicator").style.width = scrolled + "%";

    // Header background
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  }, 16)
);

// Preloader functionality
function showPreloader() {
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <h3>Loading COMPSSA...</h3>
        </div>
    `;

  // Add preloader styles
  const preloaderStyles = `
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .preloader-content {
            text-align: center;
            color: white;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-top: 5px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = preloaderStyles;
  document.head.appendChild(styleSheet);
  document.body.appendChild(preloader);

  // Hide preloader after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        preloader.remove();
        styleSheet.remove();
      }, 500);
    }, 1000);
  });
}

// Initialize preloader
showPreloader();

// Enhanced form validation
function validateForm(formData) {
  const errors = [];

  // Name validation
  const name = formData.get("name").trim();
  if (name.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  // Email validation
  const email = formData.get("email").trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Please enter a valid email address");
  }

  // Student ID validation (optional but if provided, should be valid)
  const studentId = formData.get("student-id").trim();
  if (studentId && studentId.length < 5) {
    errors.push("Student ID should be at least 5 characters");
  }

  // Message validation
  const message = formData.get("message").trim();
  if (message.length < 10) {
    errors.push("Message must be at least 10 characters long");
  }

  return errors;
}

// Enhanced form submission with better validation
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const errors = validateForm(formData);

  // Display errors if any
  if (errors.length > 0) {
    alert("Please fix the following errors:\n" + errors.join("\n"));
    return;
  }

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const studentId = formData.get("student-id").trim();
  const message = formData.get("message").trim();

  // Simulate form submission with progress
  const submitBtn = event.target.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  // Animated submission process
  let progress = 0;
  submitBtn.disabled = true;

  const progressInterval = setInterval(() => {
    progress += 10;
    submitBtn.textContent = `Sending... ${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        // Success message with more details
        const successMessage = `
Thank you ${name}! 

Your message has been received successfully.
${studentId ? `Student ID: ${studentId}` : ""}
We'll get back to you soon at ${email}.

Welcome to the COMPSSA community!
                `.trim();

        alert(successMessage);
        event.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Add success animation
        submitBtn.style.background = "linear-gradient(45deg, #10b981, #059669)";
        submitBtn.textContent = "Message Sent! ✓";

        setTimeout(() => {
          submitBtn.style.background =
            "linear-gradient(45deg, #667eea, #764ba2)";
          submitBtn.textContent = originalText;
        }, 3000);
      }, 500);
    }
  }, 100);
}

// Scroll to top functionality
function addScrollToTop() {
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = "↑";
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.title = "Scroll to top";

  // Add styles for scroll to top button
  const scrollToTopStyles = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = scrollToTopStyles;
  document.head.appendChild(styleSheet);
  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener(
    "scroll",
    throttle(() => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    }, 100)
  );

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize scroll to top
document.addEventListener("DOMContentLoaded", addScrollToTop);

// Enhanced typing effect for hero section
function typewriterEffect() {
  const heroTitle = document.querySelector(".hero h1");
  const heroText = document.querySelector(".hero p");

  if (!heroTitle || !heroText) return;

  const titleText = heroTitle.textContent;
  const paragraphText = heroText.textContent;

  heroTitle.textContent = "";
  heroText.textContent = "";

  let titleIndex = 0;
  let paragraphIndex = 0;

  // Type title first
  const typeTitle = setInterval(() => {
    heroTitle.textContent += titleText.charAt(titleIndex);
    titleIndex++;

    if (titleIndex >= titleText.length) {
      clearInterval(typeTitle);

      // Then type paragraph
      setTimeout(() => {
        const typeParagraph = setInterval(() => {
          heroText.textContent += paragraphText.charAt(paragraphIndex);
          paragraphIndex++;

          if (paragraphIndex >= paragraphText.length) {
            clearInterval(typeParagraph);
          }
        }, 30);
      }, 500);
    }
  }, 100);
}

// Add parallax effect to hero section
function addParallaxEffect() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translateY(${parallax}px)`;
    }, 16)
  );
}

// Initialize advanced features
document.addEventListener("DOMContentLoaded", () => {
  // Add small delay for better UX
  setTimeout(() => {
    // typewriterEffect(); // Uncomment if you want the typing effect
    addParallaxEffect();
  }, 1500);
});

// Dark mode toggle (bonus feature)
function addDarkModeToggle() {
  const darkModeToggle = document.createElement("button");
  darkModeToggle.innerHTML = "🌙";
  darkModeToggle.className = "dark-mode-toggle";
  darkModeToggle.title = "Toggle dark mode";

  // Add to navigation
  const nav = document.querySelector("nav");
  nav.appendChild(darkModeToggle);

  // Dark mode styles
  const darkModeStyles = `
        .dark-mode-toggle {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .dark-mode-toggle:hover {
            background: rgba(0,0,0,0.1);
        }
        
        body.dark-mode {
            background: #1a202c;
            color: #e2e8f0;
        }
        
        body.dark-mode .about-card,
        body.dark-mode .team-member {
            background: #2d3748;
            color: #e2e8f0;
        }
        
        body.dark-mode .contact {
            background: #2d3748;
        }
        
        body.dark-mode .form-group input,
        body.dark-mode .form-group textarea {
            background: #4a5568;
            color: #e2e8f0;
            border-color: #4a5568;
        }
        
        body.dark-mode header {
            background: rgba(26, 32, 44, 0.95);
        }
        
        body.dark-mode .nav-links a {
            color: #e2e8f0;
        }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = darkModeStyles;
  document.head.appendChild(styleSheet);

  // Toggle functionality
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.innerHTML = isDark ? "☀️" : "🌙";

    // Store preference
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  });

  // Check for saved preference
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = "☀️";
  }
}

// Initialize dark mode toggle
document.addEventListener("DOMContentLoaded", addDarkModeToggle);

// Add error handling for all functions
window.addEventListener("error", (e) => {
  console.error("COMPSSA Website Error:", e.error);
});

// Export functions for potential external use
window.COMPSSA = {
  handleSubmit,
  toggleMobileMenu,
  createParticles,
  version: "1.0.0",
};
