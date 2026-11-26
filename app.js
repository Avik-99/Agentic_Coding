// Avik — Personal Portfolio interactions (vanilla JS, no build step)
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- live local clock ---------- */
  const clocks = $$("[data-clock]");
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const d = new Date();
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    clocks.forEach((el) => (el.textContent = time));
  };
  if (clocks.length) {
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- footer year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- availability switch ---------- */
  const sw = $("[data-switch]");
  const led = $("[data-led]");
  const statusLabel = $("[data-status-label]");
  if (sw) {
    sw.addEventListener("click", () => {
      const on = sw.getAttribute("aria-checked") !== "true";
      sw.setAttribute("aria-checked", String(on));
      led?.classList.toggle("is-on", on);
      if (statusLabel) statusLabel.textContent = on ? "Open to work" : "Heads down";
    });
  }

  /* ---------- copy email ---------- */
  const copyBtn = $("[data-copy-email]");
  if (copyBtn) {
    const label = $("[data-copy-label]", copyBtn);
    const original = label.textContent;
    let timer;
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        label.textContent = "Copied ✓";
      } catch {
        label.textContent = email; // clipboard blocked (e.g. file://) — show it instead
      }
      copyBtn.classList.add("key--orange");
      clearTimeout(timer);
      timer = setTimeout(() => {
        label.textContent = original;
        copyBtn.classList.remove("key--orange");
      }, 1800);
    });
  }

  /* ---------- active nav link while scrolling ---------- */
  const navLinks = $$(".nav-link");
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const setActive = (id) =>
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- reveal plates on scroll ---------- */
  const reveals = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
          countUp(e.target);
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- count-up stats ---------- */
  function countUp(root) {
    $$("[data-count]", root).forEach((el) => {
      const target = Number(el.dataset.count);
      const start = performance.now();
      const dur = 900;
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* ---------- key press feedback for keyboard users ---------- */
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList?.contains("key")) {
      e.target.classList.add("is-pressed");
    }
  });
  document.addEventListener("keyup", (e) => {
    e.target.classList?.remove("is-pressed");
  });
})();
