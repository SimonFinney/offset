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
let form;
let input;
let ul;


function add(text) {
  const textNode = document.createTextNode(text);
  const li = document.createElement('li');

  li.appendChild(textNode);
  ul.appendChild(li);
}


function submitForm(event) {
  event.preventDefault();

  socket.emit('send', input.value);
  event.target
    .reset();
}


function init() {
  form = document.querySelector('.form');
  input = document.querySelector('.sy-input--text');
  ul = document.querySelector('.ul');
  socket = io();

  socket.on('error', console.error.bind(console));
  socket.on('message', console.log.bind(console));

  if (form) {
    on(form, 'submit', submitForm);
  }

  if (ul) {
    socket.on('receive', text => add(text));
  }
}


on(document, 'DOMContentLoaded', init);
