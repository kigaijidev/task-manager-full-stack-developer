'use strict'

const schedule = require('node-schedule');
const UserService = require('../services/user.service');
const PaymentService= require('../services/payment.service');

const changeToSuspended = async() => {
    schedule.scheduleJob('* * 23 * * *', function(){
        UserService.changeToSuspended()
    }
)};

const monthlyFeeSubscription = async () => {
    PaymentService.descreaseCurrencySubscriptionPlan()
    schedule.scheduleJob('* * 23 * * *', function(){
        
    }
)}


module.exports = {
    changeToSuspended,
    monthlyFeeSubscription
}
