function createTerminal() {
  let title = "Terminal";

  a = getWindowDimension();
  b = getRandomPosition(a[0], a[1]);

  let windowHTML = `<div class="window" style="top:${b[0]}; left:${b[1]};"> <div class="window-menubar"><span class="window-title">${title}</span><div class="window-btn-quit" onclick="removeWindow(this);">X</div></div><div class="window-content"><div class="terminal"><div class="terminal-text">ÉtinérésOS v1.2<br>Type or click on <span class="command" onclick="terminalAutoFillInput(this);">help</span> to see a list of commands.<br>You can use <span class="command" onclick="terminalAutoFillInput(this);">about</span>, <span class="command" onclick="terminalAutoFillInput(this);">changelog</span> or <span class="command" onclick="terminalAutoFillInput(this);">credits</span> for more informations about this website.<br></div><div class="terminal-input-line"><span class="input-text">C:/EtineresOS/Desktop></span><input type="text" spellcheck="false" class="terminal-input"></div></div></div></div>`;
  document.body.insertAdjacentHTML('beforeend', windowHTML);

  var newTerminalInput = document.body.lastElementChild.getElementsByClassName('terminal-input')[0];
  newTerminalInput.addEventListener('keydown', function(e){if(e.key==="Enter"){handleCommand(this.parentNode.parentNode);}});
  newTerminalInput.focus();
}

function terminalAutoFillInput(winCommand) {
  command = winCommand.innerHTML;
  winContentTerminal = winCommand.parentNode.parentNode;
  inputTerminal = winContentTerminal.getElementsByClassName('terminal-input')[0];
  inputTerminal.value = command;
  inputTerminal.focus();

  // If the command don't require args
  if (!getAllVisibleCommandsNameWithArgs().includes(inputTerminal.value)) {
    terminalSubmitInput(winCommand.parentNode.parentNode); // Passing the "terminal" class of the terminal
  }
}

function terminalSubmitInput(winContentTerminal) {
  handleCommand(winContentTerminal);
}

function handleCommand(winContentTerminal) {
  //console.log(winContentTerminal);
  wtt = winContentTerminal.getElementsByClassName('terminal-text')[0]; // wtt stand for winTerminalText
  inputLine = winContentTerminal.getElementsByClassName('terminal-input-line')[0];
  beforeInput = inputLine.getElementsByClassName('input-text')[0].innerHTML;
  userInput = inputLine.getElementsByClassName('terminal-input')[0].value;
  fullInput = beforeInput + userInput;

  spUserInput = userInput.split(' ');
  terminalAddText(wtt, beforeInput + userInput);
  switch (spUserInput[0]) {
    case 'help':
      terminalAddText(wtt, terminalBuildHelpCommand());
      break;
    case 'about':
      terminalAddText(wtt, requestString("about"));
      break;
    case 'changelog':
      terminalAddText(wtt, requestString("changelog"));
      break;
    case 'credits':
      terminalAddText(wtt, requestString("credits"));
      break;
    case 'clear':
      winContentTerminal.getElementsByClassName('terminal-text')[0].innerHTML = "";
      break;
    case 'date':
      terminalAddText(wtt, getMonthAndDayDate());
      break;
    case 'emoticon':
      terminalAddText(wtt, getRandomEmoticon());
      break;
    case 'secret':
      terminalAddText(wtt, requestString("jebaited"));
      break;
    case 'twitch':
      terminalAddText(wtt, requestString("twitch"));
      break;
    case 'tenacity':
      terminalAddText(wtt, requestString("tenacity"));
      break;
    case 'touhou':
      createWindow("touhou-kirisame_marisa", "KIRISAME MARISA", "3m4GJzk8TW8");
      createWindow("touhou-paranoia", "Paranoia 2019", "wnli28pjsn4");
      break;
    case 'yt':
      terminalRequiredArgs(spUserInput, 1) ? createWindow("yt", "Youtube Video", spUserInput[1]) : terminalAddText(wtt, requestString("missingArgs"));
      break;
    default:
      terminalAddText(wtt, `'${userInput}': Unknown command`);
      break;
  }
  winContentTerminal.scrollTo(0,winContentTerminal.scrollHeight); // Scrolling to the bottom of the terminal
  inputLine.getElementsByClassName('terminal-input')[0].value = "";
}

function terminalBuildHelpCommand() {
  const commands = getAllVisibleCommands();
  let helpHtml = "";
  for (var i=0; i<commands.length; i++) {
    helpHtml += terminalShowAsCommandHTML(commands[i]) + "<br>";
  }
  const commandsWithArgs = getAllVisibleCommandsWithArgs();
  for (var i=0; i<commandsWithArgs.length; i++) {
    helpHtml += terminalShowAsCommandHTML(commandsWithArgs[i][0]);
    for (var j=1; j<commandsWithArgs[i].length; j++) {
      helpHtml += " [" + commandsWithArgs[i][j] + "]";
    }
    helpHtml += "<br>";
  }
  return helpHtml;
}

