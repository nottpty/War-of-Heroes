var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/sniper2.png' );
        this.vy = 15;
        this.started = false;
    },

    update: function( dt ) {
    	if(this.started){
            var pos = this.getPosition();
            this.setPosition( new cc.Point( pos.x, pos.y + this.vy ) );
            this.vy += -1;
    	}
    },

    jump: function() {
        this.vy = Player.JUMPING_VELOCITY;
    },
    
    start: function() {
        this.started = true;
    }
    
});

Player.G = -1;
Player.STARTING_VELOCITY = 15;
Player.JUMPING_VELOCITY = 15;