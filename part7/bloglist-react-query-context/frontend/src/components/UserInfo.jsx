import Loading from './Loading'

const UserInfo = ({ name }) => {
  // Functions
  const logout = () => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  // Render
  if (!name) return <Loading />

  return (
    <div style={{ marginBottom: '20px' }}>
      {name} logged in. &nbsp;
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default UserInfo
