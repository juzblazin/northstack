# Thamada Labs website

Marketing site for Thamada Labs, built with Vite, React, TypeScript, Tailwind CSS v4 and Motion.

## Run it on your Mac

1. Install Node.js 20 or newer from https://nodejs.org (pick "LTS"), if you don't have it yet.
2. Open **Terminal** and go to this folder, for example:
   ```bash
   cd ~/Documents/GitHub/thamada-labs
   ```
3. Install the packages (only needed the first time, or after pulling changes):
   ```bash
   npm install
   ```
4. Start the site:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173 in your browser. Press `Ctrl + C` in Terminal to stop it.

## Where things live

- `src/data.ts` – brand name, headline, menu items, quotes and FAQ text
- `src/sections/` – one file per page section (Nav, Hero, …)
- `src/components/lab/` – the four "Lab" showcase options under the hero
- `public/assets/` – images (hero dancer, logo)

## Build for publishing

```bash
npm run build
```
The finished site is written to the `dist/` folder.
