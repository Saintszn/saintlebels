const express = require("express");
const { initiateSTKPush } = require("../controllers/paymentController");

const router = express.Router();

router.post("/pay", initiateSTKPush);

module.exports = router;
