'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { verifyJWT } = require('../../auth/authUtils')
const router = express.Router()

router.post('/auth/signup', asyncHandler(accessController.signUp))
router.post('/auth/login', asyncHandler(accessController.login))

router.use(verifyJWT)

router.post('/auth/logout', asyncHandler(accessController.logout))
router.patch('/auth/change-password', asyncHandler(accessController.changePassword))

module.exports = router
