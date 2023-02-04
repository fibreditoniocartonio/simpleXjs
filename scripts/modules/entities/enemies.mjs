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
      	this.color1 = '#000000';
      	this.color2 = '#ff4a8c';
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
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAC/tJREFUeJzNXT9vG7kS/9FPhfMN8jGCXEpXm85l3OlKu7NLAy+AawM+QKXTKeVz55TprMqlz7iPkW+QFDrMK3aHOxwOubviKtQPWFjicsj5x5khqcs5IsLff/1LAPDh8wJE5PAb4dxvnS7Gy92WABAA4s9EhCnPy912Z9rqKBWiVIHVoZhJCvFytyUp8FxeUB0GQ5EQLJi0dkKYyQqsDmZk+9xa8OVuS9vn/hkr4K4KrA7tvgACBUCt75QCdlVgbRwBbfqTWJws/N/t89a3v9xtYeHvv/6lf57bcfRYzjlyzhGn2oODdlH+zNbnvzkXh3Jvi57HPjQP8ObS1mXr81/nHL3cbfFyt42szG08hn4PAH/89z8OaD1ifjF2xwKwGQb6pSDBfZ1zRKJqLFFgTUQeIJlLrX8WjDGHAqtBrmv9yEygYwNUXNCZRNLLDAEVV2rjCIDfAEmL52D1szIAgz3hw+dF5D214TkR7hiYRTKfAhE55xyNFU72q+0FJrdjPUGiRIE1sReudlGgc857g5Uq9xUwIwVIdwbiiD8XODVqwThdSrw76ZUytyJGSSbz+RB2VSAReeH1ctk+b/3cc6fPI90gmddM7AqpDAu8XwDiOoQV+M9z3zZnNTm7b09VIAsj3Z6VwF43xQOnIvCAsZpdnMx7eKqFl9/Z+lL4Ob0gWgIlWk5ZvxQfPvdLwJiz6IkUsCumCm95kbXLBFqj5JRQgskxYG73B2LB9TIApmUiA3q5eP79zCXuW0LLadN6JxXDcUAqoaMbMgZtn7eB93z4vPB0TlZfY7SsPWBX4a1xUn1lLSHn6tpSCgjGk3R8fAfATVoC8nCjdBnocXKesDiJl8QAiOdgyzPvOo5MCoL6hMe611ucLJKVn9Wux7C8SVeHA5VloMR3J+3zcrc1N2ZJBehJpAum3lmMybZcWaytz8dnL3dbvDvphcmAD1u8t8i5WAnRrlSe6sjTHiA+Fco9KdrcWHxvYNFYJ0z6O3prR3PkTqdku5MHEjtWV04wshOsMthqA8J1Lfuyd8ggLte79R4QWcA3KCUY21X5LhJmiN7on3u9d0R7AVqucdkQ+O8Uryilr4GgDqDlun/xcBF0ZEumPGAsfcRAZQ8IFMCNl00v2JeNAy3XwP/OBxUwhj5i4FCWAC3XYAvev/0adHIPF8CfX7OuXEpfC+YSyLnvmCUw1v31eFWgb30B0GVD/i9/Rph3A9op9MYPKupCCkDLtWeYlmui5ToQSggT0E6lPyQFDNYBEiq4RbRT6O+fEAXVGvBBMHXuzvkcaCM6o7MmdqW/+gjuX3VJHPGRNC3XgRBSkPu3X00hmLaEfr/iDWMBwKcvKQTDPVwErsuQgpTS74o5PKZfAg8XnllZzo5FKT0j9fM765kDficnSt32e8f81Y9zAL3FdJUnGN+JvvqvRAytBukMIq8jTodWXi+i/93PpDSYUGB0u7sLrbwe/50wr8fld0sgdmPO5Zq+y+102RC+bJy1bIbOCKI597VURp0KW4IAw1fVFk03FrXksdX1thpo40iV3wc457wVx0JvixMeEAlO3e8DaLmONlOXzbkfY+7fB4y+F2gZ6yN5LoLTcu2jv4QQPrnMpPCyeOIx+ZRpLiVMuheQZa0FtuDVj3N/JsDKSnmRTJvyTAEIU6f2itmQKTKCnR2M7e7QbhCZFKjp+LlsKJqP2+Wj59/1Ge0Blw1Jl3RQkfyyIVz9OI8sbRVAYw9L/bp/uIhOmeZCVgEpYVKQbu8eLoK1zrS55aDjhh5vH0pIKoCZl+tPeEFkPR/glmuzRNYeIHH14zwQ3j1cRPuIfcWB0Uvgy8bh/u1X3L/9yszp4zHHDKY2Qeo8wUfzZIAUAvOWevbt9IgdV/KoK9VXv4cR0HJ9YARPqEA6FAj1eKl+g3VAV9oSLYEv6N3Tysd93/g9v2u3zK27S0/h9/xdWtrfLQC4+jFsVKuaTNUOo5aAdG8gPvZO0nUHJGJiB7QC8Rj6TNCqM3R1mAvGlvCSF90+6AGyUJHBybIE9+V0eB8z0p8oy2u0bvOkGWa0AfLCrC6FAqOTKGs8vacY/IGRvOyQhxzCCq6bwGRAbXmt+8Pget2X2cYli7VPYHqLNz3GZUM+leo0nVTAwJPtOxSYfD9RCeba0AVBq290ASOqx9QYAEwNaMGmbDpKaKtAB0FqVoTX02PwX6QtrlFCWw3SQtSsej431+0ro830mgLag4G31uvpsX9ke7OilDVLaA8DzYo8k82KIgGQcecS2towlwC7MNC7sWxD7MoltAeDwI0Rum3QPjNtVQSVYLMirDZv8P77ryCAdRFdgqAsOYb29fQY77//mo/7PcG0IOwAF9EynRUMD9ELuA6QjDkAjtft6+mxfwDsZEHDgw4GR+gE79zWW4eFtgR+//2XLHQknAx4mjZDVw1HQB+thRII6AW4bn4OjROkOUtxh+oFvhTeXLugguNg1qwIm2uXU4L0IAC94mTboUJuRf1nbS3hutFnIC55+ftq8yY5Bg6kHlggZCT66bslsP4M9MXO6+kx0AnOtDm62jCPxIaYTAjvcn3GjFsD1pFY4AVWQFMlrunKI+iiYqqDFTj2tlxSA0exIGO9YD8xkiY1f7CtXomlNMDvzsgNSKniJxPMyAqgTDMQCIkzjjVXgqYY2WNxy4Il+TxDS0C4a5SFGKfgfRRRKQWQlcNHCO+siD9A5+sIXUtcNz/xenocecWcGLwYsYQoieYWrawbdE3BSmDM7QWz/efzGqUpj4UeqEKLYSmAeG/PjExd91L4sbSyagQQrPt9KiHrAbktcM7CVvzQ2UDASeFlKc10r6fH/rBF8JU9mUq8j2AqQFuDGTHigRmdVps3Wc9JpUoJrQiOBaqvFJI4kKp7iSySldjQhihBC6j6QXtRJq8nq0/5PUEfLFs5X0ZOAAkPkExbrrvvQw0trNya58BxQvYf4tVUwHXz07ucFlwqZQrGBMNUH10hppYMv2NvUEt50nlkcKMjj7qNW5+IVvaxaFSbn0/SWBctchx1wGqObc05qASeXJ4KDyjBVF5GYIuhpAK0cLpN06eu5ax2YPx2NIdoRzeFOHepyplA7xF4rW+uXRQU+busG1bqgIbfb65dFIGHhMlunwvoq6H9eckT8G0DnN36NgCgx5u+Y/dOvmeU0tcFPfVr4vFG/MREtct3c9LXxpH72H6Q1pJItTNK6WvjiJ7CBmbYfQToqXVddl/d12qbSn8IiNwVCB96CvvMTF8XzLDFeOaZjb42js5u8+tUvrP6ldLXhr8XOLsN1ygHN2Ac46X0tdD/09pdLmc83gS5exCl9LXgd4OSeYlPjf1Zo5S+Fo6AlrESa5XS18QR0K5X7bJaoJz1Sulrgx5v2jwtUxl/5hyeqwMK6atiAcCd3YLQRfFHo5OM6NbrQvqqCP81uY+hq+r0NWZfUEJfE2RVdLKN3RyJU6AUfaJMzvJiPHtD9AOJ0miu6Se6P8liilPr2W3ywKUYo+8G2bU7Bidbhd2/+2t6ET21CuOHlfl4k6UrgldArqaX6zpl0Ry9bE+kQ9Jjs9Bntz3NPpSQ9ACeXDI/xZ2tUjgnPD2FewkW/PFmv1mEY0Dww6gdonWSXh+CWMJwn2+b9jP34UMVmVo7xRJmigeRBzDzuwYzSa8VOdWDmGafVSR7AFkuK5lgSAsJkG5PCZ/aJerN1KcGwG2/BPRucy74I+whAQLG4PsG9MzgpyZk9lMTH57KI/SuPvDtvCQsGoteYPI9RLAE6ClIOZ75XTAmczAsj2Cry/EM75ECEwdSlgMjMsakf15fWT/At42w9G0c/ICWKe0dHZwodvx7OY/2BqUM0ktEvsOY3wdYQp3d9kEoJ3xuDLbclMwiCyD+rtOkBeZR9h/yBK8ADjYsrGYCMGOEOfDjTdIanlGLPqUkHZ9SS4bfsTcoTzP3FQvZqIsOKwsYjBLQCWXzH8FYAvq6zc8rXXsoC1jZQl7KdPeXwZLwl6NyAhnAeG3zBEC/luWkloA6+utxJYPcx8oCjEQKDui14ExnzQeI/8eIJYjVljr6Hkuj+9BAttCVoVa+Fpq/J3aV/n1nHPo/93iLOkbQg0YAAAAASUVORK5CYII=";
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
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, 16*this.stance.x, 32*this.stance.y, 16, 32, xdisegnata, ydisegnata-2, (16)*2, 32*2);
      		} else {
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, 16*this.stance.x, 32*this.stance.y, 16, 32, -xdisegnata, ydisegnata-2, -(16)*2, 32*2);
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

