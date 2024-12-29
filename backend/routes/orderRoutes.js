const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrder, getOrderById } = require('../controllers/orderController');

// GET /api/orders - Get all orders for a user
router.get('/', getOrders);

// GET /api/orders/:id - Get specific order
router.get('/:id', getOrderById);

// POST /api/orders - Create new order
router.post('/', createOrder);

// PUT /api/orders/:id - Update order status
router.put('/:id', updateOrder);

module.exports = router; 