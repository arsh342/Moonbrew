const { db } = require('../config/firebase-admin');

// Get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const menuSnapshot = await db.collection('menuItems').get();
    const menuItems = menuSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const docRef = await db.collection('menuItems').add(req.body);
    const doc = await docRef.get();
    res.status(201).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    await db.collection('menuItems').doc(req.params.id).update(req.body);
    const doc = await db.collection('menuItems').doc(req.params.id).get();
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    await db.collection('menuItems').doc(req.params.id).delete();
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 