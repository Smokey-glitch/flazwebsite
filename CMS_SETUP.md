# Studio setup

The site's content — projects, services, hero copy, testimonials, FAQ, footer info — lives in `content/*.json` and is editable at a custom-built admin panel ("studio") without touching code. It's a hand-built Next.js admin app (not a third-party CMS), gated by a shared password, living on its own subdomain: **cms.flaztechnicalservices.com**. Saves commit directly to this GitHub repo (`emicstllas/flazwebsite`, `master` branch) using one server-side token — editors don't need GitHub accounts.

This is a one-time setup, done once by whoever manages the GitHub repo, the Vercel project, and DNS for flaztechnicalservices.com.

## 1. Generate a GitHub token for the studio to write with

1. Go to GitHub → Settings → Developer settings → [Fine-grained personal access tokens](https://github.com/settings/personal-access-tokens/new).
2. Repository access: **Only select repositories** → `emicstllas/flazwebsite`.
3. Permissions: **Contents** → **Read and write**. Leave everything else at no access.
4. Generate it and copy the token — this is used for every studio save, regardless of which editor is logged in.

Add it as an environment variable:

```
GITHUB_CONTENT_TOKEN=<the token>
```

## 2. Choose a studio password

Both editors share one password. Generate its hash locally (never store the plain password anywhere):

```
node scripts/hash-studio-password.mjs "the-password-you-choose"
```

This prints a `STUDIO_PASSWORD_HASH=...` line — copy the whole thing.

## 3. Generate a session secret

```
openssl rand -hex 32
```

Use the output as:

```
STUDIO_SESSION_SECRET=<the random hex string>
```

This signs login sessions. Rotating it later instantly logs everyone out (e.g. if a laptop is lost).

## 4. Set all three environment variables

- **Locally**: add `GITHUB_CONTENT_TOKEN`, `STUDIO_PASSWORD_HASH`, and `STUDIO_SESSION_SECRET` to `.env.local` (same file that already holds `RESEND_API_KEY`).
- **On Vercel**: Project Settings → Environment Variables, add all three for Production (and Preview if you want the studio to work on preview deployments too).

## 5. Add the `cms` subdomain

1. Vercel → Project Settings → Domains → **Add** → `cms.flaztechnicalservices.com`.
2. Vercel will show a CNAME target (e.g. `cname.vercel-dns.com`) — add that CNAME record at whichever registrar/DNS provider manages `flaztechnicalservices.com`.
3. Once DNS propagates, `https://cms.flaztechnicalservices.com` serves the studio automatically — it's the same Vercel project and deployment as the main site, just routed differently by [proxy.ts](proxy.ts) based on the request's hostname.

**Local development doesn't need any of this** — the studio is directly reachable at `http://localhost:3000/studio` with no DNS setup, since the subdomain routing is only a production convenience.

## 6. Using the studio

- Visit `https://cms.flaztechnicalservices.com`, log in with the shared password.
- The sidebar lists **Projects** (add/edit/delete, drag to reorder) and each content section (Hero, Why Us, How We Work, Services, Testimonials, FAQ, Contact & Footer).
- Any list field (gallery photos, reviews, FAQ entries, steps, nav links) has a `⠿` drag handle for reordering.
- Saving commits directly to `master`, which triggers a normal Vercel deploy — changes go live within a minute or two.
- Sessions last 7 days; use **Log out** in the sidebar, or just let it expire.

## Known limits

- The homepage "Selected work" teaser and the `/projects` grid use fixed layouts sized for **exactly 6 projects** (4 feed the homepage teaser, all 6 feed the full grid). Editing and reordering existing projects is fully supported; adding a 7th or dropping below 6 will leave a visual gap until those layouts are redesigned to handle any number of projects — a separate follow-up, not part of this studio.
- Uploaded photos are committed into `public/images/uploads/` in the repo — there's no external media host, so the repo grows with every new photo (fine at this site's scale). They're automatically compressed to WebP client-side before upload to keep commits small.
- One shared login for both editors — there's no per-editor audit trail in git history (all studio commits show the same token's author). Fine for a 2-person team; would need per-user GitHub OAuth again if that ever matters.
