const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    completed:{
        type: Boolean,
        default:false
    },
    priority:{
        type:String,
        default: 'low'
    }
})

module.exports = Todo = mongoose.model('Todo',TodoSchema)