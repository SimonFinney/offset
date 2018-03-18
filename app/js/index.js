// TODO: Document

import {
  create,
  anonymizing,
  complete,
  confirmation,
  kill,
  hide,
  show,
  quiz,
  results,
  selfie,
  toggle,
} from './src/animation';

import {
  ajax,
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
import theaterJS from 'theaterjs/dist/theater.min';

let canvasElements;
let cameraForm;
let cameraImg;
let cameraInput;
let cameraInputHidden;
let character;
let context;
let currentView;
let heading;
let headingAnonymizing;
let instructions;
let img;
let li;
let main;
let restartButton;
let selectedCameraToggleButton;
// let svg;
let theater;
let titles;
let totalNumbers;
let uniqueNumbers;
let views;

const maximumImagesLength = 16;

let feedbackTimer = null;

const app = {
  animations: {
    anonymizing,
    confirmation,
    quiz,
    results,
    selfie,
  },
  data: {
    answers: [],
    count: 0,
    personas: window.personas,
  },
  functions: {
    confirmation: () => toggleElement(instructions),
    reset: () => location.reload(),
    results: show,
    selfie: () => toggleElement(instructions),
  },
};

function activate(view) {
  toggleElement(view, 'view-next');
  toggleElement(view, 'view-active');
}

function toggleView() {
  if (feedbackTimer) {
    clearTimeout(feedbackTimer);
  }

  const nextView = views[views.indexOf(currentView) + 1];

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
      kill();
      app.animations[animation]();
    }

    if (func) {
      app.functions[func]();
    }

    if (timeout) {
      debounce(toggleView, timeout);
    }

    if (subviews.length) {
      views = subviews;

      currentView = views[0];
      activate(currentView);
    }
  });
}

function determinePersona(answersLength) {
  each(app.data.personas, persona =>
    each(persona.criteria, criterion => {
      if (criterion === answersLength) {
        each(titles, titleToModify => {
          const title = titleToModify;
          title.textContent = persona.title;
        });
      }
    })
  );
}

function grayscale(canvas, ctx) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const gs = pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11;
    pixels[i] = gs;
    pixels[i + 1] = gs;
    pixels[i + 2] = gs;
  }

  ctx.putImageData(imageData, 0, 0);
}

function pixelate(canvas, ctx, image, size) {
  const computedSize = size * 5 + 1;
  const width = canvas.width / computedSize;
  const height = canvas.height / computedSize;

  ctx.drawImage(image, 0, 0, width, height);
  ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
  grayscale(canvas, ctx);
}

function transition(canvas, ctx, image, size = app.data.total) {
  const canvasContext = ctx;
  canvasContext.globalAlpha = 0.0;

  function loop() {
    canvasContext.globalAlpha += 0.01;
    pixelate(canvas, canvasContext, image, size);

    if (canvasContext.globalAlpha <= 0.99) {
      requestAnimationFrame(loop);
    }
  }
  loop();
}

function check(event) {
  const button = event.target;
  const isCorrect = button.getAttribute('value') === 'true';

  app.data.count = isCorrect ? app.data.count : app.data.count + 1;

  const modifier = app.data.total - app.data.count;
  cameraInputHidden.setAttribute('value', modifier);

  pixelate(cameraImg, context, img, modifier);

  app.data.answers.push({
    isCorrect,
    textContent: button.textContent,
  });

  determinePersona(app.data.answers.filter(answer => answer.isCorrect).length);

  const answer = li[app.data.answers.length - 1];

  getElement('.li__answer', answer).textContent = button.textContent;

  const icon = getElement('.li__icon', answer);
  icon.setAttribute('data-icon', isCorrect);

  getElement('use', icon).setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'href',
    `${icon.getAttribute('data-href')}${isCorrect}`
  );
}

function run(canvas, contextToModify, image, src) {
  const ctx = contextToModify;

  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;

  on(image, 'load', () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.setAttribute('data-active', '');
  });
  image.setAttribute('src', src);
}

function getUniqueValue() {
  if (!uniqueNumbers.length) {
    for (let currentNumber = 0; currentNumber < totalNumbers; currentNumber++) {
      uniqueNumbers.push(currentNumber);
    }
  }

  const randomIndex = Math.floor(Math.random() * uniqueNumbers.length);

  const uniqueNumberValue = uniqueNumbers[randomIndex];

  uniqueNumbers.splice(randomIndex, 1);
  return uniqueNumberValue;
}

function load(canvas) {
  const ctx = canvas.getContext('2d');
  const image = new Image();
  run(canvas, ctx, image, canvas.getAttribute('data-src'));

  debounce(() => {
    pixelate(canvas, ctx, image, canvas.getAttribute('data-modifier') / 3);
  });
}

