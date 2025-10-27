import { useState } from "react"

const Togglable = ({ label, children }) => {
    // States
    const [visible, setVisible] = useState(false)

    // Styles
    const style = { marginBottom: '20px' }
    
    const showWhenVisible = { display: visible ? '' : 'none' }
    const showWhenInvisible = { display: !visible ? '' : 'none' }

    // Functions
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    // Render
    return (
        <div style={style}>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
            <div style={showWhenInvisible}>
                <button onClick={toggleVisibility}>Create New Blog</button>
            </div>
        </div>
    )
}

export default Togglable