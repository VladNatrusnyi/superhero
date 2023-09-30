import { body } from 'express-validator'

export const superheroValidator = [
  body('nickname')
    .trim()
    .notEmpty().withMessage('Nickname is a required field')
    .isString().withMessage('Nickname must be a string'),
  body('real_name').trim().notEmpty().withMessage('Real Name is a required field'),
  body('origin_description').trim().notEmpty().withMessage('Origin Description is a required field'),
  body('superpowers').isArray({ min: 1 }).withMessage('Superpowers is a required field and must be an array with at least one superpower'),
  body('catch_phrase').trim().notEmpty().withMessage('Catch Phrase is a required field'),
  body('Images').optional().isArray().withMessage('Images must be an array if specified'),
]

