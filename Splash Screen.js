//=============================================================================
// Splash Screen.js
//=============================================================================

/*:
 * @plugindesc This plugin allows thee to show splash screens as you want before thy Title Screen.
 * @author Soulpour777
 *
 * @help The splash_items variable holds the array of graphic names located on your Systems folder. The many splash screens you put, the
 * same time the js plugin will play it untill its all finished, and goes to your title screen. Provide youur graphics on the img / system
 * folder.
 */

var splash_items = ["Splash1", "Splash2"]; // you can edit this and edit the graphic name with the same name as you placed here.
var splash_counter = 0; // do not touch this part.

//-----------------------------------------------------------------------------
// Scene_Splash
//
// The scene class of the splash screen.

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Splash);
        Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
};


function Scene_Splash() {
    this.initialize.apply(this, arguments);
}

Scene_Splash.prototype = Object.create(Scene_Base.prototype);
Scene_Splash.prototype.constructor = Scene_Splash;

Scene_Splash.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Splash.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.playGameoverMusic();
    this.createBackground();   
};

Scene_Splash.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(this.slowFadeSpeed(), false);
};

Scene_Splash.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        if (splash_counter != splash_items.length) {
            this.playGameoverMusic();
            this.createBackground(); 
        } else {
            this.gotoTitle();   
        }
        
    }
    Scene_Base.prototype.update.call(this);
};

Scene_Splash.prototype.stop = function() {
    Scene_Base.prototype.stop.call(this);
    this.fadeOutAll();
};

Scene_Splash.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    AudioManager.stopAll();
};

Scene_Splash.prototype.playGameoverMusic = function() {
    AudioManager.stopBgm();
    AudioManager.stopBgs();
    AudioManager.playMe($dataSystem.gameoverMe);
};

Scene_Splash.prototype.createBackground = function() {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadSystem(splash_items[splash_counter]);
    this.addChild(this._backSprite);    
    splash_counter += 1;
};

Scene_Splash.prototype.isTriggered = function() {
    return Input.isTriggered('ok') || TouchInput.isTriggered();
};

Scene_Splash.prototype.gotoTitle = function() {
    SceneManager.goto(Scene_Title);
};
