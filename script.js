document.addEventListener("DOMContentLoaded", function () {
  // Typing Animation
  const textElement = document.querySelector(".typing-text");
  const words = ["Emcee", "Comedian", "Auctioneer", "Speaker"];
  let wordIndex = 0, letterIndex = 0, isDeleting = false;

  function type() {
      const currentWord = words[wordIndex];
      textElement.textContent = isDeleting 
          ? currentWord.substring(0, letterIndex - 1)
          : currentWord.substring(0, letterIndex + 1);

      textElement.classList.add("typing-style");

      if (!isDeleting && letterIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(type, 1500);
      } else if (isDeleting && letterIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 500);
      } else {
          setTimeout(type, isDeleting ? 100 : 200);
      }
      letterIndex += isDeleting ? -1 : 1;
  }

  type();

  // Formspree Form Submission
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const formData = new FormData(contactForm);

      try {
          const response = await fetch(contactForm.action, {
              method: "POST",
              body: formData,
              headers: { Accept: "application/json" }
          });

          formMessage.style.color = response.ok ? "green" : "red";
          formMessage.textContent = response.ok 
              ? "Message sent successfully!" 
              : "Failed to send message. Please try again.";

          if (response.ok) contactForm.reset();
      } catch (error) {
          console.error("Failed to send message.", error);
          formMessage.style.color = "red";
          formMessage.textContent = "Failed to send message. Please try again.";
      }
  });

  // Hamburger Menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".navlist");
  let lastScrollY = window.scrollY;

  menuToggle.addEventListener("click", () => {
      navList.classList.toggle("active");
      menuToggle.innerHTML = navList.classList.contains("active") 
          ? '<i class="fa-solid fa-xmark"></i>' 
          : '<i class="fa-solid fa-bars"></i>';
  });

  // Close menu when clicking a menu item
  document.querySelectorAll(".navlist li a").forEach(item => {
      item.addEventListener("click", () => {
          navList.classList.remove("active");
          menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
  });

  // Hide menu on scroll
  window.addEventListener("scroll", () => {
      if (window.scrollY > lastScrollY) {
          navList.classList.remove("active");
          menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
      lastScrollY = window.scrollY;
  });

  // Ensure menu is hidden on larger screens
  window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
          navList.classList.remove("active");
          menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img[loading='lazy']");

  lazyImages.forEach(img => {
      img.addEventListener("load", () => {
          img.classList.add("loaded");
      });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let interval;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === index);
          dots[i].classList.toggle("active", i === index);
      });
  }

  function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
  }

  function startAutoSlide() {
      interval = setInterval(nextSlide, 4000);
  }

  dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
          clearInterval(interval);
          currentIndex = i;
          showSlide(currentIndex);
          startAutoSlide();
      });
  });

  showSlide(currentIndex);
  startAutoSlide();
});
