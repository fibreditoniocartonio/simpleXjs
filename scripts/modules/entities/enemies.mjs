      function newPipistrello() { //mostro pipistrello
      	this.name = "bat";
	this.letter = "P";
      	this.life = 1;
      	this.type = "monster";
      	this.damage = 1;
      	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
      	this.timer = 0;
      	this.alSoffitto = false;
      	this.slope = 0;
      	this.width = 34;
      	this.height = 16;
      	this.color1 = '#8500b5';
      	this.color2 = '#d7b600';
      	this.speed = 0.5;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (this.alSoffitto) {
      			this.height = -1 * this.height;
      			ydisegnata = ydisegnata - this.height;
      			xdisegnata += this.width / 8;
      			this.width = this.width * 3 / 4;
      		}
      		var unitX = this.width / 10;
      		var unitY = this.height / 10;
      		ctx.fillStyle = this.color2;
      		halfBatDraw(xdisegnata, this.width, ydisegnata, this.height, unitX, unitY);
      		halfBatDraw(xdisegnata, this.width, ydisegnata, this.height, -unitX, unitY);
      		ctx.fillStyle = this.color1;
      		halfBatDraw(xdisegnata + 1.5, this.width - 3, ydisegnata + 1.5, this.height - 3, unitX, unitY);
      		halfBatDraw(xdisegnata + 1.5, this.width - 3, ydisegnata + 1.5, this.height - 3, -unitX, unitY);
      		if (this.alSoffitto) {
      			this.height = -1 * this.height;
      			this.width = this.width * 4 / 3;
      		}

      		function halfBatDraw(xdisegnata, width, ydisegnata, height, unitX, unitY) {
      			ctx.beginPath();
      			ctx.lineWidth = "1";
      			ctx.moveTo(xdisegnata + width / 2, ydisegnata + unitY * 2);
      			ctx.lineTo(xdisegnata + width / 2 + unitX, ydisegnata);
      			ctx.lineTo(xdisegnata + width / 2 + unitX, ydisegnata + unitY * 3);
      			ctx.lineTo(xdisegnata + width / 2 + unitX * 2.5, ydisegnata);
      			ctx.lineTo(xdisegnata + width / 2 + unitX * 5, ydisegnata + height - unitY);
      			ctx.lineTo(xdisegnata + width / 2 + unitX * 2.5, ydisegnata + height - unitY * 2.5);
      			ctx.lineTo(xdisegnata + width / 2 + unitX * 1.25, ydisegnata + height - unitY / 2);
      			ctx.lineTo(xdisegnata + width / 2 + unitX, ydisegnata + height - unitY * 2.4);
      			ctx.lineTo(xdisegnata + width / 2, ydisegnata + height);
      			ctx.lineTo(xdisegnata + width / 2, ydisegnata + unitY * 2);
      			ctx.fill();
      		}
      	}
      	this.getHit = function (nome, danno) {
      		this.life -= danno;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (this.timer < 1) { //movimento verso il player
      			this.alSoffitto = false;
      			if (this.x < player.x - 1) {
      				this.xv -= this.speed;
      			} else if (this.x > player.x + player.width - 1) {
      				this.xv += this.speed;
      			}
      			if (this.y < player.y + 1) {
      				this.yv -= this.speed;
      			} else {
      				this.yv += this.speed;
      			}
      			this.xv *= level.friction;
      			this.yv *= level.friction;
      			this.x += -this.xv;
      			this.y += -this.yv;
      		} else { //movimento verso l'alto
      			if (!this.alSoffitto) {
      				this.yv = this.speed * 8;
      				this.y += -this.yv;
      			}
      		}

      		this.slope = 0; //serve per i bordi tipo
      		for (var i = 0; i < level.length; i++) {
      			if (collisionBetween(this, level[i])) {
      				if (this.slope != -8) {
      					this.y -= 1;
      					this.slope += 1;
      				}
      			}
      		}

      		for (var i = 0; i < level.length; i++) { //level collision
      			if (collisionBetween(this, level[i])) {
      				var latoSopra = new rectTest(this.x, this.y, this.width, 2);
      				if (this.timer > 0 && collisionBetween(latoSopra, level[i])) {
      					this.alSoffitto = true;
      				}
      				this.y += this.slope;
      				this.x += this.xv * 2;
      				this.xv = 0;
      				if (this.alSoffitto) {
      					this.y += this.yv;
      					this.yv = 0;
      				} else {
      					this.y += this.yv * 2;
      					this.yv = 0;
      				}
      			}
      		}
      		if (this.alSoffitto) {
      			this.timer--;
      		}

      		//other entity mostro collision - e' un po buggata
      		for (var i = 0; i < entity.length; i++) {
      			if (entity[i].life > 0 && entity[i].type == "mostro" && !(i == indiceDiQuestaEntity)) {
      				if (collisionBetween(this, entity[i])) {
      					this.x += this.xv * 1.95;
      					this.xv = 0;
      					this.y += this.yv * 1.95;
      					this.yv = 0;
      				}
      			}
      		}
      		//collision col player
      		if (collisionBetween(this, player)) {
      			this.xv = 0;
      			this.yv = 0;
      			this.timer = 50;
      		}
      	}
      }//fine di Pipistrello()

      function newBunny() { //mostro coniglio
      	this.life = 2;
      	this.type = "monster";
      	this.name = "bunny";
	this.letter = "B";
      	this.damage = 4;
      	this.invulnerability = 0;
      	this.facingRight = false;
      	this.gotHit = false;
      	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
      	this.timer = 0;
      	this.slope = 0;
      	this.isOnGround = false;
      	this.width = 28;
      	this.height = 28;
      	this.color1 = '#a57aff';
      	this.color2 = '#ffc925';
      	this.color3 = '#dddddd';
      	this.color4 = '#69ff00';
      	this.speed = 12;
      	this.jumpHeight = 10;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		color1 = this.color1;
      		color2 = this.color2;
      		if (this.gotHit) {
      			this.gotHit = false;
      			color1 = this.color3;
      			color2 = this.color3;
      		}
      		head = this.width / 10 * 4;
      		ctx.fillStyle = color1;
      		ctx.fillRect(xdisegnata, ydisegnata + head, this.width, this.height - head);
      		if (this.facingRight) {
      			drawHead(xdisegnata + this.width - head, ydisegnata + 1, head, color2);
      		} else {
      			drawHead(xdisegnata, ydisegnata + 1, head, color2);
      		}

      		function drawHead(x, y, head, eyeColor) {
      			ctx.fillRect(x, y, head, head);
      			ctx.fillRect(x + head - head / 5 * 2, y - head / 3 * 2, head / 5 * 2, head / 3 * 2);
      			ctx.fillRect(x, y - head / 3 * 2, head / 5 * 2, head / 3 * 2);
      			ctx.fillStyle = eyeColor;
      			ctx.fillRect(x + head - head / 5 * 2, y + head / 5, head / 5, head / 5);
      			ctx.fillRect(x + head / 5, y + head / 5, head / 5, head / 5);
      		}
      	}
      	this.getHit = function (nome, danno) {
      		if (this.invulnerability < 1) {
      			this.gotHit = true;
      			this.life -= danno;
      			this.invulnerability = 3;
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		this.timer++;
      		if (this.invulnerability > 0) {
      			this.invulnerability--;
      		}

      		var gravityApplicata = 0;
      		var frizioneApplicata = 0;
      		if (this.y > level.waterLevel) { //determina se sei in acqua o no
      			if (!this.isInWater) {
      				this.isInWater = true;
      				this.yv = 0;
      			}
      			gravityApplicata = level.gravityWater;
      			frizioneApplicata = level.frictionWater;
      		} else {
      			this.isInWater = false;
      			gravityApplicata = level.gravity;
      			frizioneApplicata = level.friction;
      		}
      		this.yv += gravityApplicata; //get level gravity
      		if (this.yv > (this.height)) { //limita la gravita' massima raggiungibile
      			this.yv = this.height;
      		}
      		if (!this.isOnGround) {
      			this.y += this.yv;
      		} //apply gravity
      		this.xv = this.xv * frizioneApplicata; //riduce gradualmente xv
      		this.x += this.xv; //apply movimento x

      		for (var i = 0; i < level.length; i++) { //collision with level
      			var latoSotto = new rectTest(this.x + this.width / 2 - 2, this.y + this.height - 3, 4, 2);
      			if (collisionBetween(latoSotto, level[i])) { //collisione y col pavimento
      				this.y = level[i].y - this.height;
      				this.yv = 0;
      				this.isOnGround = true;
      			} else if (collisionBetween(this, level[i])) { //tutte altre collisioni con level
      				this.x += -this.xv;
      				//this.xv=0;
      			}
      		}

      		if (this.timer > 250 && this.isOnGround && Math.floor(Math.random() * 100) < 50) { //sparo
      			this.timer = 1;
      			var sparo = new newSparo(20, 10);
      			if (this.facingRight) {
      				sparo.x = this.x + this.width - sparo.width;
      			} else {
      				sparo.x = this.x;
      			}
      			sparo.y = this.y - this.width / 6;
      			sparo.facingRight = this.facingRight;
      			sparo.type = "enemyShot";
      			sparo.color = this.color4;
      			sparo.damage = 2;
      			sparo.speed = sparo.speed / 2;
      			entity.push(sparo);
      		}

      		if (this.timer % 100 == 0 && this.isOnGround) { //salto
      			var siGira = 25;
      			if ((this.facingRight && this.x > player.x) || (!this.facingRight && this.x < player.x)) {
      				siGira = 85;
      			}
      			if (Math.floor(Math.random() * 100) < siGira) {
      				this.facingRight = !this.facingRight
      			}
      			this.yv = -this.jumpHeight;
      			this.isOnGround = false;
      			this.xv = -this.speed;
      			if (this.facingRight) {
      				this.xv = -this.xv;
      			}
      		}
      	}
      } //fine newBunny()  

      function newBombBee() { //mostro ape - require newBombBee_Bomb()
      	this.life = 2;
      	this.type = "monster";
      	this.name = "bomb wasp";
	this.letter = "A";
      	this.damage = 2;
      	this.invulnerability = 0;
      	this.facingRight = false;
      	this.maxTimer = 100;
      	this.timer = this.maxTimer / 2;
      	this.bombTimer = 0;
      	this.gotHit = false;
      	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
      	this.isOnGround = false;
      	this.width = 17;
      	this.height = 36;
      	this.color1 = '#ffdd22';
      	this.color2 = '#ccaa00';
      	this.color3 = '#dddddd'; //damage color
      	this.color4 = '#00ddff';
      	this.speed = 0.5;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		color1 = this.color1;
      		color2 = this.color2;
      		color3 = this.color4;
      		if (this.gotHit) {
      			this.gotHit = false;
      			color1 = this.color3;
      			color2 = this.color3;
      			color3 = this.color3;
      		}
      		unit = this.height / 4;
      		ctx.fillStyle = color3 + "55";
      		ctx.strokeStyle = color3;
      		ctx.lineWidth = "1";
      		ctx.beginPath();
      		ctx.moveTo(xdisegnata - unit / 2, ydisegnata - unit / 2);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2 - unit - unit / 2);
      		ctx.lineTo(xdisegnata - unit / 2 + this.width + unit * 2, ydisegnata - unit / 2);
      		ctx.lineTo(xdisegnata - unit / 2 + this.width + unit * 2, ydisegnata - unit / 2 + this.height - unit);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2 - unit / 2);
      		ctx.lineTo(xdisegnata - unit / 2, ydisegnata - unit / 2 + this.height - unit);
      		ctx.lineTo(xdisegnata - unit / 2, ydisegnata - unit / 2);
      		ctx.fill();
      		ctx.stroke();
      		ctx.fillStyle = color1;
      		ctx.fillRect(xdisegnata + unit / 2, ydisegnata, unit * 2, unit * 2 + 1);
      		ctx.fillRect(xdisegnata + unit / 2, ydisegnata + unit * 3 - 1, unit * 2, unit - 1);
      		ctx.fillStyle = color2;
      		if (this.facingRight) {
      			ctx.fillRect(xdisegnata + unit / 2, ydisegnata + unit * 2, unit + unit / 2, unit);
      			ctx.fillRect(xdisegnata + unit * 2, ydisegnata + unit / 2, unit, unit);
      		} else {
      			ctx.fillRect(xdisegnata, ydisegnata + unit / 2, unit, unit);
      			ctx.fillRect(xdisegnata + unit, ydisegnata + unit * 2, unit + unit / 2, unit);
      		}
      	}
      	this.getHit = function (nome, danno) {
      		if (this.invulnerability < 1) {
      			this.gotHit = true;
      			this.life -= danno;
      			this.invulnerability = 3;
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (this.invulnerability > 0) {
      			this.invulnerability--;
      		}
      		if (this.bombTimer > 0) {
      			this.bombTimer--;
      		}
      		this.timer++;
      		var centro = this.x + this.width / 2;
      		if (this.timer > this.maxTimer) {
      			this.timer = 1;
      			if (centro < player.x + player.width / 2) {
      				this.facingRight = true;
      			} else if (centro > player.x + player.width / 2) {
      				this.facingRight = false;
      			}
      		}

      		if (this.facingRight) { //movimento
      			this.xv += this.speed;
      		} else {
      			this.xv -= this.speed;
      		}
      		this.xv = this.xv * level.friction;
      		this.x += this.xv;

      		if (centro < player.x + player.width * 2 && centro > player.x - player.width) {
      			if (this.bombTimer < 1) {
      				bomba = new newBombBee_Bomb(centro, this.y + this.height);
      				entity.push(bomba);
      				this.bombTimer = 50;
      			}
      		}
      	}
      } //fine newBombBee()                  
      function newBombBee_Bomb(x, y) { //bomba del mostro ape - require esplosione() from lvlObstacles.mjs
      	this.life = 1;
      	this.type = "enemyShot";
      	this.name = "bomb bee bomb";
      	this.damage = 0;
      	this.timer = 0;
      	this.x = x;
      	this.y = y;
      	this.yv = 0;
      	this.isOnGround = false;
      	this.width = 10;
      	this.height = 10;
      	this.color = '#999999';
      	this.color2 = '#880000';
      	this.color3 = '#ff0000';
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		color1 = this.color;
      		color2 = this.color2;
      		if (this.timer > 40) {
      			color2 = this.color3;
      		}
      		redPoint = this.width / 10 * 6;
      		ctx.fillStyle = color1;
      		ctx.fillRect(xdisegnata, ydisegnata + redPoint / 2, this.width, this.height - redPoint / 2);
      		ctx.fillStyle = color2;
      		ctx.fillRect(xdisegnata + this.width / 2 - redPoint / 2, ydisegnata, redPoint, redPoint);
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		var gravityApplicata = 0;
      		var frizioneApplicata = 0;
      		if (this.y > level.waterLevel) { //determina se sei in acqua o no
      			if (!this.isInWater) {
      				this.isInWater = true;
      				this.yv = 0;
      			}
      			gravityApplicata = level.gravityWater;
      			frizioneApplicata = level.frictionWater;
      		} else {
      			this.isInWater = false;
      			gravityApplicata = level.gravity;
      			frizioneApplicata = level.friction;
      		}
      		this.yv += gravityApplicata; //get level gravity
      		if (this.yv > (this.height)) { //limita la gravita' massima raggiungibile
      			this.yv = this.height;
      		}
      		if (!this.isOnGround) {
      			this.y += this.yv; //apply gravity
      		} else { //timer e esplosione
      			this.timer++;
      			if (this.timer > 60) {
      				esplosion = new esplosione(this.x + this.width / 2, this.y + this.height / 2, 1, 1, this.width * 3, this.height * 3, 1);
      				entity.push(esplosion);
      				this.life = -1;
      			}
      		}
      		for (var i = 0; i < level.length; i++) { //collision with level
      			var latoSotto = new rectTest(this.x + this.width / 2 - 2, this.y + this.height - 3, 4, 2);
      			if (collisionBetween(latoSotto, level[i])) { //collisione y col pavimento
      				this.y = level[i].y - this.height;
      				this.yv = 0;
      				this.isOnGround = true;
      			}
      		}
      	}
      } //fine newBombBee_Bomb()

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

