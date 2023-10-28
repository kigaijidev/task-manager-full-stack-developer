'use strict'

const { PrismaClient } = require('@prisma/client')
const { getInfoData, addDays } = require("../utils")
const { BadRequestError, ConflictRequestError, AuthFailError, ForbiddenError } = require("../core/error.response")

const prisma = new PrismaClient()

class PaymentService {

    static updateInfo = async ({ userId, fullName, bank, bankNumber }) => {

        if(!userId || !fullName || !bank || !bankNumber){
            throw new BadRequestError('Invalid Request')
        }

        await prisma.payments.update({
            where: { UserID: userId },
            data: {
                FullName: fullName,
                Bank: bank,
                BankNumber: bankNumber
            }
        }).catch(() => {
            throw new BadRequestError('Cannot Update Info Payment')
        })

        return []

    }
    
    static increaseCurrencyForAdmin = async ({ userId, currency }) => {

        if(!userId || currency < 0){
            throw new BadRequestError('Invalid Request')
        }

        await prisma.payments.update({
            where: { UserID: +userId },
            data:{
                Currency: { increment: +currency }
            }
        }).catch(() => {
            throw new BadRequestError('Cannot increase currency')
        })

        return [];
    }

    static descreaseCurrencySubscriptionPlan = async () => {

        const plans = await prisma.subscriptionPlans.findMany({ where: { Price: { gt: 0 }}})

        const monthlyFee = plans.map(async (plan) => {
            const updates = await prisma.$transaction([
                prisma.userSubscriptions.updateMany({
                    where:{
                        Status: 'Active',
                        PlanID: plan.PlanID,
                        EndDate: { lte: new Date() },
                        Users:{
                            Payments:{
                                Currency: { lt: plan.Price }
                            }
                        }
                    },
                    data:{
                        Status: 'Expired'
                    }
                }),
                prisma.payments.updateMany({
                    where:{
                        Currency: {
                            gte: plan.Price
                        },
                        Users:{
                            UserSubscriptions:{
                                some:{
                                    Status: 'Active',
                                    EndDate: { equals: new Date() },
                                    PlanID: plan.PlanID
                                }
                            }
                        }
                    },
                    data:{
                        Currency: { decrement: plan.Price }
                    }
                }),
                prisma.userSubscriptions.updateMany({
                    where:{
                        Status: 'Active',
                        PlanID: plan.PlanID,
                        EndDate: { equals: new Date() },
                    },
                    data:{
                        StartDate: new Date(),
                        EndDate: addDays(new Date(), 30)
                    }
                })
            ])

            return updates;
        })

        return await Promise.all(monthlyFee);
    }
}

module.exports = PaymentService
