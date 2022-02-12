module.exports = {
    resolve:{
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "http": require.resolve("stream-http")
        }
    },
}