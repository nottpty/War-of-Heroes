var Spectre = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/spectre.png' );

	}

});

Spectre.STATUS = {
    WIDTH: 450,
    HEIGHT: 500
};