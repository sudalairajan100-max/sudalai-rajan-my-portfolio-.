/* Projects data + search & filters.
   To add a project: copy one object below and edit its fields.
   Add a "demo" URL only after you have checked that the live demo works. */
window.PROJECTS = [
  {
    title: "Laptop Treasure Hunt",
    repo: "https://github.com/sudalairajan100-max/laptop-treasure-hunt",
    demo: "",
    category: "Web Development",
    tech: ["HTML", "CSS", "JavaScript"],
    description: "A treasure-hunt style project. Open the repository for full details — edit this description to match the project.",
    featured: true,
  },
  {
    title: "Vulnerability Lens Site",
    repo: "https://github.com/sudalairajan100-max/vulnlens-site",
    demo: "",
    category: "Web Development",
    tech: ["HTML", "CSS", "JavaScript"],
    description: "Website for the VulnLens project. Edit this description to summarise what the site shows.",
    featured: true,
  },
  {
    title: "Python Trainer",
    repo: "https://github.com/sudalairajan100-max/python-trainer",
    demo: "",
    category: "Python",
    tech: ["Python"],
    description: "A Python learning and practice project. Edit this description with the exact features.",
    featured: true,
  },
  {
    title: "Vulnlens",
    repo: "https://github.com/sudalairajan100-max/vulnlens",
    demo: "",
    category: "Other",
    tech: ["Security", "Tooling"],
    description: "The core VulnLens repository. Edit this description to explain what it does.",
  },
  {
    title: "Sudalai",
    repo: "https://github.com/sudalairajan100-max/sudalai",
    demo: "",
    category: "Other",
    tech: ["GitHub"],
    description: "Personal repository. Edit this description to explain its contents.",
  },
  {
    title: "Claude Zen",
    repo: "https://github.com/sudalairajan100-max/claude-zen",
    demo: "",
    category: "AI/ML",
    tech: ["AI", "Prompting"],
    description: "An AI-related experiment. Edit this description once you confirm the repository's purpose.",
  },
];

(function () {
  "use strict";
  const ext = 'target="_blank" rel="noopener noreferrer"';
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function card(p) {
    return (
      '<article class="card hover project-card">' +
      '<div class="top"><div class="card-icon">' + icon("folder") + '</div><span class="badge tag">' + esc(p.category) + "</span></div>" +
      "<h3>" + esc(p.title) + "</h3>" +
      "<p>" + esc(p.description) + "</p>" +
      '<div class="badges">' + p.tech.map(function (t) { return '<span class="badge">' + esc(t) + "</span>"; }).join("") + "</div>" +
      '<div class="actions"><a class="btn btn-sm" href="' + esc(p.repo) + '" ' + ext + ">" + icon("github") + " View Source</a>" +
      (p.demo ? '<a class="btn btn-sm btn-primary" href="' + esc(p.demo) + '" ' + ext + ">Live Demo</a>" : "") +
      "</div></article>"
    );
  }

  // Featured (home page)
  const featured = document.getElementById("featured-projects");
  if (featured) featured.innerHTML = window.PROJECTS.filter(function (p) { return p.featured; }).map(card).join("");

  // Full dashboard (projects page)
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  const search = document.getElementById("project-search");
  const chips = document.querySelectorAll("[data-filter]");
  const count = document.getElementById("project-count");
  let filter = "All";

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = window.PROJECTS.filter(function (p) {
      const okCat = filter === "All" || p.category === filter;
      const hay = (p.title + " " + p.description + " " + p.tech.join(" ") + " " + p.category).toLowerCase();
      return okCat && (!q || hay.indexOf(q) !== -1);
    });
    count.textContent = list.length + " of " + window.PROJECTS.length + " projects";
    grid.innerHTML = list.length
      ? list.map(card).join("")
      : '<div class="empty"><h3>No projects found</h3><p>Try a different search term or choose another category.</p></div>';
  }
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      c.classList.add("active"); c.setAttribute("aria-pressed", "true");
      filter = c.getAttribute("data-filter");
      render();
    });
  });
  search.addEventListener("input", render);
  render();
})();
