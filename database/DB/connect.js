
const DB = {
    mongoose : require('mongoose'),
    conn: function () {
        this.mongoose.connect('mongodb://127.0.0.1:27017/upnode-api', {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    console.log('db connected')
    }


 
}
    module.exports = DB

