import * as yup from 'yup'

export const validateLoginForm = yup.object().shape({
    username: yup.string().required('Campo requerido.'),
    password: yup.string().required('Campo requerido.'),
})
