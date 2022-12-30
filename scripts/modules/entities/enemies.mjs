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
      }

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