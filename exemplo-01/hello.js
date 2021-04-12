const http = require('http')
const port = process.env.PORT || 3000

/** Metódo http.createServer recebe uma função como argumento, essa função será chamada sempre que uma requisição
 * HTTP for feita.
 */
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('Hello World!')
})

server.listen(port, () => console.log(`Server started on port ${port}; ` + 'press Ctrl-C to terminate.....'))