'use strict'

const express = require('express')
const router = express.Router()

//router.use('/v1/api/discount', require('./discount'))

router.use('/v1/api', require('./access'))
router.use('/v1/api/plan', require('./plan'))
router.use('/v1/api/subscription', require('./subscription'))
router.use('/v1/api/todo', require('./todo'))
router.use('/v1/api/payment', require('./payment'))
router.use('/v1/api/user', require('./user'))

module.exports = router
