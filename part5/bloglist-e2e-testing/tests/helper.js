const setupDatabase = async request => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
           username: 'root',
           name: 'Superuser',
           password: 'root',
        }
    })
}

const login = async (page, username, password)  => {
    await page
        .getByRole('textbox', { name: 'Username' })
        .fill(username)
    await page
        .getByRole('textbox', { name: 'Password' })
        .fill(password)
    await page
        .getByRole('button', { name: 'Login' })
        .click()
}

export {
    setupDatabase,
    login,
}