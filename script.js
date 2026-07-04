(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Sticky nav shadow/blur ---------------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------------- Hero flight path draw-in ---------------- */
  const flightpath = document.getElementById("flightpath");
  if (flightpath) {
    if (prefersReduced) {
      flightpath.classList.add("is-drawn");
    } else {
      const fpIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              flightpath.classList.add("is-drawn");
              fpIO.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      fpIO.observe(flightpath);
    }
  }

  /* ---------------- Waitlist form (front-end only) ---------------- */
  const form = document.getElementById("waitlistForm");
  const note = document.getElementById("wlNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("wlName").value.trim();
      const email = document.getElementById("wlEmail").value.trim();
      const role = document.getElementById("wlRole").value;

      if (!name || !email || !role) {
        note.textContent = "Please fill in every field so we know how to reach you.";
        note.classList.remove("is-success");
        return;
      }

      // NOTE: This form has no backend wired up yet.
      // Connect it to a real endpoint (Formspree, Google Sheets via Apps Script,
      // your own API, etc.) before relying on it to capture real signups.
      note.textContent = `Thanks, ${name.split(" ")[0]} — you're on the list. We'll email ${email} when PathPilot opens up.`;
      note.classList.add("is-success");
      form.reset();
    });
  }

  /* ---------------- Subtle hero parallax (desktop, motion-safe only) ---------------- */
  if (!prefersReduced && window.matchMedia("(min-width: 981px)").matches) {
    const visual = document.querySelector(".hero__visual");
    const hero = document.querySelector(".hero");
    if (visual && hero) {
      hero.addEventListener("mousemove", (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 10;
        const y = (e.clientY / innerHeight - 0.5) * 10;
        visual.style.transform = `translate(${x}px, ${y}px)`;
      });
      hero.addEventListener("mouseleave", () => {
        visual.style.transform = "translate(0, 0)";
      });
    }
  }
})();
