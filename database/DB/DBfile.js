const File = require('../models/File') // File model

const DBfile = {
    save: async function (fileObj) {

        const file = new File(fileObj) // destr user object
        let doc = await file.save()
        return doc
    }
}

module.exports = DBfile