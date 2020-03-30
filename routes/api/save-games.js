const express = require("express");
const router = express.Router();
const User = require("../../models/user-model");

router.post('/', (req, res) => {
console.log("WOOOOT");
console.log(req.body);


})

module.exports = router;