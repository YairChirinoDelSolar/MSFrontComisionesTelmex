import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

import Toaster from '../_layouts/dashboard/common/toaster'
import * as AuthActions from '../_actions/authentication.actions'
import * as UserActions from '../_actions/user.actions'
import { LoginView } from '../_sections/login'
import { useRouter } from '../_routes/hooks'
import { handleError } from '../_utils'

function LoginPage({ loading, login, getProfile, getACL, resetUserLoading }) {
  const router = useRouter()
  const [user, setUser] = useState({})

  useEffect(() => resetUserLoading, [])

  const onChangeForm = ({ target: { value, name } }) => {
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  const onLogin = () => {
    login(user)
      .then(() => {
        Promise.all([getACL(), getProfile()])
          .then(() => {
            router.push('/')
          })
          .catch(handleError)
      })
      .catch(handleError)
  }

  return (
    <>
      <Helmet>
        <title> Iniciar Sesión | Comisiones </title>
      </Helmet>

      <Toaster />

      <LoginView
        user={user}
        loading={loading}
        handleChange={onChangeForm}
        handleLogin={onLogin}
      />
    </>
  )
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  login: PropTypes.func,
  getProfile: PropTypes.func,
  getACL: PropTypes.func,
  resetUserLoading: PropTypes.func
}

const mapStateToProps = state => ({
  loading: state.authentication.loading
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(AuthActions.login(user)),
  getProfile: () => dispatch(UserActions.getProfile()),
  getACL: () => dispatch(UserActions.getACL()),
  resetUserLoading: () => dispatch(AuthActions.resetUserLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
