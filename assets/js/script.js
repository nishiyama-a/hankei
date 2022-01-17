'use strict';
//loading
$(function() {
  var h = $(window).height();
  
  $('#wrap').css('display','none');
  $('#loader-bg ,#loader').height(h).css('display','block');
});
  
$(window).load(function () { //全ての読み込みが完了したら実行
  $('#loader-bg').delay(900).fadeOut(800);
  $('#loader').delay(600).fadeOut(300);
  $('#wrap').css('display', 'block');
});
  
//10秒たったら強制的にロード画面を非表示
$(function(){
  setTimeout('stopload()',10000);
});
  
function stopload(){
  $('#wrap').css('display','block');
  $('#loader-bg').delay(900).fadeOut(800);
  $('#loader').delay(600).fadeOut(300);
}



// hambmenu
var $_body = document.querySelector("body");
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("hamb-btn").addEventListener("click", () => {
    let scroll_position =
      document.documentElement.scrollTop || document.body.scrollTop;
    $_body.classList.toggle("g-active");
    if ($_body.classList.contains("g-active")) {
      $_body.style.top = "-" + scroll_position + "px";
      $_body.classList.add("body-fixed");
    } else {
      var body_style_top = $_body.style.top;
      var hamb_pos = body_style_top.replace(/[^0-9]/g, "");
      $_body.style.top = '';
      $_body.classList.remove("body-fixed");
      window.scrollTo({
        top: hamb_pos,
        behavior: 'instant'
      });
    }
  }, false);
}, false);


// modal
var $body = document.querySelector('body');
var $modalBtn = document.getElementsByClassName('modal-open');
for (var i = 0; i < $modalBtn.length; i++) {
  $modalBtn[i].addEventListener('click', e => {
    var thisBtn = $modalBtn[i];
    var scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    $body.style.top = '-' + scrollPosition + 'px';
    $body.classList.add('body-fixed');
    var $isClose = document.getElementsByClassName('is-close');
    //overlay show
    $body.insertAdjacentHTML(
      'beforeend',
      '<div id="modal-overlay" class="is-close"></div>'
    );
    var $overlay = document.getElementById('modal-overlay');
    var begin = new Date() - 0;
    var myTime = 300;
    var id = setInterval(function () {
      var current = new Date() - begin;
      if (current > myTime) {
        clearInterval(id);
        current = myTime;
      }
      $overlay.style.opacity = current / myTime;
    }, 10);
    //modal show
    var $modal = document.getElementById('modal-wrap');
    var $modalContens = $modal.querySelector('.modal-contents');
    setTimeout(function () {
      centerModal();
    }, 5);
    $modal.style.display = 'block';
    $modalContens.style.opacity = 1;
    $modal.insertAdjacentHTML(
      'beforeend',
      '<div id="modal-close" class="modal-close is-close"></div>'
    );
    var $closeBtn = $modal.querySelector('#modal-close');

    //close
    for (var i = 0; i < $isClose.length; i++) {
      $isClose[i].addEventListener('click', () => {
        $body.classList.remove('body-fixed');
        $body.style.top = '0';
        window.scrollTo(0, scrollPosition);
        $modalContens.style.opacity = '';
        $modal.classList.remove('active');
        $modal.style.display = '';
        $closeBtn.parentNode.removeChild($closeBtn);
        var begin = new Date() - 0;
        var myTime = 300;
        var id = setInterval(function () {
          var current = new Date() - begin;
          if (current > myTime) {
            clearInterval(id);
            current = myTime;
            $overlay.style.display = "none";
          }
          $overlay.style.opacity = 1 - (current / myTime);
        }, 10);
        setTimeout(function () {
          $overlay.parentNode.removeChild($overlay);
        }, 300);
      }, false);
    }
    window.addEventListener('resize', centerModal);
    // modal center
    function centerModal() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var x = (w - $modal.offsetWidth) / 2;
      var y = (h - $modal.offsetHeight) / 2;
      $modal.style.left = x + 'px';
      $modal.style.top = y + 'px';
    }
  }, false);
}


// scrolltop
var pagetop = document.getElementById('pagetop-btn');
if (pagetop) {
  window.addEventListener('scroll', () => {
    var y = window.pageYOffset;
    if (y > 200) {
      pagetop.classList.add('active');
    } else {
      pagetop.classList.remove('active');
    }
  });
}


// smoothscroll
var scrollElm = (() => {
  if ('scrollingElement' in document) {
    return document.scrollingElement;
  }
  if (navigator.userAgent.indexOf('WebKit') != -1) {
    return document.body;
    return document.documentElement;
  }
})();
(function () {
  var duration = 500;
  var ignore = '.noscroll';
  var easing = function (t, b, c, d) {
    return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b;
  };
  var smoothScrollElm = document.querySelectorAll('a[href^="#"]:not(' + ignore + ')');
  Array.prototype.forEach.call(smoothScrollElm, elm => {
    elm.addEventListener('click', e => {
      e.preventDefault();
      var targetElm = document.querySelector(elm.getAttribute('href'));
      if (!targetElm) return;
      var targetPos = targetElm.getBoundingClientRect().top;
      var startTime = Date.now();
      var scrollFrom = scrollElm.scrollTop;
      (function loop() {
        var currentTime = Date.now() - startTime;
        if (currentTime < duration) {
          scrollTo(0, easing(currentTime, scrollFrom, targetPos, duration));
          window.requestAnimationFrame(loop);
        } else {
          scrollTo(0, targetPos + scrollFrom);
        }
      })();
    })
  });
})();


// accordion
$(".acd-box").css("display", "none");//中身
$(".acd-btn").click(function () {
  $(".acd-btn").not(this).removeClass("open");
  $(".acd-btn").not(this).next().slideUp(300);
  $(this).toggleClass("open");
  $(this).next().slideToggle(300);
});