/* ==========================================================================
   PROFESSIO — page builder
   Run `node tools/build.js` after editing js/products.js or page copy.
   It writes the <head> of every page (titles, descriptions, canonical URLs,
   social cards, structured data), one page per rug under /rugs/<slug>/,
   crawlable product cards, redirects from the old .html addresses,
   sitemap.xml and robots.txt.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const SITE = "https://professiorugs.com";
const TODAY = new Date().toISOString().slice(0, 10);

// Paste verification codes here when Google Search Console or Bing ask for an HTML tag.
const VERIFY = { google: "6cEMGBcEvDjib5KfCX70PS2WYArBzTevZWzxzoDOCMc", bing: "" };

global.window = {};
require(path.join(ROOT, "js/products.js"));
const PRODUCTS = window.PROFESSIO_PRODUCTS;
const slug = window.PROFESSIO_SLUG;
const knotFacts = (p) => window.PROFESSIO_KNOTS(p) || {};

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => { fs.mkdirSync(path.dirname(path.join(ROOT, f)), { recursive: true }); fs.writeFileSync(path.join(ROOT, f), s); };
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// Each page asks for /css/style.css?v=<hash>, so after an update every browser
// fetches the new stylesheet and scripts together instead of mixing old and new.
const VER = {};
for (const f of ["css/style.css", "js/products.js", "js/main.js"]) VER[f] = crypto.createHash("sha1").update(read(f)).digest("hex").slice(0, 10);
const versioned = (html) => html.replace(/(src|href)="\/(css\/style\.css|js\/products\.js|js\/main\.js)(\?v=[\w]+)?"/g, (m, a, f) => a + '="/' + f + "?v=" + VER[f] + '"');
const abs = (u) => (/^https?:/.test(u) ? u : SITE + (u.startsWith("/") ? u : "/" + u));
const rugPath = (p) => "/rugs/" + slug(p) + "/";
const clip = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); if (s.length <= n) return s; const cut = s.slice(0, n - 1); return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…"; };
const dimsText = (p) => (p.dims ? p.dims[0] + " × " + p.dims[1] + " cm" : null);
const priceText = (p) => (typeof p.price === "number" ? "$" + Math.round(p.price).toLocaleString("en-US") : "Price upon request");
const town = (p) => (p.origin || "").split(",")[0];
// "Hereke silk rug", "Kayseri silk rug", "Tabriz wall carpet" (same as kindText() in js/main.js)
const kindText = (p) => (town(p) ? town(p) + " " : "") + (p.type === "Wall carpet" ? "wall carpet" : /silk/i.test(p.materials || "") ? "silk rug" : "rug");
const kind = (p) => kindText(p).replace(/\b\w/g, (c) => c.toUpperCase());
const altText = (p) => p.title + ", handmade " + kindText(p) + (p.type === "Wall carpet" && p.materials ? " in " + p.materials.toLowerCase() : "") + (p.dims ? ", " + dimsText(p) : "");
const ld = (o) => '<script type="application/ld+json">' + JSON.stringify(o).replace(/</g, "\\u003c") + "</script>";

/* ---------- Shared structured data ---------- */
const ORG = {
  "@type": "OnlineStore", "@id": SITE + "/#org",
  name: "Professio", alternateName: "Professio Rugs", url: SITE + "/",
  logo: { "@type": "ImageObject", url: SITE + "/images/brand/logo-512.png", width: 512, height: 512 },
  image: SITE + "/images/brand/og-image.jpg",
  description: "A family house of handmade rugs: hand-knotted Hereke and Kayseri silk rugs from Türkiye and pictorial wall carpets from Tabriz, for private collectors, interior designers and the wholesale trade.",
  email: "info@professiorugs.com",
  address: { "@type": "PostalAddress", addressLocality: "Nevşehir", addressRegion: "Cappadocia", addressCountry: "TR" },
  areaServed: "Worldwide",
  knowsAbout: ["Handmade silk rugs", "Hereke silk rugs", "Kayseri silk rugs", "Tabriz carpets", "Pictorial wall carpets", "Turkish rugs", "Hand-knotted carpets", "Wholesale rugs"],
  sameAs: ["https://www.etsy.com/shop/ProfessioRugs"]
};
const WEBSITE = {
  "@type": "WebSite", "@id": SITE + "/#website", url: SITE + "/",
  name: "Professio", alternateName: ["Professio Rugs", "professiorugs.com"],
  publisher: { "@id": SITE + "/#org" }, inLanguage: "en"
};
const crumbs = (list) => ({
  "@type": "BreadcrumbList",
  itemListElement: list.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c[0], item: SITE + c[1] }))
});
const graph = (...nodes) => ld({ "@context": "https://schema.org", "@graph": nodes });

