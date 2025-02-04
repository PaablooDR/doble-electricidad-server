const User = require('../models/user');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            date_signup: new Date(),
            address
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Datos recibidos:", req.body);

        const user = await User.findOne({ email });
        console.log("Datos user:", user);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        res.status(200).json({ 
            message: 'Login succesful', 
            token: createToken(user)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

function createToken(user) {
    const payload = {
        user_id: user._id,
    }

    return jwt.sign(payload, 'doble-electricidad');
}
