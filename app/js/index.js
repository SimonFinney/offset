// Main

// TODO: Comments

// Imports
import {
  create,
  anonymizing,
  complete,
  confirmation,
  quiz,
  quizAOneRight,
  quizAOneWrong,
  quizATwoRight,
  quizATwoWrong,
  quizAThreeRight,
  quizAThreeWrong,
  quizAFourRight,
  quizAFourWrong,
  quizAFiveRight,
  quizAFiveWrong,
  quizASixRight,
  quizASixWrong,
  quizASevenRight,
  quizASevenWrong,
  quizAEightRight,
  quizAEightWrong,
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
import theaterJS from 'theaterjs';

// Variables
let answers;
let answerCount;
let cameraForm;
let cameraImg;
let cameraInput;
let cameraInputHidden;
let context;
let currentView;
let heading;
let headingAnonymizing;
let img;
let li;
let main;
let personas;
let selectedCameraToggleButton;
let theater;
let titles;
let totalQuestions;
let views;


function activate(view) {
  toggleElement(view, 'view-next');
  toggleElement(view, 'view-active');
}


function toggleView() {
  let nextView = views[
    (views.indexOf(currentView) + 1)
  ];

  toggleElement(currentView, 'view-previous');

  once(currentView, 'transitionend', () => {
    toggleElement(currentView, 'view-active');
    activate(nextView);

    currentView = nextView;

    const animation = currentView.getAttribute('data-view-animation');
    const func = currentView.getAttribute('data-view-function');
    const timeout = currentView.getAttribute('data-view-timeout');

    const subviews = getElements('[data-view]', currentView);

    if (animation) {
      window[animation]();
    }

    if (func) {
      window[func]();
    }

    if (timeout) {
      debounce(() => toggleView(), timeout);
    }

    if (subviews.length) {
      views = subviews;

      currentView = views[0];
      activate(currentView);
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
  const computedSize = (size * 2);
  const width = (canvas.width / computedSize);
  const height = (canvas.height / computedSize);

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
  const app = getElement('[data-app]');
  main = getElement('.main', app);

  if ((app.getAttribute('data-app') === 'receive')) {
    const socket = io();

    each(
      getElements('[data-src]', app),
      load
    );
    socket.on('receive', add);
  } else {

    // Initialise variables
    cameraForm = getElement('.camera__form', main);
    cameraImg = getElement('.camera__img', main);
    cameraInput = getElement('.camera__input', main);
    cameraInputHidden = getElement('.camera__input--hidden', main);
    heading = getElement('.button--touch__heading__explode', main);
    headingAnonymizing = getElement('.section__heading--anonymizing', main);
    li = getElements('.section__li', main);
    personas = window.personas;
    titles = getElements('[data-title]', main);

    window.reset();

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


window.anonymize = () => {
  theater.addActor('anonymizing',
    {
      accuracy: .5,
      speed: 1,
    }
  )
  .addScene(`anonymizing:${headingAnonymizing.textContent}`, 300, '.', 300, '.', 300, '.')
  .addScene(() => pixelate(cameraImg, context, img));
};


window.reset = () => {
  answers = [];
  answerCount = 0;

  cameraForm.reset();
  img = new Image();
  theater = theaterJS();

  views = getElements('[data-view]', main);
  currentView = getElement('[data-view]', main);

  each(views, view => {
    view.removeAttribute('data-view-active');
    view.removeAttribute('data-view-previous');
    view.setAttribute('data-view-next', '');
  });

  activate(currentView);

  const animationDelay = (
    parseInt(
      window.getComputedStyle(heading)
        .animationDelay,
      10
    )
  * 1000);

  debounce(() =>
    theater.addActor('heading',
      {
        accuracy: .33,
        speed: .75,
      }
    )
      .addScene(`heading:${heading.textContent}`),
  animationDelay);
};

window.anonymizing = anonymizing;
window.confirmation = confirmation;
window.complete = complete;
window.quiz = quiz;
window.quizAOneRight = quizAOneRight;
window.quizAOneWrong = quizAOneWrong;
window.quizATwoRight = quizATwoRight;
window.quizATwoWrong = quizATwoWrong;
window.quizAThreeRight = quizAThreeRight;
window.quizAThreeWrong = quizAThreeWrong;
window.quizAFourRight = quizAFourRight;
window.quizAFourWrong = quizAFourWrong;
window.quizAFiveRight = quizAFiveRight;
window.quizAFiveWrong = quizAFiveWrong;
window.quizASixRight = quizASixRight;
window.quizASixWrong = quizASixWrong;
window.quizASevenRight = quizASevenRight;
window.quizASevenWrong = quizASevenWrong;
window.quizAEightRight = quizAEightRight;
window.quizAEightWrong = quizAEightWrong;
window.results = results;
window.selfie = selfie;


on(document, 'DOMContentLoaded', init);