function terminalShowAsCommandHTML(command) {
  return '<span class="command" onclick="terminalAutoFillInput(this);">' + command + '</span>';
}

function terminalAddText(wtt, txtToAdd) {
  wtt.innerHTML += txtToAdd + "<br>";
}

function terminalRequiredArgs(spInput, argsNumber) {
  return spInput.length - 1 === argsNumber;
}

function requestString(strName) {
  switch(strName) {
    case "about":
      return "Welcome to my personal website!<br>The goal of this website is to display my projects and the things I like.<br>I will try to update it regularly.<br>- Yhord";
    case "changelog":
      let separator = "<br>" + "*".repeat(43) + "<br>";
      let v1_0 = separator + "v1.0 - Release - 5th January 2022" + separator;
      let v1_1 = "v1.1 - First update - 9th February 2022<br>New side menu item ⛵<br>Working terminal<br>- Available commands: help, about, changelog, credits, clear, date, emoticon, tenacity, touhou, yt<br>- <span class=\"terminal-text-hidden\">Secret</span> commands<br>New item giving access to my TryHackMe page<br>New button on windows title bar to open the source of the displayed content<br>Title and subtitle aren't visible anymore on small screens<br>Windows can now be moved (desktop and mobile)<br>" + separator;
      let v1_2 = "v1.2 - Spring update 🌸 - 18th March 2022<br>Spring Theme<br>New item: Phipy Buddy<br>Keyboard shortcuts<br>- Press M to use the speakers (main page and Phipy page)<br>- On main page: t (Terminal), o (Toggle Modding Items), l (Toggle External Links)<br>" + separator;
      return v1_0 + v1_1 + v1_2;
    case "credits":
      return 'Phipy.html:<br>- Spamton from <a href="https://deltarune.com">DELTARUNE</a> (Toby Fox)<br>- <a href="https://en.wikipedia.org/wiki/Dragon_Ball">Dragon Ball</a> Teleportation Sound Effect';
    case "jebaited":
      return '<a target="_blank" href="https://www.youtube.com/watch?v=d1YBv2mWll0">secret</a>';
    case "twitch":
      return '<a target="_blank" href="https://www.twitch.tv/yhord/">twitch.tv/yhord</a>';
    case "tenacity":
      return "⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿<br>⣿⣿⣿⣿⣿⣿⣿⠇⠈⠁⠄⠄⠄⠄⠄⠉⠙⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿<br>⣿⣿⣿⣿⣿⡟⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿<br>⣿⣿⣿⣿⡏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿<br>⣿⣿⣿⣿⠇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⢆⠠⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿<br>⣿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠄⠄⣀⣠⣴⣶⣾⣿⣿⠄⠄⢸⣿⠿⠿⠿⠿⠿⠿⠿<br>⣿⣿⣿⣿⠄⠄⠄⠄⠺⠟⠻⠿⢿⣿⣿⡯⣐⣾⣿⢸⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠘⡀⢷⣯⣯⣬⣿⣿⣿⣿⣿⣿⣿⠘⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠅⠘⣿⣿⣿⣿⠟⣻⣿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄<br>⠄⠄⠄⠄⠄⠄⠄⠄⠄⢻⣿⣿⣿⣶⣿⣿⣿⣿⢇⠄⡀⠄⠄⠄⠠⢤⣄⣄⠄⠄<br>⠄⠄⠄⠄⣀⣠⠂⠄⠄⠄⠻⣿⣿⣉⡭⣭⣷⡏⢸⢟⠻⣁⣤⣴⣿⣿⣿⣿⠷⡄<br>⣦⠆⢀⣼⣟⡋⠄⠄⡀⡀⢳⣮⣛⠿⠿⠿⡋⠄⠄⠄⣎⣿⣿⣿⣿⣿⣿⣿⡀⠹<br>⡀⠄⣼⣿⣻⣿⣧⡈⢱⡃⡈⠻⣿⣿⣿⡿⠁⠄⠄⠄⠄⢿⣿⣿⣿⣿⣿⣿⣿⣷<br>⣧⡼⡿⢿⣷⢍⢛⣟⠄⣿⠑⡀⣿⣿⣿⠁⠂⠄⠄⠄⠄⢈⢻⣿⣿⣿⣿⣿⣿⣿<br>⣿⡆⢻⣿⣯⠄⡀⠹⣸⢿⡲⡌⠙⠛⠁⠄⠄⠄⠄⠄⠄⠈⠈⢹⣿⣿⣿⣿⣿⢟";
    case "niy":
      return "Not implemented yet";
    case "missingArgs":
      return "Missing arguments. Type \"help\" for more details";
  }
  return "[Error] The string " + strName + " is not defined.";
}
