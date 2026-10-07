# Dropzone

A simple, account-free file-sharing page backed by Vercel Blob.

## Deploy with Vercel

1. Import this repository into Vercel.
2. In the Vercel project, open **Storage** and create a **Blob** store.
3. Connect the Blob store to the project. Vercel will add `BLOB_READ_WRITE_TOKEN` automatically.
4. Deploy. The home page is `newfile.html` (the root `index.html` redirects to it).
5. Add your custom domain under **Settings → Domains**.

The upload API accepts `POST /api/upload?filename=...` and returns the public Blob URL. Files are limited to 2 GB by the interface and API endpoint. Vercel Blob retention and bandwidth costs apply.

## Local development

Install Node.js and the Vercel CLI, then run:

```bash
npm install
npx vercel login
npm run dev
```

Use a linked Vercel project with a Blob store for local uploads.
