// Main


// TODO: Comments

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

import {
  Power2,
  TimelineMax,
  TweenMax,
} from 'gsap';

import io from 'socket.io-client';

let answers;
let answerCount;
let app;
let cameraForm;
let cameraImg;
let cameraInput;
let cameraInputHidden;
let character;
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


function run(canvas, ctx, image, src) {
  ctx.imageSmoothingEnabled = false;
  on(image, 'load', () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.removeAttribute('data-src');
  });
  image.setAttribute('src', src);
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

let leftXOff;
let topYOff;
let rightXOff;
let bottomYOff;

let rightPupil;
let rightWhite;
let leftPupil;
let leftWhite;
let fedora;
let sunglasses;


function hat() {
  TweenMax.set([fedora, sunglasses], {
    display: 'block',
  });
}


function animate(event) {
  character = getElement(
    'svg',
    event.target
      .getSVGDocument()
  );

  rightPupil = getElement('#eyes-concern_pupil-r', character);
  rightWhite = getElement('#eyes-concern_white-r', character);
  leftPupil = getElement('#eyes-concern_pupil-l', character);
  leftWhite = getElement('#eyes-concern_white-l', character);
  fedora = getElement('#fedora', character);
  sunglasses = getElement('#glasses-sun', character);

  topYOff = '-300px';
  leftXOff = '-700px';
  rightXOff = '700px';
  bottomYOff = '700px';

  TweenMax.set(character, {
    //y: '0',
    //x: -200,
    rotation: '90',
  });

  // hat();

  /* TweenMax.set('#eyes-closed-r, #eyes-closed-l', {
    scaleY: 0.1,
    opacity: '0',
  }); */

  const introTl = new TimelineMax({ paused: true });

  introTl.to(character, 1, {
    x: '-485px',
    ease: Power2.easeInOut,
  })

  introTl.play(0);

  /* introTl.to(character, 1, {
    x: '-485px',
    ease:Power2.easeInOut,
  })
  .to(character, 0.4, {
    x: leftXOff,
    ease:Power2.easeInOut,
    delay: 0.5,
  })
  .to(character, 0.01, {
    rotation: 0,
    y: bottomYOff,
  })
  .to([fedora, sunglasses], 0.01, {
    display: 'none',
  })
  .to(character, 0.01, {
    x: '280px',
  })
  .to(character, 0.5, {
    y: '480px',
    ease: Power2.easeInOut,
  })
  .add('rtEye', '+=.2')
  .to([rightWhite, rightPupil], 0.2, {
    opacity: '0',
    scaleY: 0.2,
    transformOrigin: '50% 50%',
    yoyo: true,
    repeat: +1,
    ease: SteppedEase.config(1),
  }, 'rtEye')
  .to('#eyes-closed-r, #eyes-closed-l', 0.2, {
    visibility: 'visible',
    opacity: '1',
    scaleY: 1,
    yoyo: true,
    repeat: +1,
    ease: SteppedEase.config(1),
  }, 'rtEye')
  .to([leftWhite, leftPupil], 0.2, {
    opacity: '0',
    scaleY: 0.2,
    transformOrigin: '50% 50%',
    ease: SteppedEase.config(1),
    yoyo: true,
    repeat: +1,
  }, 'rtEye')
  .to(character, 0.5, {
    y: bottomYOff,
    ease: Power2.easeInOut,
    delay: 0.5,
  })
  .to(character, 0.01, {
    x: '2000px',
    rotation: 180,
  })
  .to(character, 0.01, {
    y: topYOff,
  })
  .to(character, 0.01, {
    x: '280px',
  })
  .to('#mouth-gasp', 0.01, {
    visibility: 'hidden',
  })
  .to('#mouth-slight_smile, #hair, #glasses-square', 0.01, {
    visibility: 'visible',
  })
  .to('#glasses', 0.01, {
    display: 'none',
  })
  .to(character, 0.8, {
    y: '-60px',
    ease: Power2.easeInOut,
  }); */

  // introTl.play(0);
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
      animate
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


on(document, 'DOMContentLoaded', init);
