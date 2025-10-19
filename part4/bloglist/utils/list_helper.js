const dummy = () => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    const reducer = (favorite, blog) =>
        blog.likes >= (favorite.likes || 0)
            ? blog
            : favorite

    return blogs.length > 0
        ? blogs.reduce(reducer, {})
        : null
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}