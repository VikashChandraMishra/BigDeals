require("dotenv").config();

const cors = require('cors');
const bodyParser = require('body-parser')
const express = require('express');

const app = express();
const port = process.env.PORT;

const connectToMongo = require('./db.js');
connectToMongo();

// TO ALLOW CROSS-ORIGIN-RESOURCE-SHARING
app.use(cors());
app.use('/uploads', express.static('uploads'));

// TO MAKE RECEIVED DATA COMPREHENSIBLE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/save-data', require('./routes/register.js'));
app.use('/api/fetch-data', require('./routes/fetchData.js'));

// app.use('/api/save-data', require('./routes/saveData.js'));
// app.use('/api/fetch-stats', require('./routes/stats.js'));
// app.use('/api/user', require('./routes/user.js'));
// app.use('/api/eod', require('./routes/eod.js'));

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
}); 