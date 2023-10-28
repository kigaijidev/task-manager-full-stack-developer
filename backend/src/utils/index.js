'use strict'

const _ = require('lodash')

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick( object, fields)
}

const getSelectData = ( select = [] ) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}

const unGetSelectData = ( unSelect = [] ) => {
    return Object.fromEntries(unSelect.map(el => [el, 0]))
}

const removeUnderfineObject = (obj) => {
    Object.keys(obj).forEach( k => {
        if(obj[k] == null){
            delete obj[k]
        }
    })

    return obj
}

const addDays = (day, addDay) => {
    const oldDate = new Date(day)
    const newDate = new Date().setDate(oldDate.getDate() + addDay)
    
    return new Date(newDate);
}

module.exports = {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUnderfineObject,
    addDays,
}