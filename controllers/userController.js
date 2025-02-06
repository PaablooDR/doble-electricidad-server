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
            address,
            admin: false
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUser = async(req, res) => {
    try {
        const userId = jwt.decode(req.headers['authorization']);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        if (!user.admin) {
            return res.status(403).json({ message: 'Access denied. Admins only' });
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

exports.editUser = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        const userId = jwt.decode(req.headers['authorization']);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (address) user.address = address;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
