import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

import Scrollbar from '../../../_components/scrollbar/scrollbar'
import Iconify from '../../../_components/iconify'
import TableEmptyRows from '../table-empty-rows'
import TableNoData from '../table-no-data'
import { applyFilter, emptyRows, getComparator } from '../utils'
import ReportesTableToolbar from '../reportes-table-toolbar'
import ReportesTableHead from '../reportes-table-head'
import ReportesTableRow from '../reportes-table-row'

export default function ReportesView({
  items,
  catalogs,
  estadosCuentaPagination,
  pagination,
  setPage,
  setRowsPerPage,
  filterBy,
  setFilterBy,
  setSort,
  handleSubmit
}) {
  const { content: registros = [], totalElements = 0 } = items
  const { content: estadosCuenta = [] } = estadosCuentaPagination
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
      const newSelecteds = registros.map(n => n.nombreCompleto)
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
    inputData: registros,
    comparator: getComparator(order, orderBy),
    filterName
  })

  const handleOnClickDownloadReport = () => {
    const url = new URL(
      `${process.env.BACKEND_SERVER_COMISIONES}/api/v1/reporte/comision-calculada`
    )
    url.search = new URLSearchParams(filterBy)
    window.open(url)
  }

  const onChangeFilters = ({ target: { name, value } }) =>
    setFilterBy(prevState => ({ ...prevState, [name]: value || undefined }))

  const notFound = !dataFiltered.length && !!filterName

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Reporte General de Comisiones</Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<Iconify icon="vscode-icons:file-type-excel" />}
          onClick={handleOnClickDownloadReport}
        >
          Descargar Excel
        </Button>
      </Stack>

      <Card>
        <ReportesTableToolbar
          numSelected={selected.length}
          catalogs={catalogs}
          estadosCuenta={estadosCuenta}
          filterName={filterName}
          filterBy={filterBy}
          onFilterName={handleFilterByName}
          handleChangeFilters={onChangeFilters}
          handleSubmit={handleSubmit}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ReportesTableHead
                order={order}
                orderBy={orderBy}
                rowCount={registros.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'idEmpleadoComision', label: 'Id Empleado Comision' },
                  { id: 'montoPagadoConcepto', label: 'Monto Pagado Concepto' },
                  {
                    id: 'montoEsperadoConcepto',
                    label: 'Monto Esperado Concepto'
                  },
                  { id: 'montoTotal', label: 'Monto Total' },
                  { id: 'empnumero', label: 'Número Empleado' },
                  { id: 'empnombrecompleto', label: 'Nombre Empleado' },
                  { id: 'idEstatus', label: 'Id Estatus' },
                  { id: 'empclabeinterbancaria', label: 'Clabe Interbancaria' },
                  { id: 'empcuentabancaria', label: 'Cuenta Bancaria' },
                  { id: 'empestrategia', label: 'Estrategia' },
                  { id: 'empestrategiaglobal', label: 'Estrategia Global' },
                  { id: 'iemprfc', label: 'RFC' },
                  { id: 'estatus', label: 'Estatus' },
                  { id: 'pagoconcepto', label: 'Concepto de Pago' }
                ]}
              />
              <TableBody>
                {registros.map(row => (
                  <ReportesTableRow
                    key={row.idComision}
                    registro={row}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={event => handleClick(event, row.name)}
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

ReportesView.propTypes = {
  items: PropTypes.object,
  catalogs: PropTypes.object,
  estadosCuentaPagination: PropTypes.object,
  pagination: PropTypes.object,
  filterBy: PropTypes.object,
  setPage: PropTypes.func,
  setRowsPerPage: PropTypes.func,
  setFilterBy: PropTypes.func,
  setSort: PropTypes.func,
  handleSubmit: PropTypes.func
}
