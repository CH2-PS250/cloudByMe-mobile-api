const router = require("express").Router(),
  controller = require("./weather");

router
  .get("/:province", controller.getByProvince)
  .get("/:province/:city", controller.getByCity);

module.exports = router;
