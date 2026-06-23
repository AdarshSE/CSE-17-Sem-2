const courses = [
  {
    title: "Generative AI Training Program - Live",
    artTitle: "Generative AI",
    level: "Beginner to Advanced",
    interested: "86k+ interested Geeks",
    rating: "4.7",
    symbol: "AI",
    gradient: "linear-gradient(120deg, #05366d, #0b566b 50%, #102427)"
  },
  {
    title: "DevOps Course with IBM Certification",
    artTitle: "DEVOPS Engineering",
    level: "Beginner to Advanced",
    interested: "179k+ interested Geeks",
    rating: "4.7",
    symbol: "DO",
    gradient: "linear-gradient(120deg, #102d30, #ac4f12 58%, #1c3a35)"
  },
  {
    title: "Java Backend Development Course with IBM...",
    artTitle: "Java Backend",
    level: "Intermediate and Advanced",
    interested: "426k+ interested Geeks",
    rating: "4.6",
    symbol: "Java",
    gradient: "linear-gradient(120deg, #051fd5, #181466 72%, #172a30)"
  }
];

const shortcuts = ["Jobs for you", "Hire with us", "Advertise with Us", "Placement Train..."];

const topics = [
  ["Data Structure and Algorit...", "linear-gradient(135deg, #4473c5, #82a7ee)"],
  ["Web Development", "linear-gradient(135deg, #bf5c5f, #eca2a4)"],
  ["AI ML & Data Science", "linear-gradient(135deg, #458c67, #94d195)"],
  ["Programming Languages", "linear-gradient(135deg, #5e70bb, #a28dd9)"]
];

const footerColumns = {
  Company: ["About Us", "Legal", "Privacy Policy", "Careers", "Contact Us", "Corporate Solution", "Campus Training Program"],
  Explore: ["POTD", "Practice Problems", "Blogs", "Upskill Courses", "Connect"],
  Tutorials: ["Programming Languages", "DSA", "Web Technology", "AI, ML & Data Science", "DevOps", "CS Core Subjects", "GATE", "School Subjects", "Software and Tools"],
  Courses: ["ML and Data Science", "DSA and Placements", "Web Development", "Data Science", "Programming Languages", "DevOps & Cloud", "GATE", "MongoDB", "Certifications"],
  "Preparation Corner": ["Interview Corner", "Aptitude", "Puzzles", "GfG 160", "System Design"]
};

const peopleImages = [
  "https://i.pravatar.cc/240?img=12",
  "https://i.pravatar.cc/240?img=47",
  "https://i.pravatar.cc/240?img=68",
  "https://i.pravatar.cc/240?img=32",
  "https://i.pravatar.cc/240?img=56"
];

const courseGrid = document.querySelector("#courseGrid");
const shortcutRow = document.querySelector("#shortcutRow");
const topicStrip = document.querySelector("#topicStrip");
const footerLinks = document.querySelector("#footerLinks");
const search = document.querySelector("#courseSearch");
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const sideMenu = document.querySelector("#sideMenu");
const menuBackdrop = document.querySelector(".menu-backdrop");
const closeMenu = document.querySelector(".close-menu");
const insightWord = document.querySelector("#insightWord");

function renderCourses(list) {
  courseGrid.innerHTML = "";

  if (!list.length) {
    courseGrid.innerHTML = `<div class="empty-state">No course matched your search.</div>`;
    return;
  }

  list.forEach(course => {
    const card = document.createElement("article");
    card.className = "course-card";

    card.innerHTML = `
      <div class="course-art" style="--art:${course.gradient}">
        <span class="rating">&starf; ${course.rating}</span>
        <h3>${course.artTitle}</h3>
        <span class="live">LIVE COURSE</span>
        <span class="course-symbol">${course.symbol}</span>
      </div>
      <div class="course-body">
        <h3>${course.title}</h3>
        <p class="level">Level: ${course.level}</p>
        <div class="course-foot">
          <span class="interest">Trend: ${course.interested}</span>
          <a href="#">Explore now</a>
        </div>
      </div>
    `;

    courseGrid.appendChild(card);
  });
}

function renderShortcuts() {
  shortcuts.forEach(text => {
    const card = document.createElement("button");
    card.className = "shortcut-card";
    card.innerHTML = `<span>${text}</span><span>&rarr;</span>`;
    shortcutRow.appendChild(card);
  });
}

function renderTopics() {
  topics.forEach(([title, gradient]) => {
    const topic = document.createElement("article");
    topic.className = "topic-card";
    topic.style.setProperty("--topic", gradient);
    topic.innerHTML = `<div><h3>${title}</h3><button>View more &rarr;</button></div>`;
    topicStrip.appendChild(topic);
  });
}

function renderFooter() {
  Object.entries(footerColumns).forEach(([heading, links]) => {
    const column = document.createElement("section");
    column.className = "footer-col";
    column.innerHTML = `<h3>${heading}</h3>${links.map(link => `<a href="#">${link}</a>`).join("")}`;
    footerLinks.appendChild(column);
  });
}

function addPeopleImages() {
  const shuffled = [...peopleImages].sort(() => Math.random() - 0.5);

  document.querySelectorAll("[data-person]").forEach((avatar, index) => {
    avatar.style.backgroundImage = `url("${shuffled[index % shuffled.length]}")`;
  });
}

function filterCourses(value) {
  const query = value.trim().toLowerCase();

  const filtered = courses.filter(course =>
    [course.title, course.artTitle, course.level].some(field =>
      field.toLowerCase().includes(query)
    )
  );

  renderCourses(query ? filtered : courses);
}

function rotateInsightText() {
  const words = ["Interview Preparation?", "Industry Insights?", "Career Guidance?"];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % words.length;
    insightWord.textContent = words[index];
  }, 2200);
}

function initTheme() {
  const stored = localStorage.getItem("gfg-theme");

  if (stored === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "L";
  }

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    themeToggle.textContent = isLight ? "L" : "D";
    localStorage.setItem("gfg-theme", isLight ? "light" : "dark");
  });
}

function bindEvents() {
  const setMenu = isOpen => {
    sideMenu.classList.toggle("open", isOpen);
    menuToggle.classList.toggle("active", isOpen);
    menuBackdrop.hidden = !isOpen;

    sideMenu.setAttribute("aria-hidden", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    document.body.classList.toggle("menu-open", isOpen);
  };

  menuToggle.addEventListener("click", () => {
    setMenu(!sideMenu.classList.contains("open"));
  });

  closeMenu.addEventListener("click", () => setMenu(false));
  menuBackdrop.addEventListener("click", () => setMenu(false));

  sideMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });

  search.addEventListener("input", event => {
    filterCourses(event.target.value);
  });

  document.querySelector("#searchForm").addEventListener("submit", event => {
    event.preventDefault();
  });

  document.querySelectorAll(".quick-tags button").forEach(button => {
    button.addEventListener("click", () => {
      search.value = button.dataset.query;
      filterCourses(search.value);
      search.focus();
    });
  });

  document.querySelector("#viewAllCourses").addEventListener("click", () => {
    search.value = "";
    renderCourses(courses);
    document.querySelector(".courses-section").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

renderCourses(courses);
renderShortcuts();
renderTopics();
renderFooter();
addPeopleImages();
initTheme();
bindEvents();
rotateInsightText();