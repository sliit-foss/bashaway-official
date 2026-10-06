# New edition runbook

Everything that has to change to open a new Bashaway edition, in the order it needs to happen. Written after opening registration for 2026, when several of these steps were only discovered by something breaking.

Replace `<year>` with the new edition and `<prev>` with the previous one.

## The moving parts

| What                                          | Where it lives                                                                 | Hosted on                                                                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Main website                                  | `sliit-foss/bashaway-official`, one app per year under `apps/`                 | GitHub Pages, `bashaway.sliitfoss.org`                                                                                                |
| Event portal (team registration, submissions) | `sliit-foss/bashaway-event-portal`                                             | Vercel, `portal.bashaway.sliitfoss.org`                                                                                               |
| Admin portal                                  | `sliit-foss/bashaway-admin-portal`                                             | Vercel, `admin.bashaway.sliitfoss.org`                                                                                                |
| Leaderboard                                   | `sliit-foss/bashaway-leaderboard`                                              | GitHub Pages, `leaderboard.bashaway.sliitfoss.org`                                                                                    |
| Backend API                                   | `sliit-foss/bashaway-backend`                                                  | Google Cloud Run service `bashaway-prod` (`asia-southeast1`) in GCP project `bashaway-479305`, mapped to `api.bashaway.sliitfoss.org` |
| Database                                      | MongoDB Atlas, one database per edition                                        | Atlas                                                                                                                                 |
| Challenge and submission files                | Azure Blob Storage account `bashaway`, containers `challenges` and `solutions` | Azure                                                                                                                                 |
| Mail                                          | Gmail SMTP as `infosliitfoss@gmail.com` (app password)                         | Google                                                                                                                                |
| Past questions and solutions                  | `sliit-foss/bashaway-challenges`, one folder per year                          | GitHub                                                                                                                                |

Ask the previous organisers for access to the GCP project, the Atlas organisation, the Vercel account that owns the portals, and the Gmail app password before starting.

## 1. Accounts and billing

- [ ] **GCP billing is linked.** In the console, open Billing for `bashaway-479305`. If the project has no billing account, Cloud Run stops serving and `api.bashaway.sliitfoss.org` returns 500/503 even though the service looks healthy. Link a paid billing account (a billing account whose free trial has ended must be upgraded first) and add a small budget alert.
- [ ] **The Atlas cluster is running.** Free clusters are paused after a period of inactivity. A paused cluster has no DNS record, so connections fail with `querySrv ENOTFOUND`. Resume it from the Atlas UI.
- [ ] **Gmail SMTP still works.** The app password can be revoked when the account password changes. Test the login before going live; see step 4.

## 2. Website (`bashaway-official`)

- [ ] Copy `apps/<prev>` to `apps/<year>` and set `"name": "<year>"` in its `package.json`.
- [ ] `src/constants/dates.js`: `CURRENT_YEAR`, registration open and close times. The countdown and the Register button both read `TIME_REGISTRATION_CLOSING`.
- [ ] `index.html`: page title, `og:title` and both description meta tags (edition number).
- [ ] `src/components/landing/hero.jsx` and `competition.jsx`: edition number ("fifth edition").
- [ ] `src/components/landing/timeline/data.json`: every date. Use `TBD` for anything not confirmed.
- [ ] `src/components/landing/past-events.jsx`: link and label for `<prev>`.
- [ ] Sponsors, partners, knowledge partners, in-kind partners and prizes: confirm with the organising committee whether they carry over.
- [ ] Gallery images.

Merging to `main` deploys to production immediately. `scripts/postbuild.sh` serves the app whose folder name matches the current calendar year at the site root, and every other year at `/<year>`. Merging `apps/<year>` therefore replaces the live homepage.

## 3. Portals and leaderboard

The year and the WhatsApp community link are hard-coded in several places.

- [ ] **Event portal**: `index.html` (title, `og:title`), `src/pages/team-registered.jsx` (page title and the WhatsApp link opened after registration), `src/constants/hyperlinks.js` (`whatsappLink`). Both WhatsApp links must be the new edition's group.
- [ ] **Admin portal**: `index.html` (title, `og:title`).
- [ ] **Leaderboard**: `index.html` (`og:title`). After the event, `src/pages/hall-of-fame.jsx` (year and title) and the default `year` in `src/store/api/leaderboard/index.js`.
- [ ] **Scorekeeper**: the year in the submission email text, `src/scripts/email-workflow-url.js`.

