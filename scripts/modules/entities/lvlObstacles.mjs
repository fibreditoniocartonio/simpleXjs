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
	this.getHit = function (nome, danno){}
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

function newThinPlatform() {
	this.life = 9999999999;
	this.type = "platform";
	this.name = "thin platform";
	this.letter="T";
	this.damage = 0;
	this.disabled=false;
	this.x = 0;
	this.y = 0;
	this.width = blockDimension;
	this.height = blockDimension/4;
	this.color1 = '#bcbcbc';
	this.color2 = "#333333";
	this.canSelfDraw = true;
	this.hasPhysics = true;
	this.getHit = function (nome, danno){}
	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		ctx.lineWidth = "1";
		ctx.fillStyle = this.color1;
		ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
		ctx.strokeStyle = this.color2;
		ctx.strokeRect(xdisegnata, ydisegnata, this.width, this.height);
	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.y<Math.round(player.y+player.height)){
			this.disabled=true;
		}else{
			this.disabled=false;
		}
	}
} //fine newThinPlatform()
