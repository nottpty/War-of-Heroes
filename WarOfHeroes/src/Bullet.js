var Bullet = cc.Sprite.extend({
	ctor: function(direction) {
		this._super();
		this.initWithFile( 'res/images/bullet2.png' );
		this.direction = direction;
	},

	update: function( dt ) {
    	this.movementBullet();
    },

    movementBullet: function() {
        this.pos = this.getPosition(); 
                if( this.direction == Bullet.DIR.RIGHT ){
                    this.rightDirection(this.pos);
                }else if(this.getPositionX() < 0){
                    this.removeFromParent();
                }else if( this.direction == Bullet.DIR.LEFT ){
                    this.leftDirection(this.pos);
                }
    },

    switchDirection: function(arrowDirection) {
        this.start();
        if ( arrowDirection==GameLayer.ARROWDIR.LEFT ) {
            this.direction = Bullet.DIR.LEFT;
        } else if(arrowDirection == GameLayer.ARROWDIR.RIGHT){
            this.direction = Bullet.DIR.RIGHT;
        }
    },

    leftDirection: function(pos) {
        this.setPosition( new cc.Point( pos.x - 7,pos.y) );
    }

});

Bullet.DIR = {
    RIGHT: 1,
    LEFT: 2
};

Bullet.STATUS = {
    WIDTH: 25,
    HEIGHT: 15
}