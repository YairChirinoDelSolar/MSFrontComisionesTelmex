import React, { lazy, Suspense } from 'react'
import { Outlet, Navigate, useRoutes } from 'react-router-dom'

import DashboardLayout from '../_layouts/dashboard'
import { PrivateRoute } from '../_components'

export const IndexPage = lazy(() => import('../_pages/app'))
export const BlogPage = lazy(() => import('../_pages/blog'))
export const UserPage = lazy(() => import('../_pages/user'))
export const EmpleadosPage = lazy(() => import('../_pages/empleados/empleados'))
export const ComisionesPage = lazy(
  () => import('../_pages/comisiones/comisiones')
)
export const EstadosCuentaPage = lazy(
  () => import('../_pages/estados-cuenta/estados-cuenta')
)
export const ReportesPage = lazy(() => import('../_pages/reportes/reportes'))
export const EmpleadosDetailPage = lazy(
  () => import('../_pages/empleados/empleados-detail')
)
export const ComisionesDetailPage = lazy(
  () => import('../_pages/comisiones/comisiones-detail')
)
export const EstadosCuentaDetailPage = lazy(
  () => import('../_pages/estados-cuenta/estados-cuenta-detail')
)
export const UserDetailPage = lazy(() => import('../_pages/user/user-detail'))
export const LoginPage = lazy(() => import('../_pages/login'))
export const ProductsPage = lazy(() => import('../_pages/products'))
export const Page404 = lazy(() => import('../_pages/page-not-found'))

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <PrivateRoute component={IndexPage} />, index: true },
        {
          path: 'empleados',
          element: <PrivateRoute component={EmpleadosPage} />
        },
        {
          path: 'empleados/create',
          element: <PrivateRoute component={EmpleadosDetailPage} />
        },
        {
          path: 'empleados/edit/:idEmpleado',
          element: <PrivateRoute component={EmpleadosDetailPage} />
        },
        {
          path: 'comisiones',
          element: <PrivateRoute component={ComisionesPage} />
        },
        {
          path: 'comisiones/create',
          element: <PrivateRoute component={ComisionesDetailPage} />
        },
        {
          path: 'comisiones/edit/:idComision',
          element: <PrivateRoute component={ComisionesDetailPage} />
        },
        {
          path: 'estados-cuenta',
          element: <PrivateRoute component={EstadosCuentaPage} />
        },
        {
          path: 'estados-cuenta/detail/:idEstadoCuenta',
          element: <PrivateRoute component={EstadosCuentaDetailPage} />
        },
        {
          path: 'user/create/:idEmpleado',
          element: <PrivateRoute component={UserDetailPage} />
        },
        {
          path: 'reportes',
          element: <PrivateRoute component={ReportesPage} />
        },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> }
      ]
    },
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: '404',
      element: <Page404 />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ])

  return routes
}
