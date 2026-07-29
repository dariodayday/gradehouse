// ── GradeHouse ──────────────────────────────────────────────
// All data + helpers defined first; init() runs at the bottom.

// Inline SVG icon set (Lucide-style, stroke-based)
const ICONS = {
  all: '<path d="M9.9 15.5a2 2 0 0 0-1.4-1.4L2.4 12.5a.5.5 0 0 1 0-1l6.1-1.6a2 2 0 0 0 1.4-1.4l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z"/>',
  hockey: '<path d="M4 3l8 13"/><path d="M20 3l-8 13"/><ellipse cx="12" cy="19" rx="4" ry="2"/>',
  basketball: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><path d="M5 5.1c3.4 3.4 3.4 10.4 0 13.8"/><path d="M19 5.1c-3.4 3.4-3.4 10.4 0 13.8"/>',
  baseball: '<circle cx="12" cy="12" r="10"/><path d="M5.2 5.2c3 3 3 10.6 0 13.6"/><path d="M18.8 5.2c-3 3-3 10.6 0 13.6"/>',
  football: '<ellipse cx="12" cy="12" rx="10" ry="6.2" transform="rotate(-45 12 12)"/><path d="M9.2 14.8l5.6-5.6"/><path d="M10.6 10.6l2.8 2.8"/>',
  golf: '<path d="M6 21V4"/><path d="M6 4l9 3-9 3"/><circle cx="17.5" cy="19.5" r="1.8"/>',
  soccer: '<circle cx="12" cy="12" r="10"/><path d="M12 8.2l3.6 2.6-1.4 4.2h-4.4l-1.4-4.2z"/><path d="M12 2v6.2"/><path d="M3.5 8.5l4.9 2.3"/><path d="M20.5 8.5l-4.9 2.3"/>',
  pokemon: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  anime: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  tcg: '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>',
  comics: '<path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2z"/><path d="M22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>',
  coins: '<circle cx="12" cy="12" r="10"/><path d="M16 8.5h-5.5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4H8"/><path d="M12 6v12"/>',
  toys: '<line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.3 5H6.7a4 4 0 0 0-4 3.6C2.6 9.4 2 14.5 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.4-1.4a2 2 0 0 1 1.4-.6h4.4a2 2 0 0 1 1.4.6L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.5-.6-6.6-.7-7.4A4 4 0 0 0 17.3 5z"/>',
  sneakers: '<path d="M2 17l1.2-6c2.8 1 5 .8 7-1.2l2.3 2.3c2 2 4.8 2.3 7.5 3.1a2 2 0 0 1 1.5 1.9V19H2z"/><path d="M13.5 11l1.6-1.6"/><path d="M2 19h20v1H2z"/>',
  watches: '<circle cx="12" cy="12" r="6"/><polyline points="12 10 12 12 13.5 13.5"/><path d="m16.1 7.7-.8-4.1a2 2 0 0 0-2-1.6h-2.7a2 2 0 0 0-2 1.6l-.8 4.1"/><path d="m7.9 16.4.8 4a2 2 0 0 0 2 1.6h2.7a2 2 0 0 0 2-1.6l.8-4"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7l8.7 5 8.7-5"/><path d="M12 22V12"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  heart: '<path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.1 3 5.5l7 7z"/>',
  share: '<path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>',
  star: '<path d="M11.5 3.6a.55.55 0 0 1 1 0l2.2 4.4a.55.55 0 0 0 .4.3l4.9.7a.55.55 0 0 1 .3 1l-3.5 3.4a.55.55 0 0 0-.2.5l.9 4.8a.55.55 0 0 1-.8.6l-4.4-2.3a.55.55 0 0 0-.5 0l-4.4 2.3a.55.55 0 0 1-.8-.6l.9-4.8a.55.55 0 0 0-.2-.5L3.7 10a.55.55 0 0 1 .3-1l4.9-.7a.55.55 0 0 0 .4-.3z"/>',
};

function icon(key, cls) {
  return `<svg class="${cls || "icn"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[key] || ICONS.all}</svg>`;
}

const CATEGORIES = [
  { key: "",           label: "All" },
  { key: "hockey",     label: "Hockey" },
  { key: "basketball", label: "Basketball" },
  { key: "baseball",   label: "Baseball" },
  { key: "football",   label: "Football" },
  { key: "golf",       label: "Golf" },
  { key: "soccer",     label: "Soccer" },
  { key: "pokemon",    label: "Pokémon" },
  { key: "anime",      label: "Anime" },
  { key: "tcg",        label: "TCG" },
  { key: "comics",     label: "Comics" },
  { key: "coins",      label: "Coins" },
  { key: "toys",       label: "Toys" },
  { key: "sneakers",   label: "Sneakers" },
  { key: "watches",    label: "Watches" },
];

const iconKey = (cat) => (ICONS[cat] ? cat : "all");

// Live shows — weekly schedule; a show is LIVE while inside its time window.
// sched: { dow: 0=Sun..6=Sat (omit + daily:true for every day), h, m, dur (minutes) }
const STREAMS = [
  { id: 1, title: "The Daily Grind — Open Break Night",         host: "TheGradeHouse", viewers: 412,  cat: "pokemon",  g: ["#2c1a4d", "#161028"], sched: { daily: true, h: 19, m: 0, dur: 240 } },
  { id: 2, title: "Friday Night Rips — Pokémon Box Break",      host: "CardCaveDan",   viewers: 1243, cat: "pokemon",  g: ["#41295a", "#2f0743"], sched: { dow: 5, h: 20, m: 0, dur: 90 } },
  { id: 3, title: "$1 Start Sports Card Auctions",              host: "SlabCityShan",  viewers: 2114, cat: "baseball", g: ["#8e0e00", "#1f1c18"], sched: { dow: 6, h: 14, m: 0, dur: 120 } },
  { id: 4, title: "NHL Hobby Box Break — Young Guns Hunt",      host: "BreaksByBrody", viewers: 862,  cat: "hockey",   g: ["#0f2027", "#2c5364"], sched: { dow: 4, h: 19, m: 30, dur: 90 } },
  { id: 5, title: "One Piece OP-09 Box Break",                  host: "GrandLineGems", viewers: 540,  cat: "anime",    g: ["#f12711", "#f5af19"], sched: { dow: 3, h: 21, m: 0, dur: 90 } },
  { id: 6, title: "Vintage Vault Show — Pre-War Grails",        host: "TheGradeHouse", viewers: 388,  cat: "baseball", g: ["#232526", "#414345"], sched: { dow: 0, h: 19, m: 0, dur: 60 } },
  { id: 7, title: "Sneaker Heat Check — Live Cops",             host: "SoleSearchSam", viewers: 927,  cat: "sneakers", g: ["#093028", "#237a57"], sched: { dow: 6, h: 20, m: 0, dur: 60 } },
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Next (or current) show window as {start, end}
function showWindow(s) {
  const now = new Date();
  for (let back = 0; back < 8; back++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - back, s.sched.h, s.sched.m);
    const ok = s.sched.daily || d.getDay() === s.sched.dow;
    if (!ok) continue;
    const end = new Date(d.getTime() + s.sched.dur * 60000);
    if (end > now) return { start: d, end };
    break;
  }
  for (let fwd = 1; fwd < 9; fwd++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + fwd, s.sched.h, s.sched.m);
    if (s.sched.daily || d.getDay() === s.sched.dow) {
      return { start: d, end: new Date(d.getTime() + s.sched.dur * 60000) };
    }
  }
  return null;
}

function isLive(s) {
  const w = showWindow(s);
  const now = new Date();
  return w && w.start <= now && now < w.end;
}