function newGraySkeleton() { //gray skeleton - throw newSkeletonBone()
      	this.name = "skeleton";
	this.letter = "§";
      	this.type = "monster";
      	this.life = 1;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAAAXNSR0IArs4c6QAABHhJREFUaIGtWDuO4zAMpQwdYw+RAVKkcJdL5A6ZMoUHmHILFyknd8gl0rnIAgEmh5hur2BAW8RPoWhSlp0lMMDG0nuk+JXWXc8N/S/Z7Nogv13Pjcth/KsEHNt3/VhB7UOOIxqgEdw7ovUuT8Cxvn7Q9V1P9+6xdmv7LEelKb93lBBonuHK5TdgITmOilvPFc8R4PuuJy0MOan4j3XjrX1ZuXePU947Il97Wje+mMsTUbQeZADf2rLTWMrWjZ/kcEQUsClndS4ReXw5163tE06Nw1/PjVvvvEoAGWIccoZoHpRrWkl6uUkjmCIZvmt2JaKVZExCX/uYQJqgQvpuXFLSIBiLMKDCVvUYX+UIYLXM7Ckj4I1b29Oqfu7hjQr4ihNwklvbJwTIDe5qq7mgH6zqZ19Z1c/DcCNUf8uytJTIuF/Pjdvs2iC/ozVryWlmDifRlCEfbj+fpoF8Ly9LHNDXfmwATsGyXlU+JRIjG5KvhwSdIoD7eDJZRvC5onmAC9addSGRE9KqcyQu9k/1Ecm1bPrMEO56rhiGV2PIWLRRa41dlBv2rGqKiScNIjI8sNm1ATULxdx6Xs/8RJgXUoDXJuPIA1rspXLEWHbQ0aARRsIb6iyQymUi3dqHJyzlXLSEs0IW74TrX7+T2tcI8b3kpgwMKsPXnm4/n05iHREF3nb5CZELq7pMOZ8NpUbHo8oS4XWNpjPn5KUySkKpRHbAUpmK/cgAlAh3Y+4iMaVYG73afnc9NySHD9EzDNgo1t2wRzUCOJQsx0oPxxuR5jLtljOsh+FPFVxukNA5T8Qy5Bv5N35T4kRTIcEab+HaQEvKkIsMhbVHqwyuXGvZiQE8jvxEBrEkUxVbeE2S53m4PD3qti77EFGMW4T3Gvj9m2h/DAOxK/r/gaV4D7DbugiaI6/ik054OhR525Ql+IqIyG0dhUsguBFEp4MryoFX8I6IAlxXcAJ5AaHNri3Gm8/zzc7F4GlkONmQ2aNb0By82oqxSbpQyrCuZlopXnZPj1OgbjUQz/Dhd+KJJXh4YvQwmYopc6fZhufg1XfB6eAiOFxCUt9uO11qc/Dqu2B/DPT19vj3+7d9Ei2p5uLVt6E2ZvfHkBBByZ+/H+Y0LMGbb0NseP9+/JZlhe+v4s1xbAkHy063BI+ZHogohEsI+2PAdSv5C5cwWr+eG8LfUg7iCxooAwxc+RKO67l5dkJeHtYAOR3yI3cJR9KKAczF8nRwca8UyWHt47lTDW00Wg/lWvPgXYzGrTh2N0255IjfZRUIJQRjRDNRHyYwXuPgkrw3NOW8xqPFTyOyvXiOciL2MOHKeR8HWYlyCJ9+UGglb8UvlUR63y69bCIXiIi+3h44mdDqfYBbzq3mM167B1hGABsuIYYO5ScPGKtAjk1OBhnWi9wBXnjCkuRGBIv5Y8I4ERgnvSE9IaUSm83Y8XV4q2T4QKx7YnIjkko0BbxplYoVYiL2NsQHVATvWNIQ3huIPkak5n5FvNY298cwas3y8Tkl2n7tpfQPZjfaVi+v2BYAAAAASUVORK5CYII=";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=Math.floor(Math.random()*2);
	this.stance["timer"]=0;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.boneX=3;
	this.boneY=11;
	this.facingRight=false;
	this.goingRight=false;
      	this.slope = 0;
      	this.width = 30;
      	this.height = 62;
      	this.color1 = '#cc88fc';
      	this.color2 = '#fcc4fc';
	this.jumpHeight = 10.5;
      	this.speed = 0.4;
	this.timer=-40;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, 16*this.stance.x, 32*this.stance.y, 16, 32, xdisegnata, ydisegnata-1, (16)*2, 32*2);
      		} else {
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, 16*this.stance.x, 32*this.stance.y, 16, 32, -xdisegnata, ydisegnata-1, -(16)*2, 32*2);
      			ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      		}
      	}
      	this.getHit = function (nome, danno) {
		this.life-=danno;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.x+this.width/2 > player.x+player.width/2){
			this.facingRight=false;
		}else if(this.x+this.width/2 < player.x+player.width/3){ //3 and not 2 otherwise he will start flipping left and right because of the decimal part of the x coordinate
			this.facingRight=true;
		}
		if(this.timer<0){
			this.timer++;
		}
		if(this.timer%35==0){ //throwing bones
			var randomBone=Math.floor(Math.random()*5);
			if (randomBone==1){
				var bonePassX=this.boneX+(Math.floor(Math.random()*10)-5)/10;
				if(this.facingRight){ bonePassX=-bonePassX;}
				var bonePassY=-(this.boneY+(Math.floor(Math.random()*12)-6)/10);
				bone = new newGraySkeletonBone(this.stance.y, this.damage*3, this.x+this.width/2, this.y+this.height/2, bonePassX, bonePassY);
				entity.push(bone);
			}
		}
		if(this.timer==0){ //change direction
			var randomDir=Math.floor(Math.random()*3);
			if(randomDir==0){ //ogni 100 frame ha una possibilita di cambiare direzione
				if(this.yv>-0.5 && this.yv<0.5){ //puo cambiare direzione solo se e' a terra
					this.goingRight=!this.goingRight;
				}
			}
			this.timer=-100+randomDir*10;
		}
		if(!this.goingRight){ //movement
			this.xv+= this.speed;
		}else{
			this.xv+= -this.speed;
		}
		this.x += -this.xv;
		this.xv = this.xv*level.friction;
	      	this.yv += level.gravity/1.5; //get level gravity
    		this.y += this.yv; //apply gravity
		//collision with level
		var latoSx = new rectTest(this.x, this.y+4, 2, this.height-8);
		var latoDx = new rectTest(this.x+this.width-2, this.y+4, 2, this.height-8);
		var latoSotto = new rectTest(this.x+4, this.y+this.height-2, this.width-8, 2);
		var latoSopra = new rectTest(this.x+4, this.y, this.width-8, 2);
      		for (var i = 0; i < level.length; i++){
      			if (collisionBetween(this, level[i])) {
      				if (collisionBetween(latoSx, level[i]) || collisionBetween(latoDx, level[i])) { //collisione x
      					this.x -= -this.xv*2.5;
					this.xv = 0;
					this.goingRight=!this.goingRight;
					this.timer-=20;
      				}
      				if (collisionBetween(latoSopra, level[i])) { //collisione y top
					this.y = level[i].y+level[i].height;
      					this.yv = 0;
				}
      				if (collisionBetween(latoSotto, level[i])) { //collisione y bottom
					this.y = level[i].y-this.height;
      					this.yv = 0;
					var randJumping=Math.floor(Math.random()*70);
					if(randJumping==1){
						this.yv = -this.jumpHeight; //jump
					}
      				}
      			}
      		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=9;
		switch(this.stance.timer){
			case 0: this.stance.x=0; break;
			case maxTimer: this.stance.x=1; break;
			case 2*maxTimer: this.stance.timer=-1; break;
		}
		if(previousStance==this.stance.x){
			this.stance.timer++;
		}
	}//fine di calculateStance()
}//fine di graySkeleton
function newGraySkeletonBone(stanceYP, damageP, xP, yP, xvP, yvP) { //the bone thrown by graySkeleton
      	this.name = "skeletonBone";
	this.letter = "§Bone";
      	this.type = "enemyShot";
      	this.life = 1;
      	this.damage = damageP;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAAXNSR0IArs4c6QAAAlxJREFUWIXVVztuwzAMfSp8oATwoMFbL6E7tGMHHUFDxvgOvkQ2Dx4KtAcSwA4uHdqWFH/kfh4QJDEV6T2+kDYVAugaC20cdY1V/C7j2rjQzzaha+yu3xehi9o4encepSnItx5FVcxE5CKwF0+xwKkCfOuH79o4ynFgap8tZwQdkPhs124ZBpOLOaqNG9wGgJjjUwQd6BqriqqYXdvEXJBjR33rR9nmOMem8RQeOrAHMuvA3c1TFV4v40vdSAr4bOOHPYLMKu9V2vtxktS340PG350f1WCqiRzigCQviacyKWOl6cVIITER2QWEyK+tH15fmoIeiYi20S3IQV6ia6wqbTHURqi4szgQKta95BldY1XICY7tFhAr1hzkGSERQF/cWRyQ7S83eQaL8K0f3VyTAk5VTy7VBXhjoO8aR2Pa1WKZImETCwCAkAAA9zpYkn1t3OaHwEXnfG9OAIg/d42FfP0VJP9CsXlgsiY/qxWIzgMvF4I2iuhGUM8qKeI3Eb2RXc8A3e73jH87D7x+rN0yDCYXc1QbN7gNZJgH1LOaXdvEXJBjR+lGs3lAxqbxFH5kHmBy7Ob1HF4v40vdSAp4/eg3q1cSB8ZZ5b3qt55Hjfk8wGQBABca1WCqiRw2D8isM/Gl84A2imoAL0JITMQh88CU/NZ5QBtFeCAi+zywl7xE11hVv6mhNkLFnXUeyEme0T8NzJ3gWJZ5IFSsueeBqQigL+4sDsj2l5s8g0VcbzS6uSYFXM89uVQXGLIDAJcsTxtJTLtasIjl34IXp8DCjsq+PGdJS/5X88AXbfcuDhURhyUAAAAASUVORK5CYII=";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=stanceYP;
	this.stance["timer"]=0;
      	this.width = 28;
      	this.height = 28;
	this.x = xP-this.width/2;
      	this.y = yP-this.height/2;
      	this.xv = xvP;
      	this.yv = yvP;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.drawImage(this.sprite, 16*this.stance.x, 16*this.stance.y, 16, 16, xdisegnata-3, ydisegnata-3, 16*2, 16*2);
		if(debugMode){ctx.fillStyle="#ffee0080"; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
	      	this.yv += level.gravity/1.5; 
		this.x += -this.xv;
    		this.y += this.yv;
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=4;
		switch(this.stance.timer){
			case 0: this.stance.x=0; break;
			case maxTimer: this.stance.x=1; break;
			case 2*maxTimer: this.stance.x=2; break;
			//case 3*maxTimer: this.stance.x=2; break;
			case 3*maxTimer: this.stance.timer=-1; break;
		}
		if(previousStance==this.stance.x){
			this.stance.timer++;
		}
	}//fine di calculateStance()
}//fine di graySkeletonBone

