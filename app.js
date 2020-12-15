const express = require('express');
const app = express();
const port = 8000;

const path = require("path");

app.use('/', express.static('frontend'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/index.html'));
});

app.use(express.static(path.join(__dirname, )));

// app.use('/dice', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dice/d-twenty.obj'));
// })

app.listen(port, () => {
  console.log(`DanceDice listening on port ${port}!`)
})