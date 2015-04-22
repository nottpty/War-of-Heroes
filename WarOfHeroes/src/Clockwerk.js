var Clockwerk = cc.Sprite.extend({
	ctor: function(){
        this._super();
        this.initWithFile( 'res/images/clockwerk1.png' );
        this.direction = Clockwerk.DIR.RIGHT;
        this.started = true;
        this.changeRotation = true;
        this.hp = 3;
	},

	update: function( dt ){
		this.movementBot();
	},

	movementBot: function() {
        if(this.started){
                this.pos = this.getPosition(); 
                if( this.direction == Clockwerk.DIR.RIGHT ){
                    this.rightDirection(this.pos);
                }
                else if( this.direction == Clockwerk.DIR.LEFT ){
                    this.leftDirection(this.pos);
                }
        }
    },

    rightDirection: function(pos) {
        if( pos.x < screenWidth ){
            this.setPosition( new cc.Point( pos.x + 1,pos.y) );
        }else {
            this.setPosition( new cc.Point( 0 , pos.y));
        }
    }
});

Clockwerk.DIR = {
    RIGHT: 1,
    LEFT: 2
};

Clockwerk.STATUS = {
    WIDTH: 100,
    HEIGHT: 105
};