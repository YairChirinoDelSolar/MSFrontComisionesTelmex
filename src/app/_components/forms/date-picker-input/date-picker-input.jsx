import React, { forwardRef } from 'react'
import { TextValidator } from 'react-material-ui-form-validator'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { esES } from '@mui/x-date-pickers/locales'

const DatePickerInput = forwardRef(
  (
    {
      name,
      id,
      label,
      value,
      margin = 'none',
      fullWidth,
      disableFuture,
      disableTextField,
      validators = [],
      errorMessages = [],
      onChange
    },
    ref
  ) => {
    const inputFormat = 'YYYY-MM-DD'
    const formattedValue = value ? dayjs(value, inputFormat) : null
    const spanishLocale =
      esES.components.MuiLocalizationProvider.defaultProps.localeText

    return (
      <LocalizationProvider
        ref={ref}
        dateAdapter={AdapterDayjs}
        localeText={spanishLocale}
        adapterLocale="es"
      >
        <DatePicker
          margin={margin}
          id={id}
          name={name}
          label={label}
          variant="outlined"
          value={formattedValue}
          onChange={onChange}
          disableFuture={disableFuture}
          slots={{
            textField: TextValidator
          }}
          slotProps={{
            textField: {
              disabled: disableTextField,
              margin,
              fullWidth,
              validators,
              errorMessages
            }
          }}
        />
      </LocalizationProvider>
    )
  }
)

DatePickerInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool,
  disableFuture: PropTypes.bool,
  disableTextField: PropTypes.bool,
  validators: PropTypes.arrayOf(PropTypes.string),
  errorMessages: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

export default DatePickerInput
