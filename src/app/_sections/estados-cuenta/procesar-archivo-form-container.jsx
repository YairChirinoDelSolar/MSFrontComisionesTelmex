import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import PropTypes from 'prop-types'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'

import { DatePickerInput } from '../../_components/forms'
import Iconify from '../../_components/iconify'

export default function ProcesarArchivoFormContainer({
  fechaArchivo,
  handleChangeDate,
  handleSubmit
}) {
  return (
    <Container>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container rowSpacing={4} columnSpacing={3}>
          <Grid xsOffset={4} xs={4}>
            <DatePickerInput
              fullWidth
              disableFuture
              id="fechaArchivo"
              name="fechaArchivo"
              label="Fecha del archivo"
              variant="outlined"
              value={fechaArchivo}
              onChange={handleChangeDate}
              validators={['required']}
              errorMessages={['La fecha del archivo es requerida']}
            />
          </Grid>
        </Grid>
        <Grid container rowSpacing={4} columnSpacing={3}>
          <Grid xsOffset={4} xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="codicon:server-process" />}
              size="large"
              type="submit"
            >
              Procesar Estado de Cuenta
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Container>
  )
}

ProcesarArchivoFormContainer.propTypes = {
  fechaArchivo: PropTypes.object,
  handleChangeDate: PropTypes.func,
  handleSubmit: PropTypes.func
}
