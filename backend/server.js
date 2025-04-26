const express = require('express'); const cors = require('cors'); const bodyParser = require('body-parser'); const db = require('./config/db');

const app = express();

app.use(cors()); app.use(bodyParser.json());

// Routes 
app.use('/users', require('./routes/users')); 

app.use('/purchases', require('./routes/purchases'));

app.listen(3000, () => { console.log('Serveur lancé sur http://localhost:3000'); });

app.use('/products', require('./routes/products'));

app.use('/auth', require('./routes/auth'));

