# Professio website

Static site (plain HTML, CSS and JavaScript, no build step), ready for GitHub Pages on a custom domain.

## Pages
| File | Page |
|---|---|
| `index.html` | Home: campaign hero, featured pieces, collector / trade / commission paths, certificate |
| `shop.html` | The Collection: gallery grid with Category, Material, Size and Edit filters, plus sort |
| `product.html?id=…` | Product page: museum placard (dimensions cm/ft, materials, technique, age, knot density, origin), Acquire Piece / Add to Collection / Inquire for Trade, material reverence, certificate |
| `heritage.html` | Heritage & Origins: knot chapter with zoomable texture maps, Kayseri & Anatolia, Persia, Turkmen, the pictorial tradition, comparison table, films |
| `story.html` | Our Story and the Certificate of Authenticity |
| `trade.html` | Trade Portal: private acquisition, trade & wholesale, and custom commission form |
| `404.html` | Not-found page |

## Editing the collection
All pieces live in `js/products.js`. Each entry has a comment-documented set of fields. To fill in a spec, replace `null` with text, for example:

```js
age: "New (2023)", knots: "≈ 400 kpsi · 6,200 per dm²", origin: "Tabriz, Iran", price: 4800
```

Anything left `null` shows as *Available on request* on the placard. `price: null` shows *Price upon request*.

Product images are in `images/collection/`. They were cropped from the catalogue PDF pages, so they are low resolution (about 550 px). Replace them with original photographs, ideally 2000 px or wider, keeping the same file names.

## Forms
`trade.html` posts to `https://formspree.io/f/YOUR_FORM_ID`. Create a free form at formspree.io, then replace `YOUR_FORM_ID` with the real ID. Until then the form shows its thank-you message without sending anything.

## Films
In `heritage.html`, add `data-youtube="VIDEO_ID"` or `data-vimeo="VIDEO_ID"` to each `.film` element.

## Deploying on GitHub Pages
1. Push this folder to the root of a GitHub repository.
2. Repository **Settings → Pages → Build and deployment**: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. `CNAME` contains `www.professiorugs.com`. Under Settings → Pages, set the same custom domain and tick **Enforce HTTPS**.
4. At your domain registrar, add a `CNAME` record for `www` pointing to `<your-github-username>.github.io`, and `A` records for the bare domain pointing to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153.

## Local preview
The logo uses a CSS mask, which browsers block on `file://` pages. Preview with a local server instead:

```
python3 -m http.server 8000
```

then open http://localhost:8000.

## Etsy pieces
The 21 Cappadocia silk and pictorial pieces from etsy.com/shop/ProfessioRugs are at the bottom of `js/products.js`. Their photos load from Etsy's image server (`i.etsystatic.com`), and **Acquire Piece** opens the Etsy listing for checkout. When a piece sells, delete its entry, or remove its `etsy` field so buyers are sent to the private-acquisition form. To host the photos yourself, save them into `images/collection/` and change the `image` / `images` paths.