function countdownText(target) {
  let secs = Math.max(0, Math.floor((target - new Date()) / 1000));
  const d = Math.floor(secs / 86400); secs %= 86400;
  const h = Math.floor(secs / 3600); secs %= 3600;
  const m = Math.floor(secs / 60); const s = secs % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

function showTimeLabel(s) {
  const t = new Date(2000, 0, 1, s.sched.h, s.sched.m)
    .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${s.sched.daily ? "Daily" : DAY_NAMES[s.sched.dow] + "s"} · ${t}`;
}

let follows = new Set(JSON.parse(localStorage.getItem("gh_follows") || "[]"));
function toggleFollow(id) {
  follows.has(id) ? follows.delete(id) : follows.add(id);
  localStorage.setItem("gh_follows", JSON.stringify([...follows]));
  renderLive();
}

// Listings. img = real card image; face = designed placeholder.
// Graded (non-raw) items render inside a GradeHouse slab frame.
const LISTINGS = [
  { id: 1, title: "Alakazam Holo", set: "1999 Base Set #1", cat: "pokemon", grade: "8", type: "direct", price: 300, views: 340,
    img: "https://images.pokemontcg.io/base1/1_hires.png" },
  { id: 2, title: "Blastoise Holo", set: "1999 Base Set #2", cat: "pokemon", grade: "8", type: "vault", price: 1400, views: 1900,
    img: "https://images.pokemontcg.io/base1/2_hires.png" },
  { id: 3, title: "Chansey Holo", set: "1999 Base Set #3", cat: "pokemon", grade: "7", type: "direct", price: 350, views: 410,
    img: "https://images.pokemontcg.io/base1/3_hires.png" },
  { id: 4, title: "Charizard Holo", set: "1999 Base Set #4", cat: "pokemon", grade: "9", type: "vault", price: 3200, views: 4800,
    img: "https://images.pokemontcg.io/base1/4_hires.png" },
  { id: 5, title: "Clefairy Holo", set: "1999 Base Set #5", cat: "pokemon", grade: "8", type: "direct", price: 180, views: 220,
    img: "https://images.pokemontcg.io/base1/5_hires.png" },
  { id: 6, title: "Gyarados Holo", set: "1999 Base Set #6", cat: "pokemon", grade: "9", type: "direct", price: 320, views: 640,
    img: "https://images.pokemontcg.io/base1/6_hires.png" },
  { id: 7, title: "Hitmonchan Holo", set: "1999 Base Set #7", cat: "pokemon", grade: "8", type: "direct", price: 200, views: 250,
    img: "https://images.pokemontcg.io/base1/7_hires.png" },
  { id: 8, title: "Machamp Holo", set: "1999 Base Set #8", cat: "pokemon", grade: "9", type: "direct", price: 120, views: 300,
    img: "https://images.pokemontcg.io/base1/8_hires.png" },
  { id: 9, title: "Magneton Holo", set: "1999 Base Set #9", cat: "pokemon", grade: "7", type: "direct", price: 90, views: 120,
    img: "https://images.pokemontcg.io/base1/9_hires.png" },
  { id: 10, title: "Mewtwo Holo", set: "1999 Base Set #10", cat: "pokemon", grade: "9", type: "direct", price: 450, views: 980,
    img: "https://images.pokemontcg.io/base1/10_hires.png" },
  { id: 11, title: "Nidoking Holo", set: "1999 Base Set #11", cat: "pokemon", grade: "8", type: "direct", price: 160, views: 210,
    img: "https://images.pokemontcg.io/base1/11_hires.png" },
  { id: 12, title: "Ninetales Holo", set: "1999 Base Set #12", cat: "pokemon", grade: "8", type: "direct", price: 290, views: 330,
    img: "https://images.pokemontcg.io/base1/12_hires.png" },
  { id: 13, title: "Poliwrath Holo", set: "1999 Base Set #13", cat: "pokemon", grade: "8", type: "direct", price: 140, views: 160,
    img: "https://images.pokemontcg.io/base1/13_hires.png" },
  { id: 14, title: "Raichu Holo", set: "1999 Base Set #14", cat: "pokemon", grade: "8", type: "direct", price: 360, views: 520,
    img: "https://images.pokemontcg.io/base1/14_hires.png" },
  { id: 15, title: "Venusaur Holo", set: "1999 Base Set #15", cat: "pokemon", grade: "8", type: "vault", price: 1100, views: 1500,
    img: "https://images.pokemontcg.io/base1/15_hires.png" },
  { id: 16, title: "Zapdos Holo", set: "1999 Base Set #16", cat: "pokemon", grade: "8", type: "direct", price: 380, views: 450,
    img: "https://images.pokemontcg.io/base1/16_hires.png" },
  { id: 17, title: "Pikachu", set: "1999 Base Set #58", cat: "pokemon", grade: "10", type: "direct", price: 380, views: 890,
    img: "https://images.pokemontcg.io/base1/58_hires.png" },
  { id: 18, title: "Pikachu Black Star Promo", set: "1999 Wizards Promo #1", cat: "pokemon", grade: "9", type: "direct", price: 95, views: 310,
    img: "https://images.pokemontcg.io/basep/1_hires.png" },
  { id: 19, title: "Lugia Holo", set: "2000 Neo Genesis #9", cat: "pokemon", grade: "8", type: "vault", price: 2800, views: 1120,
    img: "https://images.pokemontcg.io/neo1/9_hires.png" },
  { id: 20, title: "Umbreon VMAX Alt Art", set: "2021 Evolving Skies #215", cat: "pokemon", grade: "10", type: "vault", price: 1250, views: 3400,
    img: "https://images.pokemontcg.io/swsh7/215_hires.png" },
  { id: 21, title: "Rayquaza VMAX Alt Art", set: "2021 Evolving Skies #218", cat: "pokemon", grade: "10", type: "vault", price: 950, views: 2900,
    img: "https://images.pokemontcg.io/swsh7/218_hires.png" },
  { id: 22, title: "Charizard ex", set: "2023 Pokémon 151 #6", cat: "pokemon", grade: "10", type: "direct", price: 145, views: 980,
    img: "https://images.pokemontcg.io/sv3pt5/6_hires.png" },
  { id: 23, title: "Pikachu", set: "2023 Pokémon 151 #25", cat: "pokemon", grade: "9", type: "direct", price: 60, views: 540,
    img: "https://images.pokemontcg.io/sv3pt5/25_hires.png" },
  { id: 24, title: "Monkey D. Luffy Leader", set: "OP-01 Romance Dawn", cat: "anime", grade: "10", type: "direct", price: 220, views: 1500,
    img: "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-001.png" },
  { id: 25, title: "Roronoa Zoro", set: "OP-01 Romance Dawn #025", cat: "anime", grade: "9", type: "direct", price: 85, views: 620,
    img: "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-025.png" },
  { id: 26, title: "Edward Newgate Leader", set: "OP-02 Paramount War", cat: "anime", grade: "10", type: "vault", price: 340, views: 780,
    img: "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-001.png" },
  { id: 27, title: "Son Goku SCR", set: "Fusion World FB01", cat: "anime", grade: "10", type: "direct", price: 410, views: 1900,
    face: { g: ["#f46b45", "#eea849"], mono: "GOKU" } },
  { id: 28, title: "Vegeta Alt Art", set: "Fusion World FB02", cat: "anime", grade: "9", type: "direct", price: 160, views: 720,
    face: { g: ["#1a2980", "#26d0ce"], mono: "VGT" } },
  { id: 29, title: "Black Lotus", set: "1993 Limited Edition Alpha", cat: "tcg", grade: "7", type: "vault", price: 48000, views: 8900,
    img: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg" },
  { id: 30, title: "Blue-Eyes White Dragon", set: "2002 LOB 1st Edition", cat: "tcg", grade: "8", type: "vault", price: 2600, views: 1400,
    face: { g: ["#e0eafc", "#7f9cf5"], mono: "BEWD", dark: true } },
  { id: 31, title: "Dark Magician", set: "2002 LOB 1st Edition", cat: "tcg", grade: "9", type: "direct", price: 950, views: 800,
    face: { g: ["#41295a", "#8e44ad"], mono: "DM" } },
  { id: 32, title: "Honus Wagner T206", set: "1909-11 American Tobacco", cat: "baseball", grade: "2", type: "vault", price: 95000, views: 12400,
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Honus_wagner_t206_baseball_card.jpg" },
  { id: 33, title: "Babe Ruth Rookie", set: "1916 M101-4 Sporting News", cat: "baseball", grade: "3", type: "vault", price: 28500, views: 5600,
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f1/1916_M101-4_Sporting_News_Babe_Ruth_Rookie_-151.jpg" },
  { id: 34, title: "Ty Cobb T206 Portrait", set: "1909-11 American Tobacco", cat: "baseball", grade: "4", type: "vault", price: 6800, views: 2100,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/61/1909-1911_T206_Ty_Cobb_Front.webp" },
  { id: 35, title: "Ty Cobb T206 Bat Off Shoulder", set: "1909-11 American Tobacco", cat: "baseball", grade: "3", type: "vault", price: 5200, views: 1700,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/99/1909-11_T206_Ty_Cobb_bat-off-shoulder.jpg" },
  { id: 36, title: "Walter Johnson T206", set: "1909-11 American Tobacco", cat: "baseball", grade: "4", type: "vault", price: 3800, views: 1300,
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e9/T206Johnson.jpg" },
  { id: 37, title: "Christy Mathewson", set: "1910 Tobacco Portrait", cat: "baseball", grade: "3", type: "vault", price: 2100, views: 880,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/62/Christy_Mathewson%2C_New_York_Giants%2C_baseball_card_portrait_LCCN2007685630.jpg" },
  { id: 38, title: "Cy Young", set: "1911 Tobacco Portrait", cat: "baseball", grade: "3", type: "vault", price: 2400, views: 940,
    img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Cy_young_Card.jpg" },
  { id: 39, title: "Shohei Ohtani RC", set: "2018 Topps Chrome", cat: "baseball", grade: "10", type: "direct", price: 780, views: 1300,
    face: { g: ["#134e5e", "#71b280"], mono: "17" } },
  { id: 40, title: "Bert Lindsay", set: "1911-12 C55 Imperial Tobacco", cat: "hockey", grade: "3", type: "vault", price: 1400, views: 760,
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Bert_Lindsay_1911.jpg" },
  { id: 41, title: "Harry Hyland", set: "1911-12 C55 Imperial Tobacco", cat: "hockey", grade: "3", type: "vault", price: 1100, views: 620,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Harry_Hyland_1911.jpg" },
  { id: 42, title: "Connor Bedard RC", set: "2023 UD Young Guns", cat: "hockey", grade: "10", type: "vault", price: 899, views: 2900,
    face: { g: ["#cf0a2c", "#1a1a1a"], mono: "98" } },
  { id: 43, title: "Wayne Gretzky RC", set: "1979 O-Pee-Chee #18", cat: "hockey", grade: "8", type: "vault", price: 12500, views: 4100,
    face: { g: ["#041e42", "#ff4c00"], mono: "99" } },
  { id: 44, title: "Sidney Crosby RC", set: "2005 UD Young Guns", cat: "hockey", grade: "9", type: "direct", price: 3900, views: 1700,
    face: { g: ["#fcb514", "#101010"], mono: "87" } },
  { id: 45, title: "Connor McDavid RC", set: "2015 UD Young Guns", cat: "hockey", grade: "10", type: "vault", price: 5200, views: 2300,
    face: { g: ["#00205b", "#cf4520"], mono: "97" } },
  { id: 46, title: "Alex Ovechkin RC", set: "2005 UD Young Guns", cat: "hockey", grade: "9", type: "direct", price: 2100, views: 990,
    face: { g: ["#c8102e", "#041e42"], mono: "8" } },
  { id: 47, title: "Michael Jordan", set: "1996 Topps Chrome", cat: "basketball", grade: "9", type: "vault", price: 2100, views: 3100,
    face: { g: ["#ce1141", "#000000"], mono: "23" } },
  { id: 48, title: "Victor Wembanyama RC", set: "2023 Prizm Silver", cat: "basketball", grade: "10", type: "direct", price: 1450, views: 2600,
    face: { g: ["#8a8d8f", "#0c0c0c"], mono: "1" } },
  { id: 49, title: "LeBron James RC", set: "2003 Topps #221", cat: "basketball", grade: "9", type: "vault", price: 4400, views: 3800,
    face: { g: ["#552583", "#fdb927"], mono: "23" } },
  { id: 50, title: "Stephen Curry RC", set: "2009 Topps #321", cat: "basketball", grade: "9", type: "direct", price: 1900, views: 1500,
    face: { g: ["#1d428a", "#ffc72c"], mono: "30" } },
  { id: 51, title: "Tom Brady RC", set: "2000 Bowman Chrome", cat: "football", grade: "9", type: "vault", price: 8900, views: 4600,
    face: { g: ["#002244", "#c60c30"], mono: "12" } },
  { id: 52, title: "Patrick Mahomes RC", set: "2017 Prizm #269", cat: "football", grade: "10", type: "vault", price: 3300, views: 2900,
    face: { g: ["#e31837", "#ffb81c"], mono: "15" } },
  { id: 53, title: "C.J. Stroud RC", set: "2023 Prizm", cat: "football", grade: "10", type: "direct", price: 240, views: 640,
    face: { g: ["#03202f", "#a71930"], mono: "7" } },
  { id: 54, title: "Tiger Woods RC", set: "2001 Upper Deck #1", cat: "golf", grade: "10", type: "vault", price: 4800, views: 3300,
    face: { g: ["#b30000", "#1a1a1a"], mono: "TW" } },
  { id: 55, title: "Scottie Scheffler", set: "2021 UD Artifacts", cat: "golf", grade: "10", type: "direct", price: 320, views: 540,
    face: { g: ["#076652", "#0c2f25"], mono: "SS" } },
  { id: 56, title: "Rory McIlroy", set: "2014 UD Masterpieces", cat: "golf", grade: "9", type: "direct", price: 180, views: 390,
    face: { g: ["#1e5631", "#a4de02"], mono: "RM", dark: true } },
  { id: 57, title: "Jack Nicklaus", set: "2012 SP Authentic", cat: "golf", grade: "8", type: "vault", price: 650, views: 470,
    face: { g: ["#b8860b", "#3a2c02"], mono: "JN" } },
  { id: 58, title: "Lionel Messi RC", set: "2004 Panini Mega Cracks", cat: "soccer", grade: "9", type: "vault", price: 16500, views: 5200,
    face: { g: ["#6cace4", "#f5f7fa"], mono: "10", dark: true } },
  { id: 59, title: "Cristiano Ronaldo RC", set: "2003 Panini Sports Mega", cat: "soccer", grade: "8", type: "vault", price: 9800, views: 4100,
    face: { g: ["#046a38", "#da291c"], mono: "7" } },
  { id: 60, title: "Kylian Mbappé", set: "2018 Panini Prizm WC", cat: "soccer", grade: "10", type: "direct", price: 720, views: 1100,
    face: { g: ["#004170", "#da291c"], mono: "10" } },
  { id: 61, title: "Planet Comics #11", set: "Fiction House 1941", cat: "comics", grade: "6", type: "vault", price: 850, views: 720,
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Planet_Comics_11.jpg" },
  { id: 62, title: "Planet Comics #53", set: "Fiction House 1948", cat: "comics", grade: "7", type: "direct", price: 420, views: 380,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Planet_Comics_53.jpg" },
  { id: 63, title: "The Incredible Hulk #181", set: "Marvel 1974 — 1st Wolverine", cat: "comics", grade: "8", type: "vault", price: 4800, views: 1800,
    face: { g: ["#11998e", "#38ef7d"], mono: "181" } },
  { id: 64, title: "Amazing Fantasy #15 Facsimile", set: "Marvel 2022 Reprint", cat: "comics", grade: "10", type: "direct", price: 95, views: 330,
    face: { g: ["#870000", "#190a05"], mono: "AF15" } },
  { id: 65, title: "1oz Silver Maple Leaf", set: ".9999 Royal Canadian Mint", cat: "coins", grade: "raw", type: "direct", price: 45, views: 180,
    img: "https://upload.wikimedia.org/wikipedia/commons/c/c8/1-ounce_Silver_Canadian_Maple_Leaf_MADE_OF_.9999%25_PURE_SILVER.jpg" },
  { id: 66, title: "Morgan Silver Dollar 1885-O", set: "US Mint — MS graded", cat: "coins", grade: "9", type: "vault", price: 410, views: 350,
    img: "https://upload.wikimedia.org/wikipedia/commons/7/74/1_Dollar_Morgan_-_1885_O.png" },
  { id: 67, title: "LEGO Millennium Falcon", set: "UCS Display Build", cat: "toys", grade: "raw", type: "direct", price: 1100, views: 690,
    img: "https://upload.wikimedia.org/wikipedia/commons/7/78/Millennium_Falcon_in_LEGO.jpg" },
  { id: 68, title: "1st Gen Optimus Prime", set: "1984 Hasbro AFA 80", cat: "toys", grade: "8", type: "vault", price: 2600, views: 610,
    face: { g: ["#c31432", "#240b36"], mono: "OP" } },
  { id: 69, title: "Air Jordan 1 Retro High", set: "Bred colorway — Size 10", cat: "sneakers", grade: "raw", type: "direct", price: 240, views: 980,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/62/2023_Buty_Nike_Air_Jordan.jpg" },
  { id: 70, title: "Nike Mag Back to the Future", set: "2016 Auto-lace", cat: "sneakers", grade: "raw", type: "vault", price: 32000, views: 5100,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/07/Nike_Mag.jpeg" },
  { id: 71, title: "Jordan 1 Chicago '85", set: "OG Pair — Size 10", cat: "sneakers", grade: "raw", type: "vault", price: 18500, views: 4400,
    face: { g: ["#ed213a", "#93291e"], mono: "'85" } },
  { id: 72, title: "Rolex Datejust", set: "Ref 16013 — Full set", cat: "watches", grade: "raw", type: "vault", price: 8900, views: 2700,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Rolex_Datejust_16013.jpg" },
  { id: 73, title: "Omega Speedmaster Moonwatch", set: "Hesalite — box + papers", cat: "watches", grade: "raw", type: "direct", price: 6800, views: 1200,
    face: { g: ["#141e30", "#243b55"], mono: "Ω" } },
];

const state = { cat: "", type: "", grade: "", q: "", sort: "newest", chip: "" };

const $ = (id) => document.getElementById(id);

// ── Cloud (Supabase) ────────────────────────────────────────
const supa = window.supabase && window.SUPA_URL
  ? window.supabase.createClient(window.SUPA_URL, window.SUPA_ANON)
  : null;
let currentUser = null;
let currentProfile = null;
let dbListings = [];
const profileCache = {}; // user_id → username

async function fetchProfiles(ids) {
  const missing = [...new Set(ids)].filter((id) => id && !profileCache[id]);
  if (!missing.length || !supa) return;
  const { data } = await supa.from("profiles").select("user_id, username, created_at").in("user_id", missing);
  (data || []).forEach((p) => { profileCache[p.user_id] = p; });
}

async function ensureProfile() {
  if (!currentUser || !supa || currentProfile) return;
  const { data } = await supa.from("profiles").select("*").eq("user_id", currentUser.id).maybeSingle();
  if (data) {
    currentProfile = data;
    profileCache[data.user_id] = data;
  } else {
    currentProfile = null;
    openOverlay("nameOverlay");
  }
}

async function saveUsername(raw, errEl) {
  const username = raw.trim().toLowerCase();
  if (!/^[a-z0-9_]{3,20}$/.test(username)) {
    errEl.textContent = "3–20 characters: lowercase letters, numbers, underscores";
    errEl.hidden = false;
    return false;
  }
  const { error } = await supa.from("profiles").insert({ user_id: currentUser.id, username });
  if (error) {
    errEl.textContent = /duplicate|unique/i.test(error.message) ? "That handle's taken — try another" : error.message;
    errEl.hidden = false;
    return false;
  }
  currentProfile = { user_id: currentUser.id, username };
  profileCache[currentUser.id] = currentProfile;
  return true;
}

// Fallback art colors for user listings without a photo
const CAT_COLORS = {
  hockey: ["#0f2027", "#2c5364"], basketball: ["#42275a", "#734b6d"],
  baseball: ["#134e5e", "#71b280"], football: ["#3a1c71", "#d76d77"],
  golf: ["#076652", "#0c2f25"], soccer: ["#004170", "#da291c"],
  pokemon: ["#f12711", "#f5af19"], anime: ["#f46b45", "#eea849"],
  tcg: ["#41295a", "#8e44ad"], comics: ["#870000", "#190a05"],
  coins: ["#b8860b", "#3a2c02"], toys: ["#0f0c29", "#302b63"],
  sneakers: ["#ed213a", "#93291e"], watches: ["#093028", "#237a57"],
};

function mapDbRow(row) {
  const mono = row.title.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  return {
    id: row.id, dbId: row.id, userId: row.user_id,
    title: row.title, set: row.set_name || "—", cat: row.cat,
    grade: row.grade, type: row.type, price: Number(row.price), sold: row.sold,
    views: row.views || 0, ts: Date.parse(row.created_at),
    img: row.img_url || null,
    face: row.img_url ? null : { g: CAT_COLORS[row.cat] || ["#232526", "#414345"], mono },
  };
}

async function loadDbListings() {
  if (!supa) return;
  const { data, error } = await supa
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });
  if (!error && data) {
    dbListings = data.map(mapDbRow);
    renderGrid();
    await fetchProfiles(dbListings.map((l) => l.userId));
    openFromHash(); // shared links to real listings resolve once they're loaded
  }
}

function allListings() {
  return [...dbListings, ...LISTINGS];
}

// ── Watchlist ───────────────────────────────────────────────
let watchSet = new Set(JSON.parse(localStorage.getItem("gh_watch") || "[]"));
let watchCounts = {};

const watchKey = (l) => String(l.dbId || l.id);

async function loadWatches() {
  if (!supa) return;
  const { data } = await supa.from("watches").select("user_id, item_key");
  if (!data) return;
  watchCounts = {};
  data.forEach((w) => { watchCounts[w.item_key] = (watchCounts[w.item_key] || 0) + 1; });
  if (currentUser) {
    watchSet = new Set(data.filter((w) => w.user_id === currentUser.id).map((w) => w.item_key));
  }
  renderGrid();
}

// Demo listings get a deterministic baseline so counts don't start at zero
function watchCount(l) {
  return (watchCounts[watchKey(l)] || 0) + (l.dbId ? 0 : Math.max(1, Math.round(l.views / 40)));
}

async function toggleWatch(key) {
  const on = watchSet.has(key);
  if (currentUser && supa) {
    if (on) {
      watchSet.delete(key);
      watchCounts[key] = Math.max(0, (watchCounts[key] || 1) - 1);
      await supa.from("watches").delete().eq("user_id", currentUser.id).eq("item_key", key);
    } else {
      watchSet.add(key);
      watchCounts[key] = (watchCounts[key] || 0) + 1;
      await supa.from("watches").insert({ user_id: currentUser.id, item_key: key });
    }
  } else {
    on ? watchSet.delete(key) : watchSet.add(key);
    localStorage.setItem("gh_watch", JSON.stringify([...watchSet]));
  }
  renderGrid();
}

function money(n) {
  return "$" + n.toLocaleString("en-CA");
}

function gradeLabel(g) {
  return g === "raw" ? "RAW" : "PSA " + g;
}

function viewsLabel(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
}

function faceArt(l, cls) {
  const f = l.face;
  return `<div class="${cls} card-face ${f.dark ? "face-dark" : ""}" style="background:linear-gradient(160deg,${f.g[0]},${f.g[1]})">
    ${icon(iconKey(l.cat), "face-icn")}
    <span class="face-mono">${f.mono}</span>
    <span class="face-name">${l.title}</span>
  </div>`;
}

function cardArt(l, cls) {
  const inner = l.img
    ? `<img src="${l.img}" alt="${l.title}" loading="lazy">`
    : faceArt(l, "slab-face");
  if (l.grade !== "raw") {
    // Graded → render inside a GradeHouse slab
    return `<div class="${cls} slabbed">
      <div class="slab-top">
        <div class="slab-id"><span class="slab-brand">GRADEHOUSE</span><span class="slab-set">${l.set}</span></div>
        <span class="slab-grade">${l.grade}</span>
      </div>
      <div class="slab-window">${inner}</div>
    </div>`;
  }
  if (l.img) return `<div class="${cls} has-img">${inner}</div>`;
  return faceArt(l, cls);
}

function renderLive() {
  const shows = STREAMS
    .map((s) => ({ s, live: isLive(s), win: showWindow(s) }))
    .sort((a, b) => (b.live - a.live) || (a.win.start - b.win.start));

  $("liveRow").innerHTML = shows.map(({ s, live, win }) => `
    <div class="live-card ${live ? "" : "upcoming"}" data-soon>
      <div class="live-thumb" style="background:linear-gradient(150deg,${s.g[0]},${s.g[1]})">
        ${live
          ? `<span class="live-badge"><span class="live-dot"></span>LIVE</span>
             <span class="live-viewers">${icon("eye", "icn-sm")}${viewsLabel(s.viewers)}</span>`
          : `<span class="up-badge">${icon("clock", "icn-xs")}UPCOMING</span>
             <span class="live-viewers"><span data-cd="${s.id}">${countdownText(win.start)}</span></span>`}
        <span class="live-avatar">${s.host.slice(0, 2).toUpperCase()}</span>
        <span class="live-cat">${icon(iconKey(s.cat), "icn-sm")}</span>
      </div>
      <div class="live-info">
        <span class="live-title">${s.title}</span>
        <div class="live-meta-row">
          <span class="live-host">@${s.host} · ${showTimeLabel(s)}</span>
          <button class="follow-btn ${follows.has(s.id) ? "on" : ""}" data-follow="${s.id}">
            ${icon("star", "icn-xs")}${follows.has(s.id) ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>`).join("");
}

// Tick the countdowns; re-render on a live/upcoming transition
setInterval(() => {
  let transition = false;
  STREAMS.forEach((s) => {
    const el = document.querySelector(`[data-cd="${s.id}"]`);
    if (isLive(s)) {
      if (el) transition = true; // was upcoming, now live
    } else if (el) {
      el.textContent = countdownText(showWindow(s).start);
    }
  });
  if (transition) renderLive();
}, 1000);

function renderCategories() {
  $("catRow").innerHTML = CATEGORIES.map(
    (c) => `<button class="cat-pill ${state.cat === c.key ? "active" : ""}" data-cat="${c.key}">
      ${icon(iconKey(c.key || "all"), "icn-sm")}${c.label}</button>`
  ).join("");
}

function matchesGrade(l) {
  if (!state.grade) return true;
  if (state.grade === "raw") return l.grade === "raw";
  if (state.grade === "low") return l.grade !== "raw" && Number(l.grade) <= 7;
  return l.grade === state.grade;
}

function filtered() {
  let items = allListings().filter((l) => {
    if (state.cat && l.cat !== state.cat) return false;
    if (state.type === "watching") {
      if (!watchSet.has(watchKey(l))) return false;
    } else if (state.type && l.type !== state.type) return false;
    if (!matchesGrade(l)) return false;
    if (state.chip === "under100" && l.price >= 100) return false;
    if (state.chip === "under500" && l.price >= 500) return false;
    if (state.chip === "psa10" && l.grade !== "10") return false;
    if (state.chip === "vintage" && !/\b(18\d{2}|19[0-7]\d)\b/.test(l.set)) return false;
    if (state.chip === "grails" && l.price < 5000) return false;
    if (state.q) {
      const q = state.q.toLowerCase();
      if (!(l.title + " " + l.set + " " + l.cat).toLowerCase().includes(q)) return false;
    }
    return true;
  });
  if (state.sort === "price_asc") items.sort((a, b) => a.price - b.price);
  else if (state.sort === "price_desc") items.sort((a, b) => b.price - a.price);
  else if (state.sort === "popular") items.sort((a, b) => b.views - a.views);
  else items.sort((a, b) => (b.ts || b.id) - (a.ts || a.id));
  return items;
}

function renderGrid() {
  const items = filtered();
  $("resultCount").textContent = items.length + " listing" + (items.length === 1 ? "" : "s");
  $("emptyState").hidden = items.length > 0;
  $("listingGrid").innerHTML = items.map(
    (l) => `<div class="listing-card" data-id="${l.id}">
      <div class="listing-art">
        ${cardArt(l, "listing-img")}
        <span class="listing-badge ${l.type}">${icon(l.type === "vault" ? "lock" : "box", "icn-xs")}${l.type}</span>
        ${l.sold ? `<span class="grade-chip sold-chip">SOLD</span>` : l.grade === "raw" ? `<span class="grade-chip raw">RAW</span>` : ""}
        <button class="watch-btn ${watchSet.has(watchKey(l)) ? "on" : ""}" data-watch="${watchKey(l)}" aria-label="Watch">${icon("heart", "icn-sm")}</button>
      </div>
      <div class="listing-info">
        <span class="listing-title">${l.title}</span>
        <span class="listing-set">${l.set}</span>
        <span class="listing-price">${money(l.price)}</span>
      </div>
    </div>`
  ).join("");
}

function openModal(id) {
  const l = allListings().find((x) => String(x.id) === String(id));
  if (!l) return;
  const cat = CATEGORIES.find((c) => c.key === l.cat);
  const mine = l.dbId && currentUser && l.userId === currentUser.id;
  $("modalBody").innerHTML = `
    ${cardArt(l, "modal-img")}
    <h3>${l.title}</h3>
    <p class="modal-set">${l.set}${l.dbId ? ` · sold by <button class="seller-link" data-seller-open="${l.userId}">@${(profileCache[l.userId] && profileCache[l.userId].username) || "member"}</button>` : ""}</p>
    <div class="modal-meta">
      <span class="modal-tag hl">${gradeLabel(l.grade)}</span>
      <span class="modal-tag">${icon(iconKey(l.cat), "icn-xs")}${cat ? cat.label : ""}</span>
      <span class="modal-tag">${icon(l.type === "vault" ? "lock" : "box", "icn-xs")}${l.type === "vault" ? "Vault" : "Direct"}</span>
      <span class="modal-tag">${icon("eye", "icn-xs")}${viewsLabel(l.views)} views</span>
      <button class="modal-tag watch-tag ${watchSet.has(watchKey(l)) ? "on" : ""}" data-watch="${watchKey(l)}">${icon("heart", "icn-xs")}<span data-watch-count="${watchKey(l)}">${watchCount(l)}</span> watching</button>
      <button class="modal-tag" data-share="${watchKey(l)}" data-share-title="${l.title.replace(/"/g, "&quot;")}">${icon("share", "icn-xs")}Share</button>
    </div>
    <div class="modal-price">${money(l.price)}${l.sold ? ` <span class="sold-flag">SOLD</span>` : ""}</div>
    ${l.sold
      ? `<button class="btn-buy" disabled>Sold</button>`
      : `<button class="btn-buy" data-soon>Buy Now</button>`}
    ${l.dbId && !mine && !l.sold && currentUser ? `
      <button class="btn-ghost" data-offer-toggle>Make an offer</button>
      <form class="offer-form" data-offer-form="${l.dbId}" hidden>
        <div class="gh-form-row">
          <input type="number" class="gh-input" data-offer-amount min="1" step="1" placeholder="Your offer (CAD)" required>
          <button type="submit" class="btn-buy btn-offer-send">Send</button>
        </div>
        <input type="text" class="gh-input" data-offer-msg maxlength="140" placeholder="Message (optional)">
      </form>` : ""}
    ${mine ? `<button class="btn-ghost btn-danger" data-remove="${l.dbId}">Remove my listing</button>` : ""}
    <div class="offer-list" id="offerList"></div>`;
  $("modalOverlay").hidden = false;
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", "#card=" + encodeURIComponent(watchKey(l)));
  if (l.dbId && supa && currentUser) loadOffers(l, mine);
}

function openFromHash() {
  const m = location.hash.match(/^#card=(.+)$/);
  if (m && $("modalOverlay").hidden) openModal(decodeURIComponent(m[1]));
}

async function loadOffers(l, mine) {
  const { data, error } = await supa
    .from("offers")
    .select("*")
    .eq("listing_id", l.dbId)
    .order("created_at", { ascending: false });
  if (error || !data || !data.length) return;
  const el = $("offerList");
  if (!el) return;
  if (mine) {
    el.innerHTML = `<h4>Offers on this listing</h4>` + data.map((o) => `
      <div class="offer-row">
        <span class="offer-amt">${money(Number(o.amount))}</span>
        <span class="offer-msg">${o.message ? o.message.replace(/</g, "&lt;") : ""}</span>
        ${o.status === "pending"
          ? `<span class="offer-actions">
               <button class="offer-btn accept" data-offer-decide="accepted" data-oid="${o.id}" data-lid="${l.dbId}">Accept</button>
               <button class="offer-btn decline" data-offer-decide="declined" data-oid="${o.id}">Decline</button>
             </span>`
          : `<span class="offer-status ${o.status}">${o.status}</span>`}
      </div>`).join("");
  } else {
    const own = data.filter((o) => o.buyer_id === currentUser.id);
    if (own.length) {
      el.innerHTML = own.map((o) =>
        `<div class="offer-row"><span class="offer-amt">You offered ${money(Number(o.amount))}</span>
         <span class="offer-status ${o.status}">${o.status}</span></div>`).join("");
    }
  }
}

function closeModal() {
  if ($("modalOverlay").hidden) return;
  $("modalOverlay").hidden = true;
  if ($("sellerPage").hidden && $("collPage").hidden) document.body.style.overflow = "";
  if (location.hash.startsWith("#card=")) history.replaceState(null, "", location.pathname + location.search);
}

let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.hidden = true), 2200);
}

function bindEvents() {
  $("catRow").addEventListener("click", (e) => {
    const pill = e.target.closest(".cat-pill");
    if (!pill) return;
    state.cat = pill.dataset.cat;
    renderCategories();
    renderGrid();
  });

  $("typeTabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".filter-tab");
    if (!tab) return;
    state.type = tab.dataset.type;
    document.querySelectorAll(".filter-tab").forEach((t) => t.classList.toggle("active", t === tab));
    renderGrid();
  });

  $("chipRow").addEventListener("click", (e) => {
    const chip = e.target.closest(".qchip");
    if (!chip) return;
    state.chip = state.chip === chip.dataset.chip ? "" : chip.dataset.chip;
    document.querySelectorAll(".qchip").forEach((c) => c.classList.toggle("active", c.dataset.chip === state.chip));
    renderGrid();
  });

  $("searchInput").addEventListener("input", (e) => {
    state.q = e.target.value.trim();
    renderGrid();
  });

  $("conditionFilter").addEventListener("change", (e) => {
    state.grade = e.target.value;
    renderGrid();
  });

  $("sortFilter").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderGrid();
  });

  $("listingGrid").addEventListener("click", (e) => {
    if (e.target.closest("[data-watch]")) return; // heart toggles, doesn't open
    const card = e.target.closest(".listing-card");
    if (card) openModal(card.dataset.id);
  });

  $("modalClose").addEventListener("click", closeModal);
  $("modalOverlay").addEventListener("click", (e) => {
    if (e.target === $("modalOverlay")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeModal(); closeOverlay("authOverlay"); closeOverlay("sellOverlay"); closeOverlay("nameOverlay"); }
  });

  $("allListingsLink").addEventListener("click", (e) => {
    e.preventDefault();
    state.cat = "";
    renderCategories();
    renderGrid();
  });
  $("logoLink").addEventListener("click", (e) => e.preventDefault());

  document.body.addEventListener("click", (e) => {
    const w = e.target.closest("[data-watch]");
    if (w) {
      e.preventDefault();
      e.stopPropagation();
      const key = w.dataset.watch;
      toggleWatch(key).then(() => {
        // live-update any open modal heart + count
        document.querySelectorAll(`[data-watch="${key}"]`).forEach((b) => b.classList.toggle("on", watchSet.has(key)));
        const cnt = document.querySelector(`[data-watch-count="${key}"]`);
        if (cnt) {
          const l = allListings().find((x) => watchKey(x) === key);
          if (l) cnt.textContent = watchCount(l);
        }
      });
      return;
    }
    const sh = e.target.closest("[data-share]");
    if (sh) {
      e.preventDefault();
      const url = location.origin + location.pathname + "#card=" + encodeURIComponent(sh.dataset.share);
      const title = sh.dataset.shareTitle || "GradeHouse";
      if (navigator.share) {
        navigator.share({ title: `${title} on GradeHouse`, url }).catch(() => {});
      } else {
        navigator.clipboard.writeText(url).then(() => toast("Link copied"));
      }
      return;
    }
    const fol = e.target.closest("[data-follow]");
    if (fol) {
      e.preventDefault();
      toggleFollow(Number(fol.dataset.follow));
      return;
    }
    const soon = e.target.closest("[data-soon]");
    if (soon) {
      e.preventDefault();
      toast("Live streaming drops with v2 — follow a show to lock in your spot");
    }
  });
}

// ── Auth + Sell ─────────────────────────────────────────────
function openOverlay(id) {
  $(id).hidden = false;
  document.body.style.overflow = "hidden";
}

function closeOverlay(id) {
  const el = $(id);
  if (el && !el.hidden) {
    el.hidden = true;
    document.body.style.overflow = "";
  }
}

function updateAuthUI() {
  $("authBtn").textContent = currentUser ? "Sign Out" : "Sign In";
}

let authMode = "signin";
function setAuthMode(mode) {
  authMode = mode;
  $("authTitle").textContent = mode === "signin" ? "Sign in to GradeHouse" : "Create your account";
  $("authSubmit").textContent = mode === "signin" ? "Sign In" : "Sign Up";
  $("authToggle").textContent = mode === "signin" ? "New here? Create an account" : "Have an account? Sign in";
  $("authNameLabel").hidden = mode === "signin";
  $("authUsername").required = mode === "signup";
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = $("authEmail").value.trim();
  const password = $("authPassword").value;
  const err = $("authError");
  err.hidden = true;
  $("authSubmit").disabled = true;
  try {
    if (authMode === "signup") {
      const uname = $("authUsername").value.trim().toLowerCase();
      if (!/^[a-z0-9_]{3,20}$/.test(uname)) {
        throw new Error("Username: 3–20 characters, lowercase letters/numbers/underscores");
      }
      const { data: taken } = await supa.from("profiles").select("user_id").eq("username", uname).maybeSingle();
      if (taken) throw new Error("That handle's taken — try another");
      const { error } = await supa.auth.signUp({ email, password });
      if (error) throw error;
      const uid = (await supa.auth.getUser()).data.user.id;
      await supa.from("profiles").insert({ user_id: uid, username: uname });
      currentProfile = { user_id: uid, username: uname };
      profileCache[uid] = currentProfile;
      toast(`Welcome to GradeHouse, @${uname}`);
    } else {
      const { error } = await supa.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast("Welcome back");
    }
    closeOverlay("authOverlay");
  } catch (ex) {
    err.textContent = ex.message || "Something went wrong";
    err.hidden = false;
  } finally {
    $("authSubmit").disabled = false;
  }
}

async function handleSellSubmit(e) {
  e.preventDefault();
  const err = $("sellError");
  err.hidden = true;
  $("sellSubmit").disabled = true;
  $("sellSubmit").textContent = "Posting…";
  try {
    let imgUrl = pendingSellImgUrl;
    const file = $("sellPhoto").files[0] || (pendingScanPhoto && pendingScanPhoto.blob);
    if (file) {
      const name = file.name ? file.name.replace(/[^\w.-]/g, "_") : "scan.jpg";
      const path = `${currentUser.id}/${Date.now()}-${name}`;
      const { error: upErr } = await supa.storage.from("card-photos").upload(path, file, { contentType: file.type || "image/jpeg" });
      if (upErr) throw upErr;
      imgUrl = supa.storage.from("card-photos").getPublicUrl(path).data.publicUrl;
    }
    const { error } = await supa.from("listings").insert({
      user_id: currentUser.id,
      title: $("sellTitle").value.trim(),
      set_name: $("sellSet").value.trim(),
      cat: $("sellCat").value,
      grade: $("sellGrade").value,
      type: $("sellType").value,
      price: Number($("sellPrice").value),
      img_url: imgUrl,
    });
    if (error) throw error;
    $("sellForm").reset();
    clearScanAttach();
    closeOverlay("sellOverlay");
    toast("Listed — it's live on the marketplace");
    await loadDbListings();
  } catch (ex) {
    err.textContent = ex.message || "Couldn't post the listing";
    err.hidden = false;
  } finally {
    $("sellSubmit").disabled = false;
    $("sellSubmit").textContent = "Post Listing";
  }
}

function initCloud() {
  if (!supa) {
    const offline = () => toast("Cloud features need an internet connection");
    $("authBtn").addEventListener("click", offline);
    $("sellLink").addEventListener("click", (e) => { e.preventDefault(); offline(); });
    return;
  }
  supa.auth.onAuthStateChange((_event, session) => {
    currentUser = session ? session.user : null;
    currentProfile = null;
    updateAuthUI();
    loadWatches();
    if (currentUser) setTimeout(ensureProfile, 400); // let signup's own insert land first
  });

  $("nameForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = await saveUsername($("nameInput").value, $("nameError"));
    if (ok) {
      closeOverlay("nameOverlay");
      toast(`You're @${currentProfile.username}`);
    }
  });

  $("authBtn").addEventListener("click", async () => {
    if (currentUser) {
      await supa.auth.signOut();
      toast("Signed out");
    } else {
      setAuthMode("signin");
      openOverlay("authOverlay");
    }
  });

  $("sellLink").addEventListener("click", (e) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthMode("signup");
      openOverlay("authOverlay");
      toast("Sign in to start selling");
    } else {
      openOverlay("sellOverlay");
    }
  });

  $("authForm").addEventListener("submit", handleAuthSubmit);
  $("authToggle").addEventListener("click", () => setAuthMode(authMode === "signin" ? "signup" : "signin"));
  $("sellForm").addEventListener("submit", handleSellSubmit);

  $("sellCat").innerHTML = CATEGORIES.filter((c) => c.key)
    .map((c) => `<option value="${c.key}">${c.label}</option>`).join("");

  document.querySelectorAll("[data-close]").forEach((btn) =>
    btn.addEventListener("click", () => closeOverlay(btn.dataset.close))
  );
  ["authOverlay", "sellOverlay", "nameOverlay"].forEach((id) =>
    $(id).addEventListener("click", (e) => { if (e.target === $(id)) closeOverlay(id); })
  );

  $("modalBody").parentElement.addEventListener("click", async (e) => {
    const rm = e.target.closest("[data-remove]");
    if (rm) {
      rm.disabled = true;
      const { error } = await supa.from("listings").delete().eq("id", rm.dataset.remove);
      if (!error) {
        closeModal();
        toast("Listing removed");
        await loadDbListings();
      } else {
        rm.disabled = false;
        toast("Couldn't remove listing");
      }
      return;
    }
    const sl = e.target.closest("[data-seller-open]");
    if (sl) {
      closeModal();
      openSellerPage(sl.dataset.sellerOpen);
      return;
    }
    const tog = e.target.closest("[data-offer-toggle]");
    if (tog) {
      const form = document.querySelector("[data-offer-form]");
      if (form) form.hidden = !form.hidden;
      return;
    }
    const dec = e.target.closest("[data-offer-decide]");
    if (dec) {
      dec.disabled = true;
      const status = dec.dataset.offerDecide;
      const { error } = await supa.from("offers").update({ status }).eq("id", dec.dataset.oid);
      if (!error && status === "accepted" && dec.dataset.lid) {
        await supa.from("listings").update({ sold: true }).eq("id", dec.dataset.lid);
        await loadDbListings();
      }
      if (!error) {
        toast(status === "accepted" ? "Offer accepted — marked as sold" : "Offer declined");
        closeModal();
      } else {
        dec.disabled = false;
        toast("Couldn't update offer");
      }
    }
  });

  $("modalBody").parentElement.addEventListener("submit", async (e) => {
    const form = e.target.closest("[data-offer-form]");
    if (!form) return;
    e.preventDefault();
    const amount = Number(form.querySelector("[data-offer-amount]").value);
    if (!amount) return;
    const btn = form.querySelector(".btn-offer-send");
    btn.disabled = true;
    const { error } = await supa.from("offers").insert({
      listing_id: form.dataset.offerForm,
      buyer_id: currentUser.id,
      amount,
      message: form.querySelector("[data-offer-msg]").value.trim(),
    });
    btn.disabled = false;
    if (error) {
      toast("Couldn't send offer");
    } else {
      form.hidden = true;
      toast("Offer sent to the seller");
    }
  });

  loadDbListings();
}

