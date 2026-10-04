// Silver Sky Events — Executive Operations & Admin Application Logic (Comprehensive Control Suite)

import {
  INITIAL_LEADS,
  INITIAL_TRANSACTIONS,
  INITIAL_INVENTORY,
  INITIAL_CALENDAR,
  REGIONAL_SEO_DATA,
  INITIAL_PACKAGES_CRUD,
  INITIAL_PORTFOLIO_UPLOADS,
  MONTHLY_RECOVERY_DATA,
  FUNNEL_STAGES
} from './admin-data.js';

// State Management with LocalStorage Persistence
const STORAGE_PREFIX = 'silver_sky_admin_';

function loadState(key, fallback) {
  try {
    const saved = localStorage.getItem(STORAGE_PREFIX + key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveState(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error', e);
  }
}

// Global State Stores
let leads = loadState('leads', INITIAL_LEADS);
let transactions = loadState('transactions', INITIAL_TRANSACTIONS);
let inventory = loadState('inventory', INITIAL_INVENTORY);
let calendar = loadState('calendar', INITIAL_CALENDAR);
let packages = loadState('packages', INITIAL_PACKAGES_CRUD);
let portfolio = loadState('portfolio', INITIAL_PORTFOLIO_UPLOADS);
let regionalSEO = loadState('regional_seo', REGIONAL_SEO_DATA);

let currentModule = 'overview';
let leadFilter = 'All';
let txFilter = 'All';
let calView = 'table';
let activeBenchmarkKES = 6300000; // Mid-case audit default
let activeBenchmarkLabel = 'Mid-Case Audit';
let activeSearchQuery = '';
let selectedLead = null;
let currentEnteredPin = '';

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initSecurityLockscreen();
  initClock();
  initNavigation();
  initCommandPalette();
  initGlobalModals();
  initDrawer();
  initAnalyticsControls();
  initBackupRestore();
  renderAll();
});

// ==========================================================
// 1. EXECUTIVE SECURITY GATE / PIN LOCKSCREEN
// ==========================================================
function initSecurityLockscreen() {
  const lockscreen = document.getElementById('admin-lockscreen');
  const lockBtn = document.getElementById('lock-session-btn');
  const rememberCheckbox = document.getElementById('remember-device');
  const pinDots = [
    document.getElementById('pdot-1'),
    document.getElementById('pdot-2'),
    document.getElementById('pdot-3'),
    document.getElementById('pdot-4')
  ];
  const lockMsg = document.getElementById('lockscreen-msg');

  const isAuth = sessionStorage.getItem('silver_sky_auth') || localStorage.getItem('silver_sky_auth');
  if (!isAuth && lockscreen) {
    lockscreen.style.display = 'flex';
  }

  function updateDots() {
    pinDots.forEach((dot, idx) => {
      if (dot) {
        if (idx < currentEnteredPin.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      }
    });
  }

  function checkPin() {
    if (currentEnteredPin === '2026' || currentEnteredPin === '7829') {
      if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem('silver_sky_auth', 'director_granted');
      } else {
        sessionStorage.setItem('silver_sky_auth', 'director_granted');
      }
      if (lockMsg) lockMsg.textContent = '';
      if (lockscreen) {
        lockscreen.style.transition = 'opacity 0.3s ease';
        lockscreen.style.opacity = '0';
        setTimeout(() => {
          lockscreen.style.display = 'none';
          lockscreen.style.opacity = '1';
        }, 300);
      }
      showToast('Director clearance verified. Operations hub unlocked.', 'success');
      currentEnteredPin = '';
      updateDots();
    } else {
      if (lockMsg) lockMsg.textContent = 'Invalid Director PIN. Please enter 2026.';
      currentEnteredPin = '';
      updateDots();
    }
  }

  document.querySelectorAll('.pin-key[data-digit]').forEach(key => {
    key.addEventListener('click', () => {
      if (currentEnteredPin.length < 4) {
        currentEnteredPin += key.getAttribute('data-digit');
        updateDots();
        if (currentEnteredPin.length === 4) {
          setTimeout(checkPin, 150);
        }
      }
    });
  });

  document.getElementById('pin-clear')?.addEventListener('click', () => {
    currentEnteredPin = '';
    updateDots();
  });

  document.getElementById('pin-backspace')?.addEventListener('click', () => {
    currentEnteredPin = currentEnteredPin.slice(0, -1);
    updateDots();
  });

  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      localStorage.removeItem('silver_sky_auth');
      sessionStorage.removeItem('silver_sky_auth');
      currentEnteredPin = '';
      updateDots();
      if (lockscreen) lockscreen.style.display = 'flex';
      showToast('Director session locked.', 'warning');
    });
  }
}

// ==========================================================
// 2. LIVE NAIROBI CLOCK (EAT)
// ==========================================================
function initClock() {
  const clockEl = document.getElementById('admin-clock-text');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const options = {
      timeZone: 'Africa/Nairobi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    clockEl.textContent = 'EAT ' + new Intl.DateTimeFormat('en-GB', options).format(now);
  }
  update();
  setInterval(update, 1000);
}

// ==========================================================
// 3. NAVIGATION & MODULE SWITCHER
// ==========================================================
function initNavigation() {
  const navItems = document.querySelectorAll('.admin-nav-item');
  const modules = document.querySelectorAll('.admin-module');
  const titleEl = document.getElementById('admin-module-title');
  const subtitleEl = document.getElementById('admin-module-subtitle');
  const mobileToggle = document.getElementById('admin-mobile-toggle');
  const sidebar = document.querySelector('.admin-sidebar');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  const moduleMeta = {
    overview: { title: 'Executive Operations Overview', subtitle: 'Real-time performance, active leads & fleet status' },
    analytics: { title: 'Executive Analytics Hub', subtitle: 'Revenue leakage audit, conversion funnels & cashflow' },
    leads: { title: 'VIP Leads & Client CRM', subtitle: 'High-intent luxury inquiries and booking pipeline' },
    transactions: { title: 'Safaricom Daraja Financial Gateway', subtitle: 'Live M-Pesa STK push audit & verified escrow receipts' },
    inventory: { title: 'Fleet & Technical Assets', subtitle: 'German domes, Cummins gensets, LED walls & sound arrays' },
    calendar: { title: 'Master Production Calendar', subtitle: 'Upcoming luxury events, logistics & director assignments' },
    pricing: { title: 'Signature Packages & Pricing Controller', subtitle: 'Manage starting rates, tiers and luxury inclusions' },
    portfolio: { title: 'Portfolio & Social Media Sync', subtitle: 'Meta Graph API sync, showcase deployments & stories' },
    seo: { title: 'Regional SEO & Market Share', subtitle: 'Google rankings, organic search volume & CTR across Kenya' },
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetModule = item.getAttribute('data-module');
      if (!targetModule) return;

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      modules.forEach(m => {
        if (m.id === `module-${targetModule}`) {
          m.classList.add('active');
        } else {
          m.classList.remove('active');
        }
      });

      currentModule = targetModule;

      if (moduleMeta[targetModule]) {
        titleEl.textContent = moduleMeta[targetModule].title;
        subtitleEl.textContent = moduleMeta[targetModule].subtitle;
      }

      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
      }

      renderAll();
    });
  });
}

