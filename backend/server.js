require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

const db = admin.firestore();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Menu Routes
app.get('/api/menu', async (req, res) => {
  try {
    const menuSnapshot = await db.collection('menu').get();
    const menuItems = menuSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const newItem = req.body;
    const docRef = await db.collection('menu').add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = req.body;
    await db.collection('menu').doc(id).update(updatedItem);
    res.json({ id, ...updatedItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('menu').doc(id).delete();
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Order Routes
app.get('/api/orders', async (req, res) => {
  try {
    const ordersSnapshot = await db.collection('orders').get();
    const orders = ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = req.body;
    const docRef = await db.collection('orders').add(newOrder);
    res.status(201).json({ id: docRef.id, ...newOrder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = req.body;
    await db.collection('orders').doc(id).update(updatedOrder);
    res.json({ id, ...updatedOrder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User Routes
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await db.collection('users').doc(id).get();
    if (!userDoc.exists) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ id: userDoc.id, ...userDoc.data() });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = req.body;
    const docRef = await db.collection('users').add(newUser);
    res.status(201).json({ id: docRef.id, ...newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    await db.collection('users').doc(id).update(updatedUser);
    res.json({ id, ...updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});