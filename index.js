const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
require("./startup/setup")(app);

dotenv.config();
const PORT = process.env.PORT || 3000;


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API Greenstate task',
    version: '1.0.0',
    description: 'This is a CRUD API that operates on the task-user database'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


try {
  app.listen(PORT);
  console.log("Server started on port:", PORT);
} catch (error) {
  console.error("ERROR: ", error);
}
