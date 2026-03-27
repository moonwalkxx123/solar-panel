// ===== CONFIG & ELEMENT SDK =====
const defaultConfig = {
  hero_title: "Future-Ready Homes,",
  hero_subtitle:
    "Clean, affordable solar energy for every Filipino household — from Metro Manila condos to provincial homes.",
  about_title: "Why Solar House?",
  cta_button_text: "Book a Free Consultation",
  background_color: "#f5f5dc",
  surface_color: "#ffffff",
  text_color: "#333333",
  primary_action_color: "#2e7d32",
  secondary_action_color: "#4a90e2",
  font_family: "DM Sans",
  font_size: 16,
};

function applyConfig(config) {
  const c = { ...defaultConfig, ...config };
  document.getElementById("heroTitle").innerHTML =
    c.hero_title + "<br><span>Powered by the Sun.</span>";
  document.getElementById("heroSubtitle").textContent = c.hero_subtitle;
  document.getElementById("aboutTitle").textContent = c.about_title;
  document.getElementById("ctaBtn").innerHTML =
    '<i data-lucide="calendar" style="width:18px;height:18px;"></i> ' +
    c.cta_button_text;

  document.documentElement.style.setProperty("--bg", c.background_color);
  document.documentElement.style.setProperty("--white", c.surface_color);
  document.documentElement.style.setProperty("--secondary", c.surface_color);
  document.documentElement.style.setProperty("--text", c.text_color);
  document.documentElement.style.setProperty(
    "--primary",
    c.primary_action_color,
  );
  document.documentElement.style.setProperty(
    "--accent",
    c.secondary_action_color,
  );
  document.body.style.color = c.text_color;
  document.body.style.background = c.background_color;

  const ff = c.font_family + ", DM Sans, sans-serif";
  document.body.style.fontFamily = ff;
  const bs = c.font_size || 16;
  document.body.style.fontSize = bs + "px";
  document
    .querySelectorAll(".hero h1")
    .forEach((el) => (el.style.fontFamily = ff));
  document.querySelectorAll(".section-header h2").forEach((el) => {
    el.style.fontFamily = ff;
    el.style.fontSize = bs * 2.2 + "px";
  });
  document
    .querySelectorAll(".feature-card h3, .alt-text h3, .price-name")
    .forEach((el) => (el.style.fontSize = bs * 1.25 + "px"));
  document
    .querySelectorAll(".feature-card p, .alt-text p, .faq-a-inner")
    .forEach((el) => (el.style.fontSize = bs * 0.94 + "px"));

  lucide.createIcons();
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => applyConfig(config),
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (v) => {
            config.background_color = v;
            window.elementSdk.setConfig({ background_color: v });
          },
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (v) => {
            config.surface_color = v;
            window.elementSdk.setConfig({ surface_color: v });
          },
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (v) => {
            config.text_color = v;
            window.elementSdk.setConfig({ text_color: v });
          },
        },
        {
          get: () =>
            config.primary_action_color || defaultConfig.primary_action_color,
          set: (v) => {
            config.primary_action_color = v;
            window.elementSdk.setConfig({ primary_action_color: v });
          },
        },
        {
          get: () =>
            config.secondary_action_color ||
            defaultConfig.secondary_action_color,
          set: (v) => {
            config.secondary_action_color = v;
            window.elementSdk.setConfig({ secondary_action_color: v });
          },
        },
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => {
          config.font_family = v;
          window.elementSdk.setConfig({ font_family: v });
        },
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => {
          config.font_size = v;
          window.elementSdk.setConfig({ font_size: v });
        },
      },
    }),
    mapToEditPanelValues: (config) =>
      new Map([
        ["hero_title", config.hero_title || defaultConfig.hero_title],
        ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
        ["about_title", config.about_title || defaultConfig.about_title],
        [
          "cta_button_text",
          config.cta_button_text || defaultConfig.cta_button_text,
        ],
      ]),
  });
}

// ===== PAGE NAVIGATION =====
function showPage(name) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active-page"));
  document.getElementById("page-" + name).classList.add("active-page");
  document
    .querySelectorAll(".nav-links a[data-page]")
    .forEach((a) => a.classList.toggle("active", a.dataset.page === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(initScrollAnimations, 100);
}

// ===== MOBILE MENU =====
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;
hamburgerBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  hamburgerBtn.setAttribute("aria-expanded", menuOpen);
});
function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove("open");
  hamburgerBtn.setAttribute("aria-expanded", "false");
}

// ===== SCROLL EFFECTS =====
const nav = document.getElementById("navbar");
const backTopBtn = document.getElementById("backTopBtn");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
  backTopBtn.classList.toggle("visible", window.scrollY > 400);
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document
    .querySelectorAll(".fade-in, .fade-in-left, .fade-in-right")
    .forEach((el) => {
      if (!el.classList.contains("visible")) observer.observe(el);
    });
}
initScrollAnimations();

// ===== CAROUSEL =====
let carouselIdx = 0;
const track = document.getElementById("carouselTrack");
const totalSlides = track.children.length;
const dotsContainer = document.getElementById("carouselDots");
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("button");
  dot.className = "carousel-dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
  dot.onclick = () => {
    carouselIdx = i;
    updateCarousel();
  };
  dotsContainer.appendChild(dot);
}
function moveCarousel(dir) {
  carouselIdx = (carouselIdx + dir + totalSlides) % totalSlides;
  updateCarousel();
}
function updateCarousel() {
  track.style.transform = "translateX(-" + carouselIdx * 100 + "%)";
  dotsContainer
    .querySelectorAll(".carousel-dot")
    .forEach((d, i) => d.classList.toggle("active", i === carouselIdx));
}
setInterval(() => moveCarousel(1), 6000);

// ===== FAQ =====
function toggleFaq(btn) {
  const isOpen = btn.classList.contains("open");
  document.querySelectorAll(".faq-q").forEach((q) => {
    q.classList.remove("open");
    q.nextElementSibling.style.maxHeight = "0";
  });
  if (!isOpen) {
    btn.classList.add("open");
    btn.nextElementSibling.style.maxHeight =
      btn.nextElementSibling.scrollHeight + "px";
  }
}

// ===== FORM VALIDATION =====
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;
  const fields = [
    { id: "fg-fname", input: "fname", check: (v) => v.trim().length > 0 },
    { id: "fg-lname", input: "lname", check: (v) => v.trim().length > 0 },
    {
      id: "fg-email",
      input: "email",
      check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    },
    { id: "fg-phone", input: "phone", check: (v) => v.trim().length >= 7 },
    { id: "fg-location", input: "location", check: (v) => v.trim().length > 0 },
  ];
  fields.forEach((f) => {
    const el = document.getElementById(f.input);
    const group = document.getElementById(f.id);
    if (!f.check(el.value)) {
      group.classList.add("has-error");
      valid = false;
    } else {
      group.classList.remove("has-error");
    }
  });
  if (valid) {
    document.getElementById("bookingForm").style.display = "none";
    document.getElementById("formSuccess").classList.add("show");
    lucide.createIcons();
  }
});
function resetForm() {
  document.getElementById("bookingForm").reset();
  document
    .querySelectorAll(".form-group")
    .forEach((g) => g.classList.remove("has-error"));
  document.getElementById("bookingForm").style.display = "block";
  document.getElementById("formSuccess").classList.remove("show");
}

// Init icons
lucide.createIcons();

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'9e2bc6446088e8bd',t:'MTc3NDU4NzAyOS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
