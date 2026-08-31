# Portfolio site — structure

```
myapp/
├─ index.html              Page markup (structure only)
├─ css/
│  └─ style.css             All styling
├─ js/
│  ├─ data.js               ← Edit THIS to change any text or add images
│  └─ main.js                Rendering + interactivity (no content to edit here)
├─ images/
│  ├─ profile/               Your profile photo (crest.png)
│  ├─ projects/               Project screenshots
│  └─ certificates/            Certificate scans/exports
└─ README.md                 This file
```

## Adding images

1. Drop the image file into the matching `images/…` folder.
2. Open `js/data.js` and set the relevant entry's `image` field to the
   path, e.g. `image:"images/projects/quickbite.png"`.
3. Refresh the page — no other changes needed.

Your profile photo is the one exception: it's referenced directly in
`index.html` at `images/profile/crest.png`. Replace that file (same name)
to swap it, or edit the `src` on `#crestFull` in `index.html` to point
elsewhere.

## Editing content

Everything else — stats, timeline, projects, tech stack, skills, learning
logs, garden notes, certificates, roadmap — lives in the `DATA` object in
`js/data.js`. Each section has a comment above it in that file.

## Running locally

Just open `index.html` in a browser, or serve the folder with any static
server (e.g. `npx serve myapp`) if you want it on a local URL.
