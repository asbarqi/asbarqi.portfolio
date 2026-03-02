(function () {
  let timer = null;

  function stop() {
    if (timer) clearTimeout(timer);
    timer = null;
  }

  function start() {
    const el = document.getElementById("typed-role");
    if (!el) return;

    // Always reset text when (re)entering Home
    el.textContent = "";

    const phrases = ["Policy Research", "Computational Social Science", "Applied Research"];
    let p = 0, i = 0, deleting = false;

    function tick() {
      const node = document.getElementById("typed-role");
      if (!node) {
        stop();
        return; // user navigated away
      }

      const current = phrases[p];
      node.textContent = deleting ? current.slice(0, i--) : current.slice(0, i++);

      let delay = deleting ? 45 : 70;

      if (!deleting && i === current.length + 1) {
        deleting = true;
        i = current.length;
        delay = 900;
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

  function restartIfHome() {
    // Always stop old timers first
    stop();
    // Restart only if we're on a page that has the typed element
    start();
  }

  // Normal load
  document.addEventListener("DOMContentLoaded", restartIfHome);

  // Back/forward cache restores
  window.addEventListener("pageshow", restartIfHome);

  // Quarto navigation event (works when Quarto does internal page swaps)
  document.addEventListener("quarto:after-navigate", restartIfHome);

  // Extra safety: if Quarto uses turbo-like events in your version
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) restartIfHome();
  });
})();
