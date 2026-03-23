# Vroxal Design Icons

Vroxal Design Icons is a scalable icon font package that ships generated fonts, CSS classes, and a JSON icon map.

Package output:

- `dist/fonts/` contains the generated `woff2`, `woff`, `ttf`, and `eot` files
- `dist/vd-icon.css` contains the icon font classes
- `dist/vd-icon.json` contains the icon-to-codepoint mapping

## Build

Add or update SVG files in `src/icons/`, then run:

```bash
npm run build
```

The build uses `fantasticon.config.json` and generates `vd-icon` classes such as `vd-icon-home`.

## Usage

Install:

```bash
npm install @vroxal/vd-icons
```

Include the generated CSS:

```html
<link rel="stylesheet" href="node_modules/@vroxal/vd-icons/dist/vd-icon.css" />
```

Use icons with the base class and icon-specific class:

```html
<i class="vd-icon vd-icon-home"></i> <i class="vd-icon vd-icon-user"></i>
```

You can also consume the JSON map programmatically:

```ts
import icons from "@vroxal/vd-icons/dist/vd-icon.json";
```

[![npm version](https://img.shields.io/npm/v/@vroxal/vd-icons)](https://www.npmjs.com/package/@vroxal/vd-icons)
[![npm downloads](https://img.shields.io/npm/dm/@vroxal/vd-icons)](https://www.npmjs.com/package/@vroxal/vd-icons)
