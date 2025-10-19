const info = (source, ...params) => {
    console.log(`[${source}]`, ...params)
}

const error = (source, ...params) => {
    console.error(`[${source}]`, ...params)
}

module.exports = {
    info,
    error
}