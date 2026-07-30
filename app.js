// Version 1.0.0 JS
// This is App Store JS for Game Stash Official 
// Discord - https://discord.gg/zZefTUAGP
const SUPABASE_URL = 'https://ajwgubxrevbipsvwabnb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_yc6QGTvxDWFULjJgqSv6_g_4E1__TIa';
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

let storeApps = [];
let currentSortedApps = [];
let displayedCount = 10;
let isBouncing = false;
let currentDetailedApp = null;
let currentLatestVersion = null;
let installedApps = JSON.parse(localStorage.getItem('stash_installed_apps') || '{}');

let currentSlideIndex = 0;
let slideProgressFrame = null;
let slideStartTime = null;
const SLIDE_DURATION_MS = 5000; 

function showView(viewId) {
  const wrapper = document.getElementById('page-wrapper');
  if (!wrapper) return;

  wrapper.classList.add('page-blur-active');

  setTimeout(() => {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(viewId);
    if (target) target.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (viewId === 'home-page-view') {
      const activeTab = document.querySelector('.tab-btn.active') || document.querySelector('.tab-btn');
      if (activeTab) {
        const catName = activeTab.textContent.trim();
        if (catName.includes('All')) setCategory('All', activeTab);
      }
    } else {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.add('inactive');
        btn.classList.remove('active');
      });
    }

    wrapper.classList.remove('page-blur-active');
  }, 300);
}

async function initApp() {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from('apps').select('*');
      if (!error && data) {
        storeApps = data;
      }
    } catch (err) {
      console.error('Data fetch failed:', err);
    }
  }

  currentSortedApps = [...storeApps];
  renderServingHotNow();
  handleSortChange('alphabetical');
  initSlideshowDots();
}

function generateAppCardHTML(app) {
  const isInstalled = !!installedApps[app.id];

  return `
    <div onclick="openAppDetails(${app.id})" class="group umbrel-card flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-[20px] sm:rounded-[24px] cursor-pointer hover:scale-[1.01] active:scale-[0.98] transition-all duration-200">
      <div class="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-[18px] sm:rounded-[22px] overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-lg bg-white/5 relative">
        <img src="${app.img || ''}" class="w-full h-full object-cover" alt="${app.name || 'App'}" />
        ${isInstalled ? '<span class="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black/80 shadow-[0_0_8px_#34d399]"></span>' : ''}
      </div>
      <div class="flex flex-col justify-center min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h3 class="font-bold text-xs sm:text-sm md:text-base text-white truncate group-hover:text-purple-300 transition-colors">${app.name || 'Untitled App'}</h3>
          ${isInstalled ? '<span class="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Installed</span>' : ''}
        </div>
        <p class="text-[11px] sm:text-xs text-gray-400 font-medium mt-0.5">${app.category || 'App'}</p>
        <p class="text-[10px] sm:text-[11px] md:text-xs text-gray-300 font-normal mt-1 leading-snug line-clamp-2">${app.description || ''}</p>
      </div>
    </div>
  `;
}

function setCategory(cat, element) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.textContent.toLowerCase().includes(cat.toLowerCase())) {
      btn.classList.remove('inactive');
      btn.classList.add('active');
    } else {
      btn.classList.add('inactive');
      btn.classList.remove('active');
    }
  });

  const banner = document.getElementById('hero-banner-section');
  const slideshow = document.getElementById('slideshow-section');
  const hotNow = document.getElementById('serving-hot-section');

  if (cat === 'All') {
    if (banner) banner.classList.remove('hidden');
    if (slideshow) slideshow.classList.remove('hidden');
    if (hotNow) hotNow.classList.remove('hidden');
  } else {
    if (banner) banner.classList.add('hidden');
    if (slideshow) slideshow.classList.add('hidden');
    if (hotNow) hotNow.classList.add('hidden');
  }

  currentSortedApps = cat === 'All' 
    ? [...storeApps] 
    : storeApps.filter(a => a.category && a.category.toLowerCase().includes(cat.toLowerCase()));

  const titleEl = document.getElementById('home-grid-title');
  if (titleEl) titleEl.innerText = cat === 'All' ? 'All apps' : `${cat} Apps`;

  displayedCount = 10;
  renderAllAppsGrid();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderServingHotNow() {
  const grid = document.getElementById('serving-hot-grid');
  if (!grid) return;

  if (storeApps.length === 0) {
    grid.innerHTML = '<p class="text-xs text-gray-500 col-span-full py-4 text-center">No apps currently available in database.</p>';
    return;
  }

  const top7 = [...storeApps].sort((a, b) => (b.downloads || 0) - (a.downloads || 0)).slice(0, 7);

  grid.innerHTML = top7.map(app => `
    <div onclick="openAppDetails(${app.id})" class="flex flex-col items-center cursor-pointer group">
      <div class="w-full aspect-square rounded-[18px] sm:rounded-[24px] overflow-hidden shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200 bg-white/5">
        <img src="${app.img || ''}" class="w-full h-full object-cover" alt="${app.name || 'App'}">
      </div>
      <div class="mt-2 text-center w-full px-1">
        <h3 class="font-bold text-[11px] sm:text-xs md:text-sm text-white truncate group-hover:text-purple-300 transition-colors">${app.name || ''}</h3>
        <p class="text-[10px] sm:text-[11px] text-gray-400 font-medium mt-0.5">${app.category || 'App'}</p>
      </div>
    </div>
  `).join('');
}

function renderAllAppsGrid() {
  const grid = document.getElementById('all-apps-grid');
  const endText = document.getElementById('end-feed-text');
  if (!grid) return;

  if (currentSortedApps.length === 0) {
    grid.innerHTML = '<p class="text-xs text-gray-500 col-span-full py-8 text-center">No apps found for this category.</p>';
    if (endText) endText.classList.add('hidden');
    return;
  }

  const itemsToRender = currentSortedApps.slice(0, displayedCount);
  grid.innerHTML = itemsToRender.map(app => generateAppCardHTML(app)).join('');

  if (displayedCount >= currentSortedApps.length) {
    if (endText) endText.classList.remove('hidden');
  } else {
    if (endText) endText.classList.add('hidden');
  }
}

function handleSortChange(sortType) {
  currentSortedApps = [...storeApps];
  if (sortType === 'alphabetical') {
    currentSortedApps.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  } else if (sortType === 'downloads') {
    currentSortedApps.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  } else if (sortType === 'likes') {
    currentSortedApps.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  } else if (sortType === 'newest') {
    currentSortedApps.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }

  displayedCount = 10;
  renderAllAppsGrid();
}

window.addEventListener('scroll', () => {
  const homeView = document.getElementById('home-page-view');
  if (!homeView || homeView.classList.contains('hidden')) return;

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 220) {
    if (displayedCount < currentSortedApps.length) {
      displayedCount += 10;
      renderAllAppsGrid();
    } else if (!isBouncing) {
      isBouncing = true;
      const grid = document.getElementById('all-apps-grid');
      if (grid) {
        grid.classList.add('bounce-recoil');
        setTimeout(() => {
          grid.classList.remove('bounce-recoil');
          isBouncing = false;
        }, 600);
      }
    }
  }
});

function initSlideshowDots() {
  const track = document.getElementById('slideshow-track');
  const dotsContainer = document.getElementById('dots-container');
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.carousel-card');
  if (cards.length > 0) {
    dotsContainer.innerHTML = Array.from(cards).map((_, i) => `
      <button 
        onclick="manualSlideSelect(${i})" 
        class="slide-dot-btn relative h-2 sm:h-2.5 rounded-full bg-white/20 overflow-hidden transition-all duration-300 cursor-pointer ${i === 0 ? 'w-8 sm:w-10 active-dot' : 'w-2 sm:w-2.5'}"
      >
        <div class="progress-fill absolute inset-y-0 left-0 bg-white rounded-full w-0"></div>
      </button>
    `).join('');
  }

  startSlideTimer();
}

function startSlideTimer() {
  stopSlideTimer();
  slideStartTime = performance.now();
  updateSlideProgress();
}

function stopSlideTimer() {
  if (slideProgressFrame) {
    cancelAnimationFrame(slideProgressFrame);
    slideProgressFrame = null;
  }
}

function updateSlideProgress(timestamp) {
  if (!slideStartTime) slideStartTime = timestamp || performance.now();
  const elapsed = (timestamp || performance.now()) - slideStartTime;
  const progressPercent = Math.min(100, (elapsed / SLIDE_DURATION_MS) * 100);

  const activeProgressFill = document.querySelector('.slide-dot-btn.active-dot .progress-fill');
  if (activeProgressFill) {
    activeProgressFill.style.width = `${progressPercent}%`;
  }

  if (elapsed >= SLIDE_DURATION_MS) {
    nextSlide();
  } else {
    slideProgressFrame = requestAnimationFrame(updateSlideProgress);
  }
}

