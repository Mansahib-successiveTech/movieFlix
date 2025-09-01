import Joi from "joi";

export const schemas = {
  // Register validation
  register: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().min(5).required(),
  }),

  // Login validation
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  // Add Movie validation
  addMovie: Joi.object({
    title: Joi.string().min(1).required(),
    director: Joi.string().min(2).required(),
    genre: Joi.string().required(),
    year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
    price: Joi.number().positive().required(),
    desc: Joi.string().min(10).required(),
    language: Joi.string().required(),
    poster: Joi.string().uri().required(),
  }),
};

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};
