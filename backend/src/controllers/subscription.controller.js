'use strict'
const { CREATED, OK, SuccessResponse } = require('../core/success.response')
const SubScriptionService = require('../services/subscription.service')

class SubScriptionController {

    upgrade = async (req, res, next) => {
        new SuccessResponse({
            message: 'Upgrade Success', 
            metadata: await SubScriptionService.upgrade({ planId: req.params.planId, user: req.user })
        }).send(res)
    }

    cancelPlan = async (req, res, next) => {
        new SuccessResponse({
            message: 'Upgrade Success', 
            metadata: await SubScriptionService.cancelPlan(req.user.UserID)
        }).send(res)
    }

}

module.exports = new SubScriptionController()
