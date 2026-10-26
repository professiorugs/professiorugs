/* ==========================================================================
   PROFESSIO — Collection data
   Source: Professio Product Catalog Booklet (2024). Images are cropped from
   the catalogue pages; replace with full-resolution photographs when available.

   Field guide
   - ref:        catalogue reference shown on the placard
   - dims:       [width, height] in centimetres, exactly as catalogued
   - materials:  null = not yet confirmed (shown as "Available on request")
   - type:       "Floor rug" or "Wall carpet"
   - origin:     floor rugs are "Hereke, Türkiye" or "Kayseri, Türkiye";
                 wall carpets are "Tabriz, Iran"
   - knots:      floor rugs are all 10 × 10 per cm (the Turkish "10'luk")
   - age, technique: null until confirmed by Professio
   - specsPending: true for pieces whose catalogue page carried template text
                   instead of real specifications
   - price:      null = "Price upon request". Use a round number in USD
                 (5600, 13500) to show a price.
   ========================================================================== */

window.PROFESSIO_PRODUCTS = [
  {
    id: "the-recital", ref: "No. 010", title: "The Recital",
    subtitle: "A salon gathers around the keyboard",
    image: "/images/collection/p2-1.jpg", category: "Salon & Court", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [100, 150], tags: ["Best Seller"],
    story: "Silk highlights catch the light across satin gowns and gilded chairs, while the wool ground holds the deep crimson of the drapery. A drawing-room scene rendered thread by thread, with the patience of an old master."
  },
  {
    id: "the-courtship", ref: "No. 011", title: "The Courtship",
    subtitle: "A bow, a blush, a gathered room",
    image: "/images/collection/p2-2.jpg", category: "Salon & Court", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [160, 105], tags: ["Best Seller"],
    story: "Pale celadon silk on the suitor's coat, coral on the lady's skirts. The weaver has graded each fold of fabric through dozens of tones, so the scene reads as painted from across the room and as woven from up close."
  },
  {
    id: "the-family-salon", ref: "No. 022", title: "The Family Salon",
    subtitle: "Three generations under a gilded mirror",
    image: "/images/collection/p2-3.jpg", category: "Salon & Court", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [155, 105], tags: ["Best Seller"],
    story: "An emerald-draped interior where every figure turns toward the child at its centre. Note the rug woven within the rug at their feet: a quiet signature of the tradition."
  },
  {
    id: "the-atelier", ref: "No. 028", title: "The Atelier",
    subtitle: "Painters, patrons and an easel by the window",
    image: "/images/collection/p3-1.jpg", category: "Salon & Court", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [150, 100], tags: ["Best Seller"],
    story: "A study of an artist's studio, crowded with portfolios, sculpture and visitors. The window light is built from silk, so the piece shifts in tone as you walk past it."
  },
  {
    id: "the-grand-ballroom", ref: "No. 018", title: "The Grand Ballroom",
    subtitle: "A procession beneath gilded vaults",
    image: "/images/collection/p3-2.jpg", category: "Salon & Court", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [200, 120], tags: ["Best Seller"],
    story: "The largest of our salon pieces: a full court in motion, its golden architecture receding into depth. A statement work for a long wall or a stairwell."
  },
  {
    id: "the-wedding-procession", ref: "No. 021", title: "The Wedding Procession",
    subtitle: "A village party spills into the garden",
    image: "/images/collection/p3-3.jpg", category: "Garden & Street", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [160, 105], tags: ["Best Seller"],
    story: "Morning light through old trees, a bride on her father's arm, children running ahead with flowers. Warm, joyful and dense with incident."
  },
  {
    id: "still-life-with-peonies", ref: "No. 010-B", title: "Still Life with Peonies",
    subtitle: "Flowers, porcelain and a marble muse",
    image: "/images/collection/p4-1.jpg", category: "Still Life & Portrait", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [80, 60], tags: ["Best Seller"],
    story: "An intimate cabinet piece. Lilac, rose and saffron blooms float against a deep teal ground, with silk giving each petal its sheen."
  },
  {
    id: "the-grey-mare", ref: "No. 023-A", title: "The Grey Mare",
    subtitle: "A rider in crimson, a horse in silver",
    image: "/images/collection/p4-2.jpg", category: "Still Life & Portrait", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Pure Silk", dims: [100, 70], tags: ["Best Seller"],
    story: "The mane alone is a feat: hundreds of shades of grey and ivory, knotted to fall like real hair. A contemporary subject in a centuries-old technique.",
    price: 1700, etsy: "https://www.etsy.com/listing/1388640893", photo: true,
    images: ["https://i.etsystatic.com/35873478/r/il/2375c1/4547673709/il_794xN.4547673709_dfu8.jpg", "https://i.etsystatic.com/35873478/r/il/22784b/4500311732/il_794xN.4500311732_pfdj.jpg", "https://i.etsystatic.com/35873478/r/il/f5ca17/4500311644/il_794xN.4500311644_b82l.jpg", "https://i.etsystatic.com/35873478/r/il/c01398/4500311134/il_794xN.4500311134_8f8d.jpg", "https://i.etsystatic.com/35873478/r/il/28da5a/4500311812/il_794xN.4500311812_rztp.jpg"]
  },
  {
    id: "the-duet", ref: "No. 023-B", title: "The Duet",
    subtitle: "Two figures at the piano",
    image: "/images/collection/p4-3.jpg", category: "Still Life & Portrait", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [100, 70], tags: ["Best Seller"],
    story: "Cobalt silk carries the movement of the gown, while the wool background stays soft and painterly. Quiet, romantic, unmistakably handmade."
  },
  {
    id: "the-poets-chamber", ref: "No. 023-C", title: "The Poet's Chamber",
    subtitle: "Persian miniature, framed",
    image: "/images/collection/p5-1.jpg", category: "Persian Miniature", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [100, 70], tags: ["Framed"],
    story: "In the manner of the Isfahan miniature painters: flowing robes, curling drapery and a palette of lapis, rose and gold. Presented in a carved gilt frame."
  },
  {
    id: "spirit-of-the-garden", ref: "No. 023-D", title: "Spirit of the Garden",
    subtitle: "Persian miniature, framed",
    image: "/images/collection/p5-2.jpg", category: "Persian Miniature", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Wool & Silk", dims: [100, 70], tags: ["Framed"],
    story: "A figure dissolves into blossoms, birds and leaping deer. The fine scale of the drawing asks for a very dense knot, and rewards close looking."
  },
  {
    id: "the-celebration", ref: "No. 023-E", title: "Dance with Nature",
    subtitle: "A museum-scale work in pure silk",
    image: "/images/collection/p5-3.jpg", category: "Persian Miniature", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Pure Silk", dims: [200, 300], tags: ["Masterpiece"],
    story: "Two by three metres of pure silk: musicians, dancers and sleepers beneath flowering trees, framed by an illuminated border. Pieces of this scale take a workshop years, and rarely leave private hands.",
    price: 21500, etsy: "https://www.etsy.com/listing/1388668425", photo: true,
    images: ["https://i.etsystatic.com/35873478/r/il/a48405/4547818031/il_794xN.4547818031_885l.jpg", "https://i.etsystatic.com/35873478/r/il/c5f39e/4500458480/il_794xN.4500458480_ffrz.jpg", "https://i.etsystatic.com/35873478/r/il/f16679/4547821219/il_794xN.4547821219_89br.jpg", "https://i.etsystatic.com/35873478/r/il/4c3146/4500458684/il_794xN.4500458684_1c12.jpg", "https://i.etsystatic.com/35873478/r/il/a56e9e/4547821253/il_794xN.4547821253_a9og.jpg"]
  },
  {
    id: "flower-market", ref: "No. E-3526", title: "The Flower Market",
    subtitle: "A riverside promenade, late afternoon",
    image: "/images/collection/p6-1.jpg", category: "Garden & Street", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Pure Silk", dims: [200, 120], tags: ["New Arrival"],
    story: "Parasols, a clock tower and a cart overflowing with blooms: a riverside promenade woven entirely in silk, two metres wide.",
    price: 12500, etsy: "https://www.etsy.com/listing/1381893526", photo: true,
    images: ["https://i.etsystatic.com/35873478/r/il/5f394d/4532494308/il_794xN.4532494308_em8z.jpg", "https://i.etsystatic.com/35873478/r/il/42395f/4532504300/il_794xN.4532504300_e4vv.jpg", "https://i.etsystatic.com/35873478/r/il/05080b/4532504458/il_794xN.4532504458_50n9.jpg", "https://i.etsystatic.com/35873478/r/il/d3a28a/4579886295/il_794xN.4579886295_ia0h.jpg", "https://i.etsystatic.com/35873478/r/il/0230f1/4532504508/il_794xN.4532504508_qhkx.jpg"]
  },
  {
    id: "autumn-path", ref: "Special Selection", title: "Autumn Path",
    subtitle: "Maples by still water",
    image: "/images/collection/p7-1.jpg", category: "Landscape", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection"], specsPending: true,
    story: "Russet, amber and moss in a quiet riverside walk. Landscape pieces bring the weaver's colour grading to its most subtle."
  },
  {
    id: "cottage-by-the-falls", ref: "No. E-1800", title: "Cottage by the Falls",
    subtitle: "A mountain idyll in full colour",
    image: "/images/collection/p7-2.jpg", category: "Landscape", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: "Pure Silk", dims: [155, 95], tags: ["Special Selection"],
    story: "Cascading water rendered in white silk, a stone cottage glowing in the valley. Bright, warm and welcoming.",
    price: 4200, etsy: "https://www.etsy.com/listing/1374631800", photo: true,
    images: ["https://i.etsystatic.com/35873478/r/il/dff985/4500281782/il_794xN.4500281782_pe58.jpg", "https://i.etsystatic.com/35873478/r/il/41efc1/4500282168/il_794xN.4500282168_t3k2.jpg", "https://i.etsystatic.com/35873478/r/il/2e6ee2/4547645021/il_794xN.4547645021_pw4c.jpg", "https://i.etsystatic.com/35873478/r/il/b84ea1/4547645049/il_794xN.4547645049_fwc7.jpg", "https://i.etsystatic.com/35873478/r/il/72b683/4547645107/il_794xN.4547645107_cfg9.jpg"]
  },
  {
    id: "the-enchanted-forest", ref: "Special Selection", title: "The Enchanted Forest",
    subtitle: "Persian miniature in jewel tones",
    image: "/images/collection/p7-3.jpg", category: "Persian Miniature", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection"], specsPending: true,
    story: "A whirl of figures, deer and blossom on a midnight-blue sky, drawn in the swirling line of the miniature tradition."
  },
  {
    id: "still-water", ref: "Special Selection", title: "Still Water",
    subtitle: "Old trees and their reflections, framed",
    image: "/images/collection/p7-4.jpg", category: "Landscape", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection", "Framed"], specsPending: true,
    story: "A green, shaded pool beneath ancient trunks. The reflections are woven as carefully as the trees themselves."
  },
  {
    id: "the-boating-party", ref: "Special Selection", title: "The Boating Party",
    subtitle: "An afternoon on the river, framed",
    image: "/images/collection/p8-1.jpg", category: "Garden & Street", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection", "Framed"], specsPending: true,
    story: "Silks and parasols drifting under the willows, presented in a carved gilt frame."
  },
  {
    id: "the-spinning-wheel", ref: "Special Selection", title: "The Spinning Wheel",
    subtitle: "A mother, two children and the loom's first step",
    image: "/images/collection/p8-2.jpg", category: "Still Life & Portrait", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection", "Framed"], specsPending: true,
    story: "A family interior in traditional dress, with a spinning wheel at its heart: a fitting subject for a house built on thread."
  },
  {
    id: "the-music-lesson", ref: "Special Selection", title: "The Music Lesson",
    subtitle: "A salon at the harpsichord, framed",
    image: "/images/collection/p8-3.jpg", category: "Salon & Court", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection", "Framed"], specsPending: true,
    story: "A crowded salon in powdered wigs and pale silks, framed in silver-gilt."
  },
  {
    id: "the-tavern-feast", ref: "Special Selection", title: "The Tavern Feast",
    subtitle: "Music, wine and a dancer in red",
    image: "/images/collection/p8-4.jpg", category: "Salon & Court", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection", "Framed"], specsPending: true,
    story: "A lively inn scene with musicians and a long table, framed in heavy carved gold."
  },
  {
    id: "the-sacrifice", ref: "Special Selection", title: "The Sacrifice",
    subtitle: "An angel stays the hand",
    image: "/images/collection/p9-1.jpg", category: "Sacred & Allegory", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection"], specsPending: true,
    story: "A dramatic Old Testament scene after the Baroque masters, all chiaroscuro and gesture."
  },
  {
    id: "the-ark", ref: "Special Selection", title: "The Ark",
    subtitle: "After the flood, beneath the rainbow",
    image: "/images/collection/p9-2.jpg", category: "Sacred & Allegory", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection"], specsPending: true,
    story: "A panoramic procession of animals and figures, crowned by a rainbow woven in silk."
  },
  {
    id: "the-last-supper", ref: "Special Selection", title: "The Last Supper",
    subtitle: "Twelve figures around the table",
    image: "/images/collection/p9-3.jpg", category: "Sacred & Allegory", type: "Wall carpet", origin: "Tabriz, Iran",
    materials: null, dims: null, tags: ["Special Selection"], specsPending: true,
    story: "One of the most requested subjects in the pictorial tradition, rendered in rich, saturated colour."
  }
];

