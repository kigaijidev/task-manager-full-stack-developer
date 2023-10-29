'use strict'

const { PrismaClient } = require('@prisma/client')
const { getInfoData, addDays } = require("../utils")
const { BadRequestError, ConflictRequestError, AuthFailError, ForbiddenError } = require("../core/error.response")

const prisma = new PrismaClient()

class UserService {

    static findAll = async ({ filterName, skip = 0, limit = 50, sort = 'ctime' }) => {

        const sortBy = sort === 'ctime' ? 'desc' : 'asc';
        const query = filterName ?? '';
        
        const planUsing = await prisma.users.findMany({
            where: { Name: { contains: query }},
            skip: skip,
            take: limit,
            orderBy: {
                SubscriptionExpiryDate: sortBy
            },
            select:{
                Name: true,
                Email: true,
                AccountStatus: true,
                Roles: true,
                UserID: true,
                SubscriptionExpiryDate: true,
                _count: true
            }
        }).catch((err) => {
            throw new ForbiddenError('Find all error')
        })

        return planUsing

    }
    
    static findOneByUser = async (userId) => {

        const [user, newUser] = await prisma.$transaction([
            prisma.users.findFirst({
                where: { UserID: userId },
                select: {
                    Name: true,
                    Email: true,
                    LastAccessDate: true,
                    AccountStatus: true,
                    Roles: true,
                    SubscriptionExpiryDate: true,
                    UserID: true,
                    Payments: {
                        select: {
                            Currency: true
                        }
                    },
                    UserSubscriptions:{
                        where: { Status: 'Active' },
                        select:{
                            SubscriptionPlans:{
                                select:{
                                    Name: true
                                }
                            }
                        }
                    }
                }
            }),
            prisma.users.update({
                where:{ UserID: userId },
                data:{ LastAccessDate: new Date() }
            })
        ]).catch((err) => {
            console.log(err)
            throw new ForbiddenError('User not exists')
        })

        return user;
    }
    
    static deleteByAdmin = async (userId) => {

        if(!userId){
            throw new BadRequestError('Invalid Request')
        }

        const user = await prisma.users.findFirst({
            where: { UserID: +userId },
            select: { 
                SubscriptionExpiryDate: true,
                AccountStatus: true,
                Payments: {
                    select: {
                        Currency: true
                    }
                }
            }
        }).catch(() => {
            throw new ForbiddenError('Cannot find User')
        })

        if(!user){
            throw new ForbiddenError('User not exists')
        }

        if(user.AccountStatus === 'Active' || (new Date() < new Date(user.SubscriptionExpiryDate))){
            throw new ForbiddenError('Cannot delete User is Active or not expired')
        }

        if(user.Payments.Currency > 0){
            throw new ForbiddenError('Cannot delete User have enough currency')
        }

        const deleted = await prisma.$transaction([
            prisma.todos.deleteMany({ where: { UserID: +userId }}),
            prisma.userSubscriptions.deleteMany({ where: { UserID: +userId }}),
            prisma.tokenExpireds.deleteMany({ where: { UserID: +userId }}),
            prisma.payments.delete({ where: { UserID: +userId }}),
            prisma.users.delete({ where: { UserID: +userId }})
        ]).catch((err) => {
            throw new ForbiddenError('Delete User Error')
        })

        return [];
    }

    static active = async (userId) => {
        
        const userActive = await prisma.users.update({ 
            where: { UserID: +userId },
            data: {
                AccountStatus: 'Active',
                SubscriptionExpiryDate: addDays(new Date(), 3)
            }
        }).catch((err) => {
            throw new ForbiddenError('Active user error')
        })

        return getInfoData({ fields: ['UserID', "Name", "Email", "AccountStatus", "SubscriptionExpiryDate"], object: userActive });
    }

    static changeToSuspended = async () => {
        
        const userSuspended = await prisma.users.updateMany({ 
            where: { SubscriptionExpiryDate: { lt: new Date() } },
            data: {
                AccountStatus: 'Suspended',
            }
        }).catch((err) => {
            throw new ForbiddenError('Change Users Suspended error')
        })

        return console.log(`Have ${userSuspended.count} is Suspended`);
    }

    static updateInfo = async ({userId, name}) => {
        if(!name){
            throw new BadRequestError('Invalid Request')
        }
        const user = await prisma.users.update({ 
            where: { UserID: +userId },
            data: { Name: name }
        }).catch((err) => {
            throw new ForbiddenError('Update user error')
        })

        return getInfoData({ fields: ['UserID', "Name", "Email", "AccountStatus", "SubscriptionExpiryDate"], object: user });
    }
}

module.exports = UserService
