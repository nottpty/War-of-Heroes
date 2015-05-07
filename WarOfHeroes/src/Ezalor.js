var Ezalor = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/ezalor1.png' );

	}

});

Ezalor.STATUS = {
    WIDTH: 100,
    HEIGHT: 500
};