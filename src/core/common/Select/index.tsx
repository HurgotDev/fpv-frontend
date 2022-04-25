import { FC } from 'react'
import { Select as AntdISelect } from 'antd'
import { Controller } from 'react-hook-form'

import { InputError } from '..'

import { ISelect } from './types'

const Select: FC<ISelect> = ({ name, label, placeholder, control, options, width }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, formState: { errors } }) => {
                return (
                    <div>
                        {!!label && <label>{label}</label>}

                        <div>
                            <AntdISelect
                                placeholder={placeholder}
                                status={errors[name] ? 'error' : ''}
                                style={{ width: width || 'auto' }}
                                value={value}
                                onChange={onChange}
                            >
                                {options.map((option) => {
                                    return (
                                        <AntdISelect.Option key={`select-item-${option.key}`} value={option.key}>
                                            {option.value}
                                        </AntdISelect.Option>
                                    )
                                })}
                            </AntdISelect>
                        </div>
                        <InputError>{!!errors[name] && errors[name].message}</InputError>
                    </div>
                )
            }}
        />
    )
}

export default Select
