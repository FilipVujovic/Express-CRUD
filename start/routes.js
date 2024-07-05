const express = require('express');
const userRoutes = require('../routes/userRoutes');
const taskRoutes = require('../routes/taskRoutes');
module.exports = (app) => {
    app.use(express.json());
    app.use("/user", userRoutes);
    app.use("/task", taskRoutes);
};