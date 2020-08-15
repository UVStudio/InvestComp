const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
const methodOverride = require('method-override');

//security libraries
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

app.use(methodOverride('_method'));

connectDB();

//init middleware to allow us to get data in req.body, or else we get undefined
app.use(express.json({ extended: false }));

// //Sanitize data
// app.use(mongoSanitize());

// //Set security headers
// app.use(helmet());

// // //Prevents cross-site scripting attacks
// app.use(xss());

//Prevent http param pollution
app.use(hpp());

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/avatar', require('./routes/api/avatar'));
app.use('/api/quote', require('./routes/api/quote'));
app.use('/api/symbol', require('./routes/api/symbol'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/balance', require('./routes/api/balance'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
