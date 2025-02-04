const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const userRouter = require('./routes/user');
const invoiceRouter = require('./routes/invoice');
const User = require('./models/user');
const Invoice = require('./models/invoice');

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware para el uso de JSON
app.use(express.json());

// Habilita CORS para todas las solicitudes
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/doble-electricidad', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting MongoDB:'));
db.once('open', () => console.log('Succesfull connection with MongoDB'));

// Rutas
app.use(userRouter);
app.use(invoiceRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Server is working!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server executing in port ${PORT}`);
});
