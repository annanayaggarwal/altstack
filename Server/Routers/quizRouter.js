const express = require("express");

const router = express.Router();
const { quiz, submit } = require("../Controllers/quizController");


router.get("/quiz", quiz); 
router.post("/submit", submit);


module.exports = router;
