// store the hash (DON'T put this code inside the $() function, it has to be executed
// right away before the browser can start scrolling!

$(document).ready(function(){
    $(this).scrollTop(0);
});

var target = window.location.hash,
    target = target.replace('#', ''),
    offset = 65;

$( window ).load(function() {
	var win = $('html,body');

    if (target) {
        $(win).animate({
            scrollTop: $("#" + target).offset().top - offset
        }, 700, 'swing', function () {
            waypoints();
        });
    }else{
        waypoints();
    }

	//Smooth scroll on menu click
	$('#navigation li a[href^="#"]').each(function (){
		var target = $($(this).attr('href'));

		$(this).click(function (){
			win.stop().animate( {scrollTop: target.offset().top - offset}, 600 );
			return false;
		});
	});


});


function waypoints(){

    //Setup
    var lastId,
        topMenu = $("#navigation"),
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function(){
            var itemHref = $(this).attr("href");
            if(itemHref.substring(0,1) === '#'){
                var item = $(itemHref);
                if (item.length) {
                    return item;
                }
            }
        });

    //Do magic on scroll
    $(window).on('scroll', function() {

        // Get container scroll position
        var fromTop = $(this).scrollTop() + offset;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top <= fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            $('#navigation li a').removeClass('active');
            $('#navigation li a[href="#'+ id +'"]').addClass('active');

            //change url
            if(history.pushState) {
                history.pushState(null, null, '#' + id);
            }
        }

    });

}
$(function(){
  $(window).scroll(function(){
    if($(window).scrollTop()) {
      // alert('ad just passed.');
      var element = document.getElementById("fullboxmeu");
       element.classList.add("fullboxmeuscroll");
       var element = document.getElementById("logo");
        element.classList.add("logoscroll");
          var element = document.getElementById("navigation");
           element.classList.add("menuscroll");
    }

    else {
      var element = document.getElementById("fullboxmeu");
       element.classList.remove("fullboxmeuscroll");
       var element = document.getElementById("logo");
        element.classList.remove("logoscroll");
          var element = document.getElementById("navigation");
           element.classList.remove("menuscroll");
    }
  });
});
