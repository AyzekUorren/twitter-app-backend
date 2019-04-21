module.exports = {
  port: process.env.PORT || 5000,
  mongourl: process.env.DB_URL || `mongodb://localhost/twitter-app`,
  defaultUrl: process.env.URL || "localhost",
  secret: process.env.secret || "dev",
  name: process.env.name || "dev",
  jwtSecret: process.env.jwtSecret || "dev",
  cookie_secret: process.env.cookie_secret || "dev",
  cookie_name: process.env.cookie_name || "Twitter-app"
};