// ── My Collection ───────────────────────────────────────────
let collItems = [];
let pendingSellImgUrl = null; // reuse an already-uploaded photo when listing from collection

async function openCollection() {
  if (!supa) return toast("Your collection needs an internet connection");
  if (!currentUser) {
    setAuthMode("signup");
    openOverlay("authOverlay");
    return toast("Sign in to build your collection");
  }
  $("collPage").hidden = false;
  document.body.style.overflow = "hidden";
  await loadCollection();
}

function closeCollection() {
  $("collPage").hidden = true;
  document.body.style.overflow = "";
}

async function loadCollection() {
  const { data, error } = await supa
    .from("collection_items")
    .select("*")
    .order("created_at", { ascending: false });
  if (!error) {
    collItems = data || [];
    renderCollection();
  }
}

function renderCollection() {
  const total = collItems.reduce((s, c) => s + Number(c.value || 0), 0);
  const byCat = {};
  collItems.forEach((c) => { byCat[c.cat] = (byCat[c.cat] || 0) + 1; });
  const top = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
  const topCat = top ? CATEGORIES.find((c) => c.key === top[0]) : null;

  $("collStats").innerHTML = `
    <div class="coll-stat"><span class="coll-stat-num">${money(Math.round(total))}</span><span class="coll-stat-label">Estimated value</span></div>
    <div class="coll-stat"><span class="coll-stat-num">${collItems.length}</span><span class="coll-stat-label">Card${collItems.length === 1 ? "" : "s"}</span></div>
    <div class="coll-stat"><span class="coll-stat-num">${topCat ? topCat.label : "—"}</span><span class="coll-stat-label">Top category</span></div>`;

  $("collEmpty").hidden = collItems.length > 0;
  $("collGrid").innerHTML = collItems.map((c) => {
    const l = { img: c.img_url, grade: c.grade, title: c.title, set: c.set_name || "—", cat: c.cat,
      face: c.img_url ? null : { g: CAT_COLORS[c.cat] || ["#232526", "#414345"], mono: c.title.split(/\s+/).map(w => w[0]).join("").slice(0, 3).toUpperCase() } };
    return `<div class="listing-card coll-card">
      <div class="listing-art">${cardArt(l, "listing-img")}</div>
      <div class="listing-info">
        <span class="listing-title">${c.title}</span>
        <span class="listing-set">${c.set_name || "—"}</span>
        <span class="listing-price">~${money(Number(c.value))}</span>
        <div class="coll-actions">
          <button class="coll-sell-btn" data-coll-sell="${c.id}">List for sale</button>
          <button class="coll-del-btn" data-coll-del="${c.id}" aria-label="Remove">✕</button>
        </div>
      </div>
    </div>`;
  }).join("");
}

