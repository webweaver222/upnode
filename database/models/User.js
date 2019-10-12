const DB = require('../DB/connect')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new DB.mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },

    tokens: [{
       token: {
           type: String,
           reqired: true
       }
       
    }]
})

/* password hash middleware */
userSchema.pre('save', async function(next) {
   const user = this
    if (user.isDirectModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
   next()
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()},'omaha222')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = DB.mongoose.model('User', userSchema)

module.exports = User