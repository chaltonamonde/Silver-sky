// Silver Sky Events — Standalone Interactive Application Logic
import { 
  CASE_STUDIES, 
  PACKAGES_DATA, 
  INFRASTRUCTURE_CATALOG, 
  REGIONS_DATA, 
  GOOGLE_PROFILE, 
  GOOGLE_REVIEWS_DATA, 
  FB_POSTS 
} from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initPortfolio();
  initQuoteCalculator();
  initPackages();
  initRegionalHubs();
  initReviews();
  initMpesaModal();
  initMetaModal();
  initWhatsAppWidget();
});

/* ==========================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================== */
function initNavbar() {
  const header = document.querySelector('.header-main');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  mobileToggle?.addEventListener('click', () => {
    mobileDrawer?.classList.toggle('active');
  });

  // Close drawer on link click
  mobileDrawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
    });
  });
}

/* ==========================================================
   2. HERO SLIDER
   ========================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-dot');
  const titleEl = document.getElementById('hero-spotlight-title');
  const catEl = document.getElementById('hero-spotlight-category');
  const venueEl = document.getElementById('hero-spotlight-venue');
  const countEl = document.getElementById('hero-slide-counter');

  const slideData = [
    {
      title: 'The Celestial Glass Pavilion',
      category: 'Clear-Span German Marquee • 600 Guests',
      venue: 'Windsor Golf Hotel & Country Club, Nairobi',
      badge: 'Luxury Wedding Production'
    },
    {
      title: 'East Africa Digital Innovation Gala',
      category: 'Curved P3.9 LED & Line Array Audio',
      venue: 'Radisson Blu Hotel, Upper Hill Nairobi',
      badge: 'Enterprise Corporate Summit'
    },
    {
      title: 'Swahili Coast Coral Moon Wedding',
      category: 'Barefoot Luxury & Water-Sealed Rigging',
      venue: 'The Sands at Nomad, Diani Beach Coast',
      badge: 'Destination Wedding'
    },
    {
      title: 'The Great Rift Valley Sunset Soirée',
      category: 'Wind-Engineered Dome & Live Fire Pits',
      venue: 'Enashipai Resort & Spa, Lake Naivasha',
      badge: 'Private Golden Jubilee'
    }
  ];

  let currentIdx = 0;
  let autoPlayTimer;

  function setSlide(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    
    if (slideData[idx]) {
      if (titleEl) titleEl.textContent = slideData[idx].title;
      if (catEl) catEl.textContent = slideData[idx].category;
      if (venueEl) venueEl.textContent = slideData[idx].venue;
      if (countEl) countEl.textContent = `0${idx + 1} / 0${slides.length}`;
    }
    currentIdx = idx;
  }

  function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
      const next = (currentIdx + 1) % slides.length;
      setSlide(next);
    }, 6000);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(autoPlayTimer);
      setSlide(idx);
      startAutoPlay();
    });
  });

  startAutoPlay();
}

/* ==========================================================
   3. PORTFOLIO & CASE STUDY MODAL
   ========================================================== */
