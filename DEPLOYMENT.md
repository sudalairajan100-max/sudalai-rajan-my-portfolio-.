# Deploying to GitHub Pages

## 1. Create the repository
1. Go to https://github.com/new
2. Repository name: `sudalai-rajan-portfolio`
3. Set it to **Public**. Do **not** add a README (this project already has one). Click **Create repository**.

## 2a. Upload with Git (recommended)
Open a terminal inside the extracted `sudalai-rajan-portfolio` folder:
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/sudalairajan100-max/sudalai-rajan-portfolio.git
git push -u origin main
```

## 2b. Upload without Git
On the new repository page click **uploading an existing file**, drag in **all files and folders inside** `sudalai-rajan-portfolio` (so `index.html` is at the top level), then click **Commit changes**.

## 3. Enable GitHub Pages
1. Repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)` → **Save**
4. Wait 1–3 minutes, then refresh the Pages settings to see the live link.

Your site should appear at:
`https://sudalairajan100-max.github.io/sudalai-rajan-portfolio/`

Open it and check every page before sharing the link.

## 4. Updating later
Edit files, then:
```bash
git add .
git commit -m "Describe your change"
git push
```

## Troubleshooting
- **404 page:** make sure `index.html` is in the repository root, not inside a sub-folder.
- **No styles:** check that the `assets` folder was uploaded and file names match exactly (they are case-sensitive).
- **Old version showing:** hard refresh with Ctrl+Shift+R.
