const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3100;

app.get('/', (req, res) => {
      res.sendFile(`${__dirname}/client/public/index.html`);
});

io.on('connection', (socket) => {
      console.log('user connected');

      socket.on('disconnect', () => {
            console.log('user disconnected');
      });

      socket.on('message', (message) => {
            console.log(`Received a message: ${message}`);
            io.sockets.emit('message', message);
      });
});

http.listen(port, () => {
      console.log(`listening on port ${port}`);
});