/* ---------- <head> ---------- */
// Rug pages: keep the main photo hidden until it can unroll (js/main.js), with a safety timeout.
const UNROLL = '<script>try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){var d=document.documentElement;d.classList.add("unroll-pending");setTimeout(function(){d.classList.remove("unroll-pending")},2500)}}catch(e){}</script>';
const INTRO = '<script>try{if((/[?&]intro\\b/.test(location.search)||!sessionStorage.getItem("professio.intro"))&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-pending")}catch(e){}</script>';

function head(o) {
  const url = SITE + o.path;
  const img = o.image || { url: SITE + "/images/brand/og-image.jpg", width: 1200, height: 630, alt: "Professio, handmade Hereke and Kayseri silk rugs and Tabriz wall carpets" };
  const t = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    "<title>" + esc(o.title) + "</title>",
    '<meta name="description" content="' + esc(o.description) + '">',
    o.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
    o.noindex ? "" : '<link rel="canonical" href="' + url + '">',
    '<meta name="theme-color" content="#241914">',
    '<meta name="author" content="Professio">',
    '<meta property="og:site_name" content="Professio">',
    '<meta property="og:locale" content="en_US">',
    '<meta property="og:type" content="' + (o.ogType || "website") + '">',
    '<meta property="og:title" content="' + esc(o.ogTitle || o.title) + '">',
    '<meta property="og:description" content="' + esc(o.description) + '">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:image" content="' + esc(img.url) + '">',
    img.width ? '<meta property="og:image:width" content="' + img.width + '">' : "",
    img.height ? '<meta property="og:image:height" content="' + img.height + '">' : "",
    '<meta property="og:image:alt" content="' + esc(img.alt) + '">',
    ...(o.extraMeta || []),
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + esc(o.ogTitle || o.title) + '">',
    '<meta name="twitter:description" content="' + esc(o.description) + '">',
    '<meta name="twitter:image" content="' + esc(img.url) + '">',
    '<meta name="twitter:image:alt" content="' + esc(img.alt) + '">',
    VERIFY.google ? '<meta name="google-site-verification" content="' + esc(VERIFY.google) + '">' : "",
    VERIFY.bing ? '<meta name="msvalidate.01" content="' + esc(VERIFY.bing) + '">' : "",
    '<link rel="icon" type="image/png" sizes="64x64" href="/images/brand/favicon.png">',
    '<link rel="apple-touch-icon" href="/images/brand/apple-touch-icon.png">',
    '<link rel="manifest" href="/site.webmanifest">',
    '<link rel="preload" href="/fonts/cormorant-latin.woff2" as="font" type="font/woff2" crossorigin>',
    '<link rel="preload" href="/fonts/jost-latin.woff2" as="font" type="font/woff2" crossorigin>',
    ...(o.preload || []),
    '<link rel="stylesheet" href="/css/style.css?v=' + VER["css/style.css"] + '">',
    o.path === "/" ? INTRO : "", // the wordmark intro greets visitors on the home page only
    o.unroll ? UNROLL : "",
    o.jsonld || ""
  ].filter(Boolean);
  return "<head>\n  " + t.join("\n  ") + "\n</head>";
}
const setHead = (html, h) => html.replace(/<head>[\s\S]*?<\/head>/, h);

