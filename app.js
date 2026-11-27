(() => {
  const KEYS = {
    expenses: 'expense-tracker-v1',
    budgets: 'expense-tracker-budgets-v1',
    goals: 'expense-tracker-goals-v1'
  };
  const CURRENCY = '৳';

  // Muted, distinct colours. Used for chart slices, icon tiles and budget bars.
  const CATEGORIES = {
    Food:      '#c2703d',
    Transport: '#4f7cac',
    Rent:      '#7a5c8e',
    Bills:     '#5fb0c0',
    Shopping:  '#b5586b',
    Health:    '#7cc4a0',
    Fun:       '#d08a3c',
    Other:     '#8a857a'
  };
  const CAT_NAMES = Object.keys(CATEGORIES);

  // Lucide outline icon per category
  const CATEGORY_ICONS = {
    Food: 'utensils',
    Transport: 'bus',
    Rent: 'house',
    Bills: 'receipt',
    Shopping: 'shopping-bag',
    Health: 'heart-pulse',
    Fun: 'ticket',
    Other: 'shapes'
  };

  // Monthly budget presets (৳)
  const TEMPLATES = {
    Student: { Food: 5000,  Transport: 1500, Rent: 4000,  Bills: 800,  Shopping: 1500, Health: 500,  Fun: 1000, Other: 500 },
    Single:  { Food: 8000,  Transport: 2500, Rent: 12000, Bills: 2000, Shopping: 3000, Health: 1000, Fun: 2000, Other: 1000 },
    Family:  { Food: 18000, Transport: 5000, Rent: 25000, Bills: 5000, Shopping: 6000, Health: 3000, Fun: 3000, Other: 2000 }
  };

  const $ = (id) => document.getElementById(id);

  // ---------- Helpers ----------
  const pad = (n) => String(n).padStart(2, '0');
  const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayISO = () => toISO(new Date());
  const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return toISO(d); };
  // Parse YYYY-MM-DD as a local date (avoids timezone shifts)
  const parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const money = (n) => CURRENCY + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const moneyShort = (n) => CURRENCY + Math.round(n).toLocaleString('en-US');
  const round2 = (n) => Math.round(n * 100) / 100;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (s) => parseISO(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const newId = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));
  const plural = (n, word, many = word + 's') => `${n} ${n === 1 ? word : many}`;
  const listJoin = (a) => (a.length <= 1 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
  const sumOf = (items) => items.reduce((s, e) => s + e.amount, 0);
  const byCategory = (items) => {
    const out = {};
    items.forEach((e) => { out[e.category] = (out[e.category] || 0) + e.amount; });
    return out;
  };
  const catColor = (c) => CATEGORIES[c] || CATEGORIES.Other;
  const iconTile = (c, size = '') =>
    `<span class="icon-tile ${size}" style="--c:${catColor(c)}" aria-hidden="true"><i data-lucide="${CATEGORY_ICONS[c] || CATEGORY_ICONS.Other}"></i></span>`;

  // Months are "YYYY-MM" strings
  const toYM = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  const thisMonth = () => toYM(new Date());
  const shiftMonth = (ym, n) => { const [y, m] = ym.split('-').map(Number); return toYM(new Date(y, m - 1 + n, 1)); };
  const monthName = (ym, withYear = false) => {
    const [y, m] = ym.split('-').map(Number);
    const showYear = withYear || y !== new Date().getFullYear();
    return new Date(y, m - 1, 1).toLocaleDateString('en-GB', showYear ? { month: 'long', year: 'numeric' } : { month: 'long' });
  };
  const daysInMonth = (ym) => { const [y, m] = ym.split('-').map(Number); return new Date(y, m, 0).getDate(); };
  const daysLeftInMonth = () => daysInMonth(thisMonth()) - new Date().getDate() + 1; // includes today
  const monthsBetween = (a, b) => { // inclusive count of months from a to b
    const [ya, ma] = a.split('-').map(Number);
    const [yb, mb] = b.split('-').map(Number);
    return Math.max(1, (yb - ya) * 12 + (mb - ma) + 1);
  };

  // ---------- State ----------
  function seedExpenses() {
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

  const seedBudgets = () => ({ ...TEMPLATES.Single });
  const seedGoals = () => [{ id: newId(), name: 'Eid shopping', target: 10000, saved: 3500 }];
  const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

  // Load a key; seed it on first visit; fall back to `empty` if the stored value is broken.
  function loadKey(key, seedFn, isValid, empty) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        const seeded = seedFn();
        localStorage.setItem(key, JSON.stringify(seeded));
        return seeded;
      }
      const parsed = JSON.parse(raw);
      return isValid(parsed) ? parsed : empty;
    } catch {
      return empty;
    }
  }

  function saveKey(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  }

  let expenses = loadKey(KEYS.expenses, seedExpenses, Array.isArray, []);
  let budgets = loadKey(KEYS.budgets, seedBudgets, isPlainObject, {});
  let goals = loadKey(KEYS.goals, seedGoals, Array.isArray, []);
  const saveExpenses = () => saveKey(KEYS.expenses, expenses);
  const saveBudgets = () => saveKey(KEYS.budgets, budgets);
  const saveGoals = () => saveKey(KEYS.goals, goals);

  let viewMonth = thisMonth();
  let editingId = null;
  let editingGoalId = null;
  let fundingGoalId = null;
  let undoAction = null;
  let toastTimer = null;

  const monthItems = (ym) => expenses.filter((e) => e.date.startsWith(ym));
  const budgetedCats = () => CAT_NAMES.filter((c) => budgets[c] > 0);
  const budgetTotal = () => budgetedCats().reduce((s, c) => s + budgets[c], 0);

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

  // Date span the filtered set covers: filter dates win, otherwise first expense to today.
  function spanOf(items, f) {
    const dates = items.map((e) => e.date).sort();
    const start = f.from || dates[0];
    let end = f.to || todayISO();
    if (!f.to && dates[dates.length - 1] > end) end = dates[dates.length - 1];
    if (end < start) end = start;
    return { start, end };
  }

  // ---------- Rendering: header + month summary ----------
  function renderHeader() {
    $('monthLabel').textContent = monthName(viewMonth, true);
    $('nextMonth').disabled = viewMonth >= thisMonth();
    const first = expenses.reduce((min, e) => (!min || e.date < min ? e.date : min), '');
    $('trackingSince').textContent = first
      ? `Tracking since ${parseISO(first).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`
      : 'Start tracking today';
  }

  function renderMonthSummary() {
    const items = monthItems(viewMonth);
    const spent = sumOf(items);
    const prevMonth = shiftMonth(viewMonth, -1);
    const prev = sumOf(monthItems(prevMonth));
    const isCurrent = viewMonth === thisMonth();
    const name = monthName(viewMonth);
    const amt = (n) => `<span class="money text-accent-bright">${moneyShort(n)}</span>`;

    let head;
    if (spent === 0) {
      head = isCurrent ? `Nothing spent in ${name} yet.` : `Nothing tracked in ${name}.`;
    } else {
      head = `${isCurrent ? "You've spent" : 'You spent'} ${amt(spent)} in ${name}`;
      if (prev > 0) {
        const diff = spent - prev;
        head += Math.abs(diff) < 1
          ? `, about the same as ${monthName(prevMonth)}.`
          : `, ${amt(Math.abs(diff))} ${diff < 0 ? 'less' : 'more'} than ${monthName(prevMonth)}.`;
      } else {
        head += '.';
      }
    }

    const sub = [];
    if (spent > 0 && prev === 0) {
      sub.push(expenses.some((e) => e.date < viewMonth)
        ? `Nothing tracked in ${monthName(prevMonth)} to compare with.`
        : 'Your first tracked month.');
    }
    const total = budgetTotal();
    if (total > 0) {
      const left = total - spent;
      sub.push(left >= 0
        ? `${moneyShort(left)} left of your ${moneyShort(total)} budget`
        : `${moneyShort(-left)} over your ${moneyShort(total)} budget`);
      if (isCurrent) sub.push(`${plural(daysLeftInMonth(), 'day')} left`);
      const byCat = byCategory(items);
      const over = budgetedCats().filter((c) => (byCat[c] || 0) > budgets[c]);
      if (over.length) sub.push(`Over budget on ${listJoin(over)}.`);
      else if (spent > 0) sub.push(isCurrent ? 'Nice, every category is within budget.' : 'Every category stayed within budget.');
    }

    $('monthHeadline').innerHTML = head;
    $('monthSub').textContent = sub.join(' · ');
  }

  // ---------- Rendering: stat tiles ----------
  function renderSummary(items) {
    const f = getFilters();
    $('filteredChip').classList.toggle('hidden', !filtersActive(f));

    const total = sumOf(items);
    const cats = Object.entries(byCategory(items)).sort((a, b) => b[1] - a[1]);

    $('sumTotal').textContent = money(total);
    $('sumCount').textContent = plural(items.length, 'expense');

    if (items.length === 0) {
      $('sumDaily').textContent = money(0);
      $('sumDailyNote').textContent = '';
      $('sumAvg').textContent = money(0);
      $('sumAvgNote').textContent = '';
      $('sumTop').textContent = 'None';
      $('sumTopNote').textContent = '';
      return;
    }

    const { start, end } = spanOf(items, f);
    const days = Math.round((parseISO(end) - parseISO(start)) / 86400000) + 1;
    $('sumDaily').textContent = money(total / days);
    $('sumDailyNote').textContent = `over ${plural(days, 'day')}`;

    $('sumAvg').textContent = money(total / cats.length);
    $('sumAvgNote').textContent = `across ${plural(cats.length, 'category', 'categories')}`;
    $('sumTop').textContent = cats[0][0];
    $('sumTopNote').textContent = `${money(cats[0][1])} (${Math.round((cats[0][1] / total) * 100)}%)`;
  }

  // ---------- Rendering: budgets ----------
  function renderBudgets() {
    const items = monthItems(viewMonth);
    const byCat = byCategory(items);
    const isCurrent = viewMonth === thisMonth();
    const cats = budgetedCats();

    $('budgetMonth').textContent = `· ${monthName(viewMonth)}`;
    $('budgetList').classList.toggle('hidden', cats.length === 0);
    $('budgetEmpty').classList.toggle('hidden', cats.length > 0);

    if (cats.length === 0) {
      $('budgetList').innerHTML = '';
      $('budgetNote').textContent = '';
      return;
    }

    $('budgetList').innerHTML = cats.map((c) => {
      const spent = byCat[c] || 0;
      const limit = budgets[c];
      const pct = Math.min(100, (spent / limit) * 100);
      const over = spent > limit;
      const note = over
        ? `<span class="text-danger font-medium">${moneyShort(spent - limit)} over</span>`
        : `${moneyShort(limit - spent)} left`;
      return `
        <li class="flex items-center gap-3">
          ${iconTile(c, 'sm')}
          <div class="flex-1 min-w-0">
            <div class="flex items-baseline justify-between gap-2">
              <span class="text-sm font-medium">${c}</span>
              <span class="money text-xs text-mute whitespace-nowrap"><span class="text-sm font-semibold text-ink">${moneyShort(spent)}</span> of ${moneyShort(limit)}</span>
            </div>
            <div class="bar mt-1.5" role="progressbar" aria-label="${c} budget used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}">
              <span style="width:${pct}%;background:${over ? '#ff7a6e' : catColor(c)}"></span>
            </div>
            <p class="money text-xs text-mute mt-1">${note}</p>
          </div>
        </li>`;
    }).join('');

    const total = budgetTotal();
    const budgetedSpent = cats.reduce((s, c) => s + (byCat[c] || 0), 0);
    const left = total - budgetedSpent;
    const unbudgeted = sumOf(items) - budgetedSpent;
    const parts = [];
    if (isCurrent) {
      parts.push(left > 0
        ? `About ${moneyShort(left / daysLeftInMonth())}/day keeps you on budget.`
        : `You've used the whole budget for ${monthName(viewMonth)}.`);
    } else {
      parts.push(`Spent ${moneyShort(budgetedSpent)} of ${moneyShort(total)}.`);
    }
    if (unbudgeted > 0) parts.push(`${moneyShort(unbudgeted)} spent outside budgets.`);
    $('budgetNote').textContent = parts.join(' ');
  }

  // ---------- Rendering: savings goals ----------
  function renderGoals() {
    $('goalList').classList.toggle('hidden', goals.length === 0);
    $('goalEmpty').classList.toggle('hidden', goals.length > 0);

    const saved = goals.reduce((s, g) => s + g.saved, 0);
    const target = goals.reduce((s, g) => s + g.target, 0);
    $('goalNote').textContent = goals.length ? `${moneyShort(saved)} saved toward ${moneyShort(target)}` : '';

    $('goalList').innerHTML = goals.map((g) => {
      const pct = g.target > 0 ? Math.min(100, (g.saved / g.target) * 100) : 0;
      const done = g.saved >= g.target;
      const status = done
        ? '<span class="text-accent-bright font-semibold">Goal reached</span>'
        : `${Math.floor(pct)}%`;
      return `
        <li data-id="${esc(g.id)}">
          <div class="flex items-baseline justify-between gap-2">
            <p class="text-sm font-medium truncate">${esc(g.name)}</p>
            <p class="text-xs text-mute shrink-0">${status}</p>
          </div>
          <div class="bar mt-1.5" role="progressbar" aria-label="${esc(g.name)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}">
            <span class="bg-accent-bright" style="width:${pct}%"></span>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-x-2 mt-1.5">
            <p class="money text-xs text-mute"><span class="font-semibold text-ink">${moneyShort(g.saved)}</span> of ${moneyShort(g.target)}${done ? '' : ` · ${moneyShort(g.target - g.saved)} to go`}</p>
            <div class="flex -mr-1.5">
              <button class="row-btn" data-act="fund" aria-label="Add money to ${esc(g.name)}">Add money</button>
              <button class="row-btn" data-act="edit" aria-label="Edit ${esc(g.name)}">Edit</button>
              <button class="row-btn" data-act="delete" aria-label="Delete ${esc(g.name)}">Delete</button>
            </div>
          </div>
        </li>`;
    }).join('');
  }

  // ---------- Rendering: expense list ----------
  function renderList(items) {
    const list = $('list');
    const empty = $('empty');
    if (items.length === 0) {
      list.innerHTML = '';
      list.classList.add('hidden');
      empty.classList.remove('hidden');
      empty.innerHTML = expenses.length === 0
        ? `<p class="text-base font-semibold text-ink">Let's set up your month</p>
           <ol class="steps">
             <li><span class="step-num">1</span>Add your first expense</li>
             <li><span class="step-num">2</span>Set a monthly budget</li>
             <li><span class="step-num">3</span>Watch your month take shape</li>
           </ol>
           <button data-empty-act="add" class="btn-primary">+ Add your first expense</button>`
        : '<p>Nothing matches these filters. Try widening them, or clear the filters.</p>';
      return;
    }
    list.classList.remove('hidden');
    empty.classList.add('hidden');
    list.innerHTML = items.map((e) => `
      <li class="flex items-center gap-3 px-4 py-3" data-id="${esc(e.id)}">
        ${iconTile(e.category)}
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

  // ---------- Charts ----------
  const charts = {};
  Chart.defaults.font.family = 'Figtree, system-ui, sans-serif';
  Chart.defaults.color = '#a9bdb3';
  const GRID = '#173f36';
  const tickMoney = (v) => CURRENCY + Number(v).toLocaleString('en-US');

  function drawChart(id, config) {
    if (charts[id]) {
      charts[id].data = config.data;
      charts[id].update();
    } else {
      charts[id] = new Chart($(id), config);
    }
  }

  function setChartEmpty(id, isEmpty) {
    $(id + 'Empty').classList.toggle('hidden', !isEmpty);
    $(id + 'Chart').classList.toggle('invisible', isEmpty);
  }

  function renderCharts(items) {
    const f = getFilters();
    const byCat = byCategory(items);
    const hasData = items.length > 0;
    ['pie', 'bar', 'avg'].forEach((id) => setChartEmpty(id, !hasData));

    // Doughnut
    const catLabels = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a]);
    drawChart('pieChart', {
      type: 'doughnut',
      data: {
        labels: catLabels,
        datasets: [{
          data: catLabels.map((c) => byCat[c]),
          backgroundColor: catLabels.map(catColor),
          borderColor: '#0c3029',
          borderWidth: 2
        }]
      },
      options: {
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, font: { size: 12 } } },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${money(c.parsed)}` } }
        }
      }
    });

    // Bar over time: by day when the span is under ~45 days, otherwise by month
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
    $('barMode').textContent = hasData ? (byDay ? '(by day)' : '(by month)') : '';
    drawChart('barChart', {
      type: 'bar',
      data: {
        labels: keys.map((k) => byDay
          ? parseISO(k).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
          : parseISO(k + '-01').toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })),
        datasets: [{ data: keys.map((k) => buckets[k]), backgroundColor: '#f1d29b', borderRadius: 4, maxBarThickness: 36 }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c) => ` ${money(c.parsed.y)}` } }
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: GRID }, ticks: { callback: tickMoney } }
        }
      }
    });

    // Monthly average per category vs budget
    let months = 1;
    if (hasData) {
      const span = spanOf(items, f);
      months = monthsBetween(span.start.slice(0, 7), span.end.slice(0, 7));
    }
    const avgCats = CAT_NAMES
      .filter((c) => byCat[c] > 0 || (budgets[c] > 0 && (f.category === 'all' || f.category === c)))
      .sort((a, b) => (byCat[b] || 0) - (byCat[a] || 0));
    $('avgNote').textContent = hasData
      ? `Average per month over ${plural(months, 'month')} · grey bars show your budget`
      : '';
    drawChart('avgChart', {
      type: 'bar',
      data: {
        labels: avgCats,
        datasets: [
          {
            label: 'Monthly average',
            data: avgCats.map((c) => (byCat[c] || 0) / months),
            backgroundColor: avgCats.map(catColor),
            borderRadius: 4,
            categoryPercentage: 0.75,
            barPercentage: 0.9
          },
          {
            label: 'Budget',
            data: avgCats.map((c) => budgets[c] || 0),
            backgroundColor: 'rgba(169, 189, 179, 0.28)',
            borderRadius: 4,
            categoryPercentage: 0.75,
            barPercentage: 0.9
          }
        ]
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c) => ` ${c.dataset.label}: ${money(c.parsed.x)}` } }
        },
        scales: {
          x: { beginAtZero: true, grid: { color: GRID }, ticks: { callback: tickMoney } },
          y: { grid: { display: false } }
        }
      }
    });
  }

  function render() {
    const items = filtered();
    renderHeader();
    renderMonthSummary();
    renderSummary(items);
    renderBudgets();
    renderGoals();
    renderCharts(items);
    renderList(items);
    if (window.lucide) window.lucide.createIcons();
  }

  // ---------- Shared form helpers ----------
  function clearErrors() {
    document.querySelectorAll('.err').forEach((el) => { el.textContent = ''; });
    document.querySelectorAll('.field.invalid').forEach((el) => el.classList.remove('invalid'));
  }

  function setError(field, msg) {
    document.querySelector(`.err[data-for="${field}"]`).textContent = msg;
    $(field).classList.add('invalid');
  }

  function openDialog(id, focusId) {
    $(id).showModal();
    if (focusId) $(focusId).focus();
  }

  // ---------- Expense modal ----------
  function fillCategorySelects() {
    $('category').innerHTML = CAT_NAMES.map((c) => `<option value="${c}">${c}</option>`).join('');
    $('fCategory').innerHTML = '<option value="all">All categories</option>' +
      CAT_NAMES.map((c) => `<option value="${c}">${c}</option>`).join('');
  }

  function openModal(expense) {
    clearErrors();
    editingId = expense ? expense.id : null;
    $('modalTitle').textContent = expense ? 'Edit expense' : 'Add expense';
    $('date').value = expense ? expense.date : todayISO();
    $('category').value = expense ? expense.category : CAT_NAMES[0];
    $('amount').value = expense ? expense.amount : '';
    $('description').value = expense ? expense.description : '';
    openDialog('modal', 'amount');
  }

  function onSubmit(ev) {
    ev.preventDefault();
    clearErrors();
    const date = $('date').value;
    const category = $('category').value;
    const amount = round2(parseFloat($('amount').value));
    const description = $('description').value.trim();

    let ok = true;
    if (!date) { setError('date', 'Pick a date.'); ok = false; }
    if (!category) { setError('category', 'Pick a category.'); ok = false; }
    if (!(amount > 0)) { setError('amount', 'Enter an amount greater than 0.'); ok = false; }
    if (!ok) return;

    const wasEditing = Boolean(editingId);
    if (wasEditing) {
      expenses = expenses.map((e) => (e.id === editingId ? { ...e, date, category, amount, description } : e));
    } else {
      expenses.push({ id: newId(), date, category, amount, description });
    }
    saveExpenses();
    $('modal').close();
    render();

    let msg = wasEditing ? 'Changes saved.' : `Saved ${money(amount)} on ${category}.`;
    const limit = budgets[category];
    if (limit > 0) {
      const spentCat = sumOf(monthItems(date.slice(0, 7)).filter((e) => e.category === category));
      if (spentCat > limit) msg += ` ${category} is now ${moneyShort(spentCat - limit)} over budget.`;
    }
    showToast(msg);
  }

  // ---------- Budgets modal ----------
  const budgetFields = () => [...$('budgetInputs').querySelectorAll('input')];

  function updateBudgetSum() {
    const total = budgetFields().reduce((s, i) => s + (Number(i.value) > 0 ? Number(i.value) : 0), 0);
    $('budgetSum').textContent = `${moneyShort(total)} / month`;
  }

  function openBudgets() {
    clearErrors();
    $('budgetTemplate').value = '';
    $('budgetInputs').innerHTML = CAT_NAMES.map((c) => `
      <label class="text-xs text-mute">${c}
        <input type="number" min="0" step="any" inputmode="decimal" placeholder="No budget"
               data-cat="${c}" value="${budgets[c] > 0 ? budgets[c] : ''}" class="field mt-1">
      </label>`).join('');
    updateBudgetSum();
    openDialog('budgetModal', 'budgetTemplate');
  }

  function applyTemplate() {
    const t = TEMPLATES[$('budgetTemplate').value];
    if (!t) return;
    budgetFields().forEach((i) => { i.value = t[i.dataset.cat] || ''; i.classList.remove('invalid'); });
    updateBudgetSum();
  }

  function onBudgetSubmit(ev) {
    ev.preventDefault();
    clearErrors();
    const next = {};
    let ok = true;
    budgetFields().forEach((i) => {
      if (i.value === '') return;
      const v = Number(i.value);
      if (!Number.isFinite(v) || v < 0) { i.classList.add('invalid'); ok = false; return; }
      if (v > 0) next[i.dataset.cat] = round2(v);
    });
    if (!ok) { $('budgetErr').textContent = 'Budgets need to be 0 or more.'; return; }
    budgets = next;
    saveBudgets();
    $('budgetModal').close();
    render();
    showToast(Object.keys(next).length ? 'Budgets updated.' : 'Budgets cleared.');
  }

  // ---------- Goal modals ----------
  function openGoal(goal) {
    clearErrors();
    editingGoalId = goal ? goal.id : null;
    $('goalTitle').textContent = goal ? 'Edit goal' : 'New goal';
    $('goalName').value = goal ? goal.name : '';
    $('goalTarget').value = goal ? goal.target : '';
    $('goalSaved').value = goal ? goal.saved : '';
    openDialog('goalModal', 'goalName');
  }

  function onGoalSubmit(ev) {
    ev.preventDefault();
    clearErrors();
    const name = $('goalName').value.trim();
    const target = round2(parseFloat($('goalTarget').value));
    const saved = $('goalSaved').value === '' ? 0 : round2(parseFloat($('goalSaved').value));

    let ok = true;
    if (!name) { setError('goalName', 'Give the goal a name.'); ok = false; }
    if (!(target > 0)) { setError('goalTarget', 'Enter a target greater than 0.'); ok = false; }
    if (!(saved >= 0)) { setError('goalSaved', 'Enter 0 or more.'); ok = false; }
    if (!ok) return;

    const wasEditing = Boolean(editingGoalId);
    if (wasEditing) {
      goals = goals.map((g) => (g.id === editingGoalId ? { ...g, name, target, saved } : g));
    } else {
      goals.push({ id: newId(), name, target, saved });
    }
    saveGoals();
    $('goalModal').close();
    render();
    showToast(wasEditing ? 'Goal updated.' : `Goal added: ${name}.`);
  }

  function openFund(goal) {
    clearErrors();
    fundingGoalId = goal.id;
    $('fundTitle').textContent = `Add money to ${goal.name}`;
    $('fundNote').textContent = goal.saved >= goal.target
      ? `${moneyShort(goal.saved)} saved. You've already reached this goal.`
      : `${moneyShort(goal.saved)} saved, ${moneyShort(goal.target - goal.saved)} to go.`;
    $('fundAmount').value = '';
    openDialog('fundModal', 'fundAmount');
  }

  function onFundSubmit(ev) {
    ev.preventDefault();
    clearErrors();
    const amount = round2(parseFloat($('fundAmount').value));
    if (!(amount > 0)) { setError('fundAmount', 'Enter an amount greater than 0.'); return; }
    const goal = goals.find((g) => g.id === fundingGoalId);
    if (!goal) { $('fundModal').close(); return; }

    const wasDone = goal.saved >= goal.target;
    const updated = { ...goal, saved: round2(goal.saved + amount) };
    goals = goals.map((g) => (g.id === goal.id ? updated : g));
    saveGoals();
    $('fundModal').close();
    render();
    const reached = !wasDone && updated.saved >= updated.target;
    showToast(`Added ${money(amount)} to ${goal.name}.${reached ? ' Goal reached, well done!' : ''}`);
  }

  // ---------- Toast + undo ----------
  function showToast(msg, undo = null) {
    undoAction = undo;
    $('toastMsg').textContent = msg;
    $('toastUndo').classList.toggle('hidden', !undo);
    $('toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $('toast').classList.remove('show'); undoAction = null; }, 5000);
  }

  function onUndo() {
    const fn = undoAction;
    undoAction = null;
    $('toast').classList.remove('show');
    if (fn) fn();
  }

  // Two-step delete: first click asks, second click confirms
  function confirmClick(btn, onConfirm) {
    if (btn.classList.contains('confirm')) { onConfirm(); return; }
    const label = btn.textContent;
    btn.classList.add('confirm');
    btn.textContent = 'Sure?';
    setTimeout(() => {
      if (btn.isConnected) { btn.classList.remove('confirm'); btn.textContent = label; }
    }, 3000);
  }

  function deleteExpense(id) {
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) return;
    const [removed] = expenses.splice(index, 1);
    saveExpenses();
    render();
    showToast('Expense deleted.', () => {
      expenses.splice(index, 0, removed);
      saveExpenses();
      render();
    });
  }

  function deleteGoal(id) {
    const index = goals.findIndex((g) => g.id === id);
    if (index === -1) return;
    const [removed] = goals.splice(index, 1);
    saveGoals();
    render();
    showToast(`Goal "${removed.name}" deleted.`, () => {
      goals.splice(index, 0, removed);
      saveGoals();
      render();
    });
  }

  // ---------- Events ----------
  function onListClick(ev) {
    const btn = ev.target.closest('button[data-act]');
    if (!btn) return;
    const id = btn.closest('li').dataset.id;
    if (btn.dataset.act === 'edit') openModal(expenses.find((e) => e.id === id));
    else confirmClick(btn, () => deleteExpense(id));
  }

  function onGoalClick(ev) {
    const btn = ev.target.closest('button[data-act]');
    if (!btn) return;
    const goal = goals.find((g) => g.id === btn.closest('li').dataset.id);
    if (!goal) return;
    if (btn.dataset.act === 'fund') openFund(goal);
    else if (btn.dataset.act === 'edit') openGoal(goal);
    else confirmClick(btn, () => deleteGoal(goal.id));
  }

  function clearFilters() {
    $('fCategory').value = 'all';
    ['fFrom', 'fTo', 'fMin', 'fMax'].forEach((id) => { $(id).value = ''; });
    render();
  }

  function clearAll() {
    if (expenses.length === 0 && goals.length === 0 && budgetedCats().length === 0) return;
    if (!confirm('Delete all expenses, budgets and savings goals? This cannot be undone.')) return;
    expenses = [];
    budgets = {};
    goals = [];
    saveExpenses();
    saveBudgets();
    saveGoals();
    render();
  }

  function init() {
    fillCategorySelects();

    $('addBtn').addEventListener('click', () => openModal(null));
    $('prevMonth').addEventListener('click', () => { viewMonth = shiftMonth(viewMonth, -1); render(); });
    $('nextMonth').addEventListener('click', () => {
      if (viewMonth < thisMonth()) { viewMonth = shiftMonth(viewMonth, 1); render(); }
    });

    $('form').addEventListener('submit', onSubmit);
    $('budgetForm').addEventListener('submit', onBudgetSubmit);
    $('goalForm').addEventListener('submit', onGoalSubmit);
    $('fundForm').addEventListener('submit', onFundSubmit);

    $('editBudgetsBtn').addEventListener('click', openBudgets);
    $('budgetEmptyBtn').addEventListener('click', openBudgets);
    $('budgetTemplate').addEventListener('change', applyTemplate);
    $('budgetInputs').addEventListener('input', updateBudgetSum);
    $('newGoalBtn').addEventListener('click', () => openGoal(null));

    // Close buttons and backdrop clicks for every dialog
    document.querySelectorAll('[data-close]').forEach((b) => {
      b.addEventListener('click', () => b.closest('dialog').close());
    });
    document.querySelectorAll('dialog').forEach((d) => {
      d.addEventListener('click', (ev) => { if (ev.target === d) d.close(); });
    });

    $('list').addEventListener('click', onListClick);
    $('goalList').addEventListener('click', onGoalClick);
    $('empty').addEventListener('click', (ev) => {
      if (ev.target.closest('[data-empty-act="add"]')) openModal(null);
    });
    $('toastUndo').addEventListener('click', onUndo);
    $('clearFilters').addEventListener('click', clearFilters);
    $('clearAll').addEventListener('click', clearAll);
    ['fCategory', 'fFrom', 'fTo', 'fMin', 'fMax'].forEach((id) => {
      $(id).addEventListener('input', render);
    });

    render();
  }

  init();
})();
