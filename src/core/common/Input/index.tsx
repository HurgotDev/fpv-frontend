import { FC } from 'react'
import { Input as AntdInput } from 'antd'
import { Controller } from 'react-hook-form'

import { InputError } from '..'

import { IInput } from './types'

const Input: FC<IInput> = ({ name, label, placeholder, password, control }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, formState: { errors } }) => {
                return (
                    <div>
                        {!!label && <label>{label}</label>}
                        {password ? (
                            <AntdInput.Password
                                placeholder={placeholder}
                                status={errors[name] ? 'error' : ''}
                                value={value}
                                onChange={onChange}
                            />
                        ) : (
                            <AntdInput
                                placeholder={placeholder}
                                status={errors[name] ? 'error' : ''}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                        <InputError>{!!errors[name] && errors[name].message}</InputError>
                    </div>
                )
            }}
        />
    )
}

export default Input
