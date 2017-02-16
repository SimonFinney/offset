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

let app;
let main;
let socket;

function add(src) {
  const img = document.createElement('img');
  img.setAttribute('class', 'img');
  img.setAttribute('src', src);

  main.appendChild(img);
}


function init() {
  app = document.querySelector('[data-receive]');
  main = document.querySelector('.main');
  socket = io();

  if (app) {
    socket.on('receive', add);
  }
}


on(document, 'DOMContentLoaded', init);
