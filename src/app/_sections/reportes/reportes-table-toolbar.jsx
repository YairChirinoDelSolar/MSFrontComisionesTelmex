import React from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import PropTypes from 'prop-types'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import Iconify from '../../_components/iconify'

import { SelectInput } from '../../_components/forms'

// ----------------------------------------------------------------------

export default function ReportesTableToolbar({
  numSelected,
  catalogs,
  estadosCuenta,
  filterBy,
  handleChangeFilters,
  handleSubmit
}) {
  const { pagoConcepto = [], tipoEmpleado = [] } = catalogs

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Container
        maxWidth="xl"
        sx={{
          height: 86,
          justifyContent: 'space-between',
          p: theme => theme.spacing(0, 1, 0, 3),
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter'
          })
        }}
      >
        <Grid container rowSpacing={4} columnSpacing={3}>
          <Grid xs={2}>
            <SelectInput
              fullWidth
              margin="dense"
              id="idEstadoCuenta"
              name="idEstadoCuenta"
              label="Estado de Cuenta"
              variant="outlined"
              size="small"
              value={filterBy.idEstadoCuenta}
              onChange={handleChangeFilters}
              options={estadosCuenta.map(estado => ({
                id: estado.idEstadoCuenta,
                label: estado.nombreArchivo
              }))}
            />
          </Grid>

          <Grid xs={2}>
            <SelectInput
              fullWidth
              margin="dense"
              id="conceptoPago"
              name="conceptoPago"
              label="Concepto de Pago"
              variant="outlined"
              size="small"
              value={filterBy.conceptoPago}
              onChange={handleChangeFilters}
              options={pagoConcepto.map(el => ({
                id: el.pagoConcepto,
                label: el.pagoConcepto
              }))}
            />
          </Grid>

          <Grid xs={2}>
            <SelectInput
              fullWidth
              margin="dense"
              id="idTipoEmpleado"
              name="idTipoEmpleado"
              label="Tipo de Empleado"
              variant="outlined"
              size="small"
              value={filterBy.idTipoEmpleado}
              onChange={handleChangeFilters}
              options={tipoEmpleado.map(el => ({
                id: el.idTipoEmpleado,
                label: el.tipoEmpleado
              }))}
            />
          </Grid>

          <Grid xs={1}>
            <Button
              sx={{
                marginTop: '10px'
              }}
              variant="text"
              color="inherit"
              startIcon={<Iconify icon="eva:search-fill" />}
              size="medium"
              type="submit"
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ValidatorForm>
  )
}

ReportesTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  catalogs: PropTypes.object,
  estadosCuenta: PropTypes.arrayOf(PropTypes.object),
  filterBy: PropTypes.object,
  onFilterName: PropTypes.func,
  handleChangeFilters: PropTypes.func,
  handleSubmit: PropTypes.func
}