/* ---------- Product cards (same markup as card() in js/main.js) ---------- */
// Etsy serves each photo at 794 px and 1588 px wide: home-page cards take the sharper one on high-density
// screens, and fall back to 794 px if a larger copy is missing.
function cardImg(p, cls, sharp) {
  const hi = sharp && /etsystatic\.com\/.*il_794xN/.test(p.image) ? p.image.replace("il_794xN", "il_1588xN") : "";
  return '<img class="' + cls + '" src="' + p.image + '"' + (hi ? ' srcset="' + p.image + " 1x, " + hi + ' 2x" onerror="this.onerror=null;this.removeAttribute(\'srcset\')"' : "") +
    ' alt="' + esc(altText(p)) + '" loading="lazy" decoding="async" referrerpolicy="no-referrer">';
}
function card(p, sharp) {
  const flag = p.tags && p.tags[0] ? '<span class="card-flag">' + esc(p.tags[0]) + "</span>" : "";
  const meta = [town(p), p.materials, dimsText(p)].filter(Boolean).join(" · ") || "Specifications on request";
  const silk = /silk/i.test(p.materials || "") ? " silk" : "";
  const lead = p.soul && ((p.price || 0) >= 4000 || (p.tags || []).indexOf("Masterpiece") > -1);
  const teaser = lead ? '<span class="card-soul">' + esc(p.soul.split(/(?<=[.!?])\s/)[0]) + "</span>" : "";
  const remote = /^https?:/.test(p.image);
  const price = typeof p.price === "number" ? '<span class="price">' + priceText(p) + "</span>" : '<span class="price on-request">On request</span>';
  return '<a class="card reveal" href="' + rugPath(p) + '">' +
    '<div class="card-media' + silk + '">' + flag + cardImg(p, remote ? "photo" : "art", sharp) + "</div>" +
    '<div class="card-body"><h3 class="card-title">' + esc(p.title) + "</h3>" + price +
    '<span class="card-meta">' + esc(meta) + "</span>" + teaser + "</div></a>";
}
const byId = (id) => PRODUCTS.find((p) => p.id === id);
function fillCards(html) {
  return html.replace(/(<div class="product-grid"([^>]*)>)<!--cards-->[\s\S]*?<!--\/cards-->/g, (m, open, attrs) => {
    const ids = /data-ids="([^"]+)"/.exec(attrs);
    const list = ids ? ids[1].split(",").map(byId).filter(Boolean) : PRODUCTS;
    return open + "<!--cards-->" + list.map((p) => card(p, !!ids)).join("") + "<!--/cards-->";
  });
}

/* ---------- Static pages ---------- */
const PAGES = [
  {
    file: "index.html", path: "/",
    title: "Professio | Hereke & Kayseri Silk Rugs, Tabriz Wall Carpets",
    ogTitle: "Professio · Handmade Hereke & Kayseri Silk Rugs",
    description: "Handmade Hereke and Kayseri silk rugs, each knotted 10 × 10 per cm, and pictorial wall carpets from Tabriz. One of a kind, certified, shipped worldwide.",
    preload: ['<link rel="preload" as="image" href="/images/editorial/artisan-lean.jpg" media="(min-width: 761px)" fetchpriority="high">', '<link rel="preload" as="image" href="/images/editorial/artisan-reach.jpg" media="(max-width: 760px)" fetchpriority="high">'],
    jsonld: graph(ORG, WEBSITE, { "@type": "WebPage", "@id": SITE + "/#webpage", url: SITE + "/", name: "Professio | Hereke & Kayseri Silk Rugs, Tabriz Wall Carpets", isPartOf: { "@id": SITE + "/#website" }, about: { "@id": SITE + "/#org" }, inLanguage: "en" })
  },
  {
    file: "rugs/index.html", path: "/rugs/",
    title: "Hereke & Kayseri Silk Rugs, Tabriz Wall Carpets | Professio",
    description: "Shop one-of-a-kind Hereke and Kayseri silk rugs, all hand-knotted 10 × 10 per cm, and Tabriz pictorial wall carpets: medallion, runner, round and framed pieces.",
    jsonld: graph(
      { "@type": "CollectionPage", "@id": SITE + "/rugs/#webpage", url: SITE + "/rugs/", name: "Hereke & Kayseri Silk Rugs, Tabriz Wall Carpets · The Professio Collection", isPartOf: { "@id": SITE + "/#website" }, inLanguage: "en",
        mainEntity: { "@type": "ItemList", numberOfItems: PRODUCTS.length, itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: SITE + rugPath(p), name: p.title })) } },
      crumbs([["Professio", "/"], ["Rugs", "/rugs/"]]))
  },
  {
    file: "heritage/index.html", path: "/heritage/",
    title: "Hereke, Kayseri & Tabriz Rugs Explained | Professio Heritage",
    description: "A guide to hand-knotted rugs: the Turkish and Persian knots, Hereke silk, Kayseri and Anatolian weaving, Tabriz and the Persian workshops, Turkmen guls.",
    ogType: "article",
    jsonld: graph(
      { "@type": "Article", "@id": SITE + "/heritage/#article", headline: "One knot, a thousand years: Turkish, Hereke and Persian rugs explained", description: "The Turkish and Persian knots, Hereke silk, Kayseri and Anatolian weaving, Persian city workshops, Turkmen guls and the pictorial rug.", image: SITE + "/images/heritage/knot-map.jpg", author: { "@id": SITE + "/#org" }, publisher: { "@id": SITE + "/#org" }, mainEntityOfPage: SITE + "/heritage/", inLanguage: "en", dateModified: TODAY },
      crumbs([["Professio", "/"], ["Heritage & Origins", "/heritage/"]]))
  },
  {
    file: "silk-rug-guide/index.html", path: "/silk-rug-guide/",
    title: "Silk Rug Buying Guide: Real Silk, Knots & Price | Professio",
    description: "How to buy a handmade silk rug: spot real silk vs art silk, read knot density (10'luk, 15'lik), compare Hereke, Kayseri and Tabriz rugs, understand the price.",
    ogType: "article",
    jsonld: null // filled below from the page's own FAQ
  },
  {
    file: "our-story/index.html", path: "/our-story/",
    title: "Our Story: A Family House of Handmade Rugs | Professio",
    description: "Professio is a family that grew up among handmade rugs, a direct bridge between master weavers in Hereke, Kayseri and Tabriz and collectors around the world.",
    jsonld: graph({ "@type": "AboutPage", "@id": SITE + "/our-story/#webpage", url: SITE + "/our-story/", name: "Our Story · Professio", about: { "@id": SITE + "/#org" }, isPartOf: { "@id": SITE + "/#website" }, inLanguage: "en" }, crumbs([["Professio", "/"], ["Our Story", "/our-story/"]]))
  },
  {
    file: "trade/index.html", path: "/trade/",
    title: "Wholesale Turkish Rugs & Trade Programme | Professio",
    description: "Trade pricing on Hereke and Kayseri silk rugs and Tabriz wall carpets for interior designers, hotels, galleries and retailers: wholesale lots and custom rugs.",
    jsonld: null // filled below from the page's own FAQ
  },
  {
    file: "404.html", path: "/404.html",
    title: "Page Not Found | Professio", noindex: true,
    description: "This page has moved. Discover handmade Hereke and Kayseri silk rugs and Tabriz wall carpets from Professio."
  }
];

