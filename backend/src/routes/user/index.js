'use strict'

const express = require('express')
const UserController = require('../../controllers/user.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { verifyJWT } = require('../../auth/authUtils')
const { permission } = require('../../auth/checkAuth')
const router = express.Router()

router.use(verifyJWT)

router.get('/info', asyncHandler(UserController.findOneByUser))

router.use(permission(1111))

router.get('', asyncHandler(UserController.findAll))
router.delete('/:userId', asyncHandler(UserController.deleteByAdmin))
router.patch('/active/:userId', asyncHandler(UserController.activeUser))

module.exports = router
