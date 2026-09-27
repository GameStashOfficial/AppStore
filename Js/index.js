var SUPABASE_URL = "https://ajwgubxrevbipsvwabnb.supabase.co";
var SUPABASE_KEY = "sb_publishable_yc6QGTvxDWFULjJgqSv6_g_4E1__TIa";
var APP_CATEGORIES = ["ai", "files & productivity", "social"];
var AUTH_KEY = "stash_account";
var PRO_KEY = "stash_pro";
var sbHeaders = { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY, "Content-Type": "application/json" };

var gamesData = {};
var favorites = JSON.parse(localStorage.getItem('stash_favorites')) || [];
var currentGameId = null;
var currentTabFilter = 'home';
var filteredGamesList = [];
var currentRenderIndex = 0;
var RENDER_BATCH_SIZE = 24;
var intersectionObserver = null;
var searchTimer = null;
var gameLoadTimer = null;
var authMode = 'signup';
var homeAdPushed = false;
var gridAdPushed = false;

function $(id) { return document.getElementById(id); }
function isPro() { return localStorage.getItem(PRO_KEY) === 'true'; }
function hideAdSlots() { document.querySelectorAll('.ad-slot').forEach(function(el){ el.style.display = 'none'; }); }

// if adsense cant fill a slot it leaves a giant blank box, kill it
function watchAdSlot(slotId) {
  var slot = $(slotId);
  if (!slot) return;
  setTimeout(function() {
    if (!slot.querySelector('iframe')) slot.style.display = 'none';
  }, 3500);
}

function pushHomeAd() {
  if (homeAdPushed || isPro()) return;
  homeAdPushed = true;
  (window.adsbygoogle = window.adsbygoogle || []).push({});
  watchAdSlot('home-ad');
}

function pushGridAd() {
  if (gridAdPushed || isPro()) return;
  gridAdPushed = true;
  (window.adsbygoogle = window.adsbygoogle || []).push({});
  watchAdSlot('grid-ad');
}

function setActiveNav(key) {
  document.querySelectorAll('.nav-item, .bnav-item').forEach(function(el){ el.classList.remove('active'); });
  var s = $('nav-' + key), b = $('bnav-' + key);
  if (s) s.classList.add('active');
  if (b) b.classList.add('active');
}

var currentTheme = localStorage.getItem('stash_theme') || 'dark';
document.body.setAttribute('data-theme', currentTheme);
var ts = $('theme-selector');
ts.value = currentTheme;
if (ts.selectedIndex < 0) { currentTheme = 'dark'; ts.value = 'dark'; localStorage.setItem('stash_theme', 'dark'); }

var cloakTitle = localStorage.getItem('stash_cloak_title') || "new tab";
 $('page-title').innerText = cloakTitle;
 $('cloak-input').value = cloakTitle === "new tab" ? "" : cloakTitle;
 $('panic-input').value = localStorage.getItem('stash_panic_key') || "";

// favicon / tab icon
var TAB_ICONS = {
  none: "",
  docs: "https://stash-files.b-cdn.net/Images/Stash%20OS%20-%20Falcon/docs.png",
  classroom: "https://stash-files.b-cdn.net/Images/Stash%20OS%20-%20Falcon/classroom.jpg",
  ixl: "https://stash-files.b-cdn.net/Images/Stash%20OS%20-%20Falcon/ixl.png",
  powerschool: "https://stash-files.b-cdn.net/Images/Stash%20OS%20-%20Falcon/powerschool.png",
  drive: "https://www.google.com/s2/favicons?domain=drive.google.com&sz=64",
  gmail: "https://www.google.com/s2/favicons?domain=mail.google.com&sz=64"
};

function applyTabIcon(k) {
  var l = $('favicon');
  if (!l) return;
  if (TAB_ICONS[k]) l.setAttribute('href', TAB_ICONS[k]);
  else l.removeAttribute('href');
  // chrome sometimes caches the old icon hard, bump nothing we can do besides reload
}

var tabIcon = localStorage.getItem('stash_tab_icon') || 'none';
applyTabIcon(tabIcon);

// playtime ticker, saves every 5s so a crash doesnt eat the whole session
var playSecs = parseInt(localStorage.getItem('stash_playtime') || '0', 10) || 0;

function fmtTime(s) {
  var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h > 0) return h + "h " + m + "m " + sec + "s";
  if (m > 0) return m + "m " + sec + "s";
  return sec + "s";
}

setInterval(function() {
  playSecs++;
  if (playSecs % 5 === 0) localStorage.setItem('stash_playtime', String(playSecs));
  var pv = $('playTimeVal');
  if (pv) pv.innerText = fmtTime(playSecs);
}, 1000);

