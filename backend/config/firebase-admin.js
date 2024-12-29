const admin = require('firebase-admin');

// Initialize Firebase Admin only if it hasn't been initialized
if (!admin.apps.length) {
  const serviceAccount = require('../serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = { admin, db }; 