function sellFromCollection(id) {
  const c = collItems.find((x) => x.id === id);
  if (!c) return;
  $("sellTitle").value = c.title;
  $("sellSet").value = c.set_name || "";
  $("sellCat").value = CATEGORIES.some((k) => k.key === c.cat) ? c.cat : "pokemon";
  $("sellGrade").value = ["10", "9", "8", "7", "raw"].includes(c.grade) ? c.grade : "raw";
  $("sellPrice").value = Math.round(Number(c.value)) || "";
  pendingScanPhoto = null;
  pendingSellImgUrl = c.img_url || null;
  if (c.img_url) {
    $("scanAttachImg").src = c.img_url;
    $("scanAttach").hidden = false;
  }
  closeCollection();
  openOverlay("sellOverlay");
}

// ── Seller shop page ────────────────────────────────────────
async function openSellerPage(uid) {
  await fetchProfiles([uid]);
  const p = profileCache[uid];
  const items = dbListings.filter((l) => l.userId === uid);
  const active = items.filter((l) => !l.sold);
  const sold = items.filter((l) => l.sold);
  const since = p && p.created_at
    ? new Date(p.created_at).toLocaleDateString([], { month: "short", year: "numeric" })
    : "—";

  $("sellerName").innerHTML = `@<span>${p ? p.username : "member"}</span>`;
  $("sellerStats").innerHTML = `
    <div class="coll-stat"><span class="coll-stat-num">${active.length}</span><span class="coll-stat-label">Active listings</span></div>
    <div class="coll-stat"><span class="coll-stat-num">${sold.length}</span><span class="coll-stat-label">Sold</span></div>
    <div class="coll-stat"><span class="coll-stat-num">${since}</span><span class="coll-stat-label">Member since</span></div>`;
  $("sellerEmpty").hidden = items.length > 0;
  $("sellerGrid").innerHTML = items.map((l) => `
    <div class="listing-card" data-id="${l.id}">
      <div class="listing-art">
        ${cardArt(l, "listing-img")}
        ${l.sold ? `<span class="grade-chip sold-chip">SOLD</span>` : l.grade === "raw" ? `<span class="grade-chip raw">RAW</span>` : ""}
      </div>
      <div class="listing-info">
        <span class="listing-title">${l.title}</span>
        <span class="listing-set">${l.set}</span>
        <span class="listing-price">${money(l.price)}</span>
      </div>
    </div>`).join("");
  $("sellerPage").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeSellerPage() {
  $("sellerPage").hidden = true;
  if ($("modalOverlay").hidden) document.body.style.overflow = "";
}

function initSellerPage() {
  $("sellerClose").addEventListener("click", closeSellerPage);
  $("sellerGrid").addEventListener("click", (e) => {
    if (e.target.closest("[data-watch]")) return;
    const card = e.target.closest(".listing-card");
    if (card) openModal(card.dataset.id);
  });
}

function initCollection() {
  $("collLink").addEventListener("click", (e) => { e.preventDefault(); openCollection(); });
  $("collClose").addEventListener("click", closeCollection);
  $("collGrid").addEventListener("click", async (e) => {
    const sell = e.target.closest("[data-coll-sell]");
    if (sell) return sellFromCollection(sell.dataset.collSell);
    const del = e.target.closest("[data-coll-del]");
    if (del) {
      del.disabled = true;
      const { error } = await supa.from("collection_items").delete().eq("id", del.dataset.collDel);
      if (!error) {
        toast("Removed from collection");
        await loadCollection();
      } else {
        del.disabled = false;
      }
    }
  });
}

// ── Card scanner ────────────────────────────────────────────
const SCANNER_ENABLED = true; // scan-card edge function is live (Gemini free tier)

let scanStream = null;
let scanBusy = false;
let lastScan = null; // { canvas, cards }
let pendingScanPhoto = null; // { blob, dataUrl } attached to the sell form

async function openScanner() {
  if (!SCANNER_ENABLED) return toast("Card scanner coming soon");
  if (!supa) return toast("Scanning needs an internet connection");
  if (!currentUser) {
    setAuthMode("signin");
    openOverlay("authOverlay");
    return toast("Sign in to scan cards");
  }
  const scanner = $("scanner");
  scanner.hidden = false;
  document.body.style.overflow = "hidden";
  try {
    scanStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      audio: false,
    });
    $("scanVideo").srcObject = scanStream;
    $("scanStatus").textContent = "Hover over a card or a binder page";
  } catch (ex) {
    closeScanner();
    toast("Couldn't open the camera — check permissions");
  }
}

