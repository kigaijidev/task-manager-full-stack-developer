'use strict'

const { PrismaClient } = require('@prisma/client')
const { getInfoData, addDays } = require("../utils")
const { BadRequestError, AuthFailError, ForbiddenError } = require("../core/error.response")
const { isObject } = require('lodash')

const prisma = new PrismaClient()

class SubscriptionService {

    static upgrade = async ({ planId, user }) => {

        const { UserID } = user;
        if( !planId ){
            throw new BadRequestError('Invalid Request')
        }

        const checkPlan = await prisma.subscriptionPlans.findFirst({
            where: { PlanID: +planId }
        })

        if(!checkPlan){
            throw new BadRequestError('Not found Plan')
        }

        const subscriptionExist = await prisma.userSubscriptions.findFirst({
            where: { UserID, PlanID: checkPlan.PlanID, Status: 'Active' }
        })

        if(subscriptionExist){
            throw new BadRequestError('This Plan Actived for User')
        }

        const checkCurrency = await prisma.payments.findFirst({
            where: { UserID }
        })

        if(!checkCurrency){
            throw new ForbiddenError('Not found User Payment')
        }

        if(checkCurrency.Currency === 0 || checkCurrency.Currency < checkPlan.Price){
            throw new BadRequestError('User does not have enough currency')
        }

        const [payment, oldSub, newSub] = await prisma.$transaction([
            prisma.payments.update({ where: { UserID }, data: { Currency: { decrement: checkPlan.Price } } }),
            prisma.userSubscriptions.updateMany({ where: { UserID }, data: { Status: 'Expired' }}),
            prisma.userSubscriptions.upsert({
                where: { UserID_PlanID: { UserID, PlanID: checkPlan.PlanID }},
                create: {
                    PlanID: checkPlan.PlanID,
                    UserID: UserID,
                    StartDate: new Date(),
                    EndDate: addDays(new Date, 30),
                    Status: 'Active',
                    Count: 0,
                    PricePlan: checkPlan.Price,
                },
                update: {
                    StartDate: new Date(),
                    EndDate: addDays(new Date, 30),
                    Status: 'Active',
                    Count: 0,
                    PricePlan: checkPlan.Price,
                }
                
            })
        ]).catch(() => {
            throw new ForbiddenError('Upgrade Error')
        })

        console.log(payment, newSub)
        return getInfoData({ fields: ['StartDate', 'EndDate', 'Status'], object: newSub});

    }

    static cancelPlan = async (userId) => {

        const currenPlan = await prisma.userSubscriptions.findFirst({ where: { UserID: userId, Status: 'Active' }})

        const [oldSub, newSub] = await prisma.$transaction([
            prisma.userSubscriptions.update({ 
                where: { UserID_PlanID: { UserID: currenPlan.UserID, PlanID: currenPlan.PlanID } },
                data: { Status: 'Canceled'}
            }),
            prisma.userSubscriptions.update({ 
                where: { UserID_PlanID: { UserID: currenPlan.UserID, PlanID: 1 } },
                data: { Status: 'Active'}
            }),
        ]).catch(() => {
            throw new ForbiddenError('Cancel Error')
        })

        return getInfoData({ fields: ['StartDate', 'EndDate', 'Status', 'Count'], object: newSub })
    }

}

module.exports = SubscriptionService
