# Chef Yard — local run and FileZilla upload

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in the browser.

## Create the upload files

```bash
npm run build
```

The complete static website is generated inside:

```text
dist/public/
```

## Upload with FileZilla

Connect to the hosting account in FileZilla, open the website document root (usually `public_html`, `www`, or `htdocs`), and upload **everything inside** `dist/public/` into that folder. Keep the folder structure unchanged, especially `assets/`, `images/`, and `api/`.

The static upload contains `index.html`, `favicon.svg`, the local food images, the compiled `assets/` folder, `api/platform/config.js`, and the required route manifest.

For a future update, run `npm run build` again and upload the newly generated `dist/public/` contents, replacing the old files.