// FAQ structured data, read from the visible questions on the page itself
function faqFrom(html) {
  const qs = [];
  html.replace(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g, (m, q, a) => {
    const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");
    qs.push({ "@type": "Question", name: strip(q), acceptedAnswer: { "@type": "Answer", text: strip(a) } });
  });
  return qs.length ? { "@type": "FAQPage", mainEntity: qs } : null;
}

for (const pg of PAGES) {
  let html = read(pg.file);
  if (pg.jsonld === null) {
    const faq = faqFrom(html);
    if (pg.path === "/trade/") pg.jsonld = graph(Object.assign({ "@id": SITE + "/trade/#faq", url: SITE + "/trade/", name: pg.title }, faq), crumbs([["Professio", "/"], ["Trade & Wholesale", "/trade/"]]));
    else pg.jsonld = graph(
      { "@type": "Article", "@id": SITE + pg.path + "#article", headline: "How to buy a handmade silk rug", description: pg.description, image: SITE + "/images/collection/midnight-bloom.jpg", author: { "@id": SITE + "/#org" }, publisher: { "@id": SITE + "/#org" }, mainEntityOfPage: SITE + pg.path, inLanguage: "en", dateModified: TODAY },
      Object.assign({ "@id": SITE + pg.path + "#faq" }, faq),
      crumbs([["Professio", "/"], ["Silk Rug Buying Guide", pg.path]]));
  }
  html = setHead(html, head(pg));
  html = fillCards(html);
  write(pg.file, versioned(html));
}

/* ---------- One page per rug ---------- */
const TEMPLATE = read("tools/product-template.html");
const placardRow = (k, v, note) => "<dt>" + k + "</dt><dd>" + (v ? esc(v) : '<span class="on-request">Available on request</span>') + (note ? "<small>" + esc(note) + "</small>" : "") + "</dd>";

