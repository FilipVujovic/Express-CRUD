const express = require("express");
const router = express.Router();
const taskService = require("../services/taskService");
const encryptPass = require('../utils/encrypt-pass');
const auth = require('../middleware/auth');

router.post('/', auth.authentication, async (req, res, next) => {
    try {
        const postServiceResponse = await taskService.createTask(req.body, req.user);
        console.log(postServiceResponse);
        res.status(201).json({
            rowCount: postServiceResponse.rowCount
        });
    } catch (error) {
        next(error);
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