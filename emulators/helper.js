var gameBody;
const hiddenMenu = document.getElementById('hiddenMenu');
const hiddenMenuBody = document.getElementById('hiddenMenuBody');
const button_load_game = document.getElementById('button_load_game');
const game_background = document.getElementById('game_background');
const button_refresh = document.getElementById('button_refresh');
const button_fullscreen = document.getElementById('button_fullscreen');
const button_close = document.getElementById('button_close');
const loader = document.getElementById('loader');
var button_emulate = document.querySelectorAll('.button_emulate');
var hiddenMenuBoolean = false;
var game = document.getElementById('waflashContainer');
var canvas = document.getElementById('canvas');
var ruffle = document.getElementById('game');
var ruffleObj = document.getElementById('game');
var actiswf_0 = document.getElementById('actiswf_0');
// var stage0 = document.getElementById('stage0');
var stage0 = document.querySelector('canvas');
var game_type;
var is_mobile = false;
var game_status = true; // false = pause, true = run
var game_fullscreen = false;
var game_volume = true;

// getCurrentEmulator();

if(canvas){
  gameBody = canvas;
//   console.log(hiddenMenuBody.style.position);
//   hiddenMenuBody.style.position = "unset";
//   console.log(hiddenMenuBody.style.position);
//   game.style.position = "unset";
  console.log("Type W");
//   console.log(gameBody);
}else if(ruffle){
  gameBody = ruffle;
  console.log("Type R");
//   console.log(gameBody);
}else if(ruffleObj){
  gameBody = ruffleObj;
  console.log("Type RObj");
//   console.log(gameBody);
}else if(actiswf_0){
  gameBody = actiswf_0;
  console.log("Type AV");
//   console.log(gameBody);
}else{
  gameBody = stage0;
  console.log("Type AW");
//   console.log(gameBody);
}


// target elements with the "draggable" class
interact('.draggable')
.draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  // enable autoScroll
  autoScroll: true,

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end (event) {
      var textEl = event.target.querySelector('p')

      textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
        Math.pow(event.pageY - event.y0, 2) | 0))
        .toFixed(2) + 'px')
      }
    }
  })

  function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  // this function is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener

  function showHiddenMenu(){
    if(hiddenMenuBoolean){
      hiddenMenu.style="display:none";
      hiddenMenuBody.style="display:none";
      hiddenMenuBoolean = false;
      gameBody.style.webkitFilter = "blur(0px)";

    }else{
      hiddenMenu.style="display:flex";
      hiddenMenuBody.style="display:flex";
      hiddenMenuBoolean = true;
      gameBody.style.webkitFilter = "blur(15px)";
    }
  }



if(document.getElementById('canvas') && !hiddenMenuBoolean){
  document.getElementById('canvas').addEventListener("click", function() {
    hiddenMenu.style="display:none";
    hiddenMenuBoolean = false;
    canvas.style.webkitFilter = "blur(0px)";
  });
}


  document.getElementById('button_fullscreen').addEventListener("click", function() {
    if(document.fullscreenEnabled){
      if (game_fullscreen) {
          document.exitFullscreen();
          game_fullscreen = false;
      } else {
          gameBody.requestFullscreen();
          game_fullscreen = true;
          showHiddenMenu();
      }
    }else{
      alert("Fullscreen denied. If you are the webmaster, please add 'allowfullscreen' in the iframe tag.");
    }
  });

document.getElementById('button_refresh').addEventListener("click", function() {
  if(game_status === true)
    location.reload();

});

document.getElementById('button_close').addEventListener("click", function() {
  if(game_status === true)
    showHiddenMenu();

});

document.getElementById('button_copy_link').addEventListener("click", function() {
  let queryString = window.location.href;
//   navigator.clipboard.writeText(queryString)
//   .then(() => {
//             console.log('Text copied to clipboard!');
//         })
//         .catch(err => {
//             console.error('Error in copying text: ', err);
//             // Provide an alternative way for the user to copy the text
//             alert('Copy failed. Please copy the text manually.');
//         });
// Create a temporary text element
    var tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = queryString; // or any text you want to copy

    document.body.appendChild(tempInput);
    tempInput.select();

    try {
        // Copy the text inside the text field
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy command was ' + msg);
    } catch (err) {
        console.error('Error in copying text: ', err);
    }

    // Remove the temporary input field
    document.body.removeChild(tempInput);
});

button_emulate.forEach(function(button) {
    button.addEventListener('click', function() {
    var dataType = this.getAttribute('data-type');
    var newLink = '';
    let queryString = window.location.search;
    let queryStringWithoutQuestionMark = queryString.substring(1);
    
    switch(dataType){
        case 'ruffle': 
            console.log("Changing emulator in Ruffle...");
            window.location.href = "https://www.archive.play-games.com/games/ruffle/?"+queryStringWithoutQuestionMark;
            break;
        case 'ruffleObj': 
            console.log("Changing emulator in Ruffle Object...");
            window.location.href = "https://www.archive.play-games.com/games/ruffleObject/?"+queryStringWithoutQuestionMark;
            break;
        case 'waflash':
            console.log("Changing emulator in WaFlash...");
            window.location.href = "https://www.archive.play-games.com/games/waflash/?"+queryStringWithoutQuestionMark;
            break;
        case 'awayfl':
            console.log("Changing emulator in AwayFL...");
            window.location.href = "https://www.archive.play-games.com/games/awayfl/v2/?"+queryStringWithoutQuestionMark;
            break;
        case 'avm2':
            console.log("Changing emulator in AVM2...");
            window.location.href = "https://www.archive.play-games.com/emulators/avm2/?"+queryStringWithoutQuestionMark;
            break;
        default:
            console.log("Opsi!");
    }
    });
});