for (const p of PRODUCTS) {
  const url = rugPath(p);
  const gallery = [p.image].concat((p.images || []).filter((u) => u !== p.image));
  const story = p.soul || p.story || "";
  const kf = knotFacts(p);
  const facts = ["Handmade " + kindText(p) + (p.type === "Wall carpet" && p.materials ? " in " + p.materials.toLowerCase() : ""), dimsText(p), p.knots ? "knotted " + p.knots.replace(/ \(.*\)/, "") : null].filter(Boolean).join(", ");
  const description = clip(facts + ". " + (p.story || story), 158);
  const title = p.title + ": Handmade " + kind(p) + (p.dims ? ", " + p.dims[0] + "×" + p.dims[1] + " cm" : "") + " | Professio";
  const images = gallery.slice(0, 6).map(abs);
  const country = /türkiye|turkey/i.test(p.origin || "") ? "TR" : /iran/i.test(p.origin || "") ? "IR" : null;
  const props = [["Type", p.type], ["Origin", p.origin], ["Knot density", p.knots], ["Knots", kf.total ? "About " + kf.total.toLocaleString("en-US") : null]]
    .filter((x) => x[1]).map((x) => ({ "@type": "PropertyValue", name: x[0], value: x[1] }));

  const node = typeof p.price === "number"
    ? {
        "@type": "Product", "@id": SITE + url + "#product", name: p.title, description: story || p.story, image: images, sku: p.ref, url: SITE + url,
        brand: { "@type": "Brand", name: "Professio" }, category: "Home & Garden > Decor > Rugs", material: p.materials || undefined,
        size: dimsText(p) || undefined, countryOfOrigin: country ? { "@type": "Country", name: country } : undefined,
        additionalProperty: props.length ? props : undefined,
        offers: {
          "@type": "Offer", url: SITE + url, priceCurrency: "USD", price: Math.round(p.price).toString(),
          availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": SITE + "/#org" }
        }
      }
    : { "@type": "VisualArtwork", "@id": SITE + url + "#artwork", name: p.title, description: story || p.story, image: images, artform: p.type === "Wall carpet" ? "Hand-knotted pictorial wall carpet" : "Hand-knotted rug", artMedium: p.materials || undefined, url: SITE + url, creator: { "@id": SITE + "/#org" },
        locationCreated: p.origin ? { "@type": "Place", name: p.origin } : undefined };

  const pg = {
    path: url, title, description, ogType: typeof p.price === "number" ? "product" : "website",
    ogTitle: p.title + " · Handmade " + kind(p) + " · Professio",
    image: { url: abs(p.image), alt: altText(p) },
    extraMeta: typeof p.price === "number" ? ['<meta property="product:price:amount" content="' + Math.round(p.price) + '">', '<meta property="product:price:currency" content="USD">', '<meta property="product:availability" content="in stock">', '<meta property="product:brand" content="Professio">'] : [],
    preload: ['<link rel="preload" as="image" href="' + esc(p.image) + '" fetchpriority="high">'], unroll: true,
    jsonld: graph(node, crumbs([["Professio", "/"], ["Rugs", "/rugs/"], [p.title, url]]))
  };

  const info =
    '<span class="eyebrow">' + esc(p.category) + "</span><h1>" + esc(p.title) + "</h1>" +
    '<p class="pdp-sub">' + esc(p.subtitle) + '</p><div class="pdp-price">' + priceText(p) + "</div>" +
    "<p>" + esc(p.story) + "</p>" +
    '<div class="placard"><div class="placard-head"><span class="serif">' + esc(p.title) + '</span><span class="inv">' + esc(p.ref) + "</span></div><dl>" +
    placardRow("Dimensions", dimsText(p)) + placardRow("Materials", p.materials) + (p.dyes ? placardRow("Dyes", p.dyes) : "") +
    placardRow("Technique", p.technique || "Handmade") + placardRow("Knot density", p.knots, kf.note) +
    (kf.total ? "<dt>Knots</dt><dd>About " + kf.total.toLocaleString("en-US") + "<small>Each one tied by hand</small></dd>" : "") +
    placardRow("Type", p.type) + placardRow("Origin", p.origin) + placardRow("Age", p.age) +
    "</dl></div>";

  let html = TEMPLATE
    .replace('<body data-page="product">', '<body data-page="product" data-id="' + esc(p.id) + '">')
    .replace('<span id="crumbTitle"></span>', '<span id="crumbTitle">' + esc(p.title) + "</span>")
    .replace('<div class="pdp-main" id="pdpMain" title="Click to examine closely"></div>',
      '<div class="pdp-main" id="pdpMain" title="Click to examine closely"><img class="art' + (/^https?:|-photo-/.test(p.image) ? " is-photo" : "") + '" src="' + esc(p.image) + '" alt="' + esc(altText(p)) + '" fetchpriority="high" referrerpolicy="no-referrer"></div>')
    .replace('<div class="pdp-info" id="pdpInfo"></div>', '<div class="pdp-info" id="pdpInfo">' + info + "</div>")
    .replace('<section class="soul" id="soulSection" hidden>', p.soul ? '<section class="soul" id="soulSection">' : '<section class="soul" id="soulSection" hidden>')
    .replace('<p class="soul-text" id="soulText"></p>', '<p class="soul-text" id="soulText">' + esc(p.soul || "") + "</p>");
  html = setHead(html, head(pg));
  write("rugs/" + slug(p) + "/index.html", versioned(html));
}

