var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/sniper2.png' );
        this.started = false;
        this.checkPlayer = false;
    },

    update: function( dt ) {
    	this.movementPlayer();
    },

    movementPlayer: function() {
        if(this.started){
            if(this.checkPlayer){
                this.pos = this.getPosition(); 
                if( this.direction == Player.DIR.RIGHT ){
                    this.rightDirection(this.pos);
                }
                else if( this.direction == Player.DIR.LEFT ){
                    this.leftDirection(this.pos);
                }
           }
        }
    },

    checkPlayers: function() {
        this.checkPlayer = true;
    },

    stopPlayer: function() {
        this.checkPlayer = false;
    },

    start: function() {
        this.started = true;
    },

    switchDirection: function(arrowDirection) {
        this.start();
        if ( arrowDirection==GameLayer.ARROWDIR.LEFT ) {
            this.direction = Player.DIR.LEFT;
        } else if(arrowDirection == GameLayer.ARROWDIR.RIGHT){
            this.direction = Player.DIR.RIGHT;
        }
    },

    rightDirection: function(pos) {
        if( pos.x < screenWidth ){
            this.setPosition( new cc.Point( pos.x + 5,pos.y) );
        }else {
            this.setPosition( new cc.Point( 0 , pos.y));
        }
    },

    leftDirection: function(pos) {
        if( pos.x < 0 ){
            this.setPosition( new cc.Point( screenWidth , pos.y));   
        }else {
                this.setPosition( new cc.Point( pos.x - 5,pos.y) );
        }
    }
    
});

Player.DIR = {
    RIGHT: 1,
    LEFT: 2
};