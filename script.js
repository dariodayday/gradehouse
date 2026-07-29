// ── GradeHouse ──────────────────────────────────────────────
// All data + helpers defined first; init() runs at the bottom.

const CATEGORIES = [
  { key: "",         label: "All",      icon: "✨" },
  { key: "hockey",   label: "Hockey",   icon: "🏒" },
  { key: "basketball", label: "Basketball", icon: "🏀" },
  { key: "baseball", label: "Baseball", icon: "⚾" },
  { key: "football", label: "Football", icon: "🏈" },
  { key: "pokemon",  label: "Pokémon",  icon: "⚡" },
  { key: "comics",   label: "Comics",   icon: "💥" },
  { key: "coins",    label: "Coins",    icon: "🪙" },
  { key: "toys",     label: "Toys",     icon: "🤖" },
  { key: "sneakers", label: "Sneakers", icon: "👟" },
  { key: "watches",  label: "Watches",  icon: "⌚" },
];

// Sample listings — swap for Supabase rows later.
const LISTINGS = [
  { id: 1,  title: "Connor Bedard Rookie", set: "2023 Upper Deck Young Guns", cat: "hockey",     grade: "10",  type: "vault",  price: 899,  views: 412, emoji: "🏒", g: ["#0f2027", "#2c5364"] },
  { id: 2,  title: "Wayne Gretzky", set: "1979 O-Pee-Chee #18", cat: "hockey",       grade: "8",   type: "vault",  price: 12500, views: 980, emoji: "🐐", g: ["#232526", "#414345"] },
  { id: 3,  title: "Victor Wembanyama RC", set: "2023 Prizm Silver", cat: "basketball", grade: "10", type: "direct", price: 1450, views: 630, emoji: "🏀", g: ["#42275a", "#734b6d"] },
  { id: 4,  title: "Michael Jordan", set: "1996 Topps Chrome", cat: "basketball",   grade: "9",   type: "vault",  price: 2100, views: 845, emoji: "🕊️", g: ["#8e0e00", "#1f1c18"] },
  { id: 5,  title: "Shohei Ohtani RC", set: "2018 Topps Chrome", cat: "baseball",   grade: "10",  type: "direct", price: 780,  views: 300, emoji: "⚾", g: ["#134e5e", "#71b280"] },
  { id: 6,  title: "Charizard Holo", set: "1999 Base Set Unlimited", cat: "pokemon", grade: "9",  type: "vault",  price: 3200, views: 1500, emoji: "🔥", g: ["#f12711", "#f5af19"] },
  { id: 7,  title: "Pikachu Illustrator Promo", set: "Reprint Celebration", cat: "pokemon", grade: "raw", type: "direct", price: 145, views: 220, emoji: "⚡", g: ["#fceabb", "#f8b500"] },
  { id: 8,  title: "Amazing Fantasy #15 Facsimile", set: "Marvel 2022 Reprint", cat: "comics", grade: "10", type: "direct", price: 95, views: 130, emoji: "🕷️", g: ["#870000", "#190a05"] },
  { id: 9,  title: "The Incredible Hulk #181", set: "Marvel 1974", cat: "comics",  grade: "8",   type: "vault",  price: 4800, views: 720, emoji: "💚", g: ["#11998e", "#38ef7d"] },
  { id: 10, title: "1oz Gold Maple Leaf", set: "Royal Canadian Mint 2024", cat: "coins", grade: "raw", type: "direct", price: 3350, views: 95, emoji: "🪙", g: ["#b8860b", "#3a2c02"] },
  { id: 11, title: "Silver Dollar Morgan 1885", set: "US Mint, graded MS", cat: "coins", grade: "9", type: "vault", price: 410, views: 150, emoji: "🇺🇸", g: ["#606c88", "#3f4c6b"] },
  { id: 12, title: "LEGO UCS Millennium Falcon", set: "75192 — Sealed", cat: "toys", grade: "raw", type: "direct", price: 1100, views: 340, emoji: "🚀", g: ["#0f0c29", "#302b63"] },
  { id: 13, title: "1st Gen Optimus Prime", set: "1984 Hasbro AFA", cat: "toys",   grade: "8",   type: "vault",  price: 2600, views: 275, emoji: "🤖", g: ["#c31432", "#240b36"] },
  { id: 14, title: "Jordan 1 Chicago '85", set: "OG Pair, Size 10", cat: "sneakers", grade: "raw", type: "vault", price: 18500, views: 1900, emoji: "👟", g: ["#ed213a", "#93291e"] },
  { id: 15, title: "Nike Mag Back to the Future", set: "2016 Auto-lace", cat: "sneakers", grade: "raw", type: "vault", price: 32000, views: 2400, emoji: "🛹", g: ["#41295a", "#2f0743"] },
  { id: 16, title: "Rolex Submariner Hulk", set: "116610LV — Full set", cat: "watches", grade: "raw", type: "vault", price: 21500, views: 1100, emoji: "⌚", g: ["#093028", "#237a57"] },
  { id: 17, title: "Omega Speedmaster Moonwatch", set: "Hesalite, box + papers", cat: "watches", grade: "raw", type: "direct", price: 6800, views: 520, emoji: "🌙", g: ["#141e30", "#243b55"] },
  { id: 18, title: "Sidney Crosby RC", set: "2005 Upper Deck Young Guns", cat: "hockey", grade: "9", type: "direct", price: 3900, views: 860, emoji: "🐧", g: ["#000428", "#004e92"] },
  { id: 19, title: "Umbreon VMAX Alt Art", set: "Evolving Skies", cat: "pokemon",  grade: "10",  type: "direct", price: 1250, views: 990, emoji: "🌘", g: ["#20002c", "#cbb4d4"] },
  { id: 20, title: "Tom Brady Rookie", set: "2000 Bowman Chrome", cat: "football", grade: "9",   type: "vault",  price: 8900, views: 1300, emoji: "🏈", g: ["#3a1c71", "#d76d77"] },
];

