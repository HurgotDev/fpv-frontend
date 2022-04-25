import * as yup from 'yup'

export const validateSubscriptionsForm = yup.object().shape({
    fundId: yup.string().required('Campo requerido.'),
    amount: yup.number().typeError('Ingrese un valor correcto').required('Campo requerido'),
})
