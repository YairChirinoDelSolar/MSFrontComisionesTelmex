import React, { forwardRef } from 'react'
import { TextValidator } from 'react-material-ui-form-validator'
import PropTypes from 'prop-types'

import MenuItem from '@mui/material/MenuItem'

const SelectInput = forwardRef(
  (
    {
      name,
      id,
      label,
      value = '',
      margin = 'none',
      size,
      defaultOptionLabel,
      options = [],
      validators = [],
      errorMessages = [],
      onChange
    },
    ref
  ) => {
    const SelectOptions = options.map(option => (
      <MenuItem key={option.id} value={option.id}>
        {option.label}
      </MenuItem>
    ))

    return (
      <TextValidator
        ref={ref}
        fullWidth
        select
        margin={margin}
        name={name}
        id={id}
        label={label}
        value={value}
        variant="outlined"
        size={size}
        onChange={onChange}
        validators={validators}
        errorMessages={errorMessages}
      >
        <MenuItem value="">
          {defaultOptionLabel || 'Selecciona una opción'}
        </MenuItem>
        {SelectOptions}
      </TextValidator>
    )
  }
)

SelectInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  margin: PropTypes.string,
  size: PropTypes.string,
  defaultOptionLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.element),
  validators: PropTypes.arrayOf(PropTypes.string),
  errorMessages: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

export default SelectInput
