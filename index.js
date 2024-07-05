const express = require("express");
const dotenv = require("dotenv");
const app = express();

require("./start/routes")(app);
/*ENV Config */
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    status: errStatus,
    message: errMsg,
  });
});


try {
  app.listen(PORT);
  console.log("Server started on port:", PORT);
} catch (error) {
  console.error("ERROR: ", error);
}