// ==========================================================
// 4. GLOBAL COMMAND PALETTE (CTRL + K)
// ==========================================================
function initCommandPalette() {
  const palette = document.getElementById('admin-command-palette');
  const trigger = document.getElementById('cmd-palette-trigger');
  const input = document.getElementById('admin-command-input');
  const results = document.getElementById('admin-command-results');

  function openPalette() {
    if (!palette) return;
    palette.classList.add('open');
    if (input) {
      input.value = '';
      input.focus();
      renderCommandResults('');
    }
  }

  function closePalette() {
    if (palette) palette.classList.remove('open');
  }

  trigger?.addEventListener('click', openPalette);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette && palette.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    }
    if (e.key === 'Escape' && palette && palette.classList.contains('open')) {
      closePalette();
    }
  });

  palette?.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });

  input?.addEventListener('input', (e) => {
    renderCommandResults(e.target.value.trim().toLowerCase());
  });

  function renderCommandResults(query) {
    if (!results) return;

    let items = [];

    // Quick Actions
    items.push({
      category: 'Action',
      title: '+ Log New VIP Inbound Lead',
      action: () => {
        closePalette();
        document.getElementById('open-new-lead-btn')?.click();
      }
    });

    items.push({
      category: 'Action',
      title: '💳 Dispatch M-Pesa STK Push Prompt',
      action: () => {
        closePalette();
        document.querySelector('.open-admin-stk-btn')?.click();
      }
    });

    items.push({
      category: 'Action',
      title: '🏦 Record Bank Wire / RTGS Cheque',
      action: () => {
        closePalette();
        document.getElementById('open-bankwire-btn')?.click();
      }
    });

    items.push({
      category: 'Action',
      title: '🎪 Register Heavy Fleet Equipment',
      action: () => {
        closePalette();
        document.getElementById('open-new-asset-btn')?.click();
      }
    });

    // Leads matching query
    leads.forEach(l => {
      if (!query || l.clientName.toLowerCase().includes(query) || l.venue.toLowerCase().includes(query)) {
        items.push({
          category: 'Lead',
          title: `${l.clientName} (${l.eventType} @ ${l.venue})`,
          action: () => {
            closePalette();
            document.querySelector('[data-module="leads"]')?.click();
            openLeadDrawer(l);
          }
        });
      }
    });

    // Inventory matching query
    inventory.forEach(inv => {
      if (!query || inv.name.toLowerCase().includes(query) || inv.assetCode.toLowerCase().includes(query)) {
        items.push({
          category: 'Asset',
          title: `[${inv.assetCode}] ${inv.name} (${inv.status})`,
          action: () => {
            closePalette();
            document.querySelector('[data-module="inventory"]')?.click();
          }
        });
      }
    });

    // Packages matching query
    packages.forEach(pkg => {
      if (!query || pkg.name.toLowerCase().includes(query)) {
        items.push({
          category: 'Package',
          title: `${pkg.name} — ${pkg.formattedPrice}`,
          action: () => {
            closePalette();
            document.querySelector('[data-module="pricing"]')?.click();
          }
        });
      }
    });

    if (items.length === 0) {
      results.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--slate-400); font-size: 0.8rem;">No results found for "${query}"</div>`;
      return;
    }

    results.innerHTML = items.slice(0, 10).map((item, idx) => `
      <div class="cmd-item" data-idx="${idx}">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <span style="font-size: 0.65rem; padding: 0.15rem 0.4rem; border-radius: 4px; background: rgba(59,130,246,0.25); color: #93c5fd; font-weight: 700;">${item.category}</span>
          <span style="font-weight: 600;">${item.title}</span>
        </div>
        <span style="font-size: 0.7rem; color: var(--slate-400);">Jump →</span>
      </div>
    `).join('');

    results.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = el.getAttribute('data-idx');
        if (items[idx]) items[idx].action();
      });
    });
  }
}

// ==========================================================
// 5. TOAST NOTIFICATION SYSTEM
// ==========================================================
export function showToast(message, type = 'info') {
  const container = document.getElementById('admin-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'admin-toast';
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'gold') icon = '✨';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================================
// 6. VIP LEAD INSPECTION DRAWER & NOTES
// ==========================================================
function initDrawer() {
  const drawer = document.getElementById('admin-lead-drawer');
  const overlay = document.getElementById('admin-drawer-overlay');
  const closeBtn = document.getElementById('admin-drawer-close');

  if (closeBtn && drawer && overlay) {
    const close = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
    };
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
  }
}

