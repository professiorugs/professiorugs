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
- `knots`: every floor rug is `"10 × 10 per cm (100 per cm²)"`, the Turkish "10'luk". The rug page shows the trade name, the density per square inch and the total number of knots (110 × 75 cm at 10 × 10 is about 825,000). For a 15'lik write `"15 × 15 per cm (225 per cm²)"`.
- `price`: a round number in US dollars (5600, 13500). Etsy checkout always shows the price set on the Etsy listing, so keep the two the same.

## The flying carpet
The rug with `flagship: true` in `js/products.js` floats on the home page and on its own page. `flyer` points to a straightened, landscape cut-out of the rug with a transparent background and its fringe on the short ends (`images/collection/midnight-bloom-flight.webp`), and `flyerSize` gives its pixel size. A slow wave rolls along the cloth and the fringe stirs, both a little more under the mouse, and gold sparkles follow the pointer. The wave is painted on a canvas from the same photograph (`waveFlyer` in `js/main.js`); visitors with "reduce motion" see the still photograph. `data-fringe` on the `.flyer` element says where the fringe begins on each short end, as a share of the length (`0.054 0.954` for the current cut-out); change it if a new cut-out has a longer or shorter fringe.

## Motion
All motion is slow and switches off for visitors who choose "reduce motion":
1. Rug photos in the grids appear row by row as a thin gold thread passes down them.
2. On a rug page the main photo unrolls from the top.
3. The flying carpet's cloth waves slowly and its fringe stirs, a little more on hover, and gold sparkles follow the mouse.
4. A short gold thread draws itself under section titles.
5. A soft candle glow flickers in the Cappadocia section on the home page.
6. Numbers with `data-count` (knot counts, Hereke's 100+) count up when they come into view. Beside Hereke's 100+, a square centimetre fills with ten rows of ten knots as the number counts.
7. Heritage & Origins: in the Prologue a twisted thread draws down the timeline as you scroll and ties a small knot at each date; in Chapter I three Turkish knots are tied on the loom, a weft is laid over them and beaten down, again and again; in Chapter IV the naqsheh (knot chart) fills in a row at a time from the bottom up. The drawings are inline SVG in `heritage/index.html`; the timing is in `initTimeline`, `initKnotFig` and `initNaqsheh` in `js/main.js`.

## The intro
The wordmark intro plays on the home page once per browser tab session (`sessionStorage`). It waits about five seconds for a click or tap, then dissolves on its own. Visitors with "reduce motion" switched on never see it. To preview it again, open `https://professiorugs.com/?intro`.

## Search engines
1. Google Search Console (https://search.google.com/search-console): add a **Domain** property for `professiorugs.com` and verify it with the TXT record Google gives you, at your domain registrar. Alternatively choose **URL prefix**, pick the "HTML tag" method and paste the code into `VERIFY.google` in `tools/build.js`, then run the builder.
2. In Search Console, open **Sitemaps** and submit `https://professiorugs.com/sitemap.xml`.
3. Bing Webmaster Tools (https://www.bing.com/webmasters): sign in and choose **Import from Google Search Console**, or verify with `VERIFY.bing`.

## Forms
`trade/index.html` posts to `https://formspree.io/f/YOUR_FORM_ID`. Create a free form at formspree.io and replace `YOUR_FORM_ID` with the real ID. Until then the form shows its thank-you message without sending anything.

## Films
In `heritage/index.html`, add `data-youtube="VIDEO_ID"` or `data-vimeo="VIDEO_ID"` to each `.film` element.

## Images
Product images are in `images/collection/`. Etsy pieces load their photos from Etsy's image server, and **Acquire Piece** opens the Etsy listing. When a piece sells, delete its entry (or remove its `etsy` field) and run the builder.

The share image (`images/brand/og-image.jpg`) and the square logo are rendered from `tools/og.html` and `tools/logo.html`.

## Local preview
```
python3 -m http.server 8000
```
then open http://localhost:8000.