function updateDotsUI(targetIndex) {
  document.querySelectorAll('.slide-dot-btn').forEach((dot, idx) => {
    const fill = dot.querySelector('.progress-fill');
    if (idx === targetIndex) {
      dot.className = 'slide-dot-btn active-dot relative h-2 sm:h-2.5 rounded-full bg-white/20 overflow-hidden transition-all duration-300 cursor-pointer w-8 sm:w-10';
      if (fill) fill.style.width = '0%';
    } else {
      dot.className = 'slide-dot-btn relative h-2 sm:h-2.5 rounded-full bg-white/20 overflow-hidden transition-all duration-300 cursor-pointer w-2 sm:w-2.5';
      if (fill) fill.style.width = '0%';
    }
  });
}

function scrollToSlide(index) {
  const track = document.getElementById('slideshow-track');
  if (!track) return;
  const cards = track.querySelectorAll('.carousel-card');
  if (!cards.length) return;

  const targetIndex = (index + cards.length) % cards.length;
  currentSlideIndex = targetIndex;

  track.scrollTo({
    left: cards[targetIndex].offsetLeft - track.offsetLeft,
    behavior: 'smooth'
  });

  updateDotsUI(targetIndex);
}

function manualSlideSelect(index) {
  scrollToSlide(index);
  startSlideTimer();
}

function nextSlide() {
  const cards = document.querySelectorAll('.carousel-card');
  if (!cards.length) return;
  const nextIdx = (currentSlideIndex + 1) % cards.length;
  scrollToSlide(nextIdx);
  startSlideTimer();
}

function prevSlide() {
  const cards = document.querySelectorAll('.carousel-card');
  if (!cards.length) return;
  const prevIdx = (currentSlideIndex - 1 + cards.length) % cards.length;
  scrollToSlide(prevIdx);
  startSlideTimer();
}

function handleSearchSuggestions(query) {
  const popup = document.getElementById('search-suggestions');
  if (!popup) return;

  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) {
    popup.classList.add('hidden');
    popup.innerHTML = '';
    return;
  }

  const matches = storeApps.filter(app => 
    (app.name && app.name.toLowerCase().includes(cleanQuery)) ||
    (app.category && app.category.toLowerCase().includes(cleanQuery))
  ).slice(0, 5);

  if (matches.length === 0) {
    popup.classList.add('hidden');
    popup.innerHTML = '';
    return;
  }

  popup.innerHTML = matches.map(app => `
    <div onclick="openAppDetails(${app.id}); hideSearchSuggestions();" class="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer transition-colors">
      <img src="${app.img || ''}" class="w-8 h-8 rounded-lg object-cover bg-white/5 shrink-0" />
      <div class="min-w-0 flex-1">
        <h4 class="text-xs font-bold text-white truncate">${app.name || ''}</h4>
        <p class="text-[10px] text-gray-400 font-medium">${app.category || 'App'}</p>
      </div>
    </div>
  `).join('');

  popup.classList.remove('hidden');
}

function hideSearchSuggestions() {
  const popup = document.getElementById('search-suggestions');
  if (popup) popup.classList.add('hidden');
}

function handleSearch(e) {
  if (e) e.preventDefault();
  hideSearchSuggestions();

  const desktopInput = document.getElementById('search-input');
  const mobileInput = document.getElementById('mobile-search-input');
  
  const query = ((desktopInput && desktopInput.value) || (mobileInput && mobileInput.value) || '').toLowerCase().trim();
  if (!query) return;

  const queryDisplay = document.getElementById('search-query-display');
  if (queryDisplay) queryDisplay.innerText = query;

  const results = storeApps.filter(a => 
    (a.name && a.name.toLowerCase().includes(query)) || 
    (a.category && a.category.toLowerCase().includes(query)) ||
    (a.description && a.description.toLowerCase().includes(query))
  );

  const grid = document.getElementById('search-results-grid');
  const emptyState = document.getElementById('search-empty-state');

  if (results.length > 0) {
    if (grid) {
      grid.innerHTML = results.map(app => generateAppCardHTML(app)).join('');
      grid.classList.remove('hidden');
    }
    if (emptyState) emptyState.classList.add('hidden');
  } else {
    if (grid) {
      grid.innerHTML = '';
      grid.classList.add('hidden');
    }
    if (emptyState) emptyState.classList.remove('hidden');
  }

  showView('search-page-view');
}

document.addEventListener('click', (e) => {
  const suggestions = document.getElementById('search-suggestions');
  const searchInput = document.getElementById('search-input');
  if (suggestions && searchInput && !suggestions.contains(e.target) && !searchInput.contains(e.target)) {
    hideSearchSuggestions();
  }
});

