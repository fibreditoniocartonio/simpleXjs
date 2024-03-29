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
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACgCAYAAAC8LWpcAAAAAXNSR0IArs4c6QAADvFJREFUeJzdXb9PJUcS/pojgNCRV/4rLLNyRPRWmxAukk/ipE0gsMSGWLcWhIsWyy9cTgRwgaVDOks4dGLxIiKLRf4r0Doi3A2eVRfMVE91dXXPz8c83SeNeK+nq6equrqqunoAR0R4/8NfBABPX6+CiBweEc496uNi3J7MCQABIP5MRGhz3Z7MO9OOjr5C9FXg6FDMJIW4PZmTFHgoKxgdBkORECyYnO2EMK0VODqYkflNMYO3J3Oa31RXUwG7KnB0aPMFECgAan2nFNBVgWNjBSjCn8Tq5qr/Ob+Z+/bbkzksvP/hL/rjphhHj+WcI+cccahdOmgT5c88+/wzZ+JQ5m3R89jLZgF+uvTs8uzzT+cc3Z7McXsyj2aZ23gMfR8ANv75NwcUFjG8GN2xCtgMA9VSkOC+zjkikTX2UeCYiCxAMpda/ywYYwgFjga5rvUlI4H2DVB+QUcSSS8jBJRfGRsrAPwGSM54DlY/KwIw2BKevl6NrGdseE6EOQbTIplPgYicc46aCif7jW0FJrdNLUGijwLHxEK46qJA55y3BitULsphRgqQ5gzEHn8ocGjUgnG4lPhys1LK0IpoJJmM53XoqkAi8sLr5TK/mftnDx0+V3SDZF4z0RVSGRZ4vwDEeQgr8I+bqm3IbHJw226rQBZGmj0rga2ujQW2RWABTTW7ujls8VQLL7/z7Evhh7SCaAn00XJq9vvi6etqCRjP7HVFCuiKtsJbVmTtMoFiUnJK6IPWPmBo8wdiwfUyANpFIgN6uXj+/ZP7mG8fWg6b1j2pGPYDUgklXd1k0PxmHljP09erns7J7KuJlrUFdBXeGifVV+YS8lllW0oBwXiSjst3AFyrJSCLG32XgR4nZwmrm/GSqAHxM3jmmXftR1o5QV3hsc71VjdXk5mf1a7HsKxJZ4c1mWWgxC83i+v2ZG5uzJIK0A+RJpi6ZzEm23JpsZ59Lp/dnszx5WYlTAZcbPHWIp/FSoh2pbKqI6s9QFwVyl0p2txYfG5g0VgVJv0d1WxHz8hVp2S7kwWJjtmVE4x0gpUGW21AuK5lX7YO6cTlerfuAyIK+AalBGO7Ku9FwtTRG/1ztxeOaC9AO+fYnxD4Zxur6Es/BoI8gHbOqxuXe0FHnsmUBTSljxgY2QICBXDj/qQS7HTmQDvnwH92axXQhD5iYFmWAO2cg2fw3ZOLoJO73AP+cZE15b70Y8FcAjnzbbIEmpq/Hm8U6FNfALQ/If+TPyOMuwFtG3rjhYpxIQWgnXPPMO2cE+2cB0IJYQLatvTLpIDaPEBCObeItg39u2tETnUMeCeYqrtzPAcKj84oZxNd6V89A/cfdUmscEmads4DIaQg755cmEIwbR/6xYpXj1UAPnxJIRjuci8wXYYUpC99VwxhMdUSuNzzzMp0tin60jNSr99Z1xDwOzmR6hbfS+ZffdgFUM2YzvIE453oR39LxNBqEM4g4jricGjF9V70j321CoMJBUanu11o5fH4Y8I8HpffLYHYjDmWa/oyttP+hHA6c9ayqasRRM9c1FJpVBW2BAHqj6otmnIsKsjjWdfbaqDwI6O8H+Cc87PYFHpbnLCASHAq3w+gnfNoM7U/2fVjDP1+QONzgYKxypPnPDjtnHvvLyGETy4zKbxMnnhMrjINpYRW5wIyrbXAM/jqw66vCbCyUlYkw6asKQBh6NRWMRgySUaws4Ox3a3bDSITAjUdX/sTip7H7fLSz+96NbaA/QlJk3RQnnx/Qnj1YTeaaSsBalos9ev+ci+qMg2FrAJSwqQgzd5d7gVrnWlzy0H7DT3eIpSQVAAzL9efsIJo9ryD2zk3U2RtARKvPuwGwrvLvWgfsSg/0HgJnM4c3j25wLsnF8ycLo85ZjC1CVL1BO/Nkw5SCMxb6sG30w12XMlSV6qvvg/DoeX6wHCeUI60zhHq8VL9avOAMrUl2gFOUZmnFY+rvvF9vldsmQtzl5bC9/m7nGl/tgDg1Yf6SbWyyVTu0GgJSPMG4rJ3kq4skIgHO6AQiMfQNUErz9DZYc4ZW8JLXnR7rQXIREU6J2smuC+Hw3cxI1VFWR6jlZsnzTCjcJB7ZnYpFBhVoqzx9J6i9gUjedghixxiFlz5AJMBteW1zg+D43WfZhuHLNY+gekt3vQY+xPyoVSH6aQCaq5s3zrH5PuJTDDXhtIJWn2jAxiRPabGAGBqQAvWZtPRh3YUaCdIkynhbmsN/BPpGdfoQzsa5AzRZFrxOTsobhltptX0oF0a+Nm621rzl2yfTCk1m31olwOTKXkmJ1OKBEDGnPvQjg1zCbAJA5UZyzbEptyHdmkQmDFCsw3aB6YdFUEmOJkSprN1fPXrp8CBlR5dgqBmsgnt3dYavvr103DcLwjmDMJ2cBEt01nOcBmtgPMAyZgD4Hjd3m2t+QtApxk0LGhpsIJS8NJs/eyw0JbAX/36SSY6Ek46PE2boRsNK0DlrYUSCKgEOJh8rBsnCHOW4pbVCnwqPDtwQQbHzmwyJcwOXE4J0oIAVIqTbcsKuRX1n/VsCdONPgNxysvfp7P15BhYknxgFSEj0avvlsD6M1AlO3dba0ApONPm6MaGWRKrYzIhvMv1aTLuGLBKYoEVWA5NpbimKTegi5KpEpbjWNhySQ0c+YLM7AX7iYY0qecH2+qpWEo1/HZGbkBKJT8ZZ0aWA2WaGkdIHHGsZyVoeiNbFrdmsE88z9ASEO4aZSLGIXgRSVRKAWTF8AbCO8vj19D5PELnEgeTj7jbWousYkjUHoxYQvTx5hatzBt0TsFKYAxtBYP9+rxG35DHQtdkob1hKYB4b8+MtF33UvimtDJrBBCs+0UqIWsBuS1wboYt/6GjgYCTwstUmunuttZ8sUXwla1MJe5HMBWgZ4MZMfyB6Z2ms/Ws5aRCpYRWBPsC1VcKSexI1blEFslMrG5DlKAFVP6grSgT15PZp/yeoA+WrXxeRk4ACQuQTFumu+iihhZWbs1zYD8h+9fxairgYPLRm5wWXCqlDZo4w1QfnSGmlgzfY2tQS7lVPTI40ZGlbuPUJ6KVfSwa1eafJ2msgxY5jiqwmmNbz6xVAj9cVoVrlGAqLyOwxVBSAVo43abpU8dyVjvQfDuaQ7Sja0OcO1TlSKD3CLzWZwcucor8XeYNU1Wg4fuzA1fL/P/1uwFA6AQJAB7oHg90j7cXR76tAfrQjgofgx/o3jd+5r5I9bPQh3Z0REnIA93j7N//AgB8v/tG97PQh3Z0+CXAs8gCtEEf2rERJELSlNvOYB/aZYCPjW8vjggAnW0UF1TcbErbgG6pQA907wXQSYNSRi1tQ7qlQ5SRSUXUCGJmZA3oRof0Af7XYH7/097snG0AsIVx4n4butERvShpCXG3tYZv32fH6Uo3OsztMDPddtvblW5MtKoKf/u+mzl3pXsMaAU4nkU2ae0Pvv7cLFp0pRsd5i9MnG0Us6YrNHVVna50ywgzH6ipBPWhWzrQ2UbEOAGg6fnPdYIkabvw0ZO+FtYSoAe6x3+ffuHX8fT856bjZWkP9r4hNN8f+BoDUGy0vt9904a+EZK/NPX323trb98IfWhL5GoMgyoh+4YIEM/+wd43WTpm/DP3hZ79umeaz190jcE8HAWA/aMfoxt1wgOF4FL4g71vpPCN8Vg1BnMJ7B/9iNM337Va+wlLCcYEgNM33zU24ceoMDXOBDOznxO++M1xw5rqwJYEFMKfbQTZ5GARoVYBbU3YWOvu9M13rRnj6vL3u29wt7WGrz+vNlaPkVbT/tGPBIBePl+nl8/XaxOg6fnP/jL6eXoetwkPfHWoT/RGkICwEoQikjQpBTRUZDTm3daaF3YRCkgtAQcAL58XR0o//dbs9ZSXz9dTy8XxGC+fr/O4dczT2YZdnBF1hrpyfa3Ccz7A/fTbx0gJdcxnBHRSkQ2V0BXER/viTRXzWXVOMGC6RgmNBGxqTQCCatLZhvnylVmktXafqf65vx9AQCGItIS6/j3uJ/uxIpq8cMnI/MYK98v+Li9J07eEL2fS6f6J+1EfTc/tqT1A5kVNBzHrv//5yStMpuVAYUVcmKl779jayua2t022vqk+9ED3wRnCA92T1S7DoTx80d+Z9u3FEb29OPLj8SW363oGur4v0Jd+NBR/fuIa+GUGbB/7NgCgq8OqY3lP3mf0pR8XdF2ZxtVh9Vm3y3tD0o+NFfes+CBnSyLVzuhLPzZW6DpsYIbdM4CuC9Nl89V9rba29MuAyFyB8KLrsM/A9OOCGbYYz1yD0Y+Nle3j/DqV96x+fenHhk+Ft4/DNcrODWjGeF/6sVD96+0yljOuDoPYXYu+9GPB7wYl8xIvJvZnjb70Y2EFKBjrM1t96cfEClCsV22yWqDc7PWlHxt0dVjEaRnK+DPH8Fwe0JN+VKwCcNvHIJRe/MroJD26dbsn/agI/9vcs9BUdfhqsi/oQz8myMroZBubORLFjhR9Ik3O8mJcC0NUE+zrzTV9S/MnmUxxaN0+ThZceqPx2SCbdslg61lh8y9/mlZE14XC+GJlXh1m6XrBKyCX08t1nZrRHL1sT4RD0mOz0NvHFc0ilJC0AH64ZL6NOVupcE54ug73Eiz41eFiowj7gOAPp3Tw1kl6XQSxhOE+v8yKz9yHiyoytJaKJQzkDyILYOa7OjNJrxXZ1oKYZpFZJFsAWSYrmWDIGRIg3Z4SPrVL1JupFxMAx9US0LvNoeBL2HUCBIzB9w3omcEXk5DZF5O4eCpL6GV+4Nt5SVg0Fr1A63OIYAnQdRByPPNd0CRyMCyL4FmX4xnWIwUmdqQsBxpEjMb/ZoeZYOY0fpmJmT6OnR9QMKWto4QTyY6/L5+jrUEpg/QSkffQ5O8HWEJtH1dOKCd8bgyeuTaRRSZA/F2HSQvMo+xfZwleAexsWFjNBGD6CHPgq8PkbHhGLfqUkrR/Si0ZvsfWoCzN3FesykaddFhRwGCUgFIom/8IxhLQx23+udK066KAFS3koUx5fhksCX84Kh8gHRivbX4AUK1l+VBLQO399biSQe5jRQFGIgQH9FpwprOeB8B5J2gJYrWlSt9NaXQfqokWOjPUytdC8/fErtLfLyeH/geP+v8h5M6uNAAAAABJRU5ErkJggg==";
	this.stance=[];
      	if(levelEditor){
		this.stance["x"]=0;
	}else{
		this.stance["x"]=3;
	}
	this.stance["y"]=Math.floor(Math.random()*4);
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
		}else if(Math.round(this.yv)==0){ //when active can move to the player
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
	this.letter = "$";
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
      	this.slope = 0;
      	this.width = 30;
      	this.height = 62;
      	this.color1 = '#cc88fc';
      	this.color2 = '#fcc4fc';
	this.jumpHeight = 10.5;
      	this.speed = 0.4;
	this.timer=120;
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
		if(debugMode){
			disegnaTestoConBordino(this.timer, xdisegnata, ydisegnata, "#000000", "#ffffff");
			var nextCollision = new rectTest(xdisegnata+this.width/2-2, ydisegnata+this.height-1, 4, 3);
			if(this.xv<0){ nextCollision.x+=this.width/2;
			}else if(this.xv>0){ nextCollision.x-=this.width/2;}
			ctx.fillStyle="#ff0000";
			ctx.fillRect(nextCollision.x, nextCollision.y, nextCollision.width, nextCollision.height);
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
		var maxDistance=this.width*7; var minDistance=this.width*6; var goingRight=false; var goingLeft=false;
		if(this.facingRight){ //calculate where to move
			if(this.x+this.width/2+minDistance > player.x+player.width/2){
				goingRight=true;
			}else if(this.x+this.width/2+maxDistance < player.x+player.width/2){
				goingLeft=true;
			}
		}else{
			if(this.x+this.width/2-minDistance < player.x+player.width/2){
				goingLeft=true;
			}else if(this.x+this.width/2-maxDistance > player.x+player.width/2){
				goingRight=true;
			}
		}
		//collision with level
		var latoSx = new rectTest(this.x, this.y+4, 2, this.height-8);
		var latoDx = new rectTest(this.x+this.width-2, this.y+4, 2, this.height-8);
		var latoSotto = new rectTest(this.x+4, this.y+this.height-2, this.width-8, 2);
		var latoSopra = new rectTest(this.x+4, this.y, this.width-8, 2);
		var nextCollision = new rectTest(this.x+this.width/2-2, this.y+this.height-1, 4, 3);
		nextCollision["collided"]=false; nextCollision["canJump"]=false;
		if(this.xv<0){ nextCollision.x+=this.width/2;
		}else if(this.xv>0){ nextCollision.x-=this.width/2;}
      		for (var i = 0; i < level.length; i++){
      			if (collisionBetween(this, level[i])) {
      				if (collisionBetween(latoSx, level[i]) || collisionBetween(latoDx, level[i])) { //collisione x
      					this.x -= -this.xv;
					this.xv = 0;
      				}
      				if (collisionBetween(latoSopra, level[i])) { //collisione y top
					this.y = level[i].y+level[i].height;
      					this.yv = 0;
				}
      				if (collisionBetween(latoSotto, level[i])) { //collisione y bottom
					this.y = level[i].y-this.height;
      					this.yv = 0;
					nextCollision.canJump=true;
					if(goingRight){ //movement
						this.xv+= this.speed;
					}else if(goingLeft){
						this.xv+= -this.speed;
					}
					this.xv = this.xv*level.friction; //friction only when touching the ground
      				}
				if(!nextCollision.collided){
					if(collisionBetween(nextCollision, level[i])){
						nextCollision.collided=true;
					}
				}
      			}
      		}
		if((Math.round(this.xv)!=0) && (!nextCollision.collided) && nextCollision.canJump){ //previene la caduta saltando
			this.yv = -this.jumpHeight; //jump
		}
		//apply movement
		this.x += -this.xv;
	      	this.yv += level.gravity/1.5; //get level gravity
    		this.y += this.yv; //apply gravity
		if(this.timer>0){
			this.timer--;
		}
		if(this.timer==0){ //throwing bones
			var bonePassX=this.boneX+(Math.floor(Math.random()*10)-5)/10;
			if(this.facingRight){ bonePassX=-bonePassX;}
			var bonePassY=-(this.boneY+(Math.floor(Math.random()*12)-6)/10);
			bone = new newSkeletonBone(this.stance.y, this.damage*3, this.x+this.width/2, this.y+this.height/2, bonePassX, bonePassY);
			entity.push(bone);
			var doubleBone=Math.floor(Math.random()*6);
			if (doubleBone==0){
				this.timer=20;
			}else{
				this.timer=120;
			}
		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		if(Math.round(this.xv)!=0){
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
		}else{
			this.stance.x=0; this.stance.timer=1;
		}
	}//fine di calculateStance()
}//fine di graySkeleton

function newCrazySkeleton() { //gray skeleton - throw newSkeletonBone()
      	this.name = "crazy skeleton";
	this.letter = "§";
      	this.type = "monster";
      	this.life = 1;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAAAXNSR0IArs4c6QAABCpJREFUaIGtWct16kAM1fjQAlnQyMuKOugESsCduA6voIksszBF+C3MNdeaq/FgonNYxKP/bzRKunUX+yv4Pl1H/+3WXVKJZvcpA6Ydf8/Z93S4jiUeCR5QDB59a1+ndSVAmw6tmZmNv2d79O18XuLRKOGPvp0ZDJ32DAv331j4Go8daz90oZFFAD2M8AqUYJEDXyfbpMSjn5RHyAA1vHZmlmkPJrXKsFD/fY1HMrMRSBEjs3IicnyZ19AteSoeu1t3SV8BA8AU4wknUkR50J+pkmwYCYjKEziPsjkdWkuHXDiDqoZZgTUGKE2lhLeKDRm6ifejb21/zI1oSgygNRSDcmtKoCENndn++OLFjQr0DTNgJkO3ZIDcABOzuLkgXPvjqyPuj+fZGFZipxjUNBVuvWzE9+k6+u9ozSo5pQLeUiUM+XDvNb1v7VyWMDAd2lwBWPEqnVYKXwNP4xsSWv+qB+A+TqZICb5XlAcYZgOjgcTfkN4iABIX+EoYC/S8Qg/8FbDrWTAUbzIKAXApW6GmH7NXuQFnfzzPiecVMgs88H26jqhZCGbtuZ7ZItwXHkrzRuYBFXsvHDH2HdT/7ZWENxhvoQAL94k0dJMlkXAGlXBRyOaZ8N9xXNS+YojvNZMyaFAZ6dDavU8p85KZjdx22ULkwv54rhLOd0Ot0nMS+hLhukbTecfyWsiS0AvxHbAW1mKfKYASYTeWBok1werqlfi37mL+8jF7hQGI7jw9caQSoEPJMq2cCacmkrtMTTnP8/H5k4DhBgld8sRchozI33hSYkZrIcEZt3B1oS3KcHHgQhHhqMpg4aplL3hwHNmigLFnJgVH9ArmPpDfAeWHiFBuE334PMdUXFN6n9B//Dz/lH7RCUvPqhrYQt+Y5RMPGNWsZz6lr36eE/4M6KK19EqZBh2LlxI+lmSd3KLV0quErH6eA0cp8Q69V2IHK2oHyuffo1E43qd/LSqyh8laTEs32xZ6+S7wu4DocRHBO/TyXcB7gdJTK1rDvkMv34YqW/3GC0LufQpvwxr68GmGdwDKym/N1qCWPryOI+BFtO90W+hxp482DSbj0M3j1uI3/p6z81t3Mfy28jA+UEQFwpGFb+Fx6y7LPSEgukDWdr9beCxaMQhLseQx24PnEeEtcofjxz/vbuFiUzlQCgl/A11WBWqE9mVkwcOEp2HPg0HuB1g4b8CwZqG4FQeMd4TPCnjh3MfB7PmtakLm2w8Co+Rt/H+8VN+uHTb5iQev+YSW8wBrzlrzHa/mgEgJ0E6t+LVpF7k0jWQYKr2lPl7P89V2C9p0aH3+ZNAoZP/EEsyKr+NICRXeJkJW/5DAObxVc/kAojlxcR17IUqA2p6vQRRis2cS+k2I33Z7RXA2dK39CIERvlTOxH7AjVEZDjeqH9ODqcJXL6X/f8bE/Gt0dIQAAAAASUVORK5CYII=";
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
      	this.color1 = '#ffe677';
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
				bone = new newSkeletonBone(2, this.damage*3, this.x+this.width/2, this.y+this.height/2, bonePassX, bonePassY);
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
}//fine di crazySkeleton

function newSkeletonBone(stanceYP, damageP, xP, yP, xvP, yvP) { //the bone thrown by graySkeleton
      	this.name = "skeletonBone";
	this.letter = "§Bone";
      	this.type = "enemyShot";
      	this.life = 1;
      	this.damage = damageP;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA2FJREFUaIHtWTtu6zAQHD7oCnGRUySACxVGmlyCd0jKANIRJCClfQddwk3gQkWA5BQukisI2FfIK60kktZnnc/DGyBIrJWpGQ6X1CAGDpRFithmVBap4d+yHtvM9bVZKIt00fcj18XYZvSaVVjbiKpDhWgTDURoEViKP77CzQaoDlXzObYZaTwwNM6cZzgdkHg/TB3SDSbnczS2WeM2APgc78PpQFmkJtpEg2uzmAty7Gh1qDqzzXWu9eshnHVgCeSsA62bNxv3/bI+1o2ggPeD/2HnIGeVx1qn7eMkqZPjzYy/ZlWnB0ObyEUckOQl8dBMytra1mKkEJ8IdQEu8lP7h+9f24jOifBuo3OgQV6iLFKzTqOmN1zNreKAq1mXkmeURWpcTnBtsQBfs2qQZ7hEAHVzqzggtz9t8gwWUR2qzuEaFHCzqcmFdgEeGKh3jUujv6v5ZoqETSwAAFwCALR9MGb2Y5vNfgkc9ZzT4ASA+O+ySCF/fgqCS8iXB3r36LOaAG8eeHgmxNYQ7Qnm3gRFfCe8B9n2FqB9e2b82jzw+DZ1SDeYnM/R2GaN24BCHjD3ZnBtFnNBjh2lPQ3ygKz16yF8SR5gcuzm9tZ9v6yPdSMo4PGtHmw3kTjQnVUea/dU89hhmAeYLADgmTo9GNpELpYH5Kwz8bF5ILaGdgAehBCfiIvkgT75uXkgtoZwRoR6HlhKXqIsUrN7Mk1vuJpbNQ9okmfUbwNDJ7imkgdczaqdB/oigLq5VRyQ2582eQaL2O6pc7gGBWxva3KhXaCZHQB4VnnbCKK/qzmbWC4LvjkEFnap2ZfPGbMl//t54Cf9f8AbKT8KYGUBOiYw13nvpGwFfLcb3oPs6i4BHZPm86/NA58v+dQxnWgOu2MCc+1clsQ1QCMPXOeDa7OYC3LsKB2TYR4QtX49hK/JAydy7ObVXeK8X9bHuhEU8PmSnx42fRnJWeWxVpY/dTeF2vF2xj+KvNODriU3SsBcSPKS+Ng8sLIZATk+iq4bX5cHeuTn5oGVzUi64RKhnwcWkpcoi9SsbNsbrubWzQOK5Bm1iKETXNPJA45m1c4DfRFA3dwqDsjtT5s8g0XQsXu4Bnvg6i7B50sePFh4ncq1ekmwwzxR3pe51qa8eaHD//8P6OMvg5RKQ2sXieIAAAAASUVORK5CYII=";
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
}//fine di skeletonBone

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
      	this.life = 12;
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
			}else if(this.y+this.height/2>player.y+player.height/3){
				this.yv+= this.speedY;
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
}//fine di VampireBat ()

