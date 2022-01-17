'use strict';
gsap.set('.view-up', {autoAlpha: 0, y:10});
var elems = document.getElementsByClassName('view-up');
for (let i = 0; i < elems.length; i++) {
  gsap.to(elems[i], {
    duration: 1,
    autoAlpha: 1,
    y: 0,
    
    scrollTrigger: {
        // markers: true,
      start: "100 center",
        trigger: elems[i],
      }
  });
}