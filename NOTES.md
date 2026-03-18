# Project Notes

## Run Instructions

```bash
bun install          # Install dependencies
bun run dev          # Start dev server (Vite)
bun run build        # Build for production
bun run preview      # Preview production build
bun run deploy       # Deploy to S3 + CloudFront
./start.sh           # Serve built site via Docker nginx on :3000
```

## Water Splash Background (HAM.NET Logo Theme)

The site background includes water splash elements that echo the HAM.NET logo aesthetic:

- **`public/asset/water-splash.svg`** – SVG with organic water splash blob shapes (gradient fills)
- **`public/asset/water-splash-mask.svg`** – Mask version used for theme-aware CSS (white shapes with opacity)

The splash is applied via `body::after` in `src/styles.css` using `mask-image` so it respects the dark/light theme via `--splash` / `--splatter`.

The gradient is softened with multiple radial gradients at different positions instead of a single harsh ellipse.
