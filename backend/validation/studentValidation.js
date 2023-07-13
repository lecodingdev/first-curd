const Joi = require("joi");

// create validation
const createValidation = (data) => {
  const studentschema = Joi.object({
    npm: Joi.number().required(),
    nama: Joi.string().required(),
    jurusan: Joi.string().required(),
  });

  return studentschema.validate(data);
};

module.exports = {
  createValidation,
};
