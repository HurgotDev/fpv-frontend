import { Control } from 'react-hook-form'

export interface IInput {
    name: string
    control: Control<any, object>
    label?: string
    placeholder?: string
    password?: boolean
}
