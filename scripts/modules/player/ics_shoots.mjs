      function newSparo(larghezza, altezza) { //lo sparo creato dal player
      	this.life = 1;
      	this.active = true;
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	this.facingRight = player.facingRight;
      	if (this.facingRight) {
      		this.x = player.x + player.width + 6;
      	} else {
      		this.x = player.x - 6 - larghezza;
      	}
      	this.xv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = player.y + 9;
      	this.color = player.charge0color;
      	this.speed = 3.9;
      	this.perforation = false;
      	this.canPassWall = false;
      	this.hasPhysics = true;
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		//movimento dello sparo
      		if (this.facingRight) {
      			this.xv -= this.speed;
      		} else {
      			this.xv += this.speed;
      		}
      		this.xv *= level.friction;
      		this.x += -this.xv;
      		//collisione dello sparo con level
      		if (!this.canPassWall) {
      			for (i = 0; i < level.length; i++) {
      				if (collisionBetween(this, level[i])) {
      					this.life = -1;
					break;
      				}
      			}
      		} else {
      			if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
      				this.life = -1;
      			}
      		}
      		//collisione dello sparo con altre entita'
      		if (this.type != "enemyShot") {
      			for (i = 0; i < entity.length; i++) {
      				if (!(i == indiceDiQuestaEntity)) {
      					if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      						if (entity[i].getHit) {
      							entity[i].getHit("sparo", this.damage);
      						}
      						if (!(entity[i].life < 1 && this.perforation)) {
      							this.life = -1;
							break;
      						}
      					}
      				}
      			}
      		}

      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - 1;
      			this.active = false;
      		}
      	}
      }

      function newSparoCharge3(xPassata, yPassata, larghezza, altezza, indicePassato, faceRight, goUp) { //lo sparo creato dal player - carica 3
      	this.index = indicePassato;
      	this.numeroFigli = 5;
      	this.life = 1;
      	this.type = "sparoDelPlayer";
      	this.damage = 4;
      	this.facingRight = faceRight;
      	this.x = xPassata;
      	this.startingX = this.x;
      	this.xv = 0;
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = yPassata;
      	this.startingY = yPassata;
      	this.minY = this.startingY - (this.height);
      	this.maxY = this.startingY + (this.height);
      	this.startingDirection = goUp;
      	this.goingUp = goUp;
      	this.color = player.charge0color;
      	this.speed = 2.5;
      	this.ySpeed = 2.5; //velocita con cui va su e giu
      	this.perforation = true;
      	this.canPassWall = true;
      	this.hasPhysics = true;
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		//movimento x dello sparo
      		if (this.facingRight) {
      			this.xv -= this.speed;
      		} else {
      			this.xv += this.speed;
      		}
      		this.xv *= level.friction;
      		this.x += -this.xv;
      		//movimento y dello sparo
      		if (this.goingUp) {
      			this.yv -= this.ySpeed;
      			if (this.y < this.minY) {
      				this.goingUp = false;
      			}
      		} else {
      			this.yv += this.ySpeed;
      			if (this.y > this.maxY) {
      				this.goingUp = true;
      			}
      		}
      		this.yv *= level.friction;
      		this.y += this.yv;
      		//creazione degli spari figli
      		if (this.index < this.numeroFigli - 1) {
      			if (creaFiglio(this.startingX, this.facingRight, this.x, this.width, this.startingY, this.height, this.index, this.color, this.startingDirection)) {
      				this.index = this.numeroFigli;
      			}
      		}
      		//collisione dello sparo con level
      		if (!this.canPassWall) {
      			for (i = 0; i < level.length; i++) {
      				if (collisionBetween(this, level[i])) {
      					this.life = -1;
					break;
      				}
      			}
      		} else {
      			if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
      				this.life = -1;
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "ostacolo" || entity[i].type == "platform" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("sparoCh3", this.damage);
      					}
      					if (!(entity[i].life < 1 && this.perforation)) {
      						this.life = -1;
						break;
      					}
      				}
      			}
      		}
      		//non c'e' nessun activeShot-- perche' il counter lo altera lo sparoInvisibile

      		function creaFiglio(startingX, facingRight, x, width, startingY, height, index, color, startingDirection) {
      			var xMax = startingX;
      			if (facingRight) {
      				if (((x) - (width)) > xMax) {
      					var sparoFiglio = new newSparoCharge3((x - width), startingY, width, height, index + 1, facingRight, startingDirection);
      					sparoFiglio.color = color;
      					entity.push(sparoFiglio);
      					return true;
      				}
      			} else {
      				if (x + (width) < (xMax)) {
      					var sparoFiglio = new newSparoCharge3((x + (width)), startingY, width, height, index + 1, facingRight, startingDirection);
      					sparoFiglio.color = color;
      					entity.push(sparoFiglio);
      					return true;
      				}
      			}
      			return false;
      		} //fine di crea figlio
      	} //fine di this.physics      
      }

      function newHomingMissle(larghezza, altezza, color1Pass, color2Pass, pesoShot) { //lo sparo creato dal player
      	this.life = 1;
      	this.active = true;
      	this.activeShotCounter = pesoShot;
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	if (player.facingRight) {
      		this.x = player.x + player.width + 6;
      		this.xv = 3;
      	} else {
      		this.x = player.x - 6 - larghezza;
      		this.xv = -3;
      	}
      	this.speed = 1.3;
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = player.y + 9;
      	this.targetIndex = -1;
      	this.color1 = color1Pass;
      	this.color2 = color2Pass;
      	this.perforation = false;
      	this.canPassWall = true;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.fillStyle = this.color1;
      		ctx.beginPath();
      		ctx.lineWidth = 1;
      		var larghezzaMissile = this.width / 2;
      		var velMin = 3;
      		if (this.xv < velMin && this.xv > -velMin && this.yv > velMin) { //dritto verso l'alto
      			baseMissileVerticale((xdisegnata), (ydisegnata), (this.width), (this.height), (larghezzaMissile), (larghezzaMissile));
      			ctx.fillStyle = this.color2;
      			ctx.fillRect(xdisegnata + this.width / 2 + larghezzaMissile / 2 - 1, ydisegnata + larghezzaMissile + 2, 2, larghezzaMissile - 1);
      			ctx.fillRect(xdisegnata + this.width / 2 - larghezzaMissile / 2 - 1, ydisegnata + larghezzaMissile + 2, 2, larghezzaMissile - 1);
      		} else if (this.xv < velMin && this.xv > -velMin && this.yv < velMin) { //dritto verso il basso
      			baseMissileVerticale((xdisegnata), (ydisegnata + this.height), (this.width), (-this.height), (larghezzaMissile), (-larghezzaMissile));
      			ctx.fillStyle = this.color2;
      			ctx.fillRect(xdisegnata + this.width / 2 + larghezzaMissile / 2 - 1, ydisegnata - 1, 2, larghezzaMissile - 1);
      			ctx.fillRect(xdisegnata + this.width / 2 - larghezzaMissile / 2 - 1, ydisegnata - 1, 2, larghezzaMissile - 1);
      		} else if (this.yv < velMin && this.yv > -velMin && this.xv > velMin) { //dritto a destra
      			baseMissileLaterale((xdisegnata), (ydisegnata), (this.width), (this.height), (larghezzaMissile), (larghezzaMissile), this.color2);
      			ctx.fillStyle = this.color2;
      			ctx.fillRect(xdisegnata - 1, ydisegnata + this.height / 2 - larghezzaMissile / 2 - 1, larghezzaMissile - 1, 2);
      			ctx.fillRect(xdisegnata - 1, ydisegnata + this.height / 2 + larghezzaMissile / 2 - 1, larghezzaMissile - 1, 2);
      		} else if (this.yv < velMin && this.yv > -velMin && this.xv < velMin) { //dritto a sinistra
      			baseMissileLaterale((xdisegnata + this.width), (ydisegnata), (-this.width), (this.height), (-larghezzaMissile), (larghezzaMissile));
      			ctx.fillStyle = this.color2;
      			ctx.fillRect(xdisegnata + this.width - larghezzaMissile + 2, ydisegnata + this.height / 2 - larghezzaMissile / 2 - 1, larghezzaMissile - 1, 2);
      			ctx.fillRect(xdisegnata + this.width - larghezzaMissile + 2, ydisegnata + this.height / 2 + larghezzaMissile / 2 - 1, larghezzaMissile - 1, 2);
      		} else if (this.xv > velMin && this.yv > velMin) { //verso l'alto e destra
      			baseMissileDiagonale((xdisegnata), (ydisegnata), (this.width), (this.height), (larghezzaMissile), (larghezzaMissile));
      			ctx.beginPath();
      			ctx.lineWidth = 2;
      			ctx.strokeStyle = this.color2;
      			ctx.moveTo(xdisegnata - 1, ydisegnata + this.height - larghezzaMissile + 1);
      			ctx.lineTo(xdisegnata + larghezzaMissile - 1, ydisegnata + this.height - larghezzaMissile - larghezzaMissile / 2 - 2);
      			ctx.moveTo(xdisegnata + larghezzaMissile - 1, ydisegnata + this.height + 1);
      			ctx.lineTo(xdisegnata + larghezzaMissile * 2 - 1, ydisegnata + this.height - larghezzaMissile / 2 - 2);
      			ctx.stroke();
      		} else if (this.xv < velMin && this.yv > velMin) { //verso l'alto e sinistra
      			baseMissileDiagonale((xdisegnata + this.width), (ydisegnata), (-this.width), (this.height), (-larghezzaMissile), (larghezzaMissile));
      			ctx.beginPath();
      			ctx.lineWidth = 2;
      			ctx.strokeStyle = this.color2;
      			ctx.moveTo(xdisegnata + this.width - larghezzaMissile + 1, ydisegnata + this.height + 1);
      			ctx.lineTo(xdisegnata + this.width - larghezzaMissile - larghezzaMissile / 2 - 1, ydisegnata + this.height - larghezzaMissile / 2 - 1);
      			ctx.moveTo(xdisegnata + this.width + 1, ydisegnata + this.height - larghezzaMissile + 1);
      			ctx.lineTo(xdisegnata + this.width - larghezzaMissile / 2 - 1, ydisegnata + this.height - larghezzaMissile - larghezzaMissile / 2 - 1);
      			ctx.stroke();
      		} else if (this.xv < velMin && this.yv < velMin) { //verso il basso e sinistra
      			baseMissileDiagonale((xdisegnata + this.width), (ydisegnata + this.height), (-this.width), (-this.height), (-larghezzaMissile), (-larghezzaMissile));
      			ctx.beginPath();
      			ctx.lineWidth = 2;
      			ctx.strokeStyle = this.color2;
      			ctx.moveTo(xdisegnata + this.width - larghezzaMissile + 1, ydisegnata - 1);
      			ctx.lineTo(xdisegnata + this.width - larghezzaMissile - larghezzaMissile / 2 - 1, ydisegnata + larghezzaMissile - 2);
      			ctx.moveTo(xdisegnata + this.width + 1, ydisegnata + larghezzaMissile - 1);
      			ctx.lineTo(xdisegnata + this.width - larghezzaMissile / 2 - 1, ydisegnata + larghezzaMissile + larghezzaMissile / 2 + 1);
      			ctx.stroke();
      		} else if (this.xv > velMin && this.yv < velMin) { //verso il basso e destra
      			baseMissileDiagonale((xdisegnata), (ydisegnata + this.height), (this.width), (-this.height), (larghezzaMissile), (-larghezzaMissile));
      			ctx.beginPath();
      			ctx.lineWidth = 2;
      			ctx.strokeStyle = this.color2;
      			ctx.moveTo(xdisegnata - 1, ydisegnata + this.height - larghezzaMissile - 1);
      			ctx.lineTo(xdisegnata + larghezzaMissile / 2 + 1, ydisegnata + this.height - larghezzaMissile + larghezzaMissile / 2 + 1);
      			ctx.moveTo(xdisegnata + larghezzaMissile - 1, ydisegnata - 1);
      			ctx.lineTo(xdisegnata + larghezzaMissile + larghezzaMissile / 2 + 1, ydisegnata + larghezzaMissile / 2 + 1);
      			ctx.stroke();
      		}

      		function baseMissileVerticale(xdisegnata, ydisegnata, width, height, larghezzaMissile, altezzaMissile) {
      			ctx.moveTo(xdisegnata + width / 2, ydisegnata);
      			ctx.lineTo(xdisegnata + width / 2 + larghezzaMissile / 2, ydisegnata + altezzaMissile);
      			ctx.lineTo(xdisegnata + width / 2 + larghezzaMissile / 2, ydisegnata + height);
      			ctx.lineTo(xdisegnata + width / 2 - larghezzaMissile / 2, ydisegnata + height);
      			ctx.lineTo(xdisegnata + width / 2 - larghezzaMissile / 2, ydisegnata + altezzaMissile);
      			ctx.lineTo(xdisegnata + width / 2, ydisegnata);
      			ctx.fill();
      		}

      		function baseMissileLaterale(xdisegnata, ydisegnata, width, height, larghezzaMissile, altezzaMissile) {
      			ctx.moveTo(xdisegnata + width, ydisegnata + height / 2);
      			ctx.lineTo(xdisegnata + width - larghezzaMissile, ydisegnata + height / 2 + altezzaMissile / 2);
      			ctx.lineTo(xdisegnata, ydisegnata + height / 2 + altezzaMissile / 2);
      			ctx.lineTo(xdisegnata, ydisegnata + height / 2 - altezzaMissile / 2);
      			ctx.lineTo(xdisegnata + width - larghezzaMissile, ydisegnata + height / 2 - altezzaMissile / 2);
      			ctx.lineTo(xdisegnata + width, ydisegnata + height / 2);
      			ctx.fill();
      		}

      		function baseMissileDiagonale(xdisegnata, ydisegnata, width, height, larghezzaMissile, altezzaMissile) {
      			ctx.moveTo(xdisegnata + width, ydisegnata);
      			ctx.lineTo(xdisegnata + width, ydisegnata + altezzaMissile);
      			ctx.lineTo(xdisegnata + larghezzaMissile, ydisegnata + height);
      			ctx.lineTo(xdisegnata, ydisegnata + height - altezzaMissile);
      			ctx.lineTo(xdisegnata + width - larghezzaMissile, ydisegnata);
      			ctx.lineTo(xdisegnata + width, ydisegnata);
      			ctx.fill();
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		//movimento dello sparo
      		if (this.targetIndex == -1) {
      			this.targetIndex = findTarget(this.x + this.width / 2, this.y + this.height / 2);
      			if (this.xv < 0) {
      				this.xv -= this.speed
      			} else {
      				this.xv += this.speed
      			}
      		} else {
      			if (entity[this.targetIndex].life > 0) { //insegue il target
      				if (this.x < entity[this.targetIndex].x + (entity[this.targetIndex].width / 2)) {
      					this.xv += this.speed;
      				} else {
      					this.xv -= this.speed;
      				}
      				if (this.y < entity[this.targetIndex].y + (entity[this.targetIndex].height / 2)) {
      					this.yv -= this.speed / (1.5);
      				} else {
      					this.yv += this.speed / (1.5);
      				}
      			} else {
      				this.targetIndex = -1;
      			}
      		}
      		this.xv *= level.friction;
      		this.x += this.xv;
      		this.yv *= level.friction;
      		this.y += -this.yv;
      		//collisione dello sparo con level
      		if (!this.canPassWall) {
      			for (i = 0; i < level.length; i++) {
      				if (collisionBetween(this, level[i])) {
      					this.life = -1;
					break;
      				}
      			}
      		} else {
      			if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
      				this.life = -1;
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("missle", this.damage);
      					}
      					if (!(entity[i].life < 1 && this.perforation)) {
      						this.life = -1;
						break;
      					}
      				}
      			}
      		}
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - this.activeShotCounter;
      			this.active = false;
      		}

      		function findTarget(x, y) {
      			var closestEntityX = 999999999999;
      			var closestEntityY = 999999999999;
      			var closestEntityIndex = -1;
      			for (i = 0; i < entity.length; i++) {
      				if (entity[i].life > 0) {
      					if (entity[i].type == "mostro" || entity[i].type == "monster") {
      						if (((entity[i].x < x && entity[i].x > x - canvasWidth / 1.25) || (entity[i].x > x && entity[i].x < x + canvasWidth / 1.25)) && ((entity[i].y < y && entity[i].y > y - canvasHeight / 1.25) || (entity[i].y > y && entity[i].y < y + canvasHeight / 1.25))) { //se e' circa nello schermo
      							var entX = entity[i].x + entity[i].width / 2;
      							var entY = entity[i].y + entity[i].height / 2;
      							prevDistanceX = x - closestEntityX;
      							if (prevDistanceX < 0) {
      								prevDistanceX = -1 * prevDistanceX;
      							}
      							prevDistanceY = y - closestEntityY;
      							if (prevDistanceY < 0) {
      								prevDistanceY = -1 * prevDistanceY;
      							}
      							distanceX = x - entX;
      							if (distanceX < 0) {
      								distanceX = -1 * distanceX;
      							}
      							distanceY = y - entY;
      							if (distanceY < 0) {
      								distanceY = -1 * distanceY;
      							}
      							if ((distanceX + distanceY) < (prevDistanceX + prevDistanceY)) {
      								closestEntityX = entX;
      								closestEntityY = entY;
      								closestEntityIndex = i;
      							}
      						}
      					}
      				}
      			}
      			return closestEntityIndex;
      		} //fine findTarget
      	} //fine homingMissle physics
      } //fine newHomingMissle      

      function newChameleonSting(larghezza, altezza) { //lo sparo creato dal player - cham sting main
      	this.life = 1;
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	this.facingRight = player.facingRight;
      	if (this.facingRight) {
      		this.x = player.x + player.width + 17;
      	} else {
      		this.x = player.x - 17 - larghezza;
      	}
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = player.y + 7;
      	this.figliY = player.y + 14;
      	this.color = "#b0f000";
      	this.timer = 0;
      	this.growthSpeed = 0.1;
      	this.hasPhysics = true;
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		this.timer++;
      		this.width += this.growthSpeed;
      		this.x -= this.growthSpeed / 2;
      		this.height += this.growthSpeed;
      		this.y -= this.growthSpeed / 2;
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("chameleonCh1", this.damage);
      					}
      					if (!(entity[i].life < 1)) {
      						this.life = -1;
						break;
      					}
      				}
      			}
      		}
      		if (this.timer > 10 && this.life > 0) { //crea figli
      			var sparoFiglio = new newChameleonSting_Figli(this.x, this.figliY, 30, 6, 4, 0, this.facingRight, this.color);
      			entity.push(sparoFiglio);
      			var sparoFiglio = new newChameleonSting_Figli(this.x, this.figliY - 5, 30, 6, 4, 1, this.facingRight, this.color);
      			entity.push(sparoFiglio);
      			var sparoFiglio = new newChameleonSting_Figli(this.x, this.figliY - 1, 30, 6, 4, -1, this.facingRight, this.color);
      			entity.push(sparoFiglio);
      			this.life = -1;
      		}
      	} //fine physics
      } //fine cham sting main
      function newChameleonSting_Figli(xPass, yPass, larghezza, altezza, xSpeedPass, ySpeedPass, facingRightPass, colorPass) { //figli di cham sting
      	this.life = 1;
      	this.active = true;
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	this.facingRight = facingRightPass;
      	this.x = xPass;
      	this.xv = 0;
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = yPass;
      	this.color = colorPass;
      	this.xSpeed = xSpeedPass;
      	this.ySpeed = ySpeedPass;
      	this.perforation = false;
      	this.canPassWall = true;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.strokeStyle = this.color;
      		ctx.beginPath();
      		var larghezzaLinea = 6;
      		ctx.lineWidth = larghezzaLinea;
      		if (this.ySpeed == 0) { //dritto
      			ctx.moveTo(xdisegnata, ydisegnata + this.height / 2 - larghezzaLinea / 2);
      			ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 - larghezzaLinea / 2);
      		} else if ((this.ySpeed > 0.1 && this.facingRight) || (this.ySpeed < -0.1 && !this.facingRight)) {
      			ctx.moveTo(xdisegnata, ydisegnata + this.height);
      			ctx.lineTo(xdisegnata + this.width, ydisegnata);
      		} else if ((this.ySpeed < -0.1 && this.facingRight) || (this.ySpeed > 0.1 && !this.facingRight)) {
      			ctx.moveTo(xdisegnata, ydisegnata);
      			ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height);
      		}
      		ctx.stroke();
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		//movimento dello sparo
      		if (this.facingRight) {
      			this.xv -= this.xSpeed;
      		} else {
      			this.xv += this.xSpeed;
      		}
      		this.xv *= level.friction;
      		this.x += -this.xv;
      		this.yv -= this.ySpeed;
      		this.yv *= level.friction;
      		this.y += this.yv;
      		//collisione dello sparo con level
      		if (!this.canPassWall) {
      			for (i = 0; i < level.length; i++) {
      				if (collisionBetween(this, level[i])) {
      					this.life = -1;
					break;
      				}
      			}
      		} else {
      			if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
      				this.life = -1;
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("chameleonCh1", this.damage);
      					}
      					if (!(entity[i].life < 1 && this.perforation)) {
      						this.life = -1;
						break;
      					}
      				}
      			}
      		}
      		//disattiva counter dei colpi          
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - 1;
      			this.active = false;
      		}
      	}
      }

      function newRollingShield(larghezza, altezza) { //lo sparo creato dal player
      	this.life = 1;
      	this.active = true;
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	this.facingRight = player.facingRight;
      	if (this.facingRight) {
      		this.x = player.x + player.width + 6;
      		this.xv = -10;
      	} else {
      		this.x = player.x - 6 - larghezza;
      		this.xv = 10;
      	}
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = player.y;
      	this.color = "#2860b8";
      	this.speed = 2;
      	this.rotation = 0;
      	this.isInWater = false;
      	this.canBounce = true;
      	this.perforation = false;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.fillStyle = this.color;
      		ctx.beginPath();
      		ctx.lineWidth = 1;
      		if (this.rotation < 5) {
      			var lungLato = this.width / 2;
      			ctx.moveTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
      			ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata);
      			ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 - lungLato / 2);
      			ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 + lungLato / 2);
      			ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata + this.height);
      			ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata + this.height);
      			ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 + lungLato / 2);
      			ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 - lungLato / 2);
      			ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
      			ctx.fill();
      		} else {
      			ctx.moveTo(xdisegnata + this.width / 2, ydisegnata);
      			ctx.lineTo(xdisegnata + this.width - this.width / 4, ydisegnata + this.height / 8);
      			ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2);
      			ctx.lineTo(xdisegnata + this.width - this.width / 4, ydisegnata + this.height - this.height / 8);
      			ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height);
      			ctx.lineTo(xdisegnata + this.width / 4, ydisegnata + this.height - this.height / 8);
      			ctx.lineTo(xdisegnata, ydisegnata + this.height / 2);
      			ctx.lineTo(xdisegnata + this.width / 4, ydisegnata + this.height / 8);
      			ctx.lineTo(xdisegnata + this.width / 2, ydisegnata);
      			ctx.fill();
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		this.rotation++;
      		if (this.rotation > 10) {
      			this.rotation = 0;
      		} //animazione rotazione
      		//movimento dello sparo
      		if (this.facingRight) {
      			this.xv -= this.speed;
      		} else {
      			this.xv += this.speed;
      		}
      		this.xv *= level.friction;
      		this.x += -this.xv;
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
      		if (this.yv > 19) {
      			this.yv = 19;
      		} //limita la gravita'
      		this.y += this.yv; //apply gravity

      		for (i = 0; i < level.length; i++) { // collision with level
      			if (((this.y + this.height) > level[i].y) && ((this.y + this.height) < level[i].y + 19) && (collisionBetween(this, level[i]))) { //collison verso il basso
      				this.y = level[i].y - this.height - 1;
      				this.yv = this.yv / 2;
      			}
      			if ((((this.x + this.width) > level[i].x) || (this.x < (level[i].x + level[i].width))) && (collisionBetween(this, level[i]))) { //collsion laterale
      				if (this.canBounce) {
      					this.canBounce = false;
      					if (this.facingRight) {
      						this.x = level[i].x - this.width - 1;
      					} else {
      						this.x = level[i].x + level[i].width + 1;
      					}
      					this.xv = 0;
      					this.facingRight = !this.facingRight;
      				} else {
      					this.life = -1;
      				}
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("shieldCh1", this.damage);
      					}
      					if (!(entity[i].life < 1 && this.perforation)) {
      						this.life = -1;
						break;
      					}
      				}
      			}
      		}
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - 3;
      			this.active = false;
      		}
      	} //fine physics
      } //fine rolling shield

      function newRollingShieldCharge3(larghezza, altezza) { //lo sparo creato dal player
      	this.life = 2;
      	this.duration = 700;
      	this.active = true;
      	this.type = "sparoDelPlayer";
      	this.damage = 2;
      	this.width = larghezza;
      	this.height = altezza;
      	this.x = player.x + player.width / 2 - this.width / 2;
      	this.y = player.y + player.height / 2 - this.height / 2;
      	this.color = "#2860b899";
      	this.rotation = 0;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.fillStyle = this.color;
      		ctx.beginPath();
      		ctx.lineWidth = 1;
      		if (this.rotation < 5) {
      			var lungLato = this.width / 2;
      			ctx.moveTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
      			ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata);
      			ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 - lungLato / 2);
      			ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 + lungLato / 2);
      			ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata + this.height);
      			ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata + this.height);
      			ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 + lungLato / 2);
      			ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 - lungLato / 2);
      			ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
      			ctx.fill();
      		} else {
      			ctx.moveTo(xdisegnata + this.width / 2, ydisegnata);
      			ctx.lineTo(xdisegnata + this.width - this.width / 4, ydisegnata + this.height / 8);
      			ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2);
      			ctx.lineTo(xdisegnata + this.width - this.width / 4, ydisegnata + this.height - this.height / 8);
      			ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height);
      			ctx.lineTo(xdisegnata + this.width / 4, ydisegnata + this.height - this.height / 8);
      			ctx.lineTo(xdisegnata, ydisegnata + this.height / 2);
      			ctx.lineTo(xdisegnata + this.width / 4, ydisegnata + this.height / 8);
      			ctx.lineTo(xdisegnata + this.width / 2, ydisegnata);
      			ctx.fill();
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		this.rotation++;
      		if (this.rotation > 10) {
      			this.rotation = 0;
      		} //animazione rotazione
      		//movimento dello sparo
      		this.x = player.x + player.width / 2 - this.width / 2;
      		this.y = player.y + player.height / 2 - this.height / 2;

      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (!(entity[i].life < this.life)) {
      						this.life = -1;
						break;
      					}
      					if (entity[i].getHit) {
      						entity[i].getHit("shieldCh3", this.damage);
      					}
      				}
      			}
      		}
      		//duration
      		this.duration--;
      		if (this.duration < 0) {
      			this.life = -1;
      		}
      		//disattivazione sparo          
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - 3;
      			this.active = false;
      			player.canChangeWeap = true;
      		}
      	} //fine physics
      } //fine rolling shield charge3

      function newFireWave(larghezza, altezza) { //lo sparo creato dal player
      	this.timer = 0;
      	this.life = 1;
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	if (player.facingRight) {
      		this.x = player.x + player.width + 14;
      	} else {
      		this.x = player.x - 8 - larghezza;
      	}
      	this.y = player.y + 9;
      	this.width = larghezza;
      	this.height = altezza;
      	this.color1 = player.power[3].color1;
      	this.color2 = player.power[3].color2;
      	this.inWater = false;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		var numeroFiamme = Math.round((this.width / 10));
      		var fiammeWidth = (this.width / numeroFiamme) - 1;
      		for (i = 0; i < numeroFiamme; i++) {
      			ctx.fillStyle = this.color1;
      			ctx.fillRect(xdisegnata + 1 + i * fiammeWidth, ydisegnata, fiammeWidth - 1, this.height);
      			disegnaFiammella(xdisegnata + 1 + i * fiammeWidth, ydisegnata, fiammeWidth - 1, this.color1);
      			ctx.fillStyle = this.color2;
      			ctx.fillRect(xdisegnata + 3 + i * fiammeWidth, ydisegnata + 2, fiammeWidth - 5, this.height - 4);
      			disegnaFiammella(xdisegnata + 3 + i * fiammeWidth, ydisegnata + 2, fiammeWidth - 5, this.color2);
      		}

      		function disegnaFiammella(x, y, fiammeWidth, color) {
      			ctx.fillStyle = color;
      			ctx.beginPath();
      			ctx.lineWidth = 1;
      			var lato = fiammeWidth / 6;
      			ctx.moveTo(x, y + 1);
      			ctx.lineTo(x + lato, y - lato * 2);
      			ctx.lineTo(x + lato * 2, y + 1);
      			ctx.lineTo(x + lato * 4, y - lato * 4);
      			ctx.lineTo(x + lato * 6, y + 1);
      			ctx.lineTo(x, y + 1);
      			ctx.fill();
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		//movimento(insieme al player)
      		if (player.facingRight) {
      			this.x = player.x + player.width + 14;
      		} else {
      			this.x = player.x - 8 - larghezza;
      		}
      		this.y = player.y + 9;
      		if (this.y > level.waterLevel) { //determina se sei in acqua o no
      			this.inWater = true;
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("fireCh1", this.damage);
      					}
      				}
      			}
      		}
      		if (keys[sparokey] && !this.inWater && player.power[3].usage > 0 && player.activePower == 4 && (player.carica < 150 || !armaturaAcquired[2])) {
      			if (this.timer == 40) {
      				player.power[3].usage--;
      				this.timer = 0;
      			} else {
      				this.timer++;
      			}
      		} else {
      			this.life = -1;
      			player.activeShot = player.activeShot - 3;
      		}
      	}
      }

      function newFireWaveCharge3Main(larghezza, altezza) { //lo sparo creato dal player
      	this.life = 1;
      	this.active = true;
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	this.facingRight = player.facingRight;
      	if (this.facingRight) {
      		this.x = player.x + player.width + 6;
      		this.xv = -1;
      	} else {
      		this.x = player.x - 6 - larghezza;
      		this.xv = 1;
      	}
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = player.y;
      	this.color1 = player.power[3].color1;
      	this.color2 = player.power[3].color2;
      	this.speed = 1;
      	this.perforation = true;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		var numeroFiamme = 1;
      		var fiammeWidth = (this.width / numeroFiamme) - 1;
      		for (i = 0; i < numeroFiamme; i++) {
      			ctx.fillStyle = this.color1;
      			ctx.fillRect(xdisegnata + 1 + i * fiammeWidth, ydisegnata, fiammeWidth - 1, this.height);
      			disegnaFiammella(xdisegnata + 1 + i * fiammeWidth, ydisegnata, fiammeWidth - 1, this.color1);
      			ctx.fillStyle = this.color2;
      			ctx.fillRect(xdisegnata + 3 + i * fiammeWidth, ydisegnata + 2, fiammeWidth - 5, this.height - 4);
      			disegnaFiammella(xdisegnata + 3 + i * fiammeWidth, ydisegnata + 2, fiammeWidth - 5, this.color2);
      		}

      		function disegnaFiammella(x, y, fiammeWidth, color) {
      			ctx.fillStyle = color;
      			ctx.beginPath();
      			ctx.lineWidth = 1;
      			var lato = fiammeWidth / 6;
      			ctx.moveTo(x, y + 1);
      			ctx.lineTo(x + lato, y - lato * 2);
      			ctx.lineTo(x + lato * 2, y + 1);
      			ctx.lineTo(x + lato * 4, y - lato * 4);
      			ctx.lineTo(x + lato * 6, y + 1);
      			ctx.lineTo(x, y + 1);
      			ctx.fill();
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		//movimento dello sparo
      		if (this.facingRight) {
      			this.xv -= this.speed;
      		} else {
      			this.xv += this.speed;
      		}
      		this.xv *= level.friction;
      		this.x += -this.xv;
      		var gravityApplicata = 0;
      		var frizioneApplicata = 0;
      		if (this.y > level.waterLevel) { //determina se sei in acqua o no
      			this.life = -1;
      		}
      		this.yv += level.gravity;
      		if (this.yv > 19) {
      			this.yv = 19;
      		} //limita la gravita'
      		this.y += this.yv; //apply gravity

      		for (i = 0; i < level.length; i++) { //y collision with level
      			if (((this.y + this.height) > level[i].y) && ((this.y + this.height) < level[i].y + 19) && (collisionBetween(this, level[i]))) { //collison verso il basso
      				this.y = level[i].y - this.height - 0.2;
      				var sparofiglio = new newFireWaveCharge3Figli(this.x, this.y, this.width, this.height, 4, this.facingRight);
      				sparofiglio.active = true;
      				entity.push(sparofiglio);
      				this.life = -1;
      				this.active = false;
      			}
      			if ((((this.x + this.width) > level[i].x) || (this.x < (level[i].x + level[i].width))) && (collisionBetween(this, level[i]))) { //collsion laterale
      				this.life = -1;
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("fireCh3", this.damage);
      					}
      					if (!(entity[i].life < 1 && this.perforation)) {
      						this.life = -1;
						break;
      					}
      				}
      			}
      		}
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - 3;
      			this.active = false;
      		}
      	} //fine physics
      } //fine firewave charge3 main
      function newFireWaveCharge3Figli(xPass, yPass, larghezza, altezza, indicePass, facingPass) {
      	this.life = 1;
      	this.indice = indicePass;
      	this.active = false;
      	this.type = "sparoDelPlayer";
      	this.damage = 2;
      	this.facingRight = facingPass;
      	this.appoggiatoInBasso = false;
      	this.x = xPass;
      	this.y = yPass;
      	this.startingY = this.y;
      	this.width = larghezza;
      	this.height = altezza;
      	this.startingHeight = this.height;
      	this.color1 = player.power[3].color1;
      	this.color2 = player.power[3].color2;
      	this.speed = 1;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		var numeroFiamme = Math.floor(this.height / this.startingHeight);
      		var fiammeWidth = this.width - 1;
      		for (i = 1; i < numeroFiamme + 1; i++) {
      			ctx.fillStyle = this.color1;
      			ctx.fillRect(xdisegnata + 1, ydisegnata + this.height - (this.startingHeight * i), fiammeWidth - 1, this.startingHeight);
      			disegnaFiammella(xdisegnata + 1, ydisegnata + this.height - (this.startingHeight * i), fiammeWidth - 1, this.color1);
      			ctx.fillStyle = this.color2;
      			ctx.fillRect(xdisegnata + 3, ydisegnata + 2 + this.height - (this.startingHeight * i), fiammeWidth - 5, this.startingHeight - 4);
      			disegnaFiammella(xdisegnata + 3, ydisegnata + 2 + this.height - (this.startingHeight * i), fiammeWidth - 5, this.color2);
      		}

      		function disegnaFiammella(x, y, fiammeWidth, color) {
      			ctx.fillStyle = color;
      			ctx.beginPath();
      			ctx.lineWidth = 1;
      			var lato = fiammeWidth / 6;
      			ctx.moveTo(x, y + 1);
      			ctx.lineTo(x + lato, y - lato * 2);
      			ctx.lineTo(x + lato * 2, y + 1);
      			ctx.lineTo(x + lato * 4, y - lato * 4);
      			ctx.lineTo(x + lato * 6, y + 1);
      			ctx.lineTo(x, y + 1);
      			ctx.fill();
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		this.height += this.startingHeight / 4;
      		this.y -= this.startingHeight / 4;
      		this.appoggiatoInBasso = false;
      		for (i = 0; i < level.length; i++) { //y collision with level
      			this.height += 1;
      			if (((this.y + this.height) > level[i].y) && ((this.y + this.height) < level[i].y + 19) && (collisionBetween(this, level[i]))) { //collison verso il basso
      				this.height -= 1;
      				this.appoggiatoInBasso = true;
      				if (this.height == this.startingHeight * 4) {
      					if (this.facingRight) {
      						var sparofiglio = new newFireWaveCharge3Figli(this.x + this.width + 1, this.startingY, this.width, this.startingHeight, -1, this.facingRight);
      						sparofiglio.active = this.active;
      						entity.push(sparofiglio);
      					} else {
      						var sparofiglio = new newFireWaveCharge3Figli(this.x - this.width - 1, this.startingY, this.width, this.startingHeight, -1, this.facingRight);
      						sparofiglio.active = this.active;
      						entity.push(sparofiglio);
      					}
      					this.life = -1;
      					this.active = false;
      					if (this.indice > 1) {
      						var sparofiglio = new newFireWaveCharge3Figli(this.x, this.startingY, this.width, this.startingHeight, this.indice - 1, this.facingRight);
      						entity.push(sparofiglio);
      						this.indice = -1;
      					}
      				}
      				this.height += 1;
      			}
      			this.height -= 1;
      			if ((((this.x + this.width) > level[i].x) || (this.x < (level[i].x + level[i].width))) && (collisionBetween(this, level[i]))) { //collsion laterale
      				this.life = -1;
      			}
      		}
      		if (!this.appoggiatoInBasso) {
      			this.life = -1;
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("fireCh3", this.damage);
      					}
      				}
      			}
      		}
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - 3;
      			this.active = false;
      		}
      	} //fine physics
      } //fine firewave ch3 figlio  

      function newStormTornado(xPassata, yPassata, larghezza, altezza, indicePassato, faceRight, goUp) { //lo sparo creato dal player - carica 3
      	this.index = indicePassato;
      	this.active = true;
      	this.main = false;
      	this.contaLife = 0;
      	this.facingRight = faceRight;
      	if (indicePassato == 0) {
      		if (goUp) { //individua il main
      			this.main = true;
      		}
      		if (this.facingRight) {
      			this.x = xPassata + player.width + 6;
      		} else {
      			this.x = xPassata - 6 - larghezza;
      		}
      	} else {
      		this.x = xPassata;
      	}
      	this.startingX = this.x;
      	this.numeroFigli = 40;
      	this.life = 1;
      	this.type = "sparoDelPlayer";
      	this.damage = 2;
      	this.xv = 0;
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = yPassata;
      	this.startingY = yPassata;
      	this.minY = this.startingY - (this.height / 4);
      	this.maxY = this.startingY + (this.height / 4);
      	this.minX = this.startingX - (this.width);
      	this.maxX = this.startingX + (this.width);
      	this.startingDirection = goUp;
      	this.goingUp = goUp;
      	this.moveNext = faceRight;
      	this.color = "#f5aad5";
      	this.speed = 0.5;
      	this.xSpeed = 1;
      	this.ySpeed = 0.5; //velocita con cui va su e giu
      	this.perforation = true;
      	this.canPassWall = true;
      	this.hasPhysics = true;
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		this.speed += 0.0012;
      		//movimento x dello sparo
      		if (this.facingRight) {
      			this.xv -= this.speed;
      		} else {
      			this.xv += this.speed;
      		}
      		this.xv *= level.friction;
      		this.x += -this.xv;
      		//movimento y dello sparo
      		if (this.goingUp) {
      			this.yv -= this.ySpeed;
      			if (this.facingRight) {
      				this.xv -= this.xSpeed / 2;
      			} else {
      				this.xv += this.xSpeed / 2;
      			}
      			if (this.y < this.minY) {
      				this.goingUp = false;
      			}
      		} else {
      			this.yv += this.ySpeed;
      			if (this.facingRight) {
      				this.xv += this.xSpeed;
      			} else {
      				this.xv -= this.xSpeed;
      			}
      			if (this.y > this.maxY) {
      				this.goingUp = true;
      			}
      		}
      		this.yv *= level.friction;
      		this.y += this.yv;
      		this.xv *= level.friction;
      		this.x += -this.xv;
      		//creazione degli spari figli
      		if (this.index < this.numeroFigli - 1) {
      			if (creaFiglio(this.startingX, this.facingRight, this.x, this.width, this.startingY, this.height, this.index, this.color, this.startingDirection, this.speed)) {
      				this.index = this.numeroFigli;
      			}
      		}
      		//collisione dello sparo con level
      		if (!this.canPassWall) {
      			for (i = 0; i < level.length; i++) {
      				if (collisionBetween(this, level[i])) {
      					this.life = -1;
					break;
      				}
      			}
      		} else {
      			if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
      				this.life = -1;
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "ostacolo" || entity[i].type == "platform" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("stormCh1", this.damage);
      					}
      					this.damage = 0;
      				}
      			}
      		}
      		if (this.contaLife > 420) {
      			this.life = -1;
      		}
      		this.contaLife++;

      		if (this.main) {
      			//disattiva colpi su schermo
      			if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      				player.activeShot = player.activeShot - 3;
      				this.active = false;
      			}
      		}

      		function creaFiglio(startingX, facingRight, x, width, startingY, height, index, color, startingDirection, velocita) {
      			var xMax = startingX;
      			if (facingRight) {
      				if (((x) - (width)) > xMax) {
      					var sparoFiglio = new newStormTornado((x - width), startingY, width, height, index + 1, facingRight, startingDirection);
      					sparoFiglio.color = color;
      					sparoFiglio.speed = velocita;
      					entity.push(sparoFiglio);
      					return true;
      				}
      			} else {
      				if (x + (width) < (xMax)) {
      					var sparoFiglio = new newStormTornado((x + (width)), startingY, width, height, index + 1, facingRight, startingDirection);
      					sparoFiglio.color = color;
      					sparoFiglio.speed = velocita;
      					entity.push(sparoFiglio);
      					return true;
      				}
      			}
      			return false;
      		} //fine di crea figlio
      	} //fine di this.physics      
      }

      function newStormTornadoCharge3(xPass, yPass, larghezza, altezza, facingRight, durata, main) { //lo sparo creato dal player
      	this.life = 1;
      	this.duration = durata;
      	this.active = main;
      	this.type = "sparoDelPlayer";
      	this.damage = 2;
      	this.facingRight = facingRight;
      	if (this.active) {
      		if (this.facingRight) {
      			this.x = player.x + player.width + 6;
      		} else {
      			this.x = player.x - 6 - larghezza;
      			this.facingRight = true;
      		}
      		this.startingX = this.x;
      	} else {
      		this.startingX = xPass;
      		this.x = xPass;
      	}
      	this.xv = 0;
      	this.xMassima = this.startingX + 1;
      	this.xMinima = this.startingX - 1;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = yPass;
      	this.color = player.power[4].color2 + "99";
      	this.speed = 0.1;
      	this.maxFigli = Math.ceil(canvasWidth / (this.height + 1));
      	this.figli = 0;
      	this.hasPhysics = true;
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		//movimento dello sparo
      		if (this.facingRight) {
      			this.xv += this.speed;
      			if (this.x > this.xMassima) {
      				this.facingRight = !this.facingRight
      			}
      		} else {
      			this.xv -= this.speed;
      			if (this.x < this.xMinima) {
      				this.facingRight = !this.facingRight
      			}
      		}
      		this.xv *= level.friction;
      		this.x += this.xv;
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("stormCh3", this.damage);
      					}
      				}
      			}
      		}
      		if (this.active) {
      			this.figli++;
      			if (this.figli < this.maxFigli) {
      				var goRight = false;
      				if (this.figli % 2 == 0) {
      					goRight = true;
      				}
      				var sparoFiglio = new newStormTornadoCharge3(this.startingX, (this.y - this.figli * (this.height + 1)), this.width, this.height, goRight, 0, false);
      				entity.push(sparoFiglio);
      				var sparoFiglio = new newStormTornadoCharge3(this.startingX, (this.y + this.figli * (this.height + 1)), this.width, this.height, goRight, 0, false);
      				entity.push(sparoFiglio);
      			}
      		}
      		this.duration++;
      		if (this.duration > 80) {
      			this.life = -1;
      		}
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - 3;
      			this.active = false;
      		}
      	}
      }

      function newElectricSpark(larghezza, altezza) { //lo sparo creato dal player - electric spark charge 0
      	this.life = 1;
      	this.active = true;
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	this.facingRight = player.facingRight;
      	if (this.facingRight) {
      		this.x = player.x + player.width + 6;
      	} else {
      		this.x = player.x - 6 - larghezza;
      	}
      	this.xv = 0;
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = player.y + 9;
      	this.color = player.charge0color;
      	this.speedX = 2;
      	this.speedY = 0;
      	this.perforation = false;
      	this.canPassWall = false;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.fillStyle = "#f83cf8";
      		ctx.beginPath();
      		ctx.lineWidth = 1;
      		var lungLato = this.width / 4;
      		ctx.moveTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
      		ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata);
      		ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 - lungLato / 2);
      		ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2 + lungLato / 2);
      		ctx.lineTo(xdisegnata + this.width / 2 + lungLato / 2, ydisegnata + this.height);
      		ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata + this.height);
      		ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 + lungLato / 2);
      		ctx.lineTo(xdisegnata, ydisegnata + this.height / 2 - lungLato / 2);
      		ctx.lineTo(xdisegnata + this.width / 2 - lungLato / 2, ydisegnata);
      		ctx.fill();
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (this.facingRight) { //movimento dello sparo
      			this.xv -= this.speedX;
      		} else {
      			this.xv += this.speedX;
      		}
      		this.yv += this.speedY;
      		this.xv *= level.friction;
      		this.yv *= level.friction;
      		this.x += -this.xv;
      		this.y += -this.yv;

      		//collisione dello sparo con level
      		if (!this.canPassWall) {
      			for (i = 0; i < level.length; i++) {
      				if (collisionBetween(this, level[i])) {
      					this.life = -1;
      					if (this.speedX != 0) { //ora genera figli (quindi solo con collisioni con level)
      						var sparoFiglioUp = new newElectricSpark(this.width, this.height);
      						sparoFiglioUp.x = this.x + this.xv / 2;
      						sparoFiglioUp.y = this.y;
      						sparoFiglioUp.canPassWall = true;
      						sparoFiglioUp.active = false;
      						sparoFiglioUp.speedX = 0;
      						sparoFiglioUp.speedY = -this.speedX;
      						entity.push(sparoFiglioUp);
      						var sparoFiglioDown = new newElectricSpark(this.width, this.height);
      						sparoFiglioDown.x = this.x + this.xv / 2;
      						sparoFiglioDown.y = this.y;
      						sparoFiglioDown.canPassWall = true;
      						sparoFiglioDown.active = false;
      						sparoFiglioDown.speedX = 0;
      						sparoFiglioDown.speedY = this.speedX;
      						entity.push(sparoFiglioDown);
      					}
					break;
      				}
      			}
      		} else {
      			if (this.x > level.maxWidth + 100 || this.x < -100) {
      				this.life = -1;
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("electricCh1", this.damage);
      					}
      					if (!(entity[i].life < 1 && this.perforation)) {
      						this.life = -1;
						break;
      					}
      				}
      			}
      		}
      		//disattiva colpi su schermo
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			this.active = false;
      			player.activeShot = player.activeShot - 1;
      		}
      	}
      }

      function newElectricSparkCharge3(xPass, yPass, larghezza, altezza, facingRight) { //lo sparo creato dal player - electric spark charge 3
      	this.life = 1;
      	this.active = facingRight;
      	this.type = "sparoDelPlayer";
      	this.damage = 2;
      	this.facingRight = facingRight;
      	this.x = xPass;
      	this.y = yPass;
      	this.xv = 0;
      	this.width = larghezza;
      	this.height = this.width;
      	this.heightMax = altezza;
      	this.color = player.charge0color;
      	this.speedX = 2;
      	this.canPassWall = true;
      	this.hasPhysics = true;
      	this.color1 = "#f83cf8";
      	this.color2 = "#cb18ff99";
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.fillStyle = this.color2;
      		ctx.fillRect(xdisegnata + this.width / 4, ydisegnata + this.width / 2, this.width / 2, this.height - this.width / 2);
      		drawPalla(xdisegnata, ydisegnata, this.width, this.width, this.color1);
      		drawPalla(xdisegnata, ydisegnata + this.height - this.width / 2, this.width, this.width, this.color1);

      		function drawPalla(xdisegnata, ydisegnata, pallawidth, pallaheight, color) {
      			ctx.fillStyle = color;
      			ctx.beginPath();
      			ctx.lineWidth = 1;
      			var lungLato = pallawidth / 4;
      			ctx.moveTo(xdisegnata + pallawidth / 2 - lungLato / 2, ydisegnata);
      			ctx.lineTo(xdisegnata + pallawidth / 2 + lungLato / 2, ydisegnata);
      			ctx.lineTo(xdisegnata + pallawidth, ydisegnata + pallaheight / 2 - lungLato / 2);
      			ctx.lineTo(xdisegnata + pallawidth, ydisegnata + pallaheight / 2 + lungLato / 2);
      			ctx.lineTo(xdisegnata + pallawidth / 2 + lungLato / 2, ydisegnata + pallaheight);
      			ctx.lineTo(xdisegnata + pallawidth / 2 - lungLato / 2, ydisegnata + pallaheight);
      			ctx.lineTo(xdisegnata, ydisegnata + pallaheight / 2 + lungLato / 2);
      			ctx.lineTo(xdisegnata, ydisegnata + pallaheight / 2 - lungLato / 2);
      			ctx.lineTo(xdisegnata + pallawidth / 2 - lungLato / 2, ydisegnata);
      			ctx.fill();
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (this.height < this.heightMax) {
      			this.height += (this.heightMax / 10);
      			this.y -= (this.heightMax / 20);
      		} else {
      			if (this.facingRight) { //movimento dello sparo
      				this.xv -= this.speedX;
      			} else {
      				this.xv += this.speedX;
      			}
      			this.xv *= level.friction;
      			this.x += -this.xv;
      		}
      		//disattivazione dello sparo fuori dal livello
      		if (this.x > level.maxWidth + 50 || this.x < -50) {
      			this.life = -1;
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("electricCh3", this.damage);
      					}
      				}
      			}
      		}
      		//disattiva colpi su schermo
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			this.active = false;
      			player.activeShot = player.activeShot - 3;
      		}
      	}
      }

      function newBoomerangCutter(larghezza, altezza) { //lo sparo creato dal player
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	this.life = 1;
      	this.active = true;
      	if (player.yv > 0) {
      		this.goUp = false;
      	} else {
      		this.goUp = true;
      	}
      	this.facingRight = player.facingRight;
      	if (this.facingRight) {
      		this.x = player.x + player.width + 6;
      	} else {
      		this.x = player.x - 6 - larghezza;
      	}
      	this.xv = 0;
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = player.y + 9;
      	this.color = player.charge0color;
      	this.speedX = 2.6;
      	this.speedY = 0;
      	this.speedX2 = 0;
      	this.speed = 0;
      	this.entityPickedIndex = -1;
      	this.hitSomething = false;
      	this.perforation = true;
      	this.canPassWall = true;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.strokeStyle = player.power[6].color1;
      		ctx.beginPath();
      		ctx.lineWidth = 8;
      		ctx.moveTo(xdisegnata, ydisegnata);
      		ctx.lineTo(xdisegnata + this.width - (ctx.lineWidth / 2), ydisegnata);
      		ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height - (ctx.lineWidth / 2));
      		ctx.stroke();
      		ctx.lineWidth = 4;
      		ctx.strokeStyle = player.power[6].color2;
      		ctx.stroke();
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		//movimento dello sparo
      		if (this.speedX > 0) {
      			if (this.facingRight) {
      				this.xv -= this.speedX;
      			} else {
      				this.xv += this.speedX;
      			}
      			if (this.goUp) {
      				this.yv += this.speedY;
      			} else {
      				this.yv -= this.speedY;
      			}
      			this.speedX -= 0.2;
      			this.speedY += 0.2;
      		} else if (this.speedY > 0) {
      			if (this.facingRight) {
      				this.xv += this.speedX2;
      			} else {
      				this.xv -= this.speedX2;
      			}
      			if (this.goUp) {
      				this.yv += this.speedY;
      			} else {
      				this.yv -= this.speedY;
      			}
      			this.speedY -= 0.2;
      			this.speedX2 += 0.2;
      		} else if (this.speedX2 > 0) {
      			if (this.facingRight) {
      				this.xv += this.speedX2;
      			} else {
      				this.xv -= this.speedX2;
      			}
      			if (this.goUp) {
      				this.yv -= this.speed;
      			} else {
      				this.yv += this.speed;
      			}
      			this.speedX2 -= 0.2;
      			this.speed += 0.2;
      		} else { //da qui in poi insegue il player
      			if (this.x > player.x + (player.width / 2)) {
      				this.xv += this.speed / 2;
      			} else {
      				this.xv -= this.speed / 2;
      			}
      			if (this.y > player.y + (player.height / 2)) {
      				this.yv += this.speed / 2;
      			} else {
      				this.yv -= this.speed / 2;
      			}
      		}
      		this.xv *= level.friction;
      		this.x += -this.xv;
      		this.yv *= level.friction;
      		this.y += -this.yv;

      		//collisione dello sparo con level
      		if (!this.canPassWall) {
      			for (i = 0; i < level.length; i++) {
      				if (collisionBetween(this, level[i])) {
      					this.life = -1;
					break;
      				}
      			}
      		} else {
      			if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
      				this.life = -1;
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) { //danno ai mostri
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("boomerangCh1", this.damage);
      					}
      					this.hitSomething = true;
      					if (!(entity[i].life < 1 && this.perforation)) {
      						this.life = -1;
						break;
      					}
      				}
      				if (this.entityPickedIndex == -1) { //raccoglie gli oggetti
      					if (entity[i].life > 0 && entity[i].type == "pickup") {
      						if (collisionBetween(this, entity[i])) {
      							this.entityPickedIndex = i;
      							this.hitSomething = true;
      						}
      					}
      				}
      			}
      		}
      		if (this.entityPickedIndex != -1) {
      			entity[this.entityPickedIndex].x = this.x;
      			entity[this.entityPickedIndex].y = this.y;
      		}
      		if (collisionBetween(this, player) && this.speedX < 0.3) {
      			if (!this.hitSomething) {
      				if (player.power[6].usage < player.power[6].usageMax) {
      					player.power[6].usage++;
      				}
      			}
      			this.life = -1;
      		}
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - 1;
      			this.active = false;
      		}
      	}
      }

      function newBoomerangCutterCharge3(larghezza, altezza, indicePassato, facingRightPassato) { //lo sparo creato dal player
      	this.type = "sparoDelPlayer";
      	this.damage = 2;
      	this.indice = indicePassato;
      	this.life = 1;
      	if (this.indice == 0) {
      		this.active = true;
      	}
      	if (this.indice > 1) {
      		this.goUp = false;
      	} else {
      		this.goUp = true;
      	}
      	this.facingRight = facingRightPassato;
      	if (player.facingRight) {
      		this.x = player.x + player.width + 6;
      	} else {
      		this.x = player.x - 6 - larghezza;
      	}
      	this.xv = 0;
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = player.y + 9;
      	this.speedX = 2.4;
      	this.speedY = 0;
      	this.speedX2 = 0;
      	this.speedX3 = 0;
      	this.speed = 0;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.strokeStyle = player.power[6].color1;
      		ctx.beginPath();
      		ctx.lineWidth = 12;
      		ctx.moveTo(xdisegnata, ydisegnata);
      		ctx.lineTo(xdisegnata + this.width - (ctx.lineWidth / 2), ydisegnata);
      		ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height - (ctx.lineWidth / 2));
      		ctx.stroke();
      		ctx.lineWidth = 6;
      		ctx.strokeStyle = player.power[6].color2;
      		ctx.stroke();
      		ctx.lineWidth = 12;
      		ctx.strokeStyle = "#71ff0060";
      		ctx.stroke();
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		//movimento dello sparo
      		if (this.speedX > 0) {
      			if (this.facingRight) {
      				this.xv -= this.speedX;
      			} else {
      				this.xv += this.speedX;
      			}
      			if (this.goUp) {
      				this.yv += this.speedY;
      			} else {
      				this.yv -= this.speedY;
      			}
      			this.speedX -= 0.2;
      			this.speedY += 0.2;
      		} else if (this.speedY > 0) {
      			if (this.facingRight) {
      				this.xv += this.speedX2;
      			} else {
      				this.xv -= this.speedX2;
      			}
      			if (this.goUp) {
      				this.yv += this.speedY;
      			} else {
      				this.yv -= this.speedY;
      			}
      			this.speedY -= 0.2;
      			this.speedX2 += 0.2;
      		} else if (this.speedX2 > 0) {
      			if (this.facingRight) {
      				this.xv += this.speedX2;
      			} else {
      				this.xv -= this.speedX2;
      			}
      			if (this.goUp) {
      				this.yv -= this.speedX3;
      			} else {
      				this.yv += this.speedX3;
      			}
      			this.speedX2 -= 0.2;
      			this.speedX3 += 0.2;
      		} else if (this.speedX3 > 0) {
      			if (this.facingRight) {
      				this.xv -= this.speedX3 / 1.3;
      			} else {
      				this.xv += this.speedX3 / 1.3;
      			}
      			if (this.goUp) {
      				this.yv -= this.speed;
      			} else {
      				this.yv += this.speed;
      			}
      			this.speedX3 -= 0.2;
      			this.speed += 0.2;
      		} else { //da qui in poi esce dallo schermo
      			switch (this.indice) {
      				case 0:
      					this.xv += this.speed / 1.8;
      					this.yv -= this.speed / 2;
      					break;
      				case 1:
      					this.xv -= this.speed / 1.8;
      					this.yv -= this.speed / 2;
      					break;
      				case 2:
      					this.xv += this.speed / 1.8;
      					this.yv += this.speed / 2;
      					break;
      				case 3:
      					this.xv -= this.speed / 1.8;
      					this.yv += this.speed / 2;
      					break;
      			}
      		}
      		this.xv *= level.friction;
      		this.x += -this.xv;
      		this.yv *= level.friction;
      		this.y += -this.yv;

      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("boomerangCh3", this.damage);
      					}
      				}
      			}
      		}

      		//disattivazione quando esce dallo schermo
      		if ((this.x > (player.x + player.width + (canvasWidth * 2))) || (this.x < (player.x - (canvasWidth * 2)))) {
      			this.life = -1;
      		}
      		if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      			player.activeShot = player.activeShot - 3;
      			this.active = false;
      		}
      	}
      }

      function newShotgunIce(xPassataR, xPassataL, yPassata, larghezza, altezza, isPadrePassato, xSpeedPassato, ySpeedPassato, facingRightPassato) { //lo sparo creato dal player - shotgun ice charge 0
      	this.life = 1;
      	this.active = isPadrePassato;
      	this.type = "sparoDelPlayer";
      	this.damage = 1;
      	this.facingRight = facingRightPassato;
      	if (this.facingRight) {
      		this.x = xPassataR;
      	} else {
      		this.x = xPassataL;
      	}
      	this.xv = 0;
      	this.yv = 0;
      	this.width = larghezza;
      	this.height = altezza;
      	this.y = yPassata;
      	this.speed = xSpeedPassato;
      	this.yspeed = ySpeedPassato;
      	this.isFather = isPadrePassato;
      	this.isDying = false;
      	this.perforation = false;
      	this.canPassWall = false;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.strokeStyle = player.power[7].color1;
      		ctx.beginPath();
      		ctx.lineWidth = (this.width / 8);
      		ctx.moveTo(xdisegnata + this.width / 2, ydisegnata);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata + this.width, ydisegnata);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata + this.width, ydisegnata + this.height);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata, ydisegnata + this.height);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata, ydisegnata);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata + this.height / 2);
      		ctx.lineTo(xdisegnata + this.width / 2, ydisegnata);
      		ctx.stroke();
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (this.facingRight) { //movimento dello sparo
      			this.xv -= this.speed;
      		} else {
      			this.xv += this.speed;
      		}
      		this.yv += this.yspeed;
      		this.xv *= level.friction;
      		this.yv *= level.friction;
      		this.x += -this.xv;
      		this.y += -this.yv;

      		//collisione dello sparo con level
      		if (!this.canPassWall) {
      			for (i = 0; i < level.length; i++) {
      				if (collisionBetween(this, level[i])) {
      					this.isDying = true;
      					if (this.facingRight) {
      						this.x = level[i].x - this.width - 1;
      					} else {
      						this.x = level[i].x + level[i].width + 1;
      					}
					break;
      				}
      			}
      		} else {
      			if (this.x > level.maxWidth + 100 || this.x < -100) {
      				this.life = -1;
      				this.isFather = false;
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("iceCh1", this.damage);
      					}
      					if (!(entity[i].life < 1 && this.perforation)) {
      						this.isDying = true;
						break;
      					}
      				}
      			}
      		}
      		//genera figlio alla morte se isPadre, altrimenti muore e basta
      		if (this.isDying) {
      			//this.x += this.xv;         
      			if (this.isFather) {
      				var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, 0, !this.facingRight);
      				entity.push(sparoFiglio);
      				var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, 1, !this.facingRight);
      				entity.push(sparoFiglio);
      				var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, 2, !this.facingRight);
      				entity.push(sparoFiglio);
      				var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, -1, !this.facingRight);
      				entity.push(sparoFiglio);
      				var sparoFiglio = new newShotgunIce(this.x, this.x, (this.y + this.height / 4), this.width / 2, this.height / 2, false, 2.5, -2, !this.facingRight);
      				entity.push(sparoFiglio);
      			}
      			this.life = -1;
      		}

      		if (this.isFather) {
      			//disattiva colpi su schermo
      			if (this.active && (this.life < 1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) {
      				this.active = false;
      				player.activeShot = player.activeShot - 3;
      			}
      		}
      	}
      }

      function newShotgunIceCharge3(larghezza, altezza) { // ShotgunIce Charge 3
      	this.life = 1;
      	this.active = true;
      	this.type = "platform";
      	this.damage = 0;
      	this.damageToEnemy = 2;
      	this.facingRight = player.facingRight;
      	if (this.facingRight) {
      		this.x = player.x + player.width + 3 + larghezza / 2;
      	} else {
      		this.x = player.x - 3 - larghezza;
      	}
      	this.xv = 0;
      	this.yv = 0;
      	this.width = 0;
      	this.height = altezza;
      	this.widthMax = larghezza;
      	this.y = player.y + 9;
      	this.color = player.power[7].color1 + "EE";
      	this.speed = 0.05;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		ctx.fillStyle = this.color;
      		var larghezzaRuota = this.width / 4;
      		var altezzaRuota = this.height / 7;
      		ctx.fillRect(xdisegnata - 2, ydisegnata, this.width + 4, this.height - altezzaRuota);
      		if (this.width == this.widthMax) {
      			ctx.fillRect(xdisegnata + this.width / 2 - larghezzaRuota / 2, ydisegnata, larghezzaRuota, this.height + 1);
      		}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (this.width < this.widthMax) { //crescita da fermo
      			this.width += (this.widthMax / 10);
      			this.x -= (this.width / 20);
      		} else { //movimento dello sparo         
      			if (this.facingRight) {
      				this.xv -= this.speed;
      			} else {
      				this.xv += this.speed;
      			}
      			this.xv *= level.friction;
      			this.x += -this.xv;
      			if (this.speed < 3) {
      				this.speed += 0.01;
      			} //accelera
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
      			if (this.yv > this.width) {
      				this.yv = this.width;
      			} //limita la gravita'
      			this.y += this.yv; //apply gravity            
      		}
      		for (i = 0; i < level.length; i++) { // collision with level
      			if (((this.y + this.height) > level[i].y) && ((this.y + this.height) < level[i].y + this.yv + 1) && (collisionBetween(this, level[i]))) { //collison verso il basso
      				this.y = level[i].y - this.height - 1;
      				this.yv = this.yv / 2;
      			}
      			if ((((this.x + this.width) > level[i].x) || (this.x < (level[i].x + level[i].width))) && (collisionBetween(this, level[i]))) { //collsion laterale
      				this.life = -1;
				break;
      			}
      		}
      		if (collisionBetween(this, player) && (((this.x + this.width) > player.x) || (this.x < (player.x + player.width)))) { //collisione laterale player
      			player.x -= this.xv;
      			for (var j = 0; j < level.length; j++) {
      				if (collisionBetween(player, level[j])) {
      					player.x += this.xv * 2;
      				}
      			}
      		}
      		//collisione dello sparo con altre entita'
      		for (i = 0; i < entity.length; i++) {
      			if (!(i == indiceDiQuestaEntity)) {
      				if (entity[i].life > 0 && !(this.type == entity[i].type || entity[i].type == "pickup" || entity[i].type == "enemyShot") && collisionBetween(this, entity[i])) { //controlla che l'entita da colpire sia viva, che non siano lo stesso proiettile e infine se c'è una collisione
      					if (entity[i].getHit) {
      						entity[i].getHit("iceCh3", this.damageToEnemy);
      					}
      				}
      			}
      		}
      		if (player.activePower != 8) {
      			this.life -= 0.5;
      		} //distruzione se il player cambia weapon
      		if (this.active && (this.life < 0.1 || ((xdisegnata > canvasWidth) || (xdisegnata + this.width < 0)))) { //disattivazione sparo
      			player.activeShot = player.activeShot - 3;
      			this.active = false;
      		}
      	}
      }