async function openAppDetails(appId) {
  showView('app-details-view');
  const app = storeApps.find(a => a.id === appId);
  if (!app) return;

  currentDetailedApp = app;

  const detailImg = document.getElementById('detail-app-img');
  if (detailImg) detailImg.src = app.img || '';

  const detailTitle = document.getElementById('detail-app-title');
  if (detailTitle) detailTitle.textContent = app.name || '';

  const downloadBtn = document.getElementById('detail-btn-download');
  if (downloadBtn) downloadBtn.href = app.app_url || '#';

  const statDl = document.getElementById('detail-stat-downloads');
  if (statDl) statDl.textContent = app.downloads !== undefined ? Number(app.downloads).toLocaleString() : '—';

  const statSize = document.getElementById('detail-stat-filesize');
  if (statSize) statSize.textContent = app.file_size || '—';

  const statCat = document.getElementById('detail-stat-category');
  if (statCat) statCat.textContent = app.category || '—';

  const statDev = document.getElementById('detail-stat-developer');
  if (statDev) statDev.textContent = app.developer || '—';

  const statSub = document.getElementById('detail-stat-submittedby');
  if (statSub) statSub.textContent = app.submitted_by || '—';

  const descContent = document.getElementById('detail-desc-content');
  const descWrapper = document.getElementById('detail-desc-wrapper');
  const descBtn = document.getElementById('detail-desc-btn');

  if (descContent && descWrapper && descBtn) {
    descContent.innerHTML = app.description || '';
    descWrapper.classList.add('desc-12-lines');
    descBtn.textContent = 'Read more';

    setTimeout(() => {
      if (descContent.scrollHeight > descWrapper.clientHeight) {
        descBtn.classList.remove('hidden');
      } else {
        descBtn.classList.add('hidden');
        descWrapper.classList.remove('desc-12-lines');
      }
    }, 60);
  }

  const tlContainer = document.getElementById('versions-timeline-container');
  currentLatestVersion = null;

  if (tlContainer) {
    tlContainer.innerHTML = '<div class="absolute left-2.5 top-3 bottom-3 w-[2px] bg-white/10 pointer-events-none"></div>';
    let versions = [];

    if (supabaseClient) {
      try {
        const { data } = await supabaseClient.from('app_versions').select('*').eq('app_id', appId).order('release_date', { ascending: false });
        if (data && data.length > 0) versions = data;
      } catch (e) {}
    }

    if (versions.length > 0) {
      currentLatestVersion = versions[0].version_name;
      versions.forEach((ver, index) => {
        const isLatest = index === 0;
        const dotHTML = isLatest 
          ? `<div class="absolute -left-[23px] top-1.5 flex items-center justify-center">
               <span class="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-white opacity-75"></span>
               <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_12px_#ffffff]"></span>
             </div>`
          : `<div class="absolute -left-[20px] top-1.5 h-2 w-2 rounded-full bg-white/30"></div>`;

        tlContainer.innerHTML += `
          <div class="relative transition-all">
            ${dotHTML}
            <div class="flex items-center justify-between">
              <button onclick="toggleVersionNotes('ver-${ver.id || index}')" class="font-bold text-base text-white hover:text-purple-300 transition-colors cursor-pointer text-left">
                ${ver.version_name || ''}
              </button>
              <span class="text-xs text-gray-400 font-medium">${ver.release_date ? new Date(ver.release_date).toLocaleDateString(undefined, {month:'short', year:'numeric'}) : ''}</span>
            </div>
            <div id="notes-ver-${ver.id || index}" class="mt-2 text-xs text-gray-300 font-normal leading-relaxed hidden">
              ${ver.changelog || ''}
            </div>
          </div>
        `;
      });
    } else {
      tlContainer.innerHTML += `<p class="text-xs text-gray-500">No version history recorded.</p>`;
    }
  }

  updateActionButtons(app);

  const relatedGrid = document.getElementById('related-apps-grid');
  if (relatedGrid) {
    const relatedApps = storeApps.filter(x => x.category === app.category && x.id !== appId).slice(0, 3);
    if (relatedApps.length > 0) {
      relatedGrid.innerHTML = relatedApps.map(rApp => generateAppCardHTML(rApp)).join('');
    } else {
      relatedGrid.innerHTML = '<p class="text-xs text-gray-500 w-full col-span-full">No related apps found.</p>';
    }
  }
}

