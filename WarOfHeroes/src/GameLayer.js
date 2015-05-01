var GameLayer = cc.LayerColor.extend({
	init: function() {
        this.arrBullet = [];
        this.checkGame = 0;
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
        this.clockwerk = new Clockwerk(this,5);
        this.huskar = new Huskar(this,10);
        this.roshan = new Roshan(this,20);
        this.clockwerk.setPosition( new cc.Point( 100, screenHeight / 8) );
    },

    botDead: function() {
        if(this.clockwerk.hp == 0){
            this.clockwerk.setPosition(-5000,-10000);
            this.removeChild(this.clockwerk);
            this.player.score += 1; 
            this.player.money += 2;
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+this.player.score);
            this.moneyLabel.setString('Your money : '+this.player.money);
        }

        if(this.huskar.hp == 0){
            this.huskar.setPosition(-5000,-10000);
            this.removeChild(this.huskar);
            this.player.score += 2; 
            this.player.money +=6;
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+this.player.score);
            this.moneyLabel.setString('Your money : '+this.player.money);
        }

        if(this.roshan.hp == 0){
            this.roshan.setPosition(-5000,-10000);
            this.removeChild(this.roshan);
            this.player.score += 6; 
            this.player.money +=15
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+this.player.score);
            this.moneyLabel.setString('Your money : '+this.player.money);
            this.stageLabel.setString('Stage : '+this.player.stage);
        }
    },

    playerDead: function() {
        this.player.setPosition(100000,100000);
        this.removeChild(this.player);
        console.log('Player died');
        this.checkGame = 1;
    },

    createAddChild: function() {
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 30 );
        this.scoreLabel.setPosition( new cc.Point( screenWidth/3.5, screenHeight/1.1 ) );
        this.scoreLabel.setString('Your score : '+this.player.score);
        this.moneyLabel = cc.LabelTTF.create( '0', 'Arial', 30 );
        this.moneyLabel.setPosition( new cc.Point( screenWidth/1.5, screenHeight/1.1));
        this.moneyLabel.setString('Your money : '+this.player.money);
        this.stageLabel = cc.LabelTTF.create( '0', 'Arial', 30 );
        this.stageLabel.setPosition( new cc.Point( screenWidth/2, screenHeight/1.3 ) );
        this.stageLabel.setString('Stage : '+this.player.stage);
        this.addChild( this.background );
        this.addChild( this.scoreLabel );
        this.addChild( this.moneyLabel );
        this.addChild( this.stageLabel );
        this.addChild( this.player );
        this.addChild( this.clockwerk );
    },

    intersect: function() {
        var posPlayer  = this.player.getPosition();
        var posClockwerk = this.clockwerk.getPosition();
        var posHuskar = this.huskar.getPosition();
        var posRoshan = this.roshan.getPosition();
        for(var i = 0 ; i<this.arrBullet.length ; i++ ){
            var posBullet = this.arrBullet[i].getPosition();
            if((Math.abs(posBullet.x-posClockwerk.x)< Clockwerk.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posClockwerk.y)< Clockwerk.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.clockwerk.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.clockwerk.hp == 2){
                    this.huskar.setPosition( new cc.Point( 100, screenHeight/3) );
                    this.addChild( this.huskar );
                    this.huskar.scheduleUpdate();
                }
                if(this.clockwerk.hp <= 0){ 
                    this.botDead();   
                }
                console.log('hp bot : '+this.clockwerk.hp);
            }

            if((Math.abs(posBullet.x-posHuskar.x)< Huskar.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posHuskar.y)< Huskar.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.huskar.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.huskar.hp == 2){
                    this.roshan.setPosition( new cc.Point( 100, 265) );
                    this.addChild( this.roshan );
                    this.roshan.scheduleUpdate();
                }
                if(this.huskar.hp <= 0){ 
                    this.botDead();   
                }
                console.log('hp bot : '+this.huskar.hp);
            }

            if((Math.abs(posBullet.x-posRoshan.x)< Roshan.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posRoshan.y)< Roshan.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.roshan.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.roshan.hp <= 0){ 
                    this.botDead();  
                    this.player.stage += 1; 
                }
                // if(this.huskar.hp == 2){
                //     this.roshan.setPosition( new cc.Point( 100, 265) );
                //     this.addChild( this.roshan );
                //     this.roshan.scheduleUpdate();
                // }
                console.log('hp bot : '+this.roshan.hp);
            }

         }
        if((Math.abs(posPlayer.x-posClockwerk.x)< Clockwerk.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posClockwerk.y)< Clockwerk.STATUS.HEIGHT/2))
            this.showDead();
        if((Math.abs(posPlayer.x-posHuskar.x)< Huskar.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posHuskar.y)< Huskar.STATUS.HEIGHT/2))
            this.showDead();
        if((Math.abs(posPlayer.x-posRoshan.x)< Roshan.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posRoshan.y)< Roshan.STATUS.HEIGHT/2))
            this.showDead();
    },

    showDead: function(){
        console.log('INTERSECT PLAYER ');
                this.playerDead();
                this.deadLabel = cc.LabelTTF.create( '0', 'Arial', 90 );
                this.deadLabel.setPosition( new cc.Point( screenWidth/2, screenHeight/2 ) );
                this.deadLabel.setString('You Dead!!');
                this.addChild( this.deadLabel );  
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
    SPACEBAR : 32,
    SHIFT : 16
};