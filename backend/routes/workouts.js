const express = require('express')
const router = express.Router()
const Workout = require('../models/workout')
const {
    createWorkout,getAllWorkouts, getWorkout, updateWorkout, deleteWorkout
} = require('../controllers/workoutController')

//GET all workouts
router.get('/workouts', getAllWorkouts)

router.get('/learn', (req, res) => {
    res.json({msg:'New Get request'})
})

router.post('/learn-save', (req, res) => {
    res.send({msg:'New Get request from post', body: req.body})
})

//GET a single workout
router.get('/workout/:id', getWorkout)

// router.post('/workout', (req,res,next)=>{
//     Workout.create(req.body).then(workout => res.send({
//         workout,
//         message:'workout created'
//     })).catch(next)
// })
router.post('/workout', createWorkout)

router.put('/workout/:id', updateWorkout)

router.delete('/workout/:id', deleteWorkout)

module.exports = router