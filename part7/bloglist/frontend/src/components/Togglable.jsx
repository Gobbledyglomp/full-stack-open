import { useState } from 'react'

const Togglable = ({ label, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenInvisible = { display: !visible ? '' : 'none' }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
      <div style={showWhenInvisible}>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
    </div>
  )
}

export default Togglable
