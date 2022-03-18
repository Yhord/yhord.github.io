window.onload=function() {
  /* DESKTOP: CIRNO SWAP IMG */
  let cirnoImg = document.getElementById('cirno_img');

  cirnoImg.addEventListener("mouseover", function(event) {
    cirnoImg.setAttribute("src", "img/cirno_angy.png");
  }, false);

  cirnoImg.addEventListener("mouseout", function(event) {
    cirnoImg.setAttribute("src", "img/cirno.png");
  }, false);

  /* SIDE MENU */
  let shrimpItem = document.getElementById('shrimp');
  shrimpItem.addEventListener("mouseup", function(event) {
    createWindow("shrimp", "Shrimp heaven <span class=\"backward\">🦐</span>🍻🦐", "hkJaXZeonVg")

    // Preloading the gif - https://perishablepress.com/3-ways-preload-images-css-javascript-ajax/#:~:text=JavaScript%20Method%20#2
    if (document.getElementsByClassName('shrimp').length == 2) {
      img1 = new Image();
      img1.src = "img/shrimp_heaven.gif";
    }

    if (document.getElementsByClassName('shrimp').length == 5) {
      setSubtitle("<span class=\"backward\">🦐</span> ／人 ◕ ‿‿ ◕ 人＼ 🦐"); //"🦐 (づ｡◕‿‿◕｡)づ 🦐"
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

  let lkjItem = document.getElementById('lkj');
  lkjItem.addEventListener("mouseup", function(event) {
    createWindow("lkj", "Little King John searching for land", "6eQTLQm8mIQ?start=204")
  }, false);

  /* DESKTOP: PHIPY SWAP IMG */
  let phipyImg = document.getElementById('phipy_img');

  phipyImg.addEventListener("mouseover", function(event) {
    phipyImg.setAttribute("src", "img/phipy_eyebrow.gif");
  }, false);

  phipyImg.addEventListener("mouseout", function(event) {
    phipyImg.setAttribute("src", "img/phipy.gif");
  }, false);


  /* SIDE MENU > MODDING ITEMS actived */
  let manageModding = document.getElementById('manage-modding');
  manageModding.addEventListener("mouseup", toggleModdingItems, false);

  function toggleModdingItems() {
    manageModding.classList.toggle('actived');
    let toToggle = document.querySelectorAll('.modding').forEach((item) => {
        item.classList.toggle('none');
    });
  }

  /* SIDE MENU > External Link  */
  let externalLink = document.getElementById('manage-external-link');
  externalLink.addEventListener("mouseup", toggleExternalLinkSign, false);

  function toggleExternalLinkSign() {
    externalLink.classList.toggle('actived');
    let toToggle = document.querySelectorAll('.external-link').forEach((item) => {
      item.classList.toggle('none');
    });
  }

  /* SIDE MENU > Broken */
  let speaker = document.getElementById('speaker');
  speaker.addEventListener("mouseup", useSpeaker, false);

  function useSpeaker() {
    speaker.firstChild.classList.remove('animation-broken');
    playSound("broken");
    // https://stackoverflow.com/a/41556846 - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips
    window.requestAnimationFrame(function(time) {
      window.requestAnimationFrame(function(time) {
        speaker.firstChild.classList.add('animation-broken');
      });
    });
  }

  /* KEYBOARD EVENT */
  document.addEventListener('keyup', function(event) {
    console.log(document.activeElement instanceof HTMLBodyElement)
    if (document.activeElement === null || document.activeElement instanceof HTMLBodyElement) {
      let key = event.key;
      switch(key.toLowerCase()) {
        case "m":
          useSpeaker();
          break;
        case "t":
          createTerminal();
          break;
        case "o":
          toggleModdingItems();
          break;
        case "l":
          toggleExternalLinkSign();
          break;
      }
    }
  });

}

document.addEventListener('mousedown', onClick);
document.addEventListener('touchstart', onClick);

function onClick(e) {
  if (e.target && e.target.className == 'window-menubar' || e.target.className == 'window-title') {
    onMenuBarWindowStart(e);
  }
}

/* MAKE WINDOWS MOVE */
function onMenuBarWindowStart(e) {
  // To handle a mousedown on a '.window-title' instead of a '.window-menubar'
  var win = e.target.className == 'window-menubar' ? e.target : e.target.parentNode;

  var posX, posY;
  if (e.type == 'touchstart') { // https://stackoverflow.com/a/61732450
    let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    let touch = evt.touches[0] || evt.changedTouches[0];
    posX = touch.pageX;
    posY = touch.pageY;
  }
  else {
    posX = e.clientX;
    posY = e.clientY;
  }
  var shiftX = posX - win.parentNode.getBoundingClientRect().left;
  var shiftY = posY - win.parentNode.getBoundingClientRect().top;
  var maxLeft = window.innerWidth - win.offsetWidth;
  var maxTop = window.innerHeight - win.parentNode.offsetHeight;

  function handleWindowMove(e) {
    var posX, posY;
    if (e.type == 'touchmove') {
      let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
      let touch = evt.touches[0] || evt.changedTouches[0];
      posX = touch.pageX;
      posY = touch.pageY;
    }
    else {
      posX = e.clientX;
      posY = e.clientY;
    }

    let newLeft = posX - shiftX;
    let newTop = posY - shiftY;

    // If a window is going to overflow it set the window position to the maximum it can be without overflowing
    win.parentNode.style.left = (newLeft < maxLeft ? newLeft : maxLeft) + "px"
    win.parentNode.style.top = (newTop < maxTop ? newTop : maxTop) + "px";
  }

  document.addEventListener('mousemove', handleWindowMove);
  document.addEventListener('touchmove', handleWindowMove);
  blockPointerEvents(); // Blocking PointerEvents allow the user to go through <iframe> without losing cursor information

  // When the user drop the window, the EventListener is removed
  function onMenuBarWindowStop(e) {
    document.removeEventListener('mousemove', handleWindowMove);
    document.removeEventListener('touchmove', handleWindowMove);
    unblockPointerEvents(); // Making the <iframe> interactive again
  }

  document.addEventListener('mouseup', onMenuBarWindowStop);
  document.addEventListener('touchstop', onMenuBarWindowStop);
}


function setSubtitle(str) {
  document.getElementById('subtitle').innerHTML = str;
}

/* WINDOW MANAGEMENT */
// Quit is handled with onclick on '.window-btn-quit' elements (look at createWindow() and removeWindow())
// Source is handled with "<a href="">"
function createWindow(type, title, ytId)  {
  /*
    <div class="window type" style="top:top; left:left;">
      <div class="window-menubar">
        <span class="window-title">title</span>
        <div class="window-btn-quit" onclick="removeWindow(this);">X</div>
        <a target="_blank" href="https://www.youtube.com/watch?v=ytId"><div class="window-btn-source">+</div></a>
      </div>
      <div class="window-content">
        <iframe width="winWidth" "winHeight" src="https://www.youtube.com/embed/yt_id" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  */
  let a = getWindowDimension();
  let b = getRandomPosition(a[0], a[1]);

  let windowHTML = `<div class="window ${type}" style="top:${b[0]}; left:${b[1]};"> <div class="window-menubar"><span class="window-title">${title}</span><div class="window-btn-quit" onclick="removeWindow(this);">X</div><a target="_blank" href="https://www.youtube.com/watch?v=${ytId}"><div class="window-btn-source">+</div></a></div><div class="window-content"><iframe src="https://www.youtube.com/embed/${ytId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  document.body.insertAdjacentHTML('beforeend', windowHTML);
}

/* WINDOW UTILS */
function getWindowDimension() {
  var winHeight = 376;
  var winWidth = 624;
  if (getWidth() < 768) {
    winHeight = 175;
    winWidth = 300;
  }
  return [winHeight, winWidth];
}

function removeWindow(win) {
  win.parentNode.parentNode.remove();
}

function getRandomPosition(winHeight, winWidth) {
  let top = getRndInteger(0, getHeight()-winHeight) + "px";
  let left = getRndInteger(0, getWidth()-winWidth) + "px";
  return [top, left]
}

function blockPointerEvents() {
  var iframes = document.getElementsByTagName('iframe');
  for (var i=0; i<iframes.length; i++) {
    iframes[i].classList.add('no-pointer-events')
  }
}

function unblockPointerEvents() {
  var iframes = document.getElementsByTagName('iframe');
  for (var i=0; i<iframes.length; i++) {
    iframes[i].classList.remove('no-pointer-events')
  }
}

/* SOUND MANAGEMENT */
function playSound(key) {
  let broken = new Audio('audio/broken.wav');
  switch(key) {
    case "broken":
      broken.play();
      break;
    default:
      console.log("[Error] Provided key " + key + " have no sound associated.");
      break;
  }
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
  var windowsToQuit = document.getElementsByClassName(className);
  while (windowsToQuit.length > 0) {
    windowsToQuit[0].remove();
  }
}

function getMonthAndDayDate() {
  let date = new Date();
  let day = date.getDate();
  let month = parseInt(date.getMonth()) + 1;
  day = day<10 ? "0"+day : day;
  month = month<10 ? "0"+month : month;
  return day + "/" + month;
}

function getRandomEmoticon() {
  const emoticons = ["／人 ◕ ‿‿ ◕ 人＼", "(づ｡◕‿‿◕｡)づ", "(｡◕‿‿◕｡)", "ᄽὁȍ ̪ őὀᄿ", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "٩(⁎❛ᴗ❛⁎)۶", "(^̮^)", "ʕ•ᴥ•ʔ"];
  return emoticons[getRndInteger(0, emoticons.length)];
}

function getAllVisibleCommands() {
  return ["help", "about", "changelog", "credits", "clear", "date", "emoticon", "tenacity", "touhou"];
}

function getAllVisibleCommandsWithArgs() {
  return [["yt", "video_id"]];
}

function getAllVisibleCommandsNameWithArgs() {
  return ["yt"];
}
