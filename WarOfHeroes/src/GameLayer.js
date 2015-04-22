var GameLayer = cc.LayerColor.extend({
	init: function() {
        this.arrBullet = [];
        this.checkGame = 0;
        this.started = 
        this.createBackground();
        this.createPlayer();
        this.createBot();
        this.createAddChild();
		this.addKeyboardHandlers();
		this.state = GameLayer.STATES.FRONT;
        this.scheduleUpdate();
		this.player.scheduleUpdate();
        this.clockwerk.scheduleUpdate();
       
	},

    update: function(){
        this.intersect();
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
        this.clockwerk = new Clockwerk(this);
        this.clockwerk.setPosition( new cc.Point( 100, screenHeight / 8) );
    },

    botDead: function() {
        this.clockwerk.setPosition(-5000,-10000);
        this.removeChild(this.clockwerk);
        this.player.score += 1; 
        console.log('Score : '+this.player.score);
    },

    playerDead: function() {
        this.player.setPosition(100000,100000);
        this.removeChild(this.player);
        console.log('Player died');
        this.checkGame = 1;
    },

    createAddChild: function() {
        this.addChild( this.background );
        this.addChild( this.player );
        this.addChild( this.clockwerk );
    },

    intersect: function() {
        var posPlayer  = this.player.getPosition();
        var posBot = this.clockwerk.getPosition();
        for(var i = 0 ; i<this.arrBullet.length ; i++ ){
            var posBullet = this.arrBullet[i].getPosition();
            if((Math.abs(posBullet.x-posBot.x)< Clockwerk.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posBot.y)< Clockwerk.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                if(this.clockwerk.hp <= 1){ 
                    this.botDead();   
                }
                this.arrBullet[i].removeFromParent();
                this.arrBullet.pop();
                this.clockwerk.hp -= 1;
                console.log('hp bot : '+this.clockwerk.hp);
            }
         }
         if((Math.abs(posPlayer.x-posBot.x)< Clockwerk.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posBot.y)< Clockwerk.STATUS.HEIGHT/2)){
            console.log('INTERSECT PLAYER ');
                this.playerDead();   
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