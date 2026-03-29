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
