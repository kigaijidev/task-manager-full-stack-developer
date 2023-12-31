'use strict'
const { CREATED, OK, SuccessResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Registered Success', 
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }

    login = async (req, res, next) => {
        console.log(req)
        new SuccessResponse({
            message: 'Success',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout success!',
            metadata: await AccessService.logout(req.user.UserID, req.token)
        }).send(res)
    }

    changePassword = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout success!',
            metadata: await AccessService.changePassword({
                ...req.body,
                userId: req.user.UserID
            })
        }).send(res)
    }
}

module.exports = new AccessController()