function initPortfolio() {
  const container = document.getElementById('portfolio-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let currentCategory = 'All';

  function renderCards() {
    if (!container) return;
    const filtered = currentCategory === 'All' 
      ? CASE_STUDIES 
      : CASE_STUDIES.filter(s => s.category === currentCategory);

    container.innerHTML = filtered.map(study => `
      <div class="glass-royal-card case-card">
        <div class="case-card-img-wrap">
          <img src="${study.heroImage}" alt="${study.title}" loading="lazy">
          <div class="case-card-img-overlay"></div>
          <span style="position: absolute; top: 1rem; left: 1rem; background: rgba(44,62,80,0.85); border: 1px solid var(--border); color: var(--accent); font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 6px; text-transform: uppercase;">
            ${study.category}
          </span>
          <div style="position: absolute; bottom: 0.75rem; left: 1rem; right: 1rem; display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--surface);">
            <span>📍 ${study.venue}</span>
            <span>👥 ${study.guests} Guests</span>
          </div>
        </div>

        <div class="case-card-body">
          <div>
            <h3 class="case-title">${study.title}</h3>
            <p class="case-tagline" style="margin-top: 0.5rem;">${study.tagline}</p>
          </div>

          <div style="padding-top: 1rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.75rem; color: var(--slate-400);">Host: <strong style="color: var(--ink);">${study.client.name}</strong></span>
            <button class="btn-read-case" data-id="${study.id}" style="color: var(--candlelight-amber); font-weight: 700; font-size: 0.8125rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>Read Story</span> →
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click handlers to "Read Story" buttons
    container.querySelectorAll('.btn-read-case').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const study = CASE_STUDIES.find(s => s.id === id);
        if (study) openCaseStudyModal(study);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderCards();
    });
  });

  renderCards();
}

function openCaseStudyModal(study) {
  const modal = document.getElementById('case-study-modal');
  const content = document.getElementById('case-study-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Hero Banner -->
      <div style="position: relative; height: 320px; border-radius: var(--radius-lg); overflow: hidden;">
        <img src="${study.heroImage}" alt="${study.title}" style="width: 100%; height: 100%; object-fit: cover;">
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(44,62,80,0.85) 100%);"></div>
        <div style="position: absolute; bottom: 1rem; left: 1.5rem; right: 1.5rem; display: flex; justify-content: space-between; align-items: flex-end; color: var(--surface);">
          <div>
            <span class="badge-pill badge-gold" style="margin-bottom: 0.5rem;">${study.category} • ${study.date}</span>
            <h2 class="font-serif" style="font-size: 1.75rem; color: var(--surface);">${study.title}</h2>
            <p style="font-size: 0.875rem; color: rgba(251,248,241,0.85);">📍 ${study.venue} (${study.location}) • 👥 ${study.guests} Guests</p>
          </div>
          <div style="font-size: 0.8125rem; color: var(--surface);">Host: <strong style="color: var(--accent);">${study.client.name}</strong></div>
        </div>
      </div>

      <!-- 3 Pillars -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
        <div style="padding: 1.25rem; border-radius: var(--radius-md); background: var(--surface); border: 1px solid var(--border);">
          <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--sky-deep); margin-bottom: 0.5rem;">1. The Challenge</div>
          <p style="font-size: 0.8125rem; color: var(--ink-muted);">${study.narrative.challenge}</p>
        </div>
        <div style="padding: 1.25rem; border-radius: var(--radius-md); background: var(--surface); border: 1px solid var(--border);">
          <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--candlelight-amber); margin-bottom: 0.5rem;">2. Creative Styling</div>
          <p style="font-size: 0.8125rem; color: var(--ink-muted);">${study.narrative.concept}</p>
        </div>
        <div style="padding: 1.25rem; border-radius: var(--radius-md); background: var(--surface); border: 1px solid var(--border);">
          <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--sky-deep); margin-bottom: 0.5rem;">3. Execution & Result</div>
          <p style="font-size: 0.8125rem; color: var(--ink-muted);">${study.narrative.outcome}</p>
        </div>
      </div>

      <!-- Infrastructure Deployed -->
      <div style="padding: 1.25rem; border-radius: var(--radius-md); background: var(--surface); border: 1px solid var(--border);">
        <h4 class="font-serif" style="font-size: 1.125rem; color: var(--ink); margin-bottom: 0.75rem;">Technical Rigging & Heavy Hardware</h4>
        <ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.5rem; font-size: 0.8125rem; color: var(--ink-muted);">
          ${study.narrative.infrastructure.map(item => `<li>✔ ${item}</li>`).join('')}
        </ul>
      </div>

      <!-- Testimonial Quote -->
      <div style="padding: 1.5rem; border-radius: var(--radius-md); background: var(--sky-soft); border: 1px solid var(--sky);">
        <p class="font-serif" style="font-size: 1.1rem; font-style: italic; color: var(--ink); line-height: 1.6; margin-bottom: 0.75rem;">
          "${study.narrative.testimonial}"
        </p>
        <p style="font-size: 0.8125rem; color: var(--candlelight-amber); font-weight: 700;">
          — ${study.client.name}, ${study.client.role}
        </p>
      </div>

      <!-- Photo Gallery -->
      <div>
        <h4 class="font-serif" style="font-size: 1.125rem; color: var(--ink); margin-bottom: 0.75rem;">Event Photo Gallery</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem;">
          ${study.gallery.map(img => `
            <div style="height: 110px; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border);">
              <img src="${img}" alt="Gallery photo" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Metrics -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center; padding: 1rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md);">
        ${study.metrics.map(m => `
          <div>
            <div class="font-serif" style="font-size: 1.35rem; color: var(--candlelight-amber); font-weight: 700;">${m.value}</div>
            <div style="font-size: 0.7rem; color: var(--slate-400); text-transform: uppercase;">${m.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach prefill action to the bottom button
  const prefillBtn = document.getElementById('case-study-quote-btn');
  if (prefillBtn) {
    prefillBtn.onclick = () => {
      modal.classList.remove('active');
      const venueInput = document.getElementById('calc-venue');
      if (venueInput) venueInput.value = study.venue;
      const targetElement = document.getElementById('quote-estimator');
      if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
    };
  }

  modal.classList.add('active');
}

/* ==========================================================
   4. INTERACTIVE EVENT QUOTE CALCULATOR
   ========================================================== */
function initQuoteCalculator() {
  const eventTypeBtns = document.querySelectorAll('.type-select-btn');
  const guestSlider = document.getElementById('calc-guests');
  const guestDisplay = document.getElementById('calc-guest-display');
  const guestBadge = document.getElementById('calc-guest-badge');
  const regionSelect = document.getElementById('calc-region');
  const venueInput = document.getElementById('calc-venue');
  const dateInput = document.getElementById('calc-date');
  const infraChecks = document.querySelectorAll('.infra-check-card');
  const budgetBtns = document.querySelectorAll('.budget-btn');

  // Outputs
  const totalDisplay = document.getElementById('calc-total-display');
  const depositDisplay = document.getElementById('calc-deposit-display');
  const sumEvent = document.getElementById('sum-event');
  const sumGuests = document.getElementById('sum-guests');
  const sumDate = document.getElementById('sum-date');
  const sumLocation = document.getElementById('sum-location');
  const sumAddons = document.getElementById('sum-addons');
  
  // CTAs
  const btnWhatsApp = document.getElementById('calc-btn-whatsapp');
  const btnMpesa = document.getElementById('calc-btn-mpesa');

  let currentBaseKES = 480000;
  let currentEventTypeLabel = 'Luxury Wedding';
  let guestCount = 250;
  let selectedBudget = 'KES 850,000 – KES 1,800,000';
  let selectedAddons = ['clear_marquee', 'chandeliers', 'audio_array', 'generators'];

  const addonPrices = {
    clear_marquee: 350000,
    chandeliers: 180000,
    audio_array: 150000,
    led_wall: 220000,
    vip_lounge: 160000,
    generators: 95000
  };

  const addonNames = {
    clear_marquee: 'German Clear-Span Dome Marquee',
    chandeliers: 'Crystal Chandeliers & Overhead Canopies',
    audio_array: 'Concert Line-Array Audio & Speech Mics',
    led_wall: 'Curved P3.9 High-Refresh LED Video Wall',
    vip_lounge: 'Royal Velvet & Gold Lounge Furniture',
    generators: 'Dual Synchronized Silent Generator Banks'
  };

  function recalculate() {
    const guestFactor = Math.max(1, guestCount / 100);
    const addonSum = selectedAddons.reduce((sum, id) => sum + (addonPrices[id] || 0), 0);
    
    // Core calculation formula
    const total = Math.round((currentBaseKES * (1 + (guestFactor - 1) * 0.35) + addonSum) / 10000) * 10000;
    const deposit = Math.round(total * 0.4);

    if (totalDisplay) totalDisplay.textContent = `KES ${total.toLocaleString()}`;
    if (depositDisplay) depositDisplay.textContent = `KES ${deposit.toLocaleString()}`;
    if (guestDisplay) guestDisplay.textContent = `${guestCount} Guests`;
    if (guestBadge) guestBadge.textContent = `${guestCount} Pax`;

    if (sumEvent) sumEvent.textContent = currentEventTypeLabel;
    if (sumGuests) sumGuests.textContent = `${guestCount} Guests`;
    if (sumDate) sumDate.textContent = dateInput?.value || 'Pending Selection';
    if (sumLocation) sumLocation.textContent = venueInput?.value || regionSelect?.value?.split(' ')[0] || 'Nairobi';
    if (sumAddons) sumAddons.textContent = `${selectedAddons.length} Selected`;

    if (btnMpesa) {
      btnMpesa.setAttribute('data-amount', deposit);
      btnMpesa.setAttribute('data-package', `${currentEventTypeLabel} (${guestCount} Guests)`);
      btnMpesa.textContent = `Lock Date with M-Pesa Deposit (KES ${deposit.toLocaleString()})`;
    }

    return { total, deposit };
  }

  // Event Type click
  eventTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      eventTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBaseKES = Number(btn.getAttribute('data-base'));
      currentEventTypeLabel = btn.querySelector('.type-label')?.textContent || 'Event';
      recalculate();
    });
  });

  // Guest Slider
  guestSlider?.addEventListener('input', (e) => {
    guestCount = Number(e.target.value);
    recalculate();
  });

  // Date and Venue inputs
  dateInput?.addEventListener('change', recalculate);
  venueInput?.addEventListener('input', recalculate);
  regionSelect?.addEventListener('change', recalculate);

  // Addon Checkbox toggles
  infraChecks.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      card.classList.toggle('checked');
      if (card.classList.contains('checked')) {
        if (!selectedAddons.includes(id)) selectedAddons.push(id);
      } else {
        selectedAddons = selectedAddons.filter(item => item !== id);
      }
      recalculate();
    });
  });

  // Budget buttons
  budgetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      budgetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedBudget = btn.textContent.trim();
    });
  });

  // WhatsApp Dispatch button
  btnWhatsApp?.addEventListener('click', () => {
    const { total, deposit } = recalculate();
    const clientName = document.getElementById('calc-name')?.value || 'Valued Client';
    const clientPhone = document.getElementById('calc-phone')?.value || 'Not provided';
    const notes = document.getElementById('calc-notes')?.value || 'None';
    const targetDate = dateInput?.value || 'Tentative 2026/2027';
    const venue = venueInput?.value || 'To Be Finalized';
    const region = regionSelect?.value || 'Nairobi';

    const selectedServiceNames = selectedAddons.map(id => addonNames[id] || id).join(', ');

    const text = 
      `*New Event Quotation Request — Silver Sky Events*\n` +
      `--------------------------------------\n` +
      `*Client:* ${clientName}\n` +
      `*Phone:* ${clientPhone}\n` +
      `*Event Type:* ${currentEventTypeLabel}\n` +
      `*Target Date:* ${targetDate}\n` +
      `*Estimated Guests:* ${guestCount} Pax\n` +
      `*Region / County:* ${region}\n` +
      `*Proposed Venue:* ${venue}\n` +
      `*Services Requested:* ${selectedServiceNames}\n` +
      `*Budget Bracket:* ${selectedBudget}\n` +
      `*Estimated Cost:* KES ${total.toLocaleString()} (Deposit: KES ${deposit.toLocaleString()})\n` +
      `*Special Notes:* ${notes}\n` +
      `--------------------------------------\n` +
      `Please provide formal date availability and full itemized rate card.`;

    window.open(`https://wa.me/254700123456?text=${encodeURIComponent(text)}`, '_blank');
  });

  // Trigger M-Pesa from Calculator
  btnMpesa?.addEventListener('click', () => {
    const amount = Number(btnMpesa.getAttribute('data-amount')) || 540000;
    const pkg = btnMpesa.getAttribute('data-package') || 'Luxury Event Deposit';
    openMpesaModal(pkg, amount);
  });

  recalculate();
}

/* ==========================================================
   5. PACKAGES & EQUIPMENT CATALOG
   ========================================================== */
function initPackages() {
  const container = document.getElementById('packages-grid');
  const catalogContainer = document.getElementById('infrastructure-catalog-grid');
  const tabBtns = document.querySelectorAll('.package-tab-btn');
  let currentCategory = 'Weddings';

  function renderPackages() {
    if (!container) return;
    const filtered = PACKAGES_DATA.filter(p => p.category === currentCategory);

    container.innerHTML = filtered.map(pkg => {
      const isFeatured = pkg.badge === 'Most Popular';
      return `
        <div class="glass-royal-card package-card ${isFeatured ? 'featured' : ''}">
          ${isFeatured ? '<div class="popular-ribbon">★ Most Requested Package</div>' : ''}
          
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--candlelight-amber);">${pkg.targetAudience}</span>
              <span style="font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.5rem; background: var(--sky-soft); border: 1px solid var(--sky); border-radius: 4px; color: var(--sky-deep);">${pkg.guestCapacity}</span>
            </div>

            <h3 class="font-serif" style="font-size: 1.75rem; color: var(--ink); margin-bottom: 0.5rem;">${pkg.name}</h3>
            <p style="font-size: 0.8125rem; color: var(--ink-muted); line-height: 1.6; margin-bottom: 1.5rem;">${pkg.description}</p>

            <div style="padding: 1rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 1.25rem;">
              <span style="font-size: 0.7rem; color: var(--slate-400); text-transform: uppercase; font-weight: 600; display: block;">Starting Baseline</span>
              <span class="font-serif text-gold-gradient" style="font-size: 2.25rem; font-weight: 700;">${pkg.formattedPrice}</span>
              <span style="display: block; font-size: 0.75rem; color: var(--emerald-500); font-weight: 600; margin-top: 0.25rem;">
                40% Date Hold Deposit: KES ${pkg.depositAmountKES.toLocaleString()}
              </span>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--ink); display: block; margin-bottom: 0.5rem;">Included Services:</span>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.8125rem; color: var(--ink-muted);">
                ${pkg.inclusions.map(inc => `<li style="display: flex; gap: 0.5rem; align-items: flex-start;"><span style="color: var(--candlelight-amber);">✔</span> <span>${inc}</span></li>`).join('')}
              </ul>
            </div>

            <div>
              <span style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--cobalt-400); display: block; margin-bottom: 0.35rem;">Rigging & Tech Spec:</span>
              <div style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.75rem; color: var(--slate-400);">
                ${pkg.equipmentDetails.map(eq => `<div>• ${eq}</div>`).join('')}
              </div>
            </div>
          </div>

          <div style="margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.75rem;">
            <button class="btn btn-emerald btn-lock-pkg" data-pkg="${pkg.name}" data-amount="${pkg.depositAmountKES}">
              Lock Date with M-Pesa Deposit
            </button>
            <button class="btn btn-glass btn-inquire-pkg" data-pkg="${pkg.name}" data-price="${pkg.formattedPrice}">
              Inquire via WhatsApp
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach actions to buttons inside package cards
    container.querySelectorAll('.btn-lock-pkg').forEach(btn => {
      btn.addEventListener('click', () => {
        const pkg = btn.getAttribute('data-pkg');
        const amount = Number(btn.getAttribute('data-amount'));
        openMpesaModal(pkg, amount);
      });
    });

    container.querySelectorAll('.btn-inquire-pkg').forEach(btn => {
      btn.addEventListener('click', () => {
        const pkg = btn.getAttribute('data-pkg');
        const price = btn.getAttribute('data-price');
        const text = `*Inquiry: ${pkg} (${price})*\nHello Silver Sky Events, I am interested in booking the *${pkg}* package. Please verify 2026/2027 date availability and provide the complete contract terms.`;
        window.open(`https://wa.me/254700123456?text=${encodeURIComponent(text)}`, '_blank');
      });
    });

    // Render equipment catalog if infrastructure is active
    const catalogSection = document.getElementById('catalog-strip');
    if (catalogSection) {
      if (currentCategory === 'Infrastructure') {
        catalogSection.style.display = 'block';
        if (catalogContainer) {
          catalogContainer.innerHTML = INFRASTRUCTURE_CATALOG.map(item => `
            <div class="glass-royal-card" style="overflow: hidden;">
              <div style="height: 160px; overflow: hidden; position: relative;">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(44,62,80,0.85) 100%);"></div>
                <span style="position: absolute; bottom: 0.75rem; left: 1rem; color: var(--surface); font-weight: 700; font-size: 0.875rem;">${item.name}</span>
              </div>
              <div style="padding: 1rem; font-size: 0.8125rem; color: var(--slate-400);">
                <p>${item.specs}</p>
                <div style="margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--candlelight-amber); font-weight: 700;">${item.startingAt}</span>
                  <a href="#quote-estimator" style="color: var(--sky-deep); font-weight: 600;">Add to Quote →</a>
                </div>
              </div>
            </div>
          `).join('');
        }
      } else {
        catalogSection.style.display = 'none';
      }
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-tab');
      renderPackages();
    });
  });

  renderPackages();
}

