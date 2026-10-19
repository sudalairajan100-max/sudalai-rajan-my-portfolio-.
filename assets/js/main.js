/* Shared layout: sidebar, mobile menu, theme toggle, footer, reveal animations */
(function () {
  "use strict";

  // ---- Edit your profile & links here ----
  window.PROFILE = {
    name: "Sudalai Rajan",
    role: "AI & Data Science Student",
    github: "https://github.com/sudalairajan100-max",
    linkedin: "https://www.linkedin.com/in/sudalai-rajan-s-467a87338",
    instagram: "https://www.instagram.com/godofnatural/",
  };

  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    github: '<path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  };
  window.icon = function (name, cls) {
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  };

  const PAGES = [
    { href: "index.html", label: "Home", icon: "home" },
    { href: "about.html", label: "About Me", icon: "user" },
    { href: "projects.html", label: "Projects", icon: "folder" },
    { href: "ai-lab.html", label: "AI Lab", icon: "cpu" },
    { href: "contact.html", label: "Contact", icon: "mail" },
  ];

  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const P = window.PROFILE;
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const socials =
    '<div class="socials">' +
    '<a href="' + P.github + '" ' + ext + ' aria-label="GitHub">' + icon("github") + "</a>" +
    '<a href="' + P.linkedin + '" ' + ext + ' aria-label="LinkedIn">' + icon("linkedin") + "</a>" +
    '<a href="' + P.instagram + '" ' + ext + ' aria-label="Instagram">' + icon("instagram") + "</a>" +
    "</div>";

  // Sidebar
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";
  sidebar.setAttribute("aria-label", "Main navigation");
  sidebar.innerHTML =
    '<a class="brand" href="index.html"><div class="brand-logo">SR</div><div><strong>' + P.name + "</strong><small>AI Engineer in progress</small></div></a>" +
    '<nav class="nav">' +
    PAGES.map(function (p) {
      const active = p.href === current || (current === "" && p.href === "index.html");
      return '<a href="' + p.href + '"' + (active ? ' class="active" aria-current="page"' : "") + ">" + icon(p.icon) + p.label + "</a>";
    }).join("") +
    "</nav>" +
    '<div class="sidebar-foot">' + socials + '<button class="theme-toggle" type="button" aria-label="Toggle theme"></button></div>';
  document.body.prepend(sidebar);

  // Mobile top bar + overlay
  const top = document.createElement("header");
  top.className = "topbar";
  top.innerHTML = '<a class="brand" href="index.html"><div class="brand-logo">SR</div><strong>' + P.name + '</strong></a><button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false">' + icon("menu") + "</button>";
  sidebar.after(top);
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  top.after(overlay);
  const menuBtn = top.querySelector(".menu-btn");
  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", function () { setNav(!document.body.classList.contains("nav-open")); });
  overlay.addEventListener("click", function () { setNav(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });

  // Theme
  const toggle = sidebar.querySelector(".theme-toggle");
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    toggle.innerHTML = t === "light" ? icon("moon") + " Dark mode" : icon("sun") + " Light mode";
  }
  let theme = "dark";
  try { theme = localStorage.getItem("sr-theme") || "dark"; } catch (e) {}
  applyTheme(theme);
  toggle.addEventListener("click", function () {
    theme = theme === "light" ? "dark" : "light";
    try { localStorage.setItem("sr-theme", theme); } catch (e) {}
    applyTheme(theme);
  });

  // Footer
  const main = document.querySelector(".main");
  if (main) {
    const f = document.createElement("footer");
    f.className = "footer";
    f.innerHTML =
      "<span>© " + new Date().getFullYear() + " " + P.name + ". Built with HTML, CSS & JavaScript.</span>" +
      "<nav>" + PAGES.map(function (p) { return '<a href="' + p.href + '">' + p.label + "</a>"; }).join("") + "</nav>" + socials;
    main.appendChild(f);
  }

  // Reveal on scroll
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("visible"); });
  }

  // Typing effect (Home)
  const typing = document.querySelector("[data-typing]");
  if (typing) {
    const words = typing.getAttribute("data-typing").split("|");
    let w = 0, c = 0, del = false;
    (function tick() {
      const word = words[w];
      typing.textContent = word.slice(0, c);
      if (!del && c < word.length) c++;
      else if (del && c > 0) c--;
      else if (!del) { del = true; return setTimeout(tick, 1400); }
      else { del = false; w = (w + 1) % words.length; }
      setTimeout(tick, del ? 45 : 85);
    })();
  }
})();
