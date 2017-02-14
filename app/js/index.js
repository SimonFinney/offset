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
let tbody;


function add(text) {
  const row = tbody.insertRow();
  const cell = row.insertCell();

  const textNode = document.createTextNode(text);
  cell.appendChild(textNode);
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
  tbody = document.querySelector('tbody');
  socket = io();

  if (form) {
    on(form, 'submit', submitForm);
  }

  if (tbody) {
    socket.on('receive', add);
  }
}


on(document, 'DOMContentLoaded', init);
