/**
 * PUNTO DE ENTRADA Y EVENT LISTENERS DE LA APLICACIÓN
 */
let activeHeroIndex = 0;
let activeHeroAngleIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateHeroView();
    renderStockResults("41");
    renderCatalog('todas');

    // Listener del Cursor Glow
    const glow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });

    // Intersection Observer para Animaciones Scroll Reveal
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Actualiza dinámicamente el Hero principal incluyendo los Hotspots de cada bota
function updateHeroView() {
    const p = products[activeHeroIndex];
    document.getElementById('hero-watermark').innerText = p.watermark;
    document.getElementById('hero-brand').innerText = p.brand;
    document.getElementById('hero-title').innerText = p.name;
    document.getElementById('hero-discount').innerText = p.discount;
    document.getElementById('hero-price').innerText = `$${p.price}.00 USD`;
    document.getElementById('hero-subtitle').innerText = p.desc;
    document.getElementById('hero-counter').innerText = `${activeHeroIndex + 1} / ${products.length}`;

    // Actualiza dinámicamente los textos de los Hotspots técnicos en la imagen principal
    document.getElementById('hs1-title').innerText = p.hotspot1Title;
    document.getElementById('hs1-desc').innerText = p.hotspot1Desc;
    document.getElementById('hs2-title').innerText = p.hotspot2Title;
    document.getElementById('hs2-desc').innerText = p.hotspot2Desc;

    const thumbsContainer = document.getElementById('hero-thumbs');
    thumbsContainer.innerHTML = '';
    p.images.forEach((imgUrl, idx) => {
        const thumb = document.createElement('img');
        thumb.src = imgUrl;
        thumb.className = `w-10 h-10 object-cover border cursor-pointer transition-all ${idx === activeHeroAngleIndex ? 'border-accentOrange scale-105' : 'border-white/20 opacity-60 hover:opacity-100'}`;
        thumb.onclick = () => {
            activeHeroAngleIndex = idx;
            document.getElementById('hero-main-img').src = p.images[activeHeroAngleIndex];
            updateHeroView();
        };
        thumbsContainer.appendChild(thumb);
    });

    document.getElementById('hero-main-img').src = p.images[activeHeroAngleIndex] || p.images[0];
}

function changeHeroModel(dir) {
    activeHeroIndex = (activeHeroIndex + dir + products.length) % products.length;
    activeHeroAngleIndex = 0;
    updateHeroView();
}

function addActiveHeroToCart() {
    const p = products[activeHeroIndex];
    addToCart(p.id, p.name, p.price, p.images[0], '42');
}

function openQuickViewCurrent() {
    openQuickView(products[activeHeroIndex].id);
}

// Filtro por Stock de Talla
function filterByStockSize(btn, size) {
    document.querySelectorAll('.stock-size-btn').forEach(b => {
        b.classList.remove('border-accentOrange', 'bg-accentOrange', 'text-black');
        b.classList.add('border-white/20', 'text-white');
    });
    btn.classList.remove('border-white/20', 'text-white');
    btn.classList.add('border-accentOrange', 'bg-accentOrange', 'text-black');

    document.getElementById('selected-size-label').innerText = `EU ${size}`;
    renderStockResults(size);
}

function renderStockResults(size) {
    const container = document.getElementById('size-stock-results');
    container.innerHTML = '';
    const matched = products.filter(p => p.sizes.includes(size));
    document.getElementById('stock-count-label').innerText = `${matched.length} Modelos Listos`;

    matched.forEach(p => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-2.5 bg-slateDark border border-white/10';
        item.innerHTML = `
            <div class="flex items-center gap-2">
                <img src="${p.images[0]}" class="w-8 h-8 object-contain">
                <div>
                    <span class="font-bold text-white block text-[11px]">${p.name}</span>
                    <span class="text-emerald-400 text-[10px]">✓ Stock Confirmado</span>
                </div>
            </div>
            <button onclick="addToCart('${p.id}', '${p.name}', ${p.price}, '${p.images[0]}', '${size}')" class="bg-accentOrange text-black px-2 py-1 text-[10px] font-bold uppercase">
                Añadir
            </button>
        `;
        container.appendChild(item);
    });
}

