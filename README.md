# Y Risk It

Unified website and RMCP web app for Y Risk It. Customers learn about FIC Act RMCP obligations, pay with iKhokha, complete a guided questionnaire, and immediately download a professional Word + PDF programme. Staff use `/admin` for CRM, renewals and vertical templates.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

- Create an account, purchase an RMCP (without iKhokha keys this uses a **mock payment** that marks the order paid).
- Complete the wizard and download Word/PDF.
- The email in `ADMIN_EMAIL` is promoted to admin on signup (`hello@yriskit.co.za` by default).
- `npm run seed:demo` creates a paid demo client (`client@yriskit.co.za`) with the questionnaire prefilled. Set `DEMO_CLIENT_PASSWORD` in `.env.local`. While signed in as that user, use **Re-run demo** on the dashboard to reset the wizard and downloads without leaving the app.

## Cloudflare Workers Builds (GitHub)

Use **Workers Builds**, not Cloudflare Pages static deploy. In the Worker build settings:

| Setting | Value |
| --- | --- |
| **Build command** | `npm run cf:build` |
| **Deploy command** | `npm run cf:deploy` |

Do **not** set the build command to `npm run build` alone — that only runs Next.js. Do **not** set the deploy command to `npx wrangler deploy`.

`npm run build` must stay as `next build --webpack` because OpenNext invokes it internally. Setting it to `opennextjs-cloudflare build` causes a recursive loop and the deployment will hang.

1. Create a GitHub repo and push this project.
2. In Cloudflare: Workers & Pages → your worker → Settings → Builds → connect GitHub.
3. Create a D1 database `yriskit` and R2 buckets `yriskit-documents` and `yriskit-opennext-cache`. Put the D1 ID in `wrangler.toml` (`database_id`).
4. Set build/deploy commands from the table above.
5. Set secrets in **Build variables and secrets**: `BETTER_AUTH_SECRET`, `IKHOKHA_APP_ID`, `IKHOKHA_APP_SECRET`, `IKHOKHA_ENTITY_ID`, `RESEND_API_KEY`, `CRON_SECRET`, `ADMIN_EMAIL`. Set `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SITE_URL` to `https://yriskit.co.za`.
6. Point `yriskit.co.za` at the Worker when you cut over.

Without iKhokha credentials the app still runs using the mock checkout.

## Cron

`GET /api/cron/reminders` with `Authorization: Bearer $CRON_SECRET` sends 60 / 30 / 7 day RMCP review emails. Schedule it daily (Cloudflare Cron or GitHub Action).

## SEO

Public metadata, sitemap, robots.txt, llms.txt and JSON-LD always use the canonical domain `https://yriskit.co.za` via `NEXT_PUBLIC_SITE_URL`. Local dev can keep `NEXT_PUBLIC_APP_URL=http://localhost:3000` for auth and checkout without affecting SEO output.

## Document generation

Word and PDF are generated from the same locked FIC Act content (`data/rmcp-paragraphs.json`) with matching cover, document control, notices, and body sections. Vertical products add extra clause blocks (admin) that appear in both formats. `templates/rmcp-core.docx` remains the source reference for field mapping.