function openLeadDrawer(lead) {
  selectedLead = lead;
  const drawer = document.getElementById('admin-lead-drawer');
  const overlay = document.getElementById('admin-drawer-overlay');
  const body = document.getElementById('admin-drawer-content');
  if (!drawer || !overlay || !body) return;

  const notesList = lead.notesHistory || [
    { date: 'Initial Inquiry', author: 'System', text: lead.notes || 'Inquiry captured via platform.' }
  ];

  body.innerHTML = `
    <div style="background: rgba(15,23,42,0.6); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--admin-border);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
        <div>
          <h3 style="font-size: 1.25rem; color: #fff; font-family: var(--font-serif);">${lead.clientName}</h3>
          <div style="font-size: 0.75rem; color: var(--candlelight-amber);">${lead.eventType} • ${lead.region}</div>
        </div>
        <span class="status-pill status-${lead.status.toLowerCase().replace(/\s+/g, '-')}">${lead.status}</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.8rem; color: var(--slate-300);">
        <div><strong>Phone:</strong> ${lead.phone}</div>
        <div><strong>Email:</strong> ${lead.email}</div>
        <div><strong>Target Date:</strong> ${lead.targetDate}</div>
        <div><strong>Guest Count:</strong> ${lead.guestCount} VIPs</div>
        <div style="grid-column: span 2;"><strong>Venue:</strong> ${lead.venue}</div>
      </div>
    </div>

    <!-- Financial Breakdown -->
    <div style="background: rgba(15,39,108,0.25); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid rgba(59,130,246,0.25);">
      <h4 style="font-size: 0.9rem; color: #fff; margin-bottom: 0.75rem;">Financial Breakdown & Escrow</h4>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem;">
        <span style="color: var(--slate-300);">Estimated Production Budget:</span>
        <strong style="color: #fff;">KES ${lead.estimatedKES.toLocaleString()}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem;">
        <span style="color: var(--slate-300);">40% Daraja Deposit Required:</span>
        <strong style="color: var(--emerald-500);">KES ${lead.depositKES.toLocaleString()}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
        <span style="color: var(--slate-300);">Remaining Balance:</span>
        <strong style="color: var(--candlelight-amber);">KES ${(lead.estimatedKES - lead.depositKES).toLocaleString()}</strong>
      </div>
      <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
        <button id="drawer-proposal-btn" class="btn btn-gold" style="width: 100%; padding: 0.5rem; font-size: 0.775rem;">
          📄 Generate Official Proposal PDF
        </button>
      </div>
    </div>

    <!-- Notes & Interaction Log -->
    <div style="background: rgba(15,23,42,0.6); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--admin-border);">
      <h4 style="font-size: 0.9rem; color: #fff; margin-bottom: 0.5rem;">Director Activity & Follow-Up Log</h4>
      <div class="note-timeline" id="drawer-notes-container">
        ${notesList.map(n => `
          <div class="note-item">
            <div class="note-meta">
              <span><strong>${n.author}</strong></span>
              <span>${n.date}</span>
            </div>
            <div style="color: var(--slate-200);">${n.text}</div>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
        <input type="text" id="drawer-new-note" placeholder="Add follow-up note..." class="form-input" style="font-size: 0.75rem; padding: 0.4rem 0.65rem;">
        <button id="drawer-add-note-btn" class="btn btn-emerald" style="padding: 0.4rem 0.75rem; font-size: 0.75rem;">Add</button>
      </div>
    </div>

    <!-- Operations Controls -->
    <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
      <label style="font-size: 0.75rem; color: var(--slate-400); font-weight: 700;">UPDATE STATUS:</label>
      <select id="drawer-status-select" class="form-input" style="background: #020617; color: #fff; border: 1px solid var(--admin-border-bright);">
        <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
        <option value="In Discussion" ${lead.status === 'In Discussion' ? 'selected' : ''}>In Discussion</option>
        <option value="Deposit Pending" ${lead.status === 'Deposit Pending' ? 'selected' : ''}>Deposit Pending</option>
        <option value="Confirmed" ${lead.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
      </select>

      <label style="font-size: 0.75rem; color: var(--slate-400); font-weight: 700; margin-top: 0.25rem;">PRE-BUILT WHATSAPP TEMPLATES:</label>
      <select id="drawer-wa-template-select" class="form-input" style="background: #020617; color: #fff; font-size: 0.75rem;">
        <option value="intro">1. Initial VIP Introduction & Availability</option>
        <option value="inspection">2. Free On-Site Technical Inspection</option>
        <option value="escrow">3. 40% Escrow Deposit & Calendar Lock</option>
        <option value="clearance">4. Technical Rigging & Power Clearance</option>
      </select>

      <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
        <a id="drawer-wa-link" href="#" target="_blank" class="btn btn-emerald" style="flex: 1; text-align: center; text-decoration: none; font-size: 0.8rem; padding: 0.65rem;">
          💬 Launch WhatsApp
        </a>
        <a href="tel:${lead.phone}" class="btn btn-gold" style="flex: 1; text-align: center; text-decoration: none; font-size: 0.8rem; padding: 0.65rem;">
          📞 Direct Call
        </a>
      </div>
    </div>
  `;

  // Status Change Listener
  document.getElementById('drawer-status-select')?.addEventListener('change', (e) => {
    updateLeadStatus(lead.id, e.target.value);
  });

  // Add Note Listener
  document.getElementById('drawer-add-note-btn')?.addEventListener('click', () => {
    const noteInput = document.getElementById('drawer-new-note');
    const noteText = noteInput?.value.trim();
    if (!noteText) return;

    if (!lead.notesHistory) lead.notesHistory = [...notesList];
    lead.notesHistory.push({
      date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      author: 'Evans Mutua (Lead)',
      text: noteText
    });
    saveState('leads', leads);
    showToast('Activity note saved.', 'success');
    openLeadDrawer(lead);
  });

  // WhatsApp Template Switcher
  const waLink = document.getElementById('drawer-wa-link');
  const waSelect = document.getElementById('drawer-wa-template-select');
  const cleanPhone = '254' + lead.phone.replace(/[^0-9]/g, '').slice(-9);

  function updateWALink() {
    if (!waLink || !waSelect) return;
    let msg = '';
    const choice = waSelect.value;
    if (choice === 'intro') {
      msg = `Hello ${lead.clientName}, this is Evans Mutua from Silver Sky Events. We have reviewed your VIP inquiry for a ${lead.eventType} at ${lead.venue} with ${lead.guestCount} guests. We have preliminary availability and would love to walk through your vision.`;
    } else if (choice === 'inspection') {
      msg = `Hello ${lead.clientName}, Silver Sky would like to schedule a complimentary on-site technical inspection for ${lead.venue} to survey ground levelling, German marquee anchoring, and generator acoustic placement. Which day suits your schedule?`;
    } else if (choice === 'escrow') {
      msg = `Hello ${lead.clientName}, your formal estimate for ${lead.venue} is prepared (KES ${lead.estimatedKES.toLocaleString()}). To lock your date on the master calendar, a 40% escrow deposit of KES ${lead.depositKES.toLocaleString()} is required via Safaricom Paybill 782910.`;
    } else {
      msg = `Hello ${lead.clientName}, technical rigging clearance for ${lead.venue} has been confirmed. Our twin synchronized 150 kVA Cummins generators and sound array are scheduled for advance staging.`;
    }
    waLink.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  }
  updateWALink();
  waSelect?.addEventListener('change', updateWALink);

  // Proposal Button Listener
  document.getElementById('drawer-proposal-btn')?.addEventListener('click', () => {
    openProposalModal(lead);
  });

  drawer.classList.add('open');
  overlay.classList.add('open');
}

function updateLeadStatus(leadId, newStatus) {
  leads = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
  saveState('leads', leads);
  showToast(`Lead status updated to "${newStatus}".`, 'success');
  renderAll();
  if (selectedLead && selectedLead.id === leadId) {
    selectedLead.status = newStatus;
  }
}

// ==========================================================
// 7. PRINTABLE PDF ESTIMATE / PROPOSAL MODAL
// ==========================================================
function openProposalModal(lead) {
  const modal = document.getElementById('admin-proposal-modal');
  const content = document.getElementById('proposal-printable-content');
  if (!modal || !content) return;

  const quoteRef = 'SSK-EST-' + lead.id.replace('lead-', '');
  content.innerHTML = `
    <div class="official-receipt-sheet">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f276c; padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div>
          <div style="font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700; color: #0a1744;">SILVER SKY EVENTS</div>
          <div style="font-size: 0.75rem; color: #64748b;">Luxury Decor, Clear Marquees & Heavy Infrastructure</div>
          <div style="font-size: 0.7rem; color: #64748b;">Karen Office Park • +254 700 123 456 • concierge@silverskyevents.co.ke</div>
        </div>
        <div style="text-align: right;">
          <span style="background: #0f276c; color: #fff; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 4px;">OFFICIAL ESTIMATE</span>
          <div style="font-family: monospace; font-size: 0.85rem; font-weight: 700; color: #0a1744; margin-top: 0.35rem;">${quoteRef}</div>
          <div style="font-size: 0.7rem; color: #64748b;">Date: ${new Date().toLocaleDateString('en-GB')}</div>
        </div>
      </div>

      <!-- Client & Event Info -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; font-size: 0.8rem; background: #f8fafc; padding: 1rem; border-radius: 6px;">
        <div>
          <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase;">Prepared For:</div>
          <div style="font-weight: 700; font-size: 0.95rem; color: #0f172a;">${lead.clientName}</div>
          <div>📞 ${lead.phone} | ✉️ ${lead.email}</div>
        </div>
        <div>
          <div style="font-size: 0.7rem; color: #64748b; text-transform: uppercase;">Event Specifications:</div>
          <div style="font-weight: 700; color: #0f172a;">${lead.eventType} (${lead.guestCount} Guests)</div>
          <div>📍 ${lead.venue} • Target: ${lead.targetDate}</div>
        </div>
      </div>

      <!-- Quotation Breakdown Table -->
      <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; margin-bottom: 1.25rem;">
        <thead>
          <tr style="background: #0f276c; color: #fff; text-align: left;">
            <th style="padding: 0.5rem 0.75rem;">Item Description</th>
            <th style="padding: 0.5rem 0.75rem; text-align: right;">Amount (KES)</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 0.6rem 0.75rem;">
              <strong>Signature Clear-Span German Marquee & Structural Sub-Flooring</strong>
              <div style="font-size: 0.7rem; color: #64748b;">Complete weather-sealed PVC roof, crystal chandelier array, champagne velvet draping.</div>
            </td>
            <td style="padding: 0.6rem 0.75rem; text-align: right; font-weight: 700;">KES ${(Math.round(lead.estimatedKES * 0.45)).toLocaleString()}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 0.6rem 0.75rem;">
              <strong>Twin Synchronized 150 kVA Silent Cummins Generator Backup</strong>
              <div style="font-size: 0.7rem; color: #64748b;">Auto-changeover system, marine cabling distribution, certified diesel engineer on-site.</div>
            </td>
            <td style="padding: 0.6rem 0.75rem; text-align: right; font-weight: 700;">KES ${(Math.round(lead.estimatedKES * 0.2)).toLocaleString()}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 0.6rem 0.75rem;">
              <strong>L-Acoustics Kiva II Concert Sound & Intelligent Lighting Rigging</strong>
              <div style="font-size: 0.7rem; color: #64748b;">Shure Axient Digital microphones, Martin MAC Quantum moving heads, stage wash.</div>
            </td>
            <td style="padding: 0.6rem 0.75rem; text-align: right; font-weight: 700;">KES ${(Math.round(lead.estimatedKES * 0.2)).toLocaleString()}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 0.6rem 0.75rem;">
              <strong>VIP Tablescaping, Mirror Dancefloor & Executive Production Management</strong>
              <div style="font-size: 0.7rem; color: #64748b;">Assigned Senior Event Director, 24/7 technical crew dispatch.</div>
            </td>
            <td style="padding: 0.6rem 0.75rem; text-align: right; font-weight: 700;">KES ${(lead.estimatedKES - Math.round(lead.estimatedKES * 0.85)).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <!-- Totals & Escrow Terms -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 2px solid #0f276c; padding-top: 1rem;">
        <div style="font-size: 0.75rem; color: #64748b; max-width: 320px;">
          <div><strong>Payment Escrow Terms:</strong></div>
          <div>• 40% initial deposit required to reserve date.</div>
          <div>• Safaricom Paybill: <strong>782910</strong> | Account: <strong>${quoteRef}</strong></div>
          <div>• All funds held in audited Silver Sky escrow account.</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.75rem; color: #64748b;">Total Production Value:</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: #0a1744;">KES ${lead.estimatedKES.toLocaleString()}</div>
          <div style="font-size: 0.8rem; font-weight: 700; color: #059669;">40% Deposit to Lock: KES ${lead.depositKES.toLocaleString()}</div>
        </div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';

  document.getElementById('print-proposal-btn')?.addEventListener('click', () => {
    window.print();
  });
}

// ==========================================================
// 8. OFFICIAL SAFARICOM DARAJA RECEIPT MODAL
// ==========================================================
function openReceiptModal(tx) {
  const modal = document.getElementById('admin-receipt-modal');
  const content = document.getElementById('receipt-printable-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="official-receipt-sheet">
      <!-- Safaricom Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #009b3a; padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="background: #009b3a; color: #fff; font-weight: 900; font-size: 1rem; padding: 0.4rem 0.75rem; border-radius: 4px;">
            M-PESA
          </div>
          <div>
            <div style="font-weight: 800; font-size: 1.1rem; color: #0f172a;">SAFARICOM DARAJA ESCROW RECEIPT</div>
            <div style="font-size: 0.7rem; color: #64748b;">Paybill: <strong>782910</strong> • Silver Sky Events & Infrastructure Ltd</div>
          </div>
        </div>
        <span style="background: #dcfce7; color: #166534; font-weight: 700; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 4px;">VERIFIED PAID</span>
      </div>

      <!-- Details Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.8rem; margin-bottom: 1.5rem; background: #f8fafc; padding: 1rem; border-radius: 6px;">
        <div>
          <div style="font-size: 0.7rem; color: #64748b;">RECEIPT NUMBER:</div>
          <div style="font-family: monospace; font-size: 1.1rem; font-weight: 800; color: #0f172a;">${tx.receiptNumber}</div>
        </div>
        <div>
          <div style="font-size: 0.7rem; color: #64748b;">BOOKING REFERENCE:</div>
          <div style="font-family: monospace; font-size: 1rem; font-weight: 700; color: #2563eb;">${tx.bookingRef}</div>
        </div>
        <div>
          <div style="font-size: 0.7rem; color: #64748b;">CLIENT NAME & PHONE:</div>
          <div style="font-weight: 700; color: #0f172a;">${tx.clientName}</div>
          <div style="color: #64748b;">${tx.phone}</div>
        </div>
        <div>
          <div style="font-size: 0.7rem; color: #64748b;">TRANSACTION TIMESTAMP:</div>
          <div style="font-weight: 600; color: #0f172a;">${tx.timestamp}</div>
          <div style="color: #64748b;">Channel: ${tx.channel}</div>
        </div>
      </div>

      <!-- Amount Box -->
      <div style="background: #064e3b; color: #fff; padding: 1.25rem; border-radius: 6px; text-align: center; margin-bottom: 1.25rem;">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: #a7f3d0;">Amount Credited to Escrow:</div>
        <div style="font-size: 2rem; font-weight: 800; margin: 0.25rem 0;">KES ${tx.amountKES.toLocaleString()}</div>
        <div style="font-size: 0.75rem; color: #d1fae5;">For: ${tx.packageName} (${tx.serviceCategory})</div>
      </div>

      <!-- QR & Verification Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; padding-top: 1rem; font-size: 0.725rem; color: #64748b;">
        <div>
          <div>🛡️ Cryptographically signed by Safaricom PLC API gateway.</div>
          <div>Funds are held in secure escrow per Kenya Consumer Banking laws.</div>
        </div>
        <div style="width: 50px; height: 50px; border: 1px solid #94a3b8; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-family: monospace; text-align: center;">
          QR VERIFIED
        </div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';

  document.getElementById('print-receipt-btn')?.addEventListener('click', () => {
    window.print();
  });
}

// ==========================================================
// 9. RENDERING ALL MODULES (REACTIVE STATE)
// ==========================================================
function renderAll() {
  renderKPICards();
  renderLeadsTable();
  renderTransactionsTable();
  renderInventoryTable();
  renderCalendarTable();
  renderCalendarGrid();
  renderPackagesGrid();
  renderPortfolioGrid();
  renderRegionalSEOTable();
  renderRecoveryChart();
  renderFunnelChart();
  renderCashflowCategory();
  checkCalendarConflicts();
}

// KPI Calculations
function renderKPICards() {
  const totalPipeline = leads.reduce((sum, l) => sum + l.estimatedKES, 0);
  const totalDeposits = transactions.reduce((sum, t) => sum + t.amountKES, 0);
  const deployedAssets = inventory.reduce((sum, a) => sum + a.quantityDeployed, 0);
  const totalAssets = inventory.reduce((sum, a) => sum + a.quantityTotal, 0);
  const fleetUtil = totalAssets > 0 ? Math.round((deployedAssets / totalAssets) * 100) : 0;

  const elPipeline = document.getElementById('kpi-pipeline');
  const elDeposits = document.getElementById('kpi-deposits');
  const elFleet = document.getElementById('kpi-fleet');
  const elConversion = document.getElementById('kpi-conversion');

  if (elPipeline) elPipeline.textContent = 'KES ' + (totalPipeline / 1000000).toFixed(1) + 'M';
  if (elDeposits) elDeposits.textContent = 'KES ' + (totalDeposits / 1000000).toFixed(2) + 'M';
  if (elFleet) elFleet.textContent = fleetUtil + '%';
  if (elConversion) elConversion.textContent = '32.4%';

  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const leadBadge = document.getElementById('nav-leads-badge');
  if (leadBadge) leadBadge.textContent = `${newLeadsCount} New`;

  // Overview Fleet Readiness Matrix
  const matrixContainer = document.getElementById('overview-fleet-matrix');
  if (matrixContainer) {
    matrixContainer.innerHTML = inventory.slice(0, 4).map(inv => `
      <div style="background: rgba(15,23,42,0.6); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--admin-border);">
        <div style="font-size: 0.7rem; color: var(--slate-400); text-transform: uppercase;">${inv.category}</div>
        <div style="font-size: 1.15rem; font-weight: 700; color: #fff; margin: 0.25rem 0;">${inv.quantityDeployed} / ${inv.quantityTotal} deployed</div>
        <div style="font-size: 0.7rem; color: ${inv.status === 'Operational' ? 'var(--emerald-500)' : 'var(--candlelight-amber)'};">
          ● ${inv.name} (${inv.location})
        </div>
      </div>
    `).join('');
  }
}

// Leads Table Rendering with Edit, Delete & WhatsApp
function renderLeadsTable() {
  const tbody = document.getElementById('admin-leads-tbody');
  const overviewTbody = document.getElementById('admin-overview-leads-tbody');
  if (!tbody && !overviewTbody) return;

  const filtered = leads.filter(lead => {
    const matchStatus = leadFilter === 'All' || lead.status === leadFilter;
    const matchSearch = !activeSearchQuery || 
      lead.clientName.toLowerCase().includes(activeSearchQuery) ||
      lead.venue.toLowerCase().includes(activeSearchQuery) ||
      lead.phone.includes(activeSearchQuery);
    return matchStatus && matchSearch;
  });

  const generateRow = (lead) => `
    <tr>
      <td>
        <div style="font-weight: 700; color: #fff;">${lead.clientName}</div>
        <div style="font-size: 0.725rem; color: var(--slate-400);">${lead.phone} • ${lead.email}</div>
      </td>
      <td>
        <div>${lead.eventType}</div>
        <div style="font-size: 0.725rem; color: var(--candlelight-amber);">${lead.venue} (${lead.guestCount} Pax)</div>
      </td>
      <td>
        <div style="font-weight: 700; color: #fff;">KES ${lead.estimatedKES.toLocaleString()}</div>
        <div style="font-size: 0.7rem; color: var(--emerald-500);">Deposit: KES ${lead.depositKES.toLocaleString()}</div>
      </td>
      <td>
        <span class="status-pill status-${lead.status.toLowerCase().replace(/\s+/g, '-')}">${lead.status}</span>
      </td>
      <td>
        <div style="display: flex; gap: 0.35rem; align-items: center;">
          <button class="btn btn-glass inspect-lead-btn" data-id="${lead.id}" style="padding: 0.3rem 0.55rem; font-size: 0.725rem;" title="Inspect Drawer">
            Inspect
          </button>
          <button class="btn btn-glass edit-lead-btn" data-id="${lead.id}" style="padding: 0.3rem 0.55rem; font-size: 0.725rem;" title="Edit Lead">
            ✏️
          </button>
          <button class="btn btn-glass delete-lead-btn" data-id="${lead.id}" style="padding: 0.3rem 0.55rem; font-size: 0.725rem; color: #f87171;" title="Delete Lead">
            🗑️
          </button>
          <a href="https://wa.me/254${lead.phone.replace(/[^0-9]/g, '').slice(-9)}" target="_blank" class="btn btn-emerald" style="padding: 0.3rem 0.55rem; font-size: 0.725rem; text-decoration: none;" title="WhatsApp">
            💬
          </a>
        </div>
      </td>
    </tr>
  `;

  if (tbody) {
    tbody.innerHTML = filtered.map(generateRow).join('') || `<tr><td colspan="5" style="text-align: center; color: var(--slate-400); padding: 2rem;">No matching inquiries found.</td></tr>`;
  }

  if (overviewTbody) {
    overviewTbody.innerHTML = filtered.slice(0, 4).map(generateRow).join('');
  }

  // Attach event handlers
  document.querySelectorAll('.inspect-lead-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const lead = leads.find(l => l.id === id);
      if (lead) openLeadDrawer(lead);
    });
  });

  document.querySelectorAll('.edit-lead-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const lead = leads.find(l => l.id === id);
      if (lead) openEditLeadModal(lead);
    });
  });

  document.querySelectorAll('.delete-lead-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this lead?')) {
        leads = leads.filter(l => l.id !== id);
        saveState('leads', leads);
        showToast('Lead deleted.', 'warning');
        renderAll();
      }
    });
  });
}

