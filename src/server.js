require("dotenv").config();
const app = require("express")();
const weatherRoute = require("./routes");
const responseCreator = require("./utils/responseCreator");
const cors = require("cors");

const PORT = process.env.PORT;

app.use(cors());

app.use("/weather", weatherRoute);

app.all("* ||", (req, res) => {
  return res.status(404).send(responseCreator({ message: "Not found" }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
