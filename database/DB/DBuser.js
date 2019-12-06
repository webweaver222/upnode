const User = require('../models/User') // User model


const DBuser = {

    

   save: async function (userData) {

       const user = new User(/*{email, username, password} =*/ userData) // destr user object

       let doc = await user.save()
       return doc

   },

   fetchByEmail: function(email) {
      return new Promise((resolve, reject) => {
       
        User.find({ 'email': email }).then(user => {
            if (!user[0]) {
              return reject('That email does not exist')
            }
            resolve(user[0]);
        })
        
      })
  }
    

}

module.exports = DBuser
