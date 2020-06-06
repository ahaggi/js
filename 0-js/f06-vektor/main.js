//var v1 = Object.Create(vektor);
//v1.setX(10);
//v1.setY(5);
// OBS "vektor script" er en variable ==> det blir feil å skrive "var v1 = new vektor()"
var v1 = vektor.create(10, 5);
console.log(v1.getX());

