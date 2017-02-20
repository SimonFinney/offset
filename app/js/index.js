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

let answers;
let answerCount;
let app;
let cameraImg;
let cameraInput;
let cameraInputHidden;
let currentView;
let li;
let main;
let personas;
let selectedCameraToggleButton;
let socket;
let titles;
let totalQuestions;
let views;


function toggleView(view = currentView, nextView = views[(views.indexOf(view) + 1)]) {
  const vs = getElements('[data-view]', view);

  if (vs.length) {
    views = vs;
    view = views.filter(v => v.hasAttribute('data-view-active'))[0];
    nextView = views[(views.indexOf(view) + 1)];
  }

  toggleElement(view, 'view-previous');

  once(view, 'transitionend', () => {
    toggleElement(view, 'view-active');

    toggleElement(nextView, 'view-active');
    toggleElement(nextView, 'view-next');

    currentView = nextView;

    const timeout = currentView.getAttribute('data-view-timeout');

    if (timeout) {
      debounce(() => toggleView(), timeout);
    }
  });
}


function check(event) {
  const button = event.target;
  const isCorrect = (button.getAttribute('value') === 'true');

  answerCount = isCorrect ?
    answerCount :
    (answerCount + 1);

  const modifier = (totalQuestions - answerCount);
  cameraInputHidden.setAttribute('value', modifier);

  cameraImg.style
    .filter = `blur(${modifier}px)`;

  answers.push({
    isCorrect,
    textContent: button.textContent,
  });


  const correctAnswersLength = answers.filter(answer => answer.isCorrect)
    .length;

  personas.forEach(persona =>
    persona.criteria
      .forEach(criterion => {
        if (criterion === correctAnswersLength) {
          each(titles, titleToModify => {
            const title = titleToModify;
            title.textContent = persona.title;
          });
        }
      })
  );


  const answer = li[(answers.length - 1)];

  getElement('.li__answer', answer)
    .textContent = button.textContent;

  const icon = getElement('.li__icon', answer);
  icon.setAttribute('data-icon', isCorrect);

  getElement('use', icon)
    .setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href',
      `${icon.getAttribute('data-href')}${isCorrect}`
  );
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
      style: `filter: blur(${image.modifier}px);`,
    }
  );

  main.appendChild(img);
  load(img);
}


function read() {
  if (cameraInput.files && cameraInput.files[0]) {
    const fileReader = new FileReader();

    on(fileReader, 'load', event =>
      cameraImg.setAttribute(
        'src',
        event.target
          .result
      )
    );

    fileReader.readAsDataURL(cameraInput.files[0]);

    !selectedCameraToggleButton.hasAttribute('data-camera-retake') ?
      toggleView() :
      null;
  }
}


function init() {
  answers = [];
  answerCount = 0;

  app = getElement('[data-app]');
  main = getElement('.main', app);

  cameraImg = getElement('.camera__img', main);
  cameraInput = getElement('.camera__input', main);
  cameraInputHidden = getElement('.camera__input--hidden', main);
  currentView = getElement('[data-view-active]', main);
  li = getElements('.section__li', main);
  personas = window.personas;
  titles = getElements('[data-title]', main);
  views = getElements('[data-view]', main);

  socket = io();

  if ((app.getAttribute('data-app') === 'receive')) {
    each(
      getElements('[data-src]', app),
      load
    );
    socket.on('receive', add);
  } else {
    totalQuestions = parseInt(
      getElement('[data-questions-length]').getAttribute('data-questions-length'),
      10
    );

    each(
      getElements('[data-camera-toggle]', main),
      cameraToggleButton =>
      on(cameraToggleButton, 'click', () => {
        selectedCameraToggleButton = cameraToggleButton;
        cameraInput.click();
      })
    );

    on(cameraInput, 'change', read);

    each(
      getElements('[data-view-toggle]', main),
      element => on(element, 'click', () => toggleView())
    );

    each(
      getElements('.section__button--small'),
      sectionButton => on(sectionButton, 'click', check)
    );
  }
}


on(document, 'DOMContentLoaded', init);
