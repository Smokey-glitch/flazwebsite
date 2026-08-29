# CMS setup (Decap CMS)

The site's content — projects, services, hero copy, testimonials, FAQ, footer info — lives in `content/*.json` and is editable at `/admin` without touching code. Saves in the CMS commit straight to this GitHub repo (`emicstllas/flazwebsite`) and Vercel redeploys automatically.

This is a one-time setup, done once by whoever has admin access to the GitHub repo and the Vercel project.

## 1. Create a GitHub OAuth App

The CMS needs to authenticate editors against GitHub. This site is hosted on Vercel (not Netlify), so it uses a small self-hosted OAuth provider (`app/api/auth`, `app/api/callback`) instead of Netlify's built-in one.

1. Go to GitHub → Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers) → **New OAuth App**.
2. Fill in:
   - **Application name**: `Flaz Technical Services CMS` (or anything recognizable)
   - **Homepage URL**: `https://www.flaztechnicalservices.com`
   - **Redirect URI**: `https://www.flaztechnicalservices.com/api/callback`

   Vercel serves the site canonically on the `www` subdomain (the bare domain redirects to it), so `www` is what must match everywhere: the OAuth App's redirect URI, `base_url` below, and the URL editors actually use to reach `/admin`. It's fine to also add `https://flaztechnicalservices.com/api/callback` as a second redirect URI for safety, but `www` is the one that has to be exactly right — Decap validates the login handshake against `base_url` and silently drops it (no error, just hangs on "Signing in…") if it doesn't match the domain the page actually loaded from.
3. Create it, then generate a **Client secret**. You'll get a **Client ID** and a **Client secret** — copy both.

## 2. Set environment variables

Add these two variables:

```
GITHUB_OAUTH_CLIENT_ID=<the client id from step 1>
GITHUB_OAUTH_CLIENT_SECRET=<the client secret from step 1>
```

- **Locally**: add them to `.env.local` (same file that already holds `RESEND_API_KEY`).
- **On Vercel**: Project Settings → Environment Variables, add both for Production (and Preview if you want the CMS to work on preview deployments too).

## 3. `public/admin/config.yml` — already set

`base_url` in [public/admin/config.yml](public/admin/config.yml) is already set to `https://www.flaztechnicalservices.com`, matching the OAuth App's redirect URI above. If the production domain ever changes, update both together — and always use whichever domain (`www` or bare) Vercel actually serves the site on, not just any domain that resolves.

## 4. Add editors as GitHub collaborators

Both editors need a (free) GitHub account, and need to be added as collaborators on `emicstllas/flazwebsite`:

GitHub repo → Settings → Collaborators → **Add people** → enter their GitHub username or email.

They'll get an invite email — once accepted, they can log in at `/admin` with their GitHub account. The CMS UI hides all the git mechanics; they just see a login screen and content forms.

## 5. Using the CMS

- Visit `https://<your-domain>/admin`, log in with GitHub.
- Content is grouped into **Projects** (add/edit/delete individual projects, drag to reorder via the "Order" field) and **Site content** (Homepage hero, Why us stats, How we work, Testimonials, FAQ, Contact & footer, Services) — each a single form.
- Any field showing a list (gallery photos, reviews, FAQ entries, steps, nav links) has a drag handle for reordering.
- Saving in the CMS commits directly to the `master` branch, which triggers a normal Vercel deploy — changes go live within a minute or two, same as any other push.

## Known limits

- The homepage "Selected work" teaser and the `/projects` grid use fixed layouts sized for **exactly 6 projects** (4 feed the homepage teaser, all 6 feed the full grid). Editing existing projects' text/photos and reordering them is fully supported; adding a 7th or dropping below 6 will leave a visual gap until the layout is redesigned to handle any number of projects (a separate follow-up, not part of this CMS).
- Uploaded photos are committed into `public/images/uploads/` in the repo — there's no external media host, so the repo will grow with every new photo (fine at this site's scale).
