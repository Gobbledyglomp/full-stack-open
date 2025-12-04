import Loading from './Loading'
import { useLoginSession } from '../hooks/login'

const UserInfo = () => {
  const { loginSession } = useLoginSession()

  const logout = () => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  // Render
  if (!loginSession.name) {
    return <Loading />
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      {loginSession.name} logged in. &nbsp;
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default UserInfo
