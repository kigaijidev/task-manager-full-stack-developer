'use strict';

const { ForbiddenError } = require('../core/error.response')

const permission = ( permission ) => {
    return (req, res, next) => {
        if(!req.user.Roles){
            throw new ForbiddenError('Permission denied')
        }

        /*
         *ROLE: 0000: USER, 0011: MANAGER, 1111: ADMIN
         */
        const validPermission = (parseInt(req.user.Roles) & 1111) === 1111
        if(!validPermission){
            throw new ForbiddenError('Permission denied')
        }

        return next()
    }
}

module.exports = {
    permission,
}
