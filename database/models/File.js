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

    size: {
        type: String
    },
    date: {
         type: Date, 
         default: new Date()
    }
   
})

fileSchema.methods.getUploader = async function () {

    if (this.uploader)
        await this.populate('uploader').execPopulate()
        else this.uploader = 'anon'
    
    return null
}

const File = DB.mongoose.model('File', fileSchema)

module.exports = File