var GameLayer = cc.LayerColor.extend({
	init: function() {
        this.createBackground();
        this.createPlayer();
        this.createAddChild();
		this.addKeyboardHandlers();
		this.state = GameLayer.STATES.FRONT;
		this.player.scheduleUpdate();
	},

    createBackground: function() {
        this.background = cc.Sprite.create( "res/images/background2.gif" );
        this.background.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2) );
    },

    createPlayer: function() {
        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 8) );
    },

    createAddChild: function() {
        this.addChild( this.background );
        this.addChild( this.player );
    },

	addKeyboardHandlers: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                self.onKeyDown(keyCode, event);
            },
             onKeyReleased: function(keyCode, event) {
                self.onKeyUp(keyCode, event);
            }
        }, this);
    },

    onKeyDown: function( keyCode, event ) {
        console.log('PRESS :' + keyCode.toString());
        if(keyCode == GameLayer.ARROWDIR.LEFT || keyCode == GameLayer.ARROWDIR.RIGHT ){
            if(keyCode == GameLayer.ARROWDIR.LEFT){
                this.player.initWithFile( 'res/images/sniper2.png' );
            }
            else if(keyCode == GameLayer.ARROWDIR.RIGHT){
                this.player.initWithFile( 'res/images/sniper3.png' );
            }
            this.player.switchDirection(keyCode);
            this.player.checkPlayers();
        }
    },

    onKeyUp: function( keyCode, event ) {
        console.log( 'Up: ' + keyCode.toString() );
        this.player.stopPlayer();
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2
};

GameLayer.ARROWDIR = {
    LEFT : 37,
    RIGHT : 39
};