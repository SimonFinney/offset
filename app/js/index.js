// Main


// TODO: Comments

import {
  debounce,
  each,
  getElement,
  getElements,
  off,
  on,
  once,
  toggleElement,
} from './src/util';

import io from 'socket.io-client';

let answerCount;
let app;
let cameraImg;
let input;
let main;
let socket;


function toggleView(view, nextView = view.nextSibling) {
  toggleElement(view);

  once(view, 'transitionend', () => {
    toggleElement(view, 'inactive');

    toggleElement(nextView, 'inactive');
    toggleElement(nextView);
  });
}


function check(event) {
  const button = event.target;

  answerCount = (button.getAttribute('value') === 'true') ?
    (answerCount + 1) :
    answerCount;

  toggleView(button.parentNode);
}


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

    on(fileReader, 'load', e =>
      cameraImg.setAttribute('src', e.target.result)
    );

    fileReader.readAsDataURL(input.files[0]);
  }
}


function init() {
  answerCount = 0;
  app = getElement('[data-receive]');
  cameraImg = getElement('.camera__img');
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
    each(
      getElements('.section__button'),
      sectionButton => on(sectionButton, 'click', check)
    );

    on(input, 'change', read);
  }
}


on(document, 'DOMContentLoaded', init);
