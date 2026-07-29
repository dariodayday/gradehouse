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

// Live shows — Whatnot-style
const STREAMS = [
  { id: 1, title: "Pokémon Rip & Ship — Chasing the Moonbreon", host: "CardCaveDan",   viewers: 1243, cat: "pokemon",  g: ["#41295a", "#2f0743"] },
  { id: 2, title: "NHL Hobby Box Break — Young Guns Hunt",      host: "BreaksByBrody", viewers: 862,  cat: "hockey",   g: ["#0f2027", "#2c5364"] },
  { id: 3, title: "$1 Start Sports Card Auctions",              host: "SlabCityShan",  viewers: 2114, cat: "baseball", g: ["#8e0e00", "#1f1c18"] },
  { id: 4, title: "One Piece OP-09 Box Break",                  host: "GrandLineGems", viewers: 540,  cat: "anime",    g: ["#f12711", "#f5af19"] },
  { id: 5, title: "Vintage Vault Show — Pre-War Baseball",      host: "TheGradeHouse", viewers: 388,  cat: "baseball", g: ["#232526", "#414345"] },
  { id: 6, title: "Sneaker Heat Check — Live Cops",             host: "SoleSearchSam", viewers: 927,  cat: "sneakers", g: ["#093028", "#237a57"] },
];