function closeScanner() {
  if (scanStream) {
    scanStream.getTracks().forEach((t) => t.stop());
    scanStream = null;
  }
  const scanner = $("scanner");
  scanner.hidden = true;
  scanner.classList.remove("frozen");
  $("scanVideo").hidden = false;
  $("scanFrame").hidden = true;
  $("scanResults").hidden = true;
  $("scanCapture").hidden = false;
  $("scanAgain").hidden = true;
  document.body.style.overflow = "";
  lastScan = null;
  scanBusy = false;
}

function resetScanner() {
  const scanner = $("scanner");
  scanner.classList.remove("frozen");
  $("scanVideo").hidden = false;
  $("scanFrame").hidden = true;
  $("scanResults").hidden = true;
  $("scanCapture").hidden = false;
  $("scanCapture").disabled = false;
  $("scanAgain").hidden = true;
  $("scanStatus").textContent = "Hover over a card or a binder page";
  lastScan = null;
}

async function captureScan() {
  if (scanBusy || !scanStream) return;
  scanBusy = true;
  const video = $("scanVideo");
  const frame = $("scanFrame");
  // Freeze the frame, capped at ~1568px on the long edge
  const scale = Math.min(1, 1568 / Math.max(video.videoWidth, video.videoHeight));
  frame.width = Math.round(video.videoWidth * scale);
  frame.height = Math.round(video.videoHeight * scale);
  const ctx = frame.getContext("2d");
  ctx.drawImage(video, 0, 0, frame.width, frame.height);

  $("scanner").classList.add("frozen");
  video.hidden = true;
  frame.hidden = false;
  $("scanCapture").disabled = true;
  $("scanStatus").textContent = "Identifying cards…";

  try {
    const b64 = frame.toDataURL("image/jpeg", 0.85).split(",")[1];
    const { data, error } = await supa.functions.invoke("scan-card", {
      body: { image: b64, media_type: "image/jpeg" },
    });
    if (error) throw error;
    if (data.error) throw new Error(data.error);
    lastScan = { frame, cards: data.cards || [] };
    drawScanBoxes(ctx, frame, lastScan.cards);
    renderScanResults(lastScan.cards, frame);
    $("scanStatus").textContent = lastScan.cards.length
      ? `Found ${lastScan.cards.length} card${lastScan.cards.length === 1 ? "" : "s"}`
      : "No cards found — try again";
  } catch (ex) {
    $("scanStatus").textContent = "Scan failed — " + (ex.message || "try again");
  } finally {
    $("scanCapture").hidden = true;
    $("scanAgain").hidden = false;
    scanBusy = false;
  }
}