const state = { cat: "", type: "", grade: "", q: "", sort: "newest" };

const $ = (id) => document.getElementById(id);

function money(n) {
  return "$" + n.toLocaleString("en-CA");
}

function gradeLabel(g) {
  return g === "raw" ? "RAW" : "PSA " + g;
}

function renderCategories() {
  $("catRow").innerHTML = CATEGORIES.map(
    (c) => `<button class="cat-pill ${state.cat === c.key ? "active" : ""}" data-cat="${c.key}">
      <span>${c.icon}</span>${c.label}</button>`
  ).join("");
}

function filtered() {
  let items = LISTINGS.filter((l) => {
    if (state.cat && l.cat !== state.cat) return false;
    if (state.type && l.type !== state.type) return false;
    if (state.grade && l.grade !== state.grade) return false;
    if (state.q) {
      const q = state.q.toLowerCase();
      if (!(l.title + " " + l.set).toLowerCase().includes(q)) return false;
    }
    return true;
  });
  if (state.sort === "price_asc") items.sort((a, b) => a.price - b.price);
  else if (state.sort === "price_desc") items.sort((a, b) => b.price - a.price);
  else if (state.sort === "popular") items.sort((a, b) => b.views - a.views);
  else items.sort((a, b) => b.id - a.id);
  return items;
}

function renderGrid() {
  const items = filtered();
  $("resultCount").textContent = items.length + " listing" + (items.length === 1 ? "" : "s");
  $("emptyState").hidden = items.length > 0;
  $("listingGrid").innerHTML = items.map(
    (l) => `<div class="listing-card" data-id="${l.id}">
      <div class="listing-img" style="background:linear-gradient(135deg,${l.g[0]},${l.g[1]})">
        <span class="listing-badge ${l.type}">${l.type}</span>
        <span class="grade-chip ${l.grade === "raw" ? "raw" : ""}">${gradeLabel(l.grade)}</span>
        ${l.emoji}
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
  const l = LISTINGS.find((x) => x.id === id);
  if (!l) return;
  const cat = CATEGORIES.find((c) => c.key === l.cat);
  $("modalBody").innerHTML = `
    <div class="modal-img" style="background:linear-gradient(135deg,${l.g[0]},${l.g[1]})">${l.emoji}</div>
    <h3>${l.title}</h3>
    <p class="modal-set">${l.set}</p>
    <div class="modal-meta">
      <span class="modal-tag hl">${gradeLabel(l.grade)}</span>
      <span class="modal-tag">${cat ? cat.icon + " " + cat.label : ""}</span>
      <span class="modal-tag">${l.type === "vault" ? "🔒 Vault" : "📦 Direct"}</span>
      <span class="modal-tag">👁 ${l.views.toLocaleString()} views</span>
    </div>
    <div class="modal-price">${money(l.price)}</div>
    <button class="btn-buy" data-soon>Buy Now</button>`;
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
    if (card) openModal(Number(card.dataset.id));
  });

  $("modalClose").addEventListener("click", closeModal);
  $("modalOverlay").addEventListener("click", (e) => {
    if (e.target === $("modalOverlay")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
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
      toast("Coming soon 👀");
    }
  });
}

function init() {
  renderCategories();
  renderGrid();
  bindEvents();
}

init();
