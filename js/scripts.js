/*--------------------------------------------------------------
## Contact form
--------------------------------------------------------------*/
var path = window.location.pathname;
var page = path.split("/").pop();

if(page === "index.html"){
    const form = document.querySelector('#contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    //wyłączamy domyślną walidację
    form.setAttribute('novalidate', true);

    const displayFieldError = function(elem) {
        const fieldRow = elem.closest('.form-row');
        const fieldError = fieldRow.querySelector('.field-error');
        if (fieldError === null) {
            const errorText = elem.dataset.error;
            const divError = document.createElement('div');
            divError.classList.add('field-error');
            divError.innerText = errorText;
            fieldRow.appendChild(divError);
        }
    };

    const hideFieldError = function(elem) {
        const fieldRow = elem.closest('.form-row');
        const fieldError = fieldRow.querySelector('.field-error');
        if (fieldError !== null) {
            fieldError.remove();
        }
    };

    [...inputs].forEach(elem => {
        elem.addEventListener('input', function() {
            if (!this.checkValidity()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
                hideFieldError(this);
            }
        });

        if (elem.type === "checkbox") {
            elem.addEventListener('click', function() {
                const formRow = this.closest('.form-row');
                if (this.checked) {
                    this.classList.remove('error');
                    hideFieldError(this);
                } else {
                    this.classList.add('error');
                }
            });
        }
    });

    const checkFieldsErrors = function(elements) {
        //ustawiamy zmienną na true. Następnie robimy pętlę po wszystkich polach
        //jeżeli któreś z pól jest błędne, przełączamy zmienną na false.
        let fieldsAreValid = true;

        [...elements].forEach(elem => {
            if (elem.checkValidity()) {
                hideFieldError(elem);
                elem.classList.remove('error');
            } else {
                displayFieldError(elem);
                elem.classList.add('error');
                fieldsAreValid = false;
            }
        });

        return fieldsAreValid;
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        //jeżeli wszystkie pola są poprawne...
        if (checkFieldsErrors(inputs)) {
            const elements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)');

            const dataToSend = new FormData();
            [...elements].forEach(el => dataToSend.append(el.name, el.value));

            const url = form.getAttribute('action');
            const method = form.getAttribute('method');

            const submit = form.querySelector('[type="submit"]');
            submit.disabled = true;
            submit.classList.add('element-is-busy');

            fetch(url, {
                method: method.toUpperCase(),
                body: dataToSend
            })
            .then(ret => ret.json())
            .then(ret => {
                submit.disabled = false;
                submit.classList.remove('element-is-busy');

                if (ret.errors) {
                    ret.errors.map(function(el) {
                        return '[name="'+el+'"]'
                    });
                    const selector = ret.errors.join(',');
                    checkFieldsErrors(form.querySelectorAll(sekector));

                } else {
                    if (ret.status === 'ok') {
                        //wyświetlamy komunikat powodzenia, cieszymy sie
                        const div = document.createElement('div');
                        div.classList.add('form-send-success');
                        div.innerText = 'Wysłanie wiadomości się nie powiodło';

                        form.parentElement.insertBefore(div, form);
                        div.innerHTML = '<strong>Wiadomość została wysłana</strong><span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</span>';
                        form.remove();
                    }

                    if (ret.status === 'error') {
                        //komunikat błędu, niepowodzenia
                        const div = document.createElement('div');
                        div.classList.add('send-error');
                        div.innerText = 'Wysłanie wiadomości się nie powiodło';
                    }
                }
            }).catch(_ => {
                submit.disabled = false;
                submit.classList.remove('element-is-busy');
            });
        }
    });
}

/*--------------------------------------------------------------
## Mobile menu - 'Hamburger'
--------------------------------------------------------------*/

function myHamburger() {
  var hamburgerid = document.getElementById("hamburger");
  hamburgerid.classList.toggle("change");

  var elemetid = document.getElementById("myTopnav");
  var elemetidmenu = document.getElementById("navigation");

  if (elemetid.className === "topnav" || elemetid.className === "topnav mobile") {
    elemetid.classList.add("responsive");
  } else {
    elemetid.classList.remove("responsive");
  }

  if (elemetidmenu.className == "menu menu-link") {
    elemetidmenu.classList.add("responsive");
  } else {
    elemetidmenu.classList.remove("responsive");
  }
}

/*--------------------------------------------------------------
## Progress bars
--------------------------------------------------------------*/
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

      progress_bar.css({
        'width': '0%',
        'transition': 'none',
        '-webkit-transition': 'none',
        '-moz-transition': 'none'
      });

      if (settings.type == 'start') {


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

/*--------------------------------------------------------------
## slideshow
--------------------------------------------------------------*/

var topSliderIndex = 0;
slider();
function slider() {
  var i;
  var x = document.getElementsByClassName("headers");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  topSliderIndex++;
  if (topSliderIndex > x.length) {
    topSliderIndex = 1
  }
  x[topSliderIndex - 1].style.display = 'block';
  setTimeout(slider, 30000);
}

function plusDivs(n) {
  showDivs(myIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("headers");
  if (n > x.length) {
    myIndex = 1
  }
  if (n < 1) {
    myIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[myIndex - 1].style.display = "block";
}
