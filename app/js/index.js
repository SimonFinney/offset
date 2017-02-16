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


function load(img) {
  img.setAttribute('src', img.getAttribute('data-src'));

  img.addEventListener('load', () =>
    debounce(() => img.removeAttribute('data-src'))
  );
}


function add(image) {
  const img = document.createElement('img');
  img.setAttribute('class', 'img');
  img.setAttribute('data-src', image.src);

  main.appendChild(img);
  load(img);
}


function init() {
  app = document.querySelector('[data-receive]');
  main = app.querySelector('.main');
  socket = io();

  if (app) {
    [...app.querySelectorAll('[data-src]')]
      .forEach(load);

    socket.on('receive', add);
  }
}


on(document, 'DOMContentLoaded', init);
