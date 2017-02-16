// Main


// TODO: Comments

import {
  debounce,
  each,
  getElement,
  getElements,
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

  on(img, 'load', () =>
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
  app = get('[data-receive]');
  main = get('.main', app);
  socket = io();

  if (app) {
    each(
      getAll('[data-src]', app),
      load
    );
    socket.on('receive', add);
  }
}


on(document, 'DOMContentLoaded', init);
