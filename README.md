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

## Cloudflare Pages (GitHub)

1. Create a GitHub repo and push this project.
2. In Cloudflare: Pages → Connect GitHub → this repo.
3. Create a D1 database `yriskit` and an R2 bucket `yriskit-documents`. Put the IDs in `wrangler.toml`.
4. Build command: `npx opennextjs-cloudflare build` (or `npm run cf:build`).
5. Set secrets: `BETTER_AUTH_SECRET`, `IKHOKHA_APP_ID`, `IKHOKHA_APP_SECRET`, `IKHOKHA_ENTITY_ID`, `RESEND_API_KEY`, `CRON_SECRET`, `ADMIN_EMAIL`.
6. Point `yriskit.co.za` at the Pages project when you cut over. Keep the Tally form live until the first paid generation is verified.

Without iKhokha credentials the app still runs using the mock checkout.

## Cron

`GET /api/cron/reminders` with `Authorization: Bearer $CRON_SECRET` sends 60 / 30 / 7 day RMCP review emails. Schedule it daily (Cloudflare Cron or GitHub Action).

## Document generation

Word and PDF are generated from the same locked FIC Act content (`data/rmcp-paragraphs.json`) with matching cover, document control, notices, and body sections. Vertical products add extra clause blocks (admin) that appear in both formats. `templates/rmcp-core.docx` remains the source reference for field mapping.
