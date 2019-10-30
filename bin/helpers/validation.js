const validator = require('validator')


let v = {

    errors : {},

    validate: async function (userData, postType, DBUser) {

        this.errors = {}


        /*if (!this.errors.hasOwnProperty('email')) this.errors['email'] = []
        validator.isEmail(userData.email)? '' : this.errors['email'].push('Email is not valid')

        validator.isEmpty(userData.password)? this.errors['password'].push('No password provided') : ''

        if (postType == 'signup') {
            validator.isEmpty(userData.username)? this.errors['username'].push('No username provided') : ''
            validator.isEmpty(userData.repass)? this.errors['repass'].push('No password provided') : ''

            const em = await DBUser.fetchByEmail(userData.email)
            console.log(em)
        }*/



    }
}


module.exports = v