// src/validations/inputRules.js
import * as yup from "yup";

const newPasswordRules =  [
    v => !!v || 'Password is required',
    v => v.length >= 8 || 'Password must be at least 8 characters long',
    v => v.length <= 30 || 'Password must be at most 30 characters long',
    v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase character',
    v => /[a-z]/.test(v) || 'Password must contain at least one lowercase character',
    v => /\d/.test(v) || 'Password must contain at least one number',
    v => /[^A-Za-z0-9]/.test(v) || 'Password must contain at least one special character',
]

const fullnameRules = [
    (v) => !!v || "Name is required",
    (v) => (v && v.length <= 80) || "Name must be less than 80 characters",
    (v) => (v && v.length >= 3) || "Name must be larger than 3 characters",
  ];

  
const emailRules = [
    (v) => !!v || "E-mail is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ];

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password must be at most 30 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character')
    .matches(/[a-z]/, 'Password must contain at least one lowercase character')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export default {newPasswordRules, passwordSchema, fullnameRules, emailRules};
