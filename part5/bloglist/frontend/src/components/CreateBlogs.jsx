import { useState } from "react"
import blogService from "../services/blogs"

const CreateBlogs = ({ addBlog }) => {
    // States
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    // Handler
    const handleSubmit = async event => {
        event.preventDefault()
        const blog = await blogService.create({ title, author, url })
        addBlog(blog)
        
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    // Render
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Author:
                        <input
                            type="text"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        URL:
                        <input
                            type="text"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
            <br />
        </div>
    )
}

export default CreateBlogs