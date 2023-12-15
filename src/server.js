require("dotenv").config();
const app = require("express")();
const weatherRoute = require("./routes");
const responseCreator = require("./utils/responseCreator");
const cors = require("cors");
// const dbConnection = require('../database/dbConnection')

const PORT = process.env.PORT || 4000;
const BASE_URL = process.env.BASE_URL || "";

// app.get('/', (req, res) => {
//   dbConnection.query('SELECT * FROM nama_tabel', (error, results, fields) => {
//     if (error) {
//       res.status(500).send('Error in database operation');
//     } else {
//       res.json(results);
//     }
//   });
// });

app.use(cors());

app.use("/weather", weatherRoute);

app.all("* ||", (req, res) => {
  return res.status(404).send(responseCreator({ message: "Not found" }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const getWeatherData = require('./getWeatherData');

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   getWeatherData().then((weatherData) => {
//     socket.emit('weather update', weatherData);
//   });
// });