function calculateInlineSize() {
    const cm = parseFloat(document.getElementById('foot-cm-input-inline').value);
    if (!cm || cm < 20 || cm > 35) return alert('Medida no válida (20 - 35 cm).');
    const us = ((cm - 18) / 0.85).toFixed(1);
    const eu = Math.round(cm * 1.5 + 2);
    document.getElementById('inline-us-val').innerText = `US ${us}`;
    document.getElementById('inline-eu-val').innerText = `Equivalente a EU ${eu} (${cm} cm)`;
}

// Render del Catálogo Completo
function renderCatalog(filter) {
    const grid = document.getElementById('catalog-grid');
    grid.innerHTML = '';
    const filtered = filter === 'todas' ? products : products.filter(p => p.category === filter);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'bg-slateCard border border-white/10 p-5 flex flex-col justify-between group hover:border-accentOrange transition-all duration-300';
        
        let sizesHTML = p.sizes.map(s => 
            `<button onclick="event.stopPropagation(); addToCart('${p.id}', '${p.name}', ${p.price}, '${p.images[0]}', '${s}')" class="px-2 py-1 bg-black hover:bg-accentOrange hover:text-black border border-white/10 text-[10px] text-zinc-300 font-bold">${s}</button>`
        ).join('');

        card.innerHTML = `
            <div>
                <div class="aspect-square bg-slateBg mb-4 p-3 flex items-center justify-center relative overflow-hidden">
                    <img src="${p.images[0]}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500">
                    <span class="absolute top-2 left-2 bg-black/90 text-accentOrange border border-white/10 text-[9px] font-mono px-2 py-0.5">${p.brand}</span>
                </div>
                <h4 class="font-syne font-bold text-lg text-white leading-tight">${p.name}</h4>
                <p class="font-mono text-xs text-zinc-400 mt-2 line-clamp-2">${p.desc}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-white/10 space-y-3">
                <div class="flex flex-wrap gap-1">${sizesHTML}</div>
                <div class="flex items-center justify-between pt-2">
                    <span class="font-syne font-black text-xl text-white">$${p.price}.00</span>
                    <button onclick="openQuickView('${p.id}')" class="border border-white/20 text-white font-mono font-bold text-[11px] px-3 py-1.5 uppercase">Vista Rápida</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCatalog(category, btn) {
    if (btn) {
        document.querySelectorAll('.cat-filter-btn').forEach(b => {
            b.classList.remove('border-accentOrange', 'bg-accentOrange', 'text-black');
            b.classList.add('border-white/20', 'text-zinc-300');
        });
        btn.classList.remove('border-white/20', 'text-zinc-300');
        btn.classList.add('border-accentOrange', 'bg-accentOrange', 'text-black');
    }
    renderCatalog(category);
}

// QuickView Modal con inyección de Suela y Membrana únicas
function openQuickView(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;

    document.getElementById('qv-img').src = p.images[0];
    document.getElementById('qv-brand').innerText = p.brand;
    document.getElementById('qv-title').innerText = p.name;
    document.getElementById('qv-desc').innerText = p.desc;
    document.getElementById('qv-suela').innerText = p.suela;
    document.getElementById('qv-membrana').innerText = p.membrana;
    document.getElementById('qv-price').innerText = `$${p.price}.00 USD`;

    document.getElementById('qv-add-btn').onclick = () => {
        const selectedSize = document.getElementById('qv-size-select').value;
        addToCart(p.id, p.name, p.price, p.images[0], selectedSize);
        closeQuickView();
    };

    document.getElementById('quickview-modal').classList.remove('hidden');
    document.getElementById('quickview-modal').classList.add('flex');
}

function closeQuickView() {
    document.getElementById('quickview-modal').classList.add('hidden');
    document.getElementById('quickview-modal').classList.remove('flex');
}

function toggleFaq(element) {
    const p = element.querySelector('p');
    const icon = element.querySelector('i');
    p.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}