function newHomingGhost() { //Ghost
      	this.name = "homing ghost";
	this.letter = "G";
      	this.type = "monster";
      	this.life = 6;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhVJREFUWIWllT2OgzAQhZ8jH2gjbUm3x2FLij1CCspwHDrKSLsHQpotwpjHMDY4eVIUG/yN588GqNQ8zeKNazhWKC2ITQz8TudnNzhaH5sYIsN/07FRBfW/hleOnyUDfxPw+RMBAI/bvDH00ZQjq+XZTlwi2UEsjuyjcSOr4jmIoN5bff7kjdqIXuVjE0Ow6bM648Q7/KYpYrOtIRv1DDm9Uc1fuKHmaV1kI8pF+C6voAAQAPK4rWOdz9Pzp3N9doZXNsdvjqGmReV1rxf9O3zxJlwWpfrZI8R6lS8U5qnHbU714xrzTVjL8216IU9dY9w8mlJv8xyfK4kyLlRKp0ZR+2HK8aeM1HwVj5zI8m0vIuP21/Yidk3O6BHvsW0vEnRwvwLh6+mYjOva719g6LalUmP6/IhnWVuh7UWGLkBGcQ2Er4C29wMfuvASz45HBizIc29zHZ/leWOdRwas1PuhW6O4X/dpLfEsWzoAuABPg5wmGSV5z5vrWjZ2xLPu1y2bmtB4t6knG2UHCo2Z5b9/txlMNhZYAIiM6xiAHiXhY9b27hE7xSurfLqKNW1ad6dz3drX8loG1a4EFrJqe0lp5DK8yrt1tEa8hipdUGd5YMmAbaCcuLGW4/kWDwBRbzIAO9g721a1PPdGuoj42BxBnmp4dTZlYOhCwP6rV9xQvV+ir+L1nZYv28WlBrPvSrx3/bL+AXwzvY5RrqacAAAAAElFTkSuQmCC";
	this.sprite.larg=16;
	this.sprite.alt=16;
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=Math.floor(Math.random()*2);
	this.stance["timer"]=0;
	this.timer=0;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=false;
      	this.width = 30;
      	this.height = 31;
      	this.color1 = '#ffbdff';
      	this.color2 = '#aa0000';
      	this.speed = 0.27;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.timer==0){
			if (!this.facingRight) {
      				ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, this.sprite.larg*2, this.sprite.alt*2);
	      		} else {
      				ctx.save(); //salvo il canvas attuale
      				ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      				ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata-1, -this.sprite.larg*2, this.sprite.alt*2);
      				ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      			}
		}
      	}
      	this.getHit = function (nome, danno) {
		this.life-=danno;
		this.xv=0; this.yv=0;
		this.timer=6;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //also contain calculateStance()
		if(this.x+this.width/2 > player.x+player.width/2){ //movement x
			this.facingRight=false;
			this.xv+= +this.speed;
		}else if(this.x+this.width/2 < player.x+player.width/3){ //3 and not 2 otherwise he will start flipping left and right because of the decimal part of the x coordinate
			this.facingRight=true;
			this.xv+= -this.speed;
		}
		if(this.y+this.height/2<player.y+player.height/3){ //movement y
			this.yv+= -this.speed;
		}else if(this.y+this.height/2>player.y+player.height/4){
			this.yv+= this.speed;
		}
	if(this.timer>0){ //se colpito rallenta
			this.timer--;
			this.xv=this.xv/2; this.yv=this.yv/2;
		}
		this.x += -this.xv;
		this.y += -this.yv;
		this.xv = this.xv*level.friction;
		this.yv = this.yv*level.friction;
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		const maxTimer=12;
		switch(this.stance.timer){
			case 0: this.stance.x=0; break;
			case maxTimer: this.stance.x=1; break;
			case 2*maxTimer: this.stance.timer=-1; break;
		}
		if(previousStance==this.stance.x){
			this.stance.timer++;
		}
	}//fine di calculateStance()
}//fine di Ghost()

