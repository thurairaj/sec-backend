const express = require("express");
const x = require("../config/authentication");

const router = express.Router();

router.get("/", x.isAuthenticated, async (req, res) => {
    console.log(req.user);
    res.status(200).json({success: true})
})


module.exports = router;