window.addEventListener('beforeunload', function(){ localStorage.setItem('stash_playtime', String(playSecs)); });
document.addEventListener('visibilitychange', function(){ if (document.hidden) localStorage.setItem('stash_playtime', String(playSecs)); });

function isTyping() {
  var el = document.activeElement;
  if (!el) return false;
  var id = el.id;
  return id === "auth-username" || id === "auth-password" || id === "cloak-input" || id === "panic-input" || id === "page-search-input" || id === "pro-key-input";
}

window.addEventListener('keydown', function(e) {
  var pk = localStorage.getItem('stash_panic_key');
  if (pk && e.key.toLowerCase() === pk.toLowerCase() && !isTyping()) {
    window.location.replace("https://login.classlink.com/my/cedarhill");
  }
});

var phrases = ["Version 2.0", "axel sucks at games", "W site", "check out the chat in settings"];
setInterval(function(){ $('wobble-text').innerText = phrases[Math.floor(Math.random() * phrases.length)]; }, 5000);
 $('wobble-text').innerText = phrases[Math.floor(Math.random() * phrases.length)];

function showAnnouncement() { if (localStorage.getItem('stash_v2.0_seen') !== 'true') $('announcement-modal-overlay').style.display = 'flex'; }
function closeAnnouncement() { localStorage.setItem('stash_v2.0_seen', 'true'); $('announcement-modal-overlay').style.display = 'none'; }
function showSocials() { if (localStorage.getItem('stash_socials_dismissed') !== 'true') $('social-modal-overlay').style.display = 'flex'; }
function closeSocials() { localStorage.setItem('stash_socials_dismissed', 'true'); $('social-modal-overlay').style.display = 'none'; }

function getSavedAccount() { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch (e) { return null; } }
function authAlert(msg, ok) { var b = $('auth-alert'); b.innerText = msg; b.className = ok ? 'auth-alert active success' : 'auth-alert active'; }
function authHideAlert() { var b = $('auth-alert'); b.className = 'auth-alert'; b.innerText = ''; }

function setAuthMode(m) {
  authMode = m;
  if (m === 'login') {
    $('auth-title').innerText = 'Log In';
    $('auth-submit').innerText = 'Log In';
    $('auth-username').placeholder = 'Enter username';
    $('auth-toggle').innerHTML = 'Need an account? <strong>Sign Up</strong>';
  } else {
    $('auth-title').innerText = 'Sign Up';
    $('auth-submit').innerText = 'Sign Up';
    $('auth-username').placeholder = 'Choose a username';
    $('auth-toggle').innerHTML = 'Already have an account? <strong>Log In</strong>';
  }
}

function isNameBad(inputName) {
  if (!inputName) return false;
  var str = inputName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  var leetMap = { '0':'o','1':'i','!':'i','|':'i','3':'e','4':'a','@':'a','5':'s','$':'s','7':'t','+':'t','8':'b','9':'g','v':'u','u':'v','w':'vv','z':'s' };
  var mapped = '';
  for (var c in str) mapped += leetMap[str[c]] || str[c];
  var cleaned = mapped.replace(/[^a-z0-9]/g, '');
  var collapsed = cleaned.replace(/(.)\1+/g, '$1');
  var badPatterns = [
    /hitler/i,/nazi/i,/swastika/i,/kkk/i,/himmler/i,/goebbels/i,/holocaust/i,/gestapo/i,/aryan/i,/supremac/i,/klan/i,/fuhrer/i,/mein kampf/i,
    /nigg/i,/niga/i,/nig/i,/fag/i,/faggot/i,/retard/i,/kike/i,/chink/i,/spic/i,/wetback/i,/coon/i,/gook/i,/tranny/i,/dyke/i,/towelhead/i,
    /paki/i,/kipp/i,/shemale/i,/niglet/i,/wog/i,/raghead/i,/beaner/i,/jap/i,/golliwog/i,/kraut/i,/polack/i,/zipperhead/i,/gypsy/i,
    /fuck/i,/shit/i,/cunt/i,/bitch/i,/bastard/i,/whore/i,/slut/i,/asshole/i,/motherfuck/i,/bullshit/i,/jackass/i,/dipshit/i,/piss/i,
    /dick/i,/cock/i,/pussy/i,/penis/i,/vagina/i,/clit/i,/dildo/i,/tit/i,/tits/i,/titties/i,/boob/i,/cum/i,/ejaculat/i,/jizz/i,/semen/i,
    /orgasm/i,/porn/i,/hentai/i,/sex/i,/nsfw/i,/anal/i,/anus/i,/fetish/i,/milf/i,/blowjob/i,/handjob/i,/deepthroat/i,/rimjob/i,
    /erotic/i,/intercourse/i,/masturbat/i,/suckmydick/i,/eatpussy/i,/bukkake/i,/creampie/i,/bondage/i,/scat/i,/threesome/i,
    /rape/i,/rapist/i,/pedo/i,/paedo/i,/pedophile/i,/molest/i,/incest/i,/behead/i,/killall/i,/terrorist/i,/isis/i,/jihad/i,/bomb/i,
    /suicide/i,/schoolshoot/i,/murder/i,/massacre/i,/genocide/i,/columbine/i,/torture/i,/meth/i,/cocaine/i,/heroine/i
  ];
  for (var i = 0; i < badPatterns.length; i++) {
    if (badPatterns[i].test(str) || badPatterns[i].test(mapped) || badPatterns[i].test(cleaned) || badPatterns[i].test(collapsed)) return true;
  }
  return false;
}

