# HAM.NET – Personal Portfolio

Personal portfolio site for Worapol Boontanonda (Ham / Hamuel) – Lead Software Engineer.

## Tech Stack

- **Vite** – Build tool
- **Vanilla HTML/CSS/JS** – No framework
- **Bun** – Package manager & runtime

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js if you prefer npm)

### Install

```bash
bun install
```

### Run Development Server

```bash
bun run dev
```

Opens at `http://localhost:5173` (or the port Vite assigns).

### Build

```bash
bun run build
```

Output goes to the `content/` directory.

### Preview Production Build

```bash
bun run preview
```

### Deploy

Deploys to AWS S3 + CloudFront:

```bash
bun run deploy
```

Requires AWS CLI configured with access to the S3 bucket and CloudFront distribution.

### Serve Built Site with Docker

```bash
./start.sh
```

Runs nginx in Docker, serving `content/` on port 3000.

## Project Structure

```
├── index.html          # Entry HTML
├── src/
│   ├── main.js         # Theme toggle, mobile nav
│   └── styles.css      # All styles
├── public/
│   ├── asset/          # Images, SVGs, splash assets
│   └── hamuel-logo-ico.svg
├── content/            # Build output (generated)
└── NOTES.md            # Dev notes (splash, etc.)
```

## License

Private / personal use.
