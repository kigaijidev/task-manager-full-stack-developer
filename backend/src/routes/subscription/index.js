'use strict'

const express = require('express')
const SubScriptionController = require('../../controllers/subscription.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { verifyJWT } = require('../../auth/authUtils')
const router = express.Router()

router.use(verifyJWT)

router.patch('/cancel', asyncHandler(SubScriptionController.cancelPlan))
router.patch('/:planId', asyncHandler(SubScriptionController.upgrade))

module.exports = router
