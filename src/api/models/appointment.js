const mongoose = require('mongoose');
const Joi = require('joi');


// Database Schema for Appointment
const Appointment = mongoose.model('Appointment', new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    desc: {
        type: String, 
        required: true, 
        trim: true
    }
}));

// Validation for Appointment
function validateAppointment(appointment) {
    const schema = {
        date: Joi.string().required(),
        time: Joi.string().required(),
        desc: Joi.string().required()
    };
    return Joi.validate(appointment, schema);
  }

module.exports = {Appointment, validateAppointment};