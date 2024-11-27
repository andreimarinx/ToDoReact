const express = require('express')

const router = express.Router()

const User = require('../models/user')


//getAllUsers
router.get('/',async (req, res) => {
   try{
    const users = await User.find()
    res.status(200).json(users)
   }catch(err){
    res.status(500).json({message: err.message})
   }
})

router.post('/login',  async (req, res) => {
   
    try{
    const realUserData = await User.findOne({username: req.body.username})
    if(realUserData.password === req.body.password){
        res.status(200).json({status: true, userData: realUserData})
    }else{
        res.status(200).json({status: false})
    }
}catch(error){
    res.status(200).json({status: false})
}

})
//add task use
router.post('/task/:id', getUser ,async (req, res) => {
    
    try{
        const task = req.body.taskName
        await User.findByIdAndUpdate(res.user.id, {tasks: [...res.user.tasks,  {taskName: task}]})
        res.status(200).json({yourtaskkk: 'added'})

    }catch(error){
        res.status(500).json({message: err.message})
    }


})
//getusertasks
router.get('/task/:id', getUser ,async (req, res) => {
    
    try{
    
        const data = await User.findById(res.user.id)

        res.status(200).json({tasks: data.tasks})

    }catch(error){
        res.status(500).json({message: err.message})
    }


})
//delete task
router.delete('/task/:id', getUser ,async (req, res) => {
    
    try{
        
       const taskId = req.body.id
            const remainingTasks = []
          res.user.tasks.map(task => {

            if(task._id.valueOf() !== taskId)

            remainingTasks.push(task)
          })
          
          await User.findOneAndUpdate({_id: res.user._id}, {tasks:remainingTasks } )
         res.status(200).json({message: "deleted"})
       // res.status(200).json({tasks: res.user.task[task]})

    }catch(error){
        res.status(500).json({message: error.message})
    }


})


//AddOne
router.post('/',async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password   ,
        email: req.body.email  
    })
    try{
        const isAlready = await User.find({username: req.body.username})
        if(isAlready.toString() === ''){
            console.log("not here");
            newUser.save()
            res.status(200).json({message: 'created'})
        }else{
            console.log('here');
            res.status(200).json({message: 'exists'})
        }
        console.log(isAlready.toString())

        
        
        
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//GetUser
router.get("/:id", getUser ,(req, res)=>{
    try{
        res.status(200).json(res.user)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})




//DeleteUser

router.delete('/:id', getUser, async (req, res)=>{
    try{
        
        await User.deleteOne(res.user)
        res.status(200).json({message: "deleted"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Get User
async function getUser (req, res, next){
    let user;
    
    try{
        user = await  User.findById(req.params.id)

        if(user === null)
            res.status(400).json({message: "No user found!"})
    }catch(err){
        res.status(400).json({message: err.message})
    }

    res.user = user
    next()
}


module.exports =  router