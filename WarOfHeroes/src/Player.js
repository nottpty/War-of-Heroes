var Player = cc.Sprite.extend({
    ctor: function(gameLayer) {
        this.GameLayer = gameLayer;
        this._super();
        this.initWithFile( 'res/images/sniper2.png' );
        this.direction = Player.DIR.LEFT;
        this.started = false;
        this.checkPlayer = false;
        this.changeRotation = true;
        this.score = 0;
        this.power = 1;
        this.money = 0;
        this.stage = 1;
        this.stateBullet = 1;
    },

    update: function( dt ) {
    	
    },

    fire: function(){
        var bullet = new Bullet(this.direction,this.stateBullet);
        bullet.setPower(this.power);
        if( this.direction == Player.DIR.LEFT ){
            bullet.setPosition( this.getPosition().x-50,this.getPosition().y+16);
        } else {
            bullet.setPosition( this.getPosition().x+50,this.getPosition().y+16);
        }
        this.GameLayer.addChild( bullet );
        console.log('FIRE');
        bullet.scheduleUpdate();
        return bullet;

    },

    canRotations: function() {
        this.changeRotation = true;
    },

    canNotRotation: function() {
        this.changeRotation = false;
    },

    checkPlayers: function() {
        this.checkPlayer = true;
    },

    stopPlayer: function() {
        this.checkPlayer = false;
    },

    start: function() {
        this.started = true;
    }
    
});

Player.DIR = {
    RIGHT: 1,
    LEFT: 2
};

Player.STATUS = {
    WIDTH: 100,
    HEIGHT: 90
};