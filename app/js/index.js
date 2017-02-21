// Main


// TODO: Comments

import {
  create,
  anonymizing,
  complete,
  confirmation,
  quiz,
  results,
  selfie,
} from './src/animation';

import {
  createElement,
  debounce,
  each,
  getElement,
  getElements,
  on,
  once,
  toggleElement,
} from './src/util';

import io from 'socket.io-client';

let answers;
let answerCount;
let app;
let cameraForm;
let cameraImg;
let cameraInput;
let cameraInputHidden;
let context;
let currentView;
let img;
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

    const animation = currentView.getAttribute('data-view-animation');

    if (animation) {
      window[animation]();
    }

    const func = currentView.getAttribute('data-view-function');

    if (func) {
      window[func]();
    }

    const timeout = currentView.getAttribute('data-view-timeout');

    if (timeout) {
      debounce(() => toggleView(), timeout);
    }
  });
}


function determinePersona(answersLength) {
  each(personas, persona =>
    each(persona.criteria, criterion =>
      (criterion === answersLength) ?
        each(titles, title =>
          title.textContent = persona.title
        ) :
        null
    )
  );
}


function grayscale(canvas, ctx) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const gs = ((pixels[i] * 0.3) + (pixels[i + 1] * 0.59) + (pixels[i + 2] * 0.11));
    pixels[i] = gs;
    pixels[i + 1] = gs;
    pixels[i + 2] = gs;
  }

  ctx.putImageData(imageData, 0, 0);
}


function pixelate(canvas, ctx, image, size = totalQuestions) {
  const width = (canvas.width / size);
  const height = (canvas.height / size);

  ctx.drawImage(image, 0, 0, width, height);
  ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);

  grayscale(canvas, ctx);
}


function check(event) {
  const button = event.target;
  const isCorrect = (button.getAttribute('value') === 'true');

  answerCount = isCorrect ?
    answerCount :
    (answerCount + 1);

  const modifier = (totalQuestions - answerCount);
  cameraInputHidden.setAttribute('value', modifier);

  pixelate(cameraImg, context, img, modifier);

  answers.push({
    isCorrect,
    textContent: button.textContent,
  });

  determinePersona(
    answers.filter(answer => answer.isCorrect)
    .length
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


function run(canvas, ctx, image, src) {
  ctx.imageSmoothingEnabled = false;
  on(image, 'load', () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.removeAttribute('data-src');
  });
  image.setAttribute('src', src);
}


function load(canvas) {
  const ctx = canvas.getContext('2d');
  const image = new Image();
  run(canvas, ctx, image, canvas.getAttribute('data-src'));
  debounce(() => pixelate(canvas, ctx, image, canvas.getAttribute('data-modifier')));
}


function add(image) {
  const canvas = createElement(
    'canvas',
    {
      class: 'img',
      'data-src': image.src,
      'data-modifier': image.modifier,
    }
  );

  load(canvas);
  main.insertBefore(canvas, main.firstChild);
}


function read() {
  if (cameraInput.files && cameraInput.files[0]) {
    const fileReader = new FileReader();

    on(fileReader, 'load', event => run(cameraImg, context, img, event.target.result));
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
  img = new Image();
  main = getElement('.main', app);

  cameraForm = getElement('.camera__form', main);
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

    on(
      getElement('[data-character]', main),
      'load',
      event => create(
        getElement(
          'svg',
          event.target
            .getSVGDocument()
        )
      )
    );

    context = cameraImg.getContext('2d');
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

    on(
      cameraForm,
      'submit',
      event => event.preventDefault()
    );

    on(
      getElement('[data-submit]', main),
      'click',
      () => cameraForm.submit()
    );
  }
}


window.anonymize = () => pixelate(cameraImg, context, img);

window.anonymizing = anonymizing;
window.confirmation = confirmation;
window.complete = complete;
window.quiz = quiz;
window.results = results;
window.selfie = selfie;


on(document, 'DOMContentLoaded', init);
