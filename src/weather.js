const axios = require("axios").default;
const xmlJs = require("xml-js");
const toUpperFirstLetterWords = require("./utils/toUpperFirstLetterWords");
const refactJsonWeather = require("./utils/refactJsonWeather");
const responseCreator = require("./utils/responseCreator");

const getWeatherData = async (province) => {
  const url = `https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-${toUpperFirstLetterWords(
    province
  )}.xml`;
  const result = await axios.get(url);
  const weathers = xmlJs.xml2js(result.data, { compact: true, spaces: 2 });
  return refactJsonWeather(weathers);
};

const getByProvince = async (req, res) => {
  try {
    const refactoredJsonWeathers = await getWeatherData(req.params.province);
    return res
      .status(200)
      .send(responseCreator({ data: refactoredJsonWeathers }));
  } catch (error) {
    const status = error.response?.status === 404 ? 404 : 500;
    const message = status === 404 ? "Not found" : "Something went wrong";
    return res.status(status).send(responseCreator({ message }));
  }
};

const getByCity = async (req, res) => {
  try {
    const refactoredJsonWeathers = await getWeatherData(req.params.province);
    const weatherByCity = refactoredJsonWeathers.areas.find(
      (area) =>
        area.description == toUpperFirstLetterWords(req.params.city, "-", " ")
    );

    if (!weatherByCity) {
      return res.status(404).send(responseCreator({ message: "Not found" }));
    }

    return res.status(200).send(responseCreator({ data: weatherByCity }));
  } catch (error) {
    return res
      .status(500)
      .send(responseCreator({ message: "Something went wrong" }));
  }
};

//izinkan lokasi saat ini
// const getByCurrentLocation = async (req, res) => {
//   try {
//     const getWeatherDataByCoords = async (lat, lon) => {
//       const url = `https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-${lat}-${lon}.xml`;
//       try {
//         const response = await axios.get(url);
//         const result = await xml2js.parseStringPromise(response.data);
//         return result;
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     const refactoredJsonWeathers = await getWeatherDataByCoords(
//       req.query.lat,
//       req.query.lon
//     );
//     return res
//       .status(200)
//       .send(responseCreator({ data: refactoredJsonWeathers }));
//   } catch (error) {
//     const status = error.response?.status === 404 ? 404 : 500;
//     const message = status === 404 ? "Not found" : "Something went wrong";
//     return res.status(status).send(responseCreator({ message }));
//   }
// };

module.exports = { getByProvince, getByCity };
