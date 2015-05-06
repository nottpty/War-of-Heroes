var Clockwerk = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
         this.initWithFile( 'res/images/clockwerk1.png' );

	}

});

Clockwerk.STATUS = {
    WIDTH: 100,
    HEIGHT: 105
};