function handleUsernameBlur() {
  if (authMode !== 'signup') return;
  var u = $('auth-username'), v = u.value.trim();
  if (v.length === 0) { u.classList.remove('invalid'); authHideAlert(); return; }
  if (v.length < 3 || isNameBad(v)) { u.classList.add('invalid'); authAlert('Username is invalid'); }
  else { u.classList.remove('invalid'); if ($('auth-alert').innerText === 'Username is invalid') authHideAlert(); }
}

async function handleAuth(event) {
  event.preventDefault();
  var name = $('auth-username').value.trim(), pass = $('auth-password').value;
  if (authMode === 'signup' && $('auth-username').classList.contains('invalid')) { authAlert('Username is invalid'); return; }
  var btn = $('auth-submit');
  btn.disabled = true;
  try {
    if (authMode === 'signup') {
      var check = await fetch(SUPABASE_URL + "/rest/v1/accounts?select=username&username=eq." + encodeURIComponent(name), { headers: sbHeaders });
      var existing = await check.json();
      if (existing && existing.length > 0) { $('auth-username').classList.add('invalid'); authAlert('Username is already taken. Try another one.'); return; }
      var res = await fetch(SUPABASE_URL + "/rest/v1/accounts", { method: "POST", headers: Object.assign({}, sbHeaders, { "Prefer": "return=minimal" }), body: JSON.stringify({ username: name, password: pass }) });
      if (!res.ok) { authAlert('Failed to create account. Try again.'); return; }
      localStorage.setItem(AUTH_KEY, JSON.stringify({ username: name, password: pass }));
      finishAuth();
    } else {
      var q = "select=*&username=eq." + encodeURIComponent(name) + "&password=eq." + encodeURIComponent(pass);
      var res2 = await fetch(SUPABASE_URL + "/rest/v1/accounts?" + q, { headers: sbHeaders });
      var data = await res2.json();
      if (!res2.ok || !data || data.length === 0) { authAlert('Incorrect username or password.'); return; }
      localStorage.setItem(AUTH_KEY, JSON.stringify({ username: name, password: pass }));
      finishAuth();
    }
  } catch (err) {
    authAlert('Something went wrong. Check your connection.');
  } finally { btn.disabled = false; }
}

function finishAuth() { authHideAlert(); $('auth-overlay').style.display = 'none'; showAnnouncement(); showSocials(); }
function showAuthGate() { $('auth-overlay').style.display = 'flex'; }

async function deleteAccount() {
  var acc = getSavedAccount();
  if (acc) {
    try {
      var q = "username=eq." + encodeURIComponent(acc.username) + "&password=eq." + encodeURIComponent(acc.password);
      await fetch(SUPABASE_URL + "/rest/v1/accounts?" + q, { method: "DELETE", headers: sbHeaders });
    } catch (e) { console.error(e); }
  }
  localStorage.removeItem(AUTH_KEY);
  $('auth-username').value = "";
  $('auth-password').value = "";
  setAuthMode('signup');
  authHideAlert();
  hideAllViews();
  showAuthGate();
}

