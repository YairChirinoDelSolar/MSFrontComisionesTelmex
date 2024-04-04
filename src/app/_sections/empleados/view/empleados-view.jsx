import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import Iconify from '../../../_components/iconify'
import Scrollbar from '../../../_components/scrollbar'

import TableNoData from '../table-no-data'
import EmpleadosTableRow from '../empleados-table-row'
import EmpleadosTableHead from '../empleados-table-head'
import TableEmptyRows from '../table-empty-rows'
import EmpleadosTableToolbar from '../empleados-table-toolbar'
import { emptyRows, applyFilter, getComparator } from '../utils'
import { RouterLink } from '../../../_routes/components'

// ----------------------------------------------------------------------

export default function EmpleadosView({
  items,
  pagination,
  setPage,
  setRowsPerPage,
  setSort,
  handleDelete
}) {
  const { content: empleados = [], totalElements = 0 } = items
  const { page, size: rowsPerPage } = pagination

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('name')

  const [filterName, setFilterName] = useState('')

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

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = empleados.map(n => n.nombreCompleto)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = event => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const dataFiltered = applyFilter({
    inputData: empleados,
    comparator: getComparator(order, orderBy),
    filterName
  })

  const notFound = !dataFiltered.length && !!filterName

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Empleados</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          href="/empleados/create"
          component={RouterLink}
        >
          Agregar Empleado
        </Button>
      </Stack>

      <Card>
        <EmpleadosTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <EmpleadosTableHead
                order={order}
                orderBy={orderBy}
                rowCount={empleados.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'numeroEmpleado', label: 'Número Empleado' },
                  { id: 'nombreCompleto', label: 'Nombre' },
                  { id: 'rfc', label: 'RFC' },
                  {
                    id: 'tipoEmpleado_tipoEmpleado',
                    label: 'Tipo de Empleado'
                  },
                  { id: 'genero_genero', label: 'Género' },
                  { id: 'perfil_perfil', label: 'Perfil' },
                  { id: 'estatusEmpleado_estatus', label: 'Estatus' },
                  { id: 'detalleBancario_nombreBanco', label: 'Banco' },
                  {
                    id: 'detalleBancario_cuentaBancaria',
                    label: 'Cuenta Bancaria'
                  },
                  {
                    id: 'detalleBancario_clabeInterbancaria',
                    label: 'Clabe Interbancaria'
                  },
                  { id: 'estrategia', label: 'Estrategia' },
                  { id: 'estrategiaGlobal', label: 'Estrategia Global' },
                  { id: '' }
                ]}
              />
              <TableBody>
                {empleados.map(row => (
                  <EmpleadosTableRow
                    key={row.idEmpleado}
                    empleado={row}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={event => handleClick(event, row.name)}
                    handleDelete={handleDelete}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, totalElements)}
                />

                {notFound && <TableNoData query={filterName} />}
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

EmpleadosView.propTypes = {
  items: PropTypes.object,
  pagination: PropTypes.object,
  setPage: PropTypes.func,
  setRowsPerPage: PropTypes.func,
  setSort: PropTypes.func,
  handleDelete: PropTypes.func
}
