(function () {
  let timer = null;

  function startTyped() {
    const el = document.getElementById("typed-role");
    if (!el) return;

    // Prevent multiple runs if user navigates back to Home
    if (el.dataset.typedRunning === "true") return;
    el.dataset.typedRunning = "true";

    const phrases = [
      "Policy Research",
      "Computational Social Science",
      "Applied Research"
    ];

    let p = 0, i = 0;
    let deleting = false;

    function tick() {
      // If user navigated away and element is gone, stop cleanly
      const node = document.getElementById("typed-role");
      if (!node) {
        if (timer) clearTimeout(timer);
        timer = null;
        return;
      }

      const current = phrases[p];
      const text = deleting ? current.slice(0, i--) : current.slice(0, i++);

      node.textContent = text;

      let delay = deleting ? 40 : 70;

      if (!deleting && i === current.length + 1) {
        delay = 900;
        deleting = true;
        i = current.length;
      } else if (deleting && i < 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
        i = 0;
        delay = 250;
      }

      timer = setTimeout(tick, delay);
    }

    tick();
  }

  // Run on normal page load
  document.addEventListener("DOMContentLoaded", startTyped);

  // Run again on back/forward cache restores
  window.addEventListener("pageshow", startTyped);

  // Optional: if Quarto does internal navigation, this catches it too
  document.addEventListener("quarto:after-navigate", () => {
    // Reset flag so it can start again on Home
    const el = document.getElementById("typed-role");
    if (el) el.dataset.typedRunning = "false";
    startTyped();
  });
})();
