      function newPickUp_Armor(indicePassato) { //le spine per terra
      	this.life = 9999999999;
      	this.type = "pickup";
      	this.indice = indicePassato; //indicePassato=0 -> helmet, indicePassato=1 -> legs, indicePassato=2 -> buster, indicePassato=3 -> corpo
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
      	this.width = 20;
      	this.height = 20;
      	switch (this.indice) {
      		case 0:
      			this.name = "helmet upgrade";
      			break;
      		case 1:
      			this.name = "boots upgrade";
      			break;
      		case 2:
      			this.name = "buster upgrade";
      			break;
      		case 3:
      			this.name = "body upgrade";
      			break;
      	}
      	this.canSelfDraw = true;
      	this.color1 = '#003ef0';
      	this.color2 = '#e1e1e1';
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
      		ctx.fillStyle = this.color1;
      		ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
      		ctx.fillStyle = this.color2;
      		ctx.fillRect(xdisegnata + 1, ydisegnata + 1, this.width - 2, this.height - 2);
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 18px Lucida Console";
      		var textHeight = ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo
      		switch (this.indice) {
      			case 0:
      				disegnaTestoConBordino("H", xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), this.color1, this.color2);
      				break;
      			case 1:
      				disegnaTestoConBordino("L", xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), this.color1, this.color2);
      				break;
      			case 2:
      				disegnaTestoConBordino("B", xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), this.color1, this.color2);
      				break;
      			case 3:
      				disegnaTestoConBordino("C", xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), this.color1, this.color2);
      				break;
      		}
      		ctx.textAlign = "left"; //lo azzero se no mi si bugga in alcuni menu
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (armaturaAcquired[this.indice]) { //se il player l'ha gia' trovata disattiva l'entita'
      			this.life = -1;
      		} else { //da qui inizia this.physics vero e proprio
      			if (collisionBetween(this, player)) { //quando il player lo raccoglie
      				this.life = -1;
      				switch (this.indice) {
      					case 0:
      						objAlert = new newAlert("You have found the head upgrade! You can break some blocks with a headbutt.", gamestate);
      						gamestate = 5;
      						break;
      					case 1:
      						objAlert = new newAlert("You have found the boots upgrade! Press " + dashkey + " to move faster.", gamestate);
      						gamestate = 5;
      						break;
      					case 2:
      						objAlert = new newAlert("You have found the weapon upgrade! You can now perform more powerful attacks.", gamestate);
      						gamestate = 5;
      						break;
      					case 3:
      						objAlert = new newAlert("You have found the chest upgrade! You receive less damage.", gamestate);
      						gamestate = 5;
      						break;
      				}
      				armaturaAcquired[this.indice] = true;
				if(player.calcolaPlayerColor){player.calcolaPlayerColor(true);}
      			}
      		}
      	} //fine di physics              
      }

      function newPickUp_Subtank(indicePassato) { //le spine per terra
      	this.life = 9999999999;
      	this.type = "pickup";
      	this.name = "subtank";
      	this.indice = indicePassato;
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
      	this.width = 20;
      	this.height = 20;
      	this.color1 = '#003ef0';
      	this.color2 = '#ffc000';
	this.color3 = "#000000";
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
      		ctx.fillStyle = this.color1;
      		ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
      		ctx.textAlign = "center";
		var testoDaScrivere="S";
		if(levelEditor || debugMode){
      			ctx.font = "small-caps bold 14px Lucida Console";
			testoDaScrivere+=this.indice;
		}else{
      			ctx.font = "small-caps bold 18px Lucida Console";
		}
	      	var textHeight = ctx.measureText("O").width;
      		disegnaTestoConBordino(testoDaScrivere, xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), this.color2, this.color1);
      		ctx.textAlign = "left"; //lo azzero se no mi si bugga in alcuni menu
      		ctx.strokeStyle = this.color3; ctx.lineWidth = "1";
      		ctx.strokeRect(xdisegnata, ydisegnata, this.width, this.height);
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (subtank[this.indice].acquired) { //se il player l'ha gia' trovata disattiva l'entita'
      			this.life = -1;
      		} else { //da qui inizia this.physics vero e proprio
      			if (collisionBetween(this, player)) { //quando il player lo raccoglie
      				subtank[this.indice].acquired = true;
      				objAlert = new newAlert("You have found a Subtank! Store the energy you don't need to use it later.", gamestate);
      				gamestate = 5;
      				this.life = -1;
      			}
      		}
      	} //fine di physics              
      }

      function newPickUp_Subweapon(letteraPassata) { //subweapon - ①②③④⑤⑥⑦⑧
      	this.life = 9999999999;
      	this.type = "pickup";
	this.letter = letteraPassata;
      	this.name = "subweapon "+letteraPassata;
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
      	this.width = 20;
      	this.height = 20;
      	this.color1 = ''; this.color2 = '';
      	this.levelDefeatedIndex = -1;
	switch(this.letter){
		case "①": this.levelDefeatedIndex=0; this.color1=player.power[this.levelDefeatedIndex].color1; this.color2=player.power[this.levelDefeatedIndex].color2; break;
		case "②": this.levelDefeatedIndex=1; this.color1=player.power[this.levelDefeatedIndex].color1; this.color2=player.power[this.levelDefeatedIndex].color2; break;
		case "③": this.levelDefeatedIndex=2; this.color1=player.power[this.levelDefeatedIndex].color1; this.color2=player.power[this.levelDefeatedIndex].color2; break;
		case "④": this.levelDefeatedIndex=3; this.color1=player.power[this.levelDefeatedIndex].color1; this.color2=player.power[this.levelDefeatedIndex].color2; break;
		case "⑤": this.levelDefeatedIndex=4; this.color1=player.power[this.levelDefeatedIndex].color1; this.color2=player.power[this.levelDefeatedIndex].color2; break;
		case "⑥": this.levelDefeatedIndex=5; this.color1=player.power[this.levelDefeatedIndex].color1; this.color2=player.power[this.levelDefeatedIndex].color2; break;
		case "⑦": this.levelDefeatedIndex=6; this.color1=player.power[this.levelDefeatedIndex].color1; this.color2=player.power[this.levelDefeatedIndex].color2; break;
		case "⑧": this.levelDefeatedIndex=7; this.color1=player.power[this.levelDefeatedIndex].color1; this.color2=player.power[this.levelDefeatedIndex].color2; break;
	}
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
      		ctx.fillStyle = this.color1;
      		ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 12px Lucida Console";
      		var textHeight = ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo			
      		disegnaTestoConBordino("W"+(this.levelDefeatedIndex+1), xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), this.color2, this.color1);
      		ctx.textAlign = "left"; //lo azzero se no mi si bugga in alcuni menu
      		ctx.strokeStyle = this.color2; ctx.lineWidth = "2";
      		ctx.strokeRect(xdisegnata, ydisegnata, this.width, this.height);
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (levelDefeated[this.levelDefeatedIndex]) { //se il player l'ha gia' trovata disattiva l'entita'
      			this.life = -1;
      		} else { 
      			if (collisionBetween(this, player)) { //quando il player lo raccoglie
      				levelDefeated[this.levelDefeatedIndex] = true;
      				objAlert = new newAlert("You have found a new weapon: "+player.power[this.levelDefeatedIndex+1].nome+"!", gamestate);
      				gamestate = 5;
      				this.life = -1;
      			}
      		}
      	} //fine di physics              
      }

      function newPickUp_Cuore(indicePassatoNonParsato) { //le spine per terra
      	this.life = 9999999999;
      	this.type = "pickup";
      	this.name = "heart tank";
      	this.indice = parsaApici(indicePassatoNonParsato);
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
      	this.width = 20;
      	this.height = 20;
      	this.color1 = "#ff2f97";
      	this.color2 = "#999999";
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
      		ctx.beginPath();
      		ctx.lineWidth = "2";
      		ctx.fillStyle = this.color1;
      		ctx.strokeStyle = this.color2;
      		ctx.moveTo(xdisegnata, ydisegnata);
      		ctx.lineTo(xdisegnata + (this.width / 2) - (this.width / 10), ydisegnata);
      		ctx.lineTo(xdisegnata + (this.width / 2), ydisegnata + (this.height / 5));
      		ctx.lineTo(xdisegnata + (this.width / 2) + (this.width / 10), ydisegnata);
      		ctx.lineTo(xdisegnata + (this.width), ydisegnata);
      		ctx.lineTo(xdisegnata + (this.width), ydisegnata + (this.height / 2));
      		ctx.lineTo(xdisegnata + (this.width / 2), ydisegnata + this.height);
      		ctx.lineTo(xdisegnata, ydisegnata + (this.height / 2));
      		ctx.lineTo(xdisegnata, ydisegnata);
      		ctx.fill();
      		ctx.stroke();
		if(debugMode || levelEditor){
      			ctx.textAlign = "center";
      			ctx.font = "small-caps bold 12px Lucida Console";
      			var textHeight = ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo			
      			disegnaTestoConBordino(this.indice, xdisegnata + (this.width / 2), (ydisegnata + (this.height - 2) / 2 + textHeight / 2), "#ffffff", "#000000");
      			ctx.textAlign = "left"; //lo azzero se no mi si bugga in alcuni menu
		}
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (heartAcquired[this.indice]) { //se il player l'ha gia' trovata disattiva l'entita'
      			this.life = -1;
      		} else { //da qui inizia this.physics vero e proprio
      			if (collisionBetween(this, player)) { //quando il player lo raccoglie
      				this.life = -1;
      				objAlert = new newAlert("You have found a Heart! Max life augmented.", gamestate);
      				gamestate = 5;
      				heartAcquired[this.indice] = true;
      				player.lifeMax += 2;
      				player.life += 2;
      			}
      		}
      	} //fine di physics
      	function parsaApici(stringaDiApici) { //parsa ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ in numeri
      		switch (stringaDiApici) {
      			case "⁰":
      				return 0;
      				break;
      			case "¹":
      				return 1;
      				break;
      			case "²":
      				return 2;
      				break;
      			case "³":
      				return 3;
      				break;
      			case "⁴":
      				return 4;
      				break;
      			case "⁵":
      				return 5;
      				break;
      			case "⁶":
      				return 6;
      				break;
      			case "⁷":
      				return 7;
      				break;
      			case "⁸":
      				return 8;
      				break;
      			case "⁹":
      				return 9;
      				break;
      		}
      	}
      }

      function newPickUp_LifeEnergy(vitaRecuperata) {
      	this.life = 9999999999;
      	this.type = "pickup";
      	this.name = "life recovery";
      	this.damage = -vitaRecuperata;
      	this.x = 0;
      	this.y = 0;
      	this.yv = 0;
      	this.width = 20;
      	this.height = 20;
      	this.color1 = "#d70000";
      	this.color2 = "#ffe100";
      	this.color3 = "#868686";
      	this.isInWater = false;
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
      		ctx.fillStyle = this.color3;
      		ctx.fillRect(xdisegnata - 3, ydisegnata + 3, this.width + 6, this.height - 6);
      		ctx.fillStyle = this.color1;
      		ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
      		ctx.fillStyle = this.color2;
      		ctx.fillRect(xdisegnata + 2, ydisegnata + 2, this.width - 4, this.height - 4);
      	} //fine di selfDraw
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
      		this.y += this.yv; //apply gravity

      		for (var i = 0; i < level.length; i++) { //y collision with level
      			if (collisionBetween(this, level[i])) {
      				this.y = level[i].y - this.height;
      			}
      		}
      		for (var i = 0; i < entity.length; i++) { //y collision with entities that are solid (ostacolo e piattaforma)
      			if (entity[i].life > 0 && (entity[i].type == "ostacolo" || entity[i].type == "piattaforma")) {
      				if (((this.y + this.height) > entity[i].y) && ((this.y + this.height) < entity[i].y + 19) && (collisionBetween(this, entity[i]))) {
      					this.y = entity[i].y - this.height;
      				}
      			}
      		}

      		if (collisionBetween(this, player)) { //quando il player lo raccoglie
      			this.life = -1;
      		}
      	} //fine di physics              
      }

      function newPickUp_WeaponEnergy(usageRecuparato) {
      	this.life = 9999999999;
      	this.type = "pickup";
      	this.name = "weapon e. recovery";
      	this.damage = 0;
      	this.usageRestore = usageRecuparato;
      	this.x = 0;
      	this.y = 0;
      	this.yv = 0;
      	this.width = 20;
      	this.height = 20;
      	this.color1 = "#003ef0";
      	this.color2 = "#3AB7D4";
      	this.color3 = "#ff7c00";
      	this.isInWater = false;
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
      		ctx.fillStyle = this.color1;
      		ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
      		ctx.fillStyle = this.color2;
      		ctx.fillRect(xdisegnata + 2, ydisegnata + 2, this.width - 4, this.height - 4);
      		ctx.fillStyle = this.color3;
      		ctx.fillRect(xdisegnata, ydisegnata - 1.5 + this.height / 2, this.width, 3);
      	} //fine di selfDraw
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
      		this.y += this.yv; //apply gravity

      		for (var i = 0; i < level.length; i++) { //y collision with level
      			if (collisionBetween(this, level[i])) {
      				this.y = level[i].y - this.height;
      			}
      		}
      		for (var i = 0; i < entity.length; i++) { //y collision with entities that are solid (ostacolo e piattaforma)
      			if (entity[i].life > 0 && (entity[i].type == "ostacolo" || entity[i].type == "piattaforma")) {
      				if (((this.y + this.height) > entity[i].y) && ((this.y + this.height) < entity[i].y + 19) && (collisionBetween(this, entity[i]))) {
      					this.y = entity[i].y - this.height;
      				}
      			}
      		}

      		if (collisionBetween(this, player)) { //quando il player lo raccoglie
      			this.life = -1;
      			if (levelDefeated != "false,false,false,false,false,false,false,false") {
      				for (; this.usageRestore > 0;) {
      					if (player.activePower != 0) {
      						if (player.power[player.activePower - 1].usage < player.power[player.activePower - 1].usageMax) {
      							this.usageRestore--;
      							player.power[player.activePower - 1].usage++;
      						} else {
      							for (i = 0; i < 9; i++) {
      								if (i != 8) {
      									if (levelDefeated[i]) {
      										if (player.power[i].usage < player.power[i].usageMax) {
      											this.usageRestore--;
      											player.power[i].usage++;
      											break;
      										}
      									}
      								} else {
      									this.usageRestore = -1;
      								}
      							}
      						}
      					} else {
      						for (i = 0; i < 9; i++) {
      							if (i != 8) {
      								if (levelDefeated[i]) {
      									if (player.power[i].usage < player.power[i].usageMax) {
      										this.usageRestore--;
      										player.power[i].usage++;
      										break;
      									}
      								}
      							} else {
      								this.usageRestore = -1;
      							}
      						}
      					}
      				}
      			}
      		}
      	} //fine di physics              
      }
