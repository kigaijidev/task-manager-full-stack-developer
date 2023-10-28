'use strict'
const { CREATED, OK, SuccessResponse } = require('../core/success.response')
const UserService = require('../services/user.service')

class UserController {

    findAll = async (req, res, next) => {
        new CREATED({
            message: 'Find all User Success', 
            metadata: await UserService.findAll(req.params)
        }).send(res)
    }

    findOneByUser = async (req, res, next) => {
        new SuccessResponse({
            message: 'Detail user Success', 
            metadata: await UserService.findOneByUser(req.user.UserID)
        }).send(res)
    }

    deleteByAdmin = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete user Success', 
            metadata: await UserService.deleteByAdmin(req.params.userId)
        }).send(res)
    }

    activeUser = async (req, res, next) => {
        new CREATED({
            message: 'Active User Success', 
            metadata: await UserService.active(req.params.userId)
        }).send(res)
    }

}

module.exports = new UserController()
