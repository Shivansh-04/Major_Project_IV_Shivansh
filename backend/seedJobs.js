require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

const sampleJobs = [
  { title: 'Java Developer', company: 'ABC Technologies', description: 'Build and maintain backend services using Java and Spring Boot.', requiredSkills: ['java', 'sql', 'spring boot', 'rest api', 'git'], experience: '0-2 years', location: 'Bangalore' },
  { title: 'Frontend Developer', company: 'XYZ Ltd.', description: 'Build responsive web interfaces using React.', requiredSkills: ['html', 'css', 'javascript', 'react', 'git'], experience: '0-2 years', location: 'Remote' },
  { title: 'Data Analyst', company: 'DataWorks Inc.', description: 'Analyze business data and build dashboards.', requiredSkills: ['python', 'sql', 'excel', 'power bi'], experience: '0-1 years', location: 'Delhi' },
  { title: 'Backend Developer', company: 'Tech Ltd.', description: 'Design and build scalable REST APIs.', requiredSkills: ['node.js', 'express', 'mongodb', 'rest api', 'docker'], experience: '1-3 years', location: 'Gurgaon' },
  { title: 'ML Engineer', company: 'AI Labs', description: 'Build and deploy machine learning models.', requiredSkills: ['python', 'machine learning', 'tensorflow', 'pandas', 'numpy'], experience: '1-2 years', location: 'Remote' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Job.deleteMany({});
  await Job.insertMany(sampleJobs);
  console.log('Sample jobs seeded');
  process.exit();
}

seed();