function newRaven() {
      	this.name = "raven";
	this.letter = "R";
      	this.type = "monster";
      	this.life = 1;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAgCAYAAACM2F8WAAAAAXNSR0IArs4c6QAAAtFJREFUaIHtWdtxgzAQXDIpwrTiUqAFl+MWoBRawV0oH/Ex4nwPvZzYJDfDBGy8Wq3uJaXDH7IVQ4ife8xd6zE+WwO+knEBT9Nlu+/G81PGPKSgJGQsILAXccWAHvPPEns3WzGEFUMI0xLCtAQA4sU9t6U1zyG/ZSuGQB4phfOKYbt/Ru48lJFXQvBEuu6f/Ztnmpj8YuL+m2SpYvLrmaIeqsrzyh3nTQDoMdM7Yg6NhS7Ns4cSlBtvizwxe8wI0/L9PO5z7p8pZDzsowKUFepe+khNEx81k3llWzE8hLzxbvCa/Hu6OH5R8zyUnjUh4vc1HAVTtLf30B5zdxuvW+4TvncxtN9yjDAtCNNy/HwaeynzSNer+HupPa3G5e09lBt5E7VIgF7dabvqeSjgezHZ1ja16ME0k1a01Rgkym28xp+hx5x8mnQbr+7pUzeeN1G78UyFTJ6DFB4kQu2WTTv9qamWMSep3REKiolD91BCnn8WpkXH1aockSExTBCDcOtjNKvP5Ngt+SY7RLwy0krw5xySKU13Lh7nVYup8eV/lXF1kgqpas+SJp/T10kTtkK8hCPHhyEk6yZsEI9kiQAORlaIenjs7LMq5DVBXdx41a3dgSKIO/nc4zWrX/T+tVHCUxpD4p0U7oj60Nt4RY+5o94t7uMkO00XsR2KjfduVi9H33ntFLU4qfv0Zxjt68UveagZofhw3VdNxVXeVy+r6EkpIafiG/rs8Go9VAWWSCkTUImRQFL4Z1dPg2ttepLmri1+UU+euPLm77m35YiaRVbHRypfCQesjjBNygiWVnptFXlHYYRVjj1MWhHVNa9vrtkx7gaBMHk4oqYQlnCtvKzYrvrzRYlEyeLHt6QomK84AB4nDuyFzcLjx2xKu1ZilocXC0qfN/VMZXdQJCjhSPfCGLlWmjY2fiVnFsngiAgaopbg7u7ZlrTWqgSt5fAFFH349M9jzc0AAAAASUVORK5CYII=";
	this.sprite.larg=21;
	this.sprite.alt=32;
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=0;
	this.stance["timer"]=0;
	this.timer=0;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=false;
      	this.width = 30;
      	this.height = 33;
      	this.color1 = '#aa0000';
      	this.color2 = '#aa0000';
      	this.speedX = 0.75;
	this.speedY = 0.125;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		ydisegnata+=-30;
		if(this.stance.x==3){ ydisegnata+=15;}
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, this.sprite.larg*2, this.sprite.alt*2);
	      	} else {
			xdisegnata+=-10;
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata-1, -this.sprite.larg*2, this.sprite.alt*2);
      			ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      		}
		if(debugMode){
			ctx.fillStyle="#00ffff80"; ctx.fillRect(xdisegnata, ydisegnata+30, this.width, this.height);
			if(this.stance.x==0){
				var activatorBox = new rectTest(xdisegnata+this.width/2-5*this.width, ydisegnata+30+this.height/2-this.width*3, this.width*10, this.width*6);
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
			var activatorBox = new rectTest(this.x+this.width/2-6*this.width, this.y-30+this.height/2-this.width*3, this.width*12, this.width*6);
			if(collisionBetween(activatorBox, player)){
				this.stance.x=1; //attivazione
			}
		}else{ //active
			if(this.timer==0){
				if(this.facingRight){ //movement x
					this.xv+= -this.speedX;
					if(this.x+this.width/2 > player.x+player.width/2+canvasWidth/4.5){
						this.facingRight=false;
						this.timer=60;
					}
				}else{
					this.xv+= this.speedX;
					if(this.x+this.width/2 < player.x+player.width/2-canvasWidth/4.5){
						this.facingRight=true;
						this.timer=60;
					}
				}
				if(this.y+this.height/2<player.y+player.height/2){ //movement y
					this.yv+= -this.speedY;
				}else if(this.y+this.height/2>player.y+player.height/3){
					this.yv+= this.speedY;
				}
			}else{
				this.timer--;
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
		var maxTimer=9;
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
}//fine di Raven()

function newFireman() {
      	this.name = "fireman";
	this.letter = "ℱ";
      	this.type = "monster";
      	this.life = 3;
      	this.damage = 2;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAgCAYAAABU1PscAAAAAXNSR0IArs4c6QAAAr1JREFUWIXFV8uN4zAMpYI05TmmDE8pm6NbscvIMS5Le4ip8C/KPgwBA4Eift4TSVEAA1InqCP7/1RksFeCz+jWCSp+I7ZvkcMRYzKAyEaPnBG/padUdij4X9m/+3sOcW+doHp6TPcxfxdfG7PRBVAnqJYBU0EY9QKgACJAyrdhI5Kbcn5GDP1s3rOFZR12zWtgWT/fWUAYwKHv5TbWisvwkQERCfifWcSX5ASLLWWfv+qvqDYBEADN+eevWwMWY2WHclkfY8BPZEDUpfgJUAbQyGN2U0KJpe8EQdfKDsVMJ+Lbk3v7RVmTSssK8PzssXK37FAqbDY4tHXohtFI33gajxkqbM0vtvayQ9E18Jh5Hr+2D7Od4m6gLNYSjYGBo/uR2Mfcip/q3JhzzykaOda6TNJuliQgJUYq57vQD8c4NLMgCBIEAKjLru39KYz5SO5q5bV98n1ZwxvZklYLR70ou+/agKjg8bRk0JjORosFAGcsQPHQO7NKV39Z20kyADRVI8YFKayIm6F3jYMnyip4qmPpGyyye4SeAg0aP8P/d6j6N/M8lEE4Bs7oW03DrSnZSFwA2R5N0ofeCdmizkyYzR62dHG7Uxt3uejmMRpKBGaOyILB3jvB05U6rI2qOjAcs73eOjKHnyOpUyOkWYB1EYuReERM5p3hrvtKM3LfAnxpnHbThvZuMs+oIHuSGM1tAIdjNupmxwGsFYf5oRtc1pwxxtgAopZHQITByFZKUrMHgt0N7wryouvPQoLlZhAZGRnM6GsLaywx5yufIj7/SYmpMmIwEwgFcubZ6VxoDYB6GhpHHYFg/3kBDg6HTQLA+gQyLCdHXRRVR7Q79fQsUggR+h6QLzJLMnusYK6KAfgG4PRwQ6LbtzeNmpdTkFLMpjPG1AnqXQWPG43ZxQKpAjecNeDJGlA2g5T+D6qHEbXkuZm/AAAAAElFTkSuQmCC";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=0;
	this.stance["timer"]=0;
	this.sprite.larg=16;
	this.sprite.alt=32;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.firstFlameIndex=-1;
	this.currentFlame=0;
	this.maxFlame=0; //definisco nel primo if di physics()
	this.facingRight=false;
      	this.slope = 0;
      	this.width = 30;
      	this.height = 62;
      	this.color1 = '#ff8811';
      	this.color2 = '#333333';
      	this.speed = 0.35;
	this.timer=15;
	this.damageTimer=0;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
		if(this.damageTimer==0){
			if (!this.facingRight) {
      				ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, this.sprite.larg*2, this.sprite.alt*2);
	      		} else {
      				ctx.save(); //salvo il canvas attuale
      				ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      				ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata-1, -this.sprite.larg*2, this.sprite.alt*2);
      				ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      			}
		}
      	}
      	this.getHit = function (nome, danno) {
      		this.life -= danno;
		this.damageTimer=6;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.firstFlameIndex==-1){ //initialize flames
			this.firstFlameIndex=entity.length;
			var entita=new newFiremanFire(this.x+this.width/2, this.y+this.height);
			entita.life=-1;
			for(;this.maxFlame<4;this.maxFlame++){entity.push(entita);}
		}
		if(this.damageTimer>0){ //when hit can't move
			this.damageTimer--;
		}else{
			if(this.timer==0){
				this.timer=15;
				entity[(this.firstFlameIndex+this.currentFlame)]=new newFiremanFire(this.x+this.width/2, this.y+this.height);
				this.currentFlame++;
				if(this.currentFlame>this.maxFlame){this.currentFlame=0;}
			}else{
				this.timer--;
			}
			if(!this.facingRight){
				this.xv+= this.speed;
			}else{
				this.xv+= -this.speed;
			}
		}
		this.xv = this.xv*level.friction;
		this.x += -this.xv;
	      	this.yv += level.gravity/2; 
    		this.y += this.yv;
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
					this.facingRight=!this.facingRight;
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
		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=11;
		switch(this.stance.timer){
			case 0: this.stance.x=0; break;
			case maxTimer: this.stance.x=2; break;
			case 2*maxTimer: this.stance.x=1; break;
			case 3*maxTimer: this.stance.x=2; break;
			case 4*maxTimer: this.stance.timer=-1; break;
		}
		if(previousStance==this.stance.x){
			this.stance.timer++;
		}
	}//fine di calculateStance()
}//fine di Fireman
function newFiremanFire(xPass, yPass) {
      	this.name = "fireman fire";
	this.letter = "ℱ";
      	this.type = "enemyShot";
	this.lifeMax = 60;
      	this.life = this.lifeMax;
      	this.damage = 3;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAAAXNSR0IArs4c6QAAAKtJREFUOI3NU8ERwyAMk7MVfTKGV+mXVegYfYax3EdbLmADgVzv6l+whGTFAP9a4iBncNsvLl2uFYGpCXoirfNpgSsmhiS5s4zIdZ9WXFGyeRZmPiLP/Qg8F59K4Cy5xl36yeIg8AyE2O43DGwmsFchticJUfX1BKOMrfIM7AfKR0QcJAuMYlitvG7Z9S7AjYpVVBk/H29yAln5F5jj2Rds7bl6QJaB2n0CvQCUhl4SB6Br4QAAAABJRU5ErkJggg==";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=0;
	this.sprite.larg=8;
	this.sprite.alt=16;
      	this.width = 14;
      	this.height = 30;
	this.x = xPass-this.width/2;
      	this.y = yPass-this.height;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
      		ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, this.sprite.larg*2, this.sprite.alt*2);
      	}
      	this.getHit = function (nome, danno){}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		this.life--;
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		if(this.life%(this.lifeMax/10)==0){
			this.stance.x++;
			if(this.stance.x>2){this.stance.x=0;}
		}
	}//fine di calculateStance()
}//fine di FiremanFire

