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

let socket;
let ul;


function add(text) {
  const textNode = document.createTextNode(text);
  const li = document.createElement('li');

  li.appendChild(textNode);
  ul.appendChild(li);
}


function init() {
  ul = document.querySelector('.ul');
  socket = io();

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
}


on(document, 'DOMContentLoaded', init);
