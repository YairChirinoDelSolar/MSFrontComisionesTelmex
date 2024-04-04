import ClientHttp from '../_helpers/http'
import { HTTP_METHOD_POST } from '../_constants'

export const auth = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    new ClientHttp({
      url: 'api/auth/login',
      method: HTTP_METHOD_POST,
      data: { username, password }
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
