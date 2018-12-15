const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3100;

app.get('/', (req, res) => {
      res.sendFile(`${__dirname}/client/public/index.html`);
});

io.on('connection', (socket) => {
      console.log('user connected');
      
      let name = '';

      socket.on('connection info', (connectedName) => {
            name = connectedName;
            io.sockets.emit('join', name + ' connected.');
      });

      socket.on('disconnect', () => {
            console.log('user disconnected');
            io.sockets.emit('disconnect', name + ' disconnected.');
      });

      socket.on('message', (message) => {
            if(message.public === false){
                  console.log(`Received a private message: ${message.message} from ${message.name} to ${message.room}`);
                  io.sockets.emit('private message', message);
            } else {
                  console.log(`Received a public message: ${message.message} from ${message.name}`);
                  io.sockets.emit('message', message);
            }
      });
});

http.listen(port, () => {
      console.log(`listening on port ${port}`);
});

