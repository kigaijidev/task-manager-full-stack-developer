'use strict'
const { CREATED, OK, SuccessResponse } = require('../core/success.response')
const SubScriptionPlansService = require('../services/plan.service')

class PlansController {

    create = async (req, res, next) => {
        new CREATED({
            message: 'Create Success', 
            metadata: await SubScriptionPlansService.create(req.body)
        }).send(res)
    }

    findAllPlan = async (req, res, next) => {
        new SuccessResponse({
            message: 'Find all success',
            metadata: await SubScriptionPlansService.getAll()
        }).send(res)
    }

    update = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update success!',
            metadata: await SubScriptionPlansService.update({
                ...req.body,
                planId: req.params.planId
            })
        }).send(res)
    }

    delete = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete success!',
            metadata: await SubScriptionPlansService.delete(req.params.planId)
        }).send(res)
    }
}

module.exports = new PlansController()