function newRedSkeleton() { //red skeleton
      	this.name = "red skeleton";
	this.letter = "⧌";
      	this.type = "monster";
      	this.life = 1;
      	this.damageDefault = 1;
      	this.damage = 0;
	this.sprite = new Image();
      	this.sprite.src = " data:image/png;base64,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";
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
      	this.color1 = '#ff3333';
      	this.color2 = '#333333';
      	this.speed = 0.43;
	this.timer=40;
	this.dying=false;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, 16*this.stance.x, 32*this.stance.y, 16, 32, xdisegnata, ydisegnata-1, (16)*2, 32*2);
      		} else {
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, 16*this.stance.x, 32*this.stance.y, 16, 32, -xdisegnata, ydisegnata-1, -(16)*2, 32*2);
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
	this.letter = "K";
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
			if (!this.facingRight) {
      				ctx.drawImage(this.sprite, 16*this.stance.x, 32*this.stance.y, 16, 32, xdisegnata, ydisegnata-1, (16)*2, 32*2);
      			} else {
      				ctx.save(); //salvo il canvas attuale
	      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
	      			ctx.drawImage(this.sprite, 16*this.stance.x, 32*this.stance.y, 16, 32, -xdisegnata, ydisegnata-1, -(16)*2, 32*2);
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
}//fine di armoredKnight

