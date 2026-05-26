module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Firebase public config — safe to expose to client.
  // Security is enforced via Firebase Security Rules, not by hiding these values.
  res.status(200).json({
    apiKey:      process.env.FIREBASE_API_KEY      || '',
    authDomain:  process.env.FIREBASE_AUTH_DOMAIN  || '',
    projectId:   process.env.FIREBASE_PROJECT_ID   || '',
    databaseURL: process.env.FIREBASE_DATABASE_URL || '',
  });
};
