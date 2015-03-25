var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/sniper2.png' );
        this.vy = 15;
        this.started = false;
        this.jumped = false;
    },

    update: function( dt ) {

    	if(this.started){

            // if(this.jumped){
            // var pos = this.getPosition();
            // this.setPosition( new cc.Point( pos.x, pos.y + this.vy ) );
            // this.vy += -1;
            // this.jumped = false;
            // }

        // else{
            this.pos = this.getPosition();

            if( this.direction == Player.DIR.RIGHT ){
            this.rightDirection(this.pos);
            }

            else if( this.direction == Player.DIR.LEFT ){
            this.leftDirection(this.pos);
            }
    	}
    },

    // jump: function() {
    //     this.jumped = true;
    //     this.vy = Player.JUMPING_VELOCITY;
    // },
    
    start: function() {
        this.started = true;
    },

    switchDirection: function(arrowDirection) {
        this.start();
        if ( arrowDirection==GameLayer.ARROWDIR.LEFT ) {
            this.direction = Player.DIR.LEFT;
            // this.setRotation( 270 );
        } else if(arrowDirection == GameLayer.ARROWDIR.RIGHT){
            this.direction = Player.DIR.RIGHT;
            // this.setRotation( 90 );
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

// Player.G = -1;
// Player.STARTING_VELOCITY = 15;
// Player.JUMPING_VELOCITY = 15;