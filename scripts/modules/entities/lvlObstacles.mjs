function newSpike() { //le spine per terra
	this.life = 9999999999;
	this.type = "obstacle";
	this.name = "spike";
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

function esplosione(x, y, widthIni, heightIni, widthMax, heightMax, danno) {
	this.life = 1;
	this.timer = 5;
	this.type = "enemyShot";
	this.name = "explosion";
	this.damage = danno;
	this.x = x - widthIni / 2;
	this.y = y - heightIni / 2;
	this.width = widthIni;
	this.widthMax = widthMax;
	this.heightMax = heightMax;
	this.height = heightIni;
	this.color = '#dd0000';
	this.color2 = '#eecc00';
	this.hasPhysics = true;
	this.canSelfDraw = true;
	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		color1 = this.color;
		color2 = this.color2;
		ctx.fillStyle = color1;
		ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
		innerX = this.width / 2;
		innerY = this.height / 2;
		ctx.fillStyle = color2;
		ctx.fillRect(xdisegnata + this.width / 2 - innerX / 2, ydisegnata + this.height / 2 - innerY / 2, innerX, innerY);
	}
	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if (this.width < this.widthMax) {
			this.x = this.x - this.width / 4;
			this.width += this.width / 2;
		}
		if (this.height < this.heightMax) {
			this.y = this.y - this.width / 4;
			this.height += this.width / 2;
		}
		if (this.width > this.widthMax - 1 && this.height > this.heightMax - 1) {
			this.timer--;
		}
		if (this.timer < 0) {
			this.life = -1;
		}
	}
} //fine esplosione()      