async function redeemKey() {
  var input = $('pro-key-input'), status = $('key-status'), btn = $('redeem-btn');
  var key = input.value.trim();
  if (!key) { status.innerText = 'Enter a key first.'; status.style.color = '#ff6b6b'; return; }
  btn.disabled = true;
  status.innerText = 'Checking key...';
  status.style.color = 'var(--text-muted)';
  try {
    var res = await fetch(SUPABASE_URL + "/rest/v1/pro_keys?select=*&key=eq." + encodeURIComponent(key), { headers: sbHeaders });
    var rows = await res.json();
    if (!res.ok || !rows || rows.length === 0) { status.innerText = 'Invalid key.'; status.style.color = '#ff6b6b'; return; }
    var row = rows[0];
    var maxUses = (row.max_uses === null || row.max_uses === undefined) ? 1 : row.max_uses;
    var used = row.times_used || 0;
    if (used >= maxUses) { status.innerText = 'This key is all used up.'; status.style.color = '#ff6b6b'; return; }
    var upd = await fetch(SUPABASE_URL + "/rest/v1/pro_keys?key=eq." + encodeURIComponent(key), { method: "PATCH", headers: Object.assign({}, sbHeaders, { "Prefer": "return=minimal" }), body: JSON.stringify({ times_used: used + 1 }) });
    if (!upd.ok) { status.innerText = 'Something went wrong. Try again.'; status.style.color = '#ff6b6b'; return; }
    localStorage.setItem(PRO_KEY, 'true');
    hideAdSlots();
    input.value = "";
    status.innerText = "Key redeemed! You're Pro now.";
    status.style.color = '#30d158';
  } catch (err) {
    status.innerText = 'Connection error. Try again.';
    status.style.color = '#ff6b6b';
  } finally { btn.disabled = false; }
}

async function fetchStashApps() {
  var res = await fetch(SUPABASE_URL + "/rest/v1/apps?select=*&order=id.asc", { headers: sbHeaders });
  if (!res.ok) throw new Error("Supabase request failed");
  var rows = await res.json();
  gamesData = {};
  rows.forEach(function(row) {
    var cat = (row.category || "").toLowerCase().trim();
    gamesData["a" + row.id] = {
      type: APP_CATEGORIES.indexOf(cat) > -1 ? "app" : "game",
      title: row.name, icon: row.img, desc: row.description || "",
      fileUrl: row.app_url, filename: row.name + ".html"
    };
  });
}

function syncStashData() {
  $('loader-overlay').style.display = 'flex';
  hideAllViews();
  fetchStashApps().then(function() {
    $('loader-overlay').style.display = 'none';
    renderHome();
  }).catch(function(e) {
    console.error("Cloud Sync Failed:", e);
    $('loader-overlay').style.display = 'none';
    $('game-grid-container').style.display = 'block';
    setActiveNav('games');
    $('empty-state').style.display = 'block';
    $('empty-title').innerText = "Connection Error";
    $('empty-desc').innerText = "Could not load data from the cloud.";
  });
}

function triggerPageAnimation(id) { var el = $(id); el.classList.remove('page-animate'); void el.offsetWidth; el.classList.add('page-animate'); }

function hideAllViews() {
  $('home-page').style.display = 'none';
  $('game-grid-container').style.display = 'none';
  $('search-page').style.display = 'none';
  $('game-detail').style.display = 'none';
  $('settings-page').style.display = 'none';
  $('play-page').style.display = 'none';
  document.querySelectorAll('.nav-item, .bnav-item').forEach(function(el){ el.classList.remove('active'); });
  document.body.classList.remove('playing');
  clearTimeout(gameLoadTimer);
  $('game-load-overlay').style.display = 'none';
  var iframe = $('game-iframe');
  iframe.removeAttribute('srcdoc');
  iframe.src = "about:blank";
  var banner = $('detail-banner');
  banner.classList.remove('fade-down');
  banner.removeAttribute('src');
}

function loadPage(targetFunction, delay) {
  if (delay === undefined) delay = 300;
  $('loader-overlay').style.display = 'flex';
  hideAllViews();
  setTimeout(function() { $('loader-overlay').style.display = 'none'; targetFunction(); }, delay);
}

function buildCard(id, game, delayIndex) {
  var card = document.createElement('div');
  card.className = 'game-card-wrapper';
  card.style.animationDelay = ((delayIndex % RENDER_BATCH_SIZE) * 0.05) + 's';
  card.onclick = function() { currentGameId = id; loadPage(function(){ showDetail(id); }); };
  card.innerHTML = '<div class="game-title-popup">' + game.title + '</div><div class="game-card"><img loading="lazy" decoding="async" src="' + game.icon + '" onerror="this.src=\'https://cdn.jsdelivr.net/gh/freebuisness/covers@main/default.png\'"></div>';
  return card;
}

function renderHome() {
  currentTabFilter = 'home';
  $('home-page').style.display = 'flex';
  setActiveNav('home');
  triggerPageAnimation('home-page');
  $('main-content').scrollTop = 0;
  pushHomeAd();
  var allGames = [], allApps = [];
  for (var k in gamesData) { (gamesData[k].type === 'app' ? allApps : allGames).push([k, gamesData[k]]); }
  var c = $('home-top-picks');
  c.innerHTML = '';
  var picks = allGames.sort(function(){ return 0.5 - Math.random(); }).slice(0, 2)
    .concat(allApps.sort(function(){ return 0.5 - Math.random(); }).slice(0, 2));
  var frag = document.createDocumentFragment();
  picks.forEach(function(p, i){ frag.appendChild(buildCard(p[0], p[1], i)); });
  c.appendChild(frag);
}

