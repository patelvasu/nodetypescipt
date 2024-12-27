import Joi from 'joi';
import Messages from '../../Constants/messages';

export const employeeSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': Messages.Validation.USER_NAME_REQUIRED,
  }),
  email: Joi.string()    
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({      
      'any.required': Messages.Validation.EMAIL_REQUIRED,
      'string.pattern.base': Messages.Validation.INVALID_EMAIL,
    }),
  password: Joi.string().min(6).required().messages({
    'string.min': Messages.Validation.PASSWORD_MIN_LENGTH,
    'any.required': Messages.Validation.PASSWROD_REQUIRED,
  }),
  phone: Joi.string().required(),
  department:Joi.string().required(),
});
// .unknown(true);  If Add this then extra filed allow other wise throw error
export const employeeLoginSchema = Joi.object({
  email: Joi.string()
  .email()
  .required()  
  .messages({
    'string.email': Messages.Validation.INVALID_EMAIL,
    'any.required': Messages.Validation.EMAIL_REQUIRED,    
  }),
  password: Joi.string().required().messages({
    'any.required': Messages.Validation.PASSWROD_REQUIRED,
  })
})