/* ==========================================================
   6. REGIONAL LANDING HUBS
   ========================================================== */
function initRegionalHubs() {
  const tabBtns = document.querySelectorAll('.region-tab-btn');
  const imgEl = document.getElementById('regional-img');
  const badgeEl = document.getElementById('regional-badge');
  const depotEl = document.getElementById('regional-depot');
  const timeEl = document.getElementById('regional-timeline');
  const coverageEl = document.getElementById('regional-coverage');
  const headlineEl = document.getElementById('regional-headline');
  const subheadEl = document.getElementById('regional-subhead');
  const descEl = document.getElementById('regional-desc');
  const highlightsEl = document.getElementById('regional-highlights');
  const venuesEl = document.getElementById('regional-venues');
  const priceNoteEl = document.getElementById('regional-pricenote');
  const visitBtn = document.getElementById('regional-visit-btn');

  function setHub(hub) {
    if (imgEl) imgEl.src = hub.heroImage;
    if (badgeEl) badgeEl.textContent = hub.badge;
    if (depotEl) depotEl.textContent = hub.localFleet.depot;
    if (timeEl) timeEl.textContent = hub.localFleet.transportTimeline;
    if (coverageEl) coverageEl.textContent = `Coverage: ${hub.coverageCounties.join(' • ')}`;
    if (headlineEl) headlineEl.textContent = hub.headline;
    if (subheadEl) subheadEl.textContent = hub.subheadline;
    if (descEl) descEl.textContent = hub.description;
    if (priceNoteEl) priceNoteEl.textContent = hub.startingPriceNote;
    if (visitBtn) visitBtn.textContent = `Book ${hub.name.split(' ')[0]} Site Visit`;

    if (highlightsEl) {
      highlightsEl.innerHTML = hub.regionalHighlights.map(h => `
        <div style="padding: 0.85rem; border-radius: var(--radius-md); background: var(--surface); border: 1px solid var(--border);">
          <div style="font-size: 0.8125rem; font-weight: 700; color: var(--candlelight-amber); margin-bottom: 0.25rem;">✔ ${h.title}</div>
          <p style="font-size: 0.75rem; color: var(--ink-muted);">${h.description}</p>
        </div>
      `).join('');
    }

    if (venuesEl) {
      venuesEl.innerHTML = hub.popularVenues.map(v => `
        <div style="padding: 0.75rem; border-radius: var(--radius-sm); background: var(--surface); border: 1px solid var(--border); font-size: 0.8125rem;">
          <div style="font-weight: 700; color: var(--ink);">${v.name}</div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--slate-400); margin-top: 0.25rem;">
            <span>${v.neighborhood}</span>
            <span style="color: var(--candlelight-amber);">${v.capacity}</span>
          </div>
        </div>
      `).join('');
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.getAttribute('data-hub');
      const hub = REGIONS_DATA.find(h => h.id === id);
      if (hub) setHub(hub);
    });
  });

  if (REGIONS_DATA[0]) setHub(REGIONS_DATA[0]);
}

