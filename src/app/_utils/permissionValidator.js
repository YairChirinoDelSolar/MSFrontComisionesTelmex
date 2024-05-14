const permissionValidator = {
  'empleados-read': acl =>
    acl
      .find(item => item.categoria === 'Plantilla')
      ?.functions.find(item => item.funcion === 'Catalogo empleados')
      ?.permissions[0].readAt,
  'comisiones-read': acl =>
    acl
      .find(item => item.categoria === 'Procesos')
      ?.functions.find(item => item.funcion === 'Comisiones')?.permissions[0]
      .readAt,
  'estados-cuenta-read': acl =>
    acl
      .find(item => item.categoria === 'Procesos')
      ?.functions.find(item => item.funcion === 'Estados de cuenta')
      ?.permissions[0].readAt,
  'reportes-read': acl =>
    acl
      .find(item => item.categoria === 'Reportes')
      ?.functions.find(item => item.funcion === 'Reportes')?.permissions[0]
      .readAt
}

export default (acl, permission) =>
  permission in permissionValidator && permissionValidator[permission](acl)