function refreshGrid() {
  filteredGamesList = [];
  for (var k in gamesData) {
    var d = gamesData[k];
    if (currentTabFilter === 'games' && d.type === 'app') continue;
    if (currentTabFilter === 'apps' && d.type !== 'app') continue;
    filteredGamesList.push([k, d]);
  }
  currentRenderIndex = 0;
  var grid = $('game-grid');
  grid.innerHTML = '';
  grid.style.display = 'grid';
  if (filteredGamesList.length === 0) {
    grid.style.display = 'none';
    $('empty-state').style.display = 'block';
    $('empty-title').innerText = "Nothing here yet";
    $('empty-desc').innerText = "Check back later for new additions.";
    return;
  }
  $('empty-state').style.display = 'none';
  renderNextBatch();
  setupInfiniteScroll();
}

function resetAndRenderGrid(filterType) {
  currentTabFilter = filterType;
  $('game-grid-container').style.display = 'block';
  setActiveNav(filterType);
  triggerPageAnimation('game-grid-container');
  $('main-content').scrollTop = 0;
  pushGridAd();
  refreshGrid();
}

function renderNextBatch() {
  var grid = $('game-grid');
  var batch = filteredGamesList.slice(currentRenderIndex, currentRenderIndex + RENDER_BATCH_SIZE);
  if (batch.length) {
    var frag = document.createDocumentFragment();
    batch.forEach(function(b, i){ frag.appendChild(buildCard(b[0], b[1], i)); });
    grid.appendChild(frag);
  }
  currentRenderIndex += batch.length;
}

function setupInfiniteScroll() {
  if (intersectionObserver) intersectionObserver.disconnect();
  var old = $('grid-sentinel');
  if (old) old.remove();
  if (currentRenderIndex >= filteredGamesList.length) return;
  var sentinel = document.createElement('div');
  sentinel.id = 'grid-sentinel';
  sentinel.style.height = '10px';
  $('game-grid-container').appendChild(sentinel);
  intersectionObserver = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      renderNextBatch();
      if (currentRenderIndex >= filteredGamesList.length) { intersectionObserver.disconnect(); sentinel.remove(); }
    }
  }, { root: $('main-content'), rootMargin: '500px' });
  intersectionObserver.observe(sentinel);
}

function renderSearchPage() {
  currentTabFilter = 'search';
  $('search-page').style.display = 'flex';
  setActiveNav('search');
  triggerPageAnimation('search-page');
  $('main-content').scrollTop = 0;
  setTimeout(function(){ try { $('page-search-input').focus(); } catch (e) {} }, 300);
  var q = $('page-search-input').value.trim();
  if (q) runSearch(q);
}

function runSearch(query) {
  var grid = $('search-results'), empty = $('search-empty');
  var q = query.toLowerCase().trim();
  grid.innerHTML = '';
  if (!q) { grid.style.display = 'none'; empty.style.display = 'none'; return; }
  var matches = [];
  for (var k in gamesData) { if (gamesData[k].title.toLowerCase().indexOf(q) > -1) matches.push([k, gamesData[k]]); }
  if (matches.length === 0) { grid.style.display = 'none'; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  grid.style.display = 'grid';
  var frag = document.createDocumentFragment();
  matches.forEach(function(m, i){ frag.appendChild(buildCard(m[0], m[1], i)); });
  grid.appendChild(frag);
}

// long desc gets chopped, click the ... to read it all
function setDesc(t) {
  var box = $('detail-desc');
  if (!t) { box.textContent = ''; return; }
  if (t.length > 170) {
    box.textContent = t.slice(0, 170);
    var d = document.createElement('span');
    d.id = 'descDots';
    d.textContent = ' ...';
    d.onclick = function(){ box.textContent = t; };
    box.appendChild(d);
  } else box.textContent = t;
}

function showDetail(id) {
  var game = gamesData[id];
  if (!game) return;
  currentGameId = id;
  $('game-detail').style.display = 'block';
  triggerPageAnimation('game-detail');
  $('main-content').scrollTop = 0;
  $('detail-title').innerText = game.title;
  setDesc(game.desc);
  var banner = $('detail-banner');
  banner.classList.remove('fade-down');
  banner.src = game.icon;
  void banner.offsetWidth;
  banner.classList.add('fade-down');
  $('favorite-checkbox').checked = favorites.indexOf(id) > -1;
  var wrap = $('download-wrap'), dlBtn = $('download-btn');
  if (game.type === 'app') {
    wrap.classList.add('blocked');
    dlBtn.title = "Downloads unavailable for apps";
    dlBtn.onclick = null;
  } else {
    wrap.classList.remove('blocked');
    dlBtn.title = "Download Source File";
    dlBtn.onclick = function(){ downloadGame(game); };
  }
  var moreGrid = $('more-games-grid');
  moreGrid.innerHTML = '';
  var others = [];
  for (var gid in gamesData) { if (gid !== id && gamesData[gid].type === game.type) others.push([gid, gamesData[gid]]); }
  others.sort(function(){ return 0.5 - Math.random(); });
  var frag = document.createDocumentFragment();
  others.slice(0, 6).forEach(function(o, i){ frag.appendChild(buildCard(o[0], o[1], i)); });
  moreGrid.appendChild(frag);
}

function goBackFromDetail() {
  if (currentTabFilter === 'home') loadPage(function(){ renderHome(); });
  else if (currentTabFilter === 'search') loadPage(function(){ renderSearchPage(); });
  else loadPage(function(){ resetAndRenderGrid(currentTabFilter); });
}

function downloadGame(game) {
  fetch(game.fileUrl).then(function(r){ return r.blob(); }).then(function(blob) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = game.filename || (game.title + '.html');
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  }).catch(function(e){ console.error("Download failed:", e); });
}

