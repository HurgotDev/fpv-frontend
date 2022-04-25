import * as yup from 'yup'

export const validateSignupForm = yup.object().shape({
    username: yup.string().required('Campo requerido.'),
    name: yup.string().required('Campo requerido.'),
    lastName: yup.string().required('Campo requerido.'),
    password: yup.string().required('Campo requerido.'),
})
