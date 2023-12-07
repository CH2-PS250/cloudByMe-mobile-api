const router = require("express").Router(),
  controller = require("./weather");

router
  .get("/:province", controller.getByProvince)
  .get("/:province/:city", controller.getByCity);
// .get("/", controller.getByCurrentLocation);

module.exports = router;
