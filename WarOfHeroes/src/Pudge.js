var Pudge = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/pudge1.png' );

	}

});

Pudge.STATUS = {
    WIDTH: 100,
    HEIGHT: 155
};