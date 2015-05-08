var GameLayer = cc.LayerColor.extend({
	init: function() {
        cc.audioEngine.playEffect('res/sound/main.mp3');
        this.arrBullet = [];
        this.checkGame = 0;
        this.botDeadCount = 0;
        this.countCreate = 0;
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
        this.clockwerk = new Clockwerk(this,15);
        this.huskar = new Huskar(this,25);
        this.roshan = new Roshan(this,35);
        this.doom = new Doom(this,55);
        this.sky = new Sky(this,65);
        this.spectre = new Spectre(this,80);
        this.pudge = new Pudge(this,200);
        this.night = new Night(this,300);
        this.ezalor = new Ezalor(this,350);
        this.boss = new Boss(this,900);
        this.clockwerk.setPosition( new cc.Point( 100, screenHeight / 8) );
    },

    botDead: function() {
        if(this.clockwerk.hp == 0 && this.botDeadCount == 0){
            this.clockwerk.setPosition(-5000,-10000);
            this.removeChild(this.clockwerk);
            this.player.score += 1; 
            this.player.money += 2;
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+this.player.score);
            this.moneyLabel.setString('Your money : '+this.player.money);
        }

        if(this.huskar.hp == 0 && this.botDeadCount == 1){
            this.huskar.setPosition(-5000,-10000);
            this.removeChild(this.huskar);
            this.player.score += 2; 
            this.player.money += 6;
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+this.player.score);
            this.moneyLabel.setString('Your money : '+this.player.money);
        }

        if(this.roshan.hp == 0 && this.botDeadCount == 2){
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

        if(this.doom.hp <= 0 && this.botDeadCount == 3){
            this.doom.setPosition(-5000,-10000);
            this.removeChild(this.doom);
            this.player.score += 4; 
            this.player.money += 10; 
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+ this.player.score);
            this.moneyLabel.setString('Your money : '+ this.player.money);
        }

        if(this.sky.hp <= 0 && this.botDeadCount == 4){
            this.sky.setPosition(-5000,-10000);
            this.removeChild(this.sky);
            this.player.score += 8; 
            this.player.money += 15; 
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+ this.player.score);
            this.moneyLabel.setString('Your money : '+ this.player.money);
        }

        if(this.spectre.hp <= 0 && this.botDeadCount == 5){
            this.spectre.setPosition(-5000,-10000);
            this.removeChild(this.spectre);
            this.player.score += 12; 
            this.player.money += 40; 
            this.player.stage += 1; 
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+ this.player.score);
            this.moneyLabel.setString('Your money : '+ this.player.money);
            this.stageLabel.setString('Stage : '+ this.player.stage);
        }

        if(this.pudge.hp <= 0 && this.botDeadCount == 6){
            this.pudge.setPosition(-5000,-10000);
            this.removeChild(this.pudge);
            this.player.score += 8; 
            this.player.money += 20; 
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+ this.player.score);
            this.moneyLabel.setString('Your money : '+ this.player.money);
        }

        if(this.night.hp <= 0 && this.botDeadCount == 7){
            this.night.setPosition(-5000,-10000);
            this.removeChild(this.night);
            this.player.score += 10; 
            this.player.money += 25; 
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+ this.player.score);
            this.moneyLabel.setString('Your money : '+ this.player.money);
        }

        if(this.ezalor.hp <= 0 && this.botDeadCount == 8){
            this.ezalor.setPosition(-5000,-10000);
            this.removeChild(this.ezalor);
            this.player.score += 15; 
            this.player.money += 40; 
            console.log('Score : '+this.player.score);
            this.scoreLabel.setString('Your score : '+ this.player.score);
            this.moneyLabel.setString('Your money : '+ this.player.money);
            this.stageLabel.setString('Final Stage');
        }

        if(this.boss.hp <= 0 && this.botDeadCount == 9){
            this.boss.setPosition(-5000,-10000);
            this.removeChild(this.boss);
            console.log('Score : '+this.player.score);
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
        var posSky = this.sky.getPosition();
        var posSpectre = this.spectre.getPosition();
        var posPudge = this.pudge.getPosition();
        var posNight = this.night.getPosition();
        var posEzalor = this.ezalor.getPosition();
        var posBoss = this.boss.getPosition();

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
                    this.botDeadCount++; 
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
                    this.botDeadCount++;
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
                    this.botDeadCount++;
                }
                console.log('hp bot : '+this.roshan.hp);
            }

            if((Math.abs(posBullet.x-posDoom.x)< Doom.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posDoom.y)< Doom.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.doom.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.doom.hp <= 2 && this.countCreate == 0){
                    this.createSky();
                    this.countCreate++;
                }
                if(this.doom.hp <= 0){ 
                    this.botDead();  
                    this.botDeadCount++;
                }
                console.log('hp bot : '+this.doom.hp);
            }

            if((Math.abs(posBullet.x-posSky.x)< Sky.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posSky.y)< Sky.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.sky.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                console.log(this.sky.hp,this.countCreate);
                if(this.sky.hp <= 5 && this.countCreate == 1){
                    this.createSpectre();
                    this.countCreate++;
                }
                if(this.sky.hp <= 0){ 
                    this.botDead();  
                    console.log('countCreate : '+this.countCreate);
                    this.botDeadCount++;
                }
                console.log('hp bot : '+this.sky.hp);
            }

            if((Math.abs(posBullet.x-posSpectre.x)< Spectre.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posSpectre.y)< Spectre.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.spectre.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.spectre.hp <= 10  && this.countCreate == 2){
                    this.createPudge();
                    this.countCreate++;
                }
                if(this.spectre.hp <= 0){ 
                    this.botDead(); 
                    console.log('countCreate : '+this.countCreate);
                    this.botDeadCount++; 
                }
                console.log('hp bot : '+this.spectre.hp);
            }

            if((Math.abs(posBullet.x-posPudge.x)< Pudge.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posPudge.y)< Pudge.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.pudge.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.pudge.hp <= 10  && this.countCreate == 3){
                    this.createNight();
                    this.countCreate++;
                }
                if(this.pudge.hp <= 0){ 
                    this.botDead(); 
                    this.botDeadCount++; 
                }
                console.log('hp bot : '+this.pudge.hp);
            }

            if((Math.abs(posBullet.x-posNight.x)< Night.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posNight.y)< Night.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.night.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.night.hp <= 10  && this.countCreate == 4){
                    this.createEzalor();
                    this.countCreate++;
                }
                if(this.night.hp <= 0){ 
                    this.botDead(); 
                    this.botDeadCount++; 
                }
                console.log('hp bot : '+this.night.hp);
            }

            if((Math.abs(posBullet.x-posEzalor.x)< Ezalor.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posEzalor.y)< Ezalor.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.ezalor.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.ezalor.hp <= 10  && this.countCreate == 5){
                    this.createBoss();
                    this.countCreate++;
                }
                if(this.ezalor.hp <= 0){ 
                    this.botDead(); 
                    this.botDeadCount++; 
                }
                console.log('hp bot : '+this.ezalor.hp);
            }

            if((Math.abs(posBullet.x-posBoss.x)< Boss.STATUS.WIDTH/2)&&(Math.abs(posBullet.y-posBoss.y)< Boss.STATUS.HEIGHT/2)){
                console.log('INTERSECT BULLET');
                this.boss.hp -= this.arrBullet[i].power;
                this.arrBullet[i].removeFromParent();
                this.arrBullet.splice(i,1);
                if(this.ezalor.hp <= 0){ 
                    this.botDead(); 
                    this.botDeadCount++; 
                }
                if(this.boss.hp <= 0){
                    this.showWin();
                }
                console.log('hp bot : '+this.boss.hp);
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
        if((Math.abs(posPlayer.x-posSky.x)< Sky.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posSky.y)< Sky.STATUS.HEIGHT/2))
            this.showDead();
        if((Math.abs(posPlayer.x-posSpectre.x)< Spectre.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posSpectre.y)< Spectre.STATUS.HEIGHT/2))
            this.showDead();
        if((Math.abs(posPlayer.x-posPudge.x)< Pudge.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posPudge.y)< Pudge.STATUS.HEIGHT/2))
            this.showDead();
        if((Math.abs(posPlayer.x-posNight.x)< Night.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posNight.y)< Night.STATUS.HEIGHT/2))
            this.showDead();
        if((Math.abs(posPlayer.x-posEzalor.x)< Ezalor.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posEzalor.y)< Ezalor.STATUS.HEIGHT/2))
            this.showDead();
        if((Math.abs(posPlayer.x-posBoss.x)< Boss.STATUS.WIDTH/2)&&(Math.abs(posPlayer.y-posBoss.y)< Boss.STATUS.HEIGHT/2))
            this.showDead();
    },

    showDead: function(){
        this.playerDead();
        this.deadLabel = cc.LabelTTF.create( '0', 'Arial', 90 );
        this.deadLabel.setPosition( new cc.Point( screenWidth/2, screenHeight/2 ) );
        this.deadLabel.setString('You Dead!!');
        this.addChild( this.deadLabel );
    },

    showWin: function(){
        this.winLabel = cc.LabelTTF.create( '0', 'Arial', 90 );
        this.winLabel.setPosition( new cc.Point( screenWidth/2, screenHeight/2 ) );
        this.winLabel.setString('You Win!!');
        this.addChild( this.winLabel );
    },

    createClockwerk: function(){
        this.clockwerk.setPosition( new cc.Point( screenWidth/8, screenHeight/8) );
        this.addChild( this.clockwerk );
        this.clockwerk.scheduleUpdate();
    },

    createHuskar: function(){
        this.huskar.setPosition( new cc.Point( screenWidth/8, screenHeight/3) );
        this.addChild( this.huskar );
        this.huskar.scheduleUpdate();
    },

    createRoshan: function(){
        this.roshan.setPosition( new cc.Point( screenWidth/8, 265) );
        this.addChild( this.roshan );
        this.roshan.scheduleUpdate();
    },

    createDoom: function(){
        this.doom.setPosition( new cc.Point( screenWidth/8, screenHeight/5) );
        this.addChild( this.doom );
        this.doom.scheduleUpdate();
    },

    createSky: function(){
        this.sky.setPosition( new cc.Point( screenWidth/8, screenHeight/3) );
        this.addChild( this.sky );
        this.sky.scheduleUpdate();
    },

    createSpectre: function(){
        this.spectre.setPosition( new cc.Point( screenWidth/8, 265) );
        this.addChild( this.spectre );
        this.spectre.scheduleUpdate();
    },

    createPudge: function(){
        this.pudge.setPosition( new cc.Point( screenWidth/8, screenHeight/5) );
        this.addChild( this.pudge );
        this.pudge.scheduleUpdate();
    },

    createNight: function(){
        this.night.setPosition( new cc.Point( screenWidth/8, screenHeight/3) );
        this.addChild( this.night );
        this.night.scheduleUpdate();
    },

    createEzalor: function(){
        this.ezalor.setPosition( new cc.Point( screenWidth/8, 265) );
        this.addChild( this.ezalor );
        this.ezalor.scheduleUpdate();
    },

    createBoss: function(){
        this.boss.setPosition( new cc.Point( screenWidth/8, 265) );
        this.addChild( this.boss );
        this.boss.scheduleUpdate();
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
            cc.audioEngine.playEffect('res/sound/hit.mp3');
        }
        console.log( 'Up: ' + keyCode.toString() );
        if(keyCode == GameLayer.ARROWDIR.SHIFT){
            if(this.player.money >= 60 && this.player.stateBullet == 1){
                this.player.stateBullet = 2;
                this.player.money -= 20;
                this.player.power = 5;
                this.moneyLabel.setString('Your money : '+ this.player.money);
            }
            else if(this.player.money >= 150 && this.player.stateBullet == 2){
                this.player.stateBullet = 3;
                this.player.money -= 150;
                this.player.power = 15
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