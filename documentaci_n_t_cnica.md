# DOCUMENTACIÓN TÉCNICA Y FUNCIONAL
## TITAN & CO. // KINETIC FORGE — LANDING PAGE DE CALZADO TÁCTICO Y OUTDOOR

---

## 1. RESUMEN DEL PROYECTO
**TITAN & CO. // KINETIC FORGE** es una landing page e-commerce interactiva de alto rendimiento desarrollada bajo un enfoque de **Diseño Brutalista Táctico**. La plataforma está diseñada para la exhibición y comercialización de calzado técnico de marcas de alta gama (Salomon, HOKA, Nike ACG, Arc'teryx, Merrell, Timberland, Caterpillar, Columbia).

### Características Clave:
- **Catálogo Dinámico e Interactivo:** Filtrado por categorías en tiempo real.
- **Hero Section Reactiva con Hotspots Técnicos:** Visualización de características específicas (Suela y Membrana) sincronizadas dinámicamente según el modelo seleccionado.
- **Asistente de Tallas Doble:** Sistema de comprobación de stock por talla y calculadora de conversión de longitud de pie ($\text{cm}$) a $\text{US/EU}$.
- **Carrito de Compras (Slide-over Drawer):** Gestión completa de estado local (añadir, eliminar, ajustar cantidades y cálculo de subtotal).
- **Prueba Social y Preguntas Frecuentes:** Componentes interactivos tipo acordeón y testimonios de compradores verificados.

---

## 2. ARQUITECTURA DE ARCHIVOS

El proyecto sigue el principio de **Responsabilidad Única (Single Responsibility Principle - SRP)** dividiéndose en una estructura modular:

```text
kinetic-forge/
├── index.html            # Estructura semántica, maquetación Tailwind y contenedores modales
├── css/
│   └── styles.css        # Estilos personalizados, efectos spotlight y animaciones
└── js/
    ├── database.js       # Módulo de Datos (Dataset de 8 productos con especificaciones únicas)
    ├── cart.js           # Módulo del Carrito de Compras (Lógica de estado y slide-over)
    └── app.js            # Punto de entrada, listeners globales, Hotspots e interactividad
```

---

## 3. DESCRIPCIÓN DE MÓDULOS Y COMPONENTES

### 3.1. Base de Datos (`js/database.js`)
Contiene un array de objetos JavaScript (`products`) con el esquema de cada producto:

```javascript
{
    id: String,             // Identificador único (ej: "SAL-DRX-01")
    brand: String,          // Nombre comercial de la marca
    watermark: String,      // Texto en marca de agua de fondo
    name: String,           // Nombre completo del modelo
    discount: String,       // Porcentaje de descuento aplicable
    price: Number,          // Precio en USD
    category: String,       // Categoría: "outdoor", "tactica", "urbana", "cuero"
    sizes: Array<String>,   // Tallas disponibles en formato EU
    images: Array<String>,  // URLs de las imágenes en alta resolución
    desc: String,           // Descripción breve del producto
    suela: String,          // Especificación única de la suela
    membrana: String,       // Especificación única de la membrana/material
    hotspot1Title: String,  // Título del hotspot 1 (Suela)
    hotspot1Desc: String,   // Descripción del hotspot 1
    hotspot2Title: String,  // Título del hotspot 2 (Membrana)
    hotspot2Desc: String    // Descripción del hotspot 2
}
```

---

### 3.2. Lógica Principal y Controladores (`js/app.js`)

- **`updateHeroView()`**: Renderiza el modelo activo en la sección Hero. Sincroniza la marca de agua, precio, imágenes secundarias y los textos de los **Hotspots dinámicos** (`#hs1-title`, `#hs1-desc`, `#hs2-title`, `#hs2-desc`).
- **`changeHeroModel(dir)`**: Controla la navegación circular entre los 8 modelos del dataset ($0 \le \text{index} < N$).
- **`filterByStockSize(btn, size)` / `renderStockResults(size)`**: Filtra de forma inmediata qué modelos tienen stock disponible para la talla seleccionada por el usuario.
- **`calculateInlineSize()`**: Convierte los centímetros ingresados por el usuario a equivalentes en escalas $\text{US}$ y $\text{EU}$ aplicando las fórmulas:
  $$\text{US} = \frac{\text{cm} - 18}{0.85}$$
  $$\text{EU} = \text{round}(\text{cm} \times 1.5 + 2)$$
- **`renderCatalog(filter)`**: Genera la cuadrícula de productos renderizando tarjetas con botones de selección directa de talla y disparador de Vista Rápida (*Quick View*).
- **`openQuickView(id)`**: Extrae las propiedades exclusivas del producto (`p.suela`, `p.membrana`) y las inyecta dentro de la estructura modal `#quickview-modal`.

---

### 3.3. Carrito de Compras (`js/cart.js`)

Mantiene en memoria la colección de elementos añadidos (`cartState`):
- **`addToCart(id, name, price, image, size)`**: Comprueba si el ítem (ID + Talla) ya existe. Si existe, incrementa su cantidad; si no, añade el nuevo elemento.
- **`updateCartUI()`**: Recalcula el contador global del badge, la lista visual de productos y el subtotal acumulado:
  $$\text{Subtotal} = \sum_{i=1}^{k} (\text{precio}_i \times \text{cantidad}_i)$$

---

## 4. ESTILOS Y MAQUETACIÓN CSS (`css/styles.css`)

El proyecto utiliza **Tailwind CSS** vía CDN complementado con clases a medida:

1. **Spotlight Cursor Effect (`#cursor-glow`)**: Un gradiente radial flotante que sigue la posición del puntero (`mousemove`) para dar un acabado táctico futurista.
2. **Textura Marca de Agua (`.watermark-text`)**: Tipografía *Syne Black* con transparencia baja (`opacity: 0.04`) y tamaño adaptable (`clamp()`).
3. **Stacked Sticky Cards**: Efecto de superposición de tarjetas tecnológicas al hacer scroll mediante `position: sticky` y escalonamiento de `top`.

---

## 5. GUÍA DE MANTENIMIENTO Y EXPANSIÓN

### ¿Cómo agregar un nuevo producto?
Para agregar un nuevo calzado a la tienda, abre el archivo `js/database.js` y añade un nuevo objeto al final del array `products`:

```javascript
{
    id: "NUEVO-MODELO-01",
    brand: "NOMBRE MARCA",
    watermark: "MARCA",
    name: "MODELO X PRO",
    discount: "15%",
    price: 200,
    category: "outdoor", // Opción: "outdoor", "tactica", "urbana", "cuero"
    sizes: ["40", "41", "42", "43"],
    images: ["https://url-imagen-1.jpg"],
    desc: "Descripción técnica del nuevo modelo.",
    suela: "Especificación de la suela...",
    membrana: "Especificación de la membrana...",
    hotspot1Title: "SUELA X",
    hotspot1Desc: "Detalles del hotspot 1",
    hotspot2Title: "MEMBRANA Y",
    hotspot2Desc: "Detalles del hotspot 2"
}
```

---

## 6. TECNOLOGÍAS UTILIZADAS
- **HTML5:** Estructura semántica.
- **CSS3:** Flexbox, CSS Grid, Tailwind CSS Engine.
- **JavaScript (ES6+):** Manipulación del DOM, controladores de eventos y gestión de estado local.
- **Lucide Icons:** Biblioteca de iconos vectoriales ligeros.
- **Google Fonts:** Fuentes *Syne* y *Space Grotesk*.