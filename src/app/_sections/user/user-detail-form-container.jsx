import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'

import Iconify from '../../_components/iconify'

export default function UserDetailFormContainer({
  catalogs,
  user,
  handleChange,
  handleChangeRol,
  handleSubmit
}) {
  const [hasRoles, setHasRoles] = useState()
  const { rol = [] } = catalogs

  useEffect(() => {
    setHasRoles(user.roles?.length ? true : undefined)
  }, [user.roles])

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Container maxWidth="xl">
        <Grid container rowSpacing={4} columnSpacing={3}>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="username"
              name="username"
              label="Nombre de Usuario"
              variant="outlined"
              value={user.username}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['El nombre de usuario es requerido']}
            />
          </Grid>
          <Grid xs={3}>
            <TextValidator
              fullWidth
              margin="dense"
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              variant="outlined"
              value={user.password}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['La contraseña es requerida']}
            />
          </Grid>
          <Grid xs={4}>
            <Autocomplete
              multiple
              id="tags-roles"
              name="tags-roles"
              options={rol}
              getOptionLabel={option => option.name}
              onChange={handleChangeRol}
              noOptionsText="No se encontraron resultados"
              renderInput={params => (
                <TextValidator
                  {...params}
                  fullWidth
                  margin="dense"
                  id="roles"
                  name="roles"
                  label="Roles de Usuario"
                  value={hasRoles}
                  validators={['required']}
                  errorMessages={['El rol del usuario es requerido']}
                />
              )}
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
              Agregar Usuario
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ValidatorForm>
  )
}

UserDetailFormContainer.propTypes = {
  catalogs: PropTypes.object,
  user: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeRol: PropTypes.func,
  handleSubmit: PropTypes.func
}
