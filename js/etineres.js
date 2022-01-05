window.onload=function() {
  /* DESKTOP: CIRNO SWAP IMG */
  let cirnoImg = document.getElementById("cirno_img");

  cirnoImg.addEventListener("mouseover", function(event) {
    cirnoImg.setAttribute("src", "img/cirno_angy.png");
  }, false);

  cirnoImg.addEventListener("mouseout", function(event) {
    cirnoImg.setAttribute("src", "img/cirno.png");
  }, false);


  /* SIDE MENU */
  let shrimpItem = document.getElementById("shrimp");
  shrimpItem.addEventListener("mouseup", function(event) {
    createWindow("shrimp", "Shrimp heaven 🦐🍻🦐", "hkJaXZeonVg")

    if (document.getElementsByClassName('shrimp').length == 5) {
      document.body.style.background = "url(img/shrimp_heaven.gif)";
      // To match background style
      var items = document.querySelectorAll('.item img');
      for (var i = 0; i < items.length; i++) {
        items[i].style.filter = "drop-shadow(0px 0px 0.3rem pink)";
      }
    }
  }, false);

  let youmuItem = document.getElementById('youmu');
  youmuItem.addEventListener("mouseup", function(event) {
    createWindow("youmu", "Konpaku Youmu and dancing fish", "ZrJr6zW9_hI")
  }, false);


  /* SIDE MENU > MODDING ITEMS actived */
  let manageModding = document.getElementById('manage-modding');
  manageModding.addEventListener("mouseup", function(event) {
    manageModding.classList.toggle('actived');
    let toToggle = document.querySelectorAll('.modding').forEach((item) => {
        item.classList.toggle('none');
    });
  }, false);

  /* SIDE MENU > External Link  */
  let externalLink = document.getElementById('manage-external-link');
  externalLink.addEventListener("mouseup", function(event) {
    externalLink.classList.toggle('actived');
    let toToggle = document.querySelectorAll('.external-link').forEach((item) => {
      item.classList.toggle('none');
    });
  }, false);


  /* WINDOW MANAGEMENT */
  // Quit is handled with onclick on '.window-quit' elements (look at createWindow())
  function createWindow(type, title, ytId)  {
    /*
      <div class="window type" style="top:top; left:left;">
        <div class="window-menubar"><span class="window-title">title</span><div class="window-quit" onclick="return this.parentNode.parentNode.remove();">X</div></div>
        <div class="window-content">
        <iframe width="winWidth" "winHeight" src="https://www.youtube.com/embed/yt_id" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  <div id="sidemenu">
      </div>
    */

    let winHeight;
    let winWidth;
    if (getWidth() < 768) {
      winHeight = 175;
      winWidth = 300;
    }
    else {
      winHeight = 376;
      winWidth = 624;
    }

    let top = getRndInteger(0, getHeight()-winHeight) + "px";
    let left = getRndInteger(0, getWidth()-winWidth) + "px";

    let windowHTML = '<div class="window ' + type + '" style="top:' + top + '; left:' + left + ';"> <div class="window-menubar"><span class="window-title">' + title + '</span><div class="window-quit" onclick="return this.parentNode.parentNode.remove();">X</div></div><div class="window-content"><iframe src="https://www.youtube.com/embed/' + ytId + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    document.body.insertAdjacentHTML('beforeend', windowHTML);
  }


  /* UTILS */
  //console.log(getHeight(), getWidth());
  function getHeight() {
    return window.innerHeight;
  }

  function getWidth() {
    return window.innerWidth;
  }

  function getRndInteger(min, max) { // https://www.w3schools.com/JS/js_random.asp
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  function quitAllByClassName(className) {
    const windowsToQuit = document.getElementsByClassName(className);
    while (windowsToQuit.length > 0) {
      windowsToQuit[0].remove();
    }
  }

}
