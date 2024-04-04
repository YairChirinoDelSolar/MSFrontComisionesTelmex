import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'

import Scrollbar from '../../../_components/scrollbar'
import UserDetailFormContainer from '../user-detail-form-container'
import Iconify from '../../../_components/iconify'
import { RouterLink } from '../../../_routes/components'
import { useRouter } from '../../../_routes/hooks'
import { handleError } from '../../../_utils'

export default function UserDetailView({ detail, catalogs, handleCreate }) {
  const router = useRouter()
  const [user, setUser] = useState(detail)

  useEffect(() => {
    setUser(detail)
  }, [detail])

  const onChangeForm = ({ target: { value, name } }) => {
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  const onChangeRol = (_, values) => {
    const roles = values.map(val => ({ idRole: val.idRole }))
    setUser(prevState => ({ ...prevState, roles }))
  }

  const onSubmit = () => {
    handleCreate(user)
      .then(() => {
        router.push('/empleados')
      })
      .catch(handleError)
  }

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Crear Usuario</Typography>

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
          <UserDetailFormContainer
            user={user}
            catalogs={catalogs}
            handleChange={onChangeForm}
            handleChangeRol={onChangeRol}
            handleSubmit={onSubmit}
          />
        </Scrollbar>
      </Card>
    </Container>
  )
}

UserDetailView.propTypes = {
  detail: PropTypes.object,
  catalogs: PropTypes.object,
  handleCreate: PropTypes.func
}
