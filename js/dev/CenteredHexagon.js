let CenteredHexagon = function (order, canvas){
	this.order = order;
	this.number = (3 * order * (order - 1)) + 1;
	this.side = (this.number -1 ) / 6;
	this.size = (this.side -1) * 2;

    this.canvas = canvas;
	this.drawingUnit = canvas.height / canvas.height;
	this.rad = this.drawingUnit/2;
}


CenteredHexagon.prototype.drawFigure = function () {
	let rows = (this.size - 1) / 2;
	let center = (rows + 1) * this.drawingUnit;

	// draw center line, 
	let d = this.canvas.getContext("2d");
	d.beginPath();
	d.arc(center, center, this.rad, 0, 2 * Math.PI);
	d.stroke();
}
