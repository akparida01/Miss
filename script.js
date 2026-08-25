(() => {
  "use strict";

  const names = [
    { name: "Devi", emoji: "✨", meaning: "✨ She is the Devi of a pure soul.", image: "devi.jpg" },
    { name: "Maharani", emoji: "👑", meaning: "👑 She looks like a queen.", image: "maharani.jpg" },
    { name: "Madam Ji", emoji: "💼", meaning: "😌 She gives orders like a Madam.", image: "madam-ji.jpg" },
    { name: "Putuli", emoji: "🪆", meaning: "😜 She is a little natani-baaj.", image: "putuli.jpg" },
    { name: "Ice Cream", emoji: "🍦", meaning: "😋 She is sweetest like ice cream.", image: "ice-cream.jpg" },
    { name: "Lady Don", emoji: "😈", meaning: "🔥 Her cute face comes with a warning! 😈⚠️", image: "lady-don.jpg" },
    { name: "Bilei", emoji: "🐱", meaning: "🥰 She is cute like a little cat.", image: "bilei.jpg" },
    { name: "Miss", emoji: "💭", meaning: "❤️ This name means I am always missing her.", image: "miss.jpg" }
  ];

  const birthday = new Date("2027-06-06T00:00:00+05:30");
  let currentIndex = 0;

  const counter = document.getElementById("name-counter");
  const emoji = document.getElementById("name-emoji");
  const name = document.getElementById("name");
  const photo = document.getElementById("name-photo");
  const caption = document.getElementById("photo-caption");
  const meaning = document.getElementById("meaning-text");
  const previous = document.getElementById("previous");
  const next = document.getElementById("next");
  const dots = document.getElementById("progress-dots");

  function renderName(index) {
    currentIndex = index;
    const item = names[currentIndex];

    counter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ${String(names.length).padStart(2, "0")}`;
    emoji.textContent = item.emoji;
    name.textContent = item.name;
    meaning.textContent = item.meaning;
    caption.textContent = `📸 Her photo · ${item.name}`;

    photo.classList.remove("is-changing");
    void photo.offsetWidth;
    photo.src = item.image;
    photo.alt = `Photo for ${item.name}`;
    photo.classList.add("is-changing");

    previous.disabled = currentIndex === 0;
    next.disabled = currentIndex === names.length - 1;

    [...dots.children].forEach((dot, dotIndex) => {
      if (dotIndex === currentIndex) {
        dot.setAttribute("aria-current", "step");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  names.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "progress-dot";
    dot.setAttribute("aria-label", `Show ${item.name}`);
    dot.addEventListener("click", () => renderName(index));
    dots.appendChild(dot);
  });

  previous.addEventListener("click", () => {
    if (currentIndex > 0) renderName(currentIndex - 1);
  });

  next.addEventListener("click", () => {
    if (currentIndex < names.length - 1) renderName(currentIndex + 1);
  });

  function calendarDifference(from, to) {
    if (to <= from) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

    let cursor = new Date(from.getTime());
    let months = 0;

    while (months < 2400) {
      const candidate = new Date(cursor.getTime());
      candidate.setMonth(candidate.getMonth() + 1);

      if (candidate <= to) {
        cursor = candidate;
        months += 1;
      } else {
        break;
      }
    }

    let remaining = to.getTime() - cursor.getTime();
    const days = Math.floor(remaining / 86400000);
    remaining -= days * 86400000;

    const hours = Math.floor(remaining / 3600000);
    remaining -= hours * 3600000;

    const minutes = Math.floor(remaining / 60000);
    remaining -= minutes * 60000;

    const seconds = Math.floor(remaining / 1000);

    return { months, days, hours, minutes, seconds };
  }

  function setText(id, value) {
    document.getElementById(id).textContent = String(value);
  }

  function updateCountdown() {
    const now = new Date();

    if (now >= birthday) {
      setText("months", 0);
      setText("days", 0);
      setText("hours", "00");
      setText("minutes", "00");
      setText("seconds", "00");
      document.getElementById("birthday-note").textContent =
        "Today is your special day. 🎂❤️";
      return;
    }

    const result = calendarDifference(now, birthday);
    setText("months", result.months);
    setText("days", result.days);
    setText("hours", String(result.hours).padStart(2, "0"));
    setText("minutes", String(result.minutes).padStart(2, "0"));
    setText("seconds", String(result.seconds).padStart(2, "0"));
  }

  renderName(0);
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
