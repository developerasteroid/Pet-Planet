const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const {PORT} = require('./src/constants');
require('./src/config/db_connect');

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', require('./src/routes/authRoutes'));


app.listen(PORT, () =>{
    console.log(`app.js is listening at port: ${PORT}`);
})