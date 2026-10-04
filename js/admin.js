// Silver Sky Events — Executive Operations & Admin Application Logic

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

// Global State
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
let activeSearchQuery = '';
let selectedLead = null;

// DOM Elements & Initialization
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initNavigation();
  initSearch();
  initModals();
  initDrawer();
  renderAll();
});

// 1. Live Clock (Nairobi Time - EAT)
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

// 2. Navigation & Module Switcher
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
    item.addEventListener('click', (e) => {
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

      // Re-render target
      renderAll();
    });
  });
}

// 3. Search
function initSearch() {
  const searchInput = document.getElementById('admin-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    activeSearchQuery = e.target.value.trim().toLowerCase();
    renderLeadsTable();
    renderTransactionsTable();
  });
}

// 4. Toast Notification
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

// 5. Drawer Handling
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

    <div style="background: rgba(15,39,108,0.25); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid rgba(59,130,246,0.25);">
      <h4 style="font-size: 0.9rem; color: #fff; margin-bottom: 0.75rem;">Financial Breakdown</h4>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem;">
        <span style="color: var(--slate-300);">Estimated Production Budget:</span>
        <strong style="color: #fff;">KES ${lead.estimatedKES.toLocaleString()}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem;">
        <span style="color: var(--slate-300);">40% Daraja Deposit Required:</span>
        <strong style="color: var(--emerald-500);">KES ${lead.depositKES.toLocaleString()}</strong>
      </div>
      <div style="font-size: 0.725rem; color: var(--slate-400); margin-top: 0.5rem;">
        Source: <strong>${lead.source}</strong> • Assigned Director: <strong>${lead.assignedDirector}</strong>
      </div>
    </div>

    <div style="background: rgba(15,23,42,0.6); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--admin-border);">
      <h4 style="font-size: 0.9rem; color: #fff; margin-bottom: 0.5rem;">Operations Notes</h4>
      <p style="font-size: 0.8rem; color: var(--slate-300); line-height: 1.5;">${lead.notes}</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
      <label style="font-size: 0.75rem; color: var(--slate-400); font-weight: 700;">UPDATE STATUS:</label>
      <select id="drawer-status-select" class="form-input" style="background: #020617; color: #fff; border: 1px solid var(--admin-border-bright);">
        <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
        <option value="In Discussion" ${lead.status === 'In Discussion' ? 'selected' : ''}>In Discussion</option>
        <option value="Deposit Pending" ${lead.status === 'Deposit Pending' ? 'selected' : ''}>Deposit Pending</option>
        <option value="Confirmed" ${lead.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
      </select>

      <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
        <a href="https://wa.me/254${lead.phone.replace(/[^0-9]/g, '').slice(-9)}?text=Hello%20${encodeURIComponent(lead.clientName)},%20this%20is%20Evans%20Mutua%20from%20Silver%20Sky%20Events.%20I%20am%20reviewing%20your%20${encodeURIComponent(lead.eventType)}%20specifications%20for%20${encodeURIComponent(lead.venue)}." target="_blank" class="btn btn-emerald" style="flex: 1; text-align: center; text-decoration: none; font-size: 0.8rem; padding: 0.65rem;">
          💬 WhatsApp Client
        </a>
        <a href="tel:${lead.phone}" class="btn btn-gold" style="flex: 1; text-align: center; text-decoration: none; font-size: 0.8rem; padding: 0.65rem;">
          📞 Direct Call
        </a>
      </div>
    </div>
  `;

  document.getElementById('drawer-status-select')?.addEventListener('change', (e) => {
    updateLeadStatus(lead.id, e.target.value);
  });

  drawer.classList.add('open');
  overlay.classList.add('open');
}

function updateLeadStatus(leadId, newStatus) {
  leads = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
  saveState('leads', leads);
  showToast(`Lead status updated to ${newStatus}`, 'success');
  renderAll();
  if (selectedLead && selectedLead.id === leadId) {
    selectedLead.status = newStatus;
  }
}

// 6. Rendering All Modules
function renderAll() {
  renderKPICards();
  renderLeadsTable();
  renderTransactionsTable();
  renderInventoryTable();
  renderCalendarTable();
  renderPackagesGrid();
  renderRegionalSEOTable();
  renderRecoveryChart();
  renderFunnelChart();
}

// KPI Calculations & Cards
function renderKPICards() {
  const totalPipeline = leads.reduce((sum, l) => sum + l.estimatedKES, 0);
  const totalDeposits = transactions.reduce((sum, t) => sum + t.amountKES, 0);
  const deployedAssets = inventory.reduce((sum, a) => sum + a.quantityDeployed, 0);
  const totalAssets = inventory.reduce((sum, a) => sum + a.quantityTotal, 0);
  const fleetUtil = Math.round((deployedAssets / totalAssets) * 100);

  // Overview KPIs
  const elPipeline = document.getElementById('kpi-pipeline');
  const elDeposits = document.getElementById('kpi-deposits');
  const elFleet = document.getElementById('kpi-fleet');
  const elConversion = document.getElementById('kpi-conversion');

  if (elPipeline) elPipeline.textContent = 'KES ' + (totalPipeline / 1000000).toFixed(1) + 'M';
  if (elDeposits) elDeposits.textContent = 'KES ' + (totalDeposits / 1000000).toFixed(2) + 'M';
  if (elFleet) elFleet.textContent = fleetUtil + '%';
  if (elConversion) elConversion.textContent = '32.4%';

  // Update badge count
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const leadBadge = document.getElementById('nav-leads-badge');
  if (leadBadge) leadBadge.textContent = `${newLeadsCount} New`;
}

// Leads Table Rendering
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
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-glass inspect-lead-btn" data-id="${lead.id}" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;">
            Inspect
          </button>
          <a href="https://wa.me/254${lead.phone.replace(/[^0-9]/g, '').slice(-9)}" target="_blank" class="btn btn-emerald" style="padding: 0.35rem 0.65rem; font-size: 0.75rem; text-decoration: none;">
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

  // Attach click events
  document.querySelectorAll('.inspect-lead-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const lead = leads.find(l => l.id === id);
      if (lead) openLeadDrawer(lead);
    });
  });
}

// Transactions Table Rendering
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
      </td>
      <td style="font-size: 0.725rem; color: var(--slate-400);">
        ${tx.timestamp}
      </td>
    </tr>
  `;

  if (tbody) {
    tbody.innerHTML = filtered.map(generateRow).join('') || `<tr><td colspan="5" style="text-align: center; color: var(--slate-400); padding: 2rem;">No transactions recorded.</td></tr>`;
  }

  if (overviewTbody) {
    overviewTbody.innerHTML = filtered.slice(0, 3).map(generateRow).join('');
  }
}