/* ==========================================================
   7. REVIEWS CAROUSEL
   ========================================================== */
function initReviews() {
  const container = document.getElementById('reviews-grid');
  const prevBtn = document.getElementById('rev-prev-btn');
  const nextBtn = document.getElementById('rev-next-btn');

  let startIndex = 0;

  function renderReviews() {
    if (!container) return;
    const slice = [
      GOOGLE_REVIEWS_DATA[startIndex % GOOGLE_REVIEWS_DATA.length],
      GOOGLE_REVIEWS_DATA[(startIndex + 1) % GOOGLE_REVIEWS_DATA.length],
      GOOGLE_REVIEWS_DATA[(startIndex + 2) % GOOGLE_REVIEWS_DATA.length],
    ];

    container.innerHTML = slice.map(rev => `
      <div class="glass-royal-card review-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div style="color: var(--candlelight-amber); font-size: 0.875rem;">★★★★★</div>
            <span style="font-size: 0.75rem; color: var(--slate-500);">${rev.timeAgo}</span>
          </div>
          <p style="font-size: 0.875rem; color: var(--ink); line-height: 1.6; font-style: italic;">
            "${rev.reviewText}"
          </p>
        </div>

        <div style="padding-top: 1rem; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 0.75rem;">
          <img src="${rev.avatar}" alt="${rev.authorName}" class="avatar-img">
          <div>
            <div style="font-size: 0.875rem; font-weight: 700; color: var(--ink);">${rev.authorName} <span title="Verified Client" style="color: var(--emerald-500);">✔</span></div>
            <div style="font-size: 0.75rem; color: var(--candlelight-amber);">${rev.authorRole}</div>
            <div style="font-size: 0.7rem; color: var(--slate-400); margin-top: 0.2rem;">📍 ${rev.venue}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  prevBtn?.addEventListener('click', () => {
    startIndex = (startIndex - 1 + GOOGLE_REVIEWS_DATA.length) % GOOGLE_REVIEWS_DATA.length;
    renderReviews();
  });

  nextBtn?.addEventListener('click', () => {
    startIndex = (startIndex + 1) % GOOGLE_REVIEWS_DATA.length;
    renderReviews();
  });

  renderReviews();
}

/* ==========================================================
   8. SAFARICOM DARAJA M-PESA DEPOSIT GATEWAY MODAL
   ========================================================== */
let globalMpesaState = {
  package: 'Royal Opulence Wedding (40% Deposit)',
  amount: 540000,
  phone: '0712345678',
  clientName: '',
  timerSeconds: 30,
  timerInterval: null
};

export function openMpesaModal(pkgName, amount) {
  const modal = document.getElementById('mpesa-modal');
  if (!modal) return;

  if (pkgName) globalMpesaState.package = pkgName;
  if (amount) globalMpesaState.amount = amount;

  const pkgInput = document.getElementById('mpesa-pkg-input');
  const amountInput = document.getElementById('mpesa-amount-input');
  const btnTrigger = document.getElementById('mpesa-trigger-btn');

  if (pkgInput) pkgInput.value = globalMpesaState.package;
  if (amountInput) amountInput.value = globalMpesaState.amount;
  if (btnTrigger) btnTrigger.textContent = `Trigger M-Pesa STK Push (KES ${globalMpesaState.amount.toLocaleString()})`;

  showMpesaStage('input');
  modal.classList.add('active');
}

function showMpesaStage(stage) {
  document.getElementById('mpesa-stage-input')?.classList.toggle('active', stage === 'input');
  document.getElementById('mpesa-stage-prompt')?.classList.toggle('active', stage === 'prompt');
  document.getElementById('mpesa-stage-processing')?.classList.toggle('active', stage === 'processing');
  document.getElementById('mpesa-stage-success')?.classList.toggle('active', stage === 'success');
}

function initMpesaModal() {
  const modal = document.getElementById('mpesa-modal');
  const closeBtns = modal?.querySelectorAll('.close-modal-btn');
  const form = document.getElementById('mpesa-form');
  const presetBtns = document.querySelectorAll('.mpesa-preset-btn');
  const amountInput = document.getElementById('mpesa-amount-input');
  const btnTrigger = document.getElementById('mpesa-trigger-btn');
  const promptPhoneEl = document.getElementById('mpesa-prompt-phone');
  const promptAmountEl = document.getElementById('mpesa-prompt-amount');
  const btnPinConfirm = document.getElementById('mpesa-confirm-pin-btn');
  const pinInput = document.getElementById('mpesa-pin-input');
  const printBtn = document.getElementById('mpesa-print-receipt-btn');

  // Open triggers across navbar and buttons
  document.querySelectorAll('.open-mpesa-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openMpesaModal('Custom Event Deposit', 100000);
    });
  });

  closeBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.classList.remove('active');
      clearInterval(globalMpesaState.timerInterval);
    });
  });

  // Preset amounts
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = Number(btn.getAttribute('data-val'));
      globalMpesaState.amount = val;
      if (amountInput) amountInput.value = val;
      if (btnTrigger) btnTrigger.textContent = `Trigger M-Pesa STK Push (KES ${val.toLocaleString()})`;
    });
  });

  amountInput?.addEventListener('input', (e) => {
    const val = Number(e.target.value) || 0;
    globalMpesaState.amount = val;
    if (btnTrigger) btnTrigger.textContent = `Trigger M-Pesa STK Push (KES ${val.toLocaleString()})`;
  });

  // Form Submit -> STK Prompt
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const phoneInput = document.getElementById('mpesa-phone-input');
    const nameInput = document.getElementById('mpesa-name-input');
    const pkgInput = document.getElementById('mpesa-pkg-input');

    globalMpesaState.phone = phoneInput?.value || '0712345678';
    globalMpesaState.clientName = nameInput?.value || 'Valued Client';
    globalMpesaState.package = pkgInput?.value || 'Event Production';

    if (promptPhoneEl) promptPhoneEl.textContent = globalMpesaState.phone;
    if (promptAmountEl) promptAmountEl.textContent = `KES ${globalMpesaState.amount.toLocaleString()}`;

    showMpesaStage('prompt');

    // Countdown
    globalMpesaState.timerSeconds = 30;
    const timerEl = document.getElementById('mpesa-countdown');
    clearInterval(globalMpesaState.timerInterval);
    globalMpesaState.timerInterval = setInterval(() => {
      globalMpesaState.timerSeconds--;
      if (timerEl) timerEl.textContent = `${globalMpesaState.timerSeconds}s`;
      if (globalMpesaState.timerSeconds <= 0) {
        clearInterval(globalMpesaState.timerInterval);
        alert('STK push prompt expired. Please try again.');
        showMpesaStage('input');
      }
    }, 1000);
  });

  // Confirm PIN button
  btnPinConfirm?.addEventListener('click', () => {
    clearInterval(globalMpesaState.timerInterval);
    showMpesaStage('processing');

    setTimeout(() => {
      // Generate randomized receipt details
      const receiptNum = 'SSK' + Math.floor(10000000 + Math.random() * 90000000);
      const bookingRef = 'BKG-2026-' + Math.floor(1000 + Math.random() * 9000);
      const timestamp = new Date().toLocaleString();

      document.getElementById('receipt-no').textContent = receiptNum;
      document.getElementById('receipt-ref').textContent = bookingRef;
      document.getElementById('receipt-amount').textContent = `KES ${globalMpesaState.amount.toLocaleString()}`;
      document.getElementById('receipt-phone').textContent = globalMpesaState.phone;
      document.getElementById('receipt-time').textContent = timestamp;
      document.getElementById('receipt-pkg').textContent = `${globalMpesaState.package} (Host: ${globalMpesaState.clientName})`;

      showMpesaStage('success');

      // Trigger Confetti Burst if library is available
      if (typeof window.confetti === 'function') {
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C39348', '#1B4D75', '#047857', '#5B96C2', '#FAF9F6']  /* elevated luxury palette */
        });
      }
    }, 2000);
  });

  // Print Receipt
  printBtn?.addEventListener('click', () => {
    window.print();
  });
}

/* ==========================================================
   9. META FACEBOOK FEED MODAL
   ========================================================== */
function initMetaModal() {
  const modal = document.getElementById('meta-feed-modal');
  const closeBtns = modal?.querySelectorAll('.close-modal-btn');
  const openBtns = document.querySelectorAll('.open-meta-feed-btn');
  const feedGrid = document.getElementById('meta-posts-grid');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.classList.add('active');
      renderFacebookFeed();
    });
  });

  closeBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.classList.remove('active');
    });
  });

  function renderFacebookFeed() {
    if (!feedGrid) return;
    feedGrid.innerHTML = FB_POSTS.map(post => `
      <div class="glass-royal-card" style="overflow: hidden; display: flex; flex-direction: column;">
        <div style="height: 180px; position: relative;">
          <img src="${post.mediaUrl}" alt="Facebook post" style="width: 100%; height: 100%; object-fit: cover;">
          <span style="position: absolute; top: 0.75rem; left: 0.75rem; background: rgba(44,62,80,0.85); border: 1px solid var(--border); color: var(--candlelight-amber); font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;">${post.eventType}</span>
          <span style="position: absolute; bottom: 0.75rem; left: 0.75rem; background: var(--surface); color: var(--sky-deep); border: 1px solid var(--border); font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 4px;">📍 ${post.venueTag}</span>
        </div>
        <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 0.75rem;">
          <p style="font-size: 0.8125rem; color: var(--ink-muted); line-height: 1.5;">${post.message}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 0.5rem; font-size: 0.75rem; color: var(--slate-400);">
            <span>👍 ${post.likes_count} &nbsp; 💬 ${post.comments_count}</span>
            <a href="${post.permalink_url}" target="_blank" rel="noopener noreferrer" style="color: var(--candlelight-amber); font-weight: 600;">Open on FB ↗</a>
          </div>
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================
   10. FLOATING VIP WHATSAPP CONCIERGE
   ========================================================== */
function initWhatsAppWidget() {
  const triggerBtn = document.getElementById('whatsapp-widget-trigger');
  const drawer = document.getElementById('whatsapp-widget-drawer');
  const closeBtn = document.getElementById('whatsapp-drawer-close');
  const customInput = document.getElementById('whatsapp-custom-msg');
  const customSend = document.getElementById('whatsapp-custom-send');
  const promptBtns = document.querySelectorAll('.whatsapp-prompt-btn');

  triggerBtn?.addEventListener('click', () => {
    drawer?.classList.toggle('active');
  });

  closeBtn?.addEventListener('click', () => {
    drawer?.classList.remove('active');
  });

  function sendWhatsApp(text) {
    window.open(`https://wa.me/254700123456?text=${encodeURIComponent(text)}`, '_blank');
    drawer?.classList.remove('active');
    if (customInput) customInput.value = '';
  }

  promptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-msg');
      sendWhatsApp(text);
    });
  });

  customSend?.addEventListener('click', () => {
    const text = customInput?.value || 'Hello Silver Sky Events! I have a question regarding an upcoming event.';
    sendWhatsApp(text);
  });

  customInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const text = customInput.value || 'Hello Silver Sky Events! I have a question regarding an upcoming event.';
      sendWhatsApp(text);
    }
  });
}
