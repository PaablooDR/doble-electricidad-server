const Invoice = require('../models/invoice');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({});
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createInvoice = async (req, res) => {
    try {
        const { holder_name, date, amount, address } = req.body;

        console.log("Datos recibidos:", req.body);

        // const existingInvoice = await Invoice.findOne({ email });
        // if (existingInvoice) {
        //     return res.status(400).json({ message: 'Email already exists' });
        // }

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