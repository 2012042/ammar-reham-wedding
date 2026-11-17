# Ammar & Reham — Wedding Invitation (Next.js)

Five styles (Classic, Royal, Garden, Lavender, Golden), Arabic/English (Arabic default), background music.

## Run

    npm install
    npm run dev        # http://localhost:3000

## Edit

- All text, date, venue, map link, WhatsApp number: `lib/config.ts`
- Music: replace `public/music/song.mp3` with your own mp3 (same file name)
- Open a style directly: `/?style=classic` | `royal` | `garden` | `lavender` | `golden` (add `&lang=en` for English)
- After choosing: set `defaultTheme` and `showStyleSwitcher: false` in `lib/config.ts`

## Publish

    npm run build      # static site in the `out` folder — upload to Cloudflare Pages, Netlify or Vercel
