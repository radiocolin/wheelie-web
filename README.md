# wheelieapp.com

Wheelie's website: the landing page, privacy policy, terms of use, press kit and contact page.

## Pages

- `index.html`: the landing page.
- `privacy.html` and `terms.html`: their text lives in `privacy_policy.md` and `terms_of_use.md`, rendered by `privacy-generator.js` and `terms-generator.js` with [marked](https://marked.js.org). Edit the `.md` files and update the "Last Updated" date on the legal pages.
- `press.html`: the press kit (`press-images/`).
- `contact.html`: contact and subscription help.
- `components.js`: the navigation bar and footer every page shares, and the App Store badge (put `<span data-app-store-badge></span>` where one goes).
- `styles.css`: shared styles. Colors come from the app's asset catalog (Mango, Sunset, Eggplant, Frost, Slate), with light and dark modes following the visitor's system setting. Headlines use Barlow Condensed, as the app does; body text uses Bryant.

## Images

Everything in `assets/` is generated from the App Store screenshot pipeline (radiocolin/app-store-screenshots), so the site matches the store:

```sh
cd ~/Developer/"App Store Screenshots"
python3 wheelie/site_assets.py   # writes ~/Developer/wheelie-web/assets
```

It exports the section backgrounds, the iPhone screens (shaped like the display, with transparent corners), the Live Activity, the app icon (rendered from `Wheelie.icon`) and the link preview image. Retake the screenshots (`wheelie/capture.py --languages en`) first if the app has changed.

`press-images/` holds the press kit: the app icon, the wordmark, and the English App Store screenshots (`wheelie/Output/framed/en/6.9/` in the screenshots repo). `press.html` lists them.
