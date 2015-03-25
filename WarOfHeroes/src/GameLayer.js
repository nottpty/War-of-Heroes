var GameLayer = cc.LayerColor.extend({
	init: function() {
		this.background = cc.Sprite.create( "res/images/background2.gif" );
		this.background.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2) );
		this.player = new Player();
		this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 8) );
		this.addChild( this.background );
		this.addChild( this.player );
		this.addKeyboardHandlers();
		this.state = GameLayer.STATES.FRONT;
		this.player.scheduleUpdate();
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
        this.player.switchDirection  (keyCode);
    },

    onKeyUp: function( keyCode, event ) {
    console.log( 'Up: ' + keyCode.toString() );
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    },
});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2
};

GameLayer.ARROWDIR = {
    LEFT : 37,
    RIGHT : 39
};