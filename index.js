const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const userRoute = require('./routes/userRoute');
const aggRoute = require('./routes/aggrigateRoute');
const sessionRoute = require('./routes/sessionRoute');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1', userRoute);
app.use('/api/v1', aggRoute);
app.use('/api/v1', sessionRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the Express API!');
});
mongoose
  .connect(
    'mongodb+srv://fawad7998:fawad7998@cluster0.jueeg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('Db is connected');
  })
  .catch((err) => {
    console.log(err, 'Db is not connected');
  });
app.listen('3000', () => {
  console.log('Port is Running on 3000');
});

module.exports = app;
