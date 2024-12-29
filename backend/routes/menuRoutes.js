const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');

// GET /api/menu - Get all menu items
router.get('/', getMenuItems);

// POST /api/menu - Create new menu item (admin only)
router.post('/', createMenuItem);

// PUT /api/menu/:id - Update menu item (admin only)
router.put('/:id', updateMenuItem);

// DELETE /api/menu/:id - Delete menu item (admin only)
router.delete('/:id', deleteMenuItem);

module.exports = router; 