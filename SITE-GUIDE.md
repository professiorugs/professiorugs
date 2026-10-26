# Professio website

Static site (plain HTML, CSS and JavaScript) hosted on GitHub Pages at https://professiorugs.com.

## Pages and addresses
Every page lives in its own folder, so addresses have no `.html` in them.

| Address | File | Page |
|---|---|---|
| `/` | `index.html` | Home: hero, the flying flagship rug, featured pieces, trade paths, certificate |
| `/rugs/` | `rugs/index.html` | The Collection, with filters and sort |
| `/rugs/<name>-silk-rug/` | `rugs/<slug>/index.html` | One page per rug (generated, see below) |
| `/heritage/` | `heritage/index.html` | Heritage & Origins documentary (knots, Hereke, Kayseri, Persia, Turkmen) |
| `/silk-rug-guide/` | `silk-rug-guide/index.html` | Silk rug buying guide with FAQ |
| `/our-story/` | `our-story/index.html` | Our Story and the certificate |
| `/trade/` | `trade/index.html` | Trade portal, wholesale FAQ and inquiry form |
| `/404.html` | `404.html` | Not-found page |

The old addresses (`shop.html`, `product.html?id=…`, `heritage.html`, `story.html`, `trade.html`) are small redirect pages, so old links keep working.

## After editing rugs or page text: run the builder
All rugs live in `js/products.js`. After adding, removing or editing a rug, run:

```
node tools/build.js
```

It regenerates, from `js/products.js` and `tools/product-template.html`:
- the `<head>` of every page: title, meta description, canonical URL, Open Graph and Twitter cards, structured data (Organization, WebSite, Product with price, BreadcrumbList, FAQ, Article)
- one page per rug under `rugs/`
- crawlable product cards in the collection and home page grids
- the redirect pages, `sitemap.xml`, `robots.txt` and `site.webmanifest`

Page titles and descriptions for the main pages are set in the `PAGES` list in `tools/build.js`. Rug titles and descriptions come from each rug's title, size, materials and story.

A rug's address comes from its title: "Midnight Bloom" in silk becomes `/rugs/midnight-bloom-silk-rug/`. To keep an address when renaming a rug, add `slug: "old-address"` to its entry.

## The flying carpet
The rug with `flagship: true` in `js/products.js` floats on the home page and on its own page. `flyer` points to a straightened, landscape photo of the rug without background (`images/collection/midnight-bloom-flight.jpg`).

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
