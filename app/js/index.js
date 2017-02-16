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
let img;
let input;
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


function read(event) {
  const input = event.target;

  if (input.files && input.files[0]) {
    const fileReader = new FileReader();

    on(fileReader, 'load', e => img.setAttribute('src', e.target.result));
    fileReader.readAsDataURL(input.files[0]);
  }
}


function init() {
  app = getElement('[data-receive]');
  img = getElement('.img');
  input = getElement('.input');
  main = getElement('.main');

  socket = io();

  if (app) {
    each(
      getElements('[data-src]', app),
      load
    );
    socket.on('receive', add);
  }

  if (input) {
    on(input, 'change', read);
  }
}


on(document, 'DOMContentLoaded', init);