function downloadGameFromPlayer() {
  var game = gamesData[currentGameId];
  if (!game || game.type === 'app') return;
  downloadGame(game);
}

// ------- game ad blocker, games only. apps run untouched -------
var AD_HOSTS = ["googlesyndication.com","doubleclick.net","googleadservices.com","adservice.google.com","googletagservices.com","google-analytics.com","googletagmanager.com","2mdn.net","amazon-adsystem.com","adnxs.com","adnxs-simple.com","taboola.com","outbrain.com","criteo.com","criteo.net","pubmatic.com","rubiconproject.com","smartadserver.net","smartadserver.com","moatads.com","media.net","adroll.com","zedo.com","adsrvr.org","adform.net","bidswitch.net","casalemedia.com","openx.net","sharethrough.com","sonobi.com","yieldmo.com","mgid.com","revcontent.com","propellerads.com","popads.net","adcash.com","exoclick.com","juicyads.com","trafficjunky.net","a-ads.com","bitmedia.io","coinzilla.com","cointraffic.io","adsterra.com","hilltopads.net","onclickads.net","popcash.net","adskeeper.com","advertising.com","yieldlab.net","teads.tv","spotxchange.com","springserve.com","serving-sys.com","freewheel.tv","scorecardresearch.com","quantserve.com","adsafeprotected.com","adition.com","aniview.com","adhigh.net","popmyads.com","revenuehits.com","yllix.com"];

var AD_SRC_RX = /(adsbygoogle\.js|pagead2|\/gpt\.js|doubleclick|googlesyndication|adframe|adserver|show_ads|ad-?script|advertisement|ad-?banner\.js|prebid)/i;

function isAdUrl(u) {
  if (!u) return false;
  u = String(u).toLowerCase();
  for (var i = 0; i < AD_HOSTS.length; i++) if (u.indexOf(AD_HOSTS[i]) > -1) return true;
  return false;
}

function stripAdJunk(html) {
  // scripts by src
  html = html.replace(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>\s*<\/script>/gi, function(m, s) {
    return (isAdUrl(s) || AD_SRC_RX.test(s)) ? "" : m;
  });
  // inline ad snippets (adsbygoogle push, googletag, taboola etc)
  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, function(all, attrs, body) {
    if (/\bsrc\s*=/i.test(attrs)) return all;
    if (/adsbygoogle|googletag\.|gpt\.define|_taboola|_outbrain|popads|exoclick|google_ad_|doubleclick|admiral/i.test(body)) return "";
    return all;
  });
  // ins blocks
  html = html.replace(/<ins\b[^>]*>[\s\S]*?<\/ins>/gi, function(m) {
    return /adsbygoogle/i.test(m) ? "" : m;
  });
  // iframes w/ ad src (both open/close and self closing)
  html = html.replace(/<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>[\s\S]*?<\/iframe>/gi, function(m, s) {
    return isAdUrl(s) ? "" : m;
  });
  html = html.replace(/<iframe\b[^>]*\/>/gi, function(m) {
    var m2 = m.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    return (m2 && isAdUrl(m2[1])) ? "" : m;
  });
  // tracking pixels
  html = html.replace(/<img\b[^>]*>/gi, function(m) {
    var s = m.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    var onePx = /\bwidth\s*=\s*["']?1["']?/i.test(m) && /\bheight\s*=\s*["']?1["']?/i.test(m);
    if ((s && isAdUrl(s[1])) || onePx) return "";
    return m;
  });
  return html;
}

