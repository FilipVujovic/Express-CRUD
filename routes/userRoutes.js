const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/signup", async (req, res, next) => {
  try {
    const serviceResponse = await userService.createUser(
      req.body.email, 
      {
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      }
    );

    res.status(201).json({
        rowCount: serviceResponse.rowCount
    });

  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
    try {
        const signInServiceResponse = await userService.signIn(req.body.email, req.body.password);
        res.json({
            token: signInServiceResponse
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;
