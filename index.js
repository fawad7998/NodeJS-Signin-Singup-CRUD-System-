const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const userRoute = require('./routes/userRoute');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1', userRoute);

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

app.get('/', (req, res) => {
  res.send('API is working');
});
app.listen(4040, () => {
  console.log('Server is running on port 4040');
});
