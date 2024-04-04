import React from 'react'
import SvgColor from '../../_components/svg-color'
import Iconify from '../../_components/iconify'

// ----------------------------------------------------------------------

/* const icon = name => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
) */

const icon = name => <Iconify icon={name} />

const navConfig = [
  {
    title: 'Inicio',
    path: '/',
    icon: icon('ic:baseline-home')
  },
  {
    title: 'Fuerza Empleados',
    path: '/empleados',
    icon: icon('mdi:user'),
    permission: 'empleados-read'
  },
  {
    title: 'Comisiones',
    path: '/comisiones',
    icon: icon('carbon:currency'),
    permission: 'comisiones-read'
  },
  {
    title: 'Estados de Cuenta',
    path: '/estados-cuenta',
    icon: icon('carbon:document'),
    permission: 'estados-cuenta-read'
  },
  {
    title: 'Reportes',
    icon: icon('mdi:report-box-outline'),
    permission: 'reportes-read',
    children: [
      {
        title: 'Reporte de Comisiones',
        path: '/reportes',
        icon: icon('tabler:report-money')
      }
    ]
  } /* ,
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user')
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart')
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog')
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock')
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled')
  } */
]

export default navConfig
