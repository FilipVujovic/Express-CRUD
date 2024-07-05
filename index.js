const express = require("express");
const dotenv = require("dotenv");
const app = express();
require("./startup/setup")(app);

dotenv.config();
const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT);
  console.log("Server started on port:", PORT);
} catch (error) {
  console.error("ERROR: ", error);
}
