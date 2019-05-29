const express = require('express');
const router = express.Router();
var Todo = require("../model/Todo");

router.get('/api/get_todo',(req,res)=>{
    Todo.find({})
        .then(todo=>{
            // console.log(todo)
            if(todo.length>0) return res.status(200).send({"message":"success","todo":todo})
            else return res.status(200).send({"message":"List is empty"})
        }).catch(err=>console.log(err))
})

router.post('/api/post_todo',(req,res)=>{
    // console.log(req.body)
    var todo_obj = {
        name:req.body.name,
        priority:req.body.priority
    }
    console.log(todo_obj)
    var todo = new Todo(todo_obj)
    todo.save()
        .then(save_res=>{
            // console.log(save_res)
            return res.status(200).send({"message":"saved successfully","todo":save_res})
        }).catch(err=>res.status(301).send({"message":"internal server error"}))
})

router.put('/api/update_todo',(req,res)=>{
    var id = req.body.id
    // console.log(req.body)
    Todo.findByIdAndUpdate(id,{$set:{name:req.body.name,priority:req.body.priority,completed:req.body.completed}})
        .then(update_res=>{
            if(update_res){
                return res.status(200).send({"message":"successfully updated","todo":update_res})
            }
            else return res.status(201).send({"message":"No todo found"})
        }).catch(err=>res.send({"message":"internal server error"}))
})

router.delete('/api/delete_todo',(req,res)=>{
    console.log(req.body)
    var id = req.body.id
    console.log(id)
    Todo.findByIdAndDelete(id).then(deleted_todo=>{
        return res.status(200).send({"message":"todo is deleted"})
    }).catch(err=>res.status(400).send({"message":"internal server error"}))
})

module.exports = router