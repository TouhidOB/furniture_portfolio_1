export const products = [
  {
    id: "prod-001",
    slug: "forma-modular-sofa",
    name: "Forma Modular Sofa",
    category: "living",
    collection: "Signature Series",
    tagline: "Sculptural serenity, modular grace.",
    shortDescription: "An expansive, low-profile modular seating landscape engineered with high-resilience memory down and tactile Italian bouclé.",
    longDescription: "The Forma Modular Sofa is our masterwork of architectural softness. Crafted around a kiln-dried FSC-certified beech wood frame, its generous proportions feature gentle radius curves and double-stitched perimeter piping. Designed to fluidly configure into expansive conversational spaces or intimate daybed lounge setups.",
    images: {
      hero: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "sofa",
      defaultColor: "#F5F2EC",
      defaultFinish: "boucle"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.2, 3.8], target: [0, 0.4, 0] },
      detail: { position: [0.9, 0.8, 1.8], target: [0.2, 0.5, 0] },
      top: { position: [0, 3.8, 0.1], target: [0, 0, 0] },
      angle: { position: [-2.2, 1.4, 2.8], target: [0, 0.3, 0] }
    },
    materials: [
      { id: "ivory-boucle", name: "Alpine Ivory Bouclé", type: "fabric", color: "#F5F2EC", priceDelta: 0 },
      { id: "sand-linen", name: "Dune Natural Linen", type: "fabric", color: "#D7C5AF", priceDelta: 200 },
      { id: "charcoal-wool", name: "Obsidian Wool Blend", type: "fabric", color: "#2A2A2A", priceDelta: 350 },
      { id: "cognac-leather", name: "Sienna Saddle Leather", type: "leather", color: "#72503C", priceDelta: 1200 }
    ],
    availableVariants: [
      { id: "3-piece", name: "3-Piece Sectional", dimensions: "280 × 170 × 68 cm", price: 5400 },
      { id: "4-piece", name: "4-Piece Grand L-Shape", dimensions: "360 × 260 × 68 cm", price: 7200 },
      { id: "daybed", name: "2-Piece Daybed Suite", dimensions: "220 × 110 × 68 cm", price: 4100 }
    ],
    dimensions: {
      width: "280 cm (110.2 in)",
      depth: "110 cm (43.3 in)",
      height: "68 cm (26.8 in)",
      seatHeight: "41 cm (16.1 in)",
      weight: "118 kg (260 lbs)"
    },
    specifications: {
      frame: "Kiln-dried solid FSC-certified beech wood with reinforced mortise-and-tenon joinery",
      cushioning: "Multi-density memory foam core wrapped in hypoallergenic duck down and microfibers",
      suspension: "Italian elastic webbed steel serpentine spring system",
      feet: "Concealed oiled smoked oak glides with felt floor protectors",
      warranty: "15-year structural frame guarantee"
    },
    features: [
      { title: "Modular Architecture", description: "Interlocking concealed alloy brackets permit seamless reconfiguration between corner, straight, or chaise arrangements." },
      { title: "Double-Stitched Seams", description: "Tailored saddle piping accents the sculptural contours while reinforcing structural longevity." },
      { title: "Deep-Seated Ergonomics", description: "Generous 76 cm seating depth encourages deep relaxation without posture collapse." }
    ],
    price: 5400,
    currency: "USD",
    availability: "Made to order — 4-6 weeks delivery",
    relatedProducts: ["arc-lounge-chair", "terra-dining-table", "linear-credenza"],
    storytellingScenes: [
      { stage: "01", progress: "0–20%", title: "Sculptural Silhouette", description: "An architectural foundation balancing low visual mass with flowing horizontal planes." },
      { stage: "02", progress: "20–40%", title: "Considered Contours", description: "Continuous perimeter radii eliminate harsh angles in favour of soft spatial harmony." },
      { stage: "03", progress: "40–60%", title: "Tactile Immersion", description: "High-loop Italian bouclé woven with nuanced tonal yarn for light-responsive depth." },
      { stage: "04", progress: "60–80%", title: "Modular Flexibility", description: "Three discrete units that snap into expansive sectionals or stand freely as monoliths." },
      { stage: "05", progress: "80–100%", title: "Enduring Composure", description: "Crafted to become the enduring centerpiece of contemplative living spaces." }
    ],
    care: "Vacuum periodically on low suction using a soft brush attachment. Blot spills immediately with an absorbent undyed cloth. Professional dry cleaning recommended annually.",
    seo: {
      title: "Forma Modular Sofa | ATELIER Luxury Furniture",
      description: "Discover the Forma Modular Sofa by ATELIER. Minimalist low-profile modular seating in tactile Italian bouclé and solid kiln-dried beech wood.",
      keywords: "modular sofa, luxury couch, bouclé sectional, minimalist sofa, contemporary furniture"
    }
  },
  {
    id: "prod-002",
    slug: "arc-lounge-chair",
    name: "Arc Lounge Chair",
    category: "living",
    collection: "Signature Series",
    tagline: "Designed to make you stay.",
    shortDescription: "A continuous steam-bent walnut shell cradling sculpted down cushions in semi-aniline leather or raw bouclé.",
    longDescription: "The Arc Lounge Chair distills mid-century Japanese ergonomics into an unapologetically contemporary silhouette. A sweeping single-piece plywood shell, veneered in dark American walnut, holds a floating cushion assembly designed to embrace the human form without constriction.",
    images: {
      hero: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=80",
      angle: "https://images.unsplash.com/photo-1580481077195-c328ad4f4477?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1506898667547-42e22a468add?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "chair",
      defaultColor: "#181818",
      defaultFinish: "leather"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.0, 2.8], target: [0, 0.5, 0] },
      detail: { position: [0.8, 0.7, 1.4], target: [0, 0.45, 0] },
      top: { position: [0, 2.8, 0.1], target: [0, 0, 0] },
      angle: { position: [-1.8, 1.2, 2.0], target: [0, 0.4, 0] }
    },
    materials: [
      { id: "black-leather", name: "Raven Semi-Aniline Leather", type: "leather", color: "#181818", priceDelta: 0 },
      { id: "cognac-leather", name: "Chestnut Tuscan Leather", type: "leather", color: "#72503C", priceDelta: 150 },
      { id: "ivory-boucle", name: "Oatmeal Alpine Bouclé", type: "fabric", color: "#F5F2EC", priceDelta: -100 }
    ],
    availableVariants: [
      { id: "chair-only", name: "Arc Lounge Chair", dimensions: "88 × 84 × 74 cm", price: 2850 },
      { id: "with-ottoman", name: "Arc Chair + Ottoman Suite", dimensions: "88 × 140 × 74 cm", price: 3750 }
    ],
    dimensions: {
      width: "88 cm (34.6 in)",
      depth: "84 cm (33.1 in)",
      height: "74 cm (29.1 in)",
      seatHeight: "39 cm (15.4 in)",
      weight: "34 kg (75 lbs)"
    },
    specifications: {
      frame: "Seven-ply molded American walnut veneer shell with satin polyurethane finish",
      base: "Die-cast matte black powder-coated aluminum swivel base with 360-degree silent return mechanism",
      cushioning: "High-density foam core capped in channeled goose feather channels",
      upholstery: "Full-grain certified European hide, vegetable tanned",
      warranty: "10-year structural warranty"
    },
    features: [
      { title: "Continuous Ergonomic Arc", description: "Calculated 108° back angle offers spinal decompression during reading or listening." },
      { title: "Silent 360° Pivot", description: "Concealed ball-bearing rotation mechanism glides effortlessly without cable bind or noise." },
      { title: "Hand-Buffed Walnut", description: "Multi-pass hand-rubbed oil finish preserves the open pore texture of genuine walnut grain." }
    ],
    price: 2850,
    currency: "USD",
    availability: "In stock — Ships in 1-2 weeks",
    relatedProducts: ["forma-modular-sofa", "terra-dining-table", "linear-credenza"],
    storytellingScenes: [
      { stage: "01", progress: "0–20%", title: "The Dramatic Silhouette", description: "Sculpted contours that cast an evocative architectural shadow in any room." },
      { stage: "02", progress: "20–40%", title: "Curved Wood Craft", description: "Precision steam-bent walnut shell engineered under hydraulic pressure." },
      { stage: "03", progress: "40–60%", title: "Supple Touch", description: "Premium European leather that warms to the body and patinas gracefully over decades." },
      { stage: "04", progress: "60–80%", title: "Kinetic Fluidity", description: "Smooth 360-degree swivel allows seamless orientation towards light or conversation." },
      { stage: "05", progress: "80–100%", title: "A Modern Heirloom", description: "Refined proportions balanced for both minimal lofts and classic residences." }
    ],
    care: "Wipe wood surfaces with a dry microfiber cloth. Treat leather every six months with neutral beeswax leather balm. Avoid direct solar exposure.",
    seo: {
      title: "Arc Lounge Chair | ATELIER Designer Seating",
      description: "Experience the Arc Lounge Chair by ATELIER. Steam-bent American walnut shell with supple European leather cushions and 360 swivel base.",
      keywords: "lounge chair, swivel armchair, designer chair, walnut leather chair, mid century modern"
    }
  },
  {
    id: "prod-003",
    slug: "terra-dining-table",
    name: "Terra Dining Table",
    category: "dining",
    collection: "Architectural Series",
    tagline: "Where moments gather.",
    shortDescription: "A monolithic solid French oak dining table featuring soft chamfered edges and fluted cylindrical pillar pedestals.",
    longDescription: "The Terra Dining Table celebrates solid mass and artisanal joinery. Sourced from sustainable French oak forests, the substantial 45mm solid tabletop appears to float above two sculptural fluted pedestals, creating generous legroom and uncompromised seating freedom.",
    images: {
      hero: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "table",
      defaultColor: "#72503C",
      defaultFinish: "wood"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.4, 3.2], target: [0, 0.6, 0] },
      detail: { position: [0.6, 0.9, 1.6], target: [0.1, 0.7, 0] },
      top: { position: [0, 3.4, 0.1], target: [0, 0, 0] },
      angle: { position: [-2.4, 1.6, 2.4], target: [0, 0.5, 0] }
    },
    materials: [
      { id: "natural-oak", name: "Smoked French Oak", type: "wood", color: "#72503C", priceDelta: 0 },
      { id: "bleached-ash", name: "Nordic Bleached Ash", type: "wood", color: "#D7C5AF", priceDelta: 100 },
      { id: "ebonized-oak", name: "Ebonized Noir Oak", type: "wood", color: "#1E1E1E", priceDelta: 300 }
    ],
    availableVariants: [
      { id: "seats-8", name: "240 cm (Seats 8)", dimensions: "240 × 105 × 75 cm", price: 4600 },
      { id: "seats-10", name: "290 cm Grand (Seats 10)", dimensions: "290 × 110 × 75 cm", price: 5600 },
      { id: "seats-12", name: "340 cm Banquet (Seats 12)", dimensions: "340 × 115 × 75 cm", price: 6800 }
    ],
    dimensions: {
      width: "240 cm (94.5 in)",
      depth: "105 cm (41.3 in)",
      height: "75 cm (29.5 in)",
      clearance: "71 cm under-table clearance",
      weight: "142 kg (313 lbs)"
    },
    specifications: {
      top: "45 mm solid select-grade French oak with beveled underside edge",
      base: "Dual architectural cylindrical pedestals with CNC fluting and internal steel ballast",
      finish: "Non-yellowing matte organic hardwax oil finish (food-safe, zero VOC)",
      joinery: "Concealed steel stabilizing tension rods prevent natural warping",
      warranty: "25-year structural warranty"
    },
    features: [
      { title: "Floating Edge Profile", description: "Underside reverse chamfer gives an imposing solid slab an ethereal lightness." },
      { title: "Column Pedestals", description: "Eliminates perimeter legs for seamless chair placement and expansive leg comfort." },
      { title: "Natural Grain Integrity", description: "Each tabletop is individually matched for balanced heartwood and sapwood grain flow." }
    ],
    price: 4600,
    currency: "USD",
    availability: "Made to order — 5-7 weeks",
    relatedProducts: ["arc-lounge-chair", "linear-credenza", "forma-modular-sofa"],
    storytellingScenes: [
      { stage: "01", progress: "0–20%", title: "Architectural Presence", description: "Sculptural monumentality designed to anchor dining rooms with calm authority." },
      { stage: "02", progress: "20–40%", title: "Soft Geometric Bevel", description: "Tactile perimeter chamfer invites resting hands during long dinner conversations." },
      { stage: "03", progress: "40–60%", title: "Fluted Pedestal Base", description: "Subtle rhythmic fluting catches ambient light while anchoring 140kg of solid timber." },
      { stage: "04", progress: "60–80%", title: "Natural Wood Flow", description: "Finished in water-resistant matte oil that respects the living touch of authentic oak." },
      { stage: "05", progress: "80–100%", title: "The Gathering Place", description: "Engineered to seat up to twelve guests with uninhibited legroom." }
    ],
    care: "Clean with a soft damp cloth and mild neutral wood soap. Do not use chemical abrasive cleaners. Re-apply natural hardwax oil once every 24 months.",
    seo: {
      title: "Terra Dining Table | ATELIER Solid Wood Tables",
      description: "Discover the Terra Solid Oak Dining Table by ATELIER. Features fluted column pedestals and reverse chamfered 45mm solid timber tabletop.",
      keywords: "dining table, solid oak table, architectural dining table, luxury dining, designer furniture"
    }
  },
  {
    id: "prod-004",
    slug: "eos-platform-bed",
    name: "Eos Platform Bed",
    category: "bedroom",
    collection: "Minimalist Series",
    tagline: "Rest, beautifully.",
    shortDescription: "A low architectural platform bed with an integrated floating headboard upholstered in structured raw linen.",
    longDescription: "The Eos Platform Bed transforms the bedroom into a calm sanctuary. Featuring an inset plinth base that creates a gentle levitating effect, the wide solid timber perimeter ledge offers a minimalist surface for books, evening lighting, and contemplation.",
    images: {
      hero: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "bed",
      defaultColor: "#D7C5AF",
      defaultFinish: "fabric"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.4, 3.4], target: [0, 0.4, 0] },
      detail: { position: [0.7, 0.9, 1.6], target: [0, 0.5, 0] },
      top: { position: [0, 3.6, 0.1], target: [0, 0, 0] },
      angle: { position: [-2.2, 1.5, 2.6], target: [0, 0.3, 0] }
    },
    materials: [
      { id: "sand-linen", name: "Dune Heavyweight Linen", type: "fabric", color: "#D7C5AF", priceDelta: 0 },
      { id: "ivory-boucle", name: "Milky Cloud Bouclé", type: "fabric", color: "#F5F2EC", priceDelta: 150 },
      { id: "charcoal-wool", name: "Basalt Wool Felt", type: "fabric", color: "#2A2A2A", priceDelta: 250 }
    ],
    availableVariants: [
      { id: "queen", name: "Queen Size", dimensions: "215 × 175 × 82 cm", price: 3800 },
      { id: "king", name: "King Size", dimensions: "225 × 215 × 82 cm", price: 4400 },
      { id: "cal-king", name: "California King", dimensions: "235 × 205 × 82 cm", price: 4600 }
    ],
    dimensions: {
      width: "215 cm (84.6 in)",
      depth: "225 cm (88.6 in)",
      height: "82 cm (32.3 in)",
      platformHeight: "26 cm (10.2 in)",
      weight: "112 kg (247 lbs)"
    },
    specifications: {
      frame: "Solid American white ash platform with concealed steel central longitudinal beam",
      slats: "Pre-tensioned ergonomic European beech spring slat system with lumbar stiffness adjusters",
      headboard: "Removable upholstered linen cushion bolsters with magnetic concealed fixings",
      warranty: "15-year structural warranty"
    },
    features: [
      { title: "Floating Plinth Base", description: "Recessed 18 cm plinth base creates the illusion that the sleeping platform floats weightlessly." },
      { title: "Extended Low Ledge", description: "A 14 cm perimeter margin replaces the clutter of nightstands for minimal architectural serenity." },
      { title: "Ergonomic Angle", description: "Slight 7° headboard tilt provides optimal support for late-night reading." }
    ],
    price: 4400,
    currency: "USD",
    availability: "Made to order — 4-6 weeks",
    relatedProducts: ["linear-credenza", "arc-lounge-chair", "terra-dining-table"],
    storytellingScenes: [
      { stage: "01", progress: "0–20%", title: "Levitating Platform", description: "Concealed structural plinth creates a serene floating geometry." },
      { stage: "02", progress: "20–40%", title: "Tactile Headboard", description: "Plush linen panels provide soft tactile warmth for evening reading." },
      { stage: "03", progress: "40–60%", title: "Seamless Perimeter", description: "Continuous solid timber margin holds small essentials without clutter." },
      { stage: "04", progress: "60–80%", title: "Dynamic Slats", description: "Individually responsive beech wood slats contour to body weight." },
      { stage: "05", progress: "80–100%", title: "Nocturnal Sanctuary", description: "A calming bedstead designed to invite restorative sleep and stillness." }
    ],
    care: "Spot clean linen with mild fabric cleaner. Vacuum timber surround with soft brush. Rotate mattress quarterly.",
    seo: {
      title: "Eos Platform Bed | ATELIER Minimalist Bedroom",
      description: "Discover the Eos Platform Bed by ATELIER. Low-profile floating platform bed crafted in solid ash timber and natural Belgian linen.",
      keywords: "platform bed, low bed frame, designer bed, luxury bedroom furniture, floating bed"
    }
  },
  {
    id: "prod-005",
    slug: "linear-credenza",
    name: "Linear Credenza",
    category: "workspace",
    collection: "Architectural Series",
    tagline: "Clarity in proportion.",
    shortDescription: "A precision-crafted sideboard featuring push-to-open fluted timber doors, patinated bronze hardware, and Italian marble top.",
    longDescription: "The Linear Credenza balances substantial storage with razor-thin horizontal reveals. Crafted with solid walnut tambour slatted doors and topped with honed Grigio Carnico marble, it conceals multimedia cable routing, adjustable glass shelving, and felt-lined silverware or stationery drawers.",
    images: {
      hero: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "cabinet",
      defaultColor: "#72503C",
      defaultFinish: "wood"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.2, 3.2], target: [0, 0.5, 0] },
      detail: { position: [0.7, 0.8, 1.5], target: [0, 0.45, 0] },
      top: { position: [0, 3.2, 0.1], target: [0, 0, 0] },
      angle: { position: [-2.0, 1.3, 2.3], target: [0, 0.45, 0] }
    },
    materials: [
      { id: "walnut-marble", name: "Walnut & Grigio Marble", type: "wood", color: "#72503C", priceDelta: 0 },
      { id: "black-marble", name: "Noir Oak & Nero Marquina", type: "wood", color: "#181818", priceDelta: 250 },
      { id: "oak-calacatta", name: "White Oak & Calacatta", type: "wood", color: "#D7C5AF", priceDelta: 450 }
    ],
    availableVariants: [
      { id: "3-door", name: "3-Door Compact (180 cm)", dimensions: "180 × 50 × 72 cm", price: 3900 },
      { id: "4-door", name: "4-Door Grand (240 cm)", dimensions: "240 × 50 × 72 cm", price: 4950 }
    ],
    dimensions: {
      width: "240 cm (94.5 in)",
      depth: "50 cm (19.7 in)",
      height: "72 cm (28.3 in)",
      weight: "128 kg (282 lbs)"
    },
    specifications: {
      body: "Rift-cut American walnut carcass with 45-degree mitered corners",
      top: "20 mm honed Grigio Carnico marble slab with impregnating anti-stain seal",
      doors: "Precision CNC milled fluted solid timber doors with soft-close Blum hinges",
      interior: "Adjustable smoke-tinted tempered glass shelves and integrated cable grommets",
      warranty: "10-year structural warranty"
    },
    features: [
      { title: "Mitered Perimeter Joint", description: "Continuous 45° timber joints wrap around the corners with unblemished grain continuation." },
      { title: "Acoustic Slats", description: "Subtle micro-gap fluting permits infrared remote pass-through while keeping interiors hidden." },
      { title: "Honed Stone Inset", description: "Cool natural marble top offers a resilient, tactile counterpoint to warm timber." }
    ],
    price: 4950,
    currency: "USD",
    availability: "Made to order — 5-6 weeks",
    relatedProducts: ["terra-dining-table", "alto-executive-desk", "arc-lounge-chair"],
    storytellingScenes: [
      { stage: "01", progress: "0–20%", title: "Refined Proportion", description: "Low, horizontal balance that unifies living, dining, or executive workspaces." },
      { stage: "02", progress: "20–40%", title: "Fluted Relief", description: "Dimensional vertical fluting casts subtle rhythmic shadows." },
      { stage: "03", progress: "40–60%", title: "Honed Marble Crown", description: "Each stone slab is hand-selected for dramatic yet serene natural veining." },
      { stage: "04", progress: "60–80%", title: "Concealed Interior", description: "Generous capacity with smoke-tinted shelves and wire management." },
      { stage: "05", progress: "80–100%", title: "Artisan Joinery", description: "Every edge is finished by master cabinetmakers in Copenhagen." }
    ],
    care: "Dust timber with dry microfiber. Wipe marble with pH-neutral stone cleaner. Do not place hot ceramics directly on the marble surface.",
    seo: {
      title: "Linear Credenza | ATELIER Luxury Storage",
      description: "Discover the Linear Credenza by ATELIER. Modern fluted walnut sideboard with honed natural marble top and precision soft-close storage.",
      keywords: "credenza, modern sideboard, luxury buffet, fluted cabinet, designer storage"
    }
  },
  {
    id: "prod-006",
    slug: "alto-executive-desk",
    name: "Alto Executive Desk",
    category: "workspace",
    collection: "Architectural Series",
    tagline: "Clarity through reduction.",
    shortDescription: "A sculptural cantilever desk featuring an integrated saddle leather writing pad, wireless power channel, and hidden storage drawers.",
    longDescription: "Designed for focused creative work and executive leadership, the Alto Executive Desk presents a bold architectural cantilever. A monolithic solid oak pedestal supports an expansive floating work surface lined in hand-burnished Tuscan saddle leather.",
    images: {
      hero: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "desk",
      defaultColor: "#181818",
      defaultFinish: "wood"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.4, 3.2], target: [0, 0.6, 0] },
      detail: { position: [0.6, 0.9, 1.6], target: [0, 0.65, 0] },
      top: { position: [0, 3.4, 0.1], target: [0, 0, 0] },
      angle: { position: [-2.2, 1.5, 2.5], target: [0, 0.55, 0] }
    },
    materials: [
      { id: "noir-oak-black-leather", name: "Noir Oak & Charcoal Hide", type: "wood", color: "#181818", priceDelta: 0 },
      { id: "smoked-walnut-cognac", name: "Smoked Walnut & Cognac Hide", type: "wood", color: "#72503C", priceDelta: 300 }
    ],
    availableVariants: [
      { id: "standard", name: "200 cm Executive Desk", dimensions: "200 × 90 × 75 cm", price: 4700 },
      { id: "grand", name: "240 cm President Desk", dimensions: "240 × 95 × 75 cm", price: 5800 }
    ],
    dimensions: {
      width: "200 cm (78.7 in)",
      depth: "90 cm (35.4 in)",
      height: "75 cm (29.5 in)",
      weight: "135 kg (297 lbs)"
    },
    specifications: {
      structure: "Steel armature concealed within solid oak cantilever and vertical slab pedestal",
      writingPad: "Inlaid 3mm full-grain vegetable tanned Tuscan saddle leather pad",
      power: "Concealed magnetic flip-door with dual USB-C (100W PD), Qi wireless, and AC outlets",
      drawers: "Two soft-close finger-pull drawers with velvet interior dividers",
      warranty: "15-year structural warranty"
    },
    features: [
      { title: "Architectural Cantilever", description: "Internal structural steel frame allows an open, leg-free floating wing on the visitor side." },
      { title: "Inlaid Saddle Leather", description: "A warm, resilient writing surface that patinas with every signature and sketch." },
      { title: "Ghost Wire Management", description: "Cables route internally through the vertical monolith down to the floor without visible cords." }
    ],
    price: 4700,
    currency: "USD",
    availability: "Made to order — 6-8 weeks",
    relatedProducts: ["linear-credenza", "arc-lounge-chair", "terra-dining-table"],
    storytellingScenes: [
      { stage: "01", progress: "0–20%", title: "Sculptural Workspace", description: "A commanding presence that establishes quiet executive focus." },
      { stage: "02", progress: "20–40%", title: "Cantilevered Grace", description: "Defying structural gravity through precision engineered internal steel trusses." },
      { stage: "03", progress: "40–60%", title: "Tuscan Leather Inlay", description: "A tactile desk pad that cushions penmanship and laptop work." },
      { stage: "04", progress: "60–80%", title: "Pure Cordless Space", description: "Concealed ports ensure modern technology operates without visible wires." },
      { stage: "05", progress: "80–100%", title: "Workspace Transformed", description: "A bespoke tool for architects, designers, and visionary leaders." }
    ],
    care: "Condition leather insert with beeswax balm. Wipe timber with damp microfiber. Clean electrical channels with dry brush only.",
    seo: {
      title: "Alto Executive Desk | ATELIER Modern Workspace",
      description: "Discover the Alto Executive Desk by ATELIER. Cantilevered architectural desk featuring solid timber construction and inlaid Tuscan saddle leather.",
      keywords: "executive desk, luxury desk, modern office desk, cantilever desk, architectural furniture"
    }
  },
  {
    id: "prod-007",
    slug: "dune-low-lounger",
    name: "Dune Low Lounger",
    category: "living",
    collection: "Minimalist Series",
    tagline: "Low to the earth, high in comfort.",
    shortDescription: "An expansive floor-hugging lounge chair with ultra-deep seating cushions upholstered in tactile sand chenille.",
    longDescription: "Inspired by the sand dunes of the Japanese coast, the Dune Low Lounger brings living closer to the ground. Its relaxed geometry encourages unhurried conversation, casual reclining, or meditation.",
    images: {
      hero: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1580481077195-c328ad4f4477?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "chair",
      defaultColor: "#D7C5AF",
      defaultFinish: "fabric"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 0.9, 2.6], target: [0, 0.35, 0] },
      detail: { position: [0.6, 0.6, 1.4], target: [0, 0.3, 0] },
      top: { position: [0, 2.6, 0.1], target: [0, 0, 0] },
      angle: { position: [-1.7, 1.0, 2.0], target: [0, 0.3, 0] }
    },
    materials: [
      { id: "sand-chenille", name: "Dune Sand Chenille", type: "fabric", color: "#D7C5AF", priceDelta: 0 },
      { id: "ivory-boucle", name: "Warm Ivory Bouclé", type: "fabric", color: "#F5F2EC", priceDelta: 100 },
      { id: "terracotta-wool", name: "Earthy Terracotta Wool", type: "fabric", color: "#8E5A44", priceDelta: 200 }
    ],
    availableVariants: [
      { id: "single", name: "Single Lounger (105 cm)", dimensions: "105 × 100 × 65 cm", price: 2150 },
      { id: "double", name: "Double Daybed Lounger (180 cm)", dimensions: "180 × 100 × 65 cm", price: 3400 }
    ],
    dimensions: {
      width: "105 cm (41.3 in)",
      depth: "100 cm (39.4 in)",
      height: "65 cm (25.6 in)",
      seatHeight: "34 cm (13.4 in)",
      weight: "36 kg (79 lbs)"
    },
    specifications: {
      frame: "Solid birch interior frame with reinforced corners",
      cushioning: "Organic latex foam core wrapped in channeled recycled goose down",
      warranty: "10-year structural warranty"
    },
    features: [
      { title: "Floor-Hugging Profile", description: "Low 34 cm seat height fosters an intimate, grounded domestic atmosphere." },
      { title: "Multi-Density Latex", description: "Natural latex provides instant bounce back and breathable thermal comfort." }
    ],
    price: 2150,
    currency: "USD",
    availability: "In stock — Ships in 1-2 weeks",
    relatedProducts: ["forma-modular-sofa", "terra-dining-table", "arc-lounge-chair"],
    storytellingScenes: [
      { stage: "01", progress: "0–50%", title: "Grounded Stillness", description: "Brings conversation down to a relaxed, natural elevation." },
      { stage: "02", progress: "50–100%", title: "Enveloping Softness", description: "Channel-stitched down cushion layers conform to body contours." }
    ],
    care: "Fluff cushions regularly. Spot clean with mild solvent-free foam upholstery cleaner.",
    seo: {
      title: "Dune Low Lounger | ATELIER Living Room Seating",
      description: "Low-profile designer lounge chair in textured sand chenille and organic latex.",
      keywords: "low lounge chair, floor sofa, minimalist armchair, designer lounger"
    }
  },
  {
    id: "prod-008",
    slug: "oura-oval-dining-table",
    name: "Oura Oval Dining Table",
    category: "dining",
    collection: "Signature Series",
    tagline: "Organic curves for timeless gatherings.",
    shortDescription: "An elliptical dining table with a gently contoured travertine marble top resting upon twin sculpted cast-stone pedestals.",
    longDescription: "The Oura Oval Dining Table balances organic soft geometries with geological permanence. Its polished Roman travertine surface features subtle ivory veining that reflects ambient candlelight during evening dining.",
    images: {
      hero: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "table",
      defaultColor: "#F5F2EC",
      defaultFinish: "stone"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.4, 3.2], target: [0, 0.6, 0] },
      detail: { position: [0.6, 0.9, 1.6], target: [0, 0.65, 0] },
      top: { position: [0, 3.4, 0.1], target: [0, 0, 0] },
      angle: { position: [-2.2, 1.5, 2.5], target: [0, 0.55, 0] }
    },
    materials: [
      { id: "roman-travertine", name: "Honed Roman Travertine", type: "stone", color: "#EDE8E0", priceDelta: 0 },
      { id: "calacatta-gold", name: "Calacatta Gold Marble", type: "stone", color: "#F5F2EC", priceDelta: 850 }
    ],
    availableVariants: [
      { id: "seats-6", name: "220 cm (Seats 6-8)", dimensions: "220 × 110 × 74 cm", price: 5800 },
      { id: "seats-10", name: "280 cm (Seats 8-10)", dimensions: "280 × 120 × 74 cm", price: 7200 }
    ],
    dimensions: {
      width: "240 cm (94.5 in)",
      depth: "115 cm (45.3 in)",
      height: "74 cm (29.1 in)",
      weight: "185 kg (408 lbs)"
    },
    specifications: {
      top: "30 mm honed natural Roman travertine with bullnose edge detail",
      pedestals: "Twin sculptural cast-stone architectural monoliths with internal steel balance weights",
      seal: "Double-coat oleophobic food-grade sealant",
      warranty: "25-year structural warranty"
    },
    features: [
      { title: "Continuous Elliptical Contour", description: "Soft curvature ensures every dinner guest maintains direct eye contact." },
      { title: "Geological Permanence", description: "Carved from genuine Italian quarry blocks with unique historical sedimentary bands." }
    ],
    price: 5800,
    currency: "USD",
    availability: "Made to order — 6-8 weeks",
    relatedProducts: ["terra-dining-table", "arc-lounge-chair", "linear-credenza"],
    storytellingScenes: [
      { stage: "01", progress: "0–50%", title: "Sculpted Ellipse", description: "Soft lines invite seamless flow through open dining spaces." },
      { stage: "02", progress: "50–100%", title: "Ancient Travertine", description: "Honed stone tactile surface that records evening memories." }
    ],
    care: "Wipe with damp cotton cloth. Avoid acidic liquids (wine, vinegar, citrus) standing directly on stone. Clean with stone-safe pH 7 spray.",
    seo: {
      title: "Oura Oval Dining Table | ATELIER Travertine Tables",
      description: "Elliptical Roman travertine dining table with twin architectural cast-stone pedestals.",
      keywords: "oval dining table, travertine table, marble dining table, luxury stone table"
    }
  },
  {
    id: "prod-009",
    slug: "solis-swivel-armchair",
    name: "Solis Swivel Armchair",
    category: "living",
    collection: "Signature Series",
    tagline: "Orbital ease, tailored composure.",
    shortDescription: "A compact sculptural tub chair featuring a rounded bucket seat, integrated lumbar support, and concealed 360-degree swivel.",
    longDescription: "The Solis Swivel Armchair offers an inviting cocoon of softness with minimal spatial footprint. Its fluid circular silhouette complements living room sofa arrangements or private bedroom reading nooks.",
    images: {
      hero: "https://images.unsplash.com/photo-1580481077195-c328ad4f4477?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1506898667547-42e22a468add?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "chair",
      defaultColor: "#A57C52",
      defaultFinish: "fabric"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.0, 2.7], target: [0, 0.45, 0] },
      detail: { position: [0.7, 0.7, 1.5], target: [0, 0.45, 0] },
      top: { position: [0, 2.8, 0.1], target: [0, 0, 0] },
      angle: { position: [-1.8, 1.2, 2.1], target: [0, 0.4, 0] }
    },
    materials: [
      { id: "amber-velvet", name: "Amber Ochre Velvet", type: "fabric", color: "#A57C52", priceDelta: 0 },
      { id: "ivory-boucle", name: "Alpine Ivory Bouclé", type: "fabric", color: "#F5F2EC", priceDelta: 80 },
      { id: "slate-wool", name: "Slate Heather Wool", type: "fabric", color: "#4A4D52", priceDelta: 120 }
    ],
    availableVariants: [
      { id: "standard", name: "Solis Armchair (82 cm)", dimensions: "82 × 80 × 72 cm", price: 1850 }
    ],
    dimensions: {
      width: "82 cm (32.3 in)",
      depth: "80 cm (31.5 in)",
      height: "72 cm (28.3 in)",
      seatHeight: "42 cm (16.5 in)",
      weight: "28 kg (62 lbs)"
    },
    specifications: {
      frame: "Molded cold-cure polyurethane foam over internal welded steel armature",
      base: "Concealed 360-degree heavy-duty steel turntable with auto-return mechanism",
      warranty: "10-year warranty"
    },
    features: [
      { title: "Seamless Circular Shell", description: "Enveloping curved back provides shoulder support without bulk." },
      { title: "Smooth Auto-Return", description: "Chair automatically glides back to facing its primary orientation when vacated." }
    ],
    price: 1850,
    currency: "USD",
    availability: "In stock — Ships in 1-2 weeks",
    relatedProducts: ["arc-lounge-chair", "forma-modular-sofa", "terra-dining-table"],
    storytellingScenes: [
      { stage: "01", progress: "0–50%", title: "Orbital Elegance", description: "Sculpted sphere that rotates effortlessly." },
      { stage: "02", progress: "50–100%", title: "Velvet Tactility", description: "Lustrous woven velvet with subtle directional sheen." }
    ],
    care: "Brush gently with a velvet brush in direction of pile. Steam lightly to remove compression marks.",
    seo: {
      title: "Solis Swivel Armchair | ATELIER Designer Furniture",
      description: "Orbital 360 swivel armchair in rich ochre velvet with molded foam cocoon comfort.",
      keywords: "swivel armchair, tub chair, velvet armchair, bedroom chair, round accent chair"
    }
  },
  {
    id: "prod-010",
    slug: "nocturne-upholstered-bed",
    name: "Nocturne Upholstered Bed",
    category: "bedroom",
    collection: "Heritage Series",
    tagline: "Enveloped in quiet solace.",
    shortDescription: "A grand winged headboard bed upholstered in rich charcoal wool with tailored flange seam detailing and solid walnut tapered legs.",
    longDescription: "The Nocturne Upholstered Bed creates an intimate acoustic cocoon. Its wrap-around winged headboard dampens ambient room reflections, creating an enveloping, deeply tranquil atmosphere for evening repose.",
    images: {
      hero: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "bed",
      defaultColor: "#181818",
      defaultFinish: "fabric"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.4, 3.4], target: [0, 0.4, 0] },
      detail: { position: [0.7, 0.9, 1.6], target: [0, 0.5, 0] },
      top: { position: [0, 3.6, 0.1], target: [0, 0, 0] },
      angle: { position: [-2.2, 1.5, 2.6], target: [0, 0.3, 0] }
    },
    materials: [
      { id: "charcoal-wool", name: "Midnight Charcoal Wool", type: "fabric", color: "#1F2024", priceDelta: 0 },
      { id: "sand-linen", name: "Dune Sand Linen", type: "fabric", color: "#D7C5AF", priceDelta: -100 },
      { id: "cognac-leather", name: "Cognac Padded Leather", type: "leather", color: "#72503C", priceDelta: 900 }
    ],
    availableVariants: [
      { id: "queen", name: "Queen Bed", dimensions: "220 × 185 × 115 cm", price: 4200 },
      { id: "king", name: "King Bed", dimensions: "230 × 225 × 115 cm", price: 4900 }
    ],
    dimensions: {
      width: "225 cm (88.6 in)",
      depth: "230 cm (90.6 in)",
      height: "115 cm (45.3 in)",
      weight: "124 kg (273 lbs)"
    },
    specifications: {
      frame: "Kiln-dried hardwood frame reinforced with mortise-and-tenon joints",
      headboard: "Gently curved acoustic wings with plush down-blend padding",
      legs: "Solid American walnut tapered feet with brushed bronze ferrules",
      warranty: "15-year warranty"
    },
    features: [
      { title: "Acoustic Cocoon Headboard", description: "Subtle 15 cm return wings reduce bedroom acoustic flutter for quieter sleep." },
      { title: "Tailored Flange Seam", description: "Crisp raw-edge flange detail highlights bespoke European hand tailoring." }
    ],
    price: 4900,
    currency: "USD",
    availability: "Made to order — 5-7 weeks",
    relatedProducts: ["eos-platform-bed", "linear-credenza", "arc-lounge-chair"],
    storytellingScenes: [
      { stage: "01", progress: "0–50%", title: "Enclosing Sanctuary", description: "Wrap-around wings create an acoustic sanctuary." },
      { stage: "02", progress: "50–100%", title: "Architectural Wool", description: "Dense European melton wool tailored with subtle flange seams." }
    ],
    care: "Vacuum fabric using upholstery attachment. Wipe timber feet with soft cloth.",
    seo: {
      title: "Nocturne Upholstered Bed | ATELIER Luxury Beds",
      description: "Winged acoustic upholstered bed in midnight charcoal wool with solid walnut feet.",
      keywords: "upholstered bed, winged headboard, luxury bed, charcoal wool bed, designer bedroom"
    }
  },
  {
    id: "prod-011",
    slug: "monolith-tall-cabinet",
    name: "Monolith Tall Cabinet",
    category: "workspace",
    collection: "Architectural Series",
    tagline: "Pure vertical architecture.",
    shortDescription: "A tall architectural display cabinet with patinated bronze metal mesh doors, dimmable warm LED reveals, and smoked ash interior.",
    longDescription: "The Monolith Tall Cabinet stands as an architectural totem. Behind dual doors of fine woven bronze mesh, smoked oak shelving and integrated warm museum lighting display rare books, ceramics, and glassware with cinematic subtlety.",
    images: {
      hero: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "cabinet",
      defaultColor: "#181818",
      defaultFinish: "wood"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.5, 3.4], target: [0, 0.9, 0] },
      detail: { position: [0.6, 1.2, 1.6], target: [0, 1.0, 0] },
      top: { position: [0, 3.6, 0.1], target: [0, 0, 0] },
      angle: { position: [-2.0, 1.6, 2.5], target: [0, 0.9, 0] }
    },
    materials: [
      { id: "smoked-ash-bronze", name: "Smoked Ash & Antique Bronze", type: "wood", color: "#1E1E1E", priceDelta: 0 },
      { id: "natural-oak-bronze", name: "Bleached Oak & Muted Bronze", type: "wood", color: "#D7C5AF", priceDelta: 150 }
    ],
    availableVariants: [
      { id: "standard", name: "Monolith High Cabinet", dimensions: "110 × 48 × 195 cm", price: 5200 }
    ],
    dimensions: {
      width: "110 cm (43.3 in)",
      depth: "48 cm (18.9 in)",
      height: "195 cm (76.8 in)",
      weight: "148 kg (326 lbs)"
    },
    specifications: {
      exterior: "Ebonized smoked European ash with satin matte seal",
      doors: "Extruded aluminum framing with woven Dutch bronze architectural wire mesh",
      lighting: "Embedded 2700K high-CRI warm linear LED with touch dimmer in frame",
      warranty: "10-year warranty"
    },
    features: [
      { title: "Architectural Bronze Mesh", description: "Provides veiled transparency that conceals clutter while hinting at curated objects within." },
      { title: "Integrated Warm Lighting", description: "Concealed 2700K museum-grade LEDs wash downward across each shelf." }
    ],
    price: 5200,
    currency: "USD",
    availability: "Made to order — 6-8 weeks",
    relatedProducts: ["linear-credenza", "alto-executive-desk", "terra-dining-table"],
    storytellingScenes: [
      { stage: "01", progress: "0–50%", title: "Totemic Height", description: "A towering vertical accent commanding room height." },
      { stage: "02", progress: "50–100%", title: "Veiled Transparency", description: "Woven bronze mesh softens direct glare while accentuating collections." }
    ],
    care: "Dust timber with dry cloth. Clean bronze mesh with dry soft horsehair brush.",
    seo: {
      title: "Monolith Tall Cabinet | ATELIER Architectural Storage",
      description: "Tall display cabinet with antique bronze mesh doors and integrated museum lighting.",
      keywords: "tall cabinet, bar cabinet, bronze mesh cabinet, architectural storage, modern vitrine"
    }
  },
  {
    id: "prod-012",
    slug: "koto-curved-sofa",
    name: "Koto Curved Sofa",
    category: "living",
    collection: "Signature Series",
    tagline: "Gentle arcs for open gathering.",
    shortDescription: "A gracefully swept crescent sofa engineered with seamless waterfall upholstery in tactile Italian bouclé.",
    longDescription: "The Koto Curved Sofa eliminates straight lines in favor of an uninterrupted organic sweep. Its concave crescent framing fosters effortless conversation by naturally angling seat occupants toward one another.",
    images: {
      hero: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
      angle: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      detail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      lifestyle: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
    },
    model3d: {
      type: "sofa",
      defaultColor: "#F5F2EC",
      defaultFinish: "boucle"
    },
    modelScale: [1, 1, 1],
    cameraPresets: {
      hero: { position: [0, 1.2, 3.8], target: [0, 0.4, 0] },
      detail: { position: [0.9, 0.8, 1.8], target: [0.2, 0.5, 0] },
      top: { position: [0, 3.8, 0.1], target: [0, 0, 0] },
      angle: { position: [-2.2, 1.4, 2.8], target: [0, 0.3, 0] }
    },
    materials: [
      { id: "ivory-boucle", name: "Alpine Ivory Bouclé", type: "fabric", color: "#F5F2EC", priceDelta: 0 },
      { id: "sand-linen", name: "Dune Sand Linen", type: "fabric", color: "#D7C5AF", priceDelta: 150 },
      { id: "terracotta-wool", name: "Sienna Wool Felt", type: "fabric", color: "#72503C", priceDelta: 300 }
    ],
    availableVariants: [
      { id: "3-seat", name: "3-Seat Crescent (260 cm)", dimensions: "260 × 120 × 72 cm", price: 4800 },
      { id: "4-seat", name: "4-Seat Grand Arc (320 cm)", dimensions: "320 × 140 × 72 cm", price: 6200 }
    ],
    dimensions: {
      width: "260 cm (102.4 in)",
      depth: "120 cm (47.2 in)",
      height: "72 cm (28.3 in)",
      seatHeight: "41 cm (16.1 in)",
      weight: "105 kg (231 lbs)"
    },
    specifications: {
      frame: "Curved laminated beech wood skeleton with structural steel tie bars",
      cushioning: "Memory down over pocket coil spring core",
      warranty: "15-year frame warranty"
    },
    features: [
      { title: "Conversational Crescent", description: "Concave radius naturally focuses seated guests toward shared eye lines." },
      { title: "Waterfall Edge", description: "Unbroken upholstery flows continuously from the seat top over the base without seam lines." }
    ],
    price: 4800,
    currency: "USD",
    availability: "Made to order — 4-6 weeks",
    relatedProducts: ["forma-modular-sofa", "arc-lounge-chair", "terra-dining-table"],
    storytellingScenes: [
      { stage: "01", progress: "0–50%", title: "The Gentle Arc", description: "An organic sweep that breaks the monotony of rectilinear rooms." },
      { stage: "02", progress: "50–100%", title: "Waterfall Upholstery", description: "Smooth curves tailored in tactile Italian bouclé without visible perimeter seams." }
    ],
    care: "Vacuum with soft brush. Blot spills immediately with clean damp cloth.",
    seo: {
      title: "Koto Curved Sofa | ATELIER Sculptural Sofas",
      description: "Curved crescent modular sofa in soft ivory bouclé with waterfall tailoring.",
      keywords: "curved sofa, crescent couch, sculptural sofa, round sofa, designer living room"
    }
  }
];
