const permissionValidator = {
  'empleados-read': acl =>
    acl
      .find(item => item.categoria === 'Plantilla')
      ?.functions.find(item => item.funcion === 'Catalogo empleados')
      ?.permissions[0].read,
  'comisiones-read': acl =>
    acl
      .find(item => item.categoria === 'Procesos')
      ?.functions.find(item => item.funcion === 'Comisiones')?.permissions[0]
      .read,
  'estados-cuenta-read': acl =>
    acl
      .find(item => item.categoria === 'Procesos')
      ?.functions.find(item => item.funcion === 'Estados de cuenta')
      ?.permissions[0].read,
  'reportes-read': acl =>
    acl
      .find(item => item.categoria === 'Reportes')
      ?.functions.find(item => item.funcion === 'Reportes')?.permissions[0].read
}

export default (acl, permission) =>
  permission in permissionValidator && permissionValidator[permission](acl)
