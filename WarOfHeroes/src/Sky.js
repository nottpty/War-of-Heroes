var Sky = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/sky1.png' );

	}

});

Sky.STATUS = {
    WIDTH: 50,
    HEIGHT: 400
};