// Listings. img = real card image; face = designed placeholder.
const LISTINGS = [
  // ── Pokémon (real images — Pokémon TCG API) ──
  { id: 1,  title: "Charizard Holo", set: "1999 Base Set #4", cat: "pokemon", grade: "9", type: "vault", price: 3200, views: 2150,
    img: "https://images.pokemontcg.io/base1/4_hires.png" },
  { id: 2,  title: "Pikachu", set: "1999 Base Set #58", cat: "pokemon", grade: "10", type: "direct", price: 380, views: 890,
    img: "https://images.pokemontcg.io/base1/58_hires.png" },
  { id: 3,  title: "Blastoise Holo", set: "1999 Base Set #2", cat: "pokemon", grade: "8", type: "vault", price: 1400, views: 760,
    img: "https://images.pokemontcg.io/base1/2_hires.png" },
  { id: 4,  title: "Pikachu Black Star Promo", set: "1999 Wizards Promo #1", cat: "pokemon", grade: "9", type: "direct", price: 95, views: 310,
    img: "https://images.pokemontcg.io/basep/1_hires.png" },
  { id: 5,  title: "Lugia Holo", set: "2000 Neo Genesis #9", cat: "pokemon", grade: "8", type: "vault", price: 2800, views: 1120,
    img: "https://images.pokemontcg.io/neo1/9_hires.png" },
  { id: 6,  title: "Umbreon VMAX Alt Art", set: "2021 Evolving Skies #215", cat: "pokemon", grade: "10", type: "vault", price: 1250, views: 3400,
    img: "https://images.pokemontcg.io/swsh7/215_hires.png" },
  { id: 7,  title: "Charizard ex", set: "2023 Pokémon 151 #6", cat: "pokemon", grade: "10", type: "direct", price: 145, views: 980,
    img: "https://images.pokemontcg.io/sv3pt5/6_hires.png" },

  // ── One Piece (real images — official card list) ──
  { id: 8,  title: "Monkey D. Luffy Leader", set: "OP-01 Romance Dawn", cat: "anime", grade: "10", type: "direct", price: 220, views: 1500,
    img: "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-001.png" },
  { id: 9,  title: "Roronoa Zoro", set: "OP-01 Romance Dawn #025", cat: "anime", grade: "9", type: "direct", price: 85, views: 620,
    img: "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-025.png" },
  { id: 10, title: "Edward Newgate Leader", set: "OP-02 Paramount War", cat: "anime", grade: "10", type: "vault", price: 340, views: 780,
    img: "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-001.png" },

  // ── Dragon Ball (designed faces) ──
  { id: 11, title: "Son Goku SCR", set: "Fusion World FB01", cat: "anime", grade: "10", type: "direct", price: 410, views: 1900,
    face: { g: ["#f46b45", "#eea849"], mono: "GOKU" } },
  { id: 12, title: "Vegeta Alt Art", set: "Fusion World FB02", cat: "anime", grade: "9", type: "direct", price: 160, views: 720,
    face: { g: ["#1a2980", "#26d0ce"], mono: "VGT" } },

  // ── Magic (real image — Scryfall) ──
  { id: 13, title: "Black Lotus", set: "1993 Limited Edition Alpha", cat: "tcg", grade: "7", type: "vault", price: 48000, views: 8900,
    img: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg" },
  { id: 14, title: "Blue-Eyes White Dragon", set: "2002 LOB 1st Edition", cat: "tcg", grade: "8", type: "vault", price: 2600, views: 1400,
    face: { g: ["#e0eafc", "#7f9cf5"], mono: "BEWD", dark: true } },
  { id: 15, title: "Dark Magician", set: "2002 LOB 1st Edition", cat: "tcg", grade: "9", type: "direct", price: 950, views: 800,
    face: { g: ["#41295a", "#8e44ad"], mono: "DM" } },

  // ── Vintage baseball (real images — Wikimedia Commons) ──
  { id: 16, title: "Honus Wagner T206", set: "1909-11 American Tobacco", cat: "baseball", grade: "2", type: "vault", price: 95000, views: 12400,
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Honus_wagner_t206_baseball_card.jpg" },
  { id: 17, title: "Babe Ruth Rookie", set: "1916 M101-4 Sporting News", cat: "baseball", grade: "3", type: "vault", price: 28500, views: 5600,
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f1/1916_M101-4_Sporting_News_Babe_Ruth_Rookie_-151.jpg" },
  { id: 18, title: "Ty Cobb T206", set: "1909-11 American Tobacco", cat: "baseball", grade: "4", type: "vault", price: 6800, views: 2100,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/61/1909-1911_T206_Ty_Cobb_Front.webp" },
  { id: 19, title: "Cy Young", set: "1911 Tobacco Portrait", cat: "baseball", grade: "3", type: "vault", price: 2400, views: 940,
    img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Cy_young_Card.jpg" },
  { id: 20, title: "Shohei Ohtani RC", set: "2018 Topps Chrome", cat: "baseball", grade: "10", type: "direct", price: 780, views: 1300,
    face: { g: ["#134e5e", "#71b280"], mono: "17" } },

  // ── Hockey (designed faces) ──
  { id: 21, title: "Connor Bedard RC", set: "2023 UD Young Guns", cat: "hockey", grade: "10", type: "vault", price: 899, views: 2900,
    face: { g: ["#cf0a2c", "#1a1a1a"], mono: "98" } },
  { id: 22, title: "Wayne Gretzky RC", set: "1979 O-Pee-Chee #18", cat: "hockey", grade: "8", type: "vault", price: 12500, views: 4100,
    face: { g: ["#041e42", "#ff4c00"], mono: "99" } },
  { id: 23, title: "Sidney Crosby RC", set: "2005 UD Young Guns", cat: "hockey", grade: "9", type: "direct", price: 3900, views: 1700,
    face: { g: ["#fcb514", "#101010"], mono: "87" } },
  { id: 24, title: "Connor McDavid RC", set: "2015 UD Young Guns", cat: "hockey", grade: "10", type: "vault", price: 5200, views: 2300,
    face: { g: ["#00205b", "#cf4520"], mono: "97" } },
  { id: 25, title: "Alex Ovechkin RC", set: "2005 UD Young Guns", cat: "hockey", grade: "9", type: "direct", price: 2100, views: 990,
    face: { g: ["#c8102e", "#041e42"], mono: "8" } },

  // ── Basketball ──
  { id: 26, title: "Michael Jordan", set: "1996 Topps Chrome", cat: "basketball", grade: "9", type: "vault", price: 2100, views: 3100,
    face: { g: ["#ce1141", "#000000"], mono: "23" } },
  { id: 27, title: "Victor Wembanyama RC", set: "2023 Prizm Silver", cat: "basketball", grade: "10", type: "direct", price: 1450, views: 2600,
    face: { g: ["#8a8d8f", "#0c0c0c"], mono: "1" } },
  { id: 28, title: "LeBron James RC", set: "2003 Topps #221", cat: "basketball", grade: "9", type: "vault", price: 4400, views: 3800,
    face: { g: ["#552583", "#fdb927"], mono: "23" } },
  { id: 29, title: "Stephen Curry RC", set: "2009 Topps #321", cat: "basketball", grade: "9", type: "direct", price: 1900, views: 1500,
    face: { g: ["#1d428a", "#ffc72c"], mono: "30" } },

  // ── Football ──
  { id: 30, title: "Tom Brady RC", set: "2000 Bowman Chrome", cat: "football", grade: "9", type: "vault", price: 8900, views: 4600,
    face: { g: ["#002244", "#c60c30"], mono: "12" } },
  { id: 31, title: "Patrick Mahomes RC", set: "2017 Prizm #269", cat: "football", grade: "10", type: "vault", price: 3300, views: 2900,
    face: { g: ["#e31837", "#ffb81c"], mono: "15" } },
  { id: 32, title: "C.J. Stroud RC", set: "2023 Prizm", cat: "football", grade: "10", type: "direct", price: 240, views: 640,
    face: { g: ["#03202f", "#a71930"], mono: "7" } },

  // ── Golf ──
  { id: 33, title: "Tiger Woods RC", set: "2001 Upper Deck #1", cat: "golf", grade: "10", type: "vault", price: 4800, views: 3300,
    face: { g: ["#b30000", "#1a1a1a"], mono: "TW" } },
  { id: 34, title: "Scottie Scheffler", set: "2021 UD Artifacts", cat: "golf", grade: "10", type: "direct", price: 320, views: 540,
    face: { g: ["#076652", "#0c2f25"], mono: "SS" } },
  { id: 35, title: "Rory McIlroy", set: "2014 UD Masterpieces", cat: "golf", grade: "9", type: "direct", price: 180, views: 390,
    face: { g: ["#1e5631", "#a4de02"], mono: "RM", dark: true } },
  { id: 36, title: "Jack Nicklaus", set: "2012 SP Authentic", cat: "golf", grade: "8", type: "vault", price: 650, views: 470,
    face: { g: ["#b8860b", "#3a2c02"], mono: "JN" } },

  // ── Soccer ──
  { id: 37, title: "Lionel Messi RC", set: "2004 Panini Mega Cracks", cat: "soccer", grade: "9", type: "vault", price: 16500, views: 5200,
    face: { g: ["#6cace4", "#f5f7fa"], mono: "10", dark: true } },
  { id: 38, title: "Cristiano Ronaldo RC", set: "2003 Panini Sports Mega", cat: "soccer", grade: "8", type: "vault", price: 9800, views: 4100,
    face: { g: ["#046a38", "#da291c"], mono: "7" } },
  { id: 39, title: "Kylian Mbappé", set: "2018 Panini Prizm WC", cat: "soccer", grade: "10", type: "direct", price: 720, views: 1100,
    face: { g: ["#004170", "#da291c"], mono: "10" } },

  // ── Comics ──
  { id: 40, title: "The Incredible Hulk #181", set: "Marvel 1974 — 1st Wolverine", cat: "comics", grade: "8", type: "vault", price: 4800, views: 1800,
    face: { g: ["#11998e", "#38ef7d"], mono: "181" } },
  { id: 41, title: "Amazing Fantasy #15 Facsimile", set: "Marvel 2022 Reprint", cat: "comics", grade: "10", type: "direct", price: 95, views: 330,
    face: { g: ["#870000", "#190a05"], mono: "AF15" } },

  // ── Coins ──
  { id: 42, title: "1oz Gold Maple Leaf", set: "Royal Canadian Mint 2024", cat: "coins", grade: "raw", type: "direct", price: 3350, views: 260,
    face: { g: ["#b8860b", "#3a2c02"], mono: "1oz" } },
  { id: 43, title: "Morgan Silver Dollar 1885", set: "US Mint — MS graded", cat: "coins", grade: "9", type: "vault", price: 410, views: 350,
    face: { g: ["#606c88", "#3f4c6b"], mono: "1885" } },

  // ── Toys ──
  { id: 44, title: "LEGO UCS Millennium Falcon", set: "75192 — Sealed", cat: "toys", grade: "raw", type: "direct", price: 1100, views: 690,
    face: { g: ["#0f0c29", "#302b63"], mono: "75192" } },
  { id: 45, title: "1st Gen Optimus Prime", set: "1984 Hasbro AFA 80", cat: "toys", grade: "8", type: "vault", price: 2600, views: 610,
    face: { g: ["#c31432", "#240b36"], mono: "OP" } },

  // ── Sneakers ──
  { id: 46, title: "Jordan 1 Chicago '85", set: "OG Pair — Size 10", cat: "sneakers", grade: "raw", type: "vault", price: 18500, views: 4400,
    face: { g: ["#ed213a", "#93291e"], mono: "'85" } },
  { id: 47, title: "Nike Mag Back to the Future", set: "2016 Auto-lace", cat: "sneakers", grade: "raw", type: "vault", price: 32000, views: 5100,
    face: { g: ["#41295a", "#2f0743"], mono: "MAG" } },

  // ── Watches ──
  { id: 48, title: "Rolex Submariner Hulk", set: "116610LV — Full set", cat: "watches", grade: "raw", type: "vault", price: 21500, views: 2700,
    face: { g: ["#093028", "#237a57"], mono: "ROLEX" } },
  { id: 49, title: "Omega Speedmaster Moonwatch", set: "Hesalite — box + papers", cat: "watches", grade: "raw", type: "direct", price: 6800, views: 1200,
    face: { g: ["#141e30", "#243b55"], mono: "Ω" } },
];

const state = { cat: "", type: "", grade: "", q: "", sort: "newest" };

const $ = (id) => document.getElementById(id);

// ── Cloud (Supabase) ────────────────────────────────────────
const supa = window.supabase && window.SUPA_URL
  ? window.supabase.createClient(window.SUPA_URL, window.SUPA_ANON)
  : null;
let currentUser = null;
let dbListings = [];

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
    grade: row.grade, type: row.type, price: Number(row.price),
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
  }
}

function allListings() {
  return [...dbListings, ...LISTINGS];
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

function cardArt(l, cls) {
  if (l.img) {
    return `<div class="${cls} has-img"><img src="${l.img}" alt="${l.title}" loading="lazy"></div>`;
  }
  const f = l.face;
  return `<div class="${cls} card-face ${f.dark ? "face-dark" : ""}" style="background:linear-gradient(160deg,${f.g[0]},${f.g[1]})">
    ${icon(iconKey(l.cat), "face-icn")}
    <span class="face-mono">${f.mono}</span>
    <span class="face-name">${l.title}</span>
  </div>`;
}

function renderLive() {
  $("liveRow").innerHTML = STREAMS.map(
    (s) => `<div class="live-card" data-soon>
      <div class="live-thumb" style="background:linear-gradient(150deg,${s.g[0]},${s.g[1]})">
        <span class="live-badge"><span class="live-dot"></span>LIVE</span>
        <span class="live-viewers">${icon("eye", "icn-sm")}${viewsLabel(s.viewers)}</span>
        <span class="live-avatar">${s.host.slice(0, 2).toUpperCase()}</span>
        <span class="live-cat">${icon(iconKey(s.cat), "icn-sm")}</span>
      </div>
      <div class="live-info">
        <span class="live-title">${s.title}</span>
        <span class="live-host">@${s.host}</span>
      </div>
    </div>`
  ).join("");
}

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
    if (state.type && l.type !== state.type) return false;
    if (!matchesGrade(l)) return false;
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
        <span class="grade-chip ${l.grade === "raw" ? "raw" : ""}">${gradeLabel(l.grade)}</span>
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
    <p class="modal-set">${l.set}</p>
    <div class="modal-meta">
      <span class="modal-tag hl">${gradeLabel(l.grade)}</span>
      <span class="modal-tag">${icon(iconKey(l.cat), "icn-xs")}${cat ? cat.label : ""}</span>
      <span class="modal-tag">${icon(l.type === "vault" ? "lock" : "box", "icn-xs")}${l.type === "vault" ? "Vault" : "Direct"}</span>
      <span class="modal-tag">${icon("eye", "icn-xs")}${viewsLabel(l.views)} views</span>
    </div>
    <div class="modal-price">${money(l.price)}</div>
    <button class="btn-buy" data-soon>Buy Now</button>
    ${mine ? `<button class="btn-ghost btn-danger" data-remove="${l.dbId}">Remove my listing</button>` : ""}`;
  $("modalOverlay").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  $("modalOverlay").hidden = true;
  document.body.style.overflow = "";
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
    const card = e.target.closest(".listing-card");
    if (card) openModal(card.dataset.id);
  });

  $("modalClose").addEventListener("click", closeModal);
  $("modalOverlay").addEventListener("click", (e) => {
    if (e.target === $("modalOverlay")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeModal(); closeOverlay("authOverlay"); closeOverlay("sellOverlay"); }
  });

  $("allListingsLink").addEventListener("click", (e) => {
    e.preventDefault();
    state.cat = "";
    renderCategories();
    renderGrid();
  });
  $("logoLink").addEventListener("click", (e) => e.preventDefault());

  document.body.addEventListener("click", (e) => {
    const soon = e.target.closest("[data-soon]");
    if (soon) {
      e.preventDefault();
      toast("Coming soon — live shows drop with v2");
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
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = $("authEmail").value.trim();
  const password = $("authPassword").value;
  const err = $("authError");
  err.hidden = true;
  $("authSubmit").disabled = true;
  try {
    const { error } = authMode === "signin"
      ? await supa.auth.signInWithPassword({ email, password })
      : await supa.auth.signUp({ email, password });
    if (error) throw error;
    closeOverlay("authOverlay");
    toast(authMode === "signin" ? "Welcome back" : "Account created — welcome to GradeHouse");
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
    let imgUrl = null;
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
    updateAuthUI();
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
  ["authOverlay", "sellOverlay"].forEach((id) =>
    $(id).addEventListener("click", (e) => { if (e.target === $(id)) closeOverlay(id); })
  );

  $("modalBody").parentElement.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    btn.disabled = true;
    const { error } = await supa.from("listings").delete().eq("id", btn.dataset.remove);
    if (!error) {
      closeModal();
      toast("Listing removed");
      await loadDbListings();
    } else {
      btn.disabled = false;
      toast("Couldn't remove listing");
    }
  });

  loadDbListings();
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
    el.innerHTML = `<h3>${cards.length} card${cards.length === 1 ? "" : "s"} found</h3>` + cards.map((c, i) => `
      <div class="scan-hit">
        <img src="${cropCard(frame, c.box).toDataURL("image/jpeg", 0.8)}" alt="">
        <div class="scan-hit-info">
          <div class="scan-hit-title">${c.title}</div>
          <div class="scan-hit-sub">${c.set_name} · ${gradeLabel(c.grade)}</div>
        </div>
        <span class="scan-hit-price">~${money(c.price_estimate)}</span>
        <button class="btn-sell-hit" data-scan-sell="${i}">Sell</button>
      </div>`).join("");
  }
  el.hidden = false;
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
  $("scanAttach").hidden = true;
}

function initScanner() {
  $("scanLink").addEventListener("click", (e) => { e.preventDefault(); openScanner(); });
  $("sellScanBtn").addEventListener("click", () => { closeOverlay("sellOverlay"); openScanner(); });
  $("scanClose").addEventListener("click", closeScanner);
  $("scanCapture").addEventListener("click", captureScan);
  $("scanAgain").addEventListener("click", resetScanner);
  $("scanAttachClear").addEventListener("click", clearScanAttach);
  $("scanResults").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-scan-sell]");
    if (btn) sellFromScan(Number(btn.dataset.scanSell));
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
}

init();
