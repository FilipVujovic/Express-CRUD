const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const {
  signInValidator,
  signUpValidator,
} = require("../validators/userValidator");
const { validationResult } = require("express-validator");
/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create account.
 *     description: Create an account for a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email of the user.
 *                 example: filip.vujovic@gmail.com
 *               password:
 *                 type: string
 *                 description: password of the user.
 *                 example: password
 *               passwordConfirmation:
 *                 type: string
 *                 description: password confirmation of the user - must be the same as password above.
 *                 example: password
 *     responses:
 *       200:
 *         description: Row count - Represents the ammount of affected rows in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rowCount:
 *                        type: integer
 *                        example: 1
 *       400:
 *         description: Bad request - Passwords do not match / Email is taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                        type: integer
 *                        example: 400
 *                 message:
 *                        type: string
 *                        example: Passwords do not match.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                        type: integer
 *                        example: 500
 *                 message:
 *                        type: string
 *                        example: Something went wrong on the server.
 */
router.post("/signup", signUpValidator, async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    try {
      const serviceResponse = await userService.createUser(req.body.email, {
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation,
      });

      res.status(201).json({
        rowCount: serviceResponse.rowCount,
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(422).json({
      validationErrors: errors.array(),
    });
  }
});
/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Sign in.
 *     description: Signs in with valid credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email of the user.
 *                 example: filip.vujovic@gmail.com
 *               password:
 *                 type: string
 *                 description: password of the user.
 *                 example: password
 *     responses:
 *       200:
 *         description: Returns JWT token with encoded details of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                        type: string
 *                        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwYWE0MzViLWM5ZGItNDRjMi1hMWJjLTYxNTMzMDI2ZTk2MyIsImVtYWlsIjoiZmlsaXAudnVqb3ZpY0BnbWFpbC5jb20iLCJpYXQiOjE3MjAxOTg3Mjl9.o3JObzcxcpEG-hrt577GFAYGvQ7rCtmmMBFK64UVRps
 *       400:
 *         description: Bad request - Incorrect username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                        type: integer
 *                        example: 400
 *                 message:
 *                        type: string
 *                        example: Incorrect username or password.
 *       404:
 *         description: Bad request - Account with this email does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                        type: integer
 *                        example: 404
 *                 message:
 *                        type: string
 *                        example: An account with this e-mail does not exist.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                        type: integer
 *                        example: 500
 *                 message:
 *                        type: string
 *                        example: Something went wrong on the server.
 */
router.post("/signin", signInValidator, async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const signInServiceResponse = await userService.signIn(
        req.body.email,
        req.body.password
      );
      res.json({
        token: signInServiceResponse,
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(422).json({
      validationErrors: errors.array(),
    });
  }
});

module.exports = router;
