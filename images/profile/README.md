# Profile photo & logo

- `crest.png` — shown in the About section. Replace this file with your own
  photo (keep the filename, or update the `src` on `#crestFull` in
  [index.html](../../index.html) if you rename it). Recommended: a square or
  4:5 image, at least 600px on the short side.
- `logo.png` — the small "TN" mark in the nav bar and footer, background
  removed so it sits transparently on the dark/light theme. This was
  generated from `logo.jpeg` (kept here as the original) by knocking out
  its near-white pixels. If you swap in a new logo, either export it with
  a transparent background directly (PNG/WebP), or re-run the same
  background-removal step on a flat-white source image.
- `bg.png` — a portrait with a transparent edge vignette baked in, kept here
  but not currently used anywhere on the page (the hero went back to the
  code-terminal widget). If you want it back in the hero, swap `.glass.term`
  in [index.html](../../index.html) for an `<img src="images/profile/bg.png">`.
