import { useState } from 'react'

const Login = ({ login }) => {
    // States
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Effects
    const handleLogin = async event => {
        await login(event, username, password)
        setUsername('')
        setPassword('')
    }

    // Render
    return (
        <>
            <h1>Log in to application</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    )
}

export default Login