function newSpearKnight() { //spear armored Knight
      	this.name = "spear armored knight";
	this.letter = "Ќ";
      	this.type = "monster";
      	this.life = 6;
      	this.damage = 2;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABACAYAAAC5vjEqAAAAAXNSR0IArs4c6QAABJJJREFUeJztWttt6zAMpQxPlK8gkwTuCsH9TjfIAF4hQSYx0p8OcRfR/XCOzNCibPnRSs49gNGmTkmK4kOkaB73M2nYHy/WNpY+vomuOyJzMPS4n436D5HIgX4xhvjtZMgcjPv7TLmzou9VEIiAuG0s2cb23k9FTvRVC6pqS7eToapud8Ec+ozmIBf6JVGnUc0/sQsw01jkTL+Ar3JGIMohiY8109zpF0Str1Z1nwlnVNX2xUSr2o5mkjP94nE/m9vJ0HVHZBvrGEl/RSaINdPc6RsisiDKAb9FJggJGGKwP16ypl9Kohzm0GYBZARfBvj6+xmi3xM6N/oFCCMlarvBmfJHwufXWdN/lhrWNtZWdfsQkXv4Z9tY97eqtu4zaMjvP+7n7OmTRsz3+BhIAfD4aGVKv3vBGfmYTdyBrOmXROSqXX7avO6I6OnPY7JAlw0+6Y/oEORMv3zcz2Z/NBbEEPFvKskOz/ZB8Du50y+DbxcE30WeaUK7mwKcgkKCYlemAuYrUyjcYAklSRpVbVv61K/DYlAQvZ4mUbNUzGSXAvjwxWARS9CV56CP7/bnnBaK2g8C1nSBodooZmGoySAvfkJJUzGooBCm7Iy0oiWbZLKuAg9tE8bw7QXp28m49CgZLQ0Uk2tiruzeLLaWQmSQ9u0sb5VOxdykwtFzMdlYkmY7lblsS/gKS3Mws4I2NiCk4Fj51Rjk292pC+CCE3WZEbS0nkxMegYPbLBPCVPkL0Cc900g2FAzKWYBckeloPKoEbPLXDlEr5krtIYx8ntdzAfpHmvFKezy2BgklcMVL5XOfx8rv+piIbOPWUAMwNMcTNQGyMPh7aRfMcfK70/zHiDwcRccC1dQCkG170YRFwgpZ4r8pQygQ8yB2IXwegzKxkDBXHB6oSp+ivwl0atPMsGt5sO+9zHgwbS9n5pOq7XO7i7+2ROy1N7YvLQzeJwaK79zMenHYOQjMvQ+FssoqXXhpwUF6cRsjBlqGP0m9sfLb4sw3DDjd99Eyw85pY6ggnCAXLugTBmqgnjtxFsTNDNe5AanIG3GZumUnBtcLTY0Y8MntGzTjY7wn0vNF6YEV2qEZmyI2nfyTpsrZ6muYGooibpzhG0sXdnICBY91LI0B7PZQO5mFGW2gsVwiJOo+z5O4lsM3KOLVf5uzK3lVhC8OJQHRB/4/+2Pl82lfxaD2kArFYHPviCMd7yOwxlpaDRXQ3JK5qMf8sF4CB8tGXowPjI0q8Mfbfxk7bWPgXMxmbGkxcjPPuuRTXlA695dd+3xApU4eLBM6toWvwbsHh8oImE9GDiSg0ealWgDTNqTsgW5dgdSPa+7cHqWZ5xQZ44fMufGkmTaHT7lSEj30RafVIBdAK7U8M0Y/8TdeerozQf5wK1nqydmDbPGX94BvVLDF5zXuCTMBVEWhAp/i30fDdEu9m5dRVVB2tlnq40xDT0FIf6kPr/8U3A96dCXeJr/72IC0pLe1sV4Koeb8WGkd031LxYklcSvmd81JhlS2gq8nNBi1NolRwrVfEHUn9/zHQYx5In374Ik5oNSxj+u8llavCujJQAAAABJRU5ErkJggg==";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=0;
	this.stance["timer"]=0;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=true;
	this.attacking=false;
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
			var mostraSpear=8;
			if(this.attacking){
				mostraSpear=24;
			}
			if (this.facingRight) {
      				ctx.drawImage(this.sprite, 24*this.stance.x, 32*this.stance.y, 16+mostraSpear, 32, xdisegnata, ydisegnata-1, (16+mostraSpear)*2, 32*2);
      			} else {
      				ctx.save(); //salvo il canvas attuale
	      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
	      			ctx.drawImage(this.sprite, 24*this.stance.x, 32*this.stance.y, 16+mostraSpear, 32, -xdisegnata+(mostraSpear*2), ydisegnata-1, -(16+mostraSpear)*2, 32*2);
      				ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      			}
			if(debugMode){ //show attack hitbox and timer
				if(this.attacking){
					disegnaTestoConBordino(this.timer, xdisegnata, ydisegnata, "#000000", "#ffffff");
					var attackHitbox = new rectTest(this.x-(24*2), this.y+(9*2), (24*2), (8*2));
					if(this.facingRight){ attackHitbox.x=this.x+2+this.width;}
					ctx.fillStyle="#00ff0080";
					ctx.fillRect(attackHitbox.x, attackHitbox.y, attackHitbox.width, attackHitbox.height);
				}else{
					var potentialAttack = new rectTest(xdisegnata-(24*2)-this.width/2, ydisegnata+(9*2), ((24+this.width/4)*2), (8*2));
					if(this.facingRight){ potentialAttack.x=xdisegnata+2+this.width;}
					ctx.fillStyle="#ff000080";
					ctx.fillRect(potentialAttack.x, potentialAttack.y, potentialAttack.width, potentialAttack.height);
				}
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
			if(this.attacking){
				this.timer++;
				var attackHitbox = new rectTest(this.x-(24*2), this.y+(9*2), (24*2), (8*2));
				if(this.facingRight){ attackHitbox.x=this.x+2+this.width;}
				attackHitbox["damage"]=this.damage*2;
				if(collisionBetween(attackHitbox, player)){
					player.getHit(attackHitbox.damage);
				}
				if(this.timer>-1){
					this.attacking=false;
				}
			}else{
				//can attack player
				var potentialAttack = new rectTest(this.x-(24*2)-this.width/2, this.y+(9*2), ((24+this.width/4)*2), (8*2));
				if(this.facingRight){ potentialAttack.x=this.x+2+this.width;}
				if(collisionBetween(potentialAttack,player)){ //if can hit the player start the attack
					this.attacking=true;
					this.timer=-45;
				}else{ //if cannat attack, it will move
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
		}else{ nextCollision.x-=this.width;}
      		for (var i = 0; i < level.length; i++){
      			if (collisionBetween(this, level[i])) {
				this.y += -this.yv;
      				this.yv = 0;
      				if (collisionBetween(latoSx, level[i]) || collisionBetween(latoDx, level[i])) { //collisione x
      					this.x -= -this.xv*2.5;
					if(!this.attacking){
						this.facingRight=!this.facingRight;
						this.timer-=20;
					}
      				}

      			}
			if(!nextCollision.collided){
				if(this.attacking || collisionBetween(nextCollision, level[i])){
					nextCollision.collided=true;
				}
			}
      		}
		if(!nextCollision.collided){ //previene la caduta
			this.facingRight=!this.facingRight;
			this.timer-=20;	
		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=11;
		if(this.attacking){
			this.stance.x=0; this.stance.y=1;
			this.stance.timer=0;
		}else{
			this.stance.y=0;
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
		}
	}//fine di calculateStance()
}//fine di spearKnight

function newDragonCannon() { //bone dragon tower/cannon
      	this.name = "dragon cannon";
	this.letter = "ɖ";
      	this.type = "monster";
      	this.life = 16;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,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";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=Math.floor(Math.random()*2);
	this.stance["timer"]=0;
	this.x = 0;
      	this.y = 0;
	this.facingRight=true;
	this.attacking=false;
	this.shootNumber=0;
      	this.width = 30;
      	this.height = 62;
      	this.color1 = '#6b8cff';
      	this.color2 = '#ee0000';
	this.timer=-200-Math.floor(Math.random()*120);//timer for next attack
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
		if(this.stance.timer>-1){
      			ctx.drawImage(this.sprite, 16*this.stance.x, 32*this.stance.y, 16, 32, xdisegnata, ydisegnata-1, (16)*2, 32*2);
		}	
		if(debugMode){ //show attack timer
			disegnaTestoConBordino(this.timer, xdisegnata, ydisegnata, "#000000", "#ffffff");
		}
      	}
      	this.getHit = function (nome, danno) {
      		this.life -= danno;
		this.stance.timer=-6;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.x+this.width/2 > player.x+player.width/2){
			this.facingRight=false;
		}else if(this.x+this.width/2 < player.x+player.width/3){ 
			this.facingRight=true;
		}
		if(this.stance.timer>-1){ //when hit can't do nothing
			if(this.attacking){
				if(this.timer==0){
					if(this.shootNumber>0){
      						var sparo = new newSparo(15, 10);
      						if (this.facingRight) {
		      					sparo.x = this.x + this.width - sparo.width/2;
							sparo.y = this.y+ this.height/2 + sparo.height;
      						} else {
      							sparo.x = this.x - sparo.width/2;
							sparo.y = this.y + sparo.height;
		      				}
	      					sparo.facingRight = this.facingRight;
	      					sparo.type = "enemyShot";
      						sparo.color = this.color2;
      						sparo.damage = this.damage*3;
      						sparo.speed = sparo.speed / 3.5;
		      				entity.push(sparo);
						this.stance.timer=8; //make it red
						this.shootNumber--;
					}
					if(this.shootNumber==0){
						this.attacking=false;
						this.timer=-180-Math.floor(Math.random()*120);//timer for next attack
					}else{
						this.timer=-90;
					}
				}	
				this.timer++;
			}else{
				if(this.timer==0){
					this.shootNumber=2+Math.floor(Math.random()*2);
					this.attacking=true;
				}else{
					this.timer++;
				}
			}
		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		if(this.stance.timer==0){
			this.stance.x=0; //gray
		}else{
			this.stance.x=1; //red
		}
		if(this.stance.timer>0){ this.stance.timer--;}
		if(this.stance.timer<0){ this.stance.timer++;}
	}//fine di calculateStance()
}//fine di dragonCannon 

function newBlackLeopard() { //black leopard
      	this.name = "black leopard";
	this.letter = "ȴ";
      	this.type = "monster";
      	this.life = 1;
      	this.damage = 2;
	this.sprite = new Image();
      	this.sprite.src = " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAQCAYAAADeWHeIAAAAAXNSR0IArs4c6QAAA8VJREFUaIHFWcuR6jAQHL8igA2Cg0IgCAVAIHvg6CMHAiEAB8FhA9CBIDYAqvwO3jbt9kiWvfBeV1EF9khqzU8zorH/iNv1tCjz0Z57M7Pv9tS8cu3D8Zx95/ECD+BVfA7Hc5UeSlxCen5P4fl9iePheLadPsxt/pUbLiG3uZThwPKv4oj98tz72NnuEkeZJDw9vNppGWx0M7PHZzf5vbvEkWOJx8wBFB/tuQ8pb4BXAcoOadgMKzsnC/kRx3OfwnbFp2C92WDsext7zO3xUQO48/0ie2kgLK3N/B6f3egQ9y6vR7OCA7BB/hWwlio7hcEo9jUYaFfgBGc1W6f4ifG7qTJLzshyyn0pe3lQ507hOU8tl90ljny84KU1mj85EiFNjR9S2SsxDp9Fliuwj0/legrgc89s4FrDl8b3+9iNaR7jaxUO5GTBRfl4vz29mz0dTFN9DR/WBdYYZXSQCuhGknPmavo2M7u3cVUUfrenxo55g60xhPItcUDkb12DUXIYzgb6DPrbx84sxcm734IzyHicU8C4GaAERMo+dqNXc8Sw3JooNDO7XU/N7To11pLH8wY91HDQAg/r4lkK8yyDZ/hA1uPLctCVGiKkegcs6QRzTgpWWhdAUKxyAF2YJ+UzUM/BtUeCOoFuZolXSdbjovN74/gdCk3+lJxA2zSew19pjhrnYN7MAfxUxsxsRuB2PWVbMa/Q0QVzRLFhbgNr7wE0wuHRKA6X6gKONiqsGpKd7JfnXGMo1dusdfzhwPPhHiAXJLl2j/kBaF21flGjY333HkAJmg3nFhdiOfz2DFVAKWpoTZ8KVrR2M964kKxJwSaK84y1BJW9t7Fn7pj/3sZZXZJbJwl/dShvntSee83COUdevAcYBam12AIqIKujCU6H9QFs5oM2uuQQs/OPMhG6gEcc+uYtxveA8XAEs2F+3DP8iFWtoRnt8dkVe3yVz6HqImgULqT3dwHR6KU6VM3eZjULFM71nnv/UrRshZcZzKZVfwm8J47wXDbBmBq7ZO8BuG+tbUk0Q5QKqhrA+Ci0mF/uPVfb3v8IqiwYPyRrfo6Ct17hgsN3e2qWbukYGgAoOtGNbeXi3gN45z3Oxlxxgc1wkVLrhbXgM92LHr2X8N4pdpc4eR6STY6HN6PoaNy3l856zQR4V0PAPQK8VI9nbHzt/b3xW53A24Q6JyvGu0J9dyS/C5x5S/uAjlBX2Jf19y7OMmbJGarawFdhSxvI8HhxBQ9ITdB4ay39K/kvwdzg5OrgioMUsfjO7W1pHczxF0nFMERWN/VPAAAAAElFTkSuQmCC";
	this.sprite["larg"]=32;
	this.sprite["alt"]=16;
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
      	this.width = 56;
      	this.height = 32;
      	this.color1 = '#330000';
      	this.color2 = '#ff0000';
      	this.speed = 1.3;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, (xdisegnata-2), ydisegnata, (this.sprite.larg)*2, (this.sprite.alt)*2);
      		} else {
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -(xdisegnata-2), ydisegnata, -(this.sprite.larg)*2, (this.sprite.alt)*2);
      			ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      		}
		if(debugMode){
			ctx.fillStyle="#00ff0080"; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
			if(this.stance.x==0){
			var activatorBox = new rectTest(xdisegnata+this.width/2-3*this.width, ydisegnata-2*this.height, this.width*6, this.height*4);
			ctx.fillStyle="#ffff0080"; ctx.fillRect(activatorBox.x, activatorBox.y, activatorBox.width, activatorBox.height);
			}

		}
      	}
      	this.getHit = function (nome, danno) {
      		this.life -= danno;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.stance.x==0){ //waiting
			if(this.x+this.width/2 > player.x+player.width/2){
				this.facingRight=false;
			}else if(this.x+this.width/2 < player.x+player.width/3){ //3 and not 2 otherwise he will start flipping left and right because of the decimal part of the x coordinate
				this.facingRight=true;
			}
			var activatorBox = new rectTest(this.x+this.width/2-3*this.width, this.y-2*this.height, this.width*6, this.height*4);
			if(collisionBetween(activatorBox, player)){
				this.stance.x=1;
			}
		}else{ //active
			if(this.facingRight){
				this.xv+= -this.speed;
				if(this.x+this.width/2 > player.x+player.width/2+canvasWidth/2){
					this.facingRight=false;
				}
			}else{
				this.xv+= this.speed;
				if(this.x+this.width/2 < player.x+player.width/2-canvasWidth/2){
					this.facingRight=true;
				}
			}
		}
		this.xv = this.xv*level.friction;
		this.x += -this.xv;
	      	this.yv += level.gravity/2; //get level gravity/2
    		this.y += this.yv; //apply gravity
		//level collision
		var latoSx = new rectTest(this.x+1, this.y + this.height/2 - 1, 2, 2);
		var latoDx = new rectTest(this.x+this.width-3, this.y + this.height/2 - 1, 2, 2);
      		for (var i = 0; i < level.length; i++) {
      			if (collisionBetween(this, level[i])) {
				this.y += -this.yv;
      				this.yv = 0;
      				if (collisionBetween(latoSx, level[i]) || collisionBetween(latoDx, level[i])) { //collisione x
      					this.x -= -this.xv;
					this.facingRight=!this.facingRight;
					this.xv = 0;
      				}
      			}
      		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=5;
		if(this.stance.x!=0){
			switch(this.stance.timer){
				case 0: this.stance.x=1; break;
				case maxTimer: this.stance.x=2; break;
				case 3*maxTimer: this.stance.x=3; break;
				case 4*maxTimer: this.stance.timer=-1; break;
			}
			if(previousStance==this.stance.x){
				this.stance.timer++;
			}
		}
	}//fine di calculateStance()
}//fine di blackLeopard

