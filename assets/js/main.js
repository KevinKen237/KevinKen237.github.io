(function () {
  "use strict";

  // Jeu du seuil : 100 demandeurs fictifs classés du plus sûr (0) au plus risqué (99)
  var DEFAULTERS = [18, 33, 47, 58, 64, 71, 76, 80, 83, 86, 88, 90, 92, 94, 95, 97, 98, 99];
  var GAIN = 1;
  var LOSS = 4;
  var isBad = new Array(100).fill(false);
  DEFAULTERS.forEach(function (i) { isBad[i] = true; });

  function scoreFor(n) {
    var s = 0;
    for (var i = 0; i < n; i++) s += isBad[i] ? -LOSS : GAIN;
    return s;
  }

  var best = 0;
  var bestN = 0;
  for (var n = 0; n <= 100; n++) {
    var s = scoreFor(n);
    if (s > best) { best = s; bestN = n; }
  }

  var grid = document.getElementById("people");
  var slider = document.getElementById("seuil");
  if (grid && slider) {
    var cells = [];
    for (var i = 0; i < 100; i++) {
      var c = document.createElement("span");
      c.className = "person";
      grid.appendChild(c);
      cells.push(c);
    }
    var out = document.getElementById("seuil-out");
    var kOk = document.getElementById("k-ok");
    var kBad = document.getElementById("k-bad");
    var kLost = document.getElementById("k-lost");
    var kScore = document.getElementById("k-score");
    var kMsg = document.getElementById("k-msg");
    document.getElementById("k-best").textContent = "+" + best;

    var update = function () {
      var n = parseInt(slider.value, 10);
      var ok = 0, bad = 0, lost = 0;
      for (var i = 0; i < 100; i++) {
        var accepted = i < n;
        var cls = "person ";
        if (accepted && !isBad[i]) { cls += "is-ok"; ok++; }
        else if (accepted) { cls += "is-bad"; bad++; }
        else if (!isBad[i]) { cls += "is-lost"; lost++; }
        else { cls += "is-off"; }
        cells[i].className = cls;
      }
      var score = ok * GAIN - bad * LOSS;
      out.textContent = n;
      slider.style.setProperty("--p", n + "%");
      slider.setAttribute("aria-valuetext", n + " dossiers acceptés, bilan " + score + " points");
      kOk.textContent = ok;
      kBad.textContent = bad;
      kLost.textContent = lost;
      kScore.textContent = (score > 0 ? "+" : "") + score;

      var msg;
      if (n === 0) msg = "Personne n'est accepté. Zéro impayé… et zéro client. Votre concurrent vous remercie.";
      else if (n === 100) msg = "Tout le monde est accepté, les impayés aussi. Le chiffre d'affaires ne compense plus les pertes.";
      else if (score === best) msg = "Bravo, c'est le meilleur réglage possible ! Vous venez de faire mon métier.";
      else if (best - score <= 2) msg = "Presque ! Encore un petit ajustement et vous y êtes.";
      else if (n < bestN) msg = "Prudent. Mais vous refusez " + lost + " clients qui auraient remboursé : autant de chiffre d'affaires qui part ailleurs.";
      else msg = "Généreux. Mais vos " + bad + " impayés coûtent plus que ce que rapportent les clients en plus.";
      kMsg.textContent = msg;
    };
    slider.addEventListener("input", update);
    update();
  }

  // Compteur de pompes, mémorisé dans le navigateur du visiteur quand c'est possible
  var btn = document.getElementById("pushup");
  var count = document.getElementById("pushup-count");
  if (btn && count) {
    var total = 0;
    try { total = parseInt(localStorage.getItem("pushups") || "0", 10) || 0; } catch (e) { total = 0; }
    count.textContent = total;
    btn.addEventListener("click", function () {
      total++;
      count.textContent = total;
      try { localStorage.setItem("pushups", String(total)); } catch (e) { /* stockage indisponible */ }
      btn.classList.remove("bump");
      void btn.offsetWidth;
      btn.classList.add("bump");
      if (total === 10) btn.firstChild.textContent = "Belle série, on continue ";
      if (total === 50) btn.firstChild.textContent = "Vous êtes embauché·e comme coach ";
    });
  }

  // Barre du haut : bordure au défilement
  var bar = document.querySelector(".topbar");
  var onScroll = function () { if (bar) bar.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Apparition douce des blocs
  var blocks = document.querySelectorAll(".game, .cards, .stories, .orange, .timeline, .hobbies");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    blocks.forEach(function (b) { b.classList.add("reveal"); io.observe(b); });
  }
})();