function newZombie() { //zombie
      	this.name = "zombie";
	this.letter = "Z";
      	this.type = "monster";
      	this.life = 1;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,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";
	this.stance=[];
      	if(levelEditor){
		this.stance["x"]=0;
	}else{
		this.stance["x"]=3;
	}
	this.stance["y"]=Math.floor(Math.random()*3);
	this.stance["timer"]=0;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=!(player.facingRight);
      	this.slope = 0;
      	this.width = 30;
      	this.height = 62;
      	this.color1 = '#fcc4fc';
      	this.color2 = '#cc88fc';
      	this.speed = 0.38;
	this.timer=40;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		var fixForWindows=0.5;
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, 16*this.stance.x+fixForWindows, 32*this.stance.y+fixForWindows, 16-fixForWindows*2, 32-fixForWindows*2, xdisegnata, ydisegnata-1, (16)*2, 32*2);
      		} else {
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, 16*this.stance.x+fixForWindows, 32*this.stance.y+fixForWindows, 16-fixForWindows*2, 32-fixForWindows*2, -xdisegnata, ydisegnata-1, -(16)*2, 32*2);
      			ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      		}
      	}
      	this.getHit = function (nome, danno) {
      		this.life -= danno;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.timer>0){ //activation
			this.timer--;
		}else{ //when active can move to the player
			if(this.x+this.width/2 > player.x+player.width/2){
				this.facingRight=false;
				this.xv+= this.speed;
			}else if(this.x+this.width/2 < player.x+player.width/3){ //3 and not 2 otherwise the zombie will start flipping left and right because of the decimal part of the x coordinate
				this.facingRight=true;
				this.xv+= -this.speed;
			}
			this.xv = this.xv*level.friction;
			this.x += -this.xv;
		}
		this.calculateStance();
	      	this.yv += level.gravity/2; //get level gravity/2
    		this.y += this.yv; //apply gravity
		//level collision
		var latoSx = new rectTest(this.x, this.y + this.height/2 - 2, 2, 4);
		var latoDx = new rectTest(this.x+this.width-2, this.y + this.height/2 - 2, 2, 4);
      		for (var i = 0; i < level.length; i++) {
      			if (collisionBetween(this, level[i])) {
				this.y += -this.yv;
      				this.yv = 0;
      				if (collisionBetween(latoSx, level[i]) || collisionBetween(latoDx, level[i])) { //collisione x
      					this.x -= -this.xv;
      				}
      			}
      		}
      		//collision col player
      		if (collisionBetween(this, player)) {
      			this.xv = 0;
      			this.yv = 0;
      		}

      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=9;
		if(this.timer>21){
			this.stance.x=3;
		}else if(this.timer>1){
			this.stance.x=2;
		}else if(this.timer==1){
			this.stance.timer=-1;
		}else{
			if(this.xv>0.1 || this.xv<-0.1){ //in movimento
				switch(this.stance.timer){
					case 0: this.stance.x=0; break;
					case maxTimer: this.stance.x=1; break;
					case 2*maxTimer: this.stance.timer=-1; break;
				}
			}else{ //fermo
				this.stance.x=0;
				this.stance.timer=-1;
			}
		}
		if(previousStance==this.stance.x){
			this.stance.timer++;
		}
	}//fine di calculateStance()
}//fine di Zombie

