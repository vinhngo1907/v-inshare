# 📦 Tasks - File Upload with URL Shortener

A simple file upload system that generates a link which expires in **24 hours**, with an **optional URL shortener** feature using custom `slug`.

---

### Backend
1. get /:id
2. post /:id
3. check existed slug
4. save to db
4. redirect to url

### Frontend
1. index.html
2. show input
3. upload (drop&drag) file, show url
4. input slug - url shortener (option)
4. axios request - fetch
5. ok? show url, disable form
6. error? show error
7. Send email

### Members: 1fe 1be


---

## ⚙️ **Deployment**

### ✅ **Backend: Render**

- Deploy the Node.js server to [Render](https://render.com).
- Add environment variables:
  - `MONGO_URI`
  - `PORT`
- Connect a custom domain if needed.

### ✅ **Frontend: Netlify**

- Deploy static frontend (React, Vite, or plain HTML) to [Netlify](https://www.netlify.com).
- Connect backend API with a proxy rule (`/api/*`).

---

## 🔄 **CI/CD**

### ✅ **Netlify Deploy Preview**

- Auto-build on **`develop`** branch.
- `main` branch is the production default.
- Each Pull Request gets a Deploy Preview link.

### ✅ **Render Auto Deploy**

- Connect the backend repo to Render.
- Enable automatic deploys from `main`.
- Merging `develop` → `main` triggers production deployment.

---

## ✅ **Tech Stack**

- **Node.js** / **Express**
- **MongoDB** (with TTL index for auto-expiry)
- **React** (or plain HTML)
- **axios** or **fetch**

---

## ✅ **Run locally**

```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run start
```


---

## ✅ **Notes**

- 100% **English**, clear and professional.
- Explains **backend**, **frontend**, **deployment**, **CI/CD**, and **local dev**.
- Short, actionable sections — easy for your team or collaborators.

---