function openEditLeadModal(lead) {
  const modal = document.getElementById('admin-edit-lead-modal');
  if (!modal) return;

  document.getElementById('el-id').value = lead.id;
  document.getElementById('el-name').value = lead.clientName;
  document.getElementById('el-phone').value = lead.phone;
  document.getElementById('el-email').value = lead.email;
  document.getElementById('el-event').value = lead.eventType;
  document.getElementById('el-date').value = lead.targetDate;
  document.getElementById('el-venue').value = lead.venue;
  document.getElementById('el-guests').value = lead.guestCount;
  document.getElementById('el-budget').value = lead.estimatedKES;

  modal.style.display = 'flex';
}

// Transactions Table Rendering with Receipt Printer
function renderTransactionsTable() {
  const tbody = document.getElementById('admin-transactions-tbody');
  const overviewTbody = document.getElementById('admin-overview-transactions-tbody');
  if (!tbody && !overviewTbody) return;

  const filtered = transactions.filter(tx => {
    const matchCat = txFilter === 'All' || tx.serviceCategory === txFilter;
    const matchSearch = !activeSearchQuery ||
      tx.clientName.toLowerCase().includes(activeSearchQuery) ||
      tx.receiptNumber.toLowerCase().includes(activeSearchQuery) ||
      tx.phone.includes(activeSearchQuery);
    return matchCat && matchSearch;
  });

  const generateRow = (tx) => `
    <tr>
      <td>
        <strong style="color: #60a5fa; font-family: monospace;">${tx.receiptNumber}</strong>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${tx.bookingRef}</div>
      </td>
      <td>
        <div style="font-weight: 700; color: #fff;">${tx.clientName}</div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${tx.phone}</div>
      </td>
      <td>
        <div style="font-weight: 700; color: var(--emerald-500);">KES ${tx.amountKES.toLocaleString()}</div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${tx.packageName}</div>
      </td>
      <td>
        <span class="status-pill status-confirmed">${tx.status}</span>
        <div style="font-size: 0.675rem; color: var(--slate-400); margin-top: 0.2rem;">${tx.channel}</div>
      </td>
      <td>
        <button class="btn btn-glass view-receipt-btn" data-id="${tx.id}" style="padding: 0.3rem 0.55rem; font-size: 0.725rem;">
          🖨️ Receipt
        </button>
      </td>
    </tr>
  `;

  if (tbody) {
    tbody.innerHTML = filtered.map(generateRow).join('') || `<tr><td colspan="5" style="text-align: center; color: var(--slate-400); padding: 2rem;">No transactions recorded.</td></tr>`;
  }

  if (overviewTbody) {
    overviewTbody.innerHTML = filtered.slice(0, 3).map(generateRow).join('');
  }

  document.querySelectorAll('.view-receipt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const tx = transactions.find(t => t.id === id);
      if (tx) openReceiptModal(tx);
    });
  });
}