function drawScanBoxes(ctx, frame, cards) {
  ctx.lineWidth = Math.max(3, frame.width / 400);
  ctx.strokeStyle = "#dfae5a";
  ctx.shadowColor = "rgba(223, 174, 90, 0.7)";
  ctx.shadowBlur = 10;
  cards.forEach((c) => {
    ctx.strokeRect(c.box.x * frame.width, c.box.y * frame.height, c.box.w * frame.width, c.box.h * frame.height);
  });
  ctx.shadowBlur = 0;
}

function cropCard(frame, box) {
  const c = document.createElement("canvas");
  const pad = 0.02;
  const x = Math.max(0, (box.x - pad)) * frame.width;
  const y = Math.max(0, (box.y - pad)) * frame.height;
  const w = Math.min(1 - box.x + pad, box.w + pad * 2) * frame.width;
  const h = Math.min(1 - box.y + pad, box.h + pad * 2) * frame.height;
  c.width = Math.round(w);
  c.height = Math.round(h);
  c.getContext("2d").drawImage(frame, x, y, w, h, 0, 0, c.width, c.height);
  return c;
}

function renderScanResults(cards, frame) {
  const el = $("scanResults");
  if (!cards.length) {
    el.innerHTML = `<p class="scan-empty">Nothing identified — get closer, add light, and rescan.</p>`;
  } else {
    el.innerHTML = `<div class="scan-results-head">
        <h3>${cards.length} card${cards.length === 1 ? "" : "s"} found</h3>
        ${cards.length > 1 ? `<button class="btn-keep-hit" id="keepAllBtn">Keep all</button>` : ""}
      </div>` + cards.map((c, i) => `
      <div class="scan-hit">
        <img src="${cropCard(frame, c.box).toDataURL("image/jpeg", 0.8)}" alt="">
        <div class="scan-hit-info">
          <div class="scan-hit-title">${c.title}</div>
          <div class="scan-hit-sub">${c.set_name} · ${gradeLabel(c.grade)}</div>
        </div>
        <span class="scan-hit-price">~${money(c.price_estimate)}</span>
        <button class="btn-keep-hit" data-scan-keep="${i}">Keep</button>
        <button class="btn-sell-hit" data-scan-sell="${i}">Sell</button>
      </div>`).join("");
  }
  el.hidden = false;
}

