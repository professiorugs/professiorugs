/* ==========================================================================
   PROFESSIO — site behaviour (no dependencies)
   ========================================================================== */
(function () {
  "use strict";

  var PRODUCTS = window.PROFESSIO_PRODUCTS || [];
  var page = document.body.getAttribute("data-page") || "";
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  /* ---------- Formatting ---------- */
  function cmToIn(cm) { return Math.round(cm / 2.54); }
  function cmToFt(cm) { var i = Math.round(cm / 2.54); return Math.floor(i / 12) + "′" + (i % 12) + "″"; }
  function dimsText(p, unit) {
    if (!p.dims) return null;
    if (unit === "in") return cmToFt(p.dims[0]) + " × " + cmToFt(p.dims[1]);
    return p.dims[0] + " × " + p.dims[1] + " cm";
  }
  function area(p) { return p.dims ? (p.dims[0] * p.dims[1]) / 10000 : null; }
  function sizeClass(p) {
    var a = area(p);
    if (a == null) return "Unconfirmed";
    if (a < 1) return "Cabinet (under 1 m²)";
    if (a <= 2) return "Salon (1–2 m²)";
    return "Grand (over 2 m²)";
  }
  function priceText(p) {
    return typeof p.price === "number"
      ? "$" + Math.round(p.price).toLocaleString("en-US")
      : "Price upon request";
  }
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }

  /* ---------- Collection (saved pieces) ---------- */
  var KEY = "professio.collection";
  function readCollection() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function writeCollection(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} renderDrawer(); updateCount(); }
  function addToCollection(id) {
    var list = readCollection();
    if (list.indexOf(id) === -1) list.push(id);
    writeCollection(list);
  }
  function removeFromCollection(id) { writeCollection(readCollection().filter(function (x) { return x !== id; })); }

  /* ---------- Layout: header, footer, drawer ---------- */
  var NAV = [
    ["shop.html", "Collection", "shop"],
    ["heritage.html", "Heritage & Origins", "heritage"],
    ["story.html", "Our Story", "story"]
  ];
  function header() {
    var left = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (page === n[2] ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
    }).join("");
    return '' +
      '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="site-header" id="siteHeader"><div class="header-inner">' +
        '<nav class="nav nav--left" aria-label="Primary">' +
          '<button class="menu-toggle" id="menuToggle" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>' + left +
        "</nav>" +
        '<a href="index.html" class="logo" aria-label="Professio, home"></a>' +
        '<nav class="nav nav--right" aria-label="Account">' +
          '<a class="hide-m" href="trade.html"' + (page === "trade" ? ' aria-current="page"' : "") + ">Trade Portal</a>" +
          '<button id="openDrawer" aria-label="Open your collection">Collection<span class="bag-count" id="bagCount"></span></button>' +
        "</nav>" +
      "</div>" +
      '<span class="thread-progress" id="threadProgress" aria-hidden="true"></span>' +
      "</header>" +
      '<div class="mobile-menu" id="mobileMenu">' +
        '<a href="index.html">Home</a>' +
        NAV.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + "</a>"; }).join("") +
        '<a href="trade.html">Trade &amp; Commissions</a>' +
        '<p class="small">A family house of handmade rugs<br>Worldwide delivery · Trade enquiries welcome</p>' +
      "</div>";
  }
  function footer() {
    return '' +
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-top">' +
          "<div>" +
            '<span class="eyebrow">Correspondence</span>' +
            '<p class="lede" style="max-width:420px">Private viewings, new arrivals and stories from the loom, a few times a year.</p>' +
            '<form class="newsletter" data-form="newsletter"><label class="sr-only" for="nl">Email</label><input id="nl" type="email" required placeholder="Your email address"><button type="submit">Subscribe</button></form>' +
          "</div>" +
          '<div><h5>The House</h5><ul><li><a href="story.html">Our Story</a></li><li><a href="heritage.html">Heritage &amp; Origins</a></li><li><a href="story.html#certificate">Certificate of Authenticity</a></li></ul></div>' +
          '<div><h5>Collection</h5><ul><li><a href="shop.html">All Pieces</a></li><li><a href="shop.html?category=Cappadocia%20Silk">Cappadocia Silk</a></li><li><a href="shop.html?category=Persian%20Miniature">Persian Miniature</a></li><li><a href="shop.html?category=Salon%20%26%20Court">Salon &amp; Court</a></li><li><a href="shop.html?category=Landscape">Landscape</a></li></ul></div>' +
          '<div><h5>Trade</h5><ul><li><a href="trade.html">Trade Portal</a></li><li><a href="trade.html?type=commission">Custom Commissions</a></li><li><a href="trade.html?type=acquire">Private Acquisition</a></li><li><a href="mailto:info@professiorugs.com">info@professiorugs.com</a></li></ul></div>' +
        "</div>" +
        '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' Professio. Handmade rugs, family owned.</span><span>www.professiorugs.com</span></div>' +
      "</div></footer>" +
      '<div class="drawer-backdrop" id="drawerBackdrop"></div>' +
      '<aside class="drawer" id="drawer" aria-label="Your collection" aria-hidden="true">' +
        '<div class="drawer-head"><h3>Your Collection</h3><button class="drawer-close" id="closeDrawer">Close</button></div>' +
        '<div class="drawer-body" id="drawerBody"></div>' +
        '<div class="drawer-foot" id="drawerFoot"></div>' +
      "</aside>" +
      '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
  }

  function renderDrawer() {
    var body = $("#drawerBody"), foot = $("#drawerFoot");
    if (!body) return;
    var items = readCollection().map(byId).filter(Boolean);
    if (!items.length) {
      body.innerHTML = '<div class="drawer-empty"><p class="lede">Your collection is empty.</p><a class="link-arrow" href="shop.html">Discover the pieces</a></div>';
      foot.innerHTML = "";
      return;
    }
    body.innerHTML = items.map(function (p) {
      return '<div class="drawer-item">' +
        '<a class="thumb" href="product.html?id=' + p.id + '"><img src="' + p.image + '" alt="" referrerpolicy="no-referrer"></a>' +
        '<div><h4>' + esc(p.title) + '</h4><div class="small">' + esc(p.ref) + (p.dims ? " · " + dimsText(p) : "") + '</div><button data-remove="' + p.id + '">Remove</button></div>' +
        '<div class="price">' + (typeof p.price === "number" ? priceText(p) : "") + "</div>" +
      "</div>";
    }).join("");
    foot.innerHTML =
      '<div class="drawer-total"><span>' + items.length + (items.length === 1 ? " piece" : " pieces") + "</span>" +
        (items.every(function (p) { return typeof p.price === "number"; })
          ? "<span>$" + Math.round(items.reduce(function (t, p) { return t + p.price; }, 0)).toLocaleString("en-US") + "</span>"
          : '<span class="on-request">Price upon request</span>') + "</div>" +
      '<a class="btn btn--solid btn--block" href="trade.html?type=acquire&pieces=' + encodeURIComponent(items.map(function (p) { return p.id; }).join(",")) + '">Request Private Acquisition</a>' +
      '<p class="small" style="margin:0;text-align:center">A member of the family will reply within one business day with pricing, provenance and delivery.</p>';
    $$("[data-remove]", body).forEach(function (b) {
      b.addEventListener("click", function () { removeFromCollection(b.getAttribute("data-remove")); });
    });
  }
  function updateCount() {
    var c = $("#bagCount"); if (!c) return;
    var n = readCollection().length; c.textContent = n ? "(" + n + ")" : "";
  }
  function openDrawer() { document.body.classList.add("drawer-open"); $("#drawer").setAttribute("aria-hidden", "false"); }
  function closeDrawer() { document.body.classList.remove("drawer-open"); $("#drawer").setAttribute("aria-hidden", "true"); }
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  function initLayout() {
    document.body.insertAdjacentHTML("afterbegin", header());
    document.body.insertAdjacentHTML("beforeend", footer());
    var h = $("#siteHeader");
    if (document.body.classList.contains("has-hero")) h.classList.add("is-over-hero");
    var thread = $("#threadProgress");
    var onScroll = function () {
      h.classList.toggle("is-scrolled", window.scrollY > 40);
      var max = document.documentElement.scrollHeight - window.innerHeight;
      thread.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    $("#menuToggle").addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      this.setAttribute("aria-expanded", open);
      h.classList.toggle("is-scrolled", open || window.scrollY > 40);
    });
    $("#openDrawer").addEventListener("click", openDrawer);
    $("#closeDrawer").addEventListener("click", closeDrawer);
    $("#drawerBackdrop").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
    renderDrawer(); updateCount();
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $$(".reveal");
    $$(".product-grid, .pillars, .materials, .hereke-facts").forEach(function (g) {
      $$(".reveal", g).forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 120 + "ms"; });
    });
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Cards ---------- */
  function card(p) {
    var flag = p.tags && p.tags[0] ? '<span class="card-flag">' + esc(p.tags[0]) + "</span>" : "";
    var meta = [p.materials, p.dims ? dimsText(p) : null].filter(Boolean).join(" · ") || "Specifications on request";
    var silk = /silk/i.test(p.materials || "") ? " silk" : "";
    var lead = p.soul && ((p.price || 0) >= 4000 || (p.tags || []).indexOf("Masterpiece") > -1);
    var teaser = lead ? '<span class="card-soul">' + esc(p.soul.split(/(?<=[.!?])\s/)[0]) + "</span>" : "";
    var remote = /^https?:/.test(p.image);
    var price = typeof p.price === "number" ? '<span class="price">' + priceText(p) + "</span>" : '<span class="price on-request">On request</span>';
    return '<a class="card reveal" href="product.html?id=' + p.id + '">' +
      '<div class="card-media' + silk + '">' + flag + '<img class="' + (remote ? "photo" : "art") + '" src="' + p.image + '" alt="' + esc(p.title) + '" loading="lazy" referrerpolicy="no-referrer"></div>' +
      '<div class="card-body"><h3 class="card-title">' + esc(p.title) + "</h3>" + price +
      '<span class="card-meta">' + esc(meta) + "</span>" + teaser + "</div></a>";
  }

  function initFeatured() {
    $$("[data-ids]").forEach(function (el) {
      var ids = (el.getAttribute("data-ids") || "").split(",");
      el.innerHTML = ids.map(byId).filter(Boolean).map(card).join("");
    });
  }

  /* ---------- Shop ---------- */
  function initShop() {
    var grid = $("#productGrid"); if (!grid) return;
    var groups = {
      category: { label: "Category", get: function (p) { return [p.category]; } },
      materials: { label: "Material", get: function (p) { return [p.materials || "To be confirmed"]; } },
      size: { label: "Size", get: function (p) { return [sizeClass(p)]; } },
      shape: { label: "Shape", get: function (p) { return [p.shape || "Rectangle"]; } },
      tags: { label: "Edit", get: function (p) { return p.tags || []; } }
    };
    var state = { category: [], materials: [], size: [], shape: [], tags: [] };
    var params = new URLSearchParams(location.search);
    Object.keys(state).forEach(function (k) { if (params.get(k)) state[k] = params.get(k).split("|"); });
    var sort = "featured";

    var bar = $("#filterGroups");
    bar.innerHTML = Object.keys(groups).map(function (k) {
      var vals = {};
      PRODUCTS.forEach(function (p) { groups[k].get(p).forEach(function (v) { vals[v] = (vals[v] || 0) + 1; }); });
      var opts = Object.keys(vals).sort().map(function (v) {
        return '<label class="check"><input type="checkbox" data-group="' + k + '" value="' + esc(v) + '"' + (state[k].indexOf(v) > -1 ? " checked" : "") + "> " + esc(v) + ' <span class="small">(' + vals[v] + ")</span></label>";
      }).join("");
      return '<div class="filter-group" data-g="' + k + '"><button class="filter-btn" aria-expanded="false">' + groups[k].label + ' <span class="count"></span></button><div class="filter-panel">' + opts + "</div></div>";
    }).join("");

    $$(".filter-group", bar).forEach(function (g) {
      var btn = $(".filter-btn", g);
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = !g.classList.contains("open");
        $$(".filter-group.open").forEach(function (o) { o.classList.remove("open"); $(".filter-btn", o).setAttribute("aria-expanded", "false"); });
        g.classList.toggle("open", open); btn.setAttribute("aria-expanded", open);
      });
      $(".filter-panel", g).addEventListener("click", function (e) { e.stopPropagation(); });
    });
    document.addEventListener("click", function () { $$(".filter-group.open").forEach(function (o) { o.classList.remove("open"); }); });

    bar.addEventListener("change", function (e) {
      var i = e.target; if (!i.dataset.group) return;
      var arr = state[i.dataset.group];
      if (i.checked) arr.push(i.value); else arr.splice(arr.indexOf(i.value), 1);
      render();
    });
    $("#sortSelect").addEventListener("change", function () { sort = this.value; render(); });

    function render() {
      var list = PRODUCTS.filter(function (p) {
        return Object.keys(state).every(function (k) {
          if (!state[k].length) return true;
          var vals = groups[k].get(p);
          return state[k].some(function (v) { return vals.indexOf(v) > -1; });
        });
      });
      if (sort === "size-desc") list = list.slice().sort(function (a, b) { return (area(b) || 0) - (area(a) || 0); });
      if (sort === "size-asc") list = list.slice().sort(function (a, b) { return (area(a) || 99) - (area(b) || 99); });
      if (sort === "price-desc") list = list.slice().sort(function (a, b) { return (b.price || 0) - (a.price || 0); });
      if (sort === "price-asc") list = list.slice().sort(function (a, b) { return (a.price || 1e9) - (b.price || 1e9); });
      if (sort === "title") list = list.slice().sort(function (a, b) { return a.title.localeCompare(b.title); });

      grid.innerHTML = list.length ? list.map(card).join("") :
        '<div class="empty-state"><p class="lede">No pieces match this selection.</p><button class="link-arrow" id="clearAll">Clear filters</button></div>';
      $("#resultsCount").textContent = list.length + (list.length === 1 ? " piece" : " pieces");

      Object.keys(groups).forEach(function (k) {
        var c = $('.filter-group[data-g="' + k + '"] .count');
        c.textContent = state[k].length ? "(" + state[k].length + ")" : "";
      });
      var chips = [];
      Object.keys(state).forEach(function (k) { state[k].forEach(function (v) { chips.push('<span class="chip">' + esc(v) + '<button aria-label="Remove ' + esc(v) + '" data-k="' + k + '" data-v="' + esc(v) + '">×</button></span>'); }); });
      if (chips.length) chips.push('<button class="chip" id="clearChips">Clear all</button>');
      $("#activeFilters").innerHTML = chips.join("");
      $$("#activeFilters [data-k]").forEach(function (b) {
        b.addEventListener("click", function () {
          var k = b.dataset.k; state[k].splice(state[k].indexOf(b.dataset.v), 1);
          var cb = $('input[data-group="' + k + '"][value="' + CSS.escape(b.dataset.v) + '"]'); if (cb) cb.checked = false;
          render();
        });
      });
      var clear = function () { Object.keys(state).forEach(function (k) { state[k] = []; }); $$("input[data-group]").forEach(function (i) { i.checked = false; }); render(); };
      if ($("#clearChips")) $("#clearChips").addEventListener("click", clear);
      if ($("#clearAll")) $("#clearAll").addEventListener("click", clear);

      var q = new URLSearchParams();
      Object.keys(state).forEach(function (k) { if (state[k].length) q.set(k, state[k].join("|")); });
      history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : ""));
      initReveal();
    }
    render();
  }

  /* ---------- Product page ---------- */
  var MATERIALS = {
    wool: {
      name: "Highland Wool", origin: "Anatolian & Persian plateaus",
      img: "images/editorial/artisan-reach.jpg", focus: "50% 20%",
      text: "Spring-shorn from sheep grazing above a thousand metres, where cold nights grow a long, lanolin-rich fibre. Hand-spun, it takes dye deeply and wears for generations, softening with every year underfoot."
    },
    silk: {
      name: "Pure Silk", origin: "Hand-reeled filament",
      img: "images/editorial/artisan-rolls.jpg", focus: "60% 40%",
      text: "The finest thread a weaver can hold. Silk allows knots so small that a face, a petal or a fold of satin can be drawn with a painter's precision, and it carries a lustre that changes as you move around the piece."
    },
    dye: {
      name: "The Dyer's Palette", origin: "Colour graded by hand",
      img: "images/editorial/artisan-lean.jpg", focus: "70% 40%",
      text: "Pictorial work demands hundreds of shades, each matched by eye in small dye lots. Madder reds, indigo blues and saffron golds sit alongside gradations so fine they read as brushstrokes."
    }
  };
  function placardRow(label, value, note) {
    return "<dt>" + label + "</dt><dd>" + (value ? esc(value) : '<span class="on-request">Available on request</span>') + (note ? "<small>" + note + "</small>" : "") + "</dd>";
  }
  function initProduct() {
    var root = $("#pdp"); if (!root) return;
    var id = new URLSearchParams(location.search).get("id");
    var p = byId(id) || PRODUCTS[0];
    document.title = p.title + " · Professio";
    $("#crumbTitle").textContent = p.title;

    var unit = "cm";
    try { unit = localStorage.getItem("professio.unit") || "cm"; } catch (e) {}

    function dimsCell() {
      if (!p.dims) return placardRow("Dimensions", null);
      var alt = unit === "cm" ? dimsText(p, "in") : dimsText(p, "cm");
      return "<dt>Dimensions" +
        '<span class="unit-toggle" role="group" aria-label="Units"><button data-unit="cm" aria-pressed="' + (unit === "cm") + '">CM</button><button data-unit="in" aria-pressed="' + (unit === "in") + '">FT</button></span></dt>' +
        "<dd>" + dimsText(p, unit) + "<small>" + alt + " · " + area(p).toFixed(2) + " m²</small></dd>";
    }

    function renderInfo() {
      $("#pdpInfo").innerHTML =
        '<span class="eyebrow">' + esc(p.category) + "</span>" +
        "<h1>" + esc(p.title) + "</h1>" +
        '<p class="pdp-sub">' + esc(p.subtitle) + "</p>" +
        '<div class="pdp-price">' + priceText(p) + "</div>" +
        '<p class="small">' + (p.etsy ? "Each piece is unique. Insured worldwide shipping from Türkiye is included." : "Each piece is unique. Pricing, provenance and delivery are shared privately within one business day.") + "</p>" +
        '<div class="pdp-actions">' +
          (p.etsy
            ? '<a class="btn btn--solid" href="' + p.etsy + '" target="_blank" rel="noopener">Acquire Piece</a>'
            : '<a class="btn btn--solid" href="trade.html?type=acquire&pieces=' + p.id + '">Acquire Piece</a>') +
          '<button class="btn" id="addBtn">Add to Collection</button>' +
          '<a class="link-arrow" style="justify-self:start;margin-top:10px" href="trade.html?type=trade&pieces=' + p.id + '">Inquire for Trade</a>' +
        "</div>" +
        (p.etsy ? '<p class="small" style="margin-top:-4px">Secure checkout through the Professio atelier on Etsy. Prefer to buy directly? <a href="trade.html?type=acquire&pieces=' + p.id + '" style="text-decoration:underline">Request a private acquisition</a>.</p>' : "") +
        '<div class="placard">' +
          '<div class="placard-head"><span class="serif">' + esc(p.title) + '</span><span class="inv">' + esc(p.ref) + "</span></div>" +
          "<dl>" +
            dimsCell() +
            placardRow("Materials", p.materials) +
            (p.dyes ? placardRow("Dyes", p.dyes) : "") +
            placardRow("Technique", p.technique || "Handmade", p.technique ? null : "Certified handmade by Professio") +
            placardRow("Age", p.age) +
            placardRow("Knot density", p.knots) +
            placardRow("Origin", p.origin) +
          "</dl>" +
        "</div>" +
        '<div class="accordion">' +
          acc("The Piece", "<p>" + esc(p.story) + "</p>", true) +
          acc("Certificate of Authenticity", "<p>Every Professio rug is accompanied by a signed certificate affirming that it is handmade, issued in the name of its new custodian.</p>") +
          acc("Care & Display", "<p>Hang or lay away from direct sunlight. Vacuum gently without a beater bar, rotate yearly, and entrust deep cleaning only to a specialist in hand-knotted textiles. Framed pieces are supplied ready to hang.</p>") +
          acc("Delivery & Trade", "<p>Insured worldwide delivery, rolled or framed. Interior designers, galleries and hospitality buyers receive trade terms through our <a href=\"trade.html\" style=\"text-decoration:underline\">Trade Portal</a>.</p>") +
        "</div>" +
        '<div class="pdp-assure"><span>Certified handmade, signed by the family</span><span>Insured worldwide delivery</span><span>Private viewing by video on request</span></div>';

      $$("[data-unit]").forEach(function (b) {
        b.addEventListener("click", function () {
          unit = b.dataset.unit; try { localStorage.setItem("professio.unit", unit); } catch (e) {}
          renderInfo();
        });
      });
      $("#addBtn").addEventListener("click", function () { addToCollection(p.id); toast("Added to your collection"); openDrawer(); });
      initAccordions();
    }
    function acc(title, html, open) {
      return '<div class="acc-item' + (open ? " open" : "") + '"><button class="acc-btn" aria-expanded="' + !!open + '">' + title + '</button><div class="acc-panel"><div>' + html + "</div></div></div>";
    }
    renderInfo();

    if (p.soul && $("#soulSection")) { $("#soulText").textContent = p.soul; $("#soulSection").hidden = false; }
    var main = $("#pdpMain");
    if (/silk/i.test(p.materials || "")) main.classList.add("silk");
    var gallery = [p.image].concat((p.images || []).filter(function (u) { return u !== p.image; }));
    function show(src) {
      main.classList.remove("zoomed");
      main.innerHTML = '<img class="art' + (/^https?:/.test(src) ? " is-photo" : "") + '" src="' + src + '" alt="' + esc(p.title) + ', handmade rug" referrerpolicy="no-referrer">';
    }
    show(gallery[0]);
    if (gallery.length > 1) {
      var th = document.createElement("div"); th.className = "pdp-thumbs";
      th.innerHTML = gallery.slice(0, 8).map(function (src, i) {
        return '<button aria-label="View image ' + (i + 1) + '" aria-pressed="' + (i === 0) + '" data-src="' + src + '"><img src="' + src + '" alt="" loading="lazy" referrerpolicy="no-referrer"></button>';
      }).join("");
      main.parentNode.insertBefore(th, main.nextSibling);
      $$("button", th).forEach(function (b) {
        b.addEventListener("click", function () {
          $$("button", th).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
          b.setAttribute("aria-pressed", "true"); show(b.dataset.src);
        });
      });
    }
    main.addEventListener("click", function (e) {
      var img = $("img", main);
      if (!main.classList.contains("zoomed")) {
        var r = img.getBoundingClientRect();
        img.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + "% " + ((e.clientY - r.top) / r.height * 100) + "%";
      }
      main.classList.toggle("zoomed");
    });
    main.addEventListener("mousemove", function (e) {
      if (!main.classList.contains("zoomed")) return;
      var img = $("img", main), r = img.getBoundingClientRect();
      var ox = Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100));
      var oy = Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100));
      img.style.transformOrigin = ox + "% " + oy + "%";
    });

    // Materials
    var keys = p.materials === "Pure Silk" ? ["silk", "dye"] : ["wool", "silk", "dye"];
    $("#materials").innerHTML = keys.map(function (k) {
      var m = MATERIALS[k];
      return '<div class="material reveal"><div class="frame"><div class="media" style="--focus:' + m.focus + '"><img src="' + m.img + '" alt="" loading="lazy"></div></div>' +
        '<span class="origin">' + m.origin + "</span><h3>" + m.name + "</h3><p>" + m.text + "</p></div>";
    }).join("");
    if (keys.length === 2) $("#materials").style.gridTemplateColumns = "1fr 1fr";

    // Related
    var rel = PRODUCTS.filter(function (x) { return x.id !== p.id && x.category === p.category; });
    if (rel.length < 3) rel = rel.concat(PRODUCTS.filter(function (x) { return x.id !== p.id && rel.indexOf(x) === -1; }));
    $("#related").innerHTML = rel.slice(0, 3).map(card).join("");
  }

  /* ---------- Accordions ---------- */
  function initAccordions() {
    $$(".acc-btn").forEach(function (b) {
      if (b._bound) return; b._bound = true;
      b.addEventListener("click", function () {
        var it = b.parentNode; var open = it.classList.toggle("open"); b.setAttribute("aria-expanded", open);
      });
    });
  }

  /* ---------- Heritage: zoomable texture maps ---------- */
  function knotDiagram(type) {
    // Warp threads (vertical) with knots tied around pairs. Pure SVG: stays sharp at any zoom.
    var W = 1600, H = 900, s = "";
    var warpGap = 64, x0 = 160, pairs = 10, rows = 4, rowGap = 170, y0 = 160;
    s += '<rect width="' + W + '" height="' + H + '" fill="#1E1612"/>';
    s += '<defs><linearGradient id="wf" x1="0" x2="1"><stop offset="0" stop-color="#cdbb9c"/><stop offset=".5" stop-color="#f1e6d1"/><stop offset="1" stop-color="#b9a585"/></linearGradient>' +
         '<linearGradient id="kn" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#a8352f"/><stop offset="1" stop-color="#5e1a17"/></linearGradient>' +
         '<linearGradient id="kn2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3b4f7d"/><stop offset="1" stop-color="#1a2440"/></linearGradient></defs>';
    var n = pairs * 2;
    for (var i = 0; i < n; i++) {
      var x = x0 + i * warpGap;
      s += '<rect x="' + (x - 7) + '" y="60" width="14" height="' + (H - 120) + '" rx="7" fill="url(#wf)" opacity=".95"/>';
    }
    for (var r = 0; r < rows; r++) {
      var y = y0 + r * rowGap;
      // weft passes
      s += '<path d="M' + (x0 - 60) + " " + (y + 70) + " C " + (x0 + 300) + " " + (y + 60) + ", " + (x0 + 900) + " " + (y + 80) + ", " + (x0 + n * warpGap) + " " + (y + 70) + '" stroke="#8C6A45" stroke-width="10" fill="none" opacity=".9"/>';
      s += '<path d="M' + (x0 - 60) + " " + (y + 92) + " C " + (x0 + 400) + " " + (y + 102) + ", " + (x0 + 800) + " " + (y + 84) + ", " + (x0 + n * warpGap) + " " + (y + 92) + '" stroke="#8C6A45" stroke-width="10" fill="none" opacity=".9"/>';
      for (var k = 0; k < pairs; k++) {
        var a = x0 + k * 2 * warpGap, b = a + warpGap, g = (k + r) % 3 === 0 ? "url(#kn2)" : "url(#kn)";
        if (type === "sym") {
          // Turkish / Ghiordes: yarn wraps both warps, both ends emerge between them
          s += '<path d="M' + (a + 18) + " " + (y - 30) + " Q " + (a - 26) + " " + (y + 4) + " " + (a + 6) + " " + (y + 24) + " L " + (b - 6) + " " + (y + 24) + " Q " + (b + 26) + " " + (y + 4) + " " + (b - 18) + " " + (y - 30) + '" stroke="' + g + '" stroke-width="16" fill="none" stroke-linecap="round"/>';
          s += '<path d="M' + (a + 18) + " " + (y - 30) + " L " + (a + 26) + " " + (y - 70) + " M " + (b - 18) + " " + (y - 30) + " L " + (b - 26) + " " + (y - 70) + '" stroke="' + g + '" stroke-width="14" stroke-linecap="round"/>';
        } else {
          // Persian / Senneh: yarn wraps one warp fully, passes under the other; one end each side
          s += '<path d="M' + (a - 26) + " " + (y - 70) + " L " + (a - 22) + " " + (y - 20) + " Q " + (a - 14) + " " + (y + 24) + " " + (a + 14) + " " + (y + 18) + " L " + (b - 10) + " " + (y + 24) + " Q " + (b + 26) + " " + (y + 10) + " " + (b + 8) + " " + (y - 18) + " Q " + (b - 10) + " " + (y - 34) + " " + (b - 22) + " " + (y - 30) + '" stroke="' + g + '" stroke-width="16" fill="none" stroke-linecap="round"/>';
          s += '<path d="M' + (b - 22) + " " + (y - 30) + " L " + (b - 30) + " " + (y - 70) + '" stroke="' + g + '" stroke-width="14" stroke-linecap="round"/>';
        }
      }
    }
    s += '<text x="' + (W - 60) + '" y="46" text-anchor="end" font-family="Jost, sans-serif" font-size="22" letter-spacing="5" fill="#C9B595">' + (type === "sym" ? "SYMMETRICAL · TURKISH · GHIORDES" : "ASYMMETRICAL · PERSIAN · SENNEH") + "</text>";
    s += '<text x="60" y="46" font-family="Jost, sans-serif" font-size="18" letter-spacing="4" fill="#84705F">WARP ↕   WEFT ↔   PILE ↑</text>';
    return '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + s + "</svg>";
  }

  function initZoomer() {
    var z = $("#zoomer"); if (!z) return;
    var stage = $(".zoomer-stage", z), level = $(".zoomer-level", z);
    var scale = 1, tx = 0, ty = 0, MAX = 8;
    var maps = {
      pile: '<img src="images/heritage/knot-map.jpg" alt="Pile face of a silk pictorial rug, each knot visible" style="width:100%;height:100%;object-fit:cover" draggable="false">',
      sym: knotDiagram("sym"),
      asym: knotDiagram("asym")
    };
    function apply() {
      var w = z.clientWidth, h = z.clientHeight;
      tx = Math.min(0, Math.max(w - w * scale, tx));
      ty = Math.min(0, Math.max(h - h * scale, ty));
      stage.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
      level.textContent = scale.toFixed(1) + "× magnification";
    }
    function zoomAt(f, cx, cy) {
      var ns = Math.max(1, Math.min(MAX, scale * f));
      tx = cx - (cx - tx) * (ns / scale); ty = cy - (cy - ty) * (ns / scale); scale = ns; apply();
    }
    function load(k) { stage.innerHTML = maps[k]; scale = 1; tx = ty = 0; apply(); }
    $$(".tex-tabs button").forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".tex-tabs button").forEach(function (x) { x.setAttribute("aria-selected", "false"); });
        b.setAttribute("aria-selected", "true"); load(b.dataset.map);
        $$("[data-note]").forEach(function (n) { n.hidden = n.dataset.note !== b.dataset.map; });
      });
    });
    z.addEventListener("wheel", function (e) {
      e.preventDefault(); var r = z.getBoundingClientRect();
      zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });
    var drag = null, pts = {}, pinch = null;
    z.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".zoomer-ui")) return;
      z.setPointerCapture(e.pointerId); pts[e.pointerId] = e;
      var ids = Object.keys(pts);
      if (ids.length === 2) { var a = pts[ids[0]], b = pts[ids[1]]; pinch = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); drag = null; }
      else { drag = { x: e.clientX - tx, y: e.clientY - ty }; z.classList.add("dragging"); }
    });
    z.addEventListener("pointermove", function (e) {
      if (!pts[e.pointerId]) return; pts[e.pointerId] = e;
      var ids = Object.keys(pts);
      if (ids.length === 2 && pinch) {
        var a = pts[ids[0]], b = pts[ids[1]], d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), r = z.getBoundingClientRect();
        zoomAt(d / pinch, (a.clientX + b.clientX) / 2 - r.left, (a.clientY + b.clientY) / 2 - r.top); pinch = d;
      } else if (drag) { tx = e.clientX - drag.x; ty = e.clientY - drag.y; apply(); }
    });
    var end = function (e) { delete pts[e.pointerId]; pinch = null; drag = null; z.classList.remove("dragging"); };
    z.addEventListener("pointerup", end); z.addEventListener("pointercancel", end);
    z.addEventListener("dblclick", function (e) { var r = z.getBoundingClientRect(); zoomAt(2, e.clientX - r.left, e.clientY - r.top); });
    $("[data-zoom=in]", z).addEventListener("click", function () { zoomAt(1.5, z.clientWidth / 2, z.clientHeight / 2); });
    $("[data-zoom=out]", z).addEventListener("click", function () { zoomAt(1 / 1.5, z.clientWidth / 2, z.clientHeight / 2); });
    $("[data-zoom=reset]", z).addEventListener("click", function () { scale = 1; tx = ty = 0; apply(); });
    window.addEventListener("resize", apply);
    load("pile");
  }

  /* ---------- Films: click-to-load embeds ---------- */
  function initFilms() {
    $$(".film").forEach(function (f) {
      var btn = $("button.play", f); if (!btn) return;
      btn.addEventListener("click", function () {
        var yt = f.dataset.youtube, vm = f.dataset.vimeo, src = null;
        if (yt) src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(yt) + "?autoplay=1&rel=0&modestbranding=1";
        if (vm) src = "https://player.vimeo.com/video/" + encodeURIComponent(vm) + "?autoplay=1&dnt=1";
        if (!src) { toast("Film premiering soon"); return; }
        f.insertAdjacentHTML("beforeend", '<iframe src="' + src + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(f.dataset.title || "Film") + '"></iframe>');
      });
    });
  }

  /* ---------- Chapter nav (heritage) ---------- */
  function initChapters() {
    var links = $$(".chapter-nav a"); if (!links.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (l) { var t = $(l.getAttribute("href")); if (t) io.observe(t); });
  }

  /* ---------- Forms ---------- */
  function initForms() {
    var params = new URLSearchParams(location.search);
    var type = params.get("type");
    if (type) { var r = $('input[name="inquiry_type"][value="' + type + '"]'); if (r) r.checked = true; }
    var pieces = (params.get("pieces") || "").split(",").map(byId).filter(Boolean);
    var pf = $("#piecesField");
    if (pf && pieces.length) pf.value = pieces.map(function (p) { return p.title + " (" + p.ref + ")"; }).join("; ");
    if (!pieces.length && type === "acquire") {
      var saved = readCollection().map(byId).filter(Boolean);
      if (pf && saved.length) pf.value = saved.map(function (p) { return p.title + " (" + p.ref + ")"; }).join("; ");
    }
    syncType();
    $$('input[name="inquiry_type"]').forEach(function (r) { r.addEventListener("change", syncType); });
    function syncType() {
      var v = ($('input[name="inquiry_type"]:checked') || {}).value;
      $$("[data-show]").forEach(function (el) { el.hidden = el.dataset.show.split(" ").indexOf(v) === -1; });
    }

    $$("form[data-form]").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        var action = f.getAttribute("action") || "";
        if (f.dataset.form === "newsletter" || !/^https?:/.test(action) || action.indexOf("YOUR_FORM_ID") > -1) {
          // No endpoint configured yet: confirm locally (see README to connect Formspree).
          e.preventDefault();
          if (f.dataset.form === "newsletter") { f.reset(); toast("Thank you. You are on the list."); return; }
          showSuccess(f);
          return;
        }
        e.preventDefault();
        fetch(action, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw 0; showSuccess(f); })
          .catch(function () { toast("Something went wrong. Please write to info@professiorugs.com"); });
      });
    });
    function showSuccess(f) {
      f.hidden = true; var s = $("#formSuccess"); if (s) { s.classList.add("show"); s.scrollIntoView({ behavior: "smooth", block: "center" }); }
      if (($('input[name="inquiry_type"]:checked') || {}).value === "acquire") writeCollection([]);
    }
  }

  /* ---------- Hero crossfade ---------- */
  function initHeroSlides() {
    var box = $(".hero-slides"); if (!box) return;
    var slides = $$(".slide", box); if (slides.length < 2) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var i = 0, every = +box.dataset.interval || 7000;
    setInterval(function () {
      if (document.hidden) return;
      slides[i].classList.remove("is-active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-active");
    }, every);
  }

  /* ---------- Cappadocia ridge: fairy chimneys drawn from a seed ---------- */
  function initRidge() {
    var svg = $("#capRidge"); if (!svg) return;
    var seed = 7, rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var W = 1600, H = 260, out = "";
    [[0.55, 46, "var(--cap-far)"], [1, 30, "var(--cap-near)"]].forEach(function (layer, li) {
      var scale = layer[0], n = layer[1], d = "M0 " + H + " L0 " + (H - 40 * scale);
      for (var k = 0; k < n; k++) {
        var x = (k + rnd() * 0.6) * (W / n), w = (26 + rnd() * 34) * (li ? 1.25 : 0.85), h = (50 + rnd() * 120) * scale;
        var base = H - 30 * scale - rnd() * 20;
        // a rounded cone with a small cap stone
        d += " L" + (x - w) + " " + base +
             " Q" + (x - w * 0.35) + " " + (base - h * 0.7) + " " + (x - w * 0.18) + " " + (base - h) +
             " Q" + (x - w * 0.45) + " " + (base - h - 6) + " " + (x - w * 0.2) + " " + (base - h - 12) +
             " L" + (x + w * 0.2) + " " + (base - h - 12) +
             " Q" + (x + w * 0.45) + " " + (base - h - 6) + " " + (x + w * 0.18) + " " + (base - h) +
             " Q" + (x + w * 0.35) + " " + (base - h * 0.7) + " " + (x + w) + " " + base;
      }
      d += " L" + W + " " + (H - 40 * scale) + " L" + W + " " + H + " Z";
      out += '<path d="' + d + '" fill="' + layer[2] + '"/>';
    });
    // a few lit cave windows
    for (var c = 0; c < 9; c++) {
      out += '<rect class="cave-light" x="' + Math.round(80 + rnd() * 1440) + '" y="' + Math.round(170 + rnd() * 50) + '" width="5" height="8" rx="2.5" style="animation-delay:' + (rnd() * 6).toFixed(1) + 's"/>';
    }
    svg.innerHTML = out;
  }

  /* ---------- Intro: the wordmark turns to dust (once per session) ---------- */
  function initIntro() {
    var root = document.documentElement;
    if (!root.classList.contains("intro-pending")) return;
    try { sessionStorage.setItem("professio.intro", "1"); } catch (e) {}
    var css = $('link[href$="css/style.css"]');
    var src = new URL("../images/brand/wordmark.png", css ? css.href : location.href).href;
    var cover = document.createElement("div");
    cover.className = "intro"; cover.setAttribute("aria-hidden", "true");
    cover.innerHTML = '<canvas></canvas><span class="intro-skip">' + (matchMedia("(hover: hover)").matches ? "Click to enter" : "Tap to enter") + "</span>";
    document.body.appendChild(cover);
    root.classList.remove("intro-pending");
    root.classList.add("intro-active");

    var canvas = $("canvas", cover), ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W, H, done = false, raf;
    function size() { W = innerWidth; H = innerHeight; canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + "px"; canvas.style.height = H + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size();

    function finish(fast) {
      if (done) return; done = true;
      cover.classList.add(fast ? "is-leaving-fast" : "is-leaving");
      root.classList.remove("intro-active");
      setTimeout(function () { cancelAnimationFrame(raf); cover.remove(); }, fast ? 450 : 1100);
    }
    cover.addEventListener("click", function () { finish(true); });
    document.addEventListener("keydown", function () { finish(true); }, { once: true });
    setTimeout(function () { finish(false); }, 5200); // safety net

    var img = new Image();
    img.onerror = function () { finish(true); };
    img.onload = function () {
      var lw = Math.min(W * 0.82, 920), lh = lw * img.height / img.width;
      var lx = (W - lw) / 2, ly = (H - lh) / 2;
      // tint the wordmark cream-gold on an offscreen canvas
      var off = document.createElement("canvas"), oc = off.getContext("2d");
      off.width = Math.round(lw); off.height = Math.round(lh);
      oc.drawImage(img, 0, 0, off.width, off.height);
      oc.globalCompositeOperation = "source-in"; oc.fillStyle = "#E9D9BC"; oc.fillRect(0, 0, off.width, off.height);

      var parts = [], data, gap = W < 700 ? 2 : 3;
      try { data = oc.getImageData(0, 0, off.width, off.height).data; } catch (e) { data = null; }
      if (data) {
        for (var y = 0; y < off.height; y += gap) for (var x = 0; x < off.width; x += gap) {
          var a = data[(y * off.width + x) * 4 + 3];
          if (a > 90) parts.push({
            x: lx + x, y: ly + y, a: a / 255,
            vx: 0.6 + Math.random() * 1.8, vy: -(0.2 + Math.random() * 1.1),
            delay: (x / off.width) * 0.75 + Math.random() * 0.25, s: Math.random() < 0.15 ? 2 : 1.2
          });
        }
      }

      var start = performance.now(), HOLD = 1300, FADEIN = 700, DUST = 1900;
      function frame(now) {
        if (done && cover.classList.contains("is-leaving-fast")) return;
        var t = now - start;
        ctx.clearRect(0, 0, W, H);
        if (t < HOLD || !data) {
          ctx.globalAlpha = Math.min(1, t / FADEIN);
          ctx.drawImage(off, lx, ly, lw, lh);
          if (!data && t > HOLD) { finish(false); return; }
        } else {
          var k = (t - HOLD) / DUST; // 0..1
          ctx.fillStyle = "#E9D9BC";
          for (var i = 0; i < parts.length; i++) {
            var p = parts[i], local = Math.max(0, k * 1.6 - p.delay);
            if (local <= 0) { ctx.globalAlpha = p.a; ctx.fillRect(p.x, p.y, gap, gap); continue; }
            var e = local * local * 60;
            var alpha = p.a * Math.max(0, 1 - local * 1.15);
            if (alpha <= 0) continue;
            ctx.globalAlpha = alpha;
            ctx.fillRect(p.x + p.vx * e + Math.sin((p.y + e) * 0.05) * local * 6, p.y + p.vy * e, p.s, p.s);
          }
          if (k > 0.55) finish(false);
          if (k >= 1.3) return;
        }
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    };
    img.src = src;
  }

  /* ---------- Boot ---------- */
  initIntro();
  initHeroSlides();
  initRidge();
  initLayout();
  initFeatured();
  initShop();
  initProduct();
  initZoomer();
  initFilms();
  initChapters();
  initForms();
  initAccordions();
  initReveal();
})();
