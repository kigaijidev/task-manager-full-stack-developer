'use strict'
const { CREATED, OK, SuccessResponse } = require('../core/success.response')
const TodoService = require('../services/todo.service')

class TodoController {

    create = async (req, res, next) => {
        new CREATED({
            message: 'Create Todo Success', 
            metadata: await TodoService.create({ 
                ...req.body,
                userId: req.user.UserID
            })
        }).send(res)
    }

    update = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update Todo Success', 
            metadata: await TodoService.update({ 
                ...req.body,
                todoId: req.params.todoId,
                userId: req.user.UserID
            })
        }).send(res)
    }

    updateStatus = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update status Todo Success', 
            metadata: await TodoService.updateStatus({ 
                todoId: req.params.todoId,
                userId: req.user.UserID
            })
        }).send(res)
    }

    delete = async (req, res, next) => {
        new CREATED({
            message: 'Delete Todo Success', 
            metadata: await TodoService.delete({ 
                todoId: req.params.todoId,
                userId: req.user.UserID
            })
        }).send(res)
    }

    findAll = async (req, res, next) => {
        new CREATED({
            message: 'Find all Todo Success', 
            metadata: await TodoService.getAll(req.user.UserID)
        }).send(res)
    }

}

module.exports = new TodoController()
