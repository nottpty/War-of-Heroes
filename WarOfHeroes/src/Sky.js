var Sky = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/sky.png' );

	}

});

Sky.STATUS = {
    WIDTH: 200,
    HEIGHT: 400
};