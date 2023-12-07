require("dotenv").config();
const app = require("express")();
const weatherRoute = require("./routes");
const responseCreator = require("./utils/responseCreator");
const cors = require("cors");
const axios = require("axios");
// const connection = require("../database/config");

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "";

// connection.query("SELECT * FROM your_table", (err, results) => {
//   if (err) throw err;
//   console.log(results);
// });

app.use(cors());

app.use("/weather", weatherRoute);

// app.use("/weather", async (req, res) => {
//   try {
//     const url = `https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-${req.query.lat}-${req.query.lon}.xml`;
//     const result = await axios.get(url);
//     const weathers = xmlJs.xml2js(result.data, { compact: true, spaces: 2 });
//     return res.status(200).send(responseCreator({ data: weathers }));
//   } catch (e) {
//     const status = e.response?.status === 404 ? 404 : 500;
//     const message = status === 404 ? "Not found" : "Something went wrong";
//     return res.status(status).send(responseCreator({ message }));
//   }
// });

app.all("* ||", (req, res) => {
  return res.status(404).send(responseCreator({ message: "Not found" }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
