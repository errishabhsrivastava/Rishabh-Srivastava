const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  projectName: String,
  projectDetails: String,
  category: String,
  subcategory: String,
  imageURL: String,
  status: String,
  startDate: Date,
  endDate: Date,
  clientName: String,
  clientEmail: String,
  clientCompany: String,
  skillsUsed: [String],
  projectURL: String,
  testimonials: [String],
  projectCost: Number,
  tags: [String],
  timestamps: { type: Date, default: Date.now }
});

// Register the model
const User = mongoose.model('portfolio', userSchema);

module.exports = User;
