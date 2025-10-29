import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog renders title and author but not url and likes', () => {
    const blog = {
        author: 'Jane Doe',
        id: '68fca5201c3aee58515ed3ae',
        likes: 272,
        title: 'The Future of Web Development',
        url: 'https://www.example.com/future-of-web-development',
        user: {
            id: '68fca4d520c8b003c887e5fc',
            username: 'root',
            name: 'Superuser'
        }
    }
    const currentUser = {
        name: 'Superuser',
        token: 'token',
        username: 'root'
    }

    render(<Blog blog={blog} currentUser={currentUser} />)

    const title = screen.getByText(blog.title)
    const author = screen.getByText(blog.author, { exact: false })
    const url = screen.getByText(blog.url)
    const likes = screen.getByText(`Likes: ${blog.likes}`, { exact: false })

    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
})