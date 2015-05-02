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
        this.clockwerk = new Clockwerk(this,10);
        this.huskar = new Huskar(this,20);
        this.roshan = new Roshan(this,30);
        this.doom = new Doom(this,35);
        this.sky = new Sky(this,40);
        this.spectre = new Spectre(this,50);
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
            this.player.money += 6;
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+this.player.score);
            this.moneyLabel.setString('Your money : '+this.player.money);
        }

        if(this.roshan.hp == 0){
            this.roshan.setPosition(-5000,-10000);
            this.removeChild(this.roshan);
            this.player.score += 6; 
            this.player.money += 15;
            this.player.stage += 1; 
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+ this.player.score);
            this.moneyLabel.setString('Your money : '+ this.player.money);
            this.stageLabel.setString('Stage : '+ this.player.stage);
        }

        if(this.doom.hp == 0){
            this.doom.setPosition(-5000,-10000);
            this.removeChild(this.doom);
            this.player.score += 4; 
            this.player.money += 10; 
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+ this.player.score);
            this.moneyLabel.setString('Your money : '+ this.player.money);
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
        var posDoom = this.doom.getPosition();
        for(var i = 0 ; i<this.arrBullet.length ; i++ ){
            var posBullet = this.arrBullet[i].getPosition();
            if((Math.abs(posBullet.x-posClockwerk.x)< Clockwerk.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posClockwerk.y)< Clockwerk.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.clockwerk.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.clockwerk.hp == 2){
                    this.createHuskar();
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
                    this.createRoshan();
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
                if(this.roshan.hp == 2){
                    this.createDoom();
                }
                if(this.roshan.hp <= 0){ 
                    this.botDead();  
                }
                console.log('hp bot : '+this.roshan.hp);
            }

            if((Math.abs(posBullet.x-posDoom.x)< Doom.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posDoom.y)< Doom.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.doom.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.doom.hp <= 0){ 
                    this.botDead();  
                }
                // if(this.doom.hp == 2){
                //     this.createDoom();
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
        if((Math.abs(posPlayer.x-posDoom.x)< Doom.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posDoom.y)< Doom.STATUS.HEIGHT/2))
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

    createClockwerk: function(){
        this.clockwerk.setPosition( new cc.Point( 100, screenHeight/8) );
        this.addChild( this.clockwerk );
        this.clockwerk.scheduleUpdate();
    },

    createHuskar: function(){
        this.huskar.setPosition( new cc.Point( 100, screenHeight/3) );
        this.addChild( this.huskar );
        this.huskar.scheduleUpdate();
    },

    createRoshan: function(){
        this.roshan.setPosition( new cc.Point( 100, 265) );
        this.addChild( this.roshan );
        this.roshan.scheduleUpdate();
    },

    createDoom: function(){
        this.doom.setPosition( new cc.Point( 100, screenHeight/5) );
        this.addChild( this.doom );
        this.doom.scheduleUpdate();
    },

    createSky: function(){
        this.sky.setPosition( new cc.Point( 100, screenHeight/3) );
        this.addChild( this.sky );
        this.sky.scheduleUpdate();
    },

    createSpectre: function(){
        this.spectre.setPosition( new cc.Point( 100, 265) );
        this.addChild( this.spectre );
        this.spectre.scheduleUpdate();
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
            if(this.player.stateBullet == 1){
                    console.log("Spacebar: " + keyCode.toString() );
                    this.arrBullet.push(this.player.fire());
            }
            else if(this.player.stateBullet == 2){
                    console.log("Spacebar: " + keyCode.toString() );
                    this.player.fire().initWithFile( 'res/images/bullet3.png' );
                    this.arrBullet.push(this.player.fire());
            }
        }
        console.log( 'Up: ' + keyCode.toString() );
        if(keyCode == GameLayer.ARROWDIR.SHIFT){
            if(this.player.money >= 20 && this.player.stateBullet == 1){
                this.player.stateBullet = 2;
                this.player.money -= 20;
                this.player.power = 5;
                this.moneyLabel.setString('Your money : '+ this.player.money);
            }
            else if(this.player.money >= 100 && this.player.stateBullet == 2){
                this.player.stateBullet = 3;
                this.player.money -= 100;
                this.moneyLabel.setString('Your money : '+ this.player.money);
            }
        }
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