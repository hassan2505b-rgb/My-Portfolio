/* ===== Mobile nav ===== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ===== Navbar style on scroll ===== */
const navbar = document.getElementById("navbar");
const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 30);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ===== Typing effect ===== */
const words = [
  "Web Developer",
  "Front-End Developer",
  "Laravel Developer",
  "React Developer",
  "Programmer",
];
const typedEl = document.getElementById("typedText");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = words[wordIndex];
  typedEl.textContent = deleting
    ? word.slice(0, --charIndex)
    : word.slice(0, ++charIndex);

  let delay = deleting ? 55 : 110;

  if (!deleting && charIndex === word.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 350;
  }

  setTimeout(type, delay);
}
type();

/* ===== Scroll reveal + skill bars ===== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal, .skill").forEach((el) => observer.observe(el));

/* ===== Active nav link on scroll ===== */
const sections = document.querySelectorAll("section[id]");
const navAnchors = navLinks.querySelectorAll("a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navAnchors.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + id)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((s) => sectionObserver.observe(s));

/* ===== Contact form (demo) ===== */
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  note.hidden = false;
  form.reset();
  setTimeout(() => (note.hidden = true), 5000);
});

/* ===== Footer year ===== */
document.getElementById("year").textContent = new Date().getFullYear();
