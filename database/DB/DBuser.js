const User = require('../models/User') // User model

const DBuser = {

    

   save: function (userData) {
       return new Promise((resolve, reject) => {

        const user = new User({email, username, password} = userData) // destr user object
        
        user.save()
        .then((x)=>{
            resolve(x);
        })
        .catch((error) => {
            console.log('343434')
            reject(error)
        })
       })
   },

   fetchByEmail: function(email) {
      return new Promise((resolve, reject) => {
       
        User.find({ 'email': email }).then(user => {
            if (!user[0]) return reject('That email does not exist')
            resolve(user[0]);
        })
        
      })
  }
    

}

module.exports = DBuser
