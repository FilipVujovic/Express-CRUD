const express = require('express');
const userRoutes = require('../routes/userRoutes');

module.exports = (app) => {
    app.use(express.json());
    app.use("/user", userRoutes);
};