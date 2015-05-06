var Huskar = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        this.initWithFile( 'res/images/huskar1.png' );

	}

});


Huskar.STATUS = {
    WIDTH: 150,
    HEIGHT: 400
};