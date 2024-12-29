const { db } = require('../config/firebase-admin');
const admin = require('firebase-admin');

// Get all orders for a user
exports.getOrders = async (req, res) => {
  try {
    const ordersSnapshot = await db.collection('orders')
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .get();
    
    const orders = ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific order
exports.getOrderById = async (req, res) => {
  try {
    const doc = await db.collection('orders').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      userId: req.user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await db.collection('orders').add(orderData);
    const doc = await docRef.get();
    res.status(201).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order status
exports.updateOrder = async (req, res) => {
  try {
    const updates = {
      status: req.body.status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('orders').doc(req.params.id).update(updates);
    const doc = await db.collection('orders').doc(req.params.id).get();
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 