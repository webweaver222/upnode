const validator = require('validator')


let v = {

    errors: [],

    validate: function (userData, postType, DBUser) {

        this.errors = []

        validator.isEmail(userData.email)? '' : this.errors.push('Email is not valid')

        validator.isEmpty(userData.password)? this.errors.push('No password provided') : ''
        

    }
}


module.exports = v