function buildAdGuardStub() {
  // runs first thing inside the game iframe, kills everything ad related at runtime too
  return '<script>(function(){' +
  'var H=' + JSON.stringify(AD_HOSTS) + ';' +
  'function bad(u){try{u=String(u).toLowerCase()}catch(e){return false}if(!u)return false;for(var i=0;i<H.length;i++){if(u.indexOf(H[i])>-1)return true}return false}' +
  'window.adsbygoogle={push:function(){},loaded:true};' +
  'try{window.googletag=window.googletag||{cmd:{push:function(){}}}}catch(e){}' +
  'window.gtag=function(){};try{window.dataLayer={push:function(){}}}catch(e){}' +
  'var ce=document.createElement.bind(document);' +
  'document.createElement=function(t){var e=ce(t);' +
  'try{if(t==="script"||t==="iframe"||t==="img"||t==="link"){' +
  'var sa=e.setAttribute.bind(e);' +
  'e.setAttribute=function(n,v){if((n==="src"||n==="href")&&bad(v))return;sa(n,v)};' +
  'Object.defineProperty(e,"src",{set:function(v){if(!bad(v))sa("src",v)},get:function(){return e.getAttribute("src")||""},configurable:true});' +
  '}}catch(x){}' +
  'return e};' +
  'var of=window.fetch;' +
  'if(of){window.fetch=function(u,o){return bad(u)?Promise.reject(new Error("blocked")):of.call(window,u,o)}}' +
  'try{var oo=XMLHttpRequest.prototype.open;' +
  'XMLHttpRequest.prototype.open=function(m,u){this._adblk=bad(u)?1:0;return oo.apply(this,arguments)};' +
  'var os=XMLHttpRequest.prototype.send;' +
  'XMLHttpRequest.prototype.send=function(){if(this._adblk){try{this.abort()}catch(x){}return}return os.apply(this,arguments)}}catch(e){}' +
  'var ow=window.open;' +
  'window.open=function(u,n,f){return bad(u)?null:ow.call(window,u,n,f)};' +
  'var RX=/(^|[^a-z0-9_])(ads?|advert|banner|adzone|sidebarad[0-9]*|ad_?frame|ad_?box|ad_?container|ad_?wrapper|ad_?slot)([^a-z0-9_]|$)/i;' +
  'function hit(n){if(!n||n.nodeType!==1)return false;var t=n.tagName;' +
  'if(t==="INS"&&/adsbygoogle/i.test(String(n.className)))return true;' +
  'var src=(n.getAttribute&&n.getAttribute("src"))||"";' +
  'if((t==="IFRAME"||t==="SCRIPT")&&bad(src))return true;' +
  'if(t==="IMG"&&(bad(src)||(n.width===1&&n.height===1)))return true;' +
  'if(t==="IFRAME"||t==="INS"||t==="DIV"||t==="ASIDE"||t==="A"||t==="SCRIPT"){var s=((n.id||"")+" "+(typeof n.className==="string"?n.className:"")+" "+((n.getAttribute&&n.getAttribute("name"))||""));if(RX.test(s))return true}' +
  'return false}' +
  'function kill(n){if(hit(n)){try{n.remove()}catch(x){try{n.style.display="none"}catch(y){}}}}' +
  'var mo=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;if(a)for(var j=0;j<a.length;j++)kill(a[j])}});' +
  'try{mo.observe(document.documentElement||document.body,{childList:true,subtree:true})}catch(e){}' +
  '})();</script>' +
  '<style>ins.adsbygoogle{display:none!important}#sidebarad1,#sidebarad2,.sidebar-close{display:none!important}</style>';
}

function cleanAds(html, url) {
  var dir = url.substring(0, url.lastIndexOf('/') + 1);
  if (!/<base\s/i.test(html)) {
    if (/<head[^>]*>/i.test(html)) html = html.replace(/<head[^>]*>/i, function(m){ return m + '<base href="' + dir + '">'; });
    else html = '<base href="' + dir + '">' + html;
  }
  html = stripAdJunk(html);
  var guard = buildAdGuardStub();
  if (/<head[^>]*>/i.test(html)) html = html.replace(/<head[^>]*>/i, function(m){ return m + guard; });
  else html = guard + html;
  return html;
}

function launchGame() { loadPage(function(){ launchPlayer(); }); }

