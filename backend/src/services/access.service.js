'use strict'

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { PrismaClient } = require('@prisma/client')
const { getInfoData, addDays } = require("../utils")
const { BadRequestError, ConflictRequestError, AuthFailError, ForbiddenError } = require("../core/error.response")
const { createJWT } = require('../auth/authUtils')

const RoleShop = {
    USER: 'USER',
    ADMIN: 'ADMIN',
}
const prisma = new PrismaClient()

class AccessService {

    static signUp = async ({ name, email, password }) => {

        if( !name || !email || !password ){
            throw new BadRequestError('Invalid Request')
        } 

        const holderUser = await prisma.users.findFirst({ where: { Email: email } })

        if(holderUser){
            throw new ConflictRequestError(`User already registered!`)
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        await prisma.users.create({
            data:{
                Name: name,
                Email: email,
                Password: hashPassword,
                SubscriptionExpiryDate: addDays(new Date(), 3),
                Roles: '0000',
                UserSubscriptions: {
                    create:{
                        StartDate: new Date(),
                        EndDate: addDays(new Date(), 36000),
                        Count: 0,
                        SubscriptionPlans: {
                            connectOrCreate: {
                                where: { PlanID: 1 , Name: 'Free' },
                                create: {
                                    Name: 'Free',
                                    MaxTodos: 10,
                                    Price: 0
                                }
                            }
                        }
                    }
                },
                Payments: {
                    create: {
                        Currency: 0,
                        FullName: name,
                        Bank: '',
                        BankNumber: ''
                    }
                }
            }
        }).catch(() => {
            throw new ForbiddenError('SignUp Error')
        })

        return 'SignUp Success';

    }

    static login = async ({ email, password }) => {

        if( !email || !password){
            throw new BadRequestError('Invalid Request')
        }

        const foundUser = await prisma.users.findFirst({ where: { Email: email }});

        if(!foundUser){
            throw new BadRequestError('User not register')
        }

        const match = await bcrypt.compare( password, foundUser.Password )

        if(!match){
            throw new AuthFailError('Authentication error')
        }
        
        if(new Date() > new Date(foundUser.SubscriptionExpiryDate)){
            throw new AuthFailError('Account suspended')
        }

        await prisma.users.update({ 
            where: { UserID: foundUser.UserID }, 
            data: { LastAccessDate: new Date(), SubscriptionExpiryDate: addDays(new Date(), 3) }
        }).catch((error) => {
            throw new ForbiddenError(`Login Failed ${error}`)
        })

        const generateJWT = await createJWT(foundUser);

        return {
            user: getInfoData({ fields: ['UserID', 'Name', 'Email'], object: foundUser }),
            token: generateJWT
        }
    }

    static logout = async ( userId, token ) => {
        await prisma.tokenExpireds.upsert({ 
            where: { UserID: +userId },
            create:{ 
                UserID: +userId,
                Token: token,
            },
            update: {
                Token: token,
        }}).catch((error) => {
            throw new ForbiddenError(`Forbidden Error`)
        }).finally(() => {
            return []
        })
    }

    static changePassword = async ({userId, oldPass, newPass, validNewPass }) => {

        if(!oldPass || !newPass || !validNewPass ){
            throw new BadRequestError('Invalid Request')
        }
        if(newPass !== validNewPass){
            throw new BadRequestError('Password not match')
        }

        const user =  await prisma.users.findFirst({where: { UserID: userId }})
        const compare = await bcrypt.compare(oldPass, user.Password)
        if(!compare){
            throw new AuthFailError('Password invalid')
        }

        const hashPassword = await bcrypt.hash(newPass, 10);
        await prisma.users.update({
            where: { UserID: userId },
            data: { Password: hashPassword }
        }).catch((error) => {
            throw new ForbiddenError(`Forbidden Error`)
        }).finally(() => {
            return []
        })
    }
}

module.exports = AccessService
