const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serveStaticFile(res, path, contetType, responseCode = 200){
    /**Método assioncrono para a leitura de arquivos, onde ele lê o conteúdo
     * do arquivo especificado e executa a função de callback, quando ele ter
     * mina de ser lido, se o arquivo não existir ou houver problemas de 
     * permissão na sua leitura, a variavel err será ativada e função retornará
     * o erro 500, indicando erro no servidor
     */
    fs.readFile(__dirname + path, (err, data) => {
        if(err){
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {'Content-Type': 'text/plain' })
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    /**normaliza a url removendo a querystring e a barra final opcional e usando letras minusculas */
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch(path) {
        case '':
            /**Função auxiliar que faz grande parte do trabalho */
            serveStaticFile(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html')
            break
        
        case '/img/logo.png':
                serveStaticFile(res, '/public/img/logo.png', 'image/png')
                break
        default:
            serveStaticFile(res, '/public/404.html', 'text/hmtl', 404)
            res.end('Not Found')
            break
    }
})

server.listen(port, () => console.log(`Server started on port ${port}; ` + 'press Ctrl-C to terminate.....'))