var GameLayer = cc.LayerColor.extend({
	init: function() {
        this.createBackground();
        this.createPlayer();
        this.createBot();
        this.createAddChild();
		this.addKeyboardHandlers();
		this.state = GameLayer.STATES.FRONT;
		this.player.scheduleUpdate();
        this.clockwerk.scheduleUpdate();
        this.arrBullet = [];
	},

    createBackground: function() {
        this.background = cc.Sprite.create( "res/images/background2.gif" );
        this.background.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2) );
    },

    createPlayer: function() {
        this.player = new Player(this);
        this.player.setPosition( new cc.Point( 700, screenHeight / 8) );
    },

    createBot: function() {
        this.clockwerk = new Clockwerk();
        this.clockwerk.setPosition( new cc.Point( 100, screenHeight / 8) );
    },

    createAddChild: function() {
        this.addChild( this.background );
        this.addChild( this.player );
        this.addChild( this.clockwerk );
    },

    intersec: function() {
        var posPlayer  = this.player.getPosition();
        var posBot = this.clockwerk.getPosition();
        for(var i = 0 ; i<arrBullet.length ; i++ ){
            var posBullet = arrBullet[i].getPosition;
            if((Math.abs(posBullet.x-posBot.x)< arrBullet[i].STATUS.WIDTH/2+this.clockwerk.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posBot.y)< arrBullet[i].STATUS.HEIGHT/2+this.clockwerk.STATUS.HEIGHT/2))
               console.log('HIT');
                this.clockwerk.removeFromParent();        
         }   
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
            this.player.checkPlayers();

    },

    onKeyUp: function( keyCode, event ) {
        if(keyCode == GameLayer.ARROWDIR.SPACEBAR){
                    console.log("Spacebar: " + keyCode.toString() );
                    this.arrBullet.push(this.player.fire());
        }
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
    RIGHT : 39,
    SPACEBAR : 32
};