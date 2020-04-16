let express = require("express");
let router = express.Router();
let { getProfile } = require("../../model/index");

router.get("/profile/:id", async (req, res, next) => {
  console.log(req.body, req.params);
  const { id } = req.params;
  try {
    let response = await getProfile(id);
    res.status = 200;
    res.set("Content-Type", "application/json");
    res.send({
      data: response,
      error: 0,
    });
  } catch (err) {
    console.log("get profile err", err);
    res.status = 200;
    res.set("Content-Type", "text/html");
    res.send({
      error: 1,
    });
  }
  next();
});

router.get("/test", async (req, res, next) => {
  console.log(req);
  res.status = 200;
  res.set("Content-Type", "application/json");
  res.send({
    success: 1,
  });
  next();
});

module.exports = router;
