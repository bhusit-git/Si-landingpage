const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.dataset.visible = "true";
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
  document.documentElement.classList.add("reveal-ready");
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-track]");
  if (!target) return;

  const eventName = target.dataset.track;
  if (!eventName) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    contact_channel: target.dataset.channel || "unknown",
  });
});
