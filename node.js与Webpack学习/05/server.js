const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {

    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end('欢迎使用node.js和http模块创建的Web服务')
})

server.listen(3000, () => {
      console.log('Web服务启动成功了');
})