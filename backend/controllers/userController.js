const { admin, db } = require('../config/firebase-admin');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password
    });
    
    await db.collection('users').doc(userRecord.uid).set({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.user.uid).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('users').doc(req.user.uid).update(updates);
    const doc = await db.collection('users').doc(req.user.uid).get();
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 