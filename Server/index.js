const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const quizrouter = require("./Routers/quizRouter");

app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/v1/api", quizrouter);

const PORT = process.env.PORT||3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});