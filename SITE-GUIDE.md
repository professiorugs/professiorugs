# Professio website

Static site (plain HTML, CSS and JavaScript) hosted on GitHub Pages at https://professiorugs.com.

## Pages and addresses
Every page lives in its own folder, so addresses have no `.html` in them.

| Address | File | Page |
|---|---|---|
| `/` | `index.html` | Home: hero, the flying flagship rug, featured pieces, trade paths, certificate |
| `/rugs/` | `rugs/index.html` | The Collection, with filters and sort |
| `/rugs/<name>-hereke-silk-rug/`, `/rugs/<name>-tabriz-wall-carpet/` | `rugs/<slug>/index.html` | One page per rug (generated, see below) |
| `/heritage/` | `heritage/index.html` | Heritage & Origins documentary (knots, Hereke, Kayseri, Persia, Turkmen) |
| `/silk-rug-guide/` | `silk-rug-guide/index.html` | Silk rug buying guide with FAQ |
| `/our-story/` | `our-story/index.html` | Our Story and the certificate |
| `/trade/` | `trade/index.html` | Trade portal, wholesale FAQ and inquiry form |
| `/404.html` | `404.html` | Not-found page |

The old addresses (`shop.html`, `product.html?id=…`, `heritage.html`, `story.html`, `trade.html`, and rug addresses without the origin such as `/rugs/midnight-bloom-silk-rug/`) are small redirect pages, so old links keep working.

## After editing rugs, page text, CSS or JavaScript: run the builder
All rugs live in `js/products.js`. After adding, removing or editing a rug, or changing `css/style.css` or `js/*.js`, run:

```
node tools/build.js
```

It regenerates, from `js/products.js` and `tools/product-template.html`:
- the `<head>` of every page: title, meta description, canonical URL, Open Graph and Twitter cards, structured data (Organization, WebSite, Product with price, BreadcrumbList, FAQ, Article)
- one page per rug under `rugs/`
- crawlable product cards in the collection and home page grids
- the redirect pages, `sitemap.xml`, `robots.txt` and `site.webmanifest`
- a version stamp on the stylesheet and scripts (`/css/style.css?v=…`), so after an update every browser loads the new files together instead of mixing old and new ones

Page titles and descriptions for the main pages are set in the `PAGES` list in `tools/build.js`. Rug titles and descriptions come from each rug's title, size, materials and story.

A rug's address comes from its title and origin: "Midnight Bloom" from Hereke becomes `/rugs/midnight-bloom-hereke-silk-rug/`, and "The Recital" from Tabriz becomes `/rugs/the-recital-tabriz-wall-carpet/`. To keep an address when renaming a rug, add `slug: "old-address"` to its entry.