function newAxeArmor() { //axe armor - throw axeArmorAxe()
      	this.name = "axe armor";
	this.letter = "Ǻ";
      	this.type = "monster";
	this.lifeMax = 16;
      	this.life = this.lifeMax;
      	this.damage = 2;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,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";
	this.sprite.larg=22;
	this.sprite.alt=32;
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=Math.floor(Math.random()*2);
	this.stance["timer"]=0;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.canThrow=true;
	this.lowAxe=false;
	this.axeIndex=null;
	this.facingRight=false;
      	this.slope = 0;
      	this.width = 42;
      	this.height = 62;
      	this.color1 = '#cc88fc';
      	this.color2 = '#fcc4fc';
      	this.speed = 0.18;
	this.timer=0;
	this.attackedTimer=0;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(!levelEditor){ //draw boss bar even if not a boss, just for testing and giggles
	      		drawLifeBar(true, (canvasWidth-(136+8)), 8, this.color1, this.life, this.lifeMax, this.color1, this.color2, 6, 5);
		}
		if(this.attackedTimer>-1){
		if (!this.facingRight) {
      				ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, (this.sprite.larg)*2, (this.sprite.alt)*2);
	      		} else {
      				ctx.save(); //salvo il canvas attuale
      				ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
	      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata-1, -(this.sprite.larg)*2, (this.sprite.alt)*2);
      				ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      			}
		}
		if(debugMode){
			disegnaTestoConBordino(this.timer+" "+this.attackedTimer, xdisegnata, ydisegnata, "#000000", "#ffffff");
			ctx.fillStyle="#00ff0080";
			if(this.facingRight){
				ctx.fillRect(xdisegnata+this.width/2, this.y-this.height/2, this.width*6, this.height*2);
				ctx.fillStyle="#ff000080";
				ctx.fillRect(xdisegnata+this.width/2, this.y-this.height/2, this.width*4, this.height*2);
			}else{
				ctx.fillRect(xdisegnata+this.width/2-this.width*6, this.y-this.height/2, this.width*6, this.height*2);
				ctx.fillStyle="#ff000080";
				ctx.fillRect(xdisegnata+this.width/2-this.width*4, this.y-this.height/2, this.width*4, this.height*2);
			}
		}
      	}
      	this.getHit = function (nome, danno) {
		if((this.life-danno)<1){ //make the player exit the level even if not a boss, just for testing and giggles
			disegnaSchermoDiGioco();
	      		drawLifeBar(true, (canvasWidth-(136+8)), 8, this.color1, this.life-danno, this.lifeMax, this.color1, this.color2, 6, 5);
			var exitLevelBlock = new newExitLevelPickup(2);
			exitLevelBlock.x = player.x+player.width/2;
			exitLevelBlock.y = player.y+player.height/2;
			entity.push(exitLevelBlock);
		}
		this.life-=danno;
		this.attackedTimer=-8;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		var throwing=false; var moving=false; var moveForward=false;
		if(this.attackedTimer<0){ //got hit
			this.attackedTimer++;
		}else{
			var maxThrowX=0; //max distance for the axe - i use it when i call newAxeArmorAxe()
			if(this.x+this.width/2 > player.x+player.width/2){ //facing direction
				this.facingRight=false;
				maxThrowX=this.x+this.width/2-this.width*6;
				if(collisionBetween(player, new rectTest(maxThrowX, this.y-this.height/2, this.width*6, this.height*2))){throwing=true;}
				//if(collisionBetween(player, new rectTest(this.x+this.width/2-this.width*4, this.y-this.height/2, this.width*4, this.height*2))){moving=true;}
				if(this.x+this.width/2 < player.x+player.width/2+this.width*4){moving=true;}
				if(!(throwing || moving)){
					if(this.x+this.width/2 > player.x+player.width/2+this.width*6){ moveForward=true;}
				}
			}else if(this.x+this.width/2 < player.x+player.width/3){ //3 and not 2 otherwise the it will start flipping left and right because of the decimal part of the x coordinate
				this.facingRight=true;
				maxThrowX=this.x+this.width/2+this.width*6;
				if(collisionBetween(player, new rectTest(this.x+this.width/2, this.y-this.height/2, this.width*6, this.height*2))){throwing=true;}
				//if(collisionBetween(player, new rectTest(this.x+this.width/2, this.y-this.height/2, this.width*4, this.height*2))){moving=true;}
				if(this.x+this.width/2 > player.x+player.width/2-this.width*4){moving=true;}
				if(!(throwing || moving)){
					if(this.x+this.width/2 < player.x+player.width/2-this.width*6){ moveForward=true;}
				}
			}
			if(throwing && this.timer==0){ //throwing
				if (this.canThrow){
					var altoObasso=this.sprite.alt*Math.floor(Math.random()*2);
					if(altoObasso==this.sprite.alt){ this.lowAxe=true; altoObasso+=this.sprite.alt/2;} //crouch
					var axe = new newAxeArmorAxe(this.stance.y, this.damage*(2.5), this.x+this.width/2, this.y+altoObasso, this.facingRight, indiceDiQuestaEntity, maxThrowX);
					if(this.axeIndex){
						entity.splice(this.axeIndex,1,axe); //sostituisce il vecchio axe con la nuova appena creata
					}else{
						entity.push(axe);
						this.axeIndex=entity.length-1;
					}
					this.canThrow=false;
					this.timer=100;
				}	
			}
			if(this.axeIndex && this.timer==0){ //check if can throw again (only 1 axe should be on screen per axeArmor)
				this.lowAxe=false; //stop crouching
				var myaxe=entity[this.axeIndex];
				if(collisionBetween(this,myaxe) && myaxe.returning){
					myaxe.life=-1;
					this.timer=30;
				}
				if(entity[this.axeIndex].life<1){
					this.canThrow=true;
				}
			}
			if(this.timer>0){this.timer--}
		}
		this.x += -this.xv;
		this.xv = this.xv*level.friction;
	      	this.yv += level.gravity/1.5; //get level gravity
    		this.y += this.yv; //apply gravity
		//collision with level
		var latoSx = new rectTest(this.x, this.y+4, 2, this.height-8);
		var latoDx = new rectTest(this.x+this.width-2, this.y+4, 2, this.height-8);
		var latoSotto = new rectTest(this.x+4, this.y+this.height-2, this.width-8, 2);
		var nextCollision = new rectTest(this.x+this.width/2-2, this.y+this.height-1, 4, 2);
		nextCollision["collided"]=false;
		if(moveForward){
			if(this.facingRight){ nextCollision.x+=this.width;
			} else {	      nextCollision.x-=this.width;}
		}else{
			if(this.facingRight){ nextCollision.x-=this.width;
			} else {	      nextCollision.x+=this.width;}
		}
      		for (var i = 0; i < level.length; i++){ //collision with level
      			if (collisionBetween(this, level[i])) { 
				if (collisionBetween(latoSotto, level[i])) { //collisione y bottom
					this.y = level[i].y-this.height;
					latoSx.y=this.y+4; latoDx.y=this.y+4; //reset y for collisionBoxeses
      					this.yv = 0;
      				}
				if(collisionBetween(latoSx, level[i])){ //collisione x sx
      					this.x = level[i].x+level[i].width;
					this.xv = 0;
      				}else if(collisionBetween(latoDx, level[i])) { //collisione x dx
      					this.x = level[i].x-this.width;
					this.xv = 0;
				}
				if(!nextCollision.collided){
					if(collisionBetween(nextCollision, level[i])){
						nextCollision.collided=true;
					}
				}
      			}
      		}
		if(this.attackedTimer>-1 && !this.lowAxe && nextCollision.collided){ //movement
			if(moving){
				if(this.facingRight){ 
					this.xv+= this.speed;
				}else{
					this.xv+= -this.speed;
				}
			}else if(moveForward){
				if(this.facingRight){ 
					this.xv-= this.speed;
				}else{
					this.xv-= -this.speed;
				}
			}
		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		if(this.xv > 0.3 || this.xv < -0.3 && !this.lowAxe){
			var previousStance = this.stance.x;
			var maxTimer=13;
			switch(this.stance.timer){
				case 0: this.stance.x=0; break;
				case maxTimer: this.stance.x=1; break;
				case 2*maxTimer: this.stance.timer=-1; break;
			}
			if(previousStance==this.stance.x){
				this.stance.timer++;
			}
		}else{
			if(this.lowAxe && this.timer>0 && !this.canThrow){
				this.stance.x=2;
			}else{
				this.stance.x=0;
			}
		}
	}//fine di calculateStance()
}//fine di axeArmor
function newAxeArmorAxe(stanceYP, damageP, xP, yP, facingRightP, armorIndexP, xMaxP){ //axe thrown by axeArmor
      	this.name = "axeArmor Axe";
	this.letter = "ǺAxe";
      	this.type = "enemyShot";
      	this.life = 1;
      	this.damage = damageP;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAA/5JREFUaIHFWDGS4jAQbC16Bo+4wIEDP4Q/EJAQOCB01TogIeAFl/ghBA4c8IQLeIYpXWDGjOUZSfbu7XUE2COpR90aMaZtSkjId7Xrb/343RYWANA2pREDWBwA+LFanP1TuazUn/8rZNvK3W+ADb10v70/EyFbWKctlieNx4bwqwC6uke208f9bhD5rLTTBGTbynWPk7iI+21YbApC5PNdPSHaPU4mKyoXSgKpihDagNh7nHzblMby4K6ukBWVs4VFV/d+LO63QQmSCmj3JfJEjj7/2mKS6JQkeJZynKBmuxh5gFmgbUqT7azr6h4aka+iq/tB8oLKYknQ7Mi/h9YskQeAj9mLpV0k9xRkpR3JSztD6B4nQ2eCL2cOiega8gBgAIwTkez5ginQh2SBGaG6n41F42vj+Av218ZBmySRp1hSs1ZpTH/rnTYA37WlJzQlxCfvE9AOXZ4EiTzFA/ru8w3U1j+zAIF2jw6+NQiRj8EW9l0iBQXGEFIvR1ABhNDhJWGoKFPPaxKmMTULcSLcohLouR8TsrC1hVVPfXqJqkNW6PcEiXz3OJm2KUVyzFrjb9I66EDmRDQ5ZzvruOcpITz5/kH8wR9oaJvSkB2ybaWezj557b2lFYYnIQSJfAy2bUrj11MJ/J4gKSFGnpNO/V8xWehLqdo9QaocKTBcgilXSYlojPySq6xkA36Kh67r/JpNa+KQKtokXSk74iuBrs0h2S8toaHKEbJWaB7NdsvrC6ZJWFohYuOm2DEVKbabWIDjp/oBvx+f7no0/6UfcGg3YQUc2s34eWk/gMeGcMmfwNkh35kf7Qcc2g2uR5PeDzi0m2GxCQiRl/oBl7xyoSR8dz+AyM/6AfvzJy75cLDtz/Nyf2g30X6ARH7/Ikefs+1z1g+IJeG7+gGcPOD1A/KdcTg7DERm8V/G/uxwyZ9qPyCUBM2O/HtIeRJ5QPgzdD2aRXJPwfVoRvKxfsAlf74Uo/cDJKJryAOA5ROR7K9HA7wWTIEjGXWauez2Zzchf2g3EzsAc5/6StDmIjuGyHNbapXG9LfeSQP4u7a2H8DJ+9DsAEx3TTqPKB7QE8A3cHE/gHaPZ3opQuRjsIUF2YErMBWSesV5tAcU+LZD/K8wYagoU89ru8hj/N/Gs4hZabI27316zslTArUSOfYDpF16l5mhOqQkgZMP9QOYtcbfpHX4SeDrms9tJp6nhPDk+wfxB3+goW1KQ3aI9QNCpS5lLgmUhJiKJPIxqP0AX178niApIUaek/5KP0C7J/BDcwlW9QN8ojHyS/sBvg34Kb6kH+CrQKpoq/oBXAl0bQ7JfmkJDVWOtf0AzXar+wGUhBTPLxk3xY6pSLHdX1aIXd8yUYNLAAAAAElFTkSuQmCC";
	this.sprite.larg=16;
	this.sprite.alt=16;
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=stanceYP;
	this.stance["timer"]=0;
      	this.width = 28;
      	this.height = 28;
	this.facingRight=facingRightP;
	this.startingX = xP-this.width/2;
	this.xMax = xMaxP;
	this.returning=false;
	this.armorThrower=armorIndexP;
	this.x = this.startingX;
      	this.y = yP-this.height/2;
      	this.xv = 4;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata-3, ydisegnata-3, this.sprite.larg*2, this.sprite.alt*2);
		if(debugMode){ctx.fillStyle="#ffee0080"; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.facingRight){
			if(this.returning){
				this.x += -this.xv;
			}else{
				this.x += this.xv;
				if(this.x+this.width/2 > this.xMax){this.returning=true;}
			}
		}else{
			if(this.returning){
				this.x += this.xv;
			}else{
				this.x += -this.xv;
				if(this.x+this.width/2 < this.xMax){this.returning=true;}
			}
		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=5;
		switch(this.stance.timer){
			case 0: this.stance.x=0; break;
			case maxTimer: this.stance.x=1; break;
			case 2*maxTimer: this.stance.x=2; break;
			case 3*maxTimer: this.stance.x=3; break;
			case 4*maxTimer: this.stance.timer=-1; break;
		}
		if(previousStance==this.stance.x){
			this.stance.timer++;
		}
	}//fine di calculateStance()
}//fine di axeArmorAxe

