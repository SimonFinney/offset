// Main


// TODO: Comments

import {
  debounce,
  each,
  isToggled,
  off,
  on,
  once,
  toggleElement,
} from './src/util';

import io from 'socket.io-client';

const socket = io.connect('/');


console.log(socket);


function add(text) {
  const textNode = document.createTextNode(text);
  const ul = document.querySelector('.ul');
  const li = document.createElement('li');

  li.appendChild(textNode);
  ul.appendChild(li);
}


socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));
socket.on('time', data => add(data.time));

socket.on('server', data => {
  add(data.message);

  socket.emit('client',
    {
      data: 'Hello Server!',
      id: data.id,
    }
  );
});


function init() {

  console.log('init');

}


on(document, 'DOMContentLoaded', init);
