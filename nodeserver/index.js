/*const io = require('socket.io')(8000); // Server listens on port 8000
const users = {};
io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("New user", name1)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        
     
        
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: user[socket.id]})
    });
})*/
const io = require('socket.io')(8000, {
    cors: {
        origin: "*", // Allow connections from any origin (for testing)
    }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user", name); // Fix variable name issue
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

   // socket.on('send', message => {
       // socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    //});

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id];
    });
    socket.on('left',name => {
        append(`${name}left the chat`,'left')
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]})
    });
    
});