function newFishman() {
      	this.name = "fishman";
	this.letter = "₣";
      	this.type = "monster";
      	this.life = 2;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABACAYAAABcIPRGAAAAAXNSR0IArs4c6QAABWRJREFUaIG1WMmN6zAMpYI0MsAc3EJ6SAU5u4SUMSX4nArcw7TgwwBpJAD/waLMVV7kT8BAYulxJ0U5gSUEAPg8RwAA+Bvv0E1iPTmYM7CnEH6eI04dYFYGp25+Ps+xvGPPWdjDxD2Cn+dYvPZ5jnD9ucPUxeDs3dSIbaKLfvF9n8PvKdBNy7pKjWYso8ORKiBKBXr0GoBYa8XC5zmaNY3dZQBXhDOt5PJhLL3nRmyUCQAsB/NGQTwVvu9zXhPR+26C1ILlClHtrNUQS0FRQyZ05IHACyICLVh6vAgQT93hQEXCGFEJn5vHrVhtxIb6cY0oXuO5GRSVUaIF60Wh9o6U133YWOTlYZCDR7ECR/kf/Wf1AwD2HEjEmMYBj6auMOLCW7BG2amzypPi7BBM11ASA9RO1FZsZGw3AcA0dyLyNufVTYAAkKKjHHWoOClGJg13YjFaB5hbsDMUEq1HoDYS6PC2YqNofd9HmOBuItFNAJEBqZsWT+6kvVi3mIn+Rmsoj4YZ5ojZXuVVC61S9n51EqVIBbLoJ/6PCADAoeJP2bPzjHRfeJAxHxuMuQaiWWYPXX/u5V5ARHcDIqUAgh+FBABIsxB1o6ynTikUwxxf9FoXV6qSBm4KcUOYcmEX9PBav6lzplHP816vZvvc05z3b45XLTEsYI33nAvAupBOAS6IlNWGcCGMzIhMPDieYdFz0N+4pJAeLSildHaULhLdpvg6W9MU4oNJ0h3Wtky1XH6knFCeK0JCNhoAXDH9PppYNz7rym/w4i4jlPGhAZVxXAqLlI+8sscAtlesq99G0a3KJ7DDV+kMXgvlVGmFArvx65zBbOFxgeUENHO6pzCnSh9PHja6B0SYiuzCI5qFAPKFgV0gqozWaOVjVpHJnUmyg0MVAZgBNOoGN63IiE0nKfX5LUboC4y+W/B3JGetaNY6g1ZcFHBlr2f05od4pqCXmyLi46061kUjqNHa7FMr4ojMVwV8DPO/dw/p190XUSu+iRAfA+JtCRHe8vMY1nr+GfiTlc9CixI3Nw/PwgN/j4/B8KspnzJo/pfDjje2Qf2nd8AOvFPw756vLZivAdKr5/oKugAApFc/b/oajHBiUqNWvN6Pj2HBvnvO042KCC0Pn85jFtYz8RDinP+ax7WEX3lChxBv+f28H9OrT+StFjxB0qtHfAyA0As+xINSzCNTaOQ11UGiQmzFS11yJIT3KxFcCskvNMmdeRUAgHmxFV+20L4SRT+CBesqYDpBoBAtnYAvBpSOtBgZAjlWFqJThCKsS3qchSfldaoYvio97ScR8prp31/uiGA9eAyP+JCpArAtgv59IPdzAXr3JbSMsT/j7MMj72Q8zzU/wuFjoD3x53XyoPFGbmd5DSMj9uDTq0exRxOrCYSe14XpZDJPnVzU+Xwi3tZJBU9Yk0Le7GK8UaEGfEq/2/F5DxoDqPd6g9kGEulUGeRC2is/vNQfUF7iX3K63I0/IH8tV00/hmAc0HwEz0oNHJFPEZgHKcdi7kHWvrZ5hHo74Sj/vwYdmcPyLwT2iM/nKwq4yhc+r94tXirEFvkXfptiTMUMsqJArDy7jHgGi0ProPwLgSOPrimgt2uFxB411/PDrUV+7eLtHi5q6NIGiGGu8CGMM7C1yg+va4KJUoA94O33lPGUO0u+5wWxVlFAk3unVXy1soflh6MwBGOyWo+GObPf4Y15oDOXqj3ya5/XOSXRj3P7C5R39ztFmHac0qH86oXGUTDyhEdiRK5cgprkhxFgVkrJeWLUH7FCojl+71yzUf6Vb6oIkXvq32lQ7FNKeWdHi3zzRYGTLrjKuhBW8/Zage6V/w8K+gpfFw1/1AAAAABJRU5ErkJggg==";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=Math.floor(Math.random()*2);
	this.stance["timer"]=0;
	this.sprite.larg=16;
	this.sprite.alt=32;
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=false;
      	this.slope = 0;
      	this.width = 30;
      	this.height = 62;
      	this.color1 = '#cc0044';
      	this.color2 = '#dd0000';
      	this.speed = 0.3;
	this.timer=-100;
	this.damageTimer=0;
	this.attacking=false;
	this.shootNumber=0;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
		if(this.damageTimer==0){
			if (!this.facingRight) {
      				ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, this.sprite.larg*2, this.sprite.alt*2);
	      		} else {
      				ctx.save(); //salvo il canvas attuale
      				ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      				ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata-1, -this.sprite.larg*2, this.sprite.alt*2);
      				ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      			}
		}
      	}
      	this.getHit = function (nome, danno) {
      		this.life -= danno;
		this.damageTimer=6;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.damageTimer>0){ //when hit can't move
			this.damageTimer--;
		}else{
			if(this.attacking){
				if(this.x+this.width/2 > player.x+player.width/2){
					this.facingRight=false;
				}else if(this.x+this.width/2 < player.x+player.width/3){
					this.facingRight=true;
				}
				if(this.timer==0){
					if(this.shootNumber>0){
      						var sparo = new newSparo(15, 10);
						sparo.y = this.y+sparo.height;
      						if (this.facingRight) {
		      					sparo.x = this.x + this.width - sparo.width/2;
      						} else {
      							sparo.x = this.x - sparo.width/2;
		      				}
	      					sparo.facingRight = this.facingRight;
	      					sparo.type = "enemyShot";
      						sparo.color = this.color2;
      						sparo.damage = this.damage*2;
      						sparo.speed = sparo.speed / 3.5;
		      				entity.push(sparo);
					}
					this.shootNumber--;
					if(this.shootNumber==0){this.timer=-10;}
					if(this.shootNumber==-1){
						this.attacking=false;
						this.timer=-200;//timer for next attack
					}else{
						this.timer=-75;
					}
				}	
				this.timer++;
			}else{
				if(this.timer==0){
					this.shootNumber=2+Math.floor(Math.random()*2);
					this.attacking=true;
					this.xv=0;
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
		this.xv = this.xv*level.friction;
		this.x += -this.xv;
	      	this.yv += level.gravity/2; 
    		this.y += this.yv;
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
					this.facingRight=!this.facingRight;
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
		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		var previousStance = this.stance.x;
		var maxTimer=11;
		if(this.attacking){
			this.stance.timer=0;
			this.stance.x=2;
		}else{
			switch(this.stance.timer){
				case 0: this.stance.x=0; break;
				case maxTimer: this.stance.x=1; break;
				case 2*maxTimer: this.stance.timer=-1; break;
			}
			if(previousStance==this.stance.x){
				this.stance.timer++;
			}
		}
	}//fine di calculateStance()
}//fine di Fishman

function newMedusaHeadSpawner() {
      	this.name = "medusa head spawner";
	this.letter = "M";
	if(levelEditor){
      		this.type = "monster";
	}else{
		this.type="enemyShot"; //always loaded
	}
      	this.life = 999999;
      	this.damage = 0;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAASVJREFUOI2VVMGRgzAQEx6XQAN8mBSSIlICT6gEnimBIiiE4UMDlOCZ5BEvWa9l7qIPsF4krXag2of2BYJm3M77fWhZC4UrkYV1RlhnoD/QjNspoIUYPHMU1hn+9igKyRlz7nRjCeI2EYrOLSrJsBk3oD+AqU47+gOhWz5E/fGtTzV1WOmliGJYZ/jnPScnsKT5UsTFVH/utasodtbI2HTLbCFCojOk79pC6Bb4KW9M6iqKv0eO6nbr/nnPz8jIicN9aPNtCsTVVMPjm/P/HGpHQmRFChlSwtAtKVmsnaMqkcuRATU20sD97ZHmGkntyFXpb8Ngvyb6pQB4yaHY/+V3ZeEsgSbW+disSj2OFYVUk19B9zg7nn5mZKymhd2VAxaFvrLeN1WtvJcArt70AAAAAElFTkSuQmCC";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=0;
	this.stance["timer"]=0;
	this.sprite.larg=20;
	this.sprite.alt=20;
	this.headIndex=-1;
	this.x = 0;
      	this.y = 0;
      	this.width = 40;
      	this.height = 40;
      	this.color1 = '#002299';
	this.timer=0;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
		if(levelEditor || debugMode){
			var activatorBox = new rectTest(xdisegnata+this.width/2-canvasWidth/3*2, ydisegnata+this.height/2-canvasHeight/3*2, 2*canvasWidth/3*2, 2*canvasHeight/3*2);
			ctx.strokeStyle=this.color1;
			ctx.strokeRect(activatorBox.x, activatorBox.y, activatorBox.width, activatorBox.height);
			ctx.strokeRect(activatorBox.x, activatorBox.y+activatorBox.height/2, activatorBox.width, 1);
			ctx.strokeRect(activatorBox.x+activatorBox.width/2, activatorBox.y, 1, activatorBox.height);
	      		ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, this.sprite.larg*2, this.sprite.alt*2);
		}
		if(debugMode){ //show attack timer
			disegnaTestoConBordino(this.timer, xdisegnata, ydisegnata, "#000000", "#ffffff");
		}
      	}
      	this.getHit = function (nome, danno) {}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.headIndex==-1){ //inizializza la testa da spawnare
			var entita = new newMedusaHead(0, false, indiceDiQuestaEntity); entita.life=-1;
			this.headIndex=entity.length;
			entity.push(entita);
		}
		if(this.timer>0){
			this.timer--;
		}else if(this.timer==0 && entity[this.headIndex].life<1){
			var activatorBox = new rectTest(this.x+this.width/2-canvasWidth/3*2, this.y+this.height/2-canvasHeight/3*2, 2*canvasWidth/3*2, 2*canvasHeight/3*2);
			if(collisionBetween(activatorBox, player)){
				var entita = new newMedusaHead(player.y+player.height/2, !player.facingRight, indiceDiQuestaEntity);
				if(player.facingRight){
 	     				if (player.x + (player.width / 2) < canvasWidth / 2) { //player a inizio livello
						entita.x=canvasWidth-entita.width-1;
		      			} else if(player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) { //player a fine livello
						entita.x=level.maxWidth-entita.width-1;
      					} else { //player in mezzo al livello
						entita.x=player.x+player.width/2+canvasWidth/2-entita.width-1;
 					}
				}else{
 	     				if (player.x + (player.width / 2) < canvasWidth / 2) { //player a inizio livello
						entita.x=1;
		      			} else if(player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) { //player a fine livello
						entita.x=level.maxWidth-canvasWidth+1;
      					} else { //player in mezzo al livello
						entita.x=player.x+player.width/2-canvasWidth/2+1;
 					}
				}
				entity[this.headIndex]=entita;
			}
		}
      	}//fine di physics()
}//fine di medusaHeadSpawner()
function newMedusaHead(yPass, facingRightPass, parentIndexPass) {
      	this.name = "medusa head";
	this.letter = "M";
      	this.type = "monster";
      	this.life = 1;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAl5JREFUWIWtVsFtwzAMpAKP0CH6zQzpEN3BfeSRMfzowwE6gpfwDP16iIxggH3YlE8nSlGAEhBQU+TxSJ3UiPyPKf2t5CvaqQLYCqLrMsWcdZlkXSaR6+NlMgio6zKpXB8MUAKy4hh/fB845aIlkMqeS7whL8k9yTFC12yk6zJJ9/65OY/xYgPb/raX5CeW5+4A6bjj6JIx2nJE53bvYEJcZkeAR8ZfwsW9/IxcQRN+xwxkPtwDHxNgciTMyjEgAc+fdlEmVRd2SiAJhCKNAMV8l8g+gfwhuj4y5XY/H/leQc1efvJ9fWzr+02YQIjXjG0Plu+3g8zmCy355o/7hieFp5iKZHc7+27Id96awA6RyjWqnO/T/MIq2nOB1UHc/Jb/B8/M++fUbHsDDUVeL5BNRmfVftAmHBSh6qzSDzGn+dwoL9ruw40My5SoOquES4iAIiJfvyng/RY4LxYwAhajs8rXb5ITSe2+ZCOOzMYHI4zL8XudKeLh8o4mAECTUadJvk3OJonx41nciXSxBRo7BuIeASjHYFHD6QdNSFnM/Ra2X0TemRuInaUB9EMuOCzOuuFmmGAwAi2JDFATHIjNLYxHWBSckHBK4hQQWS3fWds7MJ4ldsJMeSLcJeaZ8bdn9kacMDhcNsEYIRw1kkIdIOlwCa4YLb8fVHTWJKZDcYkc00BS5h9BKzaJu0MK9WRNxcnRNe5EJPSD6njeixWeVL5GQi/Z/RYUC6CN581PR5g+JN5NYJWzX+gh8rTjYeANiADOFckKYBF+CSsNlF7bbKSv/Nhwf3Q4V+6p/QGFqShY3HxVWAAAAABJRU5ErkJggg==";
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=Math.floor(Math.random()*2);
	this.stance["timer"]=0;
	this.sprite.larg=16;
	this.sprite.alt=16;
      	this.width = 30;
      	this.height = 30;
	this.parentIndex=parentIndexPass;
	this.x = 0;
      	this.y = yPass-this.height/2;
	this.yMin = this.y+this.height/2-this.height*2.3; //limite alto su schermo
	this.yMax = this.y+this.height/2+this.height*2.3; //limite basso su schermo
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=facingRightPass;
      	this.speed = 0.62;
	this.goingUp=true;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity){
		if (!this.facingRight) {
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata-1, this.sprite.larg*2, this.sprite.alt*2);
		} else {
      			ctx.save(); //salvo il canvas attuale
      			ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      			ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata-1, -this.sprite.larg*2, this.sprite.alt*2);
      			ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      		}
      	}
      	this.getHit = function (nome, danno) {
      		this.life -= danno;
		if(this.life<1){entity[this.parentIndex].timer=30;}
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(!this.facingRight){
			this.xv+= this.speed;
		}else{
			this.xv+= -this.speed;
		}
		if(this.goingUp){
			this.yv+= -this.speed;
		}else{
			this.yv+= this.speed;
		}
		this.xv = this.xv*level.friction;
		this.yv = this.yv*level.friction;
		this.x += -this.xv;
    		this.y += this.yv;
		if((this.goingUp && (this.y+this.height/2)<this.yMin) || (!this.goingUp && (this.y+this.height/2)>this.yMax)){
			this.goingUp=!this.goingUp;
		}
		var xLimitMin; var xLimitMax;
		if(this.facingRight){
 	     		if (player.x + (player.width / 2) < canvasWidth / 2) { //player a inizio livello
				xLimitMax=canvasWidth-1;
		      	} else if(player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) { //player a fine livello
				xLimitMax=level.maxWidth-1;
      			} else { //player in mezzo al livello
				xLimitMax=player.x+player.width/2+canvasWidth/2-1;
 			}
		}else{
 	     		if (player.x + (player.width / 2) < canvasWidth / 2) { //player a inizio livello
				xLimitMin=1;
		      	} else if(player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) { //player a fine livello
				xLimitMin=level.maxWidth-canvasWidth+1;
      			} else { //player in mezzo al livello
				xLimitMin=player.x+player.width/2-canvasWidth/2+1;
 			}
		}
 		var yLimitMin; var yLimitMax;
      		if (player.y < 0 + canvasHeight/2) { 
			yLimitMin = 1;
			yLimitMax = canvasHeight-1;
      		} else if (player.y > level.maxHeight - canvasHeight / 2) { 
			yLimitMin = level.maxHeight-canvasHeight+1;
      			yLimitMax = level.maxHeight-1;
      		} else {
			yLimitMin = player.y+player.height/2-canvasHeight/2+1;
			yLimitMax = player.y+player.height/2+canvasHeight/2-1;
	      	}
		if((this.x+this.width/2 > xLimitMax) || (this.x+this.width/2 < xLimitMin) || (this.y+this.height/2 > yLimitMax) || (this.y+this.height/2 < yLimitMin)){
			this.life=-1;
			entity[this.parentIndex].timer=30;
		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		if(this.goingUp){
			this.stance.x=0;
		}else{
			this.stance.x=1;
		}
	}//fine di calculateStance()
}//fine di medusaHead()

