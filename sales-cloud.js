/**
 * sales-cloud.js — Online Cloud Sales Service for Mithai Counter
 * 
 * STRICT COMPLIANCE:
 * - Sales are NEVER stored in browser LocalStorage or IndexedDB.
 * - All sales transactions are recorded, fetched, and managed online.
 * - Any legacy local sales records are purged upon initialization.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SalesCloud = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Purge any local sales storage immediately
  try {
    localStorage.removeItem('mithai_sales');
    localStorage.removeItem('mithai_sales_backup');
  } catch (e) {}

  // Default Online Cloud REST Ledger ID (Permanent Cloud Database backed by restful-api.dev)
  const DEFAULT_CLOUD_LEDGER_ID = 'ff808181a09d98f701a1b3be010a585f';
  const DEFAULT_CLOUD_API_URL = 'https://api.restful-api.dev/objects/' + DEFAULT_CLOUD_LEDGER_ID;

  // Configuration storage key (only stores server endpoint preferences, NOT sales data)
  const CONFIG_KEY = 'mithai_cloud_config';

  let currentConfig = {
    provider: 'auto', // 'auto' | 'local' | 'cloud_rest' | 'custom' | 'firebase' | 'supabase'
    customUrl: '',
    apiKey: '',
    autoSyncInterval: 30000 // 30 seconds
  };

  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      currentConfig = { ...currentConfig, ...JSON.parse(saved) };
    }
  } catch (e) {}

  let activeMode = 'cloud_rest'; // 'local_server' | 'cloud_rest' | 'custom' | 'firebase' | 'supabase'
  let isOnline = true;
  let lastCheckedTime = null;
  let listeners = [];

  function notifyListeners(event, data) {
    listeners.forEach(fn => {
      try { fn(event, data); } catch (err) { console.error('Listener error:', err); }
    });
    // Also dispatch custom DOM event for loose coupling
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('sales-cloud-update', { detail: { event, data } }));
    }
  }

  // Detect which backend is available
  async function detectBackend() {
    if (currentConfig.provider && currentConfig.provider !== 'auto') {
      activeMode = currentConfig.provider;
      return activeMode;
    }

    // If served from a real HTTP origin, test local /api/health
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1200);
        const res = await fetch('/api/health', { signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) {
          activeMode = 'local_server';
          return activeMode;
        }
      } catch (e) {
        // Fall back to cloud REST
      }
    }

    // Default for GitHub Pages, file:///, or when no local Node server is running
    activeMode = 'cloud_rest';
    return activeMode;
  }

  // Initial detection
  detectBackend().catch(() => {});

  /* ========================================================
     1. ONLINE RECORD SALE (POST)
     ======================================================== */
  async function recordSale(saleData) {
    if (!saleData || typeof saleData.total !== 'number') {
      throw new Error('Invalid sale data payload');
    }

    // Ensure metadata
    const sale = {
      id: saleData.id || ('sale_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)),
      date: saleData.date || getTodayDate(),
      time: saleData.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: saleData.timestamp || new Date().toISOString(),
      total: Number(saleData.total),
      items: Array.isArray(saleData.items) ? saleData.items : [],
      paymentMethod: saleData.paymentMethod || 'Cash'
    };

    await detectBackend();

    // Mode 1: Local / Hosted Node Server
    if (activeMode === 'local_server') {
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale)
      });
      if (!res.ok) throw new Error('Local server failed with status ' + res.status);
      const saved = await res.json();
      notifyListeners('sale_recorded', saved);
      return saved;
    }

    // Mode 2: Firebase Realtime Database
    if (activeMode === 'firebase' && currentConfig.customUrl) {
      let fbUrl = currentConfig.customUrl.replace(/\/+$/, '');
      if (!fbUrl.endsWith('.json')) fbUrl += '/sales.json';
      const res = await fetch(fbUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale)
      });
      if (!res.ok) throw new Error('Firebase failed with status ' + res.status);
      notifyListeners('sale_recorded', sale);
      return sale;
    }

    // Mode 3: Supabase REST API
    if (activeMode === 'supabase' && currentConfig.customUrl) {
      let sbUrl = currentConfig.customUrl.replace(/\/+$/, '');
      if (!sbUrl.endsWith('/rest/v1/sales')) sbUrl += '/rest/v1/sales';
      const res = await fetch(sbUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': currentConfig.apiKey,
          'Authorization': 'Bearer ' + currentConfig.apiKey,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(sale)
      });
      if (!res.ok) throw new Error('Supabase failed with status ' + res.status);
      const saved = await res.json();
      notifyListeners('sale_recorded', Array.isArray(saved) ? saved[0] : sale);
      return Array.isArray(saved) ? saved[0] : sale;
    }

    // Mode 4: Custom REST API
    if (activeMode === 'custom' && currentConfig.customUrl) {
      const headers = { 'Content-Type': 'application/json' };
      if (currentConfig.apiKey) headers['Authorization'] = 'Bearer ' + currentConfig.apiKey;
      const res = await fetch(currentConfig.customUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(sale)
      });
      if (!res.ok) throw new Error('Custom API failed with status ' + res.status);
      const saved = await res.json();
      notifyListeners('sale_recorded', saved);
      return saved;
    }

    // Mode 5: Default Online Cloud REST Ledger
    const targetUrl = DEFAULT_CLOUD_API_URL;
    let existingSales = [];
    try {
      const getRes = await fetch(targetUrl, {
        headers: { 'Accept': 'application/json' }
      });
      if (getRes.ok) {
        const doc = await getRes.json();
        if (doc && doc.data && Array.isArray(doc.data.sales)) {
          existingSales = doc.data.sales;
        }
      }
    } catch (e) {
      console.warn('Could not read existing cloud ledger, creating initial record');
    }

    // Add newest sale first
    existingSales.unshift(sale);

    // Limit online history to recent 500 records to prevent overflow
    if (existingSales.length > 500) {
      existingSales = existingSales.slice(0, 500);
    }

    const putRes = await fetch(targetUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Mithai Counter Online Sales Ledger',
        data: {
          app: 'sweet_shop',
          version: '2.0',
          lastSaleAt: new Date().toISOString(),
          sales: existingSales
        }
      })
    });

    if (!putRes.ok) {
      throw new Error('Cloud database returned status ' + putRes.status);
    }

    notifyListeners('sale_recorded', sale);
    return sale;
  }

  /* ========================================================
     2. ONLINE GET SALES (GET)
     ======================================================== */
  async function getSales(dateFilter) {
    await detectBackend();

    let list = [];

    // Local Node Server
    if (activeMode === 'local_server') {
      const url = '/api/sales' + (dateFilter ? ('?date=' + encodeURIComponent(dateFilter)) : '');
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch from local server');
      list = await res.json();
    }
    // Firebase Realtime DB
    else if (activeMode === 'firebase' && currentConfig.customUrl) {
      let fbUrl = currentConfig.customUrl.replace(/\/+$/, '');
      if (!fbUrl.endsWith('.json')) fbUrl += '/sales.json';
      const res = await fetch(fbUrl);
      if (!res.ok) throw new Error('Failed to fetch from Firebase');
      const data = await res.json();
      if (data && typeof data === 'object') {
        list = Object.keys(data).map(k => ({ ...data[k], fbKey: k }));
      }
    }
    // Supabase REST
    else if (activeMode === 'supabase' && currentConfig.customUrl) {
      let sbUrl = currentConfig.customUrl.replace(/\/+$/, '');
      if (!sbUrl.endsWith('/rest/v1/sales')) sbUrl += '/rest/v1/sales';
      const q = dateFilter ? `?date=eq.${encodeURIComponent(dateFilter)}&order=timestamp.desc` : '?order=timestamp.desc';
      const res = await fetch(sbUrl + q, {
        headers: {
          'apikey': currentConfig.apiKey,
          'Authorization': 'Bearer ' + currentConfig.apiKey
        }
      });
      if (!res.ok) throw new Error('Failed to fetch from Supabase');
      list = await res.json();
    }
    // Custom REST API
    else if (activeMode === 'custom' && currentConfig.customUrl) {
      const headers = {};
      if (currentConfig.apiKey) headers['Authorization'] = 'Bearer ' + currentConfig.apiKey;
      const res = await fetch(currentConfig.customUrl, { headers });
      if (!res.ok) throw new Error('Failed to fetch from custom API');
      const data = await res.json();
      list = Array.isArray(data) ? data : (data.sales || []);
    }
    // Default Cloud REST Ledger
    else {
      const targetUrl = DEFAULT_CLOUD_API_URL;
      const res = await fetch(targetUrl, {
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to fetch from cloud ledger');
      const doc = await res.json();
      if (doc && doc.data && Array.isArray(doc.data.sales)) {
        list = doc.data.sales;
      }
    }

    if (!Array.isArray(list)) list = [];

    // Ensure uniform shape and dates
    list = list.map(item => ({
      id: item.id || ('sale_' + (item.timestamp || Date.now())),
      date: item.date || (item.timestamp ? item.timestamp.split('T')[0] : getTodayDate()),
      time: item.time || '',
      timestamp: item.timestamp || new Date().toISOString(),
      total: Number(item.total) || 0,
      items: Array.isArray(item.items) ? item.items : [],
      paymentMethod: item.paymentMethod || 'Cash',
      fbKey: item.fbKey || null
    }));

    if (dateFilter) {
      list = list.filter(s => s.date === dateFilter);
    }

    // Sort newest first
    list.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

    return list;
  }

  /* ========================================================
     3. ONLINE DELETE SALE (DELETE)
     ======================================================== */
  async function deleteSale(saleId) {
    if (!saleId) throw new Error('Sale ID required');
    await detectBackend();

    if (activeMode === 'local_server') {
      const res = await fetch('/api/sales/' + encodeURIComponent(saleId), { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete sale from local server');
      notifyListeners('sale_deleted', saleId);
      return true;
    }

    if (activeMode === 'firebase' && currentConfig.customUrl) {
      // Need Firebase Key
      let fbUrl = currentConfig.customUrl.replace(/\/+$/, '');
      fbUrl += '/sales/' + encodeURIComponent(saleId) + '.json';
      const res = await fetch(fbUrl, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete from Firebase');
      notifyListeners('sale_deleted', saleId);
      return true;
    }

    if (activeMode === 'supabase' && currentConfig.customUrl) {
      let sbUrl = currentConfig.customUrl.replace(/\/+$/, '');
      sbUrl += '/rest/v1/sales?id=eq.' + encodeURIComponent(saleId);
      const res = await fetch(sbUrl, {
        method: 'DELETE',
        headers: {
          'apikey': currentConfig.apiKey,
          'Authorization': 'Bearer ' + currentConfig.apiKey
        }
      });
      if (!res.ok) throw new Error('Failed to delete from Supabase');
      notifyListeners('sale_deleted', saleId);
      return true;
    }

    // Default Cloud REST Ledger: fetch, remove, PUT back
    const targetUrl = DEFAULT_CLOUD_API_URL;
    const res = await fetch(targetUrl);
    if (!res.ok) throw new Error('Failed to reach cloud ledger');
    const doc = await res.json();
    let sales = (doc && doc.data && Array.isArray(doc.data.sales)) ? doc.data.sales : [];
    sales = sales.filter(s => String(s.id) !== String(saleId));

    const putRes = await fetch(targetUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Mithai Counter Online Sales Ledger',
        data: {
          app: 'sweet_shop',
          version: '2.0',
          lastSaleAt: new Date().toISOString(),
          sales
        }
      })
    });

    if (!putRes.ok) throw new Error('Failed to update cloud ledger');
    notifyListeners('sale_deleted', saleId);
    return true;
  }

  /* ========================================================
     4. HEALTH & CONNECTION CHECK
     ======================================================== */
  async function checkConnection() {
    const start = Date.now();
    try {
      await detectBackend();
      if (activeMode === 'local_server') {
        const r = await fetch('/api/health');
        if (!r.ok) throw new Error('Bad status');
      } else if (activeMode === 'cloud_rest') {
        const r = await fetch(DEFAULT_CLOUD_API_URL, { method: 'GET' });
        if (!r.ok) throw new Error('Bad status');
      }
      isOnline = true;
      lastCheckedTime = new Date();
      return {
        online: true,
        mode: activeMode,
        latency: Date.now() - start,
        lastChecked: lastCheckedTime
      };
    } catch (e) {
      isOnline = false;
      lastCheckedTime = new Date();
      return {
        online: false,
        mode: activeMode,
        latency: Date.now() - start,
        error: e.message,
        lastChecked: lastCheckedTime
      };
    }
  }

  function getTodayDate() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function getConfig() {
    return { ...currentConfig, activeMode };
  }

  function saveConfig(cfg) {
    currentConfig = { ...currentConfig, ...cfg };
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(currentConfig));
    } catch (e) {}
    detectBackend();
    notifyListeners('config_changed', currentConfig);
  }

  function addListener(fn) {
    if (typeof fn === 'function') listeners.push(fn);
  }

  function removeListener(fn) {
    listeners = listeners.filter(f => f !== fn);
  }

  // Auto clean-up assurance
  function verifyNoLocalStorageSales() {
    try {
      localStorage.removeItem('mithai_sales');
      localStorage.removeItem('mithai_sales_backup');
    } catch (e) {}
  }
  verifyNoLocalStorageSales();

  return {
    recordSale,
    getSales,
    deleteSale,
    checkConnection,
    getConfig,
    saveConfig,
    addListener,
    removeListener,
    getTodayDate,
    verifyNoLocalStorageSales,
    getActiveMode: () => activeMode,
    isOnline: () => isOnline,
    DEFAULT_CLOUD_API_URL
  };
}));