// Inventory Table with Quick Status Cycling & Delete
function renderInventoryTable() {
  const tbody = document.getElementById('admin-inventory-tbody');
  if (!tbody) return;

  tbody.innerHTML = inventory.map(item => `
    <tr>
      <td><strong style="font-family: monospace; color: var(--candlelight-amber);">${item.assetCode}</strong></td>
      <td>
        <div style="font-weight: 700; color: #fff;">${item.name}</div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${item.category}</div>
      </td>
      <td>
        <div style="font-weight: 700; color: #fff;">${item.quantityDeployed} / ${item.quantityTotal} deployed</div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${item.quantityTotal - item.quantityDeployed} units on standby</div>
      </td>
      <td>
        <div>${item.location}</div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">KES ${item.dailyRateKES.toLocaleString()} / day</div>
      </td>
      <td>
        <div style="display: flex; gap: 0.35rem; align-items: center;">
          <button class="status-pill status-${item.status.toLowerCase().replace(/\s+/g, '-')} toggle-asset-status-btn" data-id="${item.id}" style="cursor: pointer; border: 1px dashed rgba(255,255,255,0.3);" title="Click to cycle status">
            ${item.status} ↻
          </button>
          <button class="btn btn-glass delete-asset-btn" data-id="${item.id}" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; color: #f87171;" title="Delete Asset">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.toggle-asset-status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const asset = inventory.find(a => a.id === id);
      if (!asset) return;
      const states = ['Operational', 'Deployed on Site', 'In Transit', 'Under Inspection'];
      const nextIdx = (states.indexOf(asset.status) + 1) % states.length;
      asset.status = states[nextIdx];
      saveState('inventory', inventory);
      showToast(`Asset status changed to "${asset.status}".`, 'info');
      renderAll();
    });
  });

  document.querySelectorAll('.delete-asset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Delete this asset from inventory?')) {
        inventory = inventory.filter(a => a.id !== id);
        saveState('inventory', inventory);
        showToast('Asset deleted from inventory.', 'warning');
        renderAll();
      }
    });
  });
}

// Calendar Table & Grid View with Conflict Detection
function renderCalendarTable() {
  const tbody = document.getElementById('admin-calendar-tbody');
  if (!tbody) return;

  tbody.innerHTML = calendar.map(item => `
    <tr>
      <td>
        <strong style="color: #60a5fa;">${item.date}</strong>
        <div style="font-size: 0.7rem; color: var(--slate-400);">to ${item.endDate}</div>
      </td>
      <td>
        <div style="font-weight: 700; color: #fff;">${item.title}</div>
        <div style="font-size: 0.725rem; color: var(--candlelight-amber);">${item.venue} (${item.guests} Pax)</div>
      </td>
      <td>
        <div style="font-size: 0.8rem; color: #fff;">Lead: <strong>${item.leadDirector}</strong></div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${item.packageType}</div>
      </td>
      <td style="font-size: 0.75rem; color: var(--slate-300);">
        <div>🎪 ${item.marqueeAssigned}</div>
        <div>⚡ ${item.generatorsAssigned}</div>
      </td>
      <td>
        <button class="btn btn-glass cancel-booking-btn" data-id="${item.id}" style="padding: 0.3rem 0.55rem; font-size: 0.725rem; color: #f87171;">
          Cancel / Delete
        </button>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Cancel and remove this event booking from the master calendar?')) {
        calendar = calendar.filter(b => b.id !== id);
        saveState('calendar', calendar);
        showToast('Booking cancelled.', 'warning');
        renderAll();
      }
    });
  });
}

function renderCalendarGrid() {
  const gridCells = document.getElementById('calendar-grid-cells');
  if (!gridCells) return;

  // Render 35 days for current interactive month (Oct 2026)
  let cellsHTML = '';
  for (let i = 1; i <= 31; i++) {
    const dayStr = i < 10 ? `0${i}` : `${i}`;
    const fullDate = `2026-10-${dayStr}`;
    const dayBookings = calendar.filter(b => b.date.includes(fullDate) || (b.date <= fullDate && b.endDate >= fullDate));

    cellsHTML += `
      <div class="calendar-day-cell ${i === 4 ? 'today' : ''}">
        <span class="calendar-day-num">${i}</span>
        ${dayBookings.map(b => `
          <div class="calendar-event-pill" title="${b.title} at ${b.venue}">
            ${b.title.split(' ')[0]} • ${b.venue.split(' ')[0]}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Padding cells to complete grid
  for (let j = 1; j <= 4; j++) {
    cellsHTML += `<div class="calendar-day-cell other-month"><span class="calendar-day-num">${j}</span></div>`;
  }

  gridCells.innerHTML = cellsHTML;
}

function checkCalendarConflicts() {
  const conflictBanner = document.getElementById('calendar-conflict-alert');
  if (!conflictBanner) return;

  // Check if any date has identical marquee assignments
  let hasConflict = false;
  for (let i = 0; i < calendar.length; i++) {
    for (let j = i + 1; j < calendar.length; j++) {
      if (calendar[i].date === calendar[j].date && calendar[i].marqueeAssigned === calendar[j].marqueeAssigned) {
        hasConflict = true;
        break;
      }
    }
  }

  conflictBanner.style.display = hasConflict ? 'flex' : 'none';
}

// Packages CRUD Grid with Modal Editing
function renderPackagesGrid() {
  const container = document.getElementById('admin-packages-grid');
  if (!container) return;

  container.innerHTML = packages.map(pkg => `
    <div class="kpi-card" style="padding: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
        <div>
          <span class="admin-brand-badge">${pkg.tier}</span>
          <h3 style="font-size: 1.2rem; color: #fff; font-family: var(--font-serif); margin-top: 0.35rem;">${pkg.name}</h3>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.15rem; font-weight: 700; color: var(--candlelight-amber);">${pkg.formattedPrice}</div>
          <div style="font-size: 0.7rem; color: var(--slate-400);">${pkg.guestCapacity}</div>
        </div>
      </div>
      <p style="font-size: 0.75rem; color: var(--slate-300); margin-bottom: 1rem; line-height: 1.4;">${pkg.description}</p>
      
      <div style="font-size: 0.725rem; color: var(--slate-400); margin-bottom: 1rem;">
        <strong style="color: var(--slate-200); display: block; margin-bottom: 0.35rem;">Key Inclusions:</strong>
        <ul style="padding-left: 1rem; line-height: 1.5;">
          ${pkg.inclusions.slice(0, 3).map(inc => `<li>${inc}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; gap: 0.5rem; margin-top: auto; border-top: 1px solid var(--admin-border); padding-top: 0.75rem;">
        <button class="btn btn-gold edit-pkg-full-btn" data-id="${pkg.id}" style="flex: 1; padding: 0.45rem; font-size: 0.75rem;">
          ✏️ Edit Details
        </button>
        <button class="btn btn-glass duplicate-pkg-btn" data-id="${pkg.id}" style="padding: 0.45rem 0.65rem; font-size: 0.75rem;" title="Duplicate Package">
          📋
        </button>
        <button class="btn btn-glass delete-pkg-btn" data-id="${pkg.id}" style="padding: 0.45rem 0.65rem; font-size: 0.75rem; color: #f87171;" title="Delete Package">
          🗑️
        </button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.edit-pkg-full-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const pkg = packages.find(p => p.id === id);
      if (pkg) openPackageModal(pkg);
    });
  });

  document.querySelectorAll('.duplicate-pkg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const pkg = packages.find(p => p.id === id);
      if (!pkg) return;
      const clone = {
        ...pkg,
        id: `pkg-${Date.now().toString().slice(-4)}`,
        name: `${pkg.name} (Copy)`
      };
      packages.push(clone);
      saveState('packages', packages);
      showToast(`Package duplicated: "${clone.name}".`, 'success');
      renderAll();
    });
  });

  document.querySelectorAll('.delete-pkg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Delete this package?')) {
        packages = packages.filter(p => p.id !== id);
        saveState('packages', packages);
        showToast('Package removed.', 'warning');
        renderAll();
      }
    });
  });
}

