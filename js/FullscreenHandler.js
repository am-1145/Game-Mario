// Fullscreen functionality for Mario Maker

function setupFullscreenButton() {
  // Create fullscreen button
  var fullscreenBtn = document.createElement('button');
  fullscreenBtn.innerHTML = 'Fullscreen';
  fullscreenBtn.style.position = 'absolute';
  fullscreenBtn.style.top = '10px';
  fullscreenBtn.style.right = '10px';
  fullscreenBtn.style.zIndex = '1000';
  fullscreenBtn.style.padding = '5px 10px';
  fullscreenBtn.style.background = '#15a7d9';
  fullscreenBtn.style.color = 'white';
  fullscreenBtn.style.border = '2px solid black';
  fullscreenBtn.style.fontFamily = 'SuperMario256';
  fullscreenBtn.style.cursor = 'pointer';
  
  // Add to document
  document.body.appendChild(fullscreenBtn);
  
  // Toggle fullscreen on click
  fullscreenBtn.addEventListener('click', function() {
    toggleFullscreen();
  });
  
  // Listen for ESC key to exit fullscreen
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.fullscreenElement) {
      exitFullscreen();
    }
  });
}

function toggleFullscreen() {
  var gameScreen = document.getElementsByClassName('game-screen')[0];
  var mainWrapper = document.getElementsByClassName('main-wrapper')[0];
  
  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (mainWrapper.requestFullscreen) {
      mainWrapper.requestFullscreen();
    } else if (mainWrapper.webkitRequestFullscreen) {
      mainWrapper.webkitRequestFullscreen();
    } else if (mainWrapper.msRequestFullscreen) {
      mainWrapper.msRequestFullscreen();
    }
    
    gameScreen.classList.add('fullscreen');
    mainWrapper.style.width = '100%';
    mainWrapper.style.height = '100vh';
    
    // Adjust game UI if needed
    var gameUI = GameUI.getInstance();
    gameUI.setWidth(window.innerWidth);
    gameUI.setHeight(window.innerHeight);
  } else {
    exitFullscreen();
  }
}

function exitFullscreen() {
  var gameScreen = document.getElementsByClassName('game-screen')[0];
  var mainWrapper = document.getElementsByClassName('main-wrapper')[0];
  
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  
  gameScreen.classList.remove('fullscreen');
  mainWrapper.style.width = '';
  mainWrapper.style.height = '';
  
  // Reset game UI to original size
  var gameUI = GameUI.getInstance();
  gameUI.setWidth(1280);
  gameUI.setHeight(480);
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupFullscreenButton();
});