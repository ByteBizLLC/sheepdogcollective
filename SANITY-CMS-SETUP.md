# Sanity CMS Setup for The Sheepdog Collective

This build adds an embedded CMS at:

```txt
http://localhost:3000/studio
```

and later:

```txt
https://sheepdog.bytebiz.dev/studio
```

## What Chris Can Manage

Chris will be able to create, edit, publish, archive, and upload flyers for Training Events.

Fields included:

- Class Title
- Short Calendar Title
- Start Date
- End Date
- Venue / Host Agency
- City / State
- Short Description
- Event Status Label
- Website Visibility
- Registration / Inquiry Link
- Flyer PDF Upload
- Maximum Seats
- Seats Remaining
- Registration Deadline
- Featured Event

## Safe Removal Workflow

Do not delete events as the normal workflow. Instead:

1. Open the event in Studio.
2. Set Website Visibility to `Archived / Hidden`.
3. Click Publish.

Archived events disappear from the public calendar but remain available in the CMS.

## First-Time Sanity Setup

1. Create an account at Sanity.
2. Create a new project named `The Sheepdog Collective`.
3. Use the `production` dataset.
4. Copy the Project ID.
5. Create `.env.local` in the project root:

```txt
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-04
```

6. Run:

```powershell
npm install --legacy-peer-deps
npm run dev -- --webpack
```

7. Open:

```txt
http://localhost:3000/studio
```

8. Add one Training Event and publish it.
9. Open:

```txt
http://localhost:3000/calendar
```

The calendar should now read from Sanity. If Sanity is not configured or has no events, the site falls back to the local event in `lib/site-data.ts`.

## Production Deployment

After the build works locally:

```powershell
npm run build
```

On the server, create:

```txt
/var/www/sheepdogcollective/.env.local
```

with the same Sanity values.

Then run:

```bash
cd /var/www/sheepdogcollective
npm install --legacy-peer-deps --no-audit --no-fund
npm run build
pm2 restart sheepdog
systemctl reload nginx
```

## Important

The CMS will not break the public site if Sanity is not configured. The site will use the fallback event data until Sanity is connected.
