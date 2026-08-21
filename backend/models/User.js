const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['candidate', 'company'], required: true },
    name: { type: String, required: true }, // full name OR company name
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // candidate-only (filled in later)
    skills: [{ type: String }],
    education: { type: String },
    experience: { type: String },

    // company-only (filled in later)
    companyDescription: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);