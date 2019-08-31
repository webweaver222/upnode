const db= require('./connect') // connection
const User = require('../models/User') // User model

const dbconn = new db();

const DBuser = {

   save: function (userData) {
       return new Promise((resolve, reject) => {

        const user = new User({email, username, password} = userData) // destr user object
        
        user.save()
        .then((x)=>{
            resolve(x);
        })
        .catch((error) => {
            reject(error)
        })
       })
   }
    /*save: function(userData) {
        const user = new User({email, username, password} = userData) // destr user object
        
        
        user.save()
        .then(()=>{
            return user;
        })
        .catch((error) => {
            //console.log('Error', error)
        })
    },

    find: function() {

    },

    update: function() {

    },

    delete: function() {

    }*/

}

module.exports = DBuser
