const express = require('express');
const app = express();
const connectDB = require('./config/db');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

connectDB();

//init middleware to allow us to get data in req.body, or else we get undefined
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/avatar', require('./routes/api/avatar'));
app.use('/api/quote', require('./routes/api/quote'));
app.use('/api/symbol', require('./routes/api/symbol'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/balance', require('./routes/api/balance'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
