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

const addGameValidator = celebrate({
    [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        price_per_hour: Joi.number().min(50).required(),
        player_count: Joi.number().min(1).default(1),
    }),
})

const paginationValidator = celebrate({
    [Segments.QUERY]: Joi.object({
        page: Joi.number().positive().min(1),
        limit: Joi.number().positive().min(1),
    }),
})

const sessionActionValidator = celebrate({
    [Segments.BODY]: Joi.object({
        user_id: Joi.string().pattern(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/).required(),
        game_id: Joi.string().pattern(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/).required(),
    }),
})

const paramsValidator = celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().pattern(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/).required(),
    }),
})


module.exports = {
    regiterValidation,
    singInValidator,
    addGameValidator,
    paginationValidator,
    sessionActionValidator,
    paramsValidator
}