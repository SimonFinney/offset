// Animate

import {
  Power2,
  TimelineMax,
  TweenLite,
  TweenMax,
} from 'gsap';

import { getElement } from './util';

let svg;

let fedora;

let leftPupil;
let leftWhite;

let rightPupil;
let rightWhite;

let sunglasses;

const topYOff = '-300px';
const leftXOff = '-700px';
const rightXOff = '700px';
const bottomYOff = '700px';

function hat() {
  TweenLite.set(fedora, sunglasses, {
    display: 'block',
  });
}

//Intro
/* document.querySelector('#intro').addEventListener('click', function () {
  TweenMax.set('svg', {
    y: '0',
    x: leftXOff,
    rotation: 90,
  });

  hat();

  TweenMax.set('#eyes-closed-r, #eyes-closed-l', {
    scaleY: 0.1,
    opacity: '0',
  });

  const introTl = new TimelineMax({ paused: true });

  introTl.to('svg', 1, {
    x: '-485px',
    ease:Power2.easeInOut,
  })
  .to('svg', 0.4, {
    x: leftXOff,
    ease:Power2.easeInOut,
    delay: 0.5,
  })
  .to('svg', 0.01, {
    rotation: 0,
    y: bottomYOff,
  })
  .to('#fedora, #glasses-sun', 0.01, {
    display: 'none',
  })
  .to('svg', 0.01, {
    x: '280px',
  })
  .to('svg', 0.5, {
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
  .to('svg', 0.5, {
    y: bottomYOff,
    ease: Power2.easeInOut,
    delay: 0.5,
  })
  .to('svg', 0.01, {
    x: '2000px',
    rotation: 180,
  })
  .to('svg', 0.01, {
    y: topYOff,
  })
  .to('svg', 0.01, {
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
  .to('svg', 0.8, {
    y: '-60px',
    ease: Power2.easeInOut,
  });

  introTl.play(0);
}); */


//Snap Selfie
/* document.querySelector('#snap-selfie').addEventListener('click', function() {

  TweenMax.set('#eyes-happy_closed-r, #eyes-happy_closed-l, #mouth-big_smile', {
    scaleY: 0.1,
    opacity: '0',
  });

  const snapSelfieTl = new TimelineMax({ paused: true });

  snapSelfieTl.to('svg', 0.2, {
    y: topYOff,
    ease:Power2.easeInOut,
  })
  .to('svg', 0.01, {
    x: '700px',
  })
  .to('svg', 0.01, {
    y: bottomYOff,
    rotation: 0,
  })
  .to('svg', 0.01, {
    x: '0',
  })
  .to('#hair, #glasses-square', 0.01, {
    visibility: 'hidden',
  })
  .to('#glasses', 0.01, {
    display: 'block',
  })
  .to([rightWhite, leftWhite, rightPupil, leftPupil], 0.01, {
    display: 'none',
  })
  .to('#eyes-smize_white-r, #eyes-smize_pupil-r, #eyes-smize_white-l, #eyes-smize_pupil-l', 0.01, {
    visibility: 'visible',
  })
  .to('svg', 1, {
    y: '480px',
    ease:Power2.easeInOut,
  })
  .to('#eyes-smize_white-r, #eyes-smize_pupil-r, #eyes-smize_white-l, #eyes-smize_pupil-l', 0.4, {
    opacity: '0',
    scaleY: 0.2,
    transformOrigin: '50% 50%',
    yoyo: true,
    repeat: +2,
    ease:SteppedEase.config(1),
  }, 'rtEye')
  .to('#eyes-happy_closed-r, #eyes-happy_closed-l', 0.4, {
    visibility: 'visible',
    opacity: '1',
    scaleY: 1,
    yoyo: true,
    repeat: +2,
    ease: SteppedEase.config(1),
  }, 'rtEye')
  .to('#mouth-big_smile', 0.4, {
    visibility: 'visible',
    opacity: '1',
    scaleY: 1,
    ease: SteppedEase.config(1),
    yoyo: true,
    repeat: +2,
  }, 'rtEye');

   snapSelfieTl.play(0);
}); */