/* ---------- Old .html addresses ---------- */
function redirect(file, target, script) {
  write(file, '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Professio</title>\n  <meta name="robots" content="noindex, follow">\n  <link rel="canonical" href="' + SITE + target + '">\n  <script>' + script + '</script>\n  <meta http-equiv="refresh" content="0; url=' + target + '">\n</head>\n<body><p><a href="' + target + '">Continue to Professio</a></p></body>\n</html>\n');
}
const keep = 'location.replace("%s" + location.search + location.hash)';
redirect("shop.html", "/rugs/", keep.replace("%s", "/rugs/"));
redirect("heritage.html", "/heritage/", keep.replace("%s", "/heritage/"));
redirect("story.html", "/our-story/", keep.replace("%s", "/our-story/"));
redirect("trade.html", "/trade/", keep.replace("%s", "/trade/"));
const map = {}; PRODUCTS.forEach((p) => { map[p.id] = slug(p); });
// rug addresses from before origins were added to them, e.g. /rugs/midnight-bloom-silk-rug/
for (const p of PRODUCTS) {
  const old = slug(p, true);
  if (old !== slug(p)) redirect("rugs/" + old + "/index.html", rugPath(p), keep.replace("%s", rugPath(p)));
}
redirect("product.html", "/rugs/", "var m=" + JSON.stringify(map) + ',i=new URLSearchParams(location.search).get("id");location.replace(m[i]?"/rugs/"+m[i]+"/":"/rugs/")');

/* ---------- Sitemap & robots ---------- */
const entries = [
  ["/", "1.0", "weekly"], ["/rugs/", "0.9", "weekly"], ["/silk-rug-guide/", "0.8", "monthly"], ["/heritage/", "0.8", "monthly"],
  ["/trade/", "0.7", "monthly"], ["/our-story/", "0.6", "monthly"]
].map(([u, pr, ch]) => "  <url><loc>" + SITE + u + "</loc><lastmod>" + TODAY + "</lastmod><changefreq>" + ch + "</changefreq><priority>" + pr + "</priority></url>");
for (const p of PRODUCTS) {
  const imgs = [p.image].concat((p.images || []).filter((u) => u !== p.image)).slice(0, 5)
    .map((u) => "<image:image><image:loc>" + esc(abs(u)) + "</image:loc></image:image>").join("");
  entries.push("  <url><loc>" + SITE + rugPath(p) + "</loc><lastmod>" + TODAY + "</lastmod><changefreq>monthly</changefreq><priority>" + (typeof p.price === "number" ? "0.8" : "0.6") + "</priority>" + imgs + "</url>");
}
write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' + entries.join("\n") + "\n</urlset>\n");
write("robots.txt", "User-agent: *\nAllow: /\nDisallow: /tools/\n\nSitemap: " + SITE + "/sitemap.xml\n");
write("site.webmanifest", JSON.stringify({
  name: "Professio · Handmade Silk Rugs", short_name: "Professio", start_url: "/", display: "browser",
  background_color: "#F5EFE4", theme_color: "#241914",
  icons: [{ src: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/images/brand/icon-512.png", sizes: "512x512", type: "image/png" }]
}, null, 2) + "\n");

console.log("Built " + PAGES.length + " pages, " + PRODUCTS.length + " rug pages, sitemap with " + entries.length + " URLs.");
