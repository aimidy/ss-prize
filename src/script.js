const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');

let allItems = [];

function escapeHtml(str = '') {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function normalizeText(s) {
    return String(s ?? '').toLowerCase();
}

function matchesQuery(item, q) {
    if (!q) return true;
    const hay = [
        item.phase,
        item.label,
        item.title,
        item.description,
        item.side, // 有些人可能會搜 left/right，也保留
    ]
        .map((v) => String(v ?? ''))
        .join(' ')
        .toLowerCase();

    return hay.includes(q);
}

function render(items) {
    grid.innerHTML = '';

    // ✅關鍵：用「目前 items 的順序」重新分配左右欄，避免某一欄全空
    // 桌面兩欄：奇數 left / 偶數 right（或反過來你也可改）
    items.forEach((item, idx) => {
        const sideClass = idx % 2 === 0 ? 'left' : 'right';

        const iconHtml = item.iconUrl
            ? `<img src="${escapeHtml(item.iconUrl)}" alt="${escapeHtml(item.title || '')}" />`
            : `${escapeHtml(item.iconEmoji || '🎁')}`;

        const card = document.createElement('article');
        card.className = `card ${sideClass}`;
        card.innerHTML = `
          <div class="card__top">
            <span class="badge">第 ${escapeHtml(String(item.phase ?? ''))} 期</span>
            <span class="tag">${escapeHtml(item.label || item.title || '')}</span>
          </div>
          <div class="card__body">
            <div class="icon">${iconHtml}</div>
            <div class="content">
              <h3>${escapeHtml(item.title || '')}</h3>
              <p>${escapeHtml(item.description || '')}</p>
            </div>
          </div>
        `;

        grid.appendChild(card);
    });
}

async function init() {
    try {
        const res = await fetch('./data.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        allItems = Array.isArray(data.items) ? data.items : [];

        // 以 phase 排序，避免 JSON 手滑
        allItems.sort((a, b) => (a.phase ?? 0) - (b.phase ?? 0));

        render(allItems);
    } catch (err) {
        grid.innerHTML = `
          <div class="card left">
            <h3>載入失敗</h3>
            <p>讀取 data.json 時發生錯誤：${escapeHtml(String(err))}</p>
            <p>如果你是直接用檔案開啟（file://），請改用本機伺服器方式開啟（例如 VSCode Live Server）。</p>
          </div>
        `;
    }
}

searchInput.addEventListener('input', (e) => {
    const q = normalizeText(e.target.value).trim();
    const filtered = allItems.filter((it) => matchesQuery(it, q));
    render(filtered);
});

init();