/* document.querySelector('#look-good').addEventListener('click', function () {
  TweenMax.set('svg', {
    y: topYOff,
    x: '200px',
    rotation: 180,
  });

  TweenMax.set('#eyes-smize_white-r, #eyes-smize_pupil-r, #eyes-smize_white-l, #eyes-smize_pupil-l', {
    opacity: '1',
    scaleY: 1,
  });

  TweenMax.set('#eyes-happy_closed-r, #eyes-happy_closed-l', {
    opacity: "0",
    scaleY: .1,
  });


  const lookGoodTl = new TimelineMax({ paused: true });

  lookGoodTl.to('svg', 1, {
    y: '-40px',
    ease:Power2.easeInOut,
  })
  .to('#eyes-smize_white-r, #eyes-smize_pupil-r, #eyes-smize_white-l, #eyes-smize_pupil-l', 0.2, {
    opacity: '0',
    scaleY: 0.2,
    transformOrigin: 'top',
    ease:SteppedEase.config(1),
    yoyo: true,
    repeat: +3,
  }, 'rtEye')
  .to('#eyes-happy_closed-r, #eyes-happy_closed-l', 0.2, {
    opacity: '1',
    scaleY: 1,
    transformOrigin: 'top',
    ease:SteppedEase.config(1),
    yoyo: true,
    repeat: +3,
  }, 'rtEye');

   lookGoodTl.play(0);
}); */

/* document.querySelector('#anon').addEventListener('click', function () {
  hat();

  TweenMax.set('svg', {
    x: rightXOff,
    y: '390px',
    rotation: -90,
  });
  TweenMax.set('#mouth-big_smile, #mouth-slight_smile', {
    visibility: 'hidden',
  });
  TweenMax.set('#mouth-no_smile, #mustache', {
    visibility: 'visible',
  });


  const anonTl = new TimelineMax({ paused: true });

  anonTl.to('svg', 1, {
    x: '400px',
    ease: Power2.easeInOut,
  });

  anonTl.play(0);
}); */

/* document.querySelector('#start-quiz').addEventListener('click', function () {
  const startQuizTl = new TimelineMax({ paused: true });

  startQuizTl.to('svg', 1, {
    x: rightXOff,
    ease: Power2.easeInOut,
  });

  startQuizTl.play(0);
}); */


function anonymizing() {

  // TODO: Animation for 'Anonymizing' section
  console.log('anonymizing');

}


function complete() {

  // TODO: Animation for completion section
  console.log('complete');

}


function confirmation() {

  // TODO: Animation for image confirmation section
  console.log('confirmation');

}


function quiz() {

  // TODO: Animation for quiz section
  console.log('quiz');

}


function results() {

  // TODO: Animation for quiz section
  console.log('results');

}


function selfie() {

  // TODO: Animation for selfie section
  console.log('selfie');

}


function init() {

  // TODO: Animation for initial section
  console.log('init');


  TweenLite.set(svg, {
    rotation: 90,
    transformOrigin: 'center',
    x: '-320px',
  });

  const introTl = new TimelineMax({ paused: true });

  introTl.to(svg, 1, {
    x: '-485px',
    ease: Power2.easeInOut,
  })
  .to(svg, 0.4, {
    x: leftXOff,
    ease: Power2.easeInOut,
    delay: 0.5,
  })
  /* .to(svg, 0.01, {
    rotation: 0,
    y: bottomYOff,
  })
  .to([fedora, sunglasses], 0.01, {
    display: 'none',
  })
  .to(svg, 0.01, {
    x: '280px',
  })
  .to(svg, 0.5, {
    y: '480px',
    ease: Power2.easeInOut,
  }); */

  introTl.play(0);

  // hat();
}


function create(element) {
  svg = element;

  fedora = getElement('#fedora', svg);

  leftPupil = getElement('#eyes-concern_pupil-l', svg);
  leftWhite = getElement('#eyes-concern_white-l', svg);

  rightPupil = getElement('#eyes-concern_pupil-r', svg);
  rightWhite = getElement('#eyes-concern_white-r', svg);

  sunglasses = getElement('#glasses-sun', svg);

  init();
}


export {
  create,
  anonymizing,
  complete,
  confirmation,
  quiz,
  results,
  selfie,
};
