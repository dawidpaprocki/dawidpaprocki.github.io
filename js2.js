async  function myFunction() {
  var hamburgerid = document.getElementById("hamburger");
hamburgerid.classList.toggle("change");

  var elemetid = document.getElementById("myTopnav");
    var elemetidmenu = document.getElementById("navigation");

  if (elemetid.className === "topnav" || elemetid.className === "topnav mobile") {
  elemetid.classList.add("responsive");
  } else {
          elemetid.classList.remove("responsive");
  }

  if(elemetidmenu.className == "menu menu-link"){
    elemetidmenu.classList.add("responsive")
  }else {
     await sleep(500);
      elemetidmenu.classList.remove("responsive")
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


$(document).ready(function() {

  $('#example-1').progress_fnc();



});


(function($) {

  $.fn.progress_fnc = function(options) {
    var settings = $.extend({
      type: 'start'
    }, options);

    var div = $(this);
    var progress = div.find('.cssProgress');

    progress.each(function() {
      var self = $(this);
      var progress_bar = self.find('.cssProgress-bar');
      var progress_label = self.find('.cssProgress-label, .cssProgress-label2');
      var label_move = self.find('.first75');
      var progress_value = progress_bar.data('percent');
      var percentage = parseInt(progress_value, 10) + '%';

      progress_bar.css({'width': '0%', 'transition': 'none', '-webkit-transition': 'none', '-moz-transition': 'none'});

      if(settings.type == 'start') {


        progress_bar.animate({
          width: percentage
        }, {
          duration: 1000,
          step: function(x) {
            progress_label.text(Math.round(x) + '%');

          }
        });

      }

    });
  }

}(jQuery));
