import React from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import PropTypes from 'prop-types'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'

import Iconify from '../../_components/iconify'
import { SelectInput } from '../../_components/forms'

export default function ComisionesFormContainer({
  idComision,
  catalogs,
  comision,
  handleChange,
  handleSubmit
}) {
  const {
    tipoCliente = [],
    tipoServicio = [],
    porcentajeComision = []
  } = catalogs
  const shrink = idComision ? true : undefined

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Container maxWidth="xl">
        <Grid container rowSpacing={4} columnSpacing={3}>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="velocidad"
              name="velocidad"
              label="Velocidad"
              variant="outlined"
              value={comision.velocidad}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['La velocidad es requerida']}
            />
          </Grid>
          <Grid xs={4}>
            <TextValidator
              fullWidth
              margin="dense"
              id="paquete"
              name="paquete"
              label="Paquete"
              variant="outlined"
              value={comision.paquete}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['El paquete es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="renta"
              name="renta"
              label="Renta"
              variant="outlined"
              value={comision.renta}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['La renta es requerida']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="posteo"
              name="posteo"
              label="Posteo"
              variant="outlined"
              value={comision.posteo}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['El posteo es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="navegacion"
              name="navegacion"
              label="Navegación"
              variant="outlined"
              value={comision.navegacion}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['La navegación es requerida']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="pagoCliente"
              name="pagoCliente"
              label="Pago Cliente"
              variant="outlined"
              value={comision.pagoCliente}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['El pago cliente es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <SelectInput
              id="tipoCliente"
              name="tipoCliente"
              label="Tipo Cliente"
              value={comision.tipoCliente?.idTipoCliente}
              margin="dense"
              onChange={handleChange}
              options={tipoCliente.map(el => ({
                id: el.idTipoCliente,
                label: el.tipoCliente
              }))}
              validators={['required']}
              errorMessages={['El tipo cliente es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <SelectInput
              id="tipoServicio"
              name="tipoServicio"
              label="Tipo Servicio"
              value={comision.tipoServicio?.idTipoServicio}
              margin="dense"
              onChange={handleChange}
              options={tipoServicio.map(el => ({
                id: el.idTipoServicio,
                label: el.tipoServicio
              }))}
              validators={['required']}
              errorMessages={['El tipo servicio es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <SelectInput
              id="porcentajeComision"
              name="porcentajeComision"
              label="Porcentaje de Comision"
              value={comision.porcentajeComision?.idPorcentajeComision}
              margin="dense"
              onChange={handleChange}
              options={porcentajeComision.map(el => ({
                id: el.idPorcentajeComision,
                label: el.aliasPorcentajeComision
              }))}
              validators={['required']}
              errorMessages={['El porcentaje de comisión es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="total"
              name="total"
              label="Total"
              variant="outlined"
              value={comision.total}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['El total es requerido']}
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        <Grid container rowSpacing={4} columnSpacing={3}>
          <Grid xsOffset={10} xs={2}>
            <Button
              fullWidth
              variant="contained"
              color="info"
              startIcon={<Iconify icon="zondicons:add-outline" />}
              size="large"
              type="submit"
            >
              {idComision ? 'Editar Comisión' : 'Agregar Comisión'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ValidatorForm>
  )
}

ComisionesFormContainer.propTypes = {
  idComision: PropTypes.string,
  catalogs: PropTypes.object,
  comision: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}
