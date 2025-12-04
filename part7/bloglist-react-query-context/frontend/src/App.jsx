import Blogs from './components/Blogs'
import Login from './components/Login'

import { useLoginEffect, useLoginSession } from './hooks/login'

const App = () => {
  useLoginEffect()

  const { loginSession } = useLoginSession()

  if (loginSession === null) {
    return <Login />
  }

  return <Blogs />
}

export default App
