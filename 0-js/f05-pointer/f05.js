window.onload = function() {

	var canvas = document.getElementById("canvas"), 
	ctx = canvas.getContext("2d"), 
	width = canvas.width = window.innerWidth, 
	height = canvas.height = window.innerHeight;

 	var centerY = height * .5,
 		centerX = width * .5,
 		angle = 0,
 		dx,dy;
 	
 	pointer();
function pointer() {
	ctx.clearRect(0 , 0 , width , height);

	ctx.save();
	ctx.translate(centerX,centerY);
	ctx.rotate(angle);
//	http://html5.litten.com/understanding-save-and-restore-for-the-canvas-context/
	
	ctx.beginPath();
	ctx.moveTo(20,0);
	ctx.lineTo(-20,0);	
	ctx.moveTo(20,0);
	ctx.lineTo(10,-10);	
	ctx.moveTo(20,0);
	ctx.lineTo(10,10);	
	ctx.stroke();
	
	ctx.restore();
 	requestAnimationFrame(pointer);
}
 
document.body.addEventListener("mousemove", function(event){
	dx = event.clientX - centerX;
	dy = event.clientY - centerY;
//	angle = Math.atan(dy / dx);
	angle = Math.atan2(dy , dx);  // OBS (y , x)
	
});


	


}