async function keepFromScan(i, btn) {
  const c = lastScan.cards[i];
  if (btn) { btn.disabled = true; btn.textContent = "…"; }
  try {
    const crop = cropCard(lastScan.frame, c.box);
    const blob = await new Promise((res) => crop.toBlob(res, "image/jpeg", 0.88));
    const path = `${currentUser.id}/coll-${Date.now()}-${i}.jpg`;
    const { error: upErr } = await supa.storage.from("card-photos").upload(path, blob, { contentType: "image/jpeg" });
    if (upErr) throw upErr;
    const imgUrl = supa.storage.from("card-photos").getPublicUrl(path).data.publicUrl;
    const { error } = await supa.from("collection_items").insert({
      user_id: currentUser.id,
      title: c.title, set_name: c.set_name, cat: c.cat, grade: c.grade,
      value: c.price_estimate || 0, img_url: imgUrl,
    });
    if (error) throw error;
    if (btn) btn.textContent = "Kept ✓";
    return true;
  } catch (ex) {
    if (btn) { btn.disabled = false; btn.textContent = "Keep"; }
    toast("Couldn't save — try again");
    return false;
  }
}

function sellFromScan(i) {
  const c = lastScan.cards[i];
  const crop = cropCard(lastScan.frame, c.box);
  const dataUrl = crop.toDataURL("image/jpeg", 0.88);
  crop.toBlob((blob) => { pendingScanPhoto = { blob, dataUrl }; }, "image/jpeg", 0.88);
  $("sellTitle").value = c.title;
  $("sellSet").value = c.set_name;
  $("sellCat").value = CATEGORIES.some((k) => k.key === c.cat) ? c.cat : "pokemon";
  $("sellGrade").value = c.grade;
  $("sellPrice").value = c.price_estimate || "";
  $("scanAttachImg").src = dataUrl;
  $("scanAttach").hidden = false;
  closeScanner();
  openOverlay("sellOverlay");
}

