const mongoose = require('mongoose')

const projectsSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true

    },
    address: {
        type: String
    },
    projectType: {
        type: String,
        required: true
    },
    renovationType: {
        type: Object
    },
    constructionType: {
        type: Object
    }

})


module.exports = mongoose.model('Project', projectsSchema)