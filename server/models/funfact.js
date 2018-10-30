// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const FunFactSchema = new mongoose.Schema({
  fact: {
    type: String,
    required: true,
    trim: true
  },
  id: {
    type: Number,
    required: true
  }
});

const FunFact = mongoose.model('FunFact', FunFactSchema);
module.exports = FunFact;
