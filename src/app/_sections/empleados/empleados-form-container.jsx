import React, { useEffect, useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import PropTypes from 'prop-types'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'

import Iconify from '../../_components/iconify'
import { DatePickerInput, SelectInput } from '../../_components/forms'
import { EMPLEADOS_CONSTANTS } from '../../_constants'

export default function EmpleadosFormContainer({
  idEmpleado,
  catalogs,
  empleado,
  handleChange,
  handleChangeDate,
  handleSubmit
}) {
  const {
    estatusEmpleado = [],
    perfil = [],
    tipoEmpleado = [],
    genero = []
  } = catalogs
  const [showFechaBaja, setShowFechaBaja] = useState(
    empleado.estatusEmpleado?.idEstatus !==
      EMPLEADOS_CONSTANTS.ESTATUS_EMPLEADO_ACTIVO
  )
  useEffect(() => {
    setShowFechaBaja(
      empleado.estatusEmpleado?.idEstatus !==
        EMPLEADOS_CONSTANTS.ESTATUS_EMPLEADO_ACTIVO
    )
  }, [empleado])
  const shrink = idEmpleado ? true : undefined

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Container maxWidth="xl">
        <Grid container rowSpacing={4} columnSpacing={3}>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="numeroEmpleado"
              name="numeroEmpleado"
              label="Número de Empleado"
              variant="outlined"
              value={empleado.numeroEmpleado}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['El número de empleado es requerido']}
            />
          </Grid>
          <Grid xs={5}>
            <TextValidator
              fullWidth
              margin="dense"
              id="nombreCompleto"
              name="nombreCompleto"
              label="Nombre Completo"
              variant="outlined"
              value={empleado.nombreCompleto}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['El nombre del empleado es requerido']}
            />
          </Grid>
          <Grid xs={4}>
            <TextValidator
              fullWidth
              margin="dense"
              id="rfc"
              name="rfc"
              label="RFC"
              variant="outlined"
              value={empleado.rfc}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['El RFC es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <SelectInput
              id="genero"
              name="genero"
              label="Género"
              value={empleado.genero?.idGenero}
              margin="dense"
              onChange={handleChange}
              options={genero.map(el => ({
                id: el.idGenero,
                label: el.genero
              }))}
              validators={['required']}
              errorMessages={['El género es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <SelectInput
              id="tipoEmpleado"
              name="tipoEmpleado"
              label="Tipo de Empleado"
              value={empleado.tipoEmpleado?.idTipoEmpleado}
              margin="dense"
              onChange={handleChange}
              options={tipoEmpleado.map(el => ({
                id: el.idTipoEmpleado,
                label: el.tipoEmpleado
              }))}
              validators={['required']}
              errorMessages={['El tipo empleado es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <SelectInput
              id="perfil"
              name="perfil"
              label="Perfil"
              value={empleado.perfil?.idPerfil}
              margin="dense"
              onChange={handleChange}
              options={perfil.map(el => ({
                id: el.idPerfil,
                label: el.perfil
              }))}
              validators={['required']}
              errorMessages={['El perfil es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <SelectInput
              id="estatusEmpleado"
              name="estatusEmpleado"
              label="Estatus de Empleado"
              value={empleado.estatusEmpleado?.idEstatus}
              margin="dense"
              onChange={handleChange}
              options={estatusEmpleado.map(el => ({
                id: el.idEstatus,
                label: el.estatus
              }))}
              validators={['required']}
              errorMessages={['El estatus de empleado es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="nombreBanco"
              name="nombreBanco"
              label="Nombre del Banco"
              variant="outlined"
              value={empleado.nombreBanco}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['El nombre del banco es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="clabeInterbancaria"
              name="clabeInterbancaria"
              label="Clabe Interbancaria"
              variant="outlined"
              value={empleado.clabeInterbancaria}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['La clabe interbancaria es requerida']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="cuentaBancaria"
              name="cuentaBancaria"
              label="Cuenta Bancaria"
              variant="outlined"
              value={empleado.cuentaBancaria}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['La cuenta bancaria es requerida']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="subGrupo"
              name="subGrupo"
              label="Subgrupo"
              variant="outlined"
              value={empleado.subGrupo}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['El subgrupo es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="estrategia"
              name="estrategia"
              label="Estrategia"
              variant="outlined"
              value={empleado.estrategia}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['La estrategia es requerida']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="estrategiaGlobal"
              name="estrategiaGlobal"
              label="Estrategia Global"
              variant="outlined"
              value={empleado.estrategiaGlobal}
              onChange={handleChange}
              InputLabelProps={{ shrink }}
              validators={['required']}
              errorMessages={['La estrategia global es requerida']}
            />
          </Grid>
          <Grid xs={3}>
            <DatePickerInput
              fullWidth
              disableFuture
              margin="dense"
              id="fechaNacimiento"
              name="fechaNacimiento"
              label="Fecha de Nacimiento"
              variant="outlined"
              value={empleado.fechaNacimiento}
              onChange={(daysJSInstance, validation) =>
                handleChangeDate('fechaNacimiento', daysJSInstance, validation)
              }
              validators={['required']}
              errorMessages={['La fecha de nacimiento es requerida']}
            />
          </Grid>
          <Grid xs={3}>
            <DatePickerInput
              fullWidth
              margin="dense"
              id="fechaIngreso"
              name="fechaIngreso"
              label="Fecha de Ingreso"
              variant="outlined"
              value={empleado.fechaIngreso}
              onChange={(daysJSInstance, validation) =>
                handleChangeDate('fechaIngreso', daysJSInstance, validation)
              }
              validators={['required']}
              errorMessages={['La fecha de ingreso es requerida']}
            />
          </Grid>
          {showFechaBaja ? (
            <Grid xs={3}>
              <DatePickerInput
                fullWidth
                disableValidationStyles
                margin="dense"
                id="fechaBaja"
                name="fechaBaja"
                label="Fecha de Baja"
                variant="outlined"
                value={empleado.fechaBaja}
                onChange={(daysJSInstance, validation) =>
                  handleChangeDate('fechaBaja', daysJSInstance, validation)
                }
              />
            </Grid>
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          )}
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
              {idEmpleado ? 'Editar Empleado' : 'Agregar Empleado'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ValidatorForm>
  )
}

EmpleadosFormContainer.propTypes = {
  idEmpleado: PropTypes.string,
  catalogs: PropTypes.object,
  empleado: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeDate: PropTypes.func,
  handleSubmit: PropTypes.func
}
