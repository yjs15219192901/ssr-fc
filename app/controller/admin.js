let express = require("express");
let router = express.Router();
let { adminGetActivityList } = require("../../model/index");
let { prefix } = require("../../web/utils");

router.get("/act_list", async (req, res) => {
  console.log(req.cookies);
  res.send("hello world");
});

module.exports = router;
