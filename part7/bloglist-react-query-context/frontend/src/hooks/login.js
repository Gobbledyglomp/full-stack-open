import { useContext, useEffect } from 'react'

import LoginContext from '../contexts/LoginContext'
import blogService from '../services/blogs'
import loginService from '../services/login'

export const useLoginEffect = () => {
  const { loginDispatch } = useContext(LoginContext)

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      const userParsed = JSON.parse(user)
      blogService.setToken(userParsed.token)
      loginDispatch({
        type: 'SET_USER',
        payload: userParsed,
      })
    }
  }, [])
}

export const useLoginSession = () => {
  const { login: loginSession, loginDispatch } = useContext(LoginContext)

  const login = async (username, password) => {
    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    window.localStorage.setItem('user', JSON.stringify(user))
    loginDispatch({
      type: 'SET_USER',
      payload: user,
    })
  }

  return {
    login,
    loginSession,
  }
}
