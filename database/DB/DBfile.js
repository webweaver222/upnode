const File = require('../models/File') // File model

const DBfile = {
    save: async function (fileObj) {

        const file = new File(fileObj) // destr user object
        let doc = await file.save()
        return doc
    },


    fetch: function (id) {
        
       return new Promise(async function(resolve, reject) {
        const file = await File.findById(id)

        if(file) resolve(file)
            else 
            reject('File not found')
       })

    },

    fetchRecent: async function (params) {

        console.log(params)

       const files = await File.find().sort( { [params.sort]: [params.order] }).limit(10)  
        return files
        
       
    }
}

module.exports = DBfile