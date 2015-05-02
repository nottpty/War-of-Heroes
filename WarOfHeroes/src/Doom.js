var Doom = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/doom1.png' );

	}

});

Doom.STATUS = {
    WIDTH: 100,
    HEIGHT: 105
};