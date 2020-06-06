//Legg merke til at vektor objekt er "objekt literal" slik
//var person = {firstName:"John", lastName:function (){,,,}, age:50, eyeColor:"blue"}; 
//
//Da kan vi initialisere "vektor objekt" slik
//
//		var v1= Objekt.create(vektor) f.eks i main.js
//		og etterpå kan kalle på "lagNy(x,y)" property
//
//		eller 
//	
//		var v1 = vektor.lagNy(x,y) i main.js
//		hvis vi skriver Objekt.create(this) inn i "lagNy(x,y)" property
//
//OBS kunne skrive "vektor objekt" som "constructor function"
//
//function vektor (x,y){
//Da kan vi initialisere "vektor object" slik
//
//var v1 = new vektor (x,y)
//eller
//........


//les mer på http://stackoverflow.com/questions/2709612/using-object-create-instead-of-new

var vektor = {
	_x: 1,
	_y: 0,

	lagNy: function(x, y) {
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);
		return obj;
	},

	setX: function(value) {
		this._x = value;
	},

	getX: function() {
		return this._x;
	},

	setY: function(value) {
		this._y = value;
	},

	getY: function() {
		return this._y;
	},

	setAngle: function(angle) {
		var length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getAngle: function() {
		return Math.atan2(this._y, this._x);
	},

	setLength: function(length) {
		var angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getLength: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y);
}
};
