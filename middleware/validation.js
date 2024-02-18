const { celebrate, Joi, Segments } = require('celebrate');

const regiterValidation = celebrate({
    [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().pattern(/^\d{10}$/).required(),
    }),
});

const singInValidator = celebrate({
    [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().pattern(/^\d{10}$/),
    }),
})

module.exports = {
    regiterValidation,
    singInValidator
}