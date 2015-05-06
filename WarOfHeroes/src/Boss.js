var Boss = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/boss1.png' );

	}

});

Boss.STATUS = {
    WIDTH: 400,
    HEIGHT: 500
};