function init() {
  new SmoothScroll(document, 150, 10)
}
var pos;

function SmoothScroll(target, speed, smooth) {
  if (target == document)
    target = (document.documentElement || document.body.parentNode || document.body) // cross browser support for document scrolling
  var moving = false
  pos = target.scrollTop
  target.addEventListener('mousewheel', scrolled, false)
  target.addEventListener('DOMMouseScroll', scrolled, false)

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e)

    pos += -delta * speed
    pos = Math.max(0, Math.min(pos, target.scrollHeight - target.clientHeight)) // limit scrolling

    if (!moving) update()
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1) // Opera
      else
        return -e.detail / 3 // Firefox
    } else
      return e.wheelDelta / 120 // IE,Safari,Chrome
  }

  function update() {
    moving = true
    var delta = (pos - target.scrollTop) / smooth
    target.scrollTop += delta
    if (Math.abs(delta) > 0.5)
      requestFrame(update)
    else
      moving = false
  }

  var requestFrame = function() { // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  }()
}

/*--------------------------------------------------------------
## Back to top button
--------------------------------------------------------------*/
(function() {
  var parallax = document.querySelectorAll(".content-box-parallax"),
    speed = 0.1;

  window.onscroll = function() {
    [].slice.call(parallax).forEach(function(el, i) {

      var windowYOffset = window.pageYOffset,
        elBackgrounPos = "50%" + (-((windowYOffset - 1800) * speed)) + "px";

      el.style.backgroundPosition = elBackgrounPos;

      var height = $(window).scrollTop();
      if (height > 800) {
        $('#back-to-top').fadeIn();
      } else {
        $('#back-to-top').fadeOut();
      }

    });
  };

})();




$(document).ready(function() {
  $("#back-to-top").click(function(event) {
    pos = 0;
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });

})

$(document).ready(function() {
  $(this).scrollTop(0);
});

// function scrollFunction() {
//   if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//     document.getElementById("#back-to-top").style.display = "block";
//   } else {
//     document.getElementById("#back-to-top").style.display = "none";
//   }
// }

// var target = window.location.hash,
//   target = target.replace('#', ''),
//   offset = 65;
//
// $(window).load(function() {
//   var win = $('html,body');
//
//   if (target) {
//     $(win).animate({
//       scrollTop: $("#" + target).offset().top - offset
//     }, 700, 'swing', function() {
//       waypoints();
//     });
//   } else {
//     waypoints();
//   }
//
//   //Smooth scroll on menu click
//   $('#navigation li a[href^="#"]').each(function() {
//     var target = $($(this).attr('href'));
//
//     $(this).click(function() {
//       win.stop().animate({
//         scrollTop: target.offset().top - offset
//       }, 600);
//       return false;
//     });
//   });
//
//
// });
//
//
// function waypoints() {
//
//   //Setup
//   var lastId,
//     topMenu = $("#navigation"),
//     menuItems = topMenu.find("a"),
//     scrollItems = menuItems.map(function() {
//       var itemHref = $(this).attr("href");
//       if (itemHref.substring(0, 1) === '#') {
//         var item = $(itemHref);
//         if (item.length) {
//           return item;
//         }
//       }
//     });
//
//   //Do magic on scroll
//   $(window).on('scroll', function() {
//
//     // Get container scroll position
//     var fromTop = $(this).scrollTop() + offset;
//
//     // Get id of current scroll item
//     var cur = scrollItems.map(function() {
//       if ($(this).offset().top <= fromTop)
//         return this;
//     });
//     // Get the id of the current element
//     cur = cur[cur.length - 1];
//     var id = cur && cur.length ? cur[0].id : "";
//
//     if (lastId !== id) {
//       lastId = id;
//       // Set/remove active class
//       $('#navigation li a').removeClass('active');
//       $('#navigation li a[href="#' + id + '"]').addClass('active');
//
//       //change url
//       if (history.pushState) {
//         history.pushState(null, null, '#' + id);
//       }
//     }
//
//   });

// }
$(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop()) {
      // alert('ad just passed.');
      var fullboxmeu = document.getElementById("full-box-menu");
      fullboxmeu.classList.add("full-box-menu-scroll");

      var logo = document.getElementById("logo");
      logo.classList.add("logoscroll");

      var navigation = document.getElementById("myTopnav");
      navigation.classList.add("mobile");

      var menu = document.getElementById("top-menu");
      menu.classList.add("menu-normal-scroll");

    } else {

      var fullboxmeu = document.getElementById("full-box-menu");
      fullboxmeu.classList.remove("full-box-menu-scroll");

      var logo = document.getElementById("logo");
      logo.classList.remove("logoscroll");

      var navigation = document.getElementById("myTopnav");
      navigation.classList.remove("mobile");

      var menu = document.getElementById("top-menu");
      menu.classList.remove("menu-normal-scroll");

    }
  });
});
var path = window.location.pathname;
var page = path.split("/").pop();

var myIndex = 0;
if(page === "index.html"){

  carousel();
}

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {

    x[i].style.display = 'none';


  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1
  }

  x[myIndex - 1].style.display = 'block';

  setTimeout(carousel, 3000);
}