function openPackageModal(pkg = null) {
  const modal = document.getElementById('admin-package-modal');
  const title = document.getElementById('pkg-modal-title');
  if (!modal) return;

  if (pkg) {
    if (title) title.textContent = `Edit "${pkg.name}"`;
    document.getElementById('pkg-id').value = pkg.id;
    document.getElementById('pkg-name').value = pkg.name;
    document.getElementById('pkg-tier').value = pkg.tier;
    document.getElementById('pkg-price').value = pkg.startingPriceKES;
    document.getElementById('pkg-capacity').value = pkg.guestCapacity;
    document.getElementById('pkg-desc').value = pkg.description;
    document.getElementById('pkg-inclusions').value = pkg.inclusions.join('\n');
  } else {
    if (title) title.textContent = 'Create Custom Event Package';
    document.getElementById('admin-package-form')?.reset();
    document.getElementById('pkg-id').value = '';
  }

  modal.style.display = 'flex';
}

// Portfolio Case Studies Grid
function renderPortfolioGrid() {
  const container = document.getElementById('admin-portfolio-grid');
  if (!container) return;

  container.innerHTML = portfolio.map(item => `
    <div style="background: rgba(15,23,42,0.6); border-radius: var(--radius-sm); border: 1px solid var(--admin-border); overflow: hidden; display: flex; flex-direction: column;">
      <div style="height: 140px; background-image: url('${item.imageUrl}'); background-size: cover; background-position: center; position: relative;">
        <span class="status-pill ${item.status === 'Published' ? 'status-confirmed' : 'status-in-discussion'}" style="position: absolute; top: 0.5rem; right: 0.5rem;">
          ${item.status}
        </span>
      </div>
      <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">
        <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">${item.title}</div>
        <div style="font-size: 0.7rem; color: var(--candlelight-amber); margin-bottom: 0.5rem;">${item.venue} (${item.guests} VIPs)</div>
        <p style="font-size: 0.725rem; color: var(--slate-300); margin-bottom: 1rem; line-height: 1.4; flex: 1;">${item.storyNarrative}</p>

        <div style="display: flex; gap: 0.4rem; border-top: 1px solid var(--admin-border); padding-top: 0.75rem;">
          <button class="btn btn-glass toggle-publish-btn" data-id="${item.id}" style="flex: 1; padding: 0.35rem; font-size: 0.7rem;">
            ${item.status === 'Published' ? 'Unpublish' : 'Publish'}
          </button>
          <button class="btn btn-glass delete-casestudy-btn" data-id="${item.id}" style="padding: 0.35rem 0.6rem; font-size: 0.7rem; color: #f87171;" title="Delete">
            🗑️
          </button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.toggle-publish-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = portfolio.find(p => p.id === id);
      if (!item) return;
      item.status = item.status === 'Published' ? 'Draft' : 'Published';
      saveState('portfolio', portfolio);
      showToast(`Case study set to "${item.status}".`, 'info');
      renderPortfolioGrid();
    });
  });

  document.querySelectorAll('.delete-casestudy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Delete this case study from the website showcase?')) {
        portfolio = portfolio.filter(p => p.id !== id);
        saveState('portfolio', portfolio);
        showToast('Case study deleted.', 'warning');
        renderPortfolioGrid();
      }
    });
  });
}

// Regional SEO Table
function renderRegionalSEOTable() {
  const tbody = document.getElementById('admin-seo-tbody');
  if (!tbody) return;

  tbody.innerHTML = regionalSEO.map(reg => `
    <tr>
      <td>
        <strong style="color: #fff;">${reg.city}</strong>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${reg.county}</div>
      </td>
      <td>
        <div style="font-weight: 700; color: #60a5fa;">${reg.monthlyImpressions.toLocaleString()}</div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${reg.organicClicks.toLocaleString()} Clicks (${reg.ctrPct}%)</div>
      </td>
      <td>
        <div style="font-weight: 700; color: var(--emerald-500);">${reg.leadsGenerated} Inquiries</div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${reg.conversionRatePct}% Conv Rate</div>
      </td>
      <td style="font-size: 0.75rem; color: var(--candlelight-amber); font-family: monospace;">
        "${reg.topKeyword}"
      </td>
      <td>
        <span class="status-pill status-confirmed">${reg.seoStatus}</span>
      </td>
    </tr>
  `).join('');
}

// Visual Analytics: Recovery & Funnel & Dynamic Benchmark
function renderRecoveryChart() {
  const container = document.getElementById('recovery-bars-container');
  const subhead = document.getElementById('recovery-subhead');
  const badge = document.getElementById('recovery-badge');
  if (!container) return;

  const latest = MONTHLY_RECOVERY_DATA[MONTHLY_RECOVERY_DATA.length - 2]; // Mar 2026
  const pctOfBenchmark = ((latest.actualRecovered / activeBenchmarkKES) * 100).toFixed(1);

  if (subhead) subhead.textContent = `KES ${latest.actualRecovered.toLocaleString()} Recovered vs ${activeBenchmarkLabel} Target (KES ${activeBenchmarkKES.toLocaleString()})`;
  if (badge) badge.textContent = `${pctOfBenchmark}% of Target`;

  container.innerHTML = MONTHLY_RECOVERY_DATA.map(item => {
    const pct = Math.min(100, Math.round((item.actualRecovered / activeBenchmarkKES) * 100));
    return `
      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.25rem;">
          <span style="color: #fff; font-weight: 600;">${item.month} • <span style="color: var(--slate-400);">${item.pillar}</span></span>
          <strong style="color: var(--emerald-500);">KES ${item.actualRecovered.toLocaleString()}</strong>
        </div>
        <div style="background: rgba(15,23,42,0.8); height: 8px; border-radius: 4px; overflow: hidden; border: 1px solid var(--admin-border);">
          <div style="background: linear-gradient(90deg, var(--cobalt-500), var(--emerald-500)); height: 100%; width: ${pct}%; border-radius: 4px; transition: width 0.8s ease;"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderFunnelChart() {
  const container = document.getElementById('cro-funnel-container');
  if (!container) return;

  container.innerHTML = FUNNEL_STAGES.map(stage => `
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem;">
      <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--cobalt-500); color: #fff; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center;">
        ${stage.step}
      </div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
          <strong style="color: #fff;">${stage.name}</strong>
          <span style="color: var(--candlelight-amber);">${stage.count.toLocaleString()} (${stage.conv})</span>
        </div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${stage.insight}</div>
      </div>
    </div>
  `).join('');
}

function renderCashflowCategory() {
  const container = document.getElementById('cashflow-category-breakdown');
  if (!container) return;

  const weddingsTotal = transactions.filter(t => t.serviceCategory === 'Weddings').reduce((s, t) => s + t.amountKES, 0);
  const corporateTotal = transactions.filter(t => t.serviceCategory === 'Corporate Contracts').reduce((s, t) => s + t.amountKES, 0);
  const equipTotal = transactions.filter(t => t.serviceCategory === 'Equipment Hire').reduce((s, t) => s + t.amountKES, 0);
  const decorTotal = transactions.filter(t => t.serviceCategory === 'Decor Styling').reduce((s, t) => s + t.amountKES, 0);
  const grandTotal = weddingsTotal + corporateTotal + equipTotal + decorTotal || 1;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div style="background: rgba(15,23,42,0.6); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--admin-border);">
        <div style="font-size: 0.7rem; color: var(--slate-400);">WEDDINGS ESCROW</div>
        <div style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0.25rem 0;">KES ${weddingsTotal.toLocaleString()}</div>
        <div style="font-size: 0.7rem; color: var(--emerald-500);">${Math.round((weddingsTotal/grandTotal)*100)}% of total</div>
      </div>
      <div style="background: rgba(15,23,42,0.6); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--admin-border);">
        <div style="font-size: 0.7rem; color: var(--slate-400);">CORPORATE SUMMITS</div>
        <div style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0.25rem 0;">KES ${corporateTotal.toLocaleString()}</div>
        <div style="font-size: 0.7rem; color: var(--emerald-500);">${Math.round((corporateTotal/grandTotal)*100)}% of total</div>
      </div>
      <div style="background: rgba(15,23,42,0.6); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--admin-border);">
        <div style="font-size: 0.7rem; color: var(--slate-400);">EQUIPMENT RENTAL</div>
        <div style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0.25rem 0;">KES ${equipTotal.toLocaleString()}</div>
        <div style="font-size: 0.7rem; color: var(--emerald-500);">${Math.round((equipTotal/grandTotal)*100)}% of total</div>
      </div>
      <div style="background: rgba(15,23,42,0.6); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--admin-border);">
        <div style="font-size: 0.7rem; color: var(--slate-400);">DECOR STYLING</div>
        <div style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0.25rem 0;">KES ${decorTotal.toLocaleString()}</div>
        <div style="font-size: 0.7rem; color: var(--emerald-500);">${Math.round((decorTotal/grandTotal)*100)}% of total</div>
      </div>
    </div>
  `;
}

// Analytics Scenario Benchmarking Controls
function initAnalyticsControls() {
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBenchmarkKES = Number(btn.getAttribute('data-target'));
      activeBenchmarkLabel = btn.getAttribute('data-label');
      renderRecoveryChart();
    });
  });

  document.getElementById('print-board-report-btn')?.addEventListener('click', () => {
    window.print();
  });
}

// ==========================================================
// 10. MODAL FORMS & FULL CRUD LOGIC
// ==========================================================
function initGlobalModals() {
  // Generic close for all modals
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
    });
  });

  // Calendar View Switcher (Table vs Grid)
  document.querySelectorAll('.cal-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cal-view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calView = btn.getAttribute('data-view');
      const tbl = document.getElementById('calendar-table-view');
      const grd = document.getElementById('calendar-grid-view');
      if (calView === 'table') {
        if (tbl) tbl.style.display = 'block';
        if (grd) grd.style.display = 'none';
      } else {
        if (tbl) tbl.style.display = 'none';
        if (grd) grd.style.display = 'block';
      }
    });
  });

  // 1. New Lead Modal
  const openNewLeadBtn = document.getElementById('open-new-lead-btn');
  const newLeadModal = document.getElementById('admin-new-lead-modal');
  openNewLeadBtn?.addEventListener('click', () => {
    if (newLeadModal) newLeadModal.style.display = 'flex';
  });

  document.getElementById('admin-new-lead-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nl-name').value.trim();
    const phone = document.getElementById('nl-phone').value.trim();
    const email = document.getElementById('nl-email').value.trim();
    const eventType = document.getElementById('nl-event').value;
    const venue = document.getElementById('nl-venue').value.trim();
    const region = document.getElementById('nl-region').value;
    const guests = Number(document.getElementById('nl-guests').value);
    const budget = Number(document.getElementById('nl-budget').value);

    const newLead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      clientName: name || 'Direct Client Inquiry',
      phone: phone || '0722 000 000',
      email: email || 'inquiry@silverskyevents.co.ke',
      eventType: eventType,
      targetDate: '2026-11-20',
      guestCount: guests || 300,
      region: region,
      venue: venue || 'Nairobi Grounds',
      budgetBracket: 'KES 1,800,000 – KES 4,500,000',
      estimatedKES: budget || 1850000,
      depositKES: Math.round((budget || 1850000) * 0.4),
      status: 'New',
      createdAt: 'Just now',
      assignedDirector: 'Evans Mutua (Lead)',
      notes: 'Logged directly from Operations Admin Portal.',
      source: 'Executive Fast Logger',
    };

    leads.unshift(newLead);
    saveState('leads', leads);
    if (newLeadModal) newLeadModal.style.display = 'none';
    document.getElementById('admin-new-lead-form')?.reset();
    showToast(`Lead created for ${newLead.clientName}.`, 'success');
    renderAll();
  });

  // 2. Edit Lead Modal
  document.getElementById('admin-edit-lead-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('el-id').value;
    const lead = leads.find(l => l.id === id);
    if (!lead) return;

    lead.clientName = document.getElementById('el-name').value;
    lead.phone = document.getElementById('el-phone').value;
    lead.email = document.getElementById('el-email').value;
    lead.eventType = document.getElementById('el-event').value;
    lead.targetDate = document.getElementById('el-date').value;
    lead.venue = document.getElementById('el-venue').value;
    lead.guestCount = Number(document.getElementById('el-guests').value);
    lead.estimatedKES = Number(document.getElementById('el-budget').value);
    lead.depositKES = Math.round(lead.estimatedKES * 0.4);

    saveState('leads', leads);
    document.getElementById('admin-edit-lead-modal').style.display = 'none';
    showToast(`Lead for ${lead.clientName} updated.`, 'success');
    renderAll();
  });

  // 3. STK Push Simulation
  const stkModal = document.getElementById('admin-stk-modal');
  document.querySelectorAll('.open-admin-stk-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (stkModal) stkModal.style.display = 'flex';
    });
  });

  document.getElementById('admin-stk-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.getElementById('stk-phone').value;
    const amount = Number(document.getElementById('stk-amount').value);
    const client = document.getElementById('stk-client').value;
    const pkg = document.getElementById('stk-package').value;
    const category = document.getElementById('stk-category').value;
    const submitBtn = document.getElementById('stk-submit-btn');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Dispatched to Safaricom Daraja...';
    }

    setTimeout(() => {
      const randCode = 'QK' + Math.random().toString(36).substring(2, 8).toUpperCase() + 'M';
      const newTx = {
        id: `tx-${Date.now().toString().slice(-4)}`,
        receiptNumber: randCode,
        bookingRef: `SSK-${Math.floor(10000 + Math.random() * 90000)}`,
        clientName: client || 'VIP Escrow Client',
        phone: phone || '254712345678',
        amountKES: amount || 540000,
        packageName: pkg || 'Royal Opulence (40% Deposit)',
        serviceCategory: category || 'Weddings',
        status: 'CONFIRMED',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        paybill: '782910',
        channel: 'M-PESA STK Push',
      };

      transactions.unshift(newTx);
      saveState('transactions', transactions);

      if (stkModal) stkModal.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Dispatch Daraja STK Push';
      }

      if (window.confetti) {
        window.confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }

      showToast(`Daraja M-Pesa KES ${amount.toLocaleString()} Confirmed (${randCode})!`, 'gold');
      renderAll();
    }, 1100);
  });

  // 4. Record Bank Wire / RTGS Modal
  const bankwireModal = document.getElementById('admin-bankwire-modal');
  const openBankwireBtns = [document.getElementById('open-bankwire-btn'), document.getElementById('open-bankwire-btn-2')];
  openBankwireBtns.forEach(btn => {
    btn?.addEventListener('click', () => {
      if (bankwireModal) bankwireModal.style.display = 'flex';
    });
  });

  document.getElementById('admin-bankwire-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const client = document.getElementById('wire-client').value;
    const amount = Number(document.getElementById('wire-amount').value);
    const bank = document.getElementById('wire-bank').value;
    const ref = document.getElementById('wire-ref').value;
    const cat = document.getElementById('wire-cat').value;
    const pkg = document.getElementById('wire-package').value;

    const newTx = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      receiptNumber: ref,
      bookingRef: `SSK-${Math.floor(10000 + Math.random() * 90000)}`,
      clientName: client,
      phone: bank,
      amountKES: amount,
      packageName: pkg,
      serviceCategory: cat,
      status: 'RECONCILED',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      paybill: 'BANK-WIRE',
      channel: `Bank Wire (${bank.split(' ')[0]})`,
    };

    transactions.unshift(newTx);
    saveState('transactions', transactions);
    if (bankwireModal) bankwireModal.style.display = 'none';
    document.getElementById('admin-bankwire-form')?.reset();
    showToast(`Bank Wire KES ${amount.toLocaleString()} Reconciled.`, 'success');
    renderAll();
  });

  // 5. Register New Fleet Asset Modal
  const newAssetModal = document.getElementById('admin-new-asset-modal');
  document.getElementById('open-new-asset-btn')?.addEventListener('click', () => {
    if (newAssetModal) newAssetModal.style.display = 'flex';
  });

  document.getElementById('admin-new-asset-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('na-code').value.trim();
    const cat = document.getElementById('na-category').value;
    const name = document.getElementById('na-name').value.trim();
    const total = Number(document.getElementById('na-total').value);
    const deployed = Number(document.getElementById('na-deployed').value);
    const loc = document.getElementById('na-location').value;
    const rate = Number(document.getElementById('na-rate').value);

    const newAsset = {
      id: `ast-${Date.now().toString().slice(-4)}`,
      assetCode: code,
      name: name,
      category: cat,
      quantityTotal: total,
      quantityDeployed: deployed,
      location: loc,
      dailyRateKES: rate,
      status: 'Operational',
      lastService: new Date().toLocaleDateString('en-GB')
    };

    inventory.unshift(newAsset);
    saveState('inventory', inventory);
    if (newAssetModal) newAssetModal.style.display = 'none';
    document.getElementById('admin-new-asset-form')?.reset();
    showToast(`Asset [${code}] added to fleet.`, 'success');
    renderAll();
  });

  // 6. Schedule Event Booking Modal
  const newBookingModal = document.getElementById('admin-new-booking-modal');
  document.getElementById('open-new-booking-btn')?.addEventListener('click', () => {
    if (newBookingModal) newBookingModal.style.display = 'flex';
  });

  document.getElementById('admin-new-booking-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('nb-title').value.trim();
    const date = document.getElementById('nb-date').value;
    const enddate = document.getElementById('nb-enddate').value;
    const venue = document.getElementById('nb-venue').value.trim();
    const guests = Number(document.getElementById('nb-guests').value);
    const director = document.getElementById('nb-director').value;
    const power = document.getElementById('nb-power').value;
    const marquee = document.getElementById('nb-marquee').value;

    const newBooking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      title: title,
      client: title.split('&')[0].trim() || 'VIP Client',
      date: date,
      endDate: enddate,
      venue: venue,
      region: 'Nairobi',
      packageType: 'Bespoke Production',
      guests: guests,
      leadDirector: director,
      status: 'Confirmed',
      generatorsAssigned: power,
      marqueeAssigned: marquee,
    };

    calendar.push(newBooking);
    saveState('calendar', calendar);
    if (newBookingModal) newBookingModal.style.display = 'none';
    document.getElementById('admin-new-booking-form')?.reset();
    showToast(`Event locked on calendar for ${date}.`, 'success');
    renderAll();
  });

  // 7. Package CRUD Modal
  document.getElementById('open-new-package-btn')?.addEventListener('click', () => {
    openPackageModal(null);
  });

  document.getElementById('admin-package-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('pkg-id').value;
    const name = document.getElementById('pkg-name').value.trim();
    const tier = document.getElementById('pkg-tier').value;
    const price = Number(document.getElementById('pkg-price').value);
    const capacity = document.getElementById('pkg-capacity').value.trim();
    const desc = document.getElementById('pkg-desc').value.trim();
    const inclusions = document.getElementById('pkg-inclusions').value.split('\n').map(s => s.trim()).filter(Boolean);

    if (id) {
      // Edit
      const pkg = packages.find(p => p.id === id);
      if (pkg) {
        pkg.name = name;
        pkg.tier = tier;
        pkg.startingPriceKES = price;
        pkg.formattedPrice = 'KES ' + price.toLocaleString();
        pkg.guestCapacity = capacity;
        pkg.description = desc;
        pkg.inclusions = inclusions;
        showToast(`Package "${name}" updated.`, 'success');
      }
    } else {
      // New
      const newPkg = {
        id: `pkg-${Date.now().toString().slice(-4)}`,
        name: name,
        tier: tier,
        category: 'Weddings',
        startingPriceKES: price,
        formattedPrice: 'KES ' + price.toLocaleString(),
        guestCapacity: capacity,
        description: desc,
        inclusions: inclusions,
        depositRequiredPct: 40,
        isActive: true,
      };
      packages.push(newPkg);
      showToast(`Package "${name}" created.`, 'success');
    }

    saveState('packages', packages);
    document.getElementById('admin-package-modal').style.display = 'none';
    renderAll();
  });

  // 8. Add Case Study Modal
  const newCSModal = document.getElementById('admin-casestudy-modal');
  document.getElementById('open-new-casestudy-btn')?.addEventListener('click', () => {
    if (newCSModal) newCSModal.style.display = 'flex';
  });

  document.getElementById('admin-casestudy-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('cs-title').value.trim();
    const cat = document.getElementById('cs-category').value;
    const venue = document.getElementById('cs-venue').value.trim();
    const img = document.getElementById('cs-image').value.trim();
    const story = document.getElementById('cs-story').value.trim();

    const newCS = {
      id: `port-${Date.now().toString().slice(-4)}`,
      title: title,
      category: cat,
      venue: venue,
      location: 'Nairobi',
      guests: 400,
      date: 'Oct 2026',
      imageUrl: img,
      syncedWithFB: true,
      storyNarrative: story,
      status: 'Published'
    };

    portfolio.unshift(newCS);
    saveState('portfolio', portfolio);
    if (newCSModal) newCSModal.style.display = 'none';
    document.getElementById('admin-casestudy-form')?.reset();
    showToast(`Case study "${title}" published.`, 'success');
    renderPortfolioGrid();
  });

  // Force Meta Sync Button
  document.getElementById('force-meta-sync-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('force-meta-sync-btn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Connecting to Meta Graph API...';
    }
    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🔄 Force Sync Meta Feed';
      }
      showToast('Meta Graph API v19.0: 4K reels and albums synchronized.', 'gold');
    }, 1200);
  });

  // Export Financial CSV
  document.getElementById('export-tx-csv-btn')?.addEventListener('click', () => {
    let csv = 'Receipt,BookingRef,Client,Phone,AmountKES,Package,Category,Status,Timestamp,Channel\n';
    transactions.forEach(t => {
      csv += `"${t.receiptNumber}","${t.bookingRef}","${t.clientName}","${t.phone}",${t.amountKES},"${t.packageName}","${t.serviceCategory}","${t.status}","${t.timestamp}","${t.channel}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `silversky_financial_ledger_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Financial ledger exported to CSV.', 'success');
  });

  // Filter Tabs
  document.querySelectorAll('.lead-filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lead-filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      leadFilter = btn.getAttribute('data-status');
      renderLeadsTable();
    });
  });

  document.querySelectorAll('.tx-filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tx-filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      txFilter = btn.getAttribute('data-category');
      renderTransactionsTable();
    });
  });
}

