const lang = document.body.dataset.lang || "cat";
const basePath = "..";

const icon = (name, className = "") =>
  `<svg class="icon ${className}" aria-hidden="true"><use href="${basePath}/assets/icons/sprite.svg#icon-${name}"></use></svg>`;

const logo = (copy) => `
  <div class="monogram" aria-label="${copy.eyebrow} ${copy.names}">
    <svg class="monogram-wreath" viewBox="0 0 320 320" aria-hidden="true">
      <g class="wreath-stem">
        <path d="M91 273C33 225 31 131 82 70 126 17 211 20 259 69c51 52 48 142 4 195"/>
        <path d="M90 271c18 13 42 22 67 23M263 263c-16 14-38 24-62 29"/>
      </g>
      <g class="wreath-leaves">
        <path d="M58 213c-18-3-28-13-31-29 17 0 29 9 31 29ZM48 174c-15-7-22-19-20-34 16 4 25 15 20 34ZM50 131c-11-11-13-24-7-37 14 8 19 20 7 37ZM67 91c-7-14-4-26 6-37 11 12 11 25-6 37ZM94 60c-2-15 5-26 17-33 7 14 3 26-17 33ZM129 42c4-14 14-22 28-24 1 15-8 24-28 24ZM254 211c18-4 28-14 30-30-17 1-29 11-30 30ZM264 171c15-8 21-20 18-35-16 5-24 17-18 35ZM260 128c10-11 12-25 5-38-14 9-18 21-5 38ZM242 88c6-14 2-27-8-37-10 13-9 26 8 37ZM214 58c1-15-6-26-19-32-6 14-1 26 19 32ZM178 41c-4-15-15-22-29-24 0 15 10 24 29 24Z"/>
        <circle cx="52" cy="233" r="4"/><circle cx="269" cy="231" r="4"/>
      </g>
    </svg>
    <div class="monogram-copy">
      <span>${copy.eyebrow}</span>
      <strong>${copy.names}</strong>
      <small>${copy.date}</small>
    </div>
  </div>`;

const button = (href, label, iconName = "arrow", extraClass = "") => `
  <a class="button ${extraClass}" href="${href}" ${href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
    <span>${label}</span>${icon(iconName)}
  </a>`;

const loadData = async () => {
  const [copyResponse, configResponse] = await Promise.all([
    fetch(`${basePath}/data/${lang}.json`, { cache: "no-store" }),
    fetch(`${basePath}/data/config.json`, { cache: "no-store" })
  ]);
  if (!copyResponse.ok || !configResponse.ok) throw new Error("Content unavailable");
  return [await copyResponse.json(), await configResponse.json()];
};

const renderTimeline = (items) =>
  items.map((item, index) => `
    <article class="timeline-item reveal" style="--delay:${index * 80}ms">
      <div class="timeline-icon">${icon(item.icon)}</div>
      <div class="timeline-copy">
        <time>${item.time}</time>
        <h3>${item.title}</h3>
        <p>${item.note}</p>
      </div>
    </article>`).join("");

const renderQuestionCards = (cards) =>
  cards.map((card, index) => `
    <article class="question-card reveal" style="--delay:${(index % 2) * 80}ms">
      <div class="question-icon">${icon(card.icon)}</div>
      <h3>${card.question}</h3>
      <p>${card.answer}</p>
    </article>`).join("");

