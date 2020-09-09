// This is the simple server for testing projects
// with native js modules on a local machine when you can't
// just open a page in a browser

const http = require('http')
const fs = require('fs')
const mimeTypes = {
  'html': 'text/html',
  'svg': 'image/svg+xml',
  'css': 'text/css',
  'js': 'application/javascript',
  'mjs': 'application/javascript',
  'json': 'application/json',
  'txt': 'text/plain',
  'gif': 'image/gif',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'ico': 'image/x-icon'
}
const PORT = 3001

const requestHandler = (request, response) => {
    console.log('request.url: ', request.url)
    let pathToFile = './public/' + request.url

    let headContent = {}
    let indexOfLastSlashInPathToFile = pathToFile.lastIndexOf('/')
    let indexOfLastDotInPathToFile = pathToFile.indexOf('.', indexOfLastSlashInPathToFile)

    if ( indexOfLastDotInPathToFile == -1 ) { // Apparently it's a folder
        if ( indexOfLastSlashInPathToFile < pathToFile.length ) { // No ending slash
            pathToFile += '/'
        }

        pathToFile += 'index.html' // Looking for a index.html in it
        headContent[ 'Content-Type' ] = 'text/html'
    } else {
        let fileExtension = pathToFile.slice(indexOfLastDotInPathToFile + 1)

        if ( mimeTypes[fileExtension] ) {
            headContent[ 'Content-Type' ] = mimeTypes[fileExtension]
        }
    }

    let webContent
    let responseCode = 200

    try {
        webContent = fs.readFileSync(pathToFile)
        response.writeHead(responseCode, headContent)
        response.write(webContent)
    } catch (err) {
        responseCode = 404
        console.error(err)
        response.writeHead(responseCode)
    }

    response.end()
}

const server = http.createServer(requestHandler)
server.listen(PORT)
console.log(`Server has started at http://localhost:${PORT}/`)