## Rug facts
- `type`: `"Floor rug"` or `"Wall carpet"`.
- `origin`: floor rugs are `"Hereke, Türkiye"` or `"Kayseri, Türkiye"`; wall carpets are `"Tabriz, Iran"`. Floor rugs also use `category: "Hereke Silk"` or `"Kayseri Silk"`, which drives the collection filter.
- `knots`: left out on every rug for now (the "10'luk" wording was removed at Enes's request, October 2026). Only add a density such as `"12 × 12 per cm (144 per cm²)"` once Professio confirms it for that piece; the rug page then shows it, the density per square inch and the total number of knots.
- `price`: a round number in US dollars (5600, 13500). Etsy checkout always shows the price set on the Etsy listing, so keep the two the same.

## The flying carpet
The rug with `flagship: true` in `js/products.js` floats on the home page and on its own page. `flyer` points to a straightened, landscape cut-out of the rug with a transparent background and its fringe on the short ends (`images/collection/midnight-bloom-flight.webp`), and `flyerSize` gives its pixel size. A slow wave rolls along the cloth and the fringe stirs, both a little more under the mouse, and gold sparkles follow the pointer. The wave is painted on a canvas from the same photograph (`waveFlyer` in `js/main.js`); visitors with "reduce motion" see the still photograph. `data-fringe` on the `.flyer` element says where the fringe begins on each short end, as a share of the length (`0.054 0.954` for the current cut-out); change it if a new cut-out has a longer or shorter fringe.

The cut-out is trimmed to the rug's own dark outer edge, with no floor from the original photograph left along its sides. The light on it is soft and warm from the upper left: a wide glow behind (`.flagship-glow`, `.flyer-aura`), a soft diffuse shadow below (`.flyer-shadow`), and on the canvas a gentle key light, a light vignette and a slow silk sheen (the `key`, `vig` and sheen gradients in `waveFlyer`).

## Motion
All motion is slow and switches off for visitors who choose "reduce motion":
1. Rug photos in the grids appear row by row as a thin gold thread passes down them, in about a second, starting as soon as a card is on screen.
2. On a rug page the main photo unrolls from the top in about a second.
3. The flying carpet's cloth waves slowly and its fringe stirs, a little more on hover, and gold sparkles follow the mouse.
4. A short gold thread draws itself under section titles.
5. A soft candle glow flickers in the Cappadocia section on the home page, and three small hot-air balloons drift in its sky as dark silhouettes in the tones of the fairy chimneys, lit only by their flickering burners (keep it to three and keep them uncoloured; the balloon is the `#balloon` symbol in `index.html`, its colours and places are `.balloon--1` to `--3` in `css/style.css`).
5b. Our Story opens on the family banner (`images/brand/story-banner*.jpg`, 900/1680/3360 px), which surfaces out of the blank page, followed by the declaration (`.story-banner` and `.story-intro` in `css/style.css`). Its h1 is screen-reader only. "Profession of My Ancestors" below it reuses the Heritage thread timeline (`.thread-time`).
6. Numbers with `data-count` (knot counts, Hereke's 100+) count up when they come into view. Beside Hereke's 100+, a square centimetre fills with ten rows of ten knots as the number counts.
7. Heritage & Origins: in the Prologue a twisted thread draws down the timeline as you scroll and ties a small knot at each date; in Chapter I three Turkish knots are tied on the loom, a weft is laid over them and beaten down, again and again; in Chapter IV the naqsheh (knot chart) fills in a row at a time from the bottom up. The drawings are inline SVG in `heritage/index.html`; the timing is in `initTimeline`, `initKnotFig` and `initNaqsheh` in `js/main.js`.

## The intro
The wordmark intro plays on the home page once per browser tab session (`sessionStorage`). It waits about five seconds for a click or tap, then dissolves on its own. Visitors with "reduce motion" switched on never see it. To preview it again, open `https://professiorugs.com/?intro`.

## Search engines
1. Google Search Console (https://search.google.com/search-console): add a **Domain** property for `professiorugs.com` and verify it with the TXT record Google gives you, at your domain registrar. Alternatively choose **URL prefix**, pick the "HTML tag" method and paste the code into `VERIFY.google` in `tools/build.js`, then run the builder.
2. In Search Console, open **Sitemaps** and submit `https://professiorugs.com/sitemap.xml`.
3. Bing Webmaster Tools (https://www.bing.com/webmasters): sign in and choose **Import from Google Search Console**, or verify with `VERIFY.bing`.

## Forms
The enquiry form (`trade/index.html`) and the newsletter box in the footer both post to Formspree once a form exists. Create a free form at formspree.io, then replace `YOUR_FORM_ID` with its ID in two places: the form's `action` in `trade/index.html` and `FORM_ACTION` near the top of `js/main.js`. Run the builder.

Until then, and whenever Formspree cannot be reached, nothing is lost: pressing **Send Enquiry** opens the visitor's own email app with the enquiry written out to info@professiorugs.com (subject, name, email and every field they filled in), and the page asks them to press send. If no email app opens, they can copy the enquiry with one button and send it from any account. The newsletter box does the same with a short "please add me" email. So info@professiorugs.com must forward to an inbox you read: set this up under Email Forwarding at Porkbun and test it by sending yourself a message.

## Films
In `heritage/index.html`, add `data-youtube="VIDEO_ID"` or `data-vimeo="VIDEO_ID"` to each `.film` element.

## Images
Product images are in `images/collection/`. Etsy pieces load their photos from Etsy's image server, and **Acquire Piece** opens the Etsy listing. When a piece sells, delete its entry (or remove its `etsy` field) and run the builder.

The share image (`images/brand/og-image.jpg`) and the square logo are rendered from `tools/og.html` and `tools/logo.html`.

The artisan photographs in `images/editorial/` are enlarged 1.5 times from the originals with a light clean-up of compression speckle and a gentle detail sharpen (pixel-level only, no generative model, so the people in them are unchanged). Do the same to any new editorial photo that fills the screen.

On the home page and every rug page, Etsy photos ask Etsy for the 1588 px copy on high-density screens and the 794 px copy elsewhere; if Etsy has no 1588 px copy, the photo falls back to 794 px by itself (`sharpSet` in `tools/build.js` and `js/main.js`).

The house's own rug photos in `images/collection/` are enhanced the same way: the Tabriz wall carpets are cut again from the lossless catalogue pages and enlarged 2 times, and the Midnight Bloom photos are exported at 1400 px from the 1588 px originals. Each has a 320 px copy in `images/collection/thumbs/` for the gallery strip and the Your Collection drawer. When you add a photo, add its thumb too (if one is missing, the full photo is used).

## Local preview
```
python3 -m http.server 8000
```
then open http://localhost:8000.
