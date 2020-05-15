const express = require('express');
const app = express();
const connectDB = require('./config/db');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

connectDB();

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/avatar', require('./routes/api/avatar'));
app.use('/api/transactions', require('./routes/api/transactions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
