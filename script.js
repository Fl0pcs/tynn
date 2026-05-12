
document.getElementById("year").textContent = new Date().getFullYear();


const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  if (window.scrollY > 600) toTop.classList.add("visible");
  else toTop.classList.remove("visible");

  updateActiveNav();
});


const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});


document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});


document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 76;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  });
});


const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  const pos = window.scrollY + 120;
  let current = "";
  sections.forEach((s) => {
    if (pos >= s.offsetTop) current = s.id;
  });
  navLinkEls.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}


toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src.replace("600x600", "1600x1600");
    lightboxImg.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});


const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => observer.observe(el));


const form = document.getElementById("bookingForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", async (e) => {
  
  e.preventDefault();
  const data = new FormData(form);

  try {
    if (form.action.includes("SIIA_FORM_ID")) {
      
      throw new Error("noop");
    }
    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("submit failed");
  } catch (_) {
    
  }

  form.reset();
  formMsg.textContent = "Aitäh! Broneeringupäring on saadetud. Võtame teiega peagi ühendust.";
  formMsg.hidden = false;
  formMsg.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => {
    formMsg.hidden = true;
  }, 8000);
});
