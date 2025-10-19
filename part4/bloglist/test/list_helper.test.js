const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    //
    // Insert Data
    //
    const emptyList = []
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]
    const listWithManyBlogs = [
        {
            _id: '68f4cb6b549656bd5bd31754',
            title: '10 Tips for Effective SEO',
            author: 'John Smith',
            url: 'https://www.example.com/10-tips-for-seo',
            likes: 398,
            __v: 0
        },
        {
            _id: '68f4cb9c549656bd5bd31757',
            title: 'Understanding JavaScript Closures',
            author: 'Emily Johnson',
            url: 'https://www.example.com/javascript-closures',
            likes: 102,
            __v: 0
        },
        {
            _id: '68f4e26fcae0948ea656f27d',
            title: 'A Guide to Responsive Design',
            author: 'Michael Brown',
            url: 'https://www.example.com/responsive-design-guide',
            likes: 487,
            __v: 0
        }
    ]

    //
    // Tests
    //
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        assert.strictEqual(result, 987)
    })
})