/* --------------------------------------------------------------------------
   Pieces from the Professio Etsy atelier (etsy.com/shop/ProfessioRugs).
   Photos are served from Etsy's image CDN; "Acquire Piece" opens the Etsy
   listing for secure checkout. Prices in USD, rounded; Etsy checkout shows the Etsy listing price.
   -------------------------------------------------------------------------- */
window.PROFESSIO_PRODUCTS = [
  {"id": "arcade-of-vases", "ref": "No. E-9967", "title": "The Arcade of Vases", "subtitle": "Pure Hereke silk, framed in midnight blue", "image": "https://i.etsystatic.com/35873478/r/il/9f7fda/6860142506/il_794xN.6860142506_bhvg.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/9f7fda/6860142506/il_794xN.6860142506_bhvg.jpg", "https://i.etsystatic.com/35873478/r/il/3f0316/6908122231/il_794xN.6908122231_24o5.jpg", "https://i.etsystatic.com/35873478/r/il/5763ac/6908122295/il_794xN.6908122295_muv2.jpg", "https://i.etsystatic.com/35873478/r/il/25ec56/6908122451/il_794xN.6908122451_9ju5.jpg", "https://i.etsystatic.com/35873478/r/il/b4b4a2/6908122567/il_794xN.6908122567_qzsm.jpg"], "type": "Floor rug", "category": "Hereke Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [150, 105], "shape": "Rectangle", "origin": "Hereke, Türkiye", "price": 13500, "etsy": "https://www.etsy.com/listing/4305069967", "tags": ["Masterpiece"], "photo": true, "story": "A procession of arches, each sheltering a vase in bloom, held within a dark navy floral border. Red, saffron, rose and leaf green are dyed from plant roots and knotted in pure silk, so the piece glows as the light moves across it. Our most ambitious Hereke piece."},
  {"id": "turquoise-runner", "ref": "No. E-8770", "title": "Turquoise Runner", "subtitle": "A long medallion in teal and rose", "image": "https://i.etsystatic.com/35873478/r/il/3af2d7/6860088540/il_794xN.6860088540_reoh.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/3af2d7/6860088540/il_794xN.6860088540_reoh.jpg", "https://i.etsystatic.com/35873478/r/il/37eedc/6860088544/il_794xN.6860088544_lslz.jpg", "https://i.etsystatic.com/35873478/r/il/a0fc46/6908068837/il_794xN.6908068837_3ir2.jpg", "https://i.etsystatic.com/35873478/r/il/26ded7/6908068925/il_794xN.6908068925_agb2.jpg", "https://i.etsystatic.com/35873478/r/il/e5ace3/6860088528/il_794xN.6860088528_rllh.jpg", "https://i.etsystatic.com/35873478/r/il/a3db87/6860088538/il_794xN.6860088538_mndj.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [137, 65], "shape": "Runner", "origin": "Kayseri, Türkiye", "price": 6000, "etsy": "https://www.etsy.com/listing/4305058770", "tags": ["Runner"], "photo": true, "story": "A central medallion floats on a teal field, surrounded by leaves and blossoms in cream, coral and green. Its long proportions suit a hallway, a bench end or a narrow wall."},
  {"id": "midnight-bloom", "ref": "No. E-0382", "title": "Midnight Bloom", "subtitle": "Navy silk ground, madder-red border, Hereke medallion", "image": "/images/collection/midnight-bloom.jpg", "images": ["/images/collection/midnight-bloom.jpg", "/images/collection/midnight-bloom-photo-1.jpg", "/images/collection/midnight-bloom-photo-2.jpg", "/images/collection/midnight-bloom-photo-3.jpg", "/images/collection/midnight-bloom-photo-4.jpg", "https://i.etsystatic.com/35873478/r/il/e2c616/6908103053/il_794xN.6908103053_47as.jpg", "https://i.etsystatic.com/35873478/r/il/6a84f4/6860124308/il_794xN.6860124308_b0cx.jpg", "https://i.etsystatic.com/35873478/r/il/a2530d/6908113505/il_794xN.6908113505_72jn.jpg", "https://i.etsystatic.com/35873478/r/il/d51815/6908102287/il_794xN.6908102287_mray.jpg", "https://i.etsystatic.com/35873478/r/il/cb6d8d/6908102049/il_794xN.6908102049_h4uc.jpg", "https://i.etsystatic.com/35873478/r/il/acf257/6908103663/il_794xN.6908103663_40az.jpg"], "type": "Floor rug", "category": "Hereke Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [110, 75], "shape": "Rectangle", "origin": "Hereke, Türkiye", "price": 5600, "etsy": "https://www.etsy.com/listing/4305060382", "tags": ["Flagship"], "photo": true, "flagship": true, "flyer": "/images/collection/midnight-bloom-flight.webp?v=2", "flyerSize": [1400, 863], "story": "Coral, cream and pale blue flowers open around a central medallion on a deep navy ground, framed by a border of madder red."},
  {"id": "madder-garden", "ref": "No. E-0434", "title": "Madder Garden", "subtitle": "Florals on a red silk field", "image": "https://i.etsystatic.com/35873478/r/il/83ad25/6859305334/il_794xN.6859305334_jfbj.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/83ad25/6859305334/il_794xN.6859305334_jfbj.jpg", "https://i.etsystatic.com/35873478/r/il/f57ba3/6907284085/il_794xN.6907284085_sge1.jpg", "https://i.etsystatic.com/35873478/r/il/65212c/6859307040/il_794xN.6859307040_659e.jpg", "https://i.etsystatic.com/35873478/r/il/5082aa/6859301558/il_794xN.6859301558_7ziu.jpg", "https://i.etsystatic.com/35873478/r/il/430e2f/6907283589/il_794xN.6907283589_6ucp.jpg", "https://i.etsystatic.com/35873478/r/il/af35e7/6907284889/il_794xN.6907284889_limv.jpg"], "type": "Floor rug", "category": "Hereke Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [110, 70], "shape": "Rectangle", "origin": "Hereke, Türkiye", "price": 5100, "etsy": "https://www.etsy.com/listing/4304880434", "tags": [], "photo": true, "story": "A field of madder red scattered with blue, pink, cream and green blossoms. Woven in pure Hereke silk with colours drawn from plant roots."},
  {"id": "turquoise-medallion", "ref": "No. E-8069", "title": "Turquoise Medallion", "subtitle": "Teal field, paisley and gold", "image": "https://i.etsystatic.com/35873478/r/il/ef6a9e/6908110597/il_794xN.6908110597_bmip.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/ef6a9e/6908110597/il_794xN.6908110597_bmip.jpg", "https://i.etsystatic.com/35873478/r/il/3b7a11/6854510816/il_794xN.6854510816_f9x6.jpg", "https://i.etsystatic.com/35873478/r/il/43aca0/6854466938/il_794xN.6854466938_b7z3.jpg", "https://i.etsystatic.com/35873478/r/il/d76a11/6902452353/il_794xN.6902452353_6mvs.jpg", "https://i.etsystatic.com/35873478/r/il/582024/6902454409/il_794xN.6902454409_mnw9.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [102, 66], "shape": "Rectangle", "origin": "Kayseri, Türkiye", "price": 4500, "etsy": "https://www.etsy.com/listing/4303918069", "tags": [], "photo": true, "story": "A turquoise field with a central medallion, edged by a border of florals, geometry and paisley in red, gold and cream."},
  {"id": "the-hunting-garden", "ref": "No. E-1603", "title": "The Hunting Garden", "subtitle": "Deer and birds among the flowers", "image": "https://i.etsystatic.com/35873478/r/il/ac788e/6862027308/il_794xN.6862027308_kshw.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/ac788e/6862027308/il_794xN.6862027308_kshw.jpg", "https://i.etsystatic.com/35873478/r/il/26f297/6856614616/il_794xN.6856614616_i6hu.jpg", "https://i.etsystatic.com/35873478/r/il/18b6eb/6904595357/il_794xN.6904595357_kqnl.jpg", "https://i.etsystatic.com/35873478/r/il/44541c/6856614754/il_794xN.6856614754_t2c8.jpg", "https://i.etsystatic.com/35873478/r/il/b877c2/6904595457/il_794xN.6904595457_q994.jpg", "https://i.etsystatic.com/35873478/r/il/52f2ac/6856627136/il_794xN.6856627136_se6l.jpg"], "type": "Floor rug", "category": "Hereke Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [95, 65], "shape": "Rectangle", "origin": "Hereke, Türkiye", "price": 4300, "etsy": "https://www.etsy.com/listing/4304331603", "tags": [], "photo": true, "story": "Deer and birds move through a flowering teal garden, a theme with deep roots in Anatolian and Persian court weaving."},
  {"id": "tree-of-life-night", "ref": "No. E-0547", "title": "Tree of Life, Night", "subtitle": "Two birds on a black silk ground", "image": "https://i.etsystatic.com/35873478/r/il/e7e22e/6859351976/il_794xN.6859351976_pj9v.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/e7e22e/6859351976/il_794xN.6859351976_pj9v.jpg", "https://i.etsystatic.com/35873478/r/il/cd9d15/6859350900/il_794xN.6859350900_fa4d.jpg", "https://i.etsystatic.com/35873478/r/il/012c62/6859351964/il_794xN.6859351964_d5lo.jpg", "https://i.etsystatic.com/35873478/r/il/fddcbd/6907333277/il_794xN.6907333277_af28.jpg", "https://i.etsystatic.com/35873478/r/il/791023/6859351970/il_794xN.6859351970_lo5k.jpg", "https://i.etsystatic.com/35873478/r/il/b2bc8c/6859351974/il_794xN.6859351974_p50f.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [92, 67], "shape": "Rectangle", "origin": "Kayseri, Türkiye", "price": 4300, "etsy": "https://www.etsy.com/listing/4304900547", "tags": [], "photo": true, "story": "A tree of life with a pair of birds, set on a rare black field and framed in cream, blue and red. Quiet, graphic and striking on a pale wall."},
  {"id": "crimson-roundel", "ref": "No. E-1988", "title": "Crimson Roundel", "subtitle": "A round silk medallion", "image": "https://i.etsystatic.com/35873478/r/il/45c6a5/6854985602/il_794xN.6854985602_9ncg.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/45c6a5/6854985602/il_794xN.6854985602_9ncg.jpg", "https://i.etsystatic.com/35873478/r/il/e55e5e/6854975672/il_794xN.6854975672_d41b.jpg", "https://i.etsystatic.com/35873478/r/il/c5ae04/6854975726/il_794xN.6854975726_74o8.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [76, 71], "shape": "Round", "origin": "Kayseri, Türkiye", "price": 3700, "etsy": "https://www.etsy.com/listing/4304011988", "tags": ["Round"], "photo": true, "story": "A round rug in red, blue, green and cream, its medallion radiating outward to a fringed edge."},
  {"id": "celadon-garden", "ref": "No. E-5545", "title": "Celadon Garden", "subtitle": "Teal medallion, cream border", "image": "https://i.etsystatic.com/35873478/r/il/48b24c/6857008852/il_794xN.6857008852_9asj.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/48b24c/6857008852/il_794xN.6857008852_9asj.jpg", "https://i.etsystatic.com/35873478/r/il/0d5241/6856989020/il_794xN.6856989020_b725.jpg", "https://i.etsystatic.com/35873478/r/il/484069/6856984358/il_794xN.6856984358_skgy.jpg", "https://i.etsystatic.com/35873478/r/il/89ca3b/6856982942/il_794xN.6856982942_ri0b.jpg", "https://i.etsystatic.com/35873478/r/il/40d283/6856983292/il_794xN.6856983292_ol1k.jpg", "https://i.etsystatic.com/35873478/r/il/9539cc/6904965603/il_794xN.6904965603_6b5b.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [66, 53], "shape": "Rectangle", "origin": "Kayseri, Türkiye", "price": 2500, "etsy": "https://www.etsy.com/listing/4304405545", "tags": [], "photo": true, "story": "A teal field dense with floral tracery around a central medallion, framed by a cream border with navy and burgundy accents."},
  {"id": "indigo-medallion", "ref": "No. E-2762", "title": "Indigo Medallion", "subtitle": "Navy centre, cream border", "image": "https://i.etsystatic.com/35873478/r/il/4db139/6856603322/il_794xN.6856603322_3na2.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/4db139/6856603322/il_794xN.6856603322_3na2.jpg", "https://i.etsystatic.com/35873478/r/il/4272c4/6856591766/il_794xN.6856591766_ia72.jpg", "https://i.etsystatic.com/35873478/r/il/b6e339/6856599478/il_794xN.6856599478_8ecz.jpg", "https://i.etsystatic.com/35873478/r/il/f1e478/6856609796/il_794xN.6856609796_pt0r.jpg", "https://i.etsystatic.com/35873478/r/il/80d507/6856605896/il_794xN.6856605896_h3g8.jpg", "https://i.etsystatic.com/35873478/r/il/ee4143/6904588965/il_794xN.6904588965_rwp2.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [63, 51], "shape": "Rectangle", "origin": "Kayseri, Türkiye", "price": 2300, "etsy": "https://www.etsy.com/listing/4304322762", "tags": [], "photo": true, "story": "A navy centre with an intricate medallion in teal, rust and orange, set within a cream floral border."},
  {"id": "birds-of-the-medallion", "ref": "No. E-7151", "title": "Birds of the Medallion", "subtitle": "Red silk with stylised birds", "image": "https://i.etsystatic.com/35873478/r/il/28b70b/6904634963/il_794xN.6904634963_mvs0.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/28b70b/6904634963/il_794xN.6904634963_mvs0.jpg", "https://i.etsystatic.com/35873478/r/il/f14dc1/6904613083/il_794xN.6904613083_532t.jpg", "https://i.etsystatic.com/35873478/r/il/4c52c7/6904611281/il_794xN.6904611281_532t.jpg", "https://i.etsystatic.com/35873478/r/il/aa6053/6904619891/il_794xN.6904619891_j7b7.jpg", "https://i.etsystatic.com/35873478/r/il/b335f2/6904620891/il_794xN.6904620891_tla3.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [71, 43], "shape": "Rectangle", "origin": "Kayseri, Türkiye", "price": 2200, "etsy": "https://www.etsy.com/listing/4304337151", "tags": [], "photo": true, "story": "Stylised birds flank a central medallion on a red field, bordered in blue, green and white."},
  {"id": "aegean-medallion", "ref": "No. E-5035", "title": "Aegean Medallion", "subtitle": "Turquoise field, fringed", "image": "https://i.etsystatic.com/35873478/r/il/e92ffe/6856676060/il_794xN.6856676060_agnu.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/e92ffe/6856676060/il_794xN.6856676060_agnu.jpg", "https://i.etsystatic.com/35873478/r/il/8706a5/6904664771/il_794xN.6904664771_h5n1.jpg", "https://i.etsystatic.com/35873478/r/il/bfc498/6904656715/il_794xN.6904656715_rk96.jpg", "https://i.etsystatic.com/35873478/r/il/d22557/6856675774/il_794xN.6856675774_2nhw.jpg", "https://i.etsystatic.com/35873478/r/il/e59353/6904658399/il_794xN.6904658399_j33y.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [66, 46], "shape": "Rectangle", "origin": "Kayseri, Türkiye", "price": 2200, "etsy": "https://www.etsy.com/listing/4304345035", "tags": [], "photo": true, "story": "A floral medallion on a light turquoise field, bordered in cream, brown, red and navy."},
  {"id": "vase-of-flowers", "ref": "No. E-5060", "title": "Vase of Flowers", "subtitle": "A bouquet beneath an arch", "image": "https://i.etsystatic.com/35873478/r/il/9aa399/6856366942/il_794xN.6856366942_nzui.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/9aa399/6856366942/il_794xN.6856366942_nzui.jpg", "https://i.etsystatic.com/35873478/r/il/a12f49/6904323233/il_794xN.6904323233_7v4q.jpg", "https://i.etsystatic.com/35873478/r/il/eaf809/6904320539/il_794xN.6904320539_rgph.jpg", "https://i.etsystatic.com/35873478/r/il/5eb9bf/6856343632/il_794xN.6856343632_f3xs.jpg", "https://i.etsystatic.com/35873478/r/il/a2b639/6856369192/il_794xN.6856369192_o970.jpg"], "type": "Floor rug", "category": "Hereke Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [70, 42], "shape": "Rectangle", "origin": "Hereke, Türkiye", "price": 2100, "etsy": "https://www.etsy.com/listing/4304275060", "tags": [], "photo": true, "story": "A vase overflowing with red, orange, yellow and white flowers on a deep blue field, a motif shared by Anatolian prayer and vase rugs."},
  {"id": "songbird-medallion", "ref": "No. E-7870", "title": "Songbird Medallion", "subtitle": "Birds and scrolls on red", "image": "https://i.etsystatic.com/35873478/r/il/f93c7a/6856577686/il_794xN.6856577686_ozn1.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/f93c7a/6856577686/il_794xN.6856577686_ozn1.jpg", "https://i.etsystatic.com/35873478/r/il/d392c5/6904533797/il_794xN.6904533797_gatz.jpg", "https://i.etsystatic.com/35873478/r/il/3eeec9/6904419869/il_794xN.6904419869_726o.jpg", "https://i.etsystatic.com/35873478/r/il/59bb02/6856418502/il_794xN.6856418502_jqaz.jpg", "https://i.etsystatic.com/35873478/r/il/63eed5/6904421107/il_794xN.6904421107_f472.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [66, 43], "shape": "Rectangle", "origin": "Kayseri, Türkiye", "price": 2100, "etsy": "https://www.etsy.com/listing/4304287870", "tags": [], "photo": true, "story": "Birds and blossoms gather in a central medallion on a red field, framed by scrolling floral borders."},
  {"id": "small-crimson-bloom", "ref": "No. E-7154", "title": "Small Crimson Bloom", "subtitle": "A cabinet piece in red and navy", "image": "https://i.etsystatic.com/35873478/r/il/f2f1f0/6857047718/il_794xN.6857047718_cqoc.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/f2f1f0/6857047718/il_794xN.6857047718_cqoc.jpg", "https://i.etsystatic.com/35873478/r/il/d2f9d5/6857048838/il_794xN.6857048838_jxcb.jpg", "https://i.etsystatic.com/35873478/r/il/ac048e/6857046050/il_794xN.6857046050_u6o9.jpg", "https://i.etsystatic.com/35873478/r/il/1019ad/6905030015/il_794xN.6905030015_8zhq.jpg", "https://i.etsystatic.com/35873478/r/il/70757e/6905026657/il_794xN.6905026657_ooop.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [62, 46], "shape": "Rectangle", "origin": "Kayseri, Türkiye", "price": 2100, "etsy": "https://www.etsy.com/listing/4304417154", "tags": [], "photo": true, "story": "A stylised flower on a red field, held by an ornate navy, gold and cream border. Small enough for a side table, a shelf or a framed wall."},
  {"id": "crimson-medallion", "ref": "No. E-5699", "title": "Crimson Medallion", "subtitle": "Red, cream and navy", "image": "https://i.etsystatic.com/35873478/r/il/2ad5c7/6856290218/il_794xN.6856290218_6h0p.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/2ad5c7/6856290218/il_794xN.6856290218_6h0p.jpg", "https://i.etsystatic.com/35873478/r/il/6ce07c/6904206663/il_794xN.6904206663_e5wy.jpg", "https://i.etsystatic.com/35873478/r/il/30a882/6904267583/il_794xN.6904267583_2tqr.jpg", "https://i.etsystatic.com/35873478/r/il/115fdf/6856230936/il_794xN.6856230936_86hm.jpg", "https://i.etsystatic.com/35873478/r/il/7241d0/6856293226/il_794xN.6856293226_o4ee.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [64, 43], "shape": "Rectangle", "origin": "Kayseri, Türkiye", "price": 2000, "etsy": "https://www.etsy.com/listing/4304265699", "tags": [], "photo": true, "story": "A classic central medallion with florals, framed by a navy floral border."},
  {"id": "teal-roundel", "ref": "No. E-7807", "title": "Teal Roundel", "subtitle": "A small round silk", "image": "https://i.etsystatic.com/35873478/r/il/a19617/6904680329/il_794xN.6904680329_ahix.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/a19617/6904680329/il_794xN.6904680329_ahix.jpg", "https://i.etsystatic.com/35873478/r/il/7c426e/6856693954/il_794xN.6856693954_4f2b.jpg", "https://i.etsystatic.com/35873478/r/il/571714/6904675637/il_794xN.6904675637_89fr.jpg", "https://i.etsystatic.com/35873478/r/il/abfdfd/6856694284/il_794xN.6856694284_ckjd.jpg", "https://i.etsystatic.com/35873478/r/il/922b4a/6856696892/il_794xN.6856696892_6zot.jpg"], "type": "Floor rug", "category": "Kayseri Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [50, 48], "shape": "Round", "origin": "Kayseri, Türkiye", "price": 1800, "etsy": "https://www.etsy.com/listing/4304347807", "tags": ["Round"], "photo": true, "story": "A round silk with a floral medallion on teal, accented in red, tan and gold."},
  {"id": "royal-octagon", "ref": "No. E-8137", "title": "Royal Octagon", "subtitle": "Teal, red and gold", "image": "https://i.etsystatic.com/35873478/r/il/7f0d42/6856748484/il_794xN.6856748484_n6pd.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/7f0d42/6856748484/il_794xN.6856748484_n6pd.jpg", "https://i.etsystatic.com/35873478/r/il/ff784b/6856747808/il_794xN.6856747808_2cpt.jpg", "https://i.etsystatic.com/35873478/r/il/36a7a9/6856744712/il_794xN.6856744712_jc8h.jpg", "https://i.etsystatic.com/35873478/r/il/5b4ede/6904727447/il_794xN.6904727447_ay72.jpg", "https://i.etsystatic.com/35873478/r/il/b5204d/6856746484/il_794xN.6856746484_19ad.jpg"], "type": "Floor rug", "category": "Hereke Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [47, 46], "shape": "Octagonal", "origin": "Hereke, Türkiye", "price": 1600, "etsy": "https://www.etsy.com/listing/4304358137", "tags": ["Octagonal"], "photo": true, "story": "An octagonal silk with a floral medallion in red, gold and cream on teal, finished with a white fringe."},
  {"id": "small-octagon", "ref": "No. E-8930", "title": "Small Octagon", "subtitle": "The smallest of the royal silks", "image": "https://i.etsystatic.com/35873478/r/il/76f3b6/6856713628/il_794xN.6856713628_rk0j.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/76f3b6/6856713628/il_794xN.6856713628_rk0j.jpg", "https://i.etsystatic.com/35873478/r/il/053602/6856706122/il_794xN.6856706122_hl0u.jpg", "https://i.etsystatic.com/35873478/r/il/ecf1ca/6904694053/il_794xN.6904694053_qdn6.jpg", "https://i.etsystatic.com/35873478/r/il/053e90/6856706312/il_794xN.6856706312_nbhp.jpg", "https://i.etsystatic.com/35873478/r/il/f1550f/6856706468/il_794xN.6856706468_awjg.jpg"], "type": "Floor rug", "category": "Hereke Silk", "materials": "Pure Silk", "dyes": "Natural plant-root dyes", "knots": "10 × 10 per cm (100 per cm²)", "dims": [44, 42], "shape": "Octagonal", "origin": "Hereke, Türkiye", "price": 1400, "etsy": "https://www.etsy.com/listing/4304348930", "tags": ["Octagonal"], "photo": true, "story": "A miniature octagonal silk in teal, red and gold. A first piece for a new collector."},
  {"id": "the-drawing-room", "ref": "No. E-4065", "title": "The Drawing Room", "subtitle": "An eighteenth-century interior in silk", "image": "https://i.etsystatic.com/35873478/r/il/335a64/4500370380/il_794xN.4500370380_lbdf.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/335a64/4500370380/il_794xN.4500370380_lbdf.jpg", "https://i.etsystatic.com/35873478/r/il/92063d/4547719151/il_794xN.4547719151_kdsu.jpg", "https://i.etsystatic.com/35873478/r/il/424183/4547719195/il_794xN.4547719195_ct3s.jpg", "https://i.etsystatic.com/35873478/r/il/fe4b37/4500356560/il_794xN.4500356560_e3rr.jpg", "https://i.etsystatic.com/35873478/r/il/718f23/4547719301/il_794xN.4547719301_h7jd.jpg"], "type": "Wall carpet", "category": "Salon & Court", "materials": "Pure Silk", "dims": [70, 100], "origin": "Tabriz, Iran", "price": 1600, "etsy": "https://www.etsy.com/listing/1388664065", "tags": ["Pictorial"], "photo": true, "story": "Figures gather in a richly furnished room, gilded chairs and patterned floor rendered knot by knot in silk."},
  {"id": "two-deer", "ref": "No. E-5002", "title": "Two Deer", "subtitle": "A small wall piece in silk and wool", "image": "https://i.etsystatic.com/35873478/r/il/f0d147/6276589769/il_794xN.6276589769_j5cz.jpg", "images": ["https://i.etsystatic.com/35873478/r/il/f0d147/6276589769/il_794xN.6276589769_j5cz.jpg", "https://i.etsystatic.com/35873478/r/il/8f2637/6228534194/il_794xN.6228534194_ctnx.jpg", "https://i.etsystatic.com/35873478/r/il/a188b8/6276591027/il_794xN.6276591027_goh6.jpg", "https://i.etsystatic.com/35873478/r/il/3d89de/6276591657/il_794xN.6276591657_9hwj.jpg", "https://i.etsystatic.com/35873478/r/il/7b616b/6276592105/il_794xN.6276592105_aabd.jpg"], "type": "Wall carpet", "category": "Landscape", "materials": "Silk & Wool", "dims": [45, 40], "origin": "Tabriz, Iran", "price": 300, "etsy": "https://www.etsy.com/listing/1770945002", "tags": ["Pictorial"], "photo": true, "story": "Two deer in a green meadow beneath a wide sky, framed by a traditional floral border. An accessible first piece."}
].concat(window.PROFESSIO_PRODUCTS);

/* --------------------------------------------------------------------------
   The soul of each piece: short stories shown on product pages
   ("The Soul of the Piece") and, for the leading pieces, as a teaser in the
   collection grid. Edit freely; keep each story to a few sentences.
   -------------------------------------------------------------------------- */
window.PROFESSIO_SOULS = {
  /* ---- Leading pieces ---- */
  "the-celebration": "Some rugs are woven; this one was kept alive. Strand by strand of silk, a garden was coaxed into being: musicians who never tire, dancers caught between one step and the next, a river that has been running for as long as the loom was strung. They say a carpet remembers every hand that touched it. Silk is the same. Stand close in the evening, when the lamps are low, and the whole scene seems to breathe, as if the party has only paused for you to arrive. A piece like this is not finished when it leaves the loom. It is finished when it finds the room that deserves it.",
  "arcade-of-vases": "Imagine a palace corridor above the Sea of Marmara, a row of niches each holding a single vessel of flowers, each lit by its own small flame. That is the feeling of this rug. Beneath every arch a vase stands in quiet devotion, and the midnight border closes around them like the dark beyond the lamplight. The colours came from roots and leaves, steeped and waited on with a patience modern life has forgotten. It is a piece for the hour after dinner, when conversation slows and the silk begins to glow.",
  "flower-market": "Somewhere a clock tower is about to strike, a flower seller is reaching for the last bouquet, and a child is tugging at a mother's hand. The weaver held that single moment still for the whole length of the work, row after row, without letting it slip. Two metres of silk, and not one figure is idle. Hang it where you pass every morning; it will give you a different detail each day for years.",
  "turquoise-runner": "Long and narrow, like the vaulted halls of the old caravanserais on the road out of Kayseri, this runner was made to lead somewhere. A single medallion floats at its heart, the colour of shallow water under winter light, and the flowers around it walk with you as you pass. Place it where people move, a hallway or a long bench, and let it do what it was made for: to accompany.",
  "midnight-bloom": "Night falls fast over the Gulf of İzmit, and the water below Hereke turns from silver to indigo in minutes. This rug lives in that hour. Pale blossoms open across a deep navy field, and the crimson border holds them like the last warmth of the day. It asks for soft light and rewards it.",
  "madder-garden": "Madder is one of the oldest reds known to weavers, drawn from a humble root that hides its colour underground. Here it becomes a whole field, and on it a scattering of blossoms in blue, rose and cream, as if a garden had been carried in from outside and laid down to rest. Warm, generous, impossible to ignore.",
  "turquoise-medallion": "Turquoise was the stone of protection along the old caravan roads, and this piece wears its colour like a charm. The medallion sits calm at the centre while paisley and gold flicker around the border. A small rug with the presence of a large one.",
  "the-hunting-garden": "In the old court gardens, deer moved between the flowerbeds and birds called from every branch. The weaver has let them back in. Look closely and the garden fills with life: a turned head, a lifted wing, a hoof mid-step. It is a rug to be discovered slowly, a little more each time.",
  "tree-of-life-night": "A tree of life is one of the oldest stories a weaver can tell: roots below, branches above, and the living world between. Here it grows from a black field, still as the inside of a cave, with two birds keeping watch in its crown. Austere and tender at once, it is the most quietly dramatic piece in the collection.",
  "cottage-by-the-falls": "A cottage glows at the foot of a waterfall, and the water is woven in silk so it seems to move. Every leaf on the bank was a decision, every stone a choice of shade. It is the kind of place that exists only in memory or in thread, and here it has been kept for you.",

  /* ---- Hereke and Kayseri silks ---- */
  "crimson-roundel": "A circle has no beginning and no end, which is why weavers have always trusted it with their wishes. This roundel radiates from its centre like ripples in still water, red and blue and green moving outward to the fringe.",
  "celadon-garden": "Celadon, the green of old porcelain and morning lichen on Cappadocian rock. The medallion rests at the centre of a dense, delicate garden, and the cream border frames it like a page of illumination.",
  "indigo-medallion": "Indigo is a patient dye; it rises from the vat green and turns blue only as it meets the air. This small piece holds that slow transformation in its navy heart, framed by a border of cream and rust.",
  "birds-of-the-medallion": "Birds have long been read as messengers in the weaving traditions of Anatolia. Here they gather around a red medallion as if waiting to carry it somewhere. Small, bright and full of intent.",
  "aegean-medallion": "Light turquoise, like the sea seen from a high window. A floral medallion sits at its centre with nothing to prove, framed in cream and soft brown. A quiet rug for a quiet corner.",
  "vase-of-flowers": "A vase of flowers beneath an arch: the same gesture weavers have made for centuries, an offering left at a doorway. Red, gold and white blooms rise from a deep blue ground, as fresh as the morning they were imagined.",
  "songbird-medallion": "Listen closely and the border seems to sing. Birds and scrolling vines circle a crimson medallion, every curve a knot placed by hand. A cabinet piece with a voice.",
  "small-crimson-bloom": "One flower, perfectly placed. This little silk proves that a rug does not need to be large to be complete. Set it on a table, a shelf or a wall and let it gather the room around it.",
  "crimson-medallion": "Red, cream and navy: the classic triad of Anatolian weaving. Nothing here is new, and that is the point. It is a small, steady piece of a very long tradition.",
  "teal-roundel": "A round rug softens a room: it rounds off corners and gathers chairs into a circle. This one does it in teal and gold, a small sky to set beneath your own.",
  "royal-octagon": "Eight sides, like the stars and fountains of old courtyards. The royal octagon holds its floral medallion as carefully as a reliquary holds its treasure.",
  "small-octagon": "The smallest of the royal silks, and perhaps the most intimate. A first piece for a new collector, or a quiet gift for an old one.",

  /* ---- Tabriz wall carpets ---- */
  "the-grey-mare": "The mane is the heart of this piece: hundreds of shades of silver and ivory, knotted until they fall like real hair. A woman in crimson leans into the horse's warmth, and for a moment neither of them is in a hurry.",
  "the-drawing-room": "Gilded chairs, a patterned floor, figures turned toward one another in conversation. The weaver has woven a room inside a rug, and invited you to step in.",
  "two-deer": "Two deer stand in a green meadow under a wide sky, unafraid. A small, gentle piece, and often the first rug a new collector falls for.",
  "the-recital": "The music has just begun. Someone leans toward the keyboard, someone else forgets the conversation. Silk catches every satin fold, so the whole salon shimmers as you pass.",
  "the-courtship": "A bow, a hesitation, a room holding its breath. The weaver graded each fold of fabric through dozens of tones so that the moment reads as painted from afar and as knotted up close.",
  "the-family-salon": "Three generations under a gilded mirror, all turning toward the smallest of them. Look down at their feet: there is a rug woven inside this rug, a quiet nod from one weaver to all who came before.",
  "the-atelier": "A painter's studio, crowded with portfolios and visitors. It is a picture about making pictures, woven by a hand that knows exactly how long beauty takes.",
  "the-grand-ballroom": "A whole court in motion beneath golden vaults. The architecture recedes into depth as if the rug had a far wall of its own. A statement piece for a long, generous wall.",
  "the-wedding-procession": "Children run ahead with flowers, a bride walks on her father's arm, and old trees lean in to watch. Joyful and crowded, it is a celebration you can hang on a wall.",
  "still-life-with-peonies": "Flowers fade; these will not. Lilac, rose and saffron petals float against deep teal, each with its own small gleam of silk.",
  "the-duet": "Two figures share one piano bench and one melody. Cobalt silk carries the movement of the gown while the background stays soft, like a room that has gone quiet to listen.",
  "the-poets-chamber": "In the manner of the miniature painters: flowing robes, curling drapery and a palette of lapis, rose and gold. It feels less like an object than a page torn from a book of verses.",
  "spirit-of-the-garden": "A figure dissolves into blossom, bird and leaping deer, as if the garden were dreaming her. The drawing is so fine it asks you to come closer, and then closer again.",
  "autumn-path": "Russet, amber and moss along a quiet riverside walk. Landscapes are where a weaver's colour grading becomes most subtle, every leaf a slightly different decision.",
  "the-enchanted-forest": "A midnight sky, a whirl of figures and deer, blossoms tumbling through the dark. The swirling line of the miniature tradition, alive in jewel tones.",
  "still-water": "Old trees and their reflections, woven with equal care. The surface of the pool is as patient as the hand that made it.",
  "the-boating-party": "Silks and parasols drifting under the willows on a slow afternoon. The frame is gilded; the mood is lazy and golden.",
  "the-spinning-wheel": "A mother at the spinning wheel, two children at her side. It is a fitting subject for a house built on thread: the first turn of the wheel, long before the first knot.",
  "the-music-lesson": "Powdered wigs, pale silks and a harpsichord. The lesson has stopped for a moment while everyone admires the newest pupil.",
  "the-tavern-feast": "Musicians, wine, a long table and a dancer in red. You can almost hear the room.",
  "the-sacrifice": "Light breaks through darkness as an angel stays a raised hand. Drama, gesture and shadow, rendered with a Baroque painter's sense of the moment.",
  "the-ark": "After the flood, the animals walk out beneath a rainbow woven in silk. A panoramic story told one knot at a time.",
  "the-last-supper": "Twelve figures around a single table, each turning toward the centre. One of the most requested subjects in the pictorial tradition, in rich, saturated colour."
};
(function () {
  var S = window.PROFESSIO_SOULS;
  window.PROFESSIO_PRODUCTS.forEach(function (p) { if (S[p.id]) p.soul = S[p.id]; });
})();

/* Clean URL for each piece: /rugs/<slug>/ (shared with tools/build.js).
   legacy = the address used before origins were added, kept as a redirect. */
window.PROFESSIO_SLUG = function (p, legacy) {
  if (p.slug && !legacy) return p.slug;
  var town = (p.origin || "").split(",")[0];
  var t = legacy ? p.title + (/silk/i.test(p.materials || "") ? " silk rug" : " rug")
    : p.type === "Wall carpet" ? p.title + " " + town + " wall carpet"
    : p.title + " " + town + (/silk/i.test(p.materials || "") ? " silk rug" : " rug");
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/['\u2019]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
};

/* Knot facts, shared with tools/build.js. The Turkish trade names a rug by its
   knots per centimetre in each direction: 10 × 10 is a "10'luk", 15 × 15 a "15'lik". */
window.PROFESSIO_KNOTS = function (p) {
  var m = /(\d+)\s*×\s*(\d+)\s*per cm/.exec(p.knots || "");
  if (!m) return null;
  var a = +m[1], b = +m[2];
  var sfx = a % 10 ? "lik lik lük lük lik lık lik lik luk".split(" ")[a % 10 - 1] : "luk lik luk lık lik lık lik lik lık".split(" ")[a / 10 % 10 - 1];
  return {
    total: p.dims ? p.dims[0] * p.dims[1] * a * b : null,
    note: a === b ? "A \u201c" + a + "\u2019" + sfx + "\u201d in the Turkish trade · about " + Math.round(a * b * 6.4516) + " per square inch" : null
  };
};
