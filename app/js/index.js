// Main

// TODO: Comments

// Imports
import {
  create,
  anonymizing,
  complete,
  confirmation,
  introduction,
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
import theaterJS from 'theaterjs';

// Variables
let cameraForm;
let cameraImg;
let cameraInput;
let cameraInputHidden;
let character;
let context;
let currentView;
let heading;
let headingAnonymizing;
let img;
let li;
let main;
let selectedCameraToggleButton;
let svg;
let theater;
let titles;
let views;
let restartButton;
let feedbackTimer = null;

const maximumImagesLength = 16;

const app = {
  animations: {
    anonymizing,
    confirmation,
    introduction,
    quiz,
    results,
    selfie,
  },
  data: {
    answers: [],
    count: 0,
    personas: window.personas,
  },
  functions: {},
};


function activate(view) {
  toggleElement(view, 'view-next');
  toggleElement(view, 'view-active');
}


function toggleView() {
  const nextView = views[
    (views.indexOf(currentView) + 1)
  ];

  toggleElement(currentView, 'view-previous');

  once(currentView, 'transitionend', () => {
    toggleElement(currentView, 'view-active');
    activate(nextView);
    // setTimeout(show, 1000);
    // show();

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

    if (currentView.hasAttribute('data-view-feedback')) {
      feedbackTimer = setTimeout(toggleView, 7000);
      each(
        getElements('[data-animation-toggle]', main),
        element => on(element, 'click', show)
      );
    }

    if (currentView.hasAttribute('data-view-results')) {
      show();
    }
  });
}


function determinePersona(answersLength) {
  each(app.data
    .personas, persona =>
      each(persona.criteria, criterion => {
        (criterion === answersLength) ?
          each(titles, titleToModify => {
            const title = titleToModify;
            title.textContent = persona.title;
          }) :
          null;
      })
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


function pixelate(canvas, ctx, image, size) {
  const computedSize = ((size * 5) + 1);
  const width = (canvas.width / computedSize);
  const height = (canvas.height / computedSize);

  ctx.drawImage(image, 0, 0, width, height);
  ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
  grayscale(canvas, ctx);
}


function transition(canvas, ctx, image, size = app.data.total) {
  ctx.globalAlpha = 0.0;

  function loop() {
    ctx.globalAlpha += 0.01;
    pixelate(canvas, ctx, image, size);

    if (ctx.globalAlpha <= 0.99) {
      requestAnimationFrame(loop);
    }
  }
  loop();
}


function check(event) {
  const button = event.target;
  const isCorrect = (button.getAttribute('value') === 'true');

  app.data.count = isCorrect ?
    app.data.count :
    (app.data.count + 1);

  const modifier = (app.data.total - app.data.count);
  cameraInputHidden.setAttribute('value', modifier);

  pixelate(cameraImg, context, img, modifier);

  app.data.answers.push({
    isCorrect,
    textContent: button.textContent,
  });

  determinePersona(
    app.data
      .answers
      .filter(answer => answer.isCorrect)
      .length
  );

  const answer = li[
    (
      app.data
      .answers
      .length - 1
    )
  ];

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


function run(canvas, contextToModify, image, src) {
  const ctx = contextToModify;
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

  debounce(() => {
    pixelate(canvas, ctx, image, canvas.getAttribute('data-modifier'));
  });
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

  if (main.childNodes.length >= maximumImagesLength) {
    main.removeChild(main.lastChild);
  }
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


function reset(element, className) {
  element.classList
    .remove(className);

  void element.offsetWidth;

  element.classList
    .add(className);
}


function init() {
  app.element = getElement('[data-app]');
  main = getElement('.main', app.element);

  if ((app.element.getAttribute('data-app') === 'receive')) {
    const socket = io();

    each(
      getElements('[data-src]', app.element),
      load
    );
    socket.on('receive', add);
  } else {
    cameraForm = getElement('.camera__form', main);
    cameraImg = getElement('.camera__img', main);
    cameraInput = getElement('.camera__input', main);
    cameraInputHidden = getElement('.camera__input--hidden', main);
    character = getElement('[data-character]', main);
    heading = getElement('.button--touch__heading__explode', main);
    headingAnonymizing = getElement('.section__heading--anonymizing', main);
    li = getElements('.section__li', main);
    restartButton = getElement('.camera__img--restart', main);
    titles = getElements('[data-title]', main);

    on(restartButton, 'click', app.functions.reset);

    on(
      character,
      'load',
      event => {
        svg = getElement(
          'svg',
          event.target
            .getSVGDocument()
        );

        create(svg);
      }
    );

    app.functions.reset();

    context = cameraImg.getContext('2d');

    app.data.total = parseInt(
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
      getElements('[data-animation-toggle]', main),
      element => on(element, 'click', () =>
        toggle(
          element.parentNode
            .getAttribute('data-question'),
          element.getAttribute('value')
        )
      )
    );

    each(
      getElements('[data-view-toggle]', main),
      element => on(element, 'click', () => {
        if (currentView === views[16]) {
          console.log('This is number 16');
          setTimeout(toggleView, 3000);
        } else {
          toggleView();
        }
      })
    );

    each(
      getElements('[data-view-feedback]', main),
      element => on(element, 'click', () => {
        toggleView();
        hide();
        if (feedbackTimer !== null) {
          window.clearTimeout(feedbackTimer);
        }
      })
    );

    each(
      getElements('.section__button--small'),
      sectionButton => on(sectionButton, 'click', check)
    );

    on(
      getElement('[data-submit]', main),
      'click',
      () => ajax(cameraForm)
    );
  }
}


app.animations.complete = () => {
  complete();
  debounce(app.functions.reset, 5000);
};

app.functions.anonymize = () => {
  theater.addActor('anonymizing',
    {
      accuracy: 0.5,
      speed: 1,
    }
  )
  .addScene(
    `anonymizing:${headingAnonymizing.getAttribute('data-title')}`,
    300,
    '.',
    300,
    '.',
    300,
    '.'
  ).addScene(() => transition(cameraImg, context, img));

  toggleElement(restartButton);

  // restartButton.setAttribute('style', 'opacity: 1; transition: .5s opacity ease 3s');
};


app.functions.reset = () => {
  app.data
    .answers = [];

  app.data
    .count = 0;

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

  each(
    getElements('.confetti__item', app.element),
    confetti => reset(confetti, 'confetti__item')
  );

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
        accuracy: 0.33,
        speed: 0.75,
      }
    )
      .addScene(`heading:${heading.textContent}`),
  animationDelay);

  if (svg) {
    app.animations
      .introduction();
  }

  toggleElement(restartButton);

  //restartButton.setAttribute('style', 'opacity: 0;');
};


on(document, 'DOMContentLoaded', init);
