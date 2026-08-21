const User = require('../models/User');
const Job = require('../models/Job');
const { parseResume } = require('../utils/resumeParser');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const parsed = await parseResume(req.file.path, req.file.mimetype);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        skills: parsed.skills,
        education: parsed.education,
        experience: parsed.experience,
        resumeFileName: req.file.filename,
      },
      { new: true }
    ).select('-password');

    res.json({ message: 'Resume parsed successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to parse resume', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// simple skill-overlap match — upgraded to embeddings in Section 4
exports.getRecommendedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const jobs = await Job.find();
    const candidateSkills = (user.skills || []).map((s) => s.toLowerCase());

    const ranked = jobs.map((job) => {
      const requiredSkills = job.requiredSkills.map((s) => s.toLowerCase());
      const matched = requiredSkills.filter((s) => candidateSkills.includes(s));
      const missing = requiredSkills.filter((s) => !candidateSkills.includes(s));
      const matchScore = requiredSkills.length
        ? Math.round((matched.length / requiredSkills.length) * 100)
        : 0;

      return { _id: job._id, title: job.title, company: job.company, location: job.location, matchScore, matched, missing };
    });

    ranked.sort((a, b) => b.matchScore - a.matchScore);
    res.json(ranked);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};