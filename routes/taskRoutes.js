const express = require("express");
const router = express.Router();
const taskService = require("../services/taskService");
const auth = require('../middleware/auth');
const { taskValidator } = require('../validators/taskValidator')
const { validationResult } = require('express-validator');

router.post('/', auth.authentication, taskValidator, async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const postServiceResponse = await taskService.createTask(req.body, req.user);
            console.log(postServiceResponse);
            res.status(201).json({
                rowCount: postServiceResponse.rowCount
            });
        } catch (error) {
            next(error);
        }
    } else {
        res.status(422).json({
            validationErrors: errors.array()
        });
    }

});

router.get('/:id', auth.authentication, async (req, res, next) => {
    try {
        const getServiceResponse = await taskService.getTaskById(req.params.id, req.user);
        res.status(200).json(getServiceResponse);
    } catch (error) {
        next(error)
    }
});

router.get('/', auth.authentication, async (req, res, next) => {
    try {
        const getAllServiceResponse = await taskService.getAllTasks(req.user);
        res.status(200).json(getAllServiceResponse);
    } catch (error) {
        next(error);
    }
});

router.put('/', auth.authentication, async (req, res, next) => {
    try {
        const updateServiceResponse = await taskService.updateTask(req.body, req.user);
        res.status(200).json({
            rowCount: updateServiceResponse.rowCount
        })
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', auth.authentication, async (req, res, next) => {
    try {
        const deleteServiceResponse = await taskService.deleteTask(req.params.id, req.user);
        res.status(200).json({
            rowCount: deleteServiceResponse.rowCount
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;