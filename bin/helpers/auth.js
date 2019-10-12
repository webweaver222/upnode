const DBuser = require('../../database/DB/DBuser')
const bcrypt = require('bcryptjs')


const auth = {


    attempt: async function(userData) {

    try {
        let user = await DBuser.fetchByEmail(userData.email);
        
        
        if (await bcrypt.compare(userData.password, user.password) ) {
            const token = await user.generateAuthToken()    
            return token;
        }
        else  throw 'Password is incorrect'
    } catch (e) {
        throw new Error(e)
      }  
    }

}


module.exports = auth