window.onload=function() {
let body = document.getElementsByTagName('body')[0];
let download = document.getElementById('download');
let phipyImg = document.getElementById('phipy_img');
let takemeback = document.getElementById('takemeback');
let takemebackValue = takemeback.text;
playSound('dbz_tp');

/* DOWNLOAD */
download.addEventListener("mouseover", function(event) {
  let downloadFontSize = getDownloadFontSize();
  download.style.fontSize = parseInt(downloadFontSize)*1.8 + "px";
  takemeback.style.fontSize = "10px";
  phipyImg.setAttribute("src", "../img/phipy_eyebrow.gif");
  download.text = changeNChar(download.text);
  takemeback.text = takemebackValue.replaceAll("a", "4");
  takemeback.text = changeNChar(takemeback.text);
  body.classList.add('movingBackgroundFaster');
  body.classList.remove('movingBackground');
}, false);

download.addEventListener("mouseout", function(event) {
  let downloadFontSize = getDownloadFontSize();
  download.style.fontSize =  parseInt(downloadFontSize)/1.8 + "px";
  takemeback.style.fontSize = "16px";
  phipyImg.setAttribute("src", "../img/phipy.gif");
  download.text = changeNChar(download.text);
  takemeback.text = takemebackValue;
  body.classList.add('movingBackground');
  body.classList.remove('movingBackgroundFaster');
}, false);

download.addEventListener("mouseup", function(event) {
  playSound("dbz_tp");
  let scammed = document.getElementById('scammed');
  let thanks = document.getElementById('thanks');
  phipyImg.hidden = true;
  scammed.hidden = false;
  download.hidden = true;
  thanks.hidden = false;
  stopSound("theme");
  document.getElementById('speaker').hidden = true;
}, false);

/* SPEAKER */
let speakerState = 0;
let speaker = document.getElementById('speaker');
speaker.addEventListener("mouseover", function () {
  if (speakerState === 0) {
    speaker.firstChild.src = "../img/speaker_sound.png";
  }
  else if (speakerState === 1) {
    speaker.firstChild.src = "../img/speaker_blocked.png";
  }
  else if (speakerState === 2) {
    speaker.firstChild.src = "../img/speaker_sound.png";
  }
}, false);

speaker.addEventListener("mouseout", function () {
  if (speakerState === 0) {
    speaker.firstChild.src = "../img/speaker.png";
  }
  else if (speakerState === 1) {
    speaker.firstChild.src = "../img/speaker_sound.png";
  }
  else if (speakerState === 2) {
    speaker.firstChild.src = "../img/speaker.png";
  }
}, false);

speaker.addEventListener("mouseup", function() {
  if (speakerState === 0 || speakerState === 2) {
    speakerState = 1;
    playSound("theme");
  }
  else if (speakerState === 1) {
    speakerState = 2;
    stopSound("theme");
  }
}, false);

/* UTILS */
function getDownloadFontSize() {
  let downloadStyle = window.getComputedStyle(download);
  return downloadStyle.getPropertyValue('font-size');
}

function changeNChar(s) {
  let i = getRandom(0, s.length-1);
  console.log(i);
  let k;
  for (let j=0; j<i; j++) {
    k = getRandom(0, s.length-1);
    s = setCharAt(s, k, swapCharacter(s[k]));
  }
  return s;
}

function setCharAt(s, i, c) { // https://stackoverflow.com/a/1431110
    if(i > s.length-1) return s;
    return s.substring(0,i) + c + s.substring(i+1);
}

function getRandom(lower, upper) {
  return Math.floor(Math.random()* (upper - lower + 1) + lower);
}

function swapCharacter(c) {
  return c == c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
}

/* SOUND MANAGEMENT */
let theme = new Audio('../audio/mixkit-underwater-transmitter-hum-2135.wav');
let dbz_tp = new Audio('../audio/DBZ_Teleportation.wav');
function playSound(key) {
  switch(key) {
    case "theme":
      theme.volume = 0.2;
      theme.loop = true;
      theme.play();
      break;
    case "dbz_tp":
      dbz_tp.play();
      break;
    default:
      console.log("[Error] Provided key " + key + " have no sound associated.");
      break;
  }
}

function stopSound(key) {
  switch(key) {
    case "theme":
      theme.pause();
      theme.currentTime = 0;
      break;
    default:
      console.log("[Error] Provided key " + key + " have no sound associated or can't be closed.");
      break;
    }
  }

  /* KEYBOARD EVENT */
  document.addEventListener('keyup', function(event) {
    if (document.activeElement === null || document.activeElement != HTMLBodyElement) {
      let key = event.key;
      switch(key.toLowerCase()) {
        case "m":
        if (speakerState === 0 || speakerState === 2) {
          speakerState = 1;
          speaker.firstChild.src = "../img/speaker_sound.png";
          playSound("theme");
        }
        else if (speakerState === 1) {
          speakerState = 2;
          speaker.firstChild.src = "../img/speaker.png";
          stopSound("theme");
        }
      }
    }
  });

}
