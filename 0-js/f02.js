window.onload = function() {

	var canvas = document.getElementById("canvas"), context = canvas.getContext("2d"), 
	width = canvas.width = window.innerWidth, 
	height = canvas.height = window.innerHeight;

	context.translate(0, height / 2);
	// context.fillRect(0, 0, 2*width, 10*height);
	// context.scale(1,-1); // OBS trenger å multipliser med vektor [1,-1] for at y-aksen blir rotert 180 grader

	for (var angle = 0; angle < Math.PI * 2; angle += 0.01) {
		var x = angle * 100;
		var y = Math.sin(angle) * 100;
		context.fillRect(x, y, 5, 5);
	}

}
