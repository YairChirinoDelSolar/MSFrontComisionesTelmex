import ClientHttp from '../_helpers/http'
import { HTTP_METHOD_POST } from '../_constants'

export const getAll = ({ page, size, sort, ...filters }) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/getReporte',
      method: HTTP_METHOD_POST,
      data: {},
      query: { page, size, sort, ...filters }
    })
      .request()
      .then(response => {
        const { data = {} } = response
        resolve(data)
      })
      .catch(error => {
        const {
          response: { data = {} }
        } = error
        reject(data)
      })
  })
}
