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
let bowtie;

let leftPupil;
let leftWhite;

let rightPupil;
let rightWhite;

let eyesClosed;
let eyesHappyClosed;
let eyesSmize;
let wideEyes;
let halfEyes;
let bigEyes;

let glasses;
let sunglasses;
let glassesSquare;

let mouthGasp;
let mouthSlightSmile;
let mouthBigSmile;
let mouthNoSmile;

let mustache;

let timeline;

let hair;

const topYOff = '50px';
const leftXOff = '-288px';
const rightXOff = '1280px';
const bottomYOff = '950px';


function anonymizing() {
  timeline = new TimelineMax({ paused: true });

  timeline.to(svg, 0.5, {
    y: topYOff,
    ease: Power2.easeInOut,
  })
  .set(svg, {
    x: rightXOff,
    y: '740px',
    rotation: -90,
  })
  .set([mouthBigSmile, mouthSlightSmile], {
    visibility: 'hidden',
  })
  .set([mouthNoSmile, mustache], {
    visibility: 'visible',
  })
  .set([fedora, sunglasses], {
    display: 'block',
  })
  .to(svg, 0.8, {
    x: '1040px',
    ease: Power2.easeInOut,
  })
  .to(svg, 2, {
    x: rightXOff,
    ease: Power2.easeInOut,
    delay: 1,
  });

  timeline.play(0);
}


function complete() {

  // TODO: Animation for completion section
  console.log('complete');
}


