const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64a18ef99e689d8f3072ca9d',
  };

  next();
});

app.patch('/404', (req, res) => {
  res.status(404).json({
    message: 'Cannot PATCH /404',
  });
});

app.use(router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('слушаю порт 3000');
});
