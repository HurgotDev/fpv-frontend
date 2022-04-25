import { Control } from 'react-hook-form'

export interface ISelect {
    name: string
    control: Control<any, object>
    label?: string
    placeholder?: string
    options: Array<{ key: string; value: string }>
    width?: string
}
