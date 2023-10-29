'use strict'

const express = require('express')
const PaymentController = require('../../controllers/payment.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { verifyJWT } = require('../../auth/authUtils')
const { permission } = require('../../auth/checkAuth')
const router = express.Router()

router.use(verifyJWT)

router.get('', asyncHandler(PaymentController.findPaymentByUser))
router.patch('', asyncHandler(PaymentController.updateInfo))

router.use(permission(1111))

router.patch('/currency/:userId', asyncHandler(PaymentController.increaseCurrencyForAdmin))

module.exports = router