function randomiseImages() {
  uniqueNumbers = [];
  totalNumbers = getElements('.img', main).length;

  canvasElements = [];

  each(getElements('[data-src]', main), canvas => canvasElements.push(canvas));

  each(canvasElements, canvas => {
    canvas.removeAttribute('data-active');
    const randomIndex = getUniqueValue();
    const canvasContainer = main.childNodes[randomIndex];

    canvasContainer.innerHTML = '';

    const timeout = parseInt(canvas.getAttribute('data-delay'), 10);

    setTimeout(() => {
      load(canvas);
      canvasContainer.appendChild(canvas);
    }, timeout);
  });
}

function add(image) {
  const canvas = createElement('canvas', {
    class: 'img',
    'data-delay': '50',
    'data-src': image.src,
    'data-modifier': image.modifier,
  });

  const canvasContainer = createElement('div', { class: 'img__container' });

  canvasContainer.appendChild(canvas);
  main.insertBefore(canvasContainer, main.firstChild);

  if (main.childNodes.length >= maximumImagesLength) {
    main.removeChild(main.lastChild);
  }

  randomiseImages();
}

function read() {
  if (cameraInput.files && cameraInput.files[0]) {
    const fileReader = new FileReader();

    on(fileReader, 'load', event =>
      run(cameraImg, context, img, event.target.result)
    );
    fileReader.readAsDataURL(cameraInput.files[0]);

    if (!selectedCameraToggleButton.hasAttribute('data-camera-retake')) {
      toggleView();
    }
  }
}

function init() {
  app.element = getElement('[data-app]');
  main = getElement('.main', app.element);

  if (app.element.getAttribute('data-app') === 'receive') {
    const socket = io.connect('/');
    socket.on('receive', add);

    randomiseImages();
  } else {
    cameraForm = getElement('.camera__form', main);
    cameraImg = getElement('.camera__img', main);
    cameraInput = getElement('.camera__input', main);
    cameraInputHidden = getElement('.camera__input--hidden', main);
    character = getElement('[data-character]', main);
    heading = getElement('.button--touch__heading__explode', main);
    headingAnonymizing = getElement('.section__heading--anonymizing', main);
    instructions = getElement('.selfie-guide', main);
    li = getElements('.section__li', main);
    restartButton = getElement('.camera__img--restart', main);
    titles = getElements('[data-title]', main);

    on(restartButton, 'click', () => location.reload());

    create(character);

    /* on(character, 'load', event => {
      svg = getElement('svg', event.target.getSVGDocument());
      create(svg);
    }); */

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

    const animationDelay =
      parseInt(window.getComputedStyle(heading).animationDelay, 10) * 1000;

    debounce(
      () =>
        theater
          .addActor('heading', {
            accuracy: 0.33,
            speed: 0.75,
          })
          .addScene(`heading:${heading.textContent}`),
      animationDelay
    );

    toggleElement(restartButton);

    context = cameraImg.getContext('2d');

    app.data.total = parseInt(
      getElement('[data-questions-length]').getAttribute(
        'data-questions-length'
      ),
      10
    );

    each(getElements('[data-camera-toggle]', main), cameraToggleButton =>
      on(cameraToggleButton, 'click', () => {
        selectedCameraToggleButton = cameraToggleButton;
        cameraInput.click();
      })
    );

    on(cameraInput, 'change', read);

    each(getElements('[data-animation-toggle]', main), element =>
      on(element, 'click', () => {
        toggle(
          element.parentNode.getAttribute('data-question'),
          element.getAttribute('value')
        );
        show();
      })
    );

    each(getElements('[data-view-toggle]', main), element =>
      on(element, 'click', toggleView)
    );

    each(getElements('.section__feedback-container', main), element =>
      on(element, 'click', hide)
    );

    each(getElements('.section__button--small'), sectionButton =>
      on(sectionButton, 'click', check)
    );

    on(getElement('[data-submit]', main), 'click', () => ajax(cameraForm));
  }
}

app.animations.complete = () => {
  complete();
  debounce(app.functions.reset, 5000);
};

app.functions.anonymize = () => {
  theater
    .addActor('anonymizing', {
      accuracy: 0.5,
      speed: 1,
    })
    .addScene(
      `anonymizing:${headingAnonymizing.getAttribute('data-title')}`,
      300,
      '.',
      300,
      '.',
      300,
      '.'
    )
    .addScene(() => transition(cameraImg, context, img));

  toggleElement(restartButton);
};

app.functions.feedback = () => {
  feedbackTimer = setTimeout(() => {
    hide();
    toggleView();
  }, 7000);
};

on(document, 'DOMContentLoaded', init);
