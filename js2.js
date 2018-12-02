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
