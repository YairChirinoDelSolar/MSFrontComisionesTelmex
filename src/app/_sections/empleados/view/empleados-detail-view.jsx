import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

import Scrollbar from '../../../_components/scrollbar'
import EmpleadosFormContainer from '../empleados-form-container'
import { RouterLink } from '../../../_routes/components'
import { useRouter } from '../../../_routes/hooks'
import Iconify from '../../../_components/iconify'
import { handleError } from '../../../_utils'

export default function EmpleadosDetailView({
  idEmpleado,
  catalogs,
  detail,
  handleCreate,
  handleUpdate
}) {
  const router = useRouter()
  const [empleado, setEmpleado] = useState(detail)

  useEffect(() => {
    setEmpleado(detail)
  }, [detail])

  const onChangeForm = ({ target: { value, name } }) => {
    let val = value

    /* Para combobox */
    if (name in catalogs) {
      val = catalogs[name].find(cat => Object.values(cat).includes(value))
    }

    setEmpleado(prevState => ({ ...prevState, [name]: val }))
  }

  const onChangeDate = (name, daysJSInstance, { validationError }) => {
    if (!validationError) {
      const value = daysJSInstance.format('YYYY-MM-DD')
      setEmpleado(prevState => ({ ...prevState, [name]: value }))
    }
  }

  const onSubmit = () => {
    const redirect = () => {
      router.push('/empleados')
    }

    if (idEmpleado) {
      handleUpdate(idEmpleado, empleado).then(redirect).catch(handleError)
    } else {
      handleCreate(empleado).then(redirect).catch(handleError)
    }
  }

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">
          {idEmpleado ? 'Editar Empleado' : 'Agregar Empleado'}
        </Typography>

        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Iconify icon="ph:arrow-square-left" />}
          href="/empleados"
          component={RouterLink}
        >
          Regresar
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <EmpleadosFormContainer
            idEmpleado={idEmpleado}
            catalogs={catalogs}
            empleado={empleado}
            handleChange={onChangeForm}
            handleChangeDate={onChangeDate}
            handleSubmit={onSubmit}
          />
        </Scrollbar>
      </Card>
    </Container>
  )
}

EmpleadosDetailView.propTypes = {
  idEmpleado: PropTypes.string,
  catalogs: PropTypes.object,
  detail: PropTypes.object,
  handleCreate: PropTypes.func,
  handleUpdate: PropTypes.func
}
