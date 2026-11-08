/**
 * MÓDULO DE DATOS (Single Responsibility Principle)
 * Base de datos con las 8 marcas, imágenes únicas y especificaciones por modelo.
 */
const products = [
    {
        id: "SAL-DRX-01",
        brand: "SALOMON ADVANCED LAB",
        watermark: "SALOMON",
        name: "DRX BLISS TRAIL PRO",
        discount: "30%",
        price: 185,
        category: "outdoor",
        sizes: ["39", "40", "41", "42", "43", "44"],
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop"
        ],
        desc: "Bota de alta montaña ultraligera con chasis de amortiguación reactiva y membrana impermeable GORE-TEX®.",
        suela: "Contagrip® Megagrip con tacos multidireccionales de 5.5mm.",
        membrana: "GORE-TEX® Performance Shield 100% impermeable.",
        hotspot1Title: "SUELA CONTAGRIP®",
        hotspot1Desc: "Tacos multidireccionales de 5.5mm antideslizantes para roca y barro.",
        hotspot2Title: "MEMBRANA GORE-TEX®",
        hotspot2Desc: "Protección contra humedad extrema sin perder ventilación."
    },
    {
        id: "HOKA-ANACAPA-2",
        brand: "HOKA ONE ONE",
        watermark: "HOKA",
        name: "ANACAPA 2 GTX HIKER",
        discount: "20%",
        price: 210,
        category: "outdoor",
        sizes: ["40", "41", "42", "43", "44", "45"],
        images: [
            "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop"
        ],
        desc: "Diseño sostenible con nubuck impermeable certificado, suela Vibram® Megagrip y entresuela de caña de azúcar.",
        suela: "Vibram® Megagrip con caucho derivado de caña de azúcar.",
        membrana: "Nubuck impermeable certificado con malla reciclada GORE-TEX.",
        hotspot1Title: "SUELA VIBRAM® MEGAGRIP",
        hotspot1Desc: "Compuesto ecológico de alta tracción para terrenos secos y húmedos.",
        hotspot2Title: "GEOMETRÍA SWALLOWTAIL™",
        hotspot2Desc: "Talón extendido para transiciones de pisada ultra suaves."
    },
    {
        id: "NIKE-ACG-MTN",
        brand: "NIKE ACG LAB",
        watermark: "NIKE ACG",
        name: "ACG MOUNTAIN FLY 2 LOW",
        discount: "15%",
        price: 195,
        category: "urbana",
        sizes: ["41", "42", "43", "44"],
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop"
        ],
        desc: "Calzado técnico urbano con placa de fibra de carbono ligera y suela de tracción inspirada en bicicletas de montaña.",
        suela: "Placa de nailon Flyplate y caucho adherente de alta tracción urbana.",
        membrana: "Tejido ripstop sintético de alta resistencia y secado rápido.",
        hotspot1Title: "PLACA FLYPLATE",
        hotspot1Desc: "Rigidez optimizada para un retorno de energía explosivo en cada paso.",
        hotspot2Title: "TRACCIÓN MTN FLY",
        hotspot2Desc: "Suela inspirada en neumáticos de bicicleta de montaña."
    },
    {
        id: "ARCTERYX-AER",
        brand: "ARC'TERYX TECHNICAL",
        watermark: "ARC'TERYX",
        name: "AERIOS FL 2 GTX SHOE",
        discount: "10%",
        price: 230,
        category: "outdoor",
        sizes: ["39", "40", "41", "42", "43"],
        images: [
            "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop"
        ],
        desc: "Zapatilla de aproximación alpina y senderismo rápido con protección GORE-TEX y suela Vibram Megagrip.",
        suela: "Vibram® Megagrip con zona de frenado alpino especializado.",
        membrana: "GORE-TEX® Invisible Fit con exterior de Cordura® transpirable.",
        hotspot1Title: "VIBRAM® LITEBASE",
        hotspot1Desc: "Reducción de peso en la suela sin perder agarre técnico.",
        hotspot2Title: "GORE-TEX INVISIBLE",
        hotspot2Desc: "Ajuste flexible integrado que elimina puntos de presión."
    },
    {
        id: "MERRELL-MOAB-3",
        brand: "MERRELL OUTDOOR",
        watermark: "MERRELL",
        name: "MOAB 3 TACTICAL RESPONSE",
        discount: "25%",
        price: 175,
        category: "tactica",
        sizes: ["40", "41", "42", "43", "44", "45"],
        images: [
            "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=800&auto=format&fit=crop"
        ],
        desc: "Construcción en piel impermeable y malla balística con amortiguación Air Cushion en el talón.",
        suela: "Vibram® TC5+ de alta durabilidad táctica antideslizante.",
        membrana: "Piel revestida de poliuretano y malla balística hidrófuga.",
        hotspot1Title: "SUELA VIBRAM® TC5+",
        hotspot1Desc: "Diseñada exclusivamente para operaciones tácticas y terrenos rudos.",
        hotspot2Title: "CÁMARA AIR CUSHION",
        hotspot2Desc: "Absorbe impactos en el talón agregando estabilidad máxima."
    },
    {
        id: "TIMBERLAND-PRO",
        brand: "TIMBERLAND HERITAGE",
        watermark: "TIMBERLAND",
        name: "6-INCH PREMIUM WATERPROOF",
        discount: "15%",
        price: 220,
        category: "cuero",
        sizes: ["41", "42", "43", "44"],
        images: [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"
        ],
        desc: "Bota clásica de cuero Nobuck genuino con costuras selladas e aislamiento térmico PrimaLoft® de 400g.",
        suela: "Suela exterior de caucho lug con tracción antifatiga.",
        membrana: "Cuero Nobuck Timberland® superior con costuras selladas directas.",
        hotspot1Title: "SUELA ANTIFATIGA",
        hotspot1Desc: "Conos geométricos de caucho que devuelven energía al caminar.",
        hotspot2Title: "AISLAMIENTO PRIMALOFT®",
        hotspot2Desc: "400g de fibra térmica para mantener calor en frío extremo."
    },
    {
        id: "CAT-HOLT-ST",
        brand: "CATERPILLAR FOOTWEAR",
        watermark: "CATERPILLAR",
        name: "HOLT STEEL TOE WORK BOOT",
        discount: "20%",
        price: 190,
        category: "cuero",
        sizes: ["41", "42", "43", "44", "45"],
        images: [
            "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop"
        ],
        desc: "Protección de puntera de acero con construcción Goodyear Welted para máxima resistencia industrial.",
        suela: "Suela de goma moldeada antideslizante con certificación EH.",
        membrana: "Cuero de grano completo industrial resistente a aceites y abrasión.",
        hotspot1Title: "PUNTERA DE ACERO",
        hotspot1Desc: "Protección industrial contra impactos de alta compresión.",
        hotspot2Title: "GOODYEAR WELTED",
        hotspot2Desc: "Costura perimetral reforzada para resistencia extrema."
    },
    {
        id: "COLUMBIA-NEWTON",
        brand: "COLUMBIA SPORTSWEAR",
        watermark: "COLUMBIA",
        name: "NEWTON RIDGE PLUS WATERPROOF",
        discount: "35%",
        price: 160,
        category: "outdoor",
        sizes: ["39", "40", "41", "42", "43", "44"],
        images: [
            "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=800&auto=format&fit=crop"
        ],
        desc: "Entresuela liviana Techlite™ para un confort duradero y goma Omni-Grip™ para tracción antideslizante.",
        suela: "Caucho anti-marcas Omni-Grip™ de doble zona para tracción.",
        membrana: "Construcción de botín Omni-Tech™ impermeable y transpirable.",
        hotspot1Title: "SUELA OMNI-GRIP™",
        hotspot1Desc: "Tracción avanzada para senderos de tierra, rocas y gravilla.",
        hotspot2Title: "TECHLITE™ MIDSOLE",
        hotspot2Desc: "Amortiguación liviana para caminatas prolongadas."
    }
];