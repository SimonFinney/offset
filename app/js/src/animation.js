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
let partyHat;
let bowtie;

let leftPupil;
let leftWhite;

let rightPupil;
let rightWhite;

let eyesClosed;
let eyesHappyClosed;
// let eyesHappyClosedR;
let eyesHappyClosedL;
let eyesSmize;
let eyesSmizeRPupil;
let eyesSmizeRWhite;
let eyesSmizeLPupil;
let eyesSmizeLWhite;
let wideEyes;
let halfEyes;
let bigEyes;
let worriedEyes;
let cryingEyes;

let glasses;
let sunglasses;
let glassesSquare;

let mouthGasp;
let mouthSlightSmile;
let mouthUpturnedSmile;
let mouthMediumSmile;
let mouthSmile;
let mouthBigSmile;
let mouthNoSmile;
let mouthOpen;
let mouthWide;
let mouthFrown;

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
  .to(svg, 1.5, {
    x: rightXOff,
    ease: Power2.easeInOut,
    delay: 1,
  });

  timeline.play(0);
}


function complete() {

  // TODO: Animation for completion section
  console.log('complete');
  TweenMax.set([hair, glassesSquare, mouthSmile], {
    visibility: 'visible',
    opacity: '1',
    display: 'block',
  });
  TweenMax.set([mouthBigSmile, partyHat, glasses, bowtie], {
    visibility: 'hidden',
  });
  TweenMax.set(svg, {
    y: bottomYOff,
    x: '1000px',
    rotation: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(svg, 0.5, {
    y: '500px',
    ease: Power2.easeInOut,
  });

  timeline.play(0);
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
    repeat: +1,
  }, 'rtEye')
  .to(eyesHappyClosed, 0.2, {
    opacity: '1',
    scaleY: 1,
    transformOrigin: 'top',
    ease: SteppedEase.config(1),
    yoyo: true,
    repeat: +1,
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
    delay: 1,
    ease: SteppedEase.config(1),
  }, 'rtEye')
  .to(eyesHappyClosed, 0.1, {
    visibility: 'visible',
    opacity: '1',
    scaleY: 1,
    yoyo: true,
    repeat: +1,
    delay: 1,
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
  TweenMax.set(mouthSmile, {
    visibility: 'visible',
    opacity: 0,
    scaleY: 0.2,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  })
  .add('rtEye', '+=.1')
  .to(mouthSmile, 0.1, {
    scaleY: 1,
    transformOrigin: 'top',
    opacity: 1,
    ease: SteppedEase.config(1),
  }, 'rtEye')
  .to(mouthSlightSmile, 0.1, {
    scaleY: 0.1,
    transformOrigin: 'top',
    opacity: 0,
    ease: SteppedEase.config(1),
  }, 'rtEye');

  timeline.play(0);
}

function quizAOneWrong() {
  TweenMax.set([halfEyes, mouthNoSmile], {
    visibility: 'visible',
    opacity: 1,
    display: 'block',
  });
  TweenMax.set([wideEyes, mouthSlightSmile], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });
  // .set(halfEyes, {
  //   visibility: 'visible',
  // })
  // .to(wideEyes, 0.1, {
  //   transformOrigin: 'top',
  //   scaleY: 0.1,
  //   opacity: 0,
  //   ease: SteppedEase.config(1),
  // })
  // .to(mouthSlightSmile, 0.1, {
  //   opacity: 0,
  //   ease: SteppedEase.config(1),
  // })
  // .to(mouthNoSmile, 0.1, {
  //   display: 'block',
  //   opacity: 1,
  //   ease: SteppedEase.config(1),
  // });

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
  TweenMax.set([eyesSmize, mouthSmile], {
    visibility: 'visible',
    opacity: 1,
    display: 'block',
  });
  TweenMax.set([wideEyes, halfEyes, mouthNoSmile], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 0,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });
  // .set(eyesSmize, {
  //   visibility: 'visible',
  // })
  // .to([wideEyes, halfEyes], 0.05, {
  //   opacity: 0,
  //   transformOrigin: 'top',
  //   scaleY: 0.1,
  // });

  timeline.play(0);
}

