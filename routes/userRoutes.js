const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/signup", async (req, res) => {
  try {
    const serviceResponse = await userService.createUser(
      req.body.email,
      req.body.password
    );

    res.status(201).json({
        rowCount: serviceResponse.rowCount
    });

  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.post("/signin", async (req, res, next) => {
    try {
        const signInServiceResponse = await userService.signIn(req.body.email, req.body.password);
        res.json({
            token: signInServiceResponse
        });
    } catch (error) {
        console.log(JSON.stringify(error));
        next(error);
    }
})

module.exports = router;