// Inventory Table
function renderInventoryTable() {
  const tbody = document.getElementById('admin-inventory-tbody');
  if (!tbody) return;

  tbody.innerHTML = inventory.map(item => `
    <tr>
      <td><strong style="font-family: monospace; color: var(--candlelight-amber);">${item.assetCode}</strong></td>
      <td>
        <div style="font-weight: 700; color: #fff;">${item.name}</div>
        <div style="font-size: 0.7rem; color: var(--slate-400);">${item.category} • Last Service: ${item.lastService}</div>
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
        <span class="status-pill status-${item.status.toLowerCase().replace(/\s+/g, '-')}">${item.status}</span>
      </td>
    </tr>
  `).join('');
}

// Calendar Table
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
        <span class="status-pill status-confirmed">${item.status}</span>
      </td>
    </tr>
  `).join('');
}

// Packages CRUD Grid
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
        <button class="btn btn-gold edit-pkg-btn" data-id="${pkg.id}" style="flex: 1; padding: 0.45rem; font-size: 0.75rem;">
          Edit Pricing
        </button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.edit-pkg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const pkg = packages.find(p => p.id === id);
      if (!pkg) return;

      const newPrice = prompt(`Enter new starting price (KES) for "${pkg.name}":`, pkg.startingPriceKES);
      if (newPrice && !isNaN(newPrice)) {
        pkg.startingPriceKES = Number(newPrice);
        pkg.formattedPrice = 'KES ' + Number(newPrice).toLocaleString();
        saveState('packages', packages);
        showToast(`Pricing updated for ${pkg.name}`, 'success');
        renderPackagesGrid();
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

// Visual Analytics: Recovery & Funnel
function renderRecoveryChart() {
  const container = document.getElementById('recovery-bars-container');
  if (!container) return;

  const maxRecovered = 10000000;
  container.innerHTML = MONTHLY_RECOVERY_DATA.map(item => {
    const pct = Math.min(100, Math.round((item.actualRecovered / maxRecovered) * 100));
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

// 7. Modals: New Lead & Simulated STK Push
function initModals() {
  // New Lead Modal
  const leadModal = document.getElementById('admin-new-lead-modal');
  const openLeadModalBtn = document.getElementById('open-new-lead-btn');
  const closeLeadModalBtns = document.querySelectorAll('.close-lead-modal-btn');
  const leadForm = document.getElementById('admin-new-lead-form');

  if (openLeadModalBtn && leadModal) {
    openLeadModalBtn.addEventListener('click', () => {
      leadModal.style.display = 'flex';
    });
  }

  closeLeadModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (leadModal) leadModal.style.display = 'none';
    });
  });

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
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
      leadModal.style.display = 'none';
      leadForm.reset();
      showToast(`Lead created for ${newLead.clientName}`, 'success');
      renderAll();
    });
  }

  // STK Push Modal
  const stkModal = document.getElementById('admin-stk-modal');
  const openStkModalBtns = document.querySelectorAll('.open-admin-stk-btn');
  const closeStkModalBtns = document.querySelectorAll('.close-stk-modal-btn');
  const stkForm = document.getElementById('admin-stk-form');

  openStkModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (stkModal) stkModal.style.display = 'flex';
    });
  });

  closeStkModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (stkModal) stkModal.style.display = 'none';
    });
  });

  if (stkForm) {
    stkForm.addEventListener('submit', (e) => {
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

        // Confetti
        if (window.confetti) {
          window.confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        }

        showToast(`Daraja M-Pesa KES ${amount.toLocaleString()} Confirmed (${randCode})!`, 'gold');
        renderAll();
      }, 1200);
    });
  }

  // Filter Buttons for Leads & Transactions
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