function quizATwoWrong() {
  // TODO: Animation for quiz section
  console.log('quizATwoWrong');

  TweenMax.set([bigEyes, mouthNoSmile], {
    visibility: 'visible',
    opacity: 1,
    display: 'block',
  });
  TweenMax.set([wideEyes, halfEyes, mouthSmile], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 0,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });
  // .to(bigEyes, 0.1, {
  //   transformOrigin: 'top',
  //   scaleY: 1,
  //   opacity: 1,
  //   ease: SteppedEase.config(1),
  // })
  // .to([wideEyes, halfEyes], 0.1, {
  //   opacity: 0,
  //   scaleY: 0.1,
  //   ease: SteppedEase.config(1),
  // })
  // .to(mouthSmile, 0.1, {
  //   opacity: 0,
  //   scaley: 0.1,
  //   ease: SteppedEase.config(1),
  // })
  // .to(mouthNoSmile, 0.1, {
  //   display: 'block',
  //   opacity: 1,
  //   ease: SteppedEase.config(1),
  // });

  timeline.play(0);
}

function quizAThreeRight() {
  // TODO: Animation for quiz section
  console.log('quizAThreeRight');
  TweenMax.set([wideEyes, mouthGasp], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([eyesSmize, bigEyes, mouthSmile, mouthNoSmile], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizAThreeWrong() {
  // TODO: Animation for quiz section
  console.log('quizAThreeWrong');
  TweenMax.set([leftPupil, leftWhite, rightPupil, rightWhite, mouthGasp], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([eyesSmize, bigEyes, mouthSmile, mouthNoSmile], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizAFourRight() {
  // TODO: Animation for quiz section
  console.log('quizAFourRight');
  TweenMax.set([eyesSmize, mouthUpturnedSmile, eyesHappyClosed], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([eyesSmizeRPupil, eyesSmizeRWhite, eyesHappyClosedL], {
    opacity: 0,
  });
  TweenMax.set([leftPupil, leftWhite, rightPupil, rightWhite, mouthGasp, bigEyes, wideEyes], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 0,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  })
  .set([eyesSmizeRPupil, eyesSmizeRWhite], {
    opacity: 1,
    delay: 0.2,
  })
  .set([eyesHappyClosed, mouthUpturnedSmile], {
    opacity: 0,
  })
  .set(mouthSmile, {
    opacity: 1,
    visibility: 'visible',
    display: 'block',
  });
  // .to(eyesHappyClosed, 0.1, {
  //   opacity: 1,
  //   visibility: 'visible',
  //   scaleY: 1,
  //   yoyo: true,
  //   repeat: +1,
  // });

  timeline.play(0);
}

function quizAFourWrong() {
  // TODO: Animation for quiz section
  console.log('quizAFourWrong');
  TweenMax.set([halfEyes, mouthOpen], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([leftPupil, leftWhite, rightPupil, rightWhite, mouthGasp, bigEyes, wideEyes], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 0,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizAFiveRight() {
  // TODO: Animation for quiz section
  console.log('quizAFiveRight');
  TweenMax.set([wideEyes, mouthMediumSmile], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([halfEyes, eyesSmize, eyesHappyClosed, mouthSmile, mouthOpen, mouthUpturnedSmile], {
    opacity: 0,
  });
  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizAFiveWrong() {
  // TODO: Animation for quiz section
  console.log('quizAFiveWrong');
  TweenMax.set([worriedEyes, mouthWide], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([halfEyes, eyesSmize, eyesHappyClosed, mouthSmile, mouthOpen, mouthUpturnedSmile], {
    opacity: 0,
  });
  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizASixRight() {
  // TODO: Animation for quiz section
  console.log('quizASizeRight');
  TweenMax.set([eyesSmize, eyesSmizeRPupil, eyesSmizeRWhite, mouthBigSmile], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([worriedEyes, mouthWide, wideEyes, mouthMediumSmile], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 0,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizASixWrong() {
  // TODO: Animation for quiz section
  console.log('quizASizWrong');
  TweenMax.set([cryingEyes, mouthFrown], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([worriedEyes, mouthWide, wideEyes, mouthMediumSmile], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 0,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizASevenRight() {
  TweenMax.set([eyesHappyClosed, eyesHappyClosedL, mouthBigSmile], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([cryingEyes, mouthFrown, eyesSmize], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizASevenWrong() {
  TweenMax.set([eyesClosed, mouthFrown], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([cryingEyes, mouthBigSmile, eyesSmize], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizAEightRight() {
  TweenMax.set([eyesSmize, eyesSmizeRPupil, eyesSmizeRWhite, mouthBigSmile], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([mouthFrown, eyesHappyClosed, eyesHappyClosedL, eyesClosed], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}

function quizAEightWrong() {
  TweenMax.set([worriedEyes, mouthWide], {
    visibility: 'visible',
    opacity: 1,
    scaleY: 1,
    display: 'block',
  });
  TweenMax.set([eyesHappyClosed, eyesHappyClosedL, mouthBigSmile, eyesClosed, mouthFrown], {
    opacity: 0,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(bowtie, 0.1, {
    rotation: 360,
    transformOrigin: 'center',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}


function results() {
  TweenMax.set([partyHat, mouthBigSmile, rightWhite, leftWhite, rightPupil, leftPupil], {
    visibility: 'visible',
    opacity: '1',
    display: 'block',
  });
  TweenMax.set([cryingEyes, eyesHappyClosed, eyesClosed, eyesSmize, mouthFrown, mouthWide, worriedEyes], {
    opacity: '0',
  });
  TweenMax.set(svg, {
    y: topYOff,
    x: '1270px',
    rotation: 180,
  });

  timeline = new TimelineMax({ paused: true });

  timeline.to(svg, 0.5, {
    y: '240px',
    ease: Power0.easeInOut,
  });

  timeline.play(0);
}


function selfie() {
  TweenMax.set([eyesHappyClosed, mouthBigSmile], {
    scaleY: 0.1,
    opacity: '0',
  });
  TweenMax.set([eyesSmizeRPupil, eyesSmizeRWhite, eyesHappyClosedL], {
    opacity: '1',
  });
  TweenMax.set([fedora, sunglasses], {
    display: 'none',
  });
  TweenMax.set([mouthGasp, eyesClosed], {
    visibility: 'hidden',
  });
  TweenMax.set([mouthSlightSmile], {
    visibility: 'visible',
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
    opacity: '1',
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


function introduction() {
  TweenLite.set(svg, {
    y: '30px',
    rotation: 90,
    x: '-288px',
  });

  TweenMax.set([eyesSmize, bowtie, bigEyes, eyesClosed, cryingEyes, halfEyes,
    eyesHappyClosed, wideEyes, worriedEyes, glassesSquare,
    hair, mouthBigSmile, mouthFrown, mouthNoSmile, mouthOpen, mouthSlightSmile,
    mouthUpturnedSmile, mouthMediumSmile, mouthSmile, mouthWide, mustache, partyHat], {
      opacity: '1',
      visibility: 'hidden',
      scaleY: 1,
    });

  TweenMax.set([fedora, sunglasses, glasses, rightWhite,
    rightPupil, leftWhite, leftPupil, mouthGasp], {
      visibility: 'visible',
      opacity: '1',
      display: 'block',
      scaleY: 1,
    });

  // TweenMax.set(mouthFrown, {
  //   opacity: 0,
  // });

  TweenMax.set(eyesClosed, {
    scaleY: 0.1,
    opacity: '0',
  });

  timeline = new TimelineMax({ repeatDelay: 2, onComplete: restart });

  timeline.to(svg, 1.5, {
    x: '460px',
    ease: Power2.easeInOut,
    // delay: 0.5,
  })
  .to(svg, 0.4, {
    x: leftXOff,
    ease: Power2.easeInOut,
    delay: 0.5,
  })
  .set(svg, {
    rotation: 0,
    y: bottomYOff,
    x: '920px',
  })
  .set([fedora, sunglasses], {
    display: 'none',
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
    opacity: '1',
  })
  .set(glasses, {
    display: 'none',
  })
  .to(svg, 0.5, {
    y: '220px',
    ease: Power2.easeInOut,
  })
  .to(svg, 1, {
    y: topYOff,
    ease: Power2.easeInOut,
    delay: 3,
  });

  // timeline.play(0);
  function restart() {
    TweenLite.set(svg, {
      y: '30px',
      rotation: 90,
      x: '-288px',
    });

    TweenMax.set([eyesSmize, bowtie, bigEyes, eyesClosed, cryingEyes, halfEyes,
      eyesHappyClosed, wideEyes, worriedEyes, glassesSquare,
      hair, mouthBigSmile, mouthFrown, mouthNoSmile, mouthOpen, mouthSlightSmile,
      mouthUpturnedSmile, mouthMediumSmile, mouthSmile, mouthWide, mustache, partyHat], {
        opacity: '1',
        visibility: 'hidden',
        scaleY: 1,
      });

    TweenMax.set([fedora, sunglasses, glasses, rightWhite,
      rightPupil, leftWhite, leftPupil, mouthGasp], {
        visibility: 'visible',
        opacity: '1',
        display: 'block',
      });

    timeline.restart();
  }
}


function create(element) {
  svg = element;

  fedora = getElement('#fedora', svg);
  partyHat = getElement('[data-party-hat]', svg);
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
  // eyesHappyClosedR = getElement('[#eyes-happy_closed-r', svg);
  eyesHappyClosedL = getElement('#eyes-happy_closed-l', svg);
  eyesSmize = getElement('[data-eyes-smize]', svg);
  eyesSmizeRPupil = getElement('#eyes-smize_pupil-l', svg);
  eyesSmizeRWhite = getElement('#eyes-smize_white-l', svg);
  eyesSmizeLPupil = getElement('#eyes-smize_pupil-r', svg);
  eyesSmizeLWhite = getElement('#eyes-smize_white-r', svg);
  wideEyes = getElement('[data-eyes-wide]', svg);
  halfEyes = getElement('[data-eyes-half]', svg);
  bigEyes = getElement('[data-eyes-big]', svg);
  worriedEyes = getElement('[data-eyes-worry]', svg);
  cryingEyes = getElement('[data-eyes-cry]', svg);

  mouthGasp = getElement('#mouth-gasp', svg);
  mouthSlightSmile = getElement('[data-mouth-slight-smile]', svg);
  mouthUpturnedSmile = getElement('[data-mouth-upturned-smile]', svg);
  mouthMediumSmile = getElement('[data-mouth-medium-smile]', svg);
  mouthSmile = getElement('[data-mouth-smile]', svg);
  mouthBigSmile = getElement('[data-mouth-big-smile]', svg);
  mouthNoSmile = getElement('[data-mouth-no-smile]', svg);
  mouthOpen = getElement('[data-mouth-open]', svg);
  mouthWide = getElement('[data-mouth-wide]', svg);
  mouthFrown = getElement('[data-mouth-frown]', svg);

  mustache = getElement('[data-mustache]', svg);
  introduction();
}


export {
  create,
  anonymizing,
  complete,
  confirmation,
  introduction,
  kill,
  quiz,
  results,
  toggle,
  selfie,
};
