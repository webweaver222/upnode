const DB = require('../DB/connect')

const fileSchema = new DB.mongoose.Schema({

    originalName: {
        type: String
    },

    ext: {
        type: String
    },

    path: {
        type: String
    },

    uploader: {
        type: DB.mongoose.Types.ObjectId,
        ref: 'User'
    },

    date: {
         type: Date, 
         default: new Date()
    }
})

const File = DB.mongoose.model('File', fileSchema)

module.exports = File