function newFleaman() { //fleaman
      	this.name = "fleaman";
	this.letter = "F";
      	this.type = "monster";
      	this.life = 1;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAkRJREFUWIWlVjGO4zAMHBv5RB4QYN9w+cMVVzqdqzxi4WKRJ2zhajsHSJNi/xC/YYE8wNvdE3iFQ5miKFq3GUBITGmGpChbrLCAkKIybDms8cmwhQeiYVyMh1+WAy+YVT4NI74P79jiHGnVmiwxoYk0Spzn+N+Hd2kLWrUmcfQTGmxxtoLIBVLCT4KoNZHB5MeWYUIDGsYkg1J+NmAW8xZbWahaUglf7gjzawAVDeNqpA7I41vOJWoAxNtnHSZJkk5kKTy+5mls8CgDDaP5+hTszFP8UMPcAlUzyxadI8+xMV9tZBYeYeVEB76XsTXHr2HIgIdFtA6RE1D42lmaPL+Ri3JRlkJxk7Jo54D4EFlZSsHcf3ZGwwgelvMtztm3REb8v4Odm/YJDU1oSK2JkNyGfGPJaMUtpnkhW6S3ZdH1bgm5BAdP9gO3+2Lc7ywHfj+wxu9/z7/Hz0ir1uRINbbn+4EyvgzE6Qce0dPtjmq/s4Lw+wGfnwRRa6J8ZpFA4mGd5jV+LmAW+3oBXr4yq7h+EnEtqYh//EzOwtwP3O558jrI5VvOBeZ+QNQtK7BELe1zP+DxNU9h6Qdy9XLIDzzFD5dR7rC0XQ8A+Hg7LoLGVlb7XVgbrV+B2w9IwbbrPdHAdx0buxH1A23XhyHBotruIOoHLE2e38hF0tlPoLghqUyAAMSHyMpSCkbi6VbS9XLC9XLCtbedf7wdeS6LH/cD18vJtLddT23Xk1oToRIi87+/r/hzBMKzsBm8kC3S27Loev8HyE2FbCakFQUAAAAASUVORK5CYII=";
	this.sprite.larg=16;
	this.sprite.alt=16;
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=Math.floor(Math.random()*2);
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=false;
      	this.slope = 0;
      	this.width = 30;
      	this.height = 31;
      	this.color1 = '#ff2288';
      	this.color2 = '#fcc4fc';
	this.jumpHeight = 11;
      	this.speed = 0.6;
	this.timer=-8;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, this.sprite.larg*2, this.sprite.alt*2);
      		} else {
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata-1, -this.sprite.larg*2, this.sprite.alt*2);
      			ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      		}
		if(debugMode){ //show attack timer
			disegnaTestoConBordino(this.timer, xdisegnata, ydisegnata, "#000000", "#ffffff");
		}
      	}
      	this.getHit = function (nome, danno) {
		this.life-=danno;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //also contain calculateStance()
		if(Math.round(this.yv)!=0){ //si muove solo se e' in salto
			if(this.facingRight){ //movement
				this.xv+= -this.speed;
			}else{
				this.xv+= +this.speed;
			}
		}
		this.x += -this.xv;
		this.xv = this.xv*level.friction;
	      	this.yv += level.gravity*1.2; //get level gravity
    		this.y += this.yv; //apply gravity
		//collision with level
		var latoSx = new rectTest(this.x, this.y+4, 2, this.height-8);
		var latoDx = new rectTest(this.x+this.width-2, this.y+4, 2, this.height-8);
		var latoSotto = new rectTest(this.x+4, this.y+this.height-2, this.width-8, 2);
		var latoSopra = new rectTest(this.x+4, this.y, this.width-8, 2);
      		for (var i = 0; i < level.length; i++){
      			if (collisionBetween(this, level[i])) {
      				if (collisionBetween(latoSx, level[i]) || collisionBetween(latoDx, level[i])) { //collisione x
      					this.x -= -this.xv*2.5;
					this.xv = 0;
					this.goingRight=!this.goingRight;
      				}
      				if (collisionBetween(latoSopra, level[i])) { //collisione y top
					this.y = level[i].y+level[i].height;
      					this.yv = 0;
				}
      				if (collisionBetween(latoSotto, level[i])) { //collisione y bottom
					this.y = level[i].y-this.height;
      					this.yv = 0;
					this.xv = 0;
					this.stance.x=0; //standing stance
					if(this.x+this.width/2 > player.x+player.width/2){ //change direction
						this.facingRight=false;
					}else if(this.x+this.width/2 < player.x+player.width/3){
						this.facingRight=true;
					}
					if(this.timer<0){
						this.timer++;
					}else if(this.timer==0){ //jumping
						this.timer=-8;
						this.stance.x=1; //jumping stance
						this.yv = -this.jumpHeight; //jump
						if(Math.floor(Math.random()*4)==1){
							this.yv -= this.jumpHeight/3; //double jump speed
						}
					}
      				}
      			}
      		}
      	}//fine di physics()
}//fine di fleaman

