// Main


// TODO: Comments

import {
  createElement,
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
let cameraButton;
let cameraImg;
let cameraInput;
let cameraInputHidden;
let main;
let socket;
let totalQuestions;
let views;


function toggleView(view, nextView = views[(views.indexOf(view) + 1)]) {
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
    answerCount :
    (answerCount + 1);

  const modifier = (totalQuestions - answerCount);
  cameraInputHidden.setAttribute('value', modifier);

  cameraImg.style
    .filter = `blur(${modifier}px)`;

  toggleView(button.parentNode);
}


function load(img) {
  img.setAttribute('src', img.getAttribute('data-src'));

  on(img, 'load', () =>
    debounce(() => img.removeAttribute('data-src'))
  );
}


function add(image) {
  const img = createElement(
    'img',
    {
      class: 'img',
      'data-src': image.src,
    }
  );

  main.appendChild(img);
  load(img);
}


function read(event) {
  const input = event.target;

  if (input.files && input.files[0]) {
    cameraImg = createElement('img', { class: 'camera__img' });

    getElement('.camera').insertBefore(
      cameraImg,
      getElement('.camera__form')
    );

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
  cameraButton = getElement('.camera__button');
  cameraInput = getElement('.camera__input');
  cameraInputHidden = getElement('.camera__input--hidden');
  main = getElement('.main');
  views = getElements('[data-view]');

  socket = io();

  if (app) {
    each(
      getElements('[data-src]', app),
      load
    );
    socket.on('receive', add);
  }

  if (cameraButton) {
    totalQuestions = parseInt(
      getElement('[data-questions-length]').getAttribute('data-questions-length'),
      10
    );

    on(cameraButton, 'click', () => cameraInput.click());
    on(cameraInput, 'change', read);

    each(
      getElements('.section__button'),
      sectionButton => on(sectionButton, 'click', check)
    );
  }
}


on(document, 'DOMContentLoaded', init);
