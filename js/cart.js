/**
 * MÓDULO DE CARRITO Y MODALES INTERACTIVOS
 */
let cart = [];

function addToCart(id, name, price, img, size) {
    cart.push({ id, name, price, img, size });
    updateCartUI();
    toggleCart(true);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-badge').innerText = cart.length;
    const container = document.getElementById('cart-items-list');
    container.innerHTML = '';

    let subtotal = 0;
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-zinc-500 text-xs font-mono text-center py-8">Tu carrito está vacío.</p>';
    } else {
        cart.forEach((item, idx) => {
            subtotal += item.price;
            const el = document.createElement('div');
            el.className = 'flex items-center justify-between bg-slateBg p-3 border border-white/10 font-mono text-xs';
            el.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${item.img}" class="w-12 h-12 object-contain border border-white/10 bg-black">
                    <div>
                        <span class="font-bold text-white block text-[11px]">${item.name}</span>
                        <span class="text-zinc-400 text-[10px]">Talla: EU ${item.size}</span>
                    </div>
                </div>
                <div class="text-right">
                    <span class="font-bold text-accentOrange block">$${item.price}.00</span>
                    <button onclick="removeFromCart(${idx})" class="text-[10px] text-zinc-500 hover:text-white underline">Quitar</button>
                </div>
            `;
            container.appendChild(el);
        });
    }

    document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)} USD`;
}

function toggleCart(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    const panel = document.getElementById('cart-panel');
    const isHidden = drawer.classList.contains('opacity-0');

    if (isHidden || forceOpen) {
        drawer.classList.remove('pointer-events-none', 'opacity-0');
        panel.classList.remove('translate-x-full');
    } else {
        drawer.classList.add('pointer-events-none', 'opacity-0');
        panel.classList.add('translate-x-full');
    }
}

// Calculadora Modal
function openSizeGuide() {
    document.getElementById('size-modal').classList.remove('hidden');
    document.getElementById('size-modal').classList.add('flex');
}

function closeSizeGuide() {
    document.getElementById('size-modal').classList.add('hidden');
    document.getElementById('size-modal').classList.remove('flex');
}

function calculateModalSize() {
    const cm = parseFloat(document.getElementById('foot-cm-input').value);
    if (!cm || cm < 20 || cm > 35) {
        alert('Introduce una medida en CM válida.');
        return;
    }
    const us = ((cm - 18) / 0.85).toFixed(1);
    const eu = Math.round(cm * 1.5 + 2);
    document.getElementById('size-recommended').innerText = `US ${us}`;
    document.getElementById('size-eu').innerText = `${eu}`;
    document.getElementById('size-result-box').classList.remove('hidden');
}

// Checkout Modal
function openCheckoutModal() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    toggleCart(false);
    document.getElementById('checkout-modal').classList.remove('hidden');
    document.getElementById('checkout-modal').classList.add('flex');
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.add('hidden');
    document.getElementById('checkout-modal').classList.remove('flex');
}

function confirmOrder(e) {
    e.preventDefault();
    alert('¡PEDIDO CONFIRMADO EXITOSAMENTE!\n\nDetalles enviados a tu correo electrónico.');
    cart = [];
    updateCartUI();
    closeCheckoutModal();
}