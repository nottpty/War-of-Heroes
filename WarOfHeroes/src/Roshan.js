var Roshan = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/roshan1.png' );

	}

});

Roshan.STATUS = {
    WIDTH: 350,
    HEIGHT: 500
};