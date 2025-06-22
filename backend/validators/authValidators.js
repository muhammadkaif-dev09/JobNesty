const Joi = require("joi");

const registerValidation = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/).optional(),
  bio: Joi.string().max(300).optional(),
  role: Joi.string().valid("job_seeker", "recruiter").required(),
  profilePic: Joi.string().uri().optional(),
  location: Joi.string().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  socialLinks: Joi.object({
    linkedin: Joi.string().uri().optional(),
    github: Joi.string().uri().optional(),
    portfolio: Joi.string().uri().optional(),
  }).optional()
});

module.exports = { registerValidation };
