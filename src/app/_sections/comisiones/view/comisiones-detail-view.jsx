import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

import Scrollbar from '../../../_components/scrollbar'
import ComisionesFormContainer from '../comisiones-form-container'
import { RouterLink } from '../../../_routes/components'
import { useRouter } from '../../../_routes/hooks'
import Iconify from '../../../_components/iconify'
import { handleError } from '../../../_utils'

export default function ComisionesDetailView({
  idComision,
  catalogs,
  detail,
  handleCreate,
  handleUpdate
}) {
  const router = useRouter()
  const [comision, setComision] = useState(detail)

  useEffect(() => {
    setComision(detail)
  }, [detail])

  const onChangeForm = ({ target: { value, name } }) => {
    let val = value

    /* Para combobox */
    if (name in catalogs) {
      val = catalogs[name].find(cat => Object.values(cat).includes(value))
    }

    setComision(prevState => ({ ...prevState, [name]: val }))
  }

  const onSubmit = () => {
    const redirect = () => {
      router.push('/comisiones')
    }

    if (idComision) {
      handleUpdate(idComision, comision).then(redirect).catch(handleError)
    } else {
      handleCreate(comision).then(redirect).catch(handleError)
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
          {idComision ? 'Editar Comisión' : 'Agregar Comisión'}
        </Typography>

        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Iconify icon="ph:arrow-square-left" />}
          href="/comisiones"
          component={RouterLink}
        >
          Regresar
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <ComisionesFormContainer
            idComision={idComision}
            catalogs={catalogs}
            comision={comision}
            handleChange={onChangeForm}
            handleSubmit={onSubmit}
          />
        </Scrollbar>
      </Card>
    </Container>
  )
}

ComisionesDetailView.propTypes = {
  idComision: PropTypes.string,
  catalogs: PropTypes.object,
  detail: PropTypes.object,
  handleCreate: PropTypes.func,
  handleUpdate: PropTypes.func
}
