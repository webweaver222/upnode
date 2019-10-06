const DB = require('../DB/connect')


const User = DB.mongoose.model('User', {
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = User