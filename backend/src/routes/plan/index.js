'use strict'

const express = require('express')
const SubScriptionPlansController = require('../../controllers/plan.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { verifyJWT } = require('../../auth/authUtils')
const { permission } = require('../../auth/checkAuth')
const router = express.Router()

router.get('/', asyncHandler(SubScriptionPlansController.findAllPlan))

router.use(verifyJWT)
router.use(permission(1111))

router.post('/', asyncHandler(SubScriptionPlansController.create))
router.patch('/:planId', asyncHandler(SubScriptionPlansController.update))
router.delete('/:planId', asyncHandler(SubScriptionPlansController.delete))

module.exports = router
