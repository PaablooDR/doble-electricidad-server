const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { checkToken } = require('../utils/middleware');

// Return a list of all invoices
router.get('/invoices', invoiceController.getAllInvoices);

// Create a new invoice
router.post('/invoices', checkToken, invoiceController.createInvoice);

module.exports = router;