function launchPlayer() {
  var game = gamesData[currentGameId];
  if (!game) return;
  document.body.classList.add('playing');
  $('play-page').style.display = 'flex';
  $('play-title').innerText = game.title;
  var dlTop = $('play-download-btn');
  dlTop.classList.toggle('blocked', game.type === 'app');
  dlTop.title = game.type === 'app' ? "Downloads unavailable for apps" : "Download Source File";
  var frame = $('game-iframe');
  frame.removeAttribute('srcdoc');
  if (game.type === 'app') {
    // no blocker for apps, they load as-is
    frame.src = game.fileUrl;
  } else {
    frame.src = "about:blank";
    fetch(game.fileUrl).then(function(r){ if (!r.ok) throw new Error("bad response"); return r.text(); }).then(function(html) {
      frame.srcdoc = cleanAds(html, game.fileUrl);
    }).catch(function() {
      // couldnt fetch (cors?), just load it straight so the game still runs
      frame.removeAttribute('srcdoc');
      frame.src = game.fileUrl;
    });
  }
  showGameLoader();
}

function showGameLoader() {
  var overlay = $('game-load-overlay');
  clearTimeout(gameLoadTimer);
  overlay.style.display = 'flex';
  var dur = isPro() ? (1200 + Math.random() * 600) : (2200 + Math.random() * 1300);
  gameLoadTimer = setTimeout(function(){ overlay.style.display = 'none'; }, dur);
}

function exitGame() { loadPage(function(){ showDetail(currentGameId); }); }
function openGameInNewTab() { var g = gamesData[currentGameId]; if (g) window.open(g.fileUrl, '_blank'); }

function toggleFullscreen() {
  var frame = $('game-iframe');
  if (!document.fullscreenElement) {
    if (frame.requestFullscreen) frame.requestFullscreen().catch(function(){});
  } else document.exitFullscreen();
}

function renderSettings() {
  $('settings-page').style.display = 'block';
  setActiveNav('settings');
  triggerPageAnimation('settings-page');
  $('main-content').scrollTop = 0;
  var sel = $('theme-selector');
  sel.value = currentTheme;
  if (sel.selectedIndex < 0) sel.value = 'dark';
  var pv = $('playTimeVal');
  if (pv) pv.innerText = fmtTime(playSecs);
  var status = $('key-status');
  if (isPro()) { status.innerText = 'Pro is active on this browser.'; status.style.color = '#30d158'; }
  else { status.innerText = ''; status.style.color = 'var(--text-muted)'; }
}

 $('menu-btn').addEventListener('click', function(){ $('side-nav').classList.toggle('minimized'); });

 $('page-search-input').addEventListener('input', function() {
  var v = this.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(function(){ runSearch(v); }, 200);
});

 $('theme-selector').addEventListener('change', function() {
  currentTheme = this.value;
  localStorage.setItem('stash_theme', currentTheme);
  document.body.setAttribute('data-theme', currentTheme);
});

 $('tabIconSel').addEventListener('change', function() {
  tabIcon = this.value;
  localStorage.setItem('stash_tab_icon', tabIcon);
  applyTabIcon(tabIcon);
});

 $('cloak-input').addEventListener('input', function() {
  cloakTitle = this.value.trim() || "new tab";
  localStorage.setItem('stash_cloak_title', cloakTitle);
  $('page-title').innerText = cloakTitle;
});

 $('panic-input').addEventListener('keydown', function(e) {
  e.preventDefault();
  if (e.key === 'Backspace' || e.key === 'Escape') { this.value = ""; localStorage.setItem('stash_panic_key', ""); }
  else if (e.key.length === 1) { this.value = e.key; localStorage.setItem('stash_panic_key', e.key); }
});

 $('favorite-checkbox').addEventListener('change', function() {
  if (!currentGameId) return;
  if (this.checked) { if (favorites.indexOf(currentGameId) === -1) favorites.push(currentGameId); }
  else favorites = favorites.filter(function(f){ return f !== currentGameId; });
  localStorage.setItem('stash_favorites', JSON.stringify(favorites));
});

 $('auth-toggle').addEventListener('click', function() {
  authHideAlert();
  $('auth-username').classList.remove('invalid');
  setAuthMode(authMode === 'signup' ? 'login' : 'signup');
});
 $('auth-username').addEventListener('blur', handleUsernameBlur);
 $('auth-username').addEventListener('input', function(){ this.classList.remove('invalid'); });
 $('auth-form').addEventListener('submit', handleAuth);
 $('delete-account-btn').addEventListener('click', deleteAccount);
 $('redeem-btn').addEventListener('click', redeemKey);
 $('pro-key-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') { e.preventDefault(); redeemKey(); }
});

if (isPro()) hideAdSlots();
syncStashData();

var savedAcc = getSavedAccount();
if (savedAcc && savedAcc.username) { showAnnouncement(); showSocials(); }
else { setAuthMode('signup'); showAuthGate(); }