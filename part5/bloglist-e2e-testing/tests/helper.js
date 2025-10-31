const setupDatabase = async request => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
           username: 'root',
           name: 'Superuser',
           password: 'root',
        }
    })
    await request.post('/api/users', {
        data: {
           username: 'example',
           name: 'Example User',
           password: 'example',
        }
    })
}

const getToken = async (request, { username, password }) => {
    const response = await request.post('/api/login', {
        data: { username, password }
    })
    const body = await response.json()

    return body.token
}

const postBlog = async (request, blog, token) =>  {
    await request.post('/api/blogs', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: blog
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

const createBlog = async (page, { title, author, url }) => {
    await page
        .getByRole('button', { name: 'Create New Blog' })
        .click()

    await page
        .getByRole('textbox', { name: 'Title:' })
        .fill(title)
    await page
        .getByRole('textbox', { name: 'Author:' })
        .fill(author)
    await page
        .getByRole('textbox', { name: 'URL:' })
        .fill(url)

    await page
        .getByRole('button', { name: 'Create' })
        .click()
    await page
        .getByText(`${title} by ${author}`)
        .waitFor()
}

export {
    setupDatabase,
    getToken,
    postBlog,
    login,
    createBlog,
}