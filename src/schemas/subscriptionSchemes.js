/* eslint-disable import/prefer-default-export */
import joi from 'joi';

const subcribeSchema = joi
  .object({
    plan_type: joi.string().valid('Monthly', 'Weekly').required(),
    day_month: joi.string().valid('1', '10', '20'),
    day_week: joi.string().valid('Segunda', 'Quarta', 'Sexta'),
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
    address: joi.object().required(),
  })
  .xor('day_month', 'day_week');

export { subcribeSchema };
