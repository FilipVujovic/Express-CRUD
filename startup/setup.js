const express = require('express');
const userRoutes = require('../routes/userRoutes');
const taskRoutes = require('../routes/taskRoutes');
const errorHandler = require('../utils/error-handler');
const fallbackRoutes = require('../routes/fallbackRoutes');
module.exports = (app) => {
    app.use(express.json());
    app.use("/user", userRoutes);
    app.use("/task", taskRoutes);
    app.use("*", fallbackRoutes);
    app.use(errorHandler);

};