const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const SKILLS_LIST = require('./skillsList');

async function extractText(filePath, mimeType) {
  const buffer = fs.readFileSync(filePath);

  if (mimeType === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error('Unsupported file type');
}

function extractSkills(text) {
  const lowerText = text.toLowerCase();
  return SKILLS_LIST.filter((skill) => lowerText.includes(skill.toLowerCase()));
}

function extractEducation(text) {
  const patterns = [
    /b\.?\s?tech[^.\n]*/i,
    /b\.?\s?e\.?[^.\n]*/i,
    /bca[^.\n]*/i,
    /m\.?\s?tech[^.\n]*/i,
    /mca[^.\n]*/i,
    /mba[^.\n]*/i,
    /bachelor[^.\n]*/i,
    /master[^.\n]*/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0].trim().slice(0, 100);
  }
  return 'Not specified';
}

function extractExperience(text) {
  const expMatch = text.match(/(\d+)\+?\s*(years?|yrs?)\s*(of)?\s*experience/i);
  if (expMatch) return `${expMatch[1]} years`;
  if (/fresher/i.test(text)) return 'Fresher';
  return 'Not specified';
}

async function parseResume(filePath, mimeType) {
  const text = await extractText(filePath, mimeType);
  return {
    skills: extractSkills(text),
    education: extractEducation(text),
    experience: extractExperience(text),
  };
}

module.exports = { parseResume };