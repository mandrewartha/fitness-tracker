const router = require("express").Router();
const Workout = require("../models/Workout.js")

router.get("/api/workouts", (req,res)=>{
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:{
                    $sum:"$exercises.duration"
                }
            }
        }
    ]).then(data=>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

//limiting workouts to 7
router.get("/api/workouts/range", (req,res)=>{
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:{
                    $sum:"$exercises.duration"
                }
            }
        }
    ]).limit(7).then(data=>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

//creating a new object
router.post("/api/workouts", (req,res)=>{
    Workout.create({}).then(data=>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

router.put("/api/workouts/:id", (req,res)=>{
    Workout.findByIdAndUpdate(req.params.id,{
        $push:{
            exercises:req.body
        }
    },{
        new:true,
        //making sure update matches schema requirements
        runValidators:true
    }).then(data=>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})


module.exports = router