function clearScanAttach() {
  pendingScanPhoto = null;
  pendingSellImgUrl = null;
  $("scanAttach").hidden = true;
}

function initBottomNav() {
  $("bottomNav").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-bnav]");
    if (!btn) return;
    document.querySelectorAll("[data-bnav]").forEach((b) => b.classList.toggle("active", b === btn));
    const go = btn.dataset.bnav;
    if (go === "browse") window.scrollTo({ top: 0, behavior: "smooth" });
    else if (go === "collection") openCollection();
    else if (go === "scan") openScanner();
    else if (go === "sell") $("sellLink").click();
    else if (go === "account") $("authBtn").click();
  });
}

function initScanner() {
  $("scanLink").addEventListener("click", (e) => { e.preventDefault(); openScanner(); });
  $("sellScanBtn").addEventListener("click", () => { closeOverlay("sellOverlay"); openScanner(); });
  $("scanClose").addEventListener("click", closeScanner);
  $("scanCapture").addEventListener("click", captureScan);
  $("scanAgain").addEventListener("click", resetScanner);
  $("scanAttachClear").addEventListener("click", clearScanAttach);
  $("scanResults").addEventListener("click", async (e) => {
    const sell = e.target.closest("[data-scan-sell]");
    if (sell) return sellFromScan(Number(sell.dataset.scanSell));
    const keep = e.target.closest("[data-scan-keep]");
    if (keep) return keepFromScan(Number(keep.dataset.scanKeep), keep);
    if (e.target.closest("#keepAllBtn")) {
      const all = e.target.closest("#keepAllBtn");
      all.disabled = true;
      const btns = [...document.querySelectorAll("[data-scan-keep]")];
      let saved = 0;
      for (const b of btns) {
        if (!b.disabled && await keepFromScan(Number(b.dataset.scanKeep), b)) saved++;
      }
      all.textContent = `Kept ${saved}`;
      toast(`${saved} card${saved === 1 ? "" : "s"} added to your collection`);
    }
  });
}

function initIntro() {
  const intro = $("intro");
  if (!intro) return;
  if (document.body.classList.contains("intro-off")) {
    intro.remove();
    return;
  }
  intro.addEventListener("click", () => {
    document.body.classList.remove("has-intro");
    document.body.classList.add("intro-off");
  });
  setTimeout(() => intro.remove(), 2600);
}

function init() {
  initIntro();
  renderLive();
  renderCategories();
  renderGrid();
  bindEvents();
  initCloud();
  initScanner();
  initBottomNav();
  initCollection();
  initSellerPage();
  openFromHash();
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

init();
