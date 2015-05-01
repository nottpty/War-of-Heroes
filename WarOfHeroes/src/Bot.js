var Bot = cc.Sprite.extend({
	ctor : function(GameLayer,hp){
		this._super();
        this.gamelayer = GameLayer;
        this.direction = Bot.DIR.RIGHT;
        this.started = true;
        this.changeRotation = true;
        this.hp = hp;

	},

	update: function( dt ){
        if(this.gamelayer.checkGame == 0)
		     this.movementBot();
	},

	movementBot: function() {
        if(this.started){
                this.pos = this.getPosition(); 
                if( this.direction == Bot.DIR.RIGHT ){
                    this.rightDirection(this.pos);
                }
                else if( this.direction == Bot.DIR.LEFT ){
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

Bot.DIR = {
	RIGHT : 1,
	LEFT : 2
};