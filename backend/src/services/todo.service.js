'use strict'

const { PrismaClient } = require('@prisma/client')
const { getInfoData, addDays } = require("../utils")
const { BadRequestError, ConflictRequestError, AuthFailError, ForbiddenError } = require("../core/error.response")

const prisma = new PrismaClient()

class TodoService {

    static create = async ({ userId, title }) => {

        if(!userId || !title){
            throw new BadRequestError('Invalid Request')
        }

        const planUsing = await prisma.userSubscriptions.findFirst({ 
            where: { 
                UserID: userId, 
                EndDate: { gte: new Date(),  },
                NOT: { Status: 'Expired' }
            },
            orderBy: { 
                EndDate: 'asc'
            },
            include: {
                SubscriptionPlans: {
                    select: {
                        MaxTodos: true
                    }
                }
            }
        })

        if(!planUsing){
            throw new ForbiddenError('Not Found Plan Using')
        }

        if(planUsing.Count >= planUsing.SubscriptionPlans.MaxTodos){
            throw new BadRequestError('You used limit with plan')
        }

        const [todo, newSub] = await prisma.$transaction([
            prisma.todos.create({
                data: {
                    Title: title,
                    UserID: userId,
                }
            }),
            prisma.userSubscriptions.update({ 
                where: { UserID_PlanID: { UserID: planUsing.UserID, PlanID: planUsing.PlanID } },
                data: { Count: { increment: 1 } }
            }),
        ]).catch((err) => {
            console.log(err)
            throw new ForbiddenError('Create Todo Error')
        })

        return getInfoData({ fields: ['Title', 'Discription', 'IsCompleted'], object: todo})

    }

    
    static update = async ({ userId, todoId, title, description }) => {

        if(!userId || !todoId || !title || !description){
            throw new BadRequestError('Invalid Request')
        }

        const updated = await prisma.todos.update({
            where: { TodoID: +todoId, UserID: userId },
            data:{
                Title: title,
            }
        })

        if(!updated){
            throw new BadRequestError('Cannot update Todo')
        }

        return updated;
    }

    static updateStatus = async ({ userId, todoId }) => {

        if(!userId || !todoId ){
            throw new BadRequestError('Invalid Request')
        }

        const oldTodo = await prisma.todos.findFirst({ where: { TodoID: +todoId }})
        const updated = await prisma.todos.update({
            where: { TodoID: +todoId, UserID: userId },
            data:{
                IsCompleted: !oldTodo.IsCompleted
            }
        })

        if(!updated){
            throw new BadRequestError('Cannot update status Todo')
        }

        return updated;
    }
    
    static delete = async ({ userId, todoId }) => {

        if(!userId || !todoId){
            throw new BadRequestError('Invalid Request')
        }

        const deleted = await prisma.todos.delete({where: { TodoID: +todoId, UserID: userId }})

        if(!deleted){
            throw new BadRequestError('Cannot delete Todo')
        }

        return [];
    }

    
    static getAll = async (userId) => {
        
        const todos = await prisma.todos.findMany({ where: { UserID: userId }})

        return todos;
    }
}

module.exports = TodoService
