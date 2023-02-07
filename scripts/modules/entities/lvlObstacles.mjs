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

function newBreakableBlock() {
	this.life = 9999999999;
	this.type = "platform";
	this.name = "breakable block";
	this.letter="ƀ";
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAALRJREFUOI2dk0EVxCAMRIe+ukAaEnCAgDiIhFjBBwd0sIddstACy3YuFPIzJOHV4K2CZzIGQBGRJeWcAwC0XIwRzAwjIiWltDQIIYCIdJ9z1u+jArPEUcxa2xsQ0RAkou7mkY5ltDGaVdnNoEK/bgW+c9AKroPa1a2Ff03UYDcxhHB/xhE0G1oVM88NVtUQkSZPDXYq8d4DAM5RsPZYobZnZtZzZsbpnNODFprpyprP+vh3fgHgxVjqK6rXQgAAAABJRU5ErkJggg==";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=0;
	this.stance["timer"]=0;
	this.sprite.larg=16;
	this.sprite.alt=16;
	this.damage = 0;
	this.x = 0;
	this.y = 0;
	this.width = blockDimension;
	this.height = blockDimension;
	this.color1 = '#868686';
	this.color2 = "#333333";
	this.canSelfDraw = true;
	this.hasPhysics = false;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
		ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata, this.width, this.height);
      	}
      	this.getHit = function (nome, danno) {
		if(armaturaAcquired[2]){this.life=-1;}//dies when hit while you have the weapon upgrade
	}
} //fine breakableBlock()
