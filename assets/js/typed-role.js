document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typed-role");
  if (!el) return;

  const phrases = [
    "Policy Research",
    "Computational Social Science",
    "Applied Research"
  ];

  let p = 0, i = 0;
  let deleting = false;

  function tick() {
    const current = phrases[p];
    const text = deleting ? current.slice(0, i--) : current.slice(0, i++);

    el.textContent = text;

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

    setTimeout(tick, delay);
  }

  tick();
});