// ==========================================================
// 11. DATABASE BACKUP & RESTORE
// ==========================================================
function initBackupRestore() {
  // Export JSON Backup
  document.getElementById('export-backup-btn')?.addEventListener('click', () => {
    const backup = {
      leads,
      transactions,
      inventory,
      calendar,
      packages,
      portfolio,
      regionalSEO,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `silversky_operations_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Operations backup downloaded.', 'success');
  });

  // Import JSON Backup
  document.getElementById('import-backup-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.leads) saveState('leads', data.leads);
        if (data.transactions) saveState('transactions', data.transactions);
        if (data.inventory) saveState('inventory', data.inventory);
        if (data.calendar) saveState('calendar', data.calendar);
        if (data.packages) saveState('packages', data.packages);
        if (data.portfolio) saveState('portfolio', data.portfolio);
        if (data.regionalSEO) saveState('regional_seo', data.regionalSEO);
        showToast('Backup restored successfully. Reloading...', 'success');
        setTimeout(() => location.reload(), 1000);
      } catch (err) {
        showToast('Invalid backup file.', 'warning');
      }
    };
    reader.readAsText(file);
  });

  // Reset to Demo Defaults
  document.getElementById('reset-demo-btn')?.addEventListener('click', () => {
    if (confirm('Reset entire operations hub to initial demo defaults? Any custom added leads and assets will be reset.')) {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      showToast('Database reset. Reloading...', 'info');
      setTimeout(() => location.reload(), 1000);
    }
  });
}
