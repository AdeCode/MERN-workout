const Workout = require('../models/workout')
const mongoose = require('mongoose')

//get all workouts
const getAllWorkouts = async(req,res)=>{
    try{
        Workout.find({}).then(workouts => res.send(workouts))
    }catch(error){
        res.status(400).send({error: error.message})
    }
}

const getWorkout = async(req,res)=>{
    const {id} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Not a valid ID'})
    }
    const workout = await Workout.findById(id)
    if(!workout) {
        return res.status(404).json({error: 'workout Not Found'})
    }
    res.status(200).json(workout)
    // try{
    //     Workout.findById({_id:req.params.id}).then(workout => res.send(workout))
    // }catch(error){
    //     res.status(400).send({error: error.message})
    // }
}

//create workout
const createWorkout = async(req,res)=>{  
    const {title, load, reps} = req.body 
     
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    try{
        const workout = await Workout.create(req.body)
        res.status(200).send({workout, message:'workout created successfully'})
    }catch(error){
        res.status(400).send({error: error.message})
    }
}

//update Workout
const updateWorkout = async(req,res)=>{
    try{
        Workout.findByIdAndUpdate({_id:req.params.id}, req.body).then(() =>{
            Workout.findOne({_id:req.params.id}).then(workout =>res.status(200).send(workout))
        })
    }catch(error){
        res.status(400).send({error: error.message})
    }
}

const deleteWorkout = async(req,res)=>{
    try{
        Workout.findByIdAndDelete({_id:req.params.id}).then((workout) =>{
            res.send({
                workout,
                message:'Workout deleted'
            })
        })
    }catch(error){
        res.status(400).send({error: error.message})
    }
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
}