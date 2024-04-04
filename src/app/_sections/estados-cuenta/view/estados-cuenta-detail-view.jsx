import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'

import Iconify from '../../../_components/iconify'
import Scrollbar from '../../../_components/scrollbar'
import { RouterLink } from '../../../_routes/components'
import EstadosCuentaDetailTableToolbar from '../estados-cuenta-detail-table-toolbar'
import EstadosCuentaTableHead from '../estados-cuenta-table-head'
import EstadosCuentaDetailTableRow from '../estados-cuenta-detail-table-row'
import TableEmptyRows from '../table-empty-rows'
import { emptyRows } from '../utils'

export default function EstadosCuentaDetailView({
  detail,
  pagination,
  setPage,
  setRowsPerPage,
  setSort
}) {
  const { content: registrosEdoCuenta = [], totalElements = 0 } = detail
  const { page, size: rowsPerPage } = pagination

  const [order, setOrder] = useState('asc')

  const [orderBy, setOrderBy] = useState('name')

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc'
    const orderLabel = isAsc ? 'desc' : 'asc'
    if (id !== '') {
      setPage(0)
      setOrder(orderLabel)
      setOrderBy(id)
      setSort(`${id},${orderLabel}`)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Detalle de Estado de Cuenta</Typography>

        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Iconify icon="ph:arrow-square-left" />}
          href="/estados-cuenta"
          component={RouterLink}
        >
          Regresar
        </Button>
      </Stack>

      <Card>
        <EstadosCuentaDetailTableToolbar />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <EstadosCuentaTableHead
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'quincena', label: 'Quincena' },
                  { id: 'rubro', label: 'Rubro' },
                  { id: 'master', label: 'Master' },
                  { id: 'estrategia', label: 'Estrategia' },
                  { id: 'promotor', label: 'Promotor' },
                  { id: 'folio', label: 'Folio' },
                  { id: 'division', label: 'División' },
                  { id: 'subdireccion', label: 'Subdirección' },
                  { id: 'empresa', label: 'Empresa' },
                  { id: 'fecha', label: 'Fecha' },
                  { id: 'importeBase', label: 'Importe Base' },
                  { id: 'importePosteo', label: 'Importe Posteo' },
                  { id: 'telPago', label: 'Teléfono Pago' }
                ]}
              />
              <TableBody>
                {registrosEdoCuenta.map(row => (
                  <EstadosCuentaDetailTableRow
                    key={row.idEstadoCuentaDetalle}
                    registroEstadoCuenta={row}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, totalElements)}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  )
}

EstadosCuentaDetailView.propTypes = {
  detail: PropTypes.object,
  pagination: PropTypes.object,
  setPage: PropTypes.func,
  setRowsPerPage: PropTypes.func,
  setSort: PropTypes.func
}
