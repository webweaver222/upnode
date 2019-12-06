const DB = require('../DB/connect')

const fileSchema = new DB.mongoose.Schema({
    hashName: {
        type: String
    },

    originalName: {
        type: String
    },

    ext: {
        type: String
    },

    path: {
        type: String
    }
})

const File = DB.mongoose.model('File', fileSchema)

module.exports = File