const renderPage = (t, config) => {
  const otherLang = lang === "cat" ? "es" : "cat";
  const otherLabel = lang === "cat" ? "ES" : "CAT";

  document.getElementById("app").innerHTML = `
    <main id="top">
      <section class="hero">
        <a class="language-switch" href="../${otherLang}/" hreflang="${otherLang}">${otherLabel}</a>
        <div class="hero-art" aria-hidden="true">
          <span class="blob blob-one"></span>
          <span class="blob blob-two"></span>
          <svg class="hero-branch" viewBox="0 0 220 420">
            <path d="M36 408c32-76 64-148 91-226 15-43 28-91 33-166"/>
            <path d="M86 296c-49 0-70-22-76-62 45 2 70 24 76 62ZM112 230c-37-12-50-37-45-70 38 11 53 34 45 70ZM132 164c-26-20-31-45-18-72 29 18 35 42 18 72ZM148 104c-15-25-13-47 5-67 22 24 21 45-5 67ZM98 268c42-3 66-25 72-62-40 1-64 22-72 62ZM123 194c35-8 54-30 55-62-35 7-53 28-55 62Z"/>
          </svg>
        </div>
        <div class="hero-photo-wrap reveal">
          <img class="hero-photo" src="../assets/images/nuria-dani-hero.jpg" alt="${t.hero.names}" width="1200" height="1800">
        </div>
        <div class="hero-logo reveal">
          ${logo(t.hero)}
        </div>
        <div class="countdown-card reveal" data-countdown>
          <p>${t.hero.countdownTitle}</p>
          <div class="countdown-values">
            <div><strong data-unit="days">000</strong><span>${t.hero.days}</span></div>
            <div><strong data-unit="hours">00</strong><span>${t.hero.hours}</span></div>
            <div><strong data-unit="minutes">00</strong><span>${t.hero.minutes}</span></div>
            <div><strong data-unit="seconds">00</strong><span>${t.hero.seconds}</span></div>
          </div>
          <span class="countdown-date">${t.hero.date}</span>
          <strong class="countdown-today" hidden>${t.hero.today}</strong>
        </div>
        <a class="scroll-cue" href="#lloc"><span>${t.hero.scroll}</span><i></i></a>
      </section>

      <section class="section venue" id="lloc">
        <div class="section-heading reveal">
          <span class="kicker">${t.venue.kicker}</span>
          <h2>${t.venue.title}</h2>
        </div>
        <div class="venue-grid">
          <div class="venue-visuals reveal">
            <div class="venue-photo-frame">
              <img src="../assets/images/masia-la-tartana.jpg" alt="${t.venue.title}" width="960" height="640" loading="lazy">
              <span class="venue-sketch">${icon("utensils")}</span>
            </div>
            <iframe
              class="venue-map"
              src="${config.googleMapsEmbed}"
              title="${t.venue.title} - Google Maps"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div class="venue-info reveal">
            <p class="address">${t.venue.address}</p>
            ${button(config.googleMaps, t.venue.maps, "map")}
            <div class="venue-notes">
              <div class="taxi-note">
                <span class="note-icon">${icon("phone")}</span>
                <div>
                  <h3>${t.venue.taxiTitle}</h3>
                  <p>${t.venue.taxiText}</p>
                  <a href="${config.taxiPhone}">${t.venue.taxiButton}</a>
                </div>
              </div>
              <div class="cloakroom-note">
                <span class="note-icon">${icon("hanger")}</span>
                <strong>${t.venue.cloakroom}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="rsvp-band" id="confirmar">
        <div class="rsvp-decoration" aria-hidden="true"></div>
        <div class="rsvp-inner reveal">
          <span class="kicker">${t.rsvp.kicker}</span>
          <h2>${t.rsvp.title}</h2>
          <p>${t.rsvp.text}</p>
          ${button(config.rsvpForm, t.rsvp.button, "arrow", "button-light")}
        </div>
      </section>

      <section class="section schedule" id="horaris">
        <div class="section-heading reveal">
          ${t.schedule.kicker ? `<span class="kicker">${t.schedule.kicker}</span>` : ""}
          <h2>${t.schedule.title}</h2>
        </div>
        <div class="timeline">
          ${renderTimeline(t.schedule.items)}
        </div>
      </section>

      <section class="section questions" id="preguntes">
        <div class="section-heading reveal">
          ${t.questions.kicker ? `<span class="kicker">${t.questions.kicker}</span>` : ""}
          <h2>${t.questions.title}</h2>
          <p>${t.questions.intro}</p>
        </div>
        <div class="questions-grid">
          ${renderQuestionCards(t.questions.cards)}
        </div>
        <div class="questions-closing reveal">
          <p>${t.questions.closing}</p>
          <span class="contact-note">${t.questions.contact}</span>
        </div>
      </section>

      <section class="ceremony-band">
        <div class="ceremony-art reveal" aria-hidden="true">
          <span></span><span></span>
          ${icon("rings")}
        </div>
        <div class="ceremony-copy reveal">
          ${t.ceremony.kicker ? `<span class="kicker">${t.ceremony.kicker}</span>` : ""}
          <h2>${t.ceremony.title}</h2>
          <p>${t.ceremony.text}</p>
          ${button(config.ceremonyContact, t.ceremony.button, "arrow", "button-outline")}
        </div>
      </section>

      <section class="section photos">
        <div class="photos-grid">
          <div class="photos-illustration reveal" aria-hidden="true">
            <span class="photo-blob photo-blob-one"></span>
            <span class="photo-blob photo-blob-two"></span>
            <svg viewBox="0 0 300 300">
              <path d="M48 91h48l17-30h75l17 30h48v143H48V91Z"/>
              <circle cx="150" cy="162" r="52"/>
              <circle cx="150" cy="162" r="38"/>
              <path d="M215 113h16M76 91l13-19h24"/>
              <path class="camera-sprig" d="M51 233c21-43 50-75 88-99M78 196c-27-2-42-14-47-37 27 1 43 13 47 37ZM103 167c-17-14-20-31-10-50 20 12 24 29 10 50Z"/>
            </svg>
          </div>
          <div class="photos-copy reveal">
            ${t.photos.kicker ? `<span class="kicker">${t.photos.kicker}</span>` : ""}
            <h2>${t.photos.title}</h2>
            <p>${t.photos.text}</p>
            ${button(config.photoAlbum, t.photos.button, "camera")}
          </div>
        </div>
      </section>
    </main>

    <footer>
      <svg class="footer-branch" viewBox="0 0 300 110" aria-hidden="true">
        <path d="M8 90c66-17 123-42 180-76M80 65c-12-21-8-38 10-51 17 22 13 39-10 51ZM126 45c-6-22 2-38 23-47 10 24 2 40-23 47ZM166 26c11 20 29 28 53 23-8-22-26-30-53-23ZM42 80c-11-16-28-21-49-14 11 19 28 23 49 14Z"/>
      </svg>
      <p>${t.footer.text}</p>
      <strong>${t.footer.names}</strong>
      <span>${t.footer.date}</span>
    </footer>

    `;

  setupCountdown(config.eventDate);
  setupInteractions();
};

const setupCountdown = (dateString) => {
  const target = new Date(dateString).getTime();
  const wrap = document.querySelector("[data-countdown]");
  if (!wrap) return;

  const update = () => {
    const difference = target - Date.now();
    if (difference <= 0) {
      wrap.querySelector(".countdown-values").hidden = true;
      wrap.querySelector(".countdown-today").hidden = false;
      return;
    }
    const values = {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
    Object.entries(values).forEach(([unit, value]) => {
      const digits = unit === "days" ? 3 : 2;
      wrap.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(digits, "0");
    });
  };
  update();
  window.setInterval(update, 1000);
};

const setupInteractions = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

};

loadData()
  .then(([copy, config]) => renderPage(copy, config))
  .catch(() => {
    document.getElementById("app").innerHTML = `
      <div class="load-error">
        <h1>Núria & Dani</h1>
        <p>${lang === "cat" ? "No hem pogut carregar el contingut." : "No hemos podido cargar el contenido."}</p>
      </div>`;
  });
