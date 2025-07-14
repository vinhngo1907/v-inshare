const apiUrl = process.env.NODE_ENV !== "production" 
? process.env.APP_BASE_URL 
: "https://mern-v-inshare.netlify.app"

module.exports = apiUrl;