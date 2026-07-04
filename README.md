# PathPilot — Landing Page

Plain HTML/CSS/JS, no build step, no dependencies except two Google Fonts loaded via `<link>`.

## Files
- `index.html` — structure & copy
- `styles.css` — all styling (design tokens at the top)
- `script.js` — nav, scroll reveals, animated flight-path, waitlist form handling

## Get a live link with GitHub Pages (free)

1. Create a new repo on GitHub (e.g. `pathpilot-site`), keep it **public**.
2. On your machine, in this folder, run:
   ```bash
   git init
   git add .
   git commit -m "PathPilot landing page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/pathpilot-site.git
   git push -u origin main
   ```
3. On GitHub: go to the repo → **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)** → **Save**.
5. Wait ~1 minute. Your live link will be:
   `https://<your-username>.github.io/pathpilot-site/`

Any time you push new commits to `main`, the live site updates automatically.

### Optional: custom domain
In the same **Settings → Pages** screen, add your domain under "Custom domain" and point your DNS `CNAME` record to `<your-username>.github.io`.

## Before this goes fully live
- **Waitlist form has no backend yet.** Right now submitting it just shows a success message in the browser — it doesn't save or email anywhere. Wire it to something like Formspree, a Google Form, or your own API before relying on it to capture real signups.
- Replace `hello@pathpilot.app` in the footer/nav with your real contact email.
- Swap in your actual social links if you want them in the footer.