The backend's email templates use the current year automatically.

## 4. Backend and database

Each edition gets its own database on the same Atlas cluster (`2023`, `2024`, `2025`, `bashaway-2026`, ...). The database name is the path of `MONGO_URI`. Never point a new edition at the previous edition's database: past teams would block new registrations with the same email, and the old submissions are needed for archiving.

- [ ] **Point your local `.env` at the new database first.** `npx migrate-mongo` reads `MONGO_URI` from `.env`, and the first migration runs `settings.deleteMany({})`. Running it while `.env` still names the previous database wipes that database's settings. Check the database name before every migration.
- [ ] `MONGO_URI=<uri ending in /<new-db>> npx migrate-mongo up` creates the settings document.
- [ ] Set the dates in the `settings` document. Dates are stored in UTC; Sri Lanka is UTC+5:30, so 23:59 IST is 18:29 UTC.

  | Field                                          | Set to                                                   | What happens if it is wrong                                                                                                       |
  | ---------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
  | `registration_deadline`                        | Registration close, same moment as the website countdown | `null` or a past date rejects every signup with "Registration closed"                                                             |
  | `round_breakpoint`                             | `null` until the final round is scheduled                | A past date makes the portal show the "Congratulations on making it to the final round" form to every team as soon as they log in |
  | `submission_deadline`                          | End of the competition, set before round 1               | A past date keeps the submit button disabled                                                                                      |
  | `leaderboard.freezed`, `leaderboard.freeze_at` | Leave `freezed: false` until the final                   | Hides the top scores when frozen                                                                                                  |

  The migrations fill these with 2023 dates. Overwrite all of them.

- [ ] **Admin accounts.** Copy the `ADMIN` users from the previous database (they keep their passwords), or create them through the admin portal. `POST /api/users` needs an existing admin, or the `API_ACCESS_KEY` header for the very first one.
- [ ] **Test the Gmail login** before deploying. `authRegister` saves the team and then sends the verification email with no error handling, so a mail failure returns 500 to the team even though their account was created.
- [ ] **Deploy.** Only `MONGO_URI` normally changes between editions:

  ```bash
  gcloud run services update bashaway-prod --region asia-southeast1 \
    --update-env-vars "^##^MONGO_URI=<uri ending in /<new-db>>"
  ```

  The `^##^` prefix stops gcloud from splitting the value on commas. Note the revision that was serving before the update; rolling back takes seconds:

  ```bash
  gcloud run services update-traffic bashaway-prod --region asia-southeast1 --to-revisions=<previous-revision>=100
  ```

- [ ] The service creates the collection indexes (unique team name and email) on startup. Check they exist in the new database.

## 5. End-to-end test before announcing

- [ ] Register a test team at `portal.bashaway.sliitfoss.org/register`.
- [ ] The verification email arrives in the inbox, says the new year, and its link points to `api.bashaway.sliitfoss.org`. The link works once; opening it a second time shows "Verification Failed", which is expected.
- [ ] Log in. No popups should appear (see `round_breakpoint`).
- [ ] The WhatsApp button after registration opens the new group.
- [ ] Delete the test team from the new database.

## 6. Before round 1

- [ ] Upload the questions through the admin portal.
- [ ] Refresh the Azure SAS tokens in the Cloud Run environment (`AZURE_CHALLENGE_UPLOAD_SAS_TOKEN`, `AZURE_SOLUTION_DOWNLOAD_SAS_TOKEN`). The Azure account with storage access needs data-plane permissions, or use `--auth-mode key` with the Azure CLI.
- [ ] Set `submission_deadline`, and `round_breakpoint` once the final is scheduled.

## 7. After the event

- [ ] Archive the questions and accepted solutions into `sliit-foss/bashaway-challenges` under `<year>/<difficulty>/<challenge>/`, following the existing years. Submissions are stored in blob storage as `solutions/<team>/<timestamp>/`, so match them to challenges using the `submissions` collection.
- [ ] Update the leaderboard's hall of fame.
- [ ] Keep the edition's database. It is the only record of which submission belongs to which challenge.
