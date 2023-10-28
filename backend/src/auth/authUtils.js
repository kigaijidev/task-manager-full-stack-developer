'use strict'
const JWT = require('jsonwebtoken')
const asyncHandler = require('../helper/asyncHandler')
const { AuthFailError, NotFoundError, ForbiddenError } = require('../core/error.response')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const SECRET_KEY = process.env.SECRET_KEY;

const HEADER = {
    AUTHORIZATION: 'authorization',
    CLIENT_ID: 'client-id',
}


const createJWT = async (payload) => {
   return JWT.sign( payload, SECRET_KEY, {
        expiresIn: '3 days',
    })
}

const verifyJWT = async ( req, res, next ) => {

    const userId = req.headers[HEADER.CLIENT_ID]
    const accessToken = req.headers[HEADER.AUTHORIZATION] ? req.headers[HEADER.AUTHORIZATION].split(' ')[1] : null

    if(!accessToken || !userId){
        return res.status(403).json({ message: 'Invalid Request JWT'})
    }
    
    const checkToken = await prisma.tokenExpireds.findFirst({
        where: { UserID: parseInt(userId), Token: accessToken }
    })

    if(checkToken){
        return res.status(403).json({ message: 'Token Expired'})
    }

    try {

        const decodeUser = JWT.verify(accessToken, SECRET_KEY)

        if(parseInt(userId) !== decodeUser.UserID){
            return res.status(403).json({ message: 'Invalid User'})
        }

        if(new Date() >= new Date(decodeUser.SubscriptionExpiryDate)){
            return res.status(403).json({ message: 'Account is Suspended'})
        }
        
        req.token = accessToken
        req.user = decodeUser

        return next()
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden Error'})
    }
}

module.exports = {
    verifyJWT,
    createJWT,
}