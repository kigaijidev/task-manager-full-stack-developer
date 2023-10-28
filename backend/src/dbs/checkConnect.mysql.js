'use strict'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const { ForbiddenError } = require('../core/error.response')

const checkConnect = async () => {
    await prisma.$connect().catch( async (err) => {
        await prisma.$disconnect();
        console.error('Cannot request to Database');
        process.exit(1)
    })
}

module.exports = {
    checkConnect,
}