function updateActionButtons(app) {
  const isInstalled = !!installedApps[app.id];
  const downloadContainer = document.getElementById('detail-download-container');
  const downloadTooltip = document.getElementById('detail-download-tooltip');
  const downloadIcon = document.getElementById('detail-download-icon');

  const stashBtnText = document.getElementById('detail-stash-btn-text');
  const stashBtnIcon = document.getElementById('detail-stash-btn-icon');
  const stashTooltip = document.getElementById('detail-stash-tooltip');
  const stashBtn = document.getElementById('detail-btn-stash');

  if (isInstalled) {
    if (stashBtnText) stashBtnText.textContent = 'Uninstall';
    if (stashTooltip) stashTooltip.textContent = 'Uninstall App';
    if (stashBtn) {
      stashBtn.className = 'w-full h-12 sm:h-14 rounded-[18px] sm:rounded-[22px] bg-red-500/20 text-red-400 border border-red-500/30 font-extrabold text-xs sm:text-sm md:text-base hover:bg-red-500/30 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer';
    }
    if (stashBtnIcon) {
      stashBtnIcon.innerHTML = '<path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/>';
    }

    const installedVer = installedApps[app.id].version;
    const hasUpdate = currentLatestVersion && installedVer && currentLatestVersion !== installedVer;

    if (hasUpdate && downloadContainer) {
      downloadContainer.classList.remove('hidden');
      if (downloadTooltip) downloadTooltip.textContent = 'Update';
      if (downloadIcon) {
        downloadIcon.innerHTML = '<path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-width="2.5"/>';
      }
    } else if (downloadContainer) {
      downloadContainer.classList.add('hidden');
    }

  } else {
    if (stashBtnText) stashBtnText.textContent = 'Add to Stash';
    if (stashTooltip) stashTooltip.textContent = 'Add to Stash';
    if (stashBtn) {
      stashBtn.className = 'w-full h-12 sm:h-14 rounded-[18px] sm:rounded-[22px] bg-white text-black font-extrabold text-xs sm:text-sm md:text-base hover:bg-gray-200 transition-all active:scale-95 shadow-[0_4px_24px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 cursor-pointer';
    }
    if (stashBtnIcon) {
      stashBtnIcon.innerHTML = '<path d="M12 4v16m8-8H4" stroke-width="3"/>';
    }

    if (downloadContainer) {
      downloadContainer.classList.remove('hidden');
      if (downloadTooltip) downloadTooltip.textContent = 'Download';
      if (downloadIcon) {
        downloadIcon.innerHTML = '<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2.5"/>';
      }
    }
  }
}

function toggleAppInstall() {
  if (!currentDetailedApp) return;

  const appId = currentDetailedApp.id;
  if (installedApps[appId]) {
    delete installedApps[appId];
  } else {
    installedApps[appId] = {
      installed_at: new Date().toISOString(),
      version: currentLatestVersion || '1.0.0'
    };
  }

  localStorage.setItem('stash_installed_apps', JSON.stringify(installedApps));
  updateActionButtons(currentDetailedApp);
  renderAllAppsGrid();
}

function toggleDescription() {
  const descWrapper = document.getElementById('detail-desc-wrapper');
  const descBtn = document.getElementById('detail-desc-btn');
  if (descWrapper && descBtn) {
    if (descWrapper.classList.contains('desc-12-lines')) {
      descWrapper.classList.remove('desc-12-lines');
      descBtn.textContent = 'Read less';
    } else {
      descWrapper.classList.add('desc-12-lines');
      descBtn.textContent = 'Read more';
    }
  }
}

function toggleVersionNotes(verKey) {
  const notes = document.getElementById(`notes-${verKey}`);
  if (notes) notes.classList.toggle('hidden');
}

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const topNavRow = document.getElementById('top-nav-row');
  const heroBannerImg = document.getElementById('hero-banner-img');

  if (window.scrollY > 20) {
    if (topNavRow) {
      topNavRow.classList.add('h-0', 'opacity-0', 'pointer-events-none');
      topNavRow.classList.remove('h-14', 'md:h-16', 'opacity-100');
    }
    if (navbar) {
      navbar.classList.remove('nav-at-top');
      navbar.classList.add('nav-scrolled');
    }
  } else {
    if (topNavRow) {
      topNavRow.classList.remove('h-0', 'opacity-0', 'pointer-events-none');
      topNavRow.classList.add('h-14', 'md:h-16', 'opacity-100');
    }
    if (navbar) {
      navbar.classList.remove('nav-scrolled');
      navbar.classList.add('nav-at-top');
    }
  }

  if (heroBannerImg && !document.getElementById('home-page-view').classList.contains('hidden')) {
    heroBannerImg.style.transform = `scale(${Math.max(1.0, 1.15 - (window.scrollY / 1200))})`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    document.body.style.overflow = '';
    const startupOverlay = document.getElementById('startup-overlay');
    if (startupOverlay) {
      startupOverlay.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => startupOverlay.remove(), 300);
    }
  }, 1020);

  initApp();
});