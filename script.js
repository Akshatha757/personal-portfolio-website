// Loading screen
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 850);
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeIcon.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");

  themeIcon.textContent = isLight ? "🌙" : "☀️";
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
});

// Mobile navigation
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuButton.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuButton.classList.remove("open");
  });
});

// Typing animation
const typewriter = document.getElementById("typewriter");

const typewriterWords = [
  "Cyber Security Student",
  "Developer",
  "Tech Enthusiast",
  "Blockchain Explorer",
  "Problem Solver"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = typewriterWords[wordIndex];

  if (!deleting) {
    typewriter.textContent = currentWord.slice(0, characterIndex + 1);
    characterIndex++;

    if (characterIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }

    setTimeout(typeEffect, 95);
  } else {
    typewriter.textContent = currentWord.slice(0, characterIndex - 1);
    characterIndex--;

    if (characterIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typewriterWords.length;
      setTimeout(typeEffect, 450);
      return;
    }

    setTimeout(typeEffect, 45);
  }
}

setTimeout(typeEffect, 1400);

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -45px 0px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Scroll progress, navbar effect, active links, back-to-top button
const progressBar = document.getElementById("scrollProgress");
const navbar = document.querySelector(".navbar");
const backToTop = document.getElementById("backToTop");
const allSections = document.querySelectorAll("main section[id]");

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;

  navbar.classList.toggle("scrolled", scrollTop > 25);
  backToTop.classList.toggle("show", scrollTop > 500);

  let currentSection = "home";

  allSections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;

    if (scrollTop >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", updateScrollEffects);
updateScrollEffects();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Animated background particles
const particlesContainer = document.getElementById("particles");
const particleColors = ["#9d4edd", "#ff4ecd", "#31b5ff", "#00f5d4", "#50fa7b"];

function createParticles() {
  const totalParticles = window.innerWidth < 700 ? 28 : 55;

  for (let i = 0; i < totalParticles; i++) {
    const particle = document.createElement("span");
    const size = Math.random() * 4 + 2;
    const color =
      particleColors[Math.floor(Math.random() * particleColors.length)];

    particle.classList.add("particle");
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
    particle.style.animationDuration = `${Math.random() * 11 + 10}s`;
    particle.style.animationDelay = `${Math.random() * -15}s`;

    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Project modal
const projectModal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalEmoji = document.getElementById("modalEmoji");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");

const projects = {
  cyber: {
    emoji: "🔐",
    category: "SECURITY",
    title: "Cyber Security Projects",
    description:
      "I am interested in cybersecurity projects that help identify vulnerabilities, strengthen secure coding practices, improve network awareness, and protect digital systems. This portfolio area will grow with practical security projects and documented learning.",
    tags: [
      "Cybersecurity Fundamentals",
      "Secure Coding",
      "Network Security",
      "Vulnerability Analysis",
      "Security Concepts",
      "Incident Response"
    ]
  },

  blockchain: {
    emoji: "⛓️",
    category: "BLOCKCHAIN & WEB3",
    title: "Blockchain Projects",
    description:
      "I explore Blockchain and Web3 by writing Solidity smart contracts and learning how decentralized applications work on Ethereum. My projects focus on practical smart-contract development, token concepts, and Web3 integration.",
    tags: [
      "Solidity",
      "Ethereum",
      "Smart Contracts",
      "Web3",
      "dApps",
      "Remix IDE",
      "MetaMask"
    ]
  },

  web: {
    emoji: "🌐",
    category: "WEB DEVELOPMENT",
    title: "Web Development Projects",
    description:
      "I build responsive and interactive websites using HTML, CSS, and JavaScript. I focus on clean layouts, engaging user interfaces, responsive design, animation, and improving frontend development skills through practical projects.",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design",
      "UI / UX",
      "Git",
      "GitHub"
    ]
  }
};

function openProjectModal(projectName) {
  const project = projects[projectName];

  modalEmoji.textContent = project.emoji;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  modalTags.innerHTML = "";

  project.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    modalTags.appendChild(tagElement);
  });

  projectModal.classList.add("active");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  projectModal.classList.remove("active");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    openProjectModal(card.dataset.project);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      openProjectModal(card.dataset.project);
    }
  });
});

modalClose.addEventListener("click", closeProjectModal);
modalOverlay.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("active")) {
    closeProjectModal();
  }
});

// Slight 3D movement for project cards on desktop
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 800) return;

    const rectangle = card.getBoundingClientRect();
    const x = event.clientX - rectangle.left;
    const y = event.clientY - rectangle.top;

    const rotateX = ((y / rectangle.height) - 0.5) * -7;
    const rotateY = ((x / rectangle.width) - 0.5) * 7;

    card.style.transform =
      `translateY(-10px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});