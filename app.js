(() => {
  const STORAGE_KEY = 'expense-tracker-v1';
  const CURRENCY = '৳';

  // Muted, distinct colours. Used only for chart slices and small dots.
  const CATEGORIES = {
    Food:      '#c2703d',
    Transport: '#4f7cac',
    Rent:      '#7a5c8e',
    Bills:     '#b8963e',
    Shopping:  '#b5586b',
    Health:    '#4a8f6f',
    Fun:       '#d08a3c',
    Other:     '#8a857a'
  };
  const CAT_NAMES = Object.keys(CATEGORIES);

  const $ = (id) => document.getElementById(id);

  // ---------- Helpers ----------
  const pad = (n) => String(n).padStart(2, '0');
  const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayISO = () => toISO(new Date());
  const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return toISO(d); };
  // Parse YYYY-MM-DD as a local date (avoids timezone shifts)
  const parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const money = (n) => CURRENCY + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (s) => parseISO(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const newId = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));

  // ---------- State ----------
  let expenses = load();
  let editingId = null;
  let lastDeleted = null; // { expense, index }
  let toastTimer = null;

  function seed() {
    return [
      { date: daysAgo(1),  category: 'Food',      amount: 450,   description: 'Lunch with friends' },
      { date: daysAgo(2),  category: 'Transport', amount: 120,   description: 'Rickshaw to campus' },
      { date: daysAgo(4),  category: 'Shopping',  amount: 2300,  description: 'New headphones' },
      { date: daysAgo(6),  category: 'Bills',     amount: 1450,  description: 'Internet bill' },
      { date: daysAgo(9),  category: 'Food',      amount: 780,   description: 'Groceries' },
      { date: daysAgo(12), category: 'Fun',       amount: 600,   description: 'Movie night' },
      { date: daysAgo(15), category: 'Health',    amount: 350,   description: 'Pharmacy' },
      { date: daysAgo(20), category: 'Rent',      amount: 12000, description: 'Monthly rent' },
      { date: daysAgo(34), category: 'Food',      amount: 920,   description: 'Dinner out' },
      { date: daysAgo(41), category: 'Transport', amount: 400,   description: 'Bus pass' },
      { date: daysAgo(52), category: 'Rent',      amount: 12000, description: 'Monthly rent' },
      { date: daysAgo(63), category: 'Shopping',  amount: 1800,  description: 'Winter jacket' },
      { date: daysAgo(75), category: 'Bills',     amount: 1380,  description: 'Electricity' }
    ].map((e) => ({ id: newId(), ...e }));
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        const s = seed();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
        return s;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)); } catch { /* storage unavailable */ }
  }

  // ---------- Filtering ----------
  function getFilters() {
    return {
      category: $('fCategory').value,
      from: $('fFrom').value,
      to: $('fTo').value,
      min: $('fMin').value === '' ? null : Number($('fMin').value),
      max: $('fMax').value === '' ? null : Number($('fMax').value)
    };
  }

  function filtersActive(f) {
    return f.category !== 'all' || f.from || f.to || f.min !== null || f.max !== null;
  }

  function filtered() {
    const f = getFilters();
    return expenses
      .filter((e) =>
        (f.category === 'all' || e.category === f.category) &&
        (!f.from || e.date >= f.from) &&
        (!f.to || e.date <= f.to) &&
        (f.min === null || e.amount >= f.min) &&
        (f.max === null || e.amount <= f.max))
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }

  // ---------- Rendering ----------
  function renderHeader() {
    const now = new Date();
    const prefix = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
    const total = expenses.filter((e) => e.date.startsWith(prefix)).reduce((s, e) => s + e.amount, 0);
    $('monthLabel').textContent = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    $('monthTotal').textContent = money(total);
  }

  function renderList(items) {
    const list = $('list');
    const empty = $('empty');
    if (items.length === 0) {
      list.innerHTML = '';
      list.classList.add('hidden');
      empty.classList.remove('hidden');
      empty.textContent = expenses.length === 0
        ? 'No expenses yet. Add your first one with the button at the top.'
        : 'Nothing matches these filters. Try widening them or clear the filters.';
      return;
    }
    list.classList.remove('hidden');
    empty.classList.add('hidden');
    list.innerHTML = items.map((e) => `
      <li class="flex items-center gap-3 px-4 py-3" data-id="${e.id}">
        <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${CATEGORIES[e.category] || CATEGORIES.Other}"></span>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium truncate">${esc(e.description) || '<span class="text-mute">No description</span>'}</p>
          <p class="text-xs text-mute">${esc(e.category)} &middot; ${fmtDate(e.date)}</p>
        </div>
        <p class="money text-sm font-semibold shrink-0">${money(e.amount)}</p>
        <div class="flex shrink-0">
          <button class="row-btn" data-act="edit" aria-label="Edit ${esc(e.description)}">Edit</button>
          <button class="row-btn" data-act="delete" aria-label="Delete ${esc(e.description)}">Delete</button>
        </div>
      </li>`).join('');
  }

  function renderSummary(items) {
    const total = items.reduce((s, e) => s + e.amount, 0);
    const byCat = {};
    items.forEach((e) => { byCat[e.category] = (byCat[e.category] || 0) + e.amount; });
    const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);

    $('sumTotal').textContent = money(total);
    $('sumCount').textContent = `${items.length} expense${items.length === 1 ? '' : 's'}`;

    if (cats.length === 0) {
      $('sumAvg').textContent = money(0);
      $('sumAvgNote').textContent = '';
      $('sumTop').textContent = 'None';
      $('sumTopNote').textContent = '';
      return;
    }
    $('sumAvg').textContent = money(total / cats.length);
    $('sumAvgNote').textContent = `across ${cats.length} categor${cats.length === 1 ? 'y' : 'ies'}`;
    $('sumTop').textContent = cats[0][0];
    $('sumTopNote').textContent = `${money(cats[0][1])} (${Math.round((cats[0][1] / total) * 100)}%)`;
  }

  // ---------- Charts ----------
  let pie, bar;
  Chart.defaults.font.family = 'Figtree, system-ui, sans-serif';
  Chart.defaults.color = '#9aabc7';

  function renderCharts(items) {
    const byCat = {};
    items.forEach((e) => { byCat[e.category] = (byCat[e.category] || 0) + e.amount; });
    const catLabels = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a]);

    const hasData = items.length > 0;
    $('pieEmpty').classList.toggle('hidden', hasData);
    $('barEmpty').classList.toggle('hidden', hasData);
    $('pieChart').classList.toggle('invisible', !hasData);
    $('barChart').classList.toggle('invisible', !hasData);

    // Doughnut
    const pieData = {
      labels: catLabels,
      datasets: [{
        data: catLabels.map((c) => byCat[c]),
        backgroundColor: catLabels.map((c) => CATEGORIES[c]),
        borderColor: '#12264a',
        borderWidth: 2
      }]
    };
    if (!pie) {
      pie = new Chart($('pieChart'), {
        type: 'doughnut',
        data: pieData,
        options: {
          maintainAspectRatio: false,
          cutout: '62%',
          plugins: {
            legend: { position: 'right', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, font: { size: 12 } } },
            tooltip: { callbacks: { label: (c) => ` ${c.label}: ${money(c.parsed)}` } }
          }
        }
      });
    } else {
      pie.data = pieData;
      pie.update();
    }

    // Bar: by day when the span is under ~45 days, otherwise by month
    const f = getFilters();
    const dates = items.map((e) => e.date).sort();
    const start = f.from || dates[0];
    const end = f.to || dates[dates.length - 1];
    let spanDays = Infinity;
    if (start && end) spanDays = (parseISO(end) - parseISO(start)) / 86400000;
    const byDay = hasData && spanDays < 45;

    const buckets = {};
    items.forEach((e) => {
      const key = byDay ? e.date : e.date.slice(0, 7);
      buckets[key] = (buckets[key] || 0) + e.amount;
    });
    const keys = Object.keys(buckets).sort();
    const labels = keys.map((k) => byDay
      ? parseISO(k).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      : parseISO(k + '-01').toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }));

    $('barMode').textContent = hasData ? (byDay ? '(by day)' : '(by month)') : '';

    const barData = {
      labels,
      datasets: [{ data: keys.map((k) => buckets[k]), backgroundColor: '#2fa894', borderRadius: 4, maxBarThickness: 36 }]
    };
    if (!bar) {
      bar = new Chart($('barChart'), {
        type: 'bar',
        data: barData,
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (c) => ` ${money(c.parsed.y)}` } }
          },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { color: '#1f3760' }, ticks: { callback: (v) => CURRENCY + v.toLocaleString('en-US') } }
          }
        }
      });
    } else {
      bar.data = barData;
      bar.update();
    }
  }

  function render() {
    const items = filtered();
    renderHeader();
    renderList(items);
    renderSummary(items);
    renderCharts(items);
  }

  // ---------- Modal ----------
  const modal = $('modal');

  function fillCategorySelects() {
    $('category').innerHTML = CAT_NAMES.map((c) => `<option value="${c}">${c}</option>`).join('');
    $('fCategory').innerHTML = '<option value="all">All categories</option>' +
      CAT_NAMES.map((c) => `<option value="${c}">${c}</option>`).join('');
  }

  function clearErrors() {
    document.querySelectorAll('.err').forEach((el) => { el.textContent = ''; });
    document.querySelectorAll('.field.invalid').forEach((el) => el.classList.remove('invalid'));
  }

  function openModal(expense) {
    clearErrors();
    editingId = expense ? expense.id : null;
    $('modalTitle').textContent = expense ? 'Edit expense' : 'Add expense';
    $('date').value = expense ? expense.date : todayISO();
    $('category').value = expense ? expense.category : CAT_NAMES[0];
    $('amount').value = expense ? expense.amount : '';
    $('description').value = expense ? expense.description : '';
    modal.showModal();
    $(expense ? 'amount' : 'amount').focus();
  }

  function closeModal() { modal.close(); }

  function setError(field, msg) {
    document.querySelector(`.err[data-for="${field}"]`).textContent = msg;
    $(field).classList.add('invalid');
  }

  function onSubmit(ev) {
    ev.preventDefault();
    clearErrors();
    const date = $('date').value;
    const category = $('category').value;
    const amount = Math.round(parseFloat($('amount').value) * 100) / 100;
    const description = $('description').value.trim();

    let ok = true;
    if (!date) { setError('date', 'Pick a date.'); ok = false; }
    if (!category) { setError('category', 'Pick a category.'); ok = false; }
    if (!(amount > 0)) { setError('amount', 'Enter an amount greater than 0.'); ok = false; }
    if (!ok) return;

    if (editingId) {
      expenses = expenses.map((e) => (e.id === editingId ? { ...e, date, category, amount, description } : e));
    } else {
      expenses.push({ id: newId(), date, category, amount, description });
    }
    save();
    closeModal();
    render();
  }

  // ---------- Delete + undo ----------
  function showToast(msg, withUndo) {
    $('toastMsg').textContent = msg;
    $('toastUndo').classList.toggle('hidden', !withUndo);
    $('toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('toast').classList.remove('show'), 5000);
  }

  function deleteExpense(id) {
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) return;
    lastDeleted = { expense: expenses[index], index };
    expenses.splice(index, 1);
    save();
    render();
    showToast('Expense deleted.', true);
  }

  function undoDelete() {
    if (!lastDeleted) return;
    expenses.splice(lastDeleted.index, 0, lastDeleted.expense);
    lastDeleted = null;
    save();
    render();
    $('toast').classList.remove('show');
  }

  // ---------- Events ----------
  function onListClick(ev) {
    const btn = ev.target.closest('button[data-act]');
    if (!btn) return;
    const id = btn.closest('li').dataset.id;

    if (btn.dataset.act === 'edit') {
      openModal(expenses.find((e) => e.id === id));
      return;
    }
    // Two-step delete: first click asks, second click confirms
    if (btn.classList.contains('confirm')) {
      deleteExpense(id);
    } else {
      btn.classList.add('confirm');
      btn.textContent = 'Sure?';
      setTimeout(() => {
        if (btn.isConnected) { btn.classList.remove('confirm'); btn.textContent = 'Delete'; }
      }, 3000);
    }
  }

  function clearFilters() {
    $('fCategory').value = 'all';
    ['fFrom', 'fTo', 'fMin', 'fMax'].forEach((id) => { $(id).value = ''; });
    render();
  }

  function clearAll() {
    if (expenses.length === 0) return;
    if (!confirm('Delete all expenses? This cannot be undone.')) return;
    expenses = [];
    save();
    render();
  }

  function init() {
    fillCategorySelects();
    $('addBtn').addEventListener('click', () => openModal(null));
    $('closeModal').addEventListener('click', closeModal);
    $('cancelBtn').addEventListener('click', closeModal);
    $('form').addEventListener('submit', onSubmit);
    // Click on backdrop closes the modal
    modal.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });
    $('list').addEventListener('click', onListClick);
    $('toastUndo').addEventListener('click', undoDelete);
    $('clearFilters').addEventListener('click', clearFilters);
    $('clearAll').addEventListener('click', clearAll);
    ['fCategory', 'fFrom', 'fTo', 'fMin', 'fMax'].forEach((id) => {
      $(id).addEventListener('input', render);
    });
    render();
  }

  init();
})();
