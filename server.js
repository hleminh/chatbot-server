const http = require('http');
const app = require('./app');
const evn = require('dotenv').load();

const port = process.env.PORT || 6969;

const server = http.createServer(app);

server.listen(port, () => {
  console.log('server running at port ' + port);
});
