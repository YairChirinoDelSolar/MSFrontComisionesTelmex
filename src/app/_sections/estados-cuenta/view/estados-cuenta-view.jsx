import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'

import ProcesarArchivoFormContainer from '../procesar-archivo-form-container'
import EstadosCuentaTableToolbar from '../estados-cuenta-table-toolbar'
import Scrollbar from '../../../_components/scrollbar'
import EstadosCuentaTableHead from '../estados-cuenta-table-head'
import { applyFilter, emptyRows, getComparator } from '../utils'
import TableEmptyRows from '../table-empty-rows'
import TableNoData from '../table-no-data'
import EstadosCuentaTableRow from '../estados-cuenta-table-row'

export default function EstadosCuentaView({
  items,
  fechaArchivo,
  pagination,
  setPage,
  setRowsPerPage,
  setSort,
  handleChangeDate,
  handleSubmit,
  handleDelete,
  handleCalculate
}) {
  const { content: estadosCuenta = [], totalElements = 0 } = items
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
      const newSelecteds = estadosCuenta.map(n => n.nombreCompleto)
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
    inputData: estadosCuenta,
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
        <Typography variant="h4">Estados de Cuenta</Typography>
      </Stack>

      <ProcesarArchivoFormContainer
        fechaArchivo={fechaArchivo}
        handleChangeDate={handleChangeDate}
        handleSubmit={handleSubmit}
      />

      <Card
        sx={{
          marginTop: '3rem'
        }}
      >
        <EstadosCuentaTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <EstadosCuentaTableHead
                order={order}
                orderBy={orderBy}
                rowCount={estadosCuenta.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'nombreArchivo', label: 'Nombre Archivo' },
                  { id: 'estatusCarga_estatusCarga', label: 'Estatus' },
                  { id: 'montoPosteo', label: 'Monto Posteo' },
                  { id: 'montoNavegacion', label: 'Monto Navegación' },
                  { id: 'montoCliente', label: 'Monto Cliente' },
                  { id: 'montoChargeBk', label: 'Monto Charge Back' },
                  { id: 'montoOtros', label: 'Monto Otros' },
                  { id: 'montoTotal', label: 'Monto Total' },
                  { id: 'totalRegistros', label: 'Total Registros' },
                  { id: '' }
                ]}
              />
              <TableBody>
                {dataFiltered.map(row => (
                  <EstadosCuentaTableRow
                    key={row.idEstadoCuenta}
                    estadoCuenta={row}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={event => handleClick(event, row.name)}
                    handleDelete={handleDelete}
                    handleCalculate={handleCalculate}
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

EstadosCuentaView.propTypes = {
  items: PropTypes.object,
  fechaArchivo: PropTypes.object,
  pagination: PropTypes.object,
  setPage: PropTypes.func,
  setRowsPerPage: PropTypes.func,
  setSort: PropTypes.func,
  handleChangeDate: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleCalculate: PropTypes.func
}
