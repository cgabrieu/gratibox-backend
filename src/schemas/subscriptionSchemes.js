/* eslint-disable import/prefer-default-export */
import joi from 'joi';

const subcribeSchema = joi
  .object({
    plan_type: joi.string().valid('Monthly', 'Weekly').required(),
    day: joi.string().valid('1', '10', '20', 'Segunda', 'Quarta', 'Sexta'),
    receiving_options: joi.array()
      .items(
        joi.object({
          option_name: joi.string().valid('Chás'),
        }),
        joi.object({
          option_name: joi.string().valid('Incensos'),
        }),
        joi.object({
          option_name: joi.string().valid('Produtos Orgânicos'),
        }),
      )
      .unique()
      .min(1)
      .required(),
    address: joi.object({
      name: joi.string().min(2).required(),
      address: joi.string().min(4).required(),
      cep: joi.string().length(9).required(),
      city: joi.string().min(2).required(),
      state: joi.string().length(2).required(),
    }).required(),
  });

export { subcribeSchema };
