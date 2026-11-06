# Hari Documentation - Netlify version

Static website (`public/`) + one serverless function (`netlify/functions/api.mjs`).
Content and enquiries are stored in Netlify Blobs (free, built in). No database needed.

## Deploy (GitHub method, recommended)
1. Create a GitHub repo and push this folder.
2. Netlify -> Add new site -> Import from Git -> pick the repo. Build settings are read from netlify.toml (nothing to type).
3. Site configuration -> Environment variables -> add `ADMIN_PASSWORD` = your own password. (Without it the password is admin123.)
4. Deploys -> Trigger deploy (so the variable is picked up).
5. Open your site. Admin panel: yourdomain/admin

## Deploy (Netlify CLI method)
    npm install
    npm install -g netlify-cli
    netlify login
    netlify init          (create & link a new site)
    netlify env:set ADMIN_PASSWORD "your-password"
    netlify deploy --prod

Note: plain drag-and-drop of the folder does NOT install dependencies, so the API won't work that way. Use GitHub or CLI.

## Local test
    npm install -g netlify-cli
    npm install
    netlify dev           (http://localhost:8888, admin password: admin123)

## Where things are
- public/*.html, css/, js/, images/ : the website
- netlify/functions/api.mjs : backend (data, enquiry form, admin login)
- netlify/default-data.json : starting content (after the first save in /admin, content is stored in Blobs)
- netlify.toml : build + /admin redirect + security headers
