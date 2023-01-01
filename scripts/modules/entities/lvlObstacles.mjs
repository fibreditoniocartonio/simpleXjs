function newSpike() { //le spine per terra
	this.life = 9999999999;
	this.type = "obstacle";
	this.name = "spike";
	this.letter="S";
	this.damage = 9999999999;
	this.x = 0;
	this.y = 0;
	this.width = blockDimension;
	this.height = blockDimension;
	this.canSelfDraw = true;
	this.hasPhysics = false;
	this.color1 = '#bcbcbc';
	this.color2 = "#777777";
	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.fillStyle = this.color1;
		ctx.moveTo(xdisegnata, ydisegnata + this.height);
		ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height);
		ctx.lineTo(xdisegnata + (this.width / 2), ydisegnata - 2);
		ctx.lineTo(xdisegnata, ydisegnata + this.height);
		ctx.fill();
		ctx.strokeStyle = this.color2;
		ctx.stroke();
	}
} //fine newSpike()
