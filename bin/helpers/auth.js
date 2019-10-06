const DBuser = require('../../database/DB/DBuser')


const auth = {


    attempt: async function(userData,req) {

    try {
        let user = await DBuser.fetchByEmail(userData.email);
        if (user.password == userData.password) {
            req.session.cookie.obema = '333';
                return true;
            }
        else  throw new Error('Password is incorrect')
    } catch (e) {
        throw new Error(e)
    }
            
        
    }

}


module.exports = auth