// Dynamic Start Screen for Mario Maker
// Creates a beautiful title screen programmatically

var DynamicStartScreen = (function () {
  var instance;

  function DynamicStartScreen() {
    var view = View.getInstance();
    var mainWrapper;
    var startScreen;
    var editorButton;
    var startGameButton;
    var createdLevelsButton;
    var marioTitle;

    var that = this;

    this.init = function () {
      mainWrapper = view.getMainWrapper();

      // Create dynamic start screen
      startScreen = view.create('div');
      view.addClass(startScreen, 'dynamic-start-screen');

      // Create title container
      var titleContainer = view.create('div');
      view.addClass(titleContainer, 'title-container');

      // Create Mario title
      marioTitle = view.create('div');
      view.addClass(marioTitle, 'mario-title');
      view.setHTML(marioTitle, 'MARIO ');

      // Create buttons
      startGameButton = view.create('button');
      view.addClass(startGameButton, 'dynamic-start-btn');
      view.setHTML(startGameButton, 'START GAME');

      editorButton = view.create('button');
      view.addClass(editorButton, 'dynamic-editor-btn');
      view.setHTML(editorButton, 'LEVEL EDITOR');

      createdLevelsButton = view.create('button');
      view.addClass(createdLevelsButton, 'dynamic-created-btn');
      view.setHTML(createdLevelsButton, 'SAVED LEVELS');

      // Create decorative elements
      var cloudLeft = view.create('div');
      view.addClass(cloudLeft, 'cloud-left');

      var cloudRight = view.create('div');
      view.addClass(cloudRight, 'cloud-right');

      var ground = view.create('div');
      view.addClass(ground, 'ground');

      // Append elements
      view.append(titleContainer, marioTitle);
      view.append(startScreen, cloudLeft);
      view.append(startScreen, cloudRight);
      view.append(startScreen, titleContainer);
      view.append(startScreen, startGameButton);
      view.append(startScreen, editorButton);
      view.append(startScreen, createdLevelsButton);
      view.append(startScreen, ground);
      view.append(mainWrapper, startScreen);

      // Add event listeners
      this.setupEventListeners();

      // Hide original start screen if it exists
      var originalScreen = document.querySelector('.start-screen');
      if (originalScreen) {
        originalScreen.style.display = 'none';
      }

      // Add animation
      setTimeout(function () {
        marioTitle.classList.add('animate');
      }, 100);
    };

    this.setupEventListeners = function () {
      // Get MarioMaker instance
      var marioMaker = MarioMaker.getInstance();

      startGameButton.onclick = function () {
        var map = marioMaker.loadMainGameMap();
        marioMaker.startGame(map);
      };

      editorButton.onclick = marioMaker.startEditor;

      createdLevelsButton.onclick = marioMaker.startCreatedLevels;
    };

    this.hide = function () {
      startScreen.style.display = 'none';
    };

    this.show = function () {
      startScreen.style.display = 'block';
    };
  }

  return {
    getInstance: function () {
      if (instance == null) {
        instance = new DynamicStartScreen();
      }
      return instance;
    }
  };
})();