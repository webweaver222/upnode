

const db = function() {
    
this.mongoose = require('mongoose')

   
    
    this.mongoose.connect('mongodb://127.0.0.1:27017/upnode-api', {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    console.log('connected')
}


    module.exports = db
    