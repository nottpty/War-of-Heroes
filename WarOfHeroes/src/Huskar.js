var Huskar = Bot.extend({
	ctor: function(GameLayer,hp){
        this._super(GameLayer,hp);
        //this.gamelayer = GameLayer;
        this.initWithFile( 'res/images/huskar1.png' );
        // this.direction = Huskar.DIR.RIGHT;
        //this.started = true;
        //this.changeRotation = true;
        //this.hp = 10;
	}//s,

	// update: function( dt ){
 //        if(this.gamelayer.checkGame == 0)
	// 	     this.movementBot();
	// },

	// movementBot: function() {
 //        if(this.started){
 //                this.pos = this.getPosition(); 
 //                if( this.direction == Huskar.DIR.RIGHT ){
 //                    this.rightDirection(this.pos);
 //                }
 //                else if( this.direction == Huskar.DIR.LEFT ){
 //                    this.leftDirection(this.pos);
 //                }
 //        }
 //    },

 //    rightDirection: function(pos) {
 //        if( pos.x < screenWidth ){
 //            this.setPosition( new cc.Point( pos.x + 1,pos.y) );
 //        }else {
 //            this.setPosition( new cc.Point( 0 , pos.y));
 //        }
 //    }
});

// Huskar.DIR = {
//     RIGHT: 1,
//     LEFT: 2
// };

Huskar.STATUS = {
    WIDTH: 200,
    HEIGHT: 400
};