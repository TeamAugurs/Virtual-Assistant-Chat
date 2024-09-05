const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/db').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api', apiRoutes);

const port = process.env.PORT || 5003;
app.listen(port, () => console.log(`Server running on port ${port}`));
