'use strict'

const express = require('express')
const TodoController = require('../../controllers/todo.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { verifyJWT } = require('../../auth/authUtils')
const router = express.Router()

router.use(verifyJWT)

router.post('', asyncHandler(TodoController.create))
router.delete('/:todoId', asyncHandler(TodoController.delete))
router.patch('/update-status/:todoId', asyncHandler(TodoController.updateStatus))
router.patch('/:todoId', asyncHandler(TodoController.update))
router.get('', asyncHandler(TodoController.findAll))

module.exports = router