function newFrog() { //frog
      	this.name = "frog";
	this.letter = "ƒ";
      	this.type = "monster";
      	this.life = 3;
      	this.damage = 1;
	this.sprite = new Image();
      	this.sprite.src = "data:image/png;base64,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";
	this.sprite.larg=32;
	this.sprite.alt=32;
	this.stance=[];
	this.stance["x"]=0;
	this.stance["y"]=Math.floor(Math.random()*2);
	this.x = 0;
      	this.y = 0;
      	this.xv = 0;
      	this.yv = 0;
	this.facingRight=false;
      	this.width = 46;
      	this.height = 32;
      	this.color1 = '#ff2288';
      	this.color2 = '#fcc4fc';
	this.jumpHeight = 10;
      	this.speed = 0.6;
	this.timer=64;
	this.damageTimer=0;
      	this.hasPhysics = true;
      	this.canSelfDraw = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(debugMode){
		      	ctx.fillStyle = "#ffff0080"; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height); //hitbox
			disegnaTestoConBordino(this.timer, xdisegnata, ydisegnata, "#000000", "#ffffff"); //timer
		}
		if(this.damageTimer==0){
			switch(this.stance.x){
				case 0: case 1: 
					ydisegnata-=32; 
					if(this.facingRight){xdisegnata-=18;}
					break;
				case 2:	ydisegnata-=8; break;
				case 3:	ydisegnata-=24; break;
			}
			if (!this.facingRight) {
      				ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata, this.sprite.larg*2, this.sprite.alt*2);
      			} else {
      				ctx.save(); //salvo il canvas attuale
      				ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      				ctx.drawImage(this.sprite, this.sprite.larg*this.stance.x, this.sprite.alt*this.stance.y, this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata, -this.sprite.larg*2, this.sprite.alt*2);
      				ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      			}
		}
      	}
      	this.getHit = function (nome, danno) {
		this.life-=danno;
		this.damageTimer=-6;
      	}
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //also contain calculateStance()
		if(this.damageTimer<0){	
			this.damageTimer++;
		}else{
			if(Math.round(this.yv)!=0){ //si muove solo se e' in salto
				if(this.facingRight){ //movement
					this.xv+= -this.speed;
				}else{
					this.xv+= +this.speed;
				}
			}
		}
		this.x += -this.xv;
		this.xv = this.xv*level.friction;
	      	this.yv += level.gravity; //get level gravity
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
					if(this.x+this.width/2 > player.x+player.width/2){ //change direction
						this.facingRight=false;
					}else if(this.x+this.width/2 < player.x+player.width/3){
						this.facingRight=true;
					}
					if(this.timer>0){
						this.timer--;
					}else if(this.timer==0){ //jumping
						this.timer=60;
						this.yv = -this.jumpHeight;
						var rng=1+Math.floor(Math.random()*8);
						if(rng%3==0){this.timer+=120;} //burp
						if(rng%4==0){this.yv -= this.jumpHeight/3;} //double jump speed
					}
      				}
      			}
      		}
		this.calculateStance();
      	}//fine di physics()
	this.calculateStance = function (){
		if(Math.round(this.yv)==0){
			if(this.timer>65 && this.timer<116){
				this.stance.x=1;
			}else{
				this.stance.x=0;
			}
		}else if(this.yv>0){
			this.stance.x=3;
		}else{
			this.stance.x=2;
		}
	}//fine di calculateStance()
}//fine di frog()
