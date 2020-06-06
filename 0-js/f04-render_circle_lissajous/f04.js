window.onload = function() {

	var canvas = document.getElementById("canvas"), 
	ctx = canvas.getContext("2d"), 
	width = canvas.width = window.innerWidth, 
	height = canvas.height = window.innerHeight;

 	var centerY = height * .5,
    centerX = width * .5,
    speed = .01,
    radius = 200,
    angle = 0;
 	
// 	render_circle();
// 	render_elliptic();
 	render_lissajous2();
//  	tegn();
function render_circle() {
	var	y = centerY + Math.sin(angle)* radius;
	var	x = centerX + Math.cos(angle)* radius;
	ctx.clearRect(0 , 0 , width , height);
	
	ctx.beginPath();
	ctx.arc(x, y , 10 , 0 , Math.PI * 2, false);
	ctx.fill();
	
	angle+= speed;
	requestAnimationFrame(render_circle);
}

function render_elliptic() {
	var	y = centerY + Math.sin(angle)* (radius+100);
	var	x = centerX + Math.cos(angle)* (radius-50);	
	ctx.clearRect(0 , 0 , width , height);
	
	ctx.beginPath();
//	ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
	ctx.arc(x, y , 10 , 0 , Math.PI * 2, false);
	ctx.fill();
	
	angle+= speed;
	requestAnimationFrame(render_elliptic);
}


	var angleX = 0, angleY = 0;

	function render_lissajous() {
		var	x = centerX + Math.cos(angleX) * (radius+100);	
		var	y = centerY + Math.sin(angleY) * (radius+100);
//		ctx.clearRect(0 , 0 , width , height);
		
		ctx.beginPath();
//		ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
		ctx.arc(x, y , 10 , 0 , Math.PI * 2, false);
		ctx.fill();
		
		angleX+= .1;
		angleY+= .13;
		requestAnimationFrame(render_lissajous);
	}

	function render_lissajous2() {
		ctx.clearRect(0 , 0 , width , height);
		for (var i = 0; i < 10; i++) {
			ctx.beginPath();
			var	x = centerX + Math.cos(angleX * 1/(i+1)) * (radius+100);	
			var	y = centerY + Math.sin(angleY * 1/(i+1)) * (radius+100);
			ctx.arc(x, y , 3 , 0 , Math.PI * 2, false);
			ctx.fill();
		}
		var xx = document.getElementById("speed").value;
		
		angleX+= .1 *xx;
		angleY+= .13*xx;
		requestAnimationFrame(render_lissajous2);
	}

	
	function tegn() {
//		ctx.clearRect(0 , 0 , width , height);
		var antall = 30,
			angle = Math.PI * 2 / antall;
		for (var i = 0; i < antall; i++) {
			var x = centerX*1.8	 + Math.cos(angle *i) * (radius/3);
			var y = centerY + Math.sin(angle*i) * (radius/3);

			// ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
			ctx.beginPath();
			ctx.arc(x, y, 3, 0, Math.PI * 2, false);
			ctx.fill();
		}
		
//		requestAnimationFrame(xxx);
	}





}
