const Invoice = require('../models/invoice');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({}).populate('user');
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createInvoice = async (req, res) => {
    try {
        const { holder_name, date, amount, address } = req.body;

        const newInvoice = new Invoice({
            holder_name,
            date: new Date(),
            amount,
            address
        });

        const savedInvoice = await newInvoice.save();

        res.status(201).json(savedInvoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};