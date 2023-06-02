const express = require('express');
require('dotenv').config();
const rotuer = require('./routes/contactRoutes')
const userRoutes = require('./routes/userRoutes')
const errorHandler = require ('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use('/api/contacts', rotuer)
app.use('/api/users', userRoutes)
app.use(errorHandler)

app.listen(port, ()=> {
    // console.log(testA)
    console.log(`Listening on ${port}`);
})