function newRedSkeleton() { //red skeleton
      	this.name = "red skeleton";
	this.letter = "⧌";
      	this.type = "monster";
      	this.life = 1;
      	this.damageDefault = 1;
      	this.damage = this.damageDefault;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAA7dJREFUaIHNWbuR2zAQXWgYOnQJChA6UHAlXMACLrwiGKgEBirCoQtA4BIcMLgQgUpw6BAzcEA+6nEJEDhJtvRmbsQhsQu8xf6AM0Mf5F44HJuo3w19MAWZu81/DRazX0OAZUPn1hMcm1ir4xGYDZAicHat2AoCkG1OrYiIhM7J2Y3P3kqVjkdhJ7Imf3btgkDKM4DUN8gCJR2PRMO75+11SiAPI2oDPDMWOcB6ucoIZzca7+xasf7y/lqD/k80IrLaPZCoJcCk9ftnN0IjIsndE8kTYwx9MBzfIAzyNToeiWbog7EZAkDonDTTmFw2T3mQ/vaMJXHOAVsE+HuOBErgFp6yJE6dYNz6C52L3kr0dnwWkTj0QfhPj8ezt5ff0LmV/KOxE1m7NfcE3o67a/0lLELnVnWddcAbvBXZtxdd3Cg9S1+ww8PQB8MkvF0SQG5gV8+RCJ2T0DnZt5eOcN+62ZgY8wxGSJ5Eapoabn0BVAT9Hq1xKjnW5I5/iexRjBeWWujZjUb6yMjr1prLIgx8K/mhDzefJlfS2MU565/aJPmi4tP6PKC/P0Of0ByOTTIb65MdJzORtBH4XJHyAAa+D++vi/dfvjfxz/uYi779/hk/vr4WS+Yt1cTkFOgTYs5dkTgxvtRHaF1bPQEbI1d1chtYi115yG1ANRFZhpOuOgATZfIwIPTdq4JUZRB2aQ6NlFfsWydeRi9YyHi6IMnE/eHYRHSL+oIlNedkBHNLIkx6ABaiyXKDkyqBGJOL99LJcOiDgSyqTA6hc3c5aa5yQCmWeQdLLoyFiixL31bcw/j7drnbIItkjCRsvdx0rlh4AMeaJu/tSGaLPJBKeFu7yfMz+dQcfF13D2CCzYyvPaK0g3rXIXvNzmP+1JXdtJ6bPMAIkWeSv34czctbv1pUiQQvWkSq5fT4GkxNW/X4FOYQ4OQ19MG8vPULw+B9SSEOQp/FFnFOoqw7VQqn47cGH+8XWFUBTVJ3gLX4TOxrGdR67h+Qf0p6VVLE/QTrXBhiNgAmY6s2p3Zug2uPr6lSuSWL9+w5uHvg+wfuRVByS4DHZJJmFEkkQY7ZXEzX/KcIC9ANUU6WDcHrYDIcorS23FqiiBiEBBKmtxLpZGrmPkAnIu7xU0bAQmoMoWW1XMo7UoaAEViekmAUERM6F+G1k6wJnYvNqTUYw7+GhOeJUwT1DuXIlMZrvXq8vpXeqg5cBXIk8R6/kweYaa64KIMMHQq5MVtkcrdGnxnPyHzPkt0gH+FNfwHkAVu1gKxGJwAAAABJRU5ErkJggg==";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=0;
	this.stance["timer"]=0;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=false;
      	this.slope = 0;
      	this.width = 30;
      	this.height = 62;
      	this.color1 = '#ff3333';
      	this.color2 = '#333333';
      	this.speed = 0.43;
	this.timer=40;
	this.dying=false;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		var fixForWindows=0.5;
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, 16*this.stance.x+fixForWindows, 32*this.stance.y+fixForWindows, 16-fixForWindows*2, 32-fixForWindows*2, xdisegnata, ydisegnata-1, (16)*2, 32*2);
      		} else {
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, 16*this.stance.x+fixForWindows, 32*this.stance.y+fixForWindows, 16-fixForWindows*2, 32-fixForWindows*2, -xdisegnata, ydisegnata-1, -(16)*2, 32*2);
      			ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      		}
      	}
      	this.getHit = function (nome, danno) {
		if(!this.dying && this.timer<1){ //can get hit only when active
      			this.dying=true;
			this.timer=60;
			this.damage=0;
		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.dying){
			this.timer--;
			if(this.timer<0){
				this.dying=false;
				this.timer=60;
			}
		}else{
			if(this.timer<1){this.damage=this.damageDefault;}
			if(this.timer>0){ //activation
				this.timer--;
			}else{ //when active can move randomly
				if(this.timer<0){
					this.timer++;
				}
				if(this.timer==0){
					var randomDir=Math.floor(Math.random()*3)
					if(randomDir==0){ //ogni 100 frame ha una possibilita di cambiare direzione
						this.facingRight=!this.facingRight;
					}
					this.timer=-100+randomDir*10;
				}
				if(!this.facingRight){
					this.xv+= this.speed;
				}else{
					this.xv+= -this.speed;
				}
				if(this.yv>-0.5 && this.yv<0.5){//puo muoversi attivamente solo se e' a terra
					this.x += -this.xv;
				}
				this.xv = this.xv*level.friction;
			}
		}
	      	this.yv += level.gravity/2; //get level gravity/2
    		this.y += this.yv; //apply gravity
		//collision with level
		var latoSx = new rectTest(this.x, this.y + this.height/2 - 2, 2, 4);
		var latoDx = new rectTest(this.x+this.width-2, this.y + this.height/2 - 2, 2, 4);
      		for (var i = 0; i < level.length; i++){
      			if (collisionBetween(this, level[i])) {
				this.y += -this.yv;
      				this.yv = 0;
      				if (collisionBetween(latoSx, level[i]) || collisionBetween(latoDx, level[i])) { //collisione x
      					this.x -= -this.xv*2.5;
					this.facingRight=!this.facingRight;
					this.timer-=20;
      				}
      			}
      		}
      		//collision col player
      		if (collisionBetween(this, player)) {
      			this.xv = 0;
      			this.yv = 0;
      		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=9;
		if(this.dying){
			if(this.timer>53){
				this.stance.x=2;
			}else{
				this.stance.x=3;
			}
		}else{
			if(this.timer>8){
				this.stance.x=3;
			}else if(this.timer>1){
				this.stance.x=2;
			}else if(this.timer==1){
				this.stance.timer=-1;
			}else{
				switch(this.stance.timer){
					case 0: this.stance.x=0; break;
					case maxTimer: this.stance.x=1; break;
					case 2*maxTimer: this.stance.timer=-1; break;
				}
			}
			if(previousStance==this.stance.x){
				this.stance.timer++;
			}
		}
	}//fine di calculateStance()
}//fine di redSkeleton

