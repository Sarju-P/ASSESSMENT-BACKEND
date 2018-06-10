const express = require('express');
const Joi = require('joi');
const {Appointment, validateAppointment} = require('../models/appointment');

const router = express();

router.post('/desc', async (req, res) =>{
    const par = req.body.key || "";
    console.log(par);
    try{
        const data = await Appointment.find({desc: {$regex: par.trim(), $options: "i"}});
        res.send(data);
    }
    catch(err){
        res.send(err.message);
    }
 });

router.post('/', async (req, res) =>{
    const {error} = validateAppointment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const data = new Appointment({
        date: req.body.date,
        time: req.body.time,
        desc: req.body.desc
      });
      try{
        await data.save();
        res.send(data);
      }
      catch(err){
          res.send(err.message);
      }
});

//   router.get('/:desc',async (req, res) => {
//       try{
//         const data = await Appointment.findOne({_id: req.params.desc});
//         if (!data) return res.status(404).send('No Appointment is found!');
    
//         res.send(data);
//       }
//       catch(err){
//         res.send(err.message);
//       }
//  });

  module.exports = router;