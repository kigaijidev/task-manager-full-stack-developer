'use strict'
const { CREATED, OK, SuccessResponse } = require('../core/success.response')
const PaymentService = require('../services/payment.service')

class PaymentController {

    updateInfo = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update Info payment Success', 
            metadata: await PaymentService.updateInfo({ 
                ...req.body,
                userId: req.user.UserID
            })
        }).send(res)
    }

    increaseCurrencyForAdmin = async (req, res, next) => {
        new SuccessResponse({
            message: 'Increase currency Success', 
            metadata: await PaymentService.increaseCurrencyForAdmin({ 
                ...req.body,
                userId: req.params.userId
            })
        }).send(res)
    }

}

module.exports = new PaymentController()
