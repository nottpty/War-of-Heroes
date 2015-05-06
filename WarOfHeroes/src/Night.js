var Night = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/night1.png' );

	}

});

Night.STATUS = {
    WIDTH: 350,
    HEIGHT: 400
};