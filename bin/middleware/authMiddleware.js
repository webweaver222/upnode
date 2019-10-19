const jwt = require('jsonwebtoken')
const User = require('../../database/models/User')

const authMiddleware = async function(req, res, next) {
    
    const token = req.cookies.user

    if (!token) next()

    const decoded = jwt.verify(token, 'omaha222')._id // decode token. returns userid
    
    const user = await User.findOne({_id: decoded, 'tokens.token' : token}) //second arg makes sure, that token still there, not deleted

    if (user) {
        req.user = user
    }

    next()
}

module.exports = authMiddleware