/*const io = require('socket.io-client'); 
const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

const name1 = prompt("Enter your name to join");
socket.emit('new-user-joined', name1)*/
const socket = io('http://localhost:8000');

// Prompt for username in the browser
const name1 = prompt("Enter your name to join");
socket.emit('new-user-joined', name1);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
//Function to add messages to the chat container
const appendMessage = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    messageContainer.appendChild(messageElement);
};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you:${message}`,'right');
    socket.emit('send',message);
    messageInput=''
})
// Event listener for new users joining
socket.on('user-joined', name => {
    appendMessage(`${name} joined the chat`, 'right');
});

// Event listener for receiving messages
socket.on('receive', data => {
    appendMessage(`${data.name}: ${data.message}`, 'left');
});

// Event listener for user leaving
socket.on('user-left', name => {
    appendMessage(`${name} left the chat`, 'right');
});

// Handle sending messages
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

socket.on('receive',data =>{
    append(`${data.name}:${data.message}`,'left')
})



