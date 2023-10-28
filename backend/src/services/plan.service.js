'use strict'

const { PrismaClient } = require('@prisma/client')
const { getInfoData, addDays } = require("../utils")
const { BadRequestError, ConflictRequestError, AuthFailError, ForbiddenError } = require("../core/error.response")

const prisma = new PrismaClient()

class PlansService {

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
            throw new AuthFailError('User expired')
        }

        await prisma.users.update({ 
            where: { UserID: foundUser.UserID }, 
            data: { LastAccessDate: new Date(), SubscriptionExpiryDate: addDays(new Date(), 3)}
        }).catch((error) => {
            throw new ForbiddenError(`Login Failed ${error}`)
        })

        const generateJWT = await createJWT(foundUser);

        return {
            user: getInfoData({ fields: ['UserID', 'Name', 'Email'], object: foundUser }),
            token: generateJWT
        }
    }

    static create = async ({ name, maxTodos, price }) => {
        if(!name || !maxTodos || maxTodos < 0 || price < 0 ){
            throw new BadRequestError('Invalid Request')
        }

        const holderPlan = await prisma.subscriptionPlans.create({
            data:{
                Name: name,
                MaxTodos: +maxTodos,
                Price: +price
            }
        }).catch(() => {
            throw new ForbiddenError('Create Failed')
        })

        return { plan: holderPlan }
    }

    static update = async ({ planId, name, maxTodos, price }) => {
        if(!planId || !name || !maxTodos || !price || maxTodos < 0 || price < 0 ){
            throw new BadRequestError('Invalid Request')
        }

        const holderPlan = await prisma.$transaction([
            prisma.subscriptionPlans.update({ where: { PlanID: +planId }, data:{ Name: name, MaxTodos: +maxTodos, Price: +price }}),
            prisma.userSubscriptions.updateMany({ where: { PlanID: +[planId] }, data: { PricePlan: +price }})
        ]) .catch(() => {
            throw new ForbiddenError('Update Failed')
        })

        return { plan: holderPlan }
    }

    static delete = async (planId) => {
        if(!planId){
            throw new BadRequestError('Invalid Request')
        }

        const holderPlan = await prisma.subscriptionPlans.delete({
            where: { PlanID: +planId }
        }).catch(() => {
            throw new ForbiddenError('Delete Failed')
        })

        return []
    }

    static getAll = async () => {

        const holderPlans = await prisma.subscriptionPlans.findMany().catch(() => {
            throw new ForbiddenError('Find Failed')
        })

        return holderPlans
    }
}

module.exports = PlansService
