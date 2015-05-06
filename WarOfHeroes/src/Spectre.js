var Spectre = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/spectre1.png' );
	}

});

Spectre.STATUS = {
    WIDTH: 300,
    HEIGHT: 450
};