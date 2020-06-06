window.onload = function() {

	var canvas = document.getElementById("canvas"), 
	context = canvas.getContext("2d"), 
	width = canvas.width = window.innerWidth, 
	height = canvas.height = window.innerHeight;

 	var centerY = height * .5,
    centerX = width * .5,
    speed = .05;

    var offset_render = height* .4, //For at ballen ikke gårut av rammen
    angle_render = 0;

 	var offset_resize = 50,
 	angle_resize = 0,
 	base_r = 100;
 	
 	var offset_fade =.5,
 	angle_fade =.5,
 	alpha = .5;
 	
 	render();
	resize();
//	fade();

function render() {
	var	y = centerY + Math.sin(angle_render)* offset_render;  // (iterer fra 1 til -1) fra topp til bunn
	context.clearRect(width/2,0, width, height);  // clear høyre delen av skjermen
	context.beginPath();
//	context.arc(x,y,r,sAngle,eAngle,counterclockwise);
	context.arc(centerX *3/2, y , 50 , 0 , Math.PI * 2, false);  
	context.fill();
	
	angle_render+= speed;
	requestAnimationFrame(render); // call "render" at rate sync. with the screen refresh,,, IKKE FUNGERER MED ALLE BROWSER
}



function resize() {
	var r = base_r + Math.sin(angle_resize)* offset_resize;
	context.clearRect(0 , 0 , width/2 , height/2);
	context.beginPath();
//	context.arc(x,y,r,sAngle,eAngle,counterclockwise);
	context.arc(centerX*1/2 , centerY/2 , r , 0  , Math.PI * 2 , false);
	context.fill();
	
	angle_resize+= speed;
	requestAnimationFrame(resize);
}


//Les mer om context createLinearGradient createRadialGradient
//function fade(){
//	var alp = alpha + Math.sin(angle_fade)* offset_fade;
//	context.fillStyle = "rgba(0,0,0," + alp + ")";
//	
//	context.clearRect(0 , height/2, width/2 , height);
//	context.beginPath();
////	context.arc(x,y,r,sAngle,eAngle,counterclockwise);
//	context.arc(centerX*1/2 , centerY*3/2, 50 , 0  , Math.PI * 2, false);
//	context.fill();
//	
//	angle_fade+= speed;
//	requestAnimationFrame(fade);
//
//}


}