function newArmoredKnight() { //armored Knight
      	this.name = "armored knight";
	this.letter = "Ќ";
      	this.type = "monster";
      	this.life = 6;
      	this.damage = 2;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABACAYAAABcIPRGAAAAAXNSR0IArs4c6QAABVJJREFUaIHFWTtu6kwYPWN5QY6UgoIKNsEaSEoKluBfShlYAzu4VagoKCLFO7m6vaX5C3PM8ecZP0iUOdJVuMycb773PHDbcwEAOK4qvz0XDjccV5WvLzWqC1AsgXyZQ8ctUvEzTv4saxxXlef/gYb0vM9RXYD6ch8PLZ6Kn/FDsbwL43f1pUZ9qVshdlyRip/RegDgXxLzZUP8LBshHFek5mfbc+Ge9zkAgH/nIDU/oxAtknyZI1/2hcUW+Cn+9bSfzc+Be8Xny9wDTQgBoLp0SbEukpLfM+nmjU4hAY1XtIBiynyXfz3tZ/FbA1jlxGdZt52B4aSw23edvp2K34sAu4KSWf2alwy59eR3+YtNOYvf7gOaayQrOK4hZdE9ylflH+VnLCAND8GwkvxZ1u2uSKTmOwBeN4ixXsxNxX6Xiu8AdLZmHqDUaitcw2jx2/yMeRjapllMmpPao4F7O3uUzzp6lN+6wLYstVih48GNZQZfm8Aj/O25cPlxVfUmAW2b6vzfCHDHVQXeJxSxwxcVUsUXm9LSOeattynzJscdVxWykALMQwqgIrrZbM/FJOVtClhcT/v44AC4fjY+9XGEFA+ljRkHAt6PoZdk9D4Q7hJTofnLS8kULDZlUHk9cmvttRH4jrIKbX+2bsa8r7rEitk2jo7W6n3rsbFQhsA6muMcNXpK1DozYgvNuSltz4U7riof4iw2pQfGIxFyFpuDfb3oFLE9j3AizyqhzSZmhC6svM+ybg2ZitDxg5jUhR6pDxrBNkojqEjMiFDqPO/zjgP1YpNZsvWy3nPZ3/UNZwyxdIhBFQ1deKwRwRSKLTA1hRRDm5gi9myiRlCWGjEphYaeBH8SxTIcMT696BiNmLUT29yMnaMUoSeS5333Njdlf9D3o458VWJKsU5tqbxpWdlDynLOUKoyStQj354LHFfV4CbGgtE5t3ke99NjUHktvpjxPD4MbZb6Wk3wOD1I1m4Tm7M9F+55NfxMEgNfIcaUB8J3Ecfj7GJTenNO9/7D4/ULeH8C3NoNhj8VP+fklzePxcb562nvuMm49W3+m4f/8HBr50NCUvLbLvT+dBfG7/xHQzzsHF6/+uOKVPyM1gMA/5Lo1g3x5a0RwnFFan52Pe3dYddEhX/d2sGtXWv9EFLzMwoJFUmbgzfEhKXku+tp31Y8Cf6jCdXr1/Ci/JyS39tZbt5ok415xxxkscU6ym/zWwNY5ZaoZJ2nbS8lvxcBhpNwa9d2gZDw1PzWgLFqV+Jh54A/f5t///5Lys9osbUauIerJ/zP3/Zjar4D4G2+DcGGk9+l4vd+H+ABipNCwukt26dT8DN2gVBhsW2xdSmZ4U3N73Uh9cph53AYGA/18d/m/8yDqIHmaSgFxu7AoTqJIXip9x++F1LbKWJKWOU1/FOhua66vLzdP3P9wVcJe8y1u+UYVPmp3ue4zfUYeinELqCLPgrm69DOa6E7sdUj5IQ2At9V1srRlJvqfYL3gZBeVkYnAkPeHzrahkA5ekyeAu3xU9brGBBbaI7ivJS3YZexqb8PhPI+1pk6RRzrNLYbTDFCF1Zecwye9/uAKt+71NvJoSjMSQGCRrATdU6SAUV0Levpw851HKjczJKtx6gIBXN8jhftXjAUSVVUI6kXGTWil0JDmNMO5yL2bKJG2GguNuW03wemtr/v4v0pXMB8etExGhE0INZ1HtkrtKernLm/D+j7kWJSG7WLE/ZBNgR7vh+aP2XnZpQor40Ai8cWMRW1bXSsHvhkaIsvNlfXH5pjUszlkYEoMVZo+kSi751jsIbG5gC9DHEA8D/a1JJiZRbXNAAAAABJRU5ErkJggg==";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=Math.floor(Math.random()*2);
	this.stance["timer"]=0;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=false;
      	this.slope = 0;
      	this.width = 30;
      	this.height = 62;
      	this.color1 = '#6b8cff';
      	this.color2 = '#333333';
      	this.speed = 0.33;
	this.timer=-60;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
		if(this.timer<1){
			var fixForWindows=0.5;
			if (!this.facingRight) {
      				ctx.drawImage(this.sprite, 16*this.stance.x+fixForWindows, 32*this.stance.y+fixForWindows, 16-fixForWindows*2, 32-fixForWindows*2, xdisegnata, ydisegnata-1, (16)*2, 32*2);
      			} else {
      				ctx.save(); //salvo il canvas attuale
	      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
	      			ctx.drawImage(this.sprite, 16*this.stance.x+fixForWindows, 32*this.stance.y+fixForWindows, 16-fixForWindows*2, 32-fixForWindows*2, -xdisegnata, ydisegnata-1, -(16)*2, 32*2);
      				ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      			}
		}
      	}
      	this.getHit = function (nome, danno) {
      		this.life -= danno;
		this.timer=6;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.timer>0){ //when hit can't move
			this.timer--;
		}else{
			if(this.timer==0){
				var randomDir=Math.floor(Math.random()*3)
				if(randomDir==0){ //ogni tot frame ha una possibilita di cambiare direzione
					this.facingRight=!this.facingRight;
				}
				this.timer=-90+randomDir*10;
			}else{
				this.timer++;
			}
			if(!this.facingRight){
				this.xv+= this.speed;
			}else{
				this.xv+= -this.speed;
			}
		}
		this.xv = this.xv*level.friction;
		this.x += -this.xv;
	      	this.yv += level.gravity/2; //get level gravity/2
    		this.y += this.yv; //apply gravity
		//collision with level + prevent fall
		var latoSx = new rectTest(this.x, this.y + this.height/2 - 2, 2, 4);
		var latoDx = new rectTest(this.x+this.width-2, this.y + this.height/2 - 2, 2, 4);
		var nextCollision = new rectTest(this.x+this.width/2-2, this.y+this.height-1, 4, 2);
		nextCollision["collided"]=false;
		if(this.facingRight){ nextCollision.x+=this.width;
		}else{		 nextCollision.x-=this.width;}
      		for (var i = 0; i < level.length; i++){
      			if (collisionBetween(this, level[i])) {
				this.y += -this.yv;
      				this.yv = 0;
      				if (collisionBetween(latoSx, level[i]) || collisionBetween(latoDx, level[i])) { //collisione x
      					this.x -= -this.xv*2.5;
					this.facingRight=!this.facingRight;
					this.timer-=20;
      				}

      			}
			if(!nextCollision.collided){
				if(collisionBetween(nextCollision, level[i])){
					nextCollision.collided=true;
				}
			}
      		}
		if(!nextCollision.collided){ //previene la caduta
			this.facingRight=!this.facingRight;
			this.timer-=20;	
		}
      		//collision col player
      		if (collisionBetween(this, player)) {
      			this.xv = 0;
      			this.yv = 0;
      		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=11;
		switch(this.stance.timer){
			case 0: this.stance.x=0; break;
			case maxTimer: this.stance.x=1; break;
			case 2*maxTimer: this.stance.x=2; break;
			case 3*maxTimer: this.stance.x=1; break;
			case 4*maxTimer: this.stance.timer=-1; break;
		}
		if(previousStance==this.stance.x){
			this.stance.timer++;
		}
	}//fine di calculateStance()
}//fine di redSkeleton