function confirmation() {
  TweenMax.set(svg, {
    y: topYOff,
    x: '1120px',
    rotation: 180,
  });

  TweenMax.set(eyesSmize, {
    opacity: '1',
    scaleY: 1,
  });

  TweenMax.set(eyesHappyClosed, {
    opacity: '0',
    scaleY: 0.1,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(svg, 1, {
    y: '240px',
    ease: Power2.easeInOut,
  })
  .to(eyesSmize, 0.2, {
    opacity: '0',
    scaleY: 0.2,
    transformOrigin: 'top',
    ease: SteppedEase.config(1),
    yoyo: true,
    repeat: +3,
  }, 'rtEye')
  .to(eyesHappyClosed, 0.2, {
    opacity: '1',
    scaleY: 1,
    transformOrigin: 'top',
    ease: SteppedEase.config(1),
    yoyo: true,
    repeat: +3,
  }, 'rtEye');

  timeline.play(0);
}

function toggle(question, isCorrectAnswer) {
  questionsAnimations[question][isCorrectAnswer]();
}


function quiz(question, value) {
  // TODO: Animation for quiz section

  TweenMax.set(svg, {
    y: bottomYOff,
    x: '820px',
    rotation: 0,
  });
  TweenMax.set([mouthNoSmile, fedora, sunglasses], {
    display: 'none',
    opacity: '0',
  });
  TweenMax.set([mustache, eyesSmize], {
    visibility: 'hidden',
  });
  TweenMax.set([mouthSlightSmile, wideEyes, bowtie], {
    visibility: 'visible',
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(svg, 0.5, {
    y: '480px',
    ease: Power2.easeInOut,
  })
  .add('rtEye', '+=.2')
  .to(wideEyes, 0.1, {
    scaleY: 0.1,
    transformOrigin: 'center',
    opacity: 0,
    yoyo: true,
    repeat: +1,
    delay: 2,
    ease: SteppedEase.config(1),
  }, 'rtEye')
  .to(eyesHappyClosed, 0.1, {
    visibility: 'visible',
    opacity: '1',
    scaleY: 1,
    yoyo: true,
    repeat: +1,
    delay: 2,
    ease: SteppedEase.config(1),
  }, 'rtEye');

  timeline.play(0);
}

const questionsAnimations = {
  1: {
    true: quizAOneRight,
    false: quizAOneWrong,
  },
  2: {
    true: quizATwoRight,
    false: quizATwoWrong,
  },
  3: {
    true: quizAThreeRight,
    false: quizAThreeWrong,
  },
  4: {
    true: quizAFourRight,
    false: quizAFourWrong,
  },
  5: {
    true: quizAFiveRight,
    false: quizAFiveWrong,
  },
  6: {
    true: quizASixRight,
    false: quizASixWrong,
  },
  7: {
    true: quizASevenRight,
    false: quizASevenWrong,
  },
  8: {
    true: quizAEightRight,
    false: quizAEightWrong,
  },
};


function quizAOneRight() {
  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    repeat: +1,
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizAOneWrong() {
  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    repeat: +1,
    ease: Power0.easeInOut,
  })
  .set(halfEyes, {
    visibility: 'visible',
  })
  .to(wideEyes, 0.1, {
    transformOrigin: 'top',
    scaleY: 0.1,
    opacity: 0,
    ease: SteppedEase.config(1),
  })
  .to(mouthSlightSmile, 0.1, {
    opacity: 0,
    ease: SteppedEase.config(1),
  })
  .to(mouthNoSmile, 0.1, {
    display: 'block',
    opacity: 1,
    ease: SteppedEase.config(1),
  });

  timeline.play(0);
}


function kill() {
  timeline.kill();

  TweenLite.set(svg, {
    rotation: 0,
    x: -window.innerWidth,
    y: -window.innerHeight,
  });
}


function quizATwoRight() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizATwoWrong() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizAThreeRight() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizAThreeWrong() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizAFourRight() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizAFourWrong() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizAFiveRight() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizAFiveWrong() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizASixRight() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizASixWrong() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizASevenRight() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizASevenWrong() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizAEightRight() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}

function quizAEightWrong() {
  // TODO: Animation for quiz section
  console.log('quizATwoRight');
}


function results() {

  // TODO: Animation for quiz section
  console.log('results');

}


function selfie() {
  TweenMax.set([eyesHappyClosed, mouthBigSmile], {
    scaleY: 0.1,
    opacity: '0',
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(svg, 0.1, {
    y: topYOff,
    ease: Power2.easeInOut,
  })
  .set(svg, {
    x: '690px',
    y: bottomYOff,
    rotation: 0,
  })
  .set([hair, glassesSquare], {
    visibility: 'hidden',
  })
  .set(glasses, {
    display: 'block',
  })
  .set([rightWhite, leftWhite, rightPupil, leftPupil], {
    display: 'none',
  })
  .set(eyesSmize, {
    visibility: 'visible',
  })
  .to(svg, 1, {
    y: '500px',
    ease: Power2.easeInOut,
  })
  .add('rtEye', '+=.2')
  .to(eyesSmize, 0.4, {
    opacity: '0',
    scaleY: 0.2,
    transformOrigin: '50% 50%',
    yoyo: true,
    repeat: +2,
    ease:SteppedEase.config(1),
  }, 'rtEye')
  .to(eyesHappyClosed, 0.4, {
    visibility: 'visible',
    opacity: '1',
    scaleY: 1,
    yoyo: true,
    repeat: +2,
    ease: SteppedEase.config(1),
  }, 'rtEye')
  .to(mouthBigSmile, 0.4, {
    visibility: 'visible',
    opacity: '1',
    scaleY: 1,
    ease: SteppedEase.config(1),
    yoyo: true,
    repeat: +2,
  }, 'rtEye');

  timeline.play(0);
}


function init() {
  TweenLite.set(svg, {
    y: '30px',
    rotation: 90,
  });

  TweenMax.set(eyesClosed, {
    scaleY: 0.1,
    opacity: '0',
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(svg, 1.5, {
    x: '460px',
    ease: Power2.easeInOut,
    delay: 1,
  })
  .to(svg, 0.4, {
    x: leftXOff,
    ease: Power2.easeInOut,
    delay: 0.5,
  })
  .to(svg, 0.01, {
    rotation: 0,
    y: bottomYOff,
  })
  .to([fedora, sunglasses], 0.01, {
    display: 'none',
  })
  .to(svg, 0.01, {
    x: '920px',
  })
  .to(svg, 0.5, {
    y: '520px',
    ease: Power2.easeInOut,
  })
  .add('rtEye', '+=.2')
  .to([rightWhite, rightPupil, leftWhite, leftPupil], 0.2, {
    opacity: '0',
    scaleY: 0.2,
    yoyo: true,
    repeat: +1,
    ease: SteppedEase.config(1),
  }, 'rtEye')
  .to(eyesClosed, 0.2, {
    visibility: 'visible',
    opacity: '1',
    scaleY: 1,
    yoyo: true,
    repeat: +1,
    ease: SteppedEase.config(1),
  }, 'rtEye')
  .to(svg, 0.5, {
    y: bottomYOff,
    ease: Power2.easeInOut,
    delay: 0.5,
  })
  .set(svg, {
    x: '1120px',
    y: topYOff,
    rotation: 180,
  })
  .set(mouthGasp, {
    visibility: 'hidden',
  })
  .set([mouthSlightSmile, hair, glassesSquare], {
    visibility: 'visible',
  })
  .set(glasses, {
    display: 'none',
  })
  .to(svg, 0.5, {
    y: '220px',
    ease: Power2.easeInOut,
  });

  timeline.play(0);
}


function create(element) {
  svg = element;

  fedora = getElement('#fedora', svg);
  hair = getElement('[data-hair]', svg);
  bowtie = getElement('[data-bowtie]', svg);

  leftPupil = getElement('#eyes-concern_pupil-l', svg);
  leftWhite = getElement('#eyes-concern_white-l', svg);

  rightPupil = getElement('#eyes-concern_pupil-r', svg);
  rightWhite = getElement('#eyes-concern_white-r', svg);

  glasses = getElement('#glasses', svg);
  sunglasses = getElement('#glasses-sun', svg);
  glassesSquare = getElement('[data-glasses-square]', svg);

  eyesClosed = getElement('[data-eyes-closed]', svg);
  eyesHappyClosed = getElement('[data-eyes-happy-closed]', svg);
  eyesSmize = getElement('[data-eyes-smize]', svg);
  wideEyes = getElement('[data-eyes-wide]', svg);
  halfEyes = getElement('[data-eyes-half]', svg);
  bigEyes = getElement('[data-eyes-big]', svg);

  mouthGasp = getElement('#mouth-gasp', svg);
  mouthSlightSmile = getElement('[data-mouth-slight-smile]', svg);
  mouthBigSmile = getElement('[data-mouth-big-smile]', svg);
  mouthNoSmile = getElement('[data-mouth-no-smile]', svg);

  mustache = getElement('[data-mustache]', svg);

  init();
}


export {
  create,
  anonymizing,
  complete,
  confirmation,
  kill,
  quiz,
  results,
  toggle,
  selfie,
};
