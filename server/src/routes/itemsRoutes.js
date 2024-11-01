const express = require('express');
const { searchItems, getItemDetail } = require('../controllers/itemsController');

const router = express.Router();

// Rutas
router.get('/', searchItems);
router.get('/:id', getItemDetail);

module.exports = router;
