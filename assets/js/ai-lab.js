/* AI Lab: concept explorer + 3 educational demos (no real AI models, no APIs) */
(function () {
  "use strict";
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  // ---------- Concept explorer ----------
  const CONCEPTS = {
    "Generative AI": {
      text: "Generative AI creates new content — text, images, code or audio — by learning patterns from large amounts of data.",
      points: ["Large Language Models (LLMs) predict the next word", "Prompts guide what the model generates", "Used in chatbots, writing tools and image generators"],
      example: 'Prompt: "Write a haiku about Python"  →  The model generates a new poem.',
    },
    "Machine Learning": {
      text: "Machine Learning lets computers learn from examples instead of following only hand-written rules.",
      points: ["Supervised learning uses labelled data", "Unsupervised learning finds hidden groups", "Common tools: scikit-learn, pandas, NumPy"],
      example: "Give the model 1,000 house prices with sizes  →  it predicts the price of a new house.",
    },
    "Deep Learning": {
      text: "Deep Learning uses neural networks with many layers to learn complex patterns such as faces, speech and language.",
      points: ["Neurons are connected in layers", "Trained with backpropagation", "Common tools: PyTorch, TensorFlow"],
      example: "A CNN looks at thousands of cat photos  →  learns to recognise a cat in a new image.",
    },
    "Agentic AI": {
      text: "AI agents use a model to plan steps, call tools and act towards a goal with little human input.",
      points: ["Plan → act → observe → repeat", "Agents can use tools like search or code", "Needs guardrails and human review"],
      example: 'Goal: "Summarise today\'s news"  →  agent searches, reads, then writes a summary.',
    },
    "Python Experiments": {
      text: "Python is the main language for AI. Small experiments are the fastest way to learn.",
      points: ["Data cleaning with pandas", "Charts with matplotlib", "Simple models with scikit-learn"],
      example: "import pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.describe())",
    },
    "AI Project Roadmap": {
      text: "A step-by-step plan for building real AI projects.",
      points: ["1. Python + SQL fundamentals", "2. Data analysis and ML basics", "3. Deep learning projects", "4. GenAI apps with LLM APIs", "5. Build and deploy AI agents"],
      example: "Next milestone: build and publish one end-to-end ML project on GitHub.",
    },
  };
  const tabs = document.getElementById("explorer-tabs");
  const panel = document.getElementById("explorer-panel");
  if (tabs && panel) {
    Object.keys(CONCEPTS).forEach(function (name, i) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = name;
      b.addEventListener("click", function () { show(name, b); });
      tabs.appendChild(b);
      if (i === 0) show(name, b);
    });
  }
  function show(name, btn) {
    tabs.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
    btn.classList.add("active");
    const c = CONCEPTS[name];
    panel.innerHTML = "<h3>" + esc(name) + "</h3><p>" + esc(c.text) + "</p><ul>" +
      c.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") +
      '</ul><div class="example" style="white-space:pre-wrap">' + esc(c.example) + "</div>";
  }

  // ---------- Demo 1: rule-based chatbot ----------
  const RULES = [
    { k: ["hello", "hi", "hey", "vanakkam"], r: "Hello! I'm a simple rule-based bot. Ask me about Sudalai, skills, projects or AI." },
    { k: ["who", "sudalai", "about"], r: "Sudalai Rajan is a B.Tech AI & Data Science student (2024–2028) at PGP College of Engineering and Technology, Namakkal." },
    { k: ["skill", "language", "know"], r: "Skills: Python, SQL, HTML, CSS, JavaScript, and learning Generative AI, ML, Deep Learning and Agentic AI." },
    { k: ["project", "github", "repo"], r: "Check the Projects page, or visit github.com/sudalairajan100-max." },
    { k: ["contact", "email", "linkedin", "reach"], r: "Use the Contact page — it has LinkedIn, GitHub, Instagram and a message form." },
    { k: ["genai", "generative", "llm"], r: "Generative AI creates new content by learning patterns from data. LLMs are a popular example." },
    { k: ["agent", "agentic"], r: "AI agents plan steps and use tools to reach a goal. They're one of Sudalai's main interests." },
    { k: ["ml", "machine learning"], r: "Machine Learning lets computers learn from examples instead of fixed rules." },
    { k: ["are you ai", "real ai", "how do you work"], r: "I'm not a real AI. I match keywords in your message to pre-written answers." },
    { k: ["thank", "bye"], r: "You're welcome! Have a great day." },
  ];
  const chatBox = document.getElementById("chat-box");
  const chatForm = document.getElementById("chat-form");
  function addMsg(text, who) {
    const d = document.createElement("div");
    d.className = "msg " + who;
    d.textContent = text;
    chatBox.appendChild(d);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  if (chatForm) {
    addMsg("Hi! Try asking: \"What are Sudalai's skills?\"", "bot");
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = chatForm.querySelector("input");
      const text = input.value.trim();
      if (!text) return;
      addMsg(text, "user");
      input.value = "";
      const low = text.toLowerCase();
      const rule = RULES.find(function (r) { return r.k.some(function (k) { return low.indexOf(k) !== -1; }); });
      setTimeout(function () {
        addMsg(rule ? rule.r : "I don't have a rule for that yet. Try asking about skills, projects, GenAI or contact.", "bot");
      }, 350);
    });
  }

  // ---------- Demo 2: text analysis ----------
  const STOP = "the a an and or but is are was were to of in on for with at by it this that as be from i you he she we they my your our".split(" ");
  const ta = document.getElementById("text-input");
  if (ta) {
    const out = { w: document.getElementById("t-words"), c: document.getElementById("t-chars"), s: document.getElementById("t-sent") };
    const top = document.getElementById("t-top");
    function analyse() {
      const t = ta.value;
      const words = (t.toLowerCase().match(/[a-z0-9']+/g) || []);
      out.w.textContent = words.length;
      out.c.textContent = t.length;
      out.s.textContent = (t.match(/[^.!?]+[.!?]+/g) || (t.trim() ? [t] : [])).length;
      const freq = {};
      words.forEach(function (w) { if (w.length > 2 && STOP.indexOf(w) === -1) freq[w] = (freq[w] || 0) + 1; });
      const list = Object.keys(freq).sort(function (a, b) { return freq[b] - freq[a]; }).slice(0, 6);
      top.innerHTML = list.length
        ? list.map(function (w) { return '<span class="badge">' + esc(w) + " × " + freq[w] + "</span>"; }).join("")
        : '<span class="muted">Type some text to see frequent words.</span>';
    }
    ta.addEventListener("input", analyse);
    analyse();
  }

  // ---------- Demo 3: idea generator ----------
  const IDEAS = {
    Education: { users: ["students", "teachers", "first-year coders"], tasks: ["generate quiz questions from notes", "explain Python errors in simple words", "track study habits and suggest breaks"] },
    Health: { users: ["patients", "fitness beginners", "elderly people"], tasks: ["remind medicines and log doses", "suggest balanced meals from ingredients", "classify workout form from short videos"] },
    Agriculture: { users: ["farmers", "home gardeners", "agri students"], tasks: ["detect leaf diseases from photos", "predict crop yield from weather data", "recommend crops based on soil data"] },
    Productivity: { users: ["developers", "small businesses", "content creators"], tasks: ["summarise long emails", "turn meeting notes into task lists", "auto-tag and organise files"] },
    Games: { users: ["casual gamers", "kids", "puzzle lovers"], tasks: ["generate new puzzle levels", "create an NPC that adapts difficulty", "write branching story dialogues"] },
  };
  const TECH = ["Python + scikit-learn", "Python + PyTorch", "an LLM API with prompt templates", "a simple AI agent with tools", "Streamlit + pandas"];
  const sel = document.getElementById("idea-cat");
  const ideaBtn = document.getElementById("idea-btn");
  const ideaOut = document.getElementById("idea-out");
  if (sel) {
    Object.keys(IDEAS).forEach(function (k) { const o = document.createElement("option"); o.value = k; o.textContent = k; sel.appendChild(o); });
    const pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
    ideaBtn.addEventListener("click", function () {
      const d = IDEAS[sel.value];
      const task = pick(d.tasks), user = pick(d.users), tech = pick(TECH);
      ideaOut.innerHTML = '<span class="badge tag">' + esc(sel.value) + "</span><h3 style=\"margin-top:10px\">An app that helps " + esc(user) + " " + esc(task) + ".</h3>" +
        '<p class="muted" style="margin-top:6px">Suggested stack: ' + esc(tech) + ". Start small, publish on GitHub, then improve.</p>";
    });
  }
})();
