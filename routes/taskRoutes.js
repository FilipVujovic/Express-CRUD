const express = require("express");
const router = express.Router();
const taskService = require("../services/taskService");
const auth = require('../middleware/auth');
const { taskValidator, taskUpdateValidator } = require('../validators/taskValidator')
const { validationResult } = require('express-validator');
/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a task.
 *     description: Creates a task with the provided body and takes the userid from the JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *                 example: Ticket0123
 *               description:
 *                 type: string
 *                 description: Description of the task
 *                 example: Description
 *               priority:
 *                 type: string
 *                 description: Priority of the task
 *                 example: low
 *               status:
 *                 type: string
 *                 description: Status of the task
 *                 example: in progress
 *     responses:
 *       201:
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
 *         description: Entered ilegal values for priority or status
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
 *                        example: Allowed values for status are done,in progress
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
 *       422:
 *         description: Validation errors of the body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 validationErrors:
 *                                  type: array
 *                                  items: 
 *                                       type: object
 *                                       properties: 
 *                                          type:
 *                                              type: string
 *                                              example: field
 *                                          value:
 *                                              type: string
 *                                              example: ""
 *                                          msg:
 *                                              type: string
 *                                              example: Status is required
 *                                          path:
 *                                              type: string
 *                                              example: status
 *                                          location:
 *                                              type: string
 *                                              example: body
*/
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
/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get a task by id.
 *     description: Returns the task with the specified id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the task to return.
 *         schema:
 *           type: UUID
 *     responses:
 *       200:
 *         description: Successful response - returns a task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                  type: UUID
 *                  example: 11efdd45-dcf5-4939-a174-3b0e2ee573e0
 *                 title:
 *                  type: string
 *                  example: testTaskTitle
 *                 description:
 *                  type: string
 *                  example: testTaskDescription
 *                 priority:
 *                  type: string
 *                  example: low
 *                 status:
 *                  type: string
 *                  example: done
 *                 userId:
 *                  type: UUID
 *                  example: b0aa435b-c9db-44c2-a1bc-61533026e963
 *       404:
 *         description: User does not have any tasks
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
 *                        example: This user does not have any tasks.
 *       401:
 *         description: Unauthorized request - No token provided/token userId and task userId do not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                        type: integer
 *                        example: 401
 *                 message: 
 *                        type: string
 *                        example: You do not have permissions to get this task.
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
router.get('/:id', auth.authentication, async (req, res, next) => {
    try {
        const getServiceResponse = await taskService.getTaskById(req.params.id, req.user);
        res.status(200).json(getServiceResponse);
    } catch (error) {
        next(error)
    }
});
/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get all tasks.
 *     description: Get all tasks - works by collecting the userId from the JWT token
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  type: object
 *                  properties:
 *                      id:
 *                       type: UUID
 *                       example: 11efdd45-dcf5-4939-a174-3b0e2ee573e0
 *                      title:
 *                       type: string
 *                       example: testTaskTitle
 *                      description:
 *                       type: string
 *                       example: testTaskDescription
 *                      priority:
 *                       type: string
 *                       example: low
 *                      status:
 *                       type: string
 *                       example: done
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
router.get('/', auth.authentication, async (req, res, next) => {
    try {
        const getAllServiceResponse = await taskService.getAllTasks(req.user);
        res.status(200).json(getAllServiceResponse);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /task:
 *   put:
 *     summary: Updates a task.
 *     description: Updates a task with new values sent in the body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: UUID of the task
 *                 example: 11efdd45-dcf5-4939-a174-3b0e2ee573e0
 *               title:
 *                 type: string
 *                 description: Title of the task
 *                 example: Ticket0123
 *               description:
 *                 type: string
 *                 description: Description of the task
 *                 example: Description
 *               priority:
 *                 type: string
 *                 description: Priority of the task
 *                 example: low
 *               status:
 *                 type: string
 *                 description: Status of the task
 *                 example: in progress
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
 *       404:
 *         description: This task does not exist
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
 *                        example: This task does not exist.
 *       400:
 *         description: Entered ilegal values for priority or status
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
 *                        example: Allowed values for status are done,in progress
 *       401:
 *         description: Token not found/You can not update this task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                        type: integer
 *                        example: 401
 *                 message: 
 *                        type: string
 *                        example: You can not update this task.
 *       422:
 *         description: Validation errors of the body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 validationErrors:
 *                                  type: array
 *                                  items: 
 *                                       type: object
 *                                       properties: 
 *                                          type:
 *                                              type: string
 *                                              example: field
 *                                          value:
 *                                              type: string
 *                                              example: ""
 *                                          msg:
 *                                              type: string
 *                                              example: Status is required
 *                                          path:
 *                                              type: string
 *                                              example: status
 *                                          location:
 *                                              type: string
 *                                              example: body
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
router.put('/', auth.authentication, taskUpdateValidator, async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const updateServiceResponse = await taskService.updateTask(req.body, req.user);
            res.status(200).json({
                rowCount: updateServiceResponse.rowCount
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
/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete a task by id.
 *     description: Returns the task with the specified id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the task to return.
 *         schema:
 *           type: UUID
 *     responses:
 *       200:
 *         description: Successful response - deleted a task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rowCount:
 *                        type: integer
 *                        example: 1
 *       404:
 *         description: User does not have any tasks
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
 *                        example: This task does not exist.
 *       401:
 *         description: Unauthorized request - No token provided/token userId and task userId do not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                        type: integer
 *                        example: 401
 *                 message: 
 *                        type: string
 *                        example: You can not delete this task.
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
router.delete('/:id', auth.authentication, async (req, res, next) => {
    try {
        const deleteServiceResponse = await taskService.deleteTask(req.params.id, req.user);
        res.status(200).json({
            rowCount: deleteServiceResponse.rowCount
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;