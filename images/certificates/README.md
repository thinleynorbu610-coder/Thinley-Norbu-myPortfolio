# Certificate images

Drop a scan or export of each certificate here (e.g. `responsive-web-design.png`),
then open [js/data.js](../../js/data.js) and set that certificate's `image`
field to the path, for example:

```js
{name:"Responsive Web Design", ..., image:"images/certificates/responsive-web-design.png"}
```

Leave `image` as `null` to keep the "Add certificate image" placeholder.
Recommended: 4:3 crop, under ~300KB.