function newVampireBat() { //VampireBat
      	this.name = "vampire bat";
	this.letter = "P";
      	this.type = "monster";
      	this.life = 1;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAAv9JREFUaIHFWEGO6yAMNV8caTaVepKse4g5Qg+RdU8SqZscCYlZNO43LzaYhM5YQjMB+/lhG4c0EEie5hwet0BEOU8zERGFx42IKIi1LsnTnK21I3gfk41o5r9ywJoLiwdiwfhTidrklvHmHIoMDurnC+A9ifI0u3C9wv57qkoNwFHnrU2ziM2rRHs3IvSL551fBW9YAMLjFpBIeFb1sWICURlIT+9gfe5X0j+KFtggF73liNmr2VpVQFQGSG5gI9nk4NW1bIuKcDQrbIiFHdrny2vgs5y3GuUb8+Lj4dXX7P91hU6RrfTN9Xx5jfD8n3HsAVjCaK/OKz2kduSacrQCLAzM+K4iIHumLyWrmn/07d3D6Qpg594ewhnlJigrSMu2J6tF46z0HE3UAEhCDGiWaEfz5GOQp/lUCeMb5M2Fg+vAUTFaNzexXthY+kR609MIeW6Ocl07QnjMqrwsLgUgEGqd/R7nGo4WDAiM9Lfj6x3N67zmsGY0ooGeEPN1+qs8vCU81Cmdq4Y8zfkjn6I9d/GRPmv3CYvPjlBaUo7XGIgopyUREVG8RiKiINa6JC3JzPwRvI/JRjTzXzlgzYXFA7Fg/KmoX4NbxptzKDI4qL/eU/H89R0pLcmF6xX231NVw7xvx6OYw02ziM2rRHs3IvSLZxQNr5jQNqE48xD38CbuMZKc5CDXUVDfU02ip+1/D/BsXgJJkJqtVQVEr0pAcizezXh0LdsikY5mhQ2xsEP79Z7yek+7ZzlvNUp+lvY1Hl59zf7012C8xlAr1fWeaL0n+vqO74xjD+AStuw10Y6irCivDPkcjtcYegJhYOz+t3Rx8+i7duwQY0gAuIw9Z5HJbVnPkrxG3JNV6duzeSlqACQhBrSy29M8+RikJZ0qYQ4ezjNXD46K0bq5ifXCxtInaIaaPfp2+t81QPTVGiYXCYiEauSZgNe5hqMFAwIj/e34ekfzOq85rBkdfYUOEvN1+qs8vCU81Cmdq4a0pM/8HtBzFx/ps3afsPj8AL5PCcPa9CibAAAAAElFTkSuQmCC";
	this.sprite.larg=16;
	this.sprite.alt=16;
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
      	this.height = 31;
      	this.color1 = '#332222';
      	this.color2 = '#aa0000';
      	this.speedX = 0.9;
	this.speedY = 0.05;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, this.sprite.larg*2, this.sprite.alt*2);
      		} else {
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata-1, -this.sprite.larg*2, this.sprite.alt*2);
      			ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      		}
		if(debugMode){
			if(this.stance.x==0){
				var activatorBox = new rectTest(xdisegnata+this.width/2-10*this.width, ydisegnata-this.height, this.width*20, this.height*3);
				ctx.fillStyle="#ffbf0080"; ctx.fillRect(activatorBox.x, activatorBox.y, activatorBox.width, activatorBox.height);
			}
		}
      	}
      	this.getHit = function (nome, danno) {
		this.life-=danno;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //also contain calculateStance()
		if(this.stance.x==0){ //waiting
			if(this.x+this.width/2 > player.x+player.width/2){
				this.facingRight=false;
			}else if(this.x+this.width/2 < player.x+player.width/3){ //3 and not 2 otherwise he will start flipping left and right because of the decimal part of the x coordinate
				this.facingRight=true;
			}
			var activatorBox = new rectTest(this.x+this.width/2-10*this.width, this.y-this.height, this.width*20, this.height*3);
			if(collisionBetween(activatorBox, player)){
				this.stance.x=1; //attivazione
			}
		}else{ //active
			if(this.facingRight){ //movement x
				this.xv+= -this.speedX;
			}else{
				this.xv+= +this.speedX;
			}
			if(this.y+this.height/2<player.y+player.height/2){ //movement y
				this.yv+= -this.speedY;
			}else if(this.y+this.height/2<player.y+player.height/2){
				this.yv+= -this.speedY;
			}
			this.x += -this.xv;
			this.y += -this.yv;
			this.xv = this.xv*level.friction;
			this.yv = this.yv*level.friction;
		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=6;
		if(this.stance.x!=0){
			switch(this.stance.timer){
				case 0: this.stance.x=1; break;
				case maxTimer: this.stance.x=2; break;
				case 2*maxTimer: this.stance.x=3; break;
				case 3*maxTimer: this.stance.timer=-1; break;
			}
			if(previousStance==this.stance.x){
				this.stance.timer++;
			}
		}
	}//fine di calculateStance()
}//fine di fleaman
