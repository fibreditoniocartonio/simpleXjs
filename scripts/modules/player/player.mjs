function getCurrentPlayerName(currentPlayer) {
      	switch (currentPlayer) {
      		case 1:
      			return "riccardo belmonte";
      		default:
      			return "ics";
      	}
}

function switchToNextPlayableCharacter(){
	if(currentPlayer<maxCurrentPlayer-1){
		currentPlayer++;
	}else{	currentPlayer=0;}
	var tempPlayer=player;
	player=nuovoPlayer(currentPlayer);
	player.x=tempPlayer.x-(player.width-tempPlayer.width)/2;
	player.y=tempPlayer.y-(player.height-tempPlayer.height);
	player.facingRight=tempPlayer.facingRight;
	player.life=tempPlayer.life;
	player.power=tempPlayer.power;
}

function nuovoPlayer(currentPlayer) {
      	if (currentPlayer == 0) {
      		var player = new Player();
      		return player;
      		//prototipo del player X
      		function Player() {
      			this.name = "ics";
			this.spriteDefault = new Image();
      			this.spriteDefault.src = "data:image/png;base64,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";
			this.sprite = document.createElement("canvas");
			this.sprite.ctx=this.sprite.getContext('2d');
			this.sprite.larg=32;
			this.sprite.alt=32;
			this.stance = [0, 0]; //colonna, riga (x,y)
      			this.sprite.timer = 0;
      			this.lifeMax = 16;
      			for (i = 0; i < 8; i++) {
      				if (heartAcquired[i]) {
      					this.lifeMax += 2;
      				}
      			} //aumenta la vita massima di 2 per ogni cuore trovato
      			this.life = this.lifeMax;
      			this.x = 0;
      			this.y = 0;
      			this.yv = 0;
      			this.xv = 0;
      			this.slope = 0;
      			this.width = 40;
      			this.height = 46;
      			this.color1 = '#0040f0';
      			this.color2 = '#f0f0f0';
      			this.defaultColor1 = '#0040f0';
      			this.defaultColor2 = '#f0f0f0';
      			this.charge0color = '#ffc000';
      			this.charge1color = '#49ff37';
      			this.charge2color = '#14dfff';
      			this.charge3color = '#ff3788';
      			this.speed = 0.9;
			this.attackTimer=0;
			this.attackTimerMax=10;
      			this.defaultspeed = 0.9;
      			this.jumpheight = 13.5;
      			this.giasaltato = false;
      			this.giasparato = false;
      			this.facingRight = true;
      			this.isInWater = false;
			this.touchingWall=false;
      			this.invulnerability = 0;
      			this.canMove = true;
      			this.canChangeWeap = true;
      			this.carica = 0;
      			this.activePower = 0;
      			this.activeShot = 0;
      			this.power = [ //vettore dei poteri
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#687968',
      					color2: '#d9b289',
      					nome: 'Homing Torpedo'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#1a914f',
      					color2: '#60d1aa',
      					nome: 'Chameleon Sting'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#e13e60',
      					color2: '#a1c1aa',
      					nome: 'Rolling Shield'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#f14f02',
      					color2: '#f8e179',
      					nome: 'Fire Wave'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#e40097',
      					color2: '#e191c1',
      					nome: 'Storm Tornado'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#f8b202',
      					color2: '#a1a1a1',
      					nome: 'Electric Spark'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#606081',
      					color2: '#81aa89',
      					nome: 'Boomerang Cutter'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#35e1f8',
      					color2: '#f8e14f',
      					nome: 'Shotgun Ice'
      				},
      			];
			this.getHit = function(damage, ignoreInvulnerability){
      				if (this.invulnerability < 1 || ignoreInvulnerability) { //entity collison								            		
      					if (armaturaAcquired[3] && (damage > 1)) {
      						this.life = this.life - (damage - 1);
	      				} else {
      						this.life = this.life - damage;
      					}
      					this.invulnerability = 40;
      					this.canMove = false;
      				}
			}
      			this.disegnaPlayer = function (xdisegnata, ydisegnata) {
				ydisegnata-=17;
      				if ((this.facingRight && !(this.touchingWall && Math.round(this.yv)>0)) || (!this.facingRight && (this.touchingWall && Math.round(this.yv)>0))) {
      					ctx.drawImage(this.sprite, this.sprite.larg*this.stance[0], this.sprite.alt*this.stance[1], this.sprite.larg, this.sprite.alt, xdisegnata, ydisegnata, this.sprite.larg*2, this.sprite.alt*2);
      				} else {
      					ctx.save(); //salvo il canvas attuale
      					ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      					ctx.drawImage(this.sprite, this.sprite.larg*this.stance[0], this.sprite.alt*this.stance[1], this.sprite.larg, this.sprite.alt, -xdisegnata, ydisegnata, -this.sprite.larg*2, this.sprite.alt*2);
      					ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      				}
				ydisegnata+=17;
				if (this.carica > 80) { //level 2 charge and 3
      					if (this.carica > 150 && armaturaAcquired[2]) { //charge 3 - richiede armaturaAcquired[2]
      						var xdisegnata = xDisegnata();
      						var ydisegnata = yDisegnata();
      						var xrandom = ((-this.width / 4) + Math.floor(Math.random() * (this.width / 2))) * 3;
      						var yrandom = ((-this.height / 4) + Math.floor(Math.random() * (this.height / 2))) * 2;
      						ctx.fillStyle = this.charge3color;
      						ctx.fillRect(xdisegnata + (this.width / 2) + xrandom, ydisegnata + (this.height / 2) + yrandom, 8, 8);
      					} else { //charge 2
      						var xdisegnata = xDisegnata();
      						var ydisegnata = yDisegnata();
      						var xrandom = ((-this.width / 4) + Math.floor(Math.random() * (this.width / 2))) * 3;
      						var yrandom = ((-this.height / 4) + Math.floor(Math.random() * (this.height / 2))) * 2;
      						ctx.fillStyle = this.charge0color;
      						ctx.fillRect(xdisegnata + (this.width / 2) + xrandom, ydisegnata + (this.height / 2) + yrandom, 8, 8);
      					}
      				} else if (this.carica > 25) { //level 1 charge
      					var xdisegnata = xDisegnata();
      					var ydisegnata = yDisegnata();
      					var xrandom = ((-this.width / 4) + Math.floor(Math.random() * (this.width / 2))) * 3;
      					var yrandom = ((-this.height / 4) + Math.floor(Math.random() * (this.height / 2))) * 2;
      					ctx.fillStyle = this.charge1color;
      					ctx.fillRect(xdisegnata + (this.width / 2) + xrandom, ydisegnata + (this.height / 2) + yrandom, 8, 8);
      				}
				if(debugMode){ctx.fillStyle="#00ff00"; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);} //hitbox
      			}
      			this.physics = function () { //this function handles the platformer physics - in realta' solo del player
				this.touchingWall=false;
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
      				this.y += this.yv; //apply gravity

      				for (var i = 0; i < level.length; i++) { //y collision con level
      					if (collisionBetween(this, level[i])) {
      						this.y += -this.yv;
      						this.yv = 0;
      						if (keys[dashkey] && this.canMove && armaturaAcquired[1]) { //dash
      							this.speed = this.defaultspeed * 2.25;
      						} else {
      							this.speed = this.defaultspeed;
      						}
      						if (keys[jumpkey] && this.canMove) { //jump
      							if (!this.giasaltato) {
      								this.yv = -this.jumpheight;
      								this.giasaltato = true;
      							} else {
      								this.yv = 0;
      							}
      						} else {
      							this.giasaltato = false;
      						}
      					}
      				}

      				for (var i = 0; i < entity.length; i++) { //y collision con entity (piattaforma e ostacolo)
      					if (entity[i].life > 0 && entity[i].type == "platform" && !entity[i].disabled) {
      						if (collisionBetween(this, entity[i])) {
      							if (((this.y + this.height) > entity[i].y) && ((this.y + this.height) < entity[i].y + 19)) { //collisione con y
      								this.y = entity[i].y - this.height;
								if(entity[i].yv){this.yv = entity[i].yv * 1.1;}else{this.yv=0;}
      								if (keys[dashkey] && this.canMove && armaturaAcquired[1]) { //dash
      									this.speed = this.defaultspeed * 2.25;
      								} else {
      									this.speed = this.defaultspeed;
      								}
      								if (keys[jumpkey] && this.canMove) { //jump
      									if (!this.giasaltato) {
      										this.yv = -this.jumpheight;
      										this.giasaltato = true;
      									} else {
      										this.yv = 0;
      									}
      								} else {
      									this.giasaltato = false;
      								}
								if(entity[i].name=="thin platform" && keys[giukey] && keys[jumpkey]){
									this.y=Math.ceil(this.y)+1; //salta giu dalla platform
									this.yv=1;
								}
      								if(entity[i].speed){ //se l'entita si muove, il player si muove con essa
      									this.xv += entity[i].xv;
      									if (entity[i].xv > 0) {
      										if (this.xv > entity[i].xv) {
      											this.xv = entity[i].xv / 1.85;
      										}
      									} else {
      										if (this.xv < entity[i].xv) {
      											this.xv = entity[i].xv / 1.85;
      										}
      									}
      									this.x -= this.xv;
      									for (var j = 0; j < level.length; j++) {
      										if (collisionBetween(this, level[j])) {
      											this.x += this.xv * 2;
      										}
      									}
      								}
      							} else { //collisione con x
      								this.y += this.slope;
      								this.x -= -this.xv;
      								if (keys[dashkey] && this.canMove && armaturaAcquired[1]) { //wall dash
      									this.speed = this.defaultspeed * 2.25;
      								} else {
      									this.speed = this.defaultspeed;
      								}
      								if (keys[jumpkey] && this.canMove) { //wall jumping
      									if (!this.giasaltato) {
      										this.yv = -this.jumpheight + 1;
      										if (this.xv > 0) {
      											this.xv = -9.9;
      										} else {
      											this.xv = 9.9;
      										}
      										this.giasaltato = true;
      									} else {
      										this.xv = 0;
      									}
      								} else {
									this.touchingWall=true;
									this.yv=this.yv/1.3;
      									this.xv = 0;
      									this.giasaltato = false;
      								}
      							}
      						}
      					}
      				}

      				if (keys[destrakey] && this.canMove) { //x movement
      					this.xv -= this.speed;
      					this.facingRight = true;
      				}
      				if (keys[sinistrakey] && this.canMove) {
      					this.xv += this.speed;
      					this.facingRight = false;
      				}
      				this.xv *= frizioneApplicata;
      				this.x += -this.xv;

      				if (keys[lkey] && !tastoGiaSchiacciato && this.canMove && this.canChangeWeap) { //previous available power
      					tastoGiaSchiacciato = true;
      					for (i = this.activePower - 1;; i--) {
      						if (i == -1) {
      							i = 8;
      						} else if (i == 0) {
      							this.activePower = 0;
      							break;
      						}
      						if (levelDefeated[i - 1]) {
      							this.activePower = i;
      							break;
      						}
      					}
      					this.calcolaPlayerColor();
      				}

      				if (keys[rkey] && !tastoGiaSchiacciato && this.canMove && this.canChangeWeap) { //next available power
      					tastoGiaSchiacciato = true;
      					for (i = this.activePower + 1;; i++) {
      						if (i == 9) {
      							this.activePower = 0;
      							break;
      						} else if (levelDefeated[i - 1]) {
      							this.activePower = i;
      							break;
      						}
      					}
      					this.calcolaPlayerColor();
      				}

      				if (keys[sparokey] && this.canMove) { //shooting
      					if (!this.giasparato) {
      						if (this.activeShot < 3) { //se non ci sono piu di 3 colpi attivi contemporaneamente        
							this.attackTimer=this.attackTimerMax;
      							this.giasparato = true;
      							if (this.activePower == 0) {
      								var sparo = new newSparo(20, 10);
      								entity.push(sparo);
      								this.activeShot++;
      							} else {
      								if (this.power[this.activePower - 1].usage > 0) {
      									switch (this.activePower) {
      										/*HomingTorpedo*/
      										case 1:
      											var sparo = new newHomingMissle(12, 12, this.power[0].color1, this.power[0].color2, 1.5);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 1.5;
      											this.power[this.activePower - 1].usage -= 0.5;
      											break;
      											/*ChameleonSting*/
      										case 2:
      											var sparo = new newChameleonSting(15, 15);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 0.5;
      											break;
      											/*RollingShield*/
      										case 3:
      											var sparo = new newRollingShield(40, 40);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*Fire*/
      										case 4:
      											var sparo = new newFireWave(70, 10);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*Storm*/
      										case 5:
      											var sparo = new newStormTornado(this.x, (this.y + 3 + (15 / 2)), 15, 15, 0, this.facingRight, true);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*Electric*/
      										case 6:
      											var sparo = new newElectricSpark(15, 15);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 1;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*Boomerang*/
      										case 7:
      											var sparo = new newBoomerangCutter(15, 15, true);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 1;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      											/*ShotgunIce*/
      										case 8:
      											var sparo = new newShotgunIce(this.x + this.width + 6, this.x - 6 - 15, this.y + 6, 15, 15, true, 2.5, 0, this.facingRight);
      											entity.push(sparo);
      											this.activeShot = this.activeShot + 3;
      											this.power[this.activePower - 1].usage -= 1;
      											break;
      									}
      								}
      							}
      						}
      					} else {
      						if (this.activePower == 0 || armaturaAcquired[2]) {
      							this.carica++; 
      						}
      					}
      				} else {
      					if (this.giasparato) {
      						if (this.canMove) {
      							if (this.activeShot < 3) { //se non ci sono piu di 3 colpi attivi contemporaneamente        
								this.attackTimer=this.attackTimerMax;
      								if (this.activePower == 0) { //default power
      									if (this.carica > 80) {
      										this.activeShot++;
      										if (this.carica > 150 && armaturaAcquired[2]) { //charge 3 shoot
      											var latoCubottiSparo = 15;
      											if (this.facingRight) {
      												var sparo = new newSparoCharge3((this.x + this.width + 6), (this.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, this.facingRight, true);
      												var sparoInvisibile = new newSparo(1, 55); //gestisce activeShot per lo sparoCharge3
      												sparoInvisibile.x = (this.x + this.width + 6);
      											} else {
      												var sparo = new newSparoCharge3((this.x - 6 - latoCubottiSparo), (this.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, this.facingRight, true);
      												var sparoInvisibile = new newSparo(1, 55);
      												sparoInvisibile.x = (this.x - 6 - latoCubottiSparo);
      											}
      											sparo.color = this.charge3color;
      											sparoInvisibile.color = "#00000000"; //sono 8 zeri invece che 6, gli ultimi due indicano il canale alpha(trasparenza)
      											sparoInvisibile.damage = sparo.damage;
      											sparoInvisibile.speed = sparo.speed;
      											sparoInvisibile.y = sparo.startingY - 20;
      											sparoInvisibile.canPassWall = true;
      											entity.push(sparo);
      											entity.push(sparoInvisibile);
      											var latoCubottiSparo = 15;
      											if (this.facingRight) {
      												var sparo = new newSparoCharge3((this.x + this.width + 6), (this.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, this.facingRight, false);
      											} else {
      												var sparo = new newSparoCharge3((this.x - 6 - latoCubottiSparo), (this.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, this.facingRight, false);
      											}
      											sparo.color = this.charge3color;
      											entity.push(sparo);
      										} else { //charge 2 shoot
      											var sparo = new newSparo(50, 25);
      											sparo.y = sparo.y - 7;
      											sparo.color = this.charge2color;
      											sparo.damage = 3;
      											sparo.perforation = true;
      											entity.push(sparo);
      										}
      									} else if (this.carica > 25) { //charge 1 shoot
      										this.activeShot++;
      										var sparo = new newSparo(35, 15);
      										sparo.y = sparo.y - 2;
      										sparo.damage = 2;
      										sparo.color = this.charge1color;
      										entity.push(sparo);
      									}
      									this.carica = 0;
      									this.giasparato = false;
      								} else {
      									if (this.carica > 150 && armaturaAcquired[2]) {
      										switch (this.activePower) { //poteri caricati
      											/*HomingTorpedo*/
      											case 1:
      												if (this.power[this.activePower - 1].usage > 2) {
      													var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 3);
      													sparo.damage = 2;
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      													var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 0);
      													sparo.y += -15;
      													sparo.damage = 2;
      													entity.push(sparo);
      													var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 0);
      													sparo.y += 15;
      													sparo.damage = 2;
      													entity.push(sparo);
      													var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 0);
      													sparo.y += -30;
      													sparo.damage = 2;
      													entity.push(sparo);
      													this.power[this.activePower - 1].usage -= 3;
      												}
      												break;
      												/*ChameleonSting*/
      											case 2:
      												if (this.power[this.activePower - 1].usage > 3.5 && this.invulnerability < 90000) {
      													this.invulnerability = 91000;
      													this.canChangeWeap = false;
      													this.power[this.activePower - 1].usage -= 4;
      												}
      												break;
      												/*RollingShield*/
      											case 3:
      												if (this.power[this.activePower - 1].usage > 1) {
      													this.power[this.activePower - 1].usage -= 2;
      													this.canChangeWeap = false;
      													var sparo = new newRollingShieldCharge3(100, 100);
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      												}
      												break;
      												/*FireWave*/
      											case 4:
      												if (this.power[this.activePower - 1].usage > 2) {
      													var sparo = new newFireWaveCharge3Main(20, 20);
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      													this.power[this.activePower - 1].usage -= 3;
      												}
      												break;
      												/*StormTornado*/
      											case 5:
      												if (this.power[this.activePower - 1].usage > 1) {
      													this.power[this.activePower - 1].usage -= 2;
      													var sparo = new newStormTornadoCharge3(this.x, this.y + 6, 60, 15, this.facingRight, 0, true);
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      												}
      												break;
      												/*ElectricSpark*/
      											case 6:
      												if (this.power[this.activePower - 1].usage > 1) {
      													this.activeShot = this.activeShot + 3;
      													if (this.facingRight) {
      														var sparo = new newElectricSparkCharge3(this.x + this.width + 6, this.y + 9, 16, 100, this.facingRight);
      														entity.push(sparo);
      														var sparo = new newElectricSparkCharge3(this.x + this.width + 6, this.y + 9, 16, 100, !this.facingRight);
      														entity.push(sparo);
      													} else {
      														var sparo = new newElectricSparkCharge3(this.x - 6 - 16, this.y + 9, 16, 100, this.facingRight);
      														entity.push(sparo);
      														var sparo = new newElectricSparkCharge3(this.x - 6 - 16, this.y + 9, 16, 100, !this.facingRight);
      														entity.push(sparo);
      													}
      													this.power[this.activePower - 1].usage -= 2;
      												}
      												break;
      												/*BoomerangCut*/
      											case 7:
      												if (this.power[this.activePower - 1].usage > 1) {
      													this.power[this.activePower - 1].usage -= 2;
      													this.activeShot = this.activeShot + 3;
      													var sparo = new newBoomerangCutterCharge3(30, 30, 0, true);
      													entity.push(sparo);
      													var sparo = new newBoomerangCutterCharge3(30, 30, 1, false);
      													entity.push(sparo);
      													var sparo = new newBoomerangCutterCharge3(30, 30, 2, true);
      													entity.push(sparo);
      													var sparo = new newBoomerangCutterCharge3(30, 30, 3, false);
      													entity.push(sparo);
      												}
      												break;
      												/*ShotgunIce*/
      											case 8:
      												if (this.power[this.activePower - 1].usage > 1) {
      													var sparo = new newShotgunIceCharge3(60, 20);
      													entity.push(sparo);
      													this.activeShot = this.activeShot + 3;
      													this.power[this.activePower - 1].usage -= 2;
      												}
      												break;
      										}
      									}
      									this.giasparato = false;
      									this.carica = 0;
      								}
      							} else {
      								this.carica = 0;
      							}
      						} else {
      							this.carica = -9999999999999;
      						}
      					}
      				}

      				this.slope = 0; //serve per i bordi tipo - serve anche per le collision
      				for (var i = 0; i < level.length; i++) {
      					if (collisionBetween(this, level[i])) {
      						if (this.slope != -8) {
      							this.y -= 1;
      							this.slope += 1;
      						}
      					}
      				}

      				for (var i = 0; i < level.length; i++) { //x collision
      					if (collisionBetween(this, level[i])) {
      						this.y += this.slope;
      						this.x -= -this.xv;
      						if (keys[dashkey] && this.canMove && armaturaAcquired[1]) { //wall dash
      							this.speed = this.defaultspeed * 2.25;
      						} else {
      							this.speed = this.defaultspeed;
      						}
      						if (keys[jumpkey] && this.canMove) { //wall jumping
      							if (!this.giasaltato) {
      								this.yv = -this.jumpheight + 1;
      								if (this.xv > 0) {
      									this.xv = -9.9;
      								} else {
      									this.xv = 9.9;
      								}
      								this.giasaltato = true;
      							} else {
      								this.xv = 0;
      							}
      						} else {
							this.touchingWall=true;
							this.yv=this.yv/1.3;
      							this.xv = 0;
      							this.giasaltato = false;
      						}
      					}
      				}

      				for (var i = 0; i < entity.length; i++) { //contatto con entita'
      					if (entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer")) {
      						if (collisionBetween(this, entity[i])) {
      							if (entity[i].damage > 0) {
								this.getHit(entity[i].damage);
								break;
      							} else { //qui stiamo parlando delle entita' con danno<1, praticamente i pickup (se hanno il danno in negativo restituiscono la vita a X)
      								if ((this.life - entity[i].damage) > this.lifeMax) {
      									var vitaRecuperabile = (0 - entity[i].damage) - (this.lifeMax - this.life);
      									this.life = this.lifeMax;
      									for (j = 0; j < 4; j++) { //qui inizia a riempire le subtank
      										if (subtank[j].acquired) {
      											if ((subtank[j].life + vitaRecuperabile) > subtank[j].lifeMax) {
      												vitaRecuperabile = vitaRecuperabile - (subtank[j].lifeMax - subtank[j].life);
      												subtank[j].life = subtank[j].lifeMax;
      												i++;
      											} else {
      												subtank[j].life = subtank[j].life + vitaRecuperabile;
      												break;
      											}
      										}
      									}
      								} else {
      									this.life = this.life - entity[i].damage;
      								}
      							}
      						}
      					}
      				}

      				if (this.invulnerability > 0) { //se l'invulnerabilita' e' >=1 la riduce e colora x in base a che punto e'
      					this.invulnerability--;
      					if (this.invulnerability == 90000) {
      						this.invulnerability = 5;
      						this.canChangeWeap = true;
      					} //fine sting cham charge3
      					if (this.invulnerability > 90000) { //potere di sting chameleon charge3
      						this.calcolaPlayerColor();
      					}
      					if (this.invulnerability < 30) {
      						this.calcolaPlayerColor();
      						this.color1 = this.color2;
      						this.color2 = this.color2;
      					}
      					if (this.invulnerability < 20) {
      						this.canMove = true;
      					}
      					if (this.invulnerability < 5) {
      						this.calcolaPlayerColor();
      					}
      				}
				
				if(this.dead){CaricaPartita(stringaSalvataggio);}
      				if (this.life < 1 && !this.dead) { //gameover
					this.stance=[9,1];
      					disegnaSchermoDiGioco(false);
      					objAlert = new newAlert("Gameover", gamestate, 30);
      					gamestate = 5;
					this.dead=true;
      				}

      				if (keys[startkey]) { //menu di pausa
      					if (!tastoGiaSchiacciato && !(this.life < 1)) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
      						if (this.canChangeWeap) { //menu di pausa completo non apribile se si sta usando il potere di sting cham, almeno non si cambia potere
      							objMenuDiPausa = new newMenuDiPausa();
      							disegnaSchermoDiGioco(false);
      							tastoGiaSchiacciato = true;
      							gamestate = 2;
      						} else {
      							objAlert = new newAlert("pause", -1);
      							gamestate = 5;
      						}
      					}
      				}

				if (keys[mapkey]) { //menu mappa
      					if (!tastoGiaSchiacciato) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
      						objMenuMappa = new newMenuMappa(gamestate);
      						disegnaSchermoDiGioco(false);
      						tastoGiaSchiacciato = true;
      						gamestate = 7;
      					}
      				}

      				if (this.canMove && tastoGiaSchiacciato && !(keys[startkey] || keys[lkey] || keys[rkey])) { //azzera tasto gia schiacciato
      					tastoGiaSchiacciato = false;
      				}
      				player.calculateStance(player); //calcola lo sprite attuale da mostrare a schermo
      			} //fine della funzione playerPhysics - se riesco la faccio diventare un metodo di player invece che una funzione sestante
      			this.calcolaPlayerColor = function () { //calcola i colori attivi del player e li applica nel canvas di appoggio
      				if (this.invulnerability < 90000) { //se non e' stingCham charge3 
      					if (this.activePower == 0) {
      						this.color1 = this.defaultColor1;
      						this.color2 = this.defaultColor2;
      					} else {
      						this.color1 = this.power[this.activePower - 1].color1;
      						this.color2 = this.power[this.activePower - 1].color2;
      					}
      				} else { //se invece stingCham charge3
      					var colorNumber = this.invulnerability - 90000;
      					if (colorNumber > 950) {
      						this.color1 = "#ff1100";
      						this.color2 = "#ffa7a1";
      					} else if (colorNumber > 900) {
      						this.color1 = "#ff9500";
      						this.color2 = "#ffcc85";
      					} else if (colorNumber > 850) {
      						this.color1 = "#ffe400";
      						this.color2 = "#fff38d";
      					} else if (colorNumber > 800) {
      						this.color1 = "#aaff00";
      						this.color2 = "#d8ff8c";
      					} else if (colorNumber > 750) {
      						this.color1 = "#00ffb3";
      						this.color2 = "#a8ffe5";
      					} else if (colorNumber > 700) {
      						this.color1 = "#00b9ff";
      						this.color2 = "#bbecff";
      					} else if (colorNumber > 650) {
      						this.color1 = "#6100ff";
      						this.color2 = "#b78aff";
      					} else if (colorNumber > 600) {
      						this.color1 = "#e800ff";
      						this.color2 = "#fac6ff";
      					} else if (colorNumber > 550) {
      						this.color1 = "#ff1100";
      						this.color2 = "#ffa7a1";
      					} else if (colorNumber > 500) {
      						this.color1 = "#ff0084";
      						this.color2 = "#ffc7e4";
      					} else if (colorNumber > 450) {
      						this.color1 = "#ff9500";
      						this.color2 = "#ffcc85";
      					} else if (colorNumber > 400) {
      						this.color1 = "#ffe400";
      						this.color2 = "#fff38d";
      					} else if (colorNumber > 350) {
      						this.color1 = "#aaff00";
      						this.color2 = "#d8ff8c";
      					} else if (colorNumber > 300) {
      						this.color1 = "#00ffb3";
      						this.color2 = "#a8ffe5";
      					} else if (colorNumber > 250) {
      						this.color1 = "#00b9ff";
      						this.color2 = "#bbecff";
      					} else if (colorNumber > 200) {
      						this.color1 = "#6100ff";
      						this.color2 = "#b78aff";
      					} else if (colorNumber > 150) {
      						this.color1 = "#e800ff";
      						this.color2 = "#fac6ff";
      					} else if (colorNumber > 100) {
      						this.color1 = "#ff0084";
      						this.color2 = "#ffc7e4";
      					} else {
      						this.color1 = this.power[this.activePower - 1].color1;
      						this.color2 = this.color2 = this.power[this.activePower - 1].color2;
      					}
      				}
				//ora disegno sul canvas di appoggio il player con i vari pezzi di armatura ottenuti (armaturaAcquired)
				this.sprite.ctx.clearRect(0,0, this.sprite.width, this.sprite.height);
      				this.sprite.ctx.drawImage(this.spriteDefault, 0, 0, this.spriteDefault.width, 2*this.sprite.alt, 0, 0, this.spriteDefault.width, 2*this.sprite.alt);
				for(var i=0; i<4; i++){
					if(armaturaAcquired[i]){
      						this.sprite.ctx.drawImage(this.spriteDefault, 0, (i+1)*2*this.sprite.alt, this.spriteDefault.width, 2*this.sprite.alt, 0, 0, this.spriteDefault.width, 2*this.sprite.alt);
					}
				}
      			}//fine di calcolaPlayerColor();
			this.calcolaPlayerColor(); //chiamo subito calcolaPlayerColor, per inizializzare il canvas di appoggio quando viene costruito il player
      			this.calculateStance = function () { //calcola a che animazione della spritesheet e' il player
      				var previousStance = this.stance[0];
      				var maxTimer = 9; //quanti "frame" rimane un animazione. Dico "frame" ma in realta' e' un numero calcolato sui cicli dell'engine
      				if (this.attackTimer>0 && !this.dead) {
					this.attackTimer--;
					this.stance[1]=1;
      				} else {
					this.stance[1]=0;
				}
				if(Math.round(this.yv)!=0){ //player in aria
					this.spriteTimer=-1;
					if(this.touchingWall && Math.round(this.yv)>0){
						this.stance[0]=8;
					}else{
						this.stance[0]=7;
					}
				}else{
					if(Math.round(this.xv)==0){//fermo
						this.stance[0]=0;
						this.spriteTimer=-1;
					}else{ //in movimento
      						if (this.speed > this.defaultspeed + 0.1) { //running
							maxTimer=6;
      							switch (this.spriteTimer) {
      								case 0:
      									this.stance[0] = 5;
      									break;
      								case 1 * maxTimer:
      									this.stance[0] = 6;
      									break;
      								case 2 * maxTimer:
      									this.spriteTimer = -1;
      									break;
      							}
      						} else { //walking
      							switch (this.spriteTimer) {
      								case 0: 
      									this.stance[0] = 1;
      									break;
      								case 1 * maxTimer:
      									this.stance[0] = 2;
      									break;
      								case 2 * maxTimer:
      									this.stance[0] = 3;
      									break;
      								case 3 * maxTimer:
      									this.stance[0] = 4;
      									break;
      								case 4 * maxTimer:
      									this.spriteTimer = -1;
      									break;
      							}

      						}
					}
      					if (previousStance == this.stance[0]) {
	      					this.spriteTimer++;
      					}
				}
      			} //fine di calculateStance()
      		} //fine di PlayerX

      	} else if (currentPlayer == 1) {
      		var player = new Player();
      		return player;

      		//prototipo di Riccardo
      		function Player() {
      			this.name = "riccardo belmonte";
      			this.lifeMax = 16;
      			for (i = 0; i < 8; i++) {
      				if (heartAcquired[i]) {
      					this.lifeMax += 2;
      				}
      			} //aumenta la vita massima di 2 per ogni cuore trovato
      			this.life = this.lifeMax;
      			this.sprite = new Image();
      			this.sprite.src = "data:image/png;base64,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";
      			this.spriteTimer = 0;
      			this.subWeaponImg = new Image();
      			this.subWeaponImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAAAPCAYAAADOBNy/AAAAAXNSR0IArs4c6QAABURJREFUWIXtWT2I5DYU/rxcMVW4anE55ZTmiqBSpHJ1uApTiiuW4YpgUrmcKqgKqo7hikPlkMps5Sq4Co8UwVVwFaYctrrS1SqFLa//5PXsbkIu3APBjKRP7+npe09PMx4cUt1eGft59fbec837iv3/Yl+5QF3AVN+cwq/YC7A3152+u4uw7Lc/On1vLrfZ9w3OZ2+RzdXtlQHXJkiKydZlm0vpU8ar2ytDMXvS2s/V+xwsxczkVI6aVHq5r3zfSKWNVNrA981im33fBElhcioN+IXYBk8xa3FT2KvugGVOQcWoATWzppR3sS6Zxd5cQymCiyD/mN5nYMXbewBAst9Daw0iatsivb7fO5hWfN+sfvhm8pBfbL++b2i7RrXVoO0a1o5JbK+D65qJXWmyydT8x6JvyshJrO+bLVBH0KXY5+h9IlYymCoVpkqFoZj1WpWKeV91soXNGCzcGoqZkQzGEmeEtYRq2ihzdNrsfps5beYYkNTOH9UczxWptElicVFxBAA4n70jgGMs2jX0Tpm1CMHZZtl63U2ez4ttsIdZ5CWYIg8AKGZGKXoUu9plAIA8zcEjDgCYRfm+kYkEAJRlCQCQiQQ/HaAUIY4ZJAicMQB3PWggMuey47E3bv3rMzhjdeaAQE6EBHX90Z36ypmqhtmjI930o366h2Ro5zLGwMKticKwh0mzDJQdvS7WlSItMQDgpDPkVBrONvNY3zd5mj+YH/HeZl3YbpQHfIOKb0yRl1CKoFMBEWmIt/ejQrOgmkxW7HUy56vVzTXyNAcRoSxLCCGQ7PcoTycg3CGO0RIEANRfn1DdvmuxgQBUtBrpyCXrfecJYaWvnQVu+nqLRB09qA0AgIVbAzz4ztq8OHPYumMoNcMfpAIQhSHYoJ8xBgpDk2YZgF9G61gCWGMPJ8JuXa9x0u6IAVAXZyJDnFZQ0Qo8IWAjASSjaOjZ2hBDRBoAoFMBoCYJFPUO3yX2sIE6AzDGgKOYnMsCDh5xyES2xABqf6VZBrbXCGhTR/LJh0z6+IIK8AEHc8nq/S4R3zciEtAH2fMJZUdP7BKjU93z1yw5AhagkMFseh6m3t22zhI1CfpC2bFe6/30nS+VNn75GQBwOBEsQcQhnr8izmev0GFLEABAmSy6WpTUiGOGfBD5R8CLAWf2DBru26tEJhJJc5q0XU9iqMjBAo5EJmABb/uiMAQVOZL9HlKVICJI1Bk07tYLZZ8tvatkMDaS5jpL0joQWz81oqmwe2gJ8sqmkKkUX1CBICnMkCDd+UNsQGRaEkzIHBYAzpvX8MvP2K0ZDieCOMSerUFmsR2CTBHDheWsJkacCBR5WUctoYfVt1eYs3lO+nrvDP9QZxAq8naODSRLEJtJhtie3qmXTmfPo/3eLLX4AevOHLnwwLVxEcQlTypGG2GMgYhagliSLV6zIcglxShT5FWpMErqESlscapnMsilYknRyzQdolhidPteSsqyBE4H8ESNB08xynLX67oC3G9j5KL93cM+ZYeR48ROyBy2rTeaWuW8eb0Y25MJYriwq0h7ALCKtDckxmPYYnDND2ssJ/Zj/QJJswz21WJFJrIlRvXxDi/q54930KmGCHeQEXpNbErIWEGnuqd3nHp//lR/yTvR2rxcqh/fOV8Yj6XbufHuWE5lzwGcbZzX3kvopes/nU/lx7DFr9+61CL47vd5X91cgwW8Ld6JyEmMSZuaIrwtwJur9FFfdX6uH40P9E5GGfCF/k/xBWL5h+/bvvx9/YpbrNcGMurAfWmbZyPOfv6v/Vv4FfvvYP8GVuonnZsE/ksAAAAASUVORK5CYII=";
      			this.defaultColor1 = '#f8b202'; //per hud
      			this.color1 = this.defaultColor1;
      			this.x = 0;
      			this.y = 0;
      			this.yv = 0;
      			this.xv = 0;
      			this.slope = 0;
      			this.width = 30;
      			this.standingHeight = 57;
      			this.crouchedHeight = 33;
			this.damageWhip=[2,3];
			this.damageSliding=[2,2];
			this.damageUppercut=[4,4];
			this.entityWhippedIndex=[];
      			this.height = this.standingHeight;
      			this.crouching = false;
      			this.sliding = false;
			this.uppercut = false;
      			this.attacking = false;
      			this.attackTimer = 0;
			this.attackTimerMax = 32; //whip frames
      			this.subWeaponHeart = 0;
      			this.speed = 0.7;
      			this.stance = [0, 0]; //colonna, riga (x,y)
      			this.defaultspeed = 0.7;
      			this.jumpheight = 13.5;
      			this.giasaltato = false;
      			this.giasparato = false;
      			this.facingRight = true;
      			this.isInWater = false;
      			this.invulnerability = 0;
      			this.canMove = true;
      			this.stun = false;
      			this.canChangeWeap = true;
      			this.carica = 0;
      			this.activePower = 0;
      			this.activeShot = 0;
      			this.inputBuffer = "";
			this.bufferTimer = 0;
			this.bufferTimerMax = 20;
      			this.power = [ //vettore dei poteri
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#687968',
      					color2: '#d9b289',
      					nome: 'Knife'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#1a914f',
      					color2: '#60d1aa',
      					nome: 'Axe'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#e13e60',
      					color2: '#a1c1aa',
      					nome: 'Rebound Stone'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#f14f02',
      					color2: '#f8e179',
      					nome: 'Vibhuti'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#e40097',
      					color2: '#e191c1',
      					nome: 'Bible'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#f8b202',
      					color2: '#a1a1a1',
      					nome: 'Agunea'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#606081',
      					color2: '#81aa89',
      					nome: 'Cross'
      				},
      				{
      					usageMax: 28,
      					usage: 28,
      					color1: '#35e1f8',
      					color2: '#f8e14f',
      					nome: 'Holy Water'
      				},
      			];
      			this.disegnaPlayer = function (xdisegnata, ydisegnata, stance, sprite, facingRight) {
      				var mostraWhip = 0;
      				if (player.attackTimer > 14) {
      					mostraWhip = 41;
      				}
      				if (facingRight) {
      					ctx.drawImage(sprite, 16 * stance[0], 32 * stance[1], 16+mostraWhip, 32, xdisegnata, ydisegnata-6, (16+mostraWhip)*2, 32*2);
      				} else {
      					ctx.save(); //salvo il canvas attuale
      					ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      					ctx.drawImage(sprite, 16 * stance[0], 32 * stance[1], 16+mostraWhip, 32, -xdisegnata+(mostraWhip*2), ydisegnata-6, (-16-mostraWhip)*2, 32*2); //uso -xdisegnata perche' le coordinate del canvas sono mirrorate in negativo
      					ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
      				}
				if(debugMode){
					ctx.fillStyle="#00ff0080"; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
					ctx.textAlign = "center";
					disegnaTestoConBordino("t:"+player.bufferTimer+" buffer:"+player.inputBuffer, canvasWidth/2, canvasHeight-40, "#000000"); 
					ctx.textAlign = "left";
				}
      			}
			
			this.getHit = function (damage, skipInvulnerability){
				if(player.invulnerability<1 || skipInvulnerability){
      					if (armaturaAcquired[3] && (damage > 1)) {
      						player.life = player.life - (damage - 1);
      					} else {
      						player.life = player.life - damage;
      					}
					player.invulnerability = 40;
      					player.stun = true;
					if(player.attacking){player.attackTimer=player.attackTimerMax+1;}//disable attacks
					if(player.crouching){ //stop crouching
						player.sliding = false;
						player.crouching = false;
	      					player.y -= (player.standingHeight - player.crouchedHeight);
						player.height = player.standingHeight; //stop crouching and make the player stand up
					}
					player.xv=player.xv/3; //riduco il movimento x
					if(player.yv<0){ player.yv=player.yv/2; } //riduco il salto
				}
			}

      			this.physics = function (player, lvl) { //this function handles the platformer physics - in realta' solo del player
      				var gravityApplicata = 0;
      				var frizioneApplicata = 0;
      				if (player.y > level.waterLevel) { //determina se sei in acqua o no
      					if (!player.isInWater) {
      						player.isInWater = true;
      						player.yv = 0;
      					}
      					gravityApplicata = level.gravityWater;
      					frizioneApplicata = level.frictionWater;
      				} else {
      					player.isInWater = false;
      					gravityApplicata = level.gravity;
      					frizioneApplicata = level.friction;
      				}

      				player.yv += gravityApplicata; //get level gravity
      				player.y += player.yv; //apply gravity

      				for (var i = 0; i < lvl.length; i++) { //y collision con level
      					if (collisionBetween(player, lvl[i])) {
      						player.y += -player.yv;
      						player.yv = 0;
      						if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
      							player.speed = player.defaultspeed * 2.25;
      						} else {
      							player.speed = player.defaultspeed;
      						}
      						if (keys[jumpkey] && player.canMove) { //jump
      							if (!player.giasaltato) {
      								player.yv = -player.jumpheight;
      								player.giasaltato = true;
      							} else {
      								player.yv = 0;
      							}
      						} else {
      							player.giasaltato = false;
      						}
      					}
      				}

      				for (var i = 0; i < entity.length; i++) { //y collision con entity (piattaforma e ostacolo)
      					if (entity[i].life > 0 && entity[i].type == "platform" && !entity[i].disabled) {
      						if (collisionBetween(player, entity[i])) {
      							if (((player.y + player.height) > entity[i].y) && ((player.y + player.height) < entity[i].y + 19)) { //collisione con y
      								player.y = entity[i].y - player.height;
								if(entity[i].yv){player.yv = entity[i].yv * 1.1;}else{player.yv=0;}
      								if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //dash
      									player.speed = player.defaultspeed * 2.25;
      								} else {
      									player.speed = player.defaultspeed;
      								}
      								if (keys[jumpkey] && player.canMove) { //jump
      									if (!player.giasaltato) {
      										player.yv = -player.jumpheight;
      										player.giasaltato = true;
      									} else {
      										player.yv = 0;
      									}
      								} else {
      									player.giasaltato = false;
      								}
								if(entity[i].name=="thin platform" && keys[giukey] && keys[jumpkey]){
									player.y=Math.ceil(player.y)+1; //salta giu dalla platform
									player.yv=1;
								}
      								if(entity[i].speed){ //se l'entita si muove, il player si muove con essa
      									player.xv += entity[i].xv;
      									if (entity[i].xv > 0) {
      										if (player.xv > entity[i].xv) {
      											player.xv = entity[i].xv / 1.85;
      										}
      									} else {
      										if (player.xv < entity[i].xv) {
      											player.xv = entity[i].xv / 1.85;
      										}
      									}
      									player.x -= player.xv;
      									for (var j = 0; j < lvl.length; j++) {
      										if (collisionBetween(player, lvl[j])) {
      											player.x += player.xv * 2;
      										}
      									}
      								}
      							} else { //collisione con x
      								player.y += player.slope;
      								player.x -= -player.xv;
      								if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //wall dash
      									player.speed = player.defaultspeed * 2.25;
      								} else {
      									player.speed = player.defaultspeed;
      								}
      							}
      						}
      					}
      				}

      				if (player.crouching && keys[jumpkey] && armaturaAcquired[1] && !player.stun && !player.attacking && !tastoGiaSchiacciato) { //sliding
      					player.sliding = true;
					player.damageSliding[0]=player.damageSliding[1];
      					tastoGiaSchiacciato = true;
      					player.invulnerability = 825; //800-825 range per lo sliding (fa anche da timer)
      				}
      				if (player.sliding) {
      					if (player.invulnerability < 801 || player.yv > 0.5 || player.yv < -0.5) { //disattiva slide
      						player.sliding = false;
      						player.invulnerability = 1;
      						player.xv = player.xv * 0.01;
      					} else if (player.invulnerability > 801) { //movimento
      						if (player.facingRight) {
      							player.xv -= player.defaultspeed * 2.5;
      						} else {
      							player.xv += player.defaultspeed * 2.5;
      						}
      					}
      				}

				if (player.uppercut) {
      					if (player.invulnerability < 601) { //disattiva uppercut
      						player.uppercut = false;
						player.yv=player.yv/2;
      						player.invulnerability = 5;
      					} else if (player.invulnerability > 601) { //uppercut
      						player.yv -= player.defaultspeed * 2;
      					}
      				}

      				if (keys[giukey]) { //crouching
      					if (player.yv < 1 && player.yv > -1 && player.xv < 3 && player.xv > -3 && player.canMove) { //solo quando il player e' a terra ed e' quasi fermo
      						player.crouching = true;
      						player.y += (player.standingHeight - player.crouchedHeight);
      						player.height = player.crouchedHeight;
      					}
      				} else {
      					if (player.crouching && !player.sliding && !player.attacking) {
      						player.crouching = false;
      						player.y -= (player.standingHeight - player.crouchedHeight);
      						player.height = player.standingHeight; //stop crouching and make the player stand up
      					}
      				}
      				if (player.crouching && !player.sliding && !(player.yv < 1 && player.yv > -1 && player.xv < 3 && player.xv > -3)) {
      					player.crouching = false;
      					player.y -= (player.standingHeight - player.crouchedHeight);
      					player.height = player.standingHeight; //stop crouching and make the player stand up
      				}


      				if (keys[sparokey] && (player.canMove || (player.crouching && !player.sliding))) { //attacking
      					player.attacking = true;
      				}
      				if (player.attacking) {
      					player.attackTimer++;
      					if ((player.yv > 0.4 || player.yv < -0.4) && (player.xv > 1 || player.xv < -1)) { //se il player e' in salto e si stava gia muovendo
      						if (keys[destrakey]) {
      							player.xv -= player.speed;
      						}
      						if (keys[sinistrakey]) {
      							player.xv += player.speed;
      						}
      					}
      					if (player.attackTimer > 14) {
      						var corda = [];
						if(armaturaAcquired[2]){
      							corda["damage"] = player.damageWhip[1];
						}else{
      							corda["damage"] = player.damageWhip[0];
						}
      						corda["width"] = 84;
      						corda["height"] = 24;
      						if (player.facingRight) {
      							corda["x"] = player.x + player.width;
      						} else {
      							corda["x"] = player.x - corda.width;
      						}
      						corda["y"] = player.y + 2;
      						for (var i = 0;; i++) { //contatto con entita'
							for(var j=0; j < player.entityWhippedIndex.length; j++){ //skippa le entita' gia' whippate con questo colpo
								if(i==player.entityWhippedIndex[j]){
									i++; j=-1; 
								}
							}
							if(!(i<entity.length)){break;}//the cycle check is mid cycle because i can change the i with the previous for.
      							if (entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer" || entity[i].type == "pickup" )) {
      								if (collisionBetween(corda, entity[i])) {
      									if (entity[i].getHit) {
      										entity[i].getHit("corda", corda.damage);
										player.entityWhippedIndex.push(i);
      									}else{
										if(entity[i].type == "enemyShot"){ //shot eraser
											entity[i].life=-1;
										}
									}
      								}
      							}
      						}
      					}
      					if (player.attackTimer > player.attackTimerMax) {
      						player.attackTimer = 0;
      						player.xv = player.xv / 5;
      						player.attacking = false;
						player.entityWhippedIndex=[];
      					}
      				}

      				if (keys[destrakey] && player.canMove) { //x movement
      					player.xv -= player.speed;
      					player.facingRight = true;
      				}
      				if (keys[sinistrakey] && player.canMove) {
      					player.xv += player.speed;
      					player.facingRight = false;
      				}
      				player.xv *= frizioneApplicata;
      				player.x += -player.xv;

      				player.slope = 0; //serve per i bordi tipo - serve anche per le collision
      				for (var i = 0; i < lvl.length; i++) {
      					if (collisionBetween(player, lvl[i])) {
      						if (player.slope != -8) {
      							player.y -= 1;
      							player.slope += 1;
      						}
      					}
      				}

      				for (var i = 0; i < lvl.length; i++) { //x collision
      					if (collisionBetween(player, lvl[i])) {
      						player.y += player.slope;
      						player.x -= -player.xv;
      					}
      				}

      				for (var i = 0; i < entity.length; i++) { //contatto con entita'
      					if (entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer")) {
      						if (collisionBetween(player, entity[i])) {
      							if (entity[i].damage > 0) {
      								if (player.invulnerability < 1) { //entity collison
									player.getHit(entity[i].damage);
      									break;
      								}else if (player.sliding){ //sliding
								      	if (entity[i].getHit) {
      										entity[i].getHit("playerSlide", player.damageSliding[0]);
      									}
									if(entity[i].life>0 || !entity[i].getHit){ //se l'entita e' viva o non puo essere colpita (tipo Spike)
										player.getHit(entity[i].damage,true);
										player.damageSliding[0]=0;
									}
								}else if (player.uppercut){
									if (entity[i].getHit) {
      										entity[i].getHit("playerUppercut", player.damageUppercut[0]);
										if(enitity[i].life>0){ player.damageUppercut[0]=0;}
      									}
								}
      							} else { //qui stiamo parlando delle entita' con danno<1, praticamente i pickup (se hanno il danno in negativo restituiscono la vita a X)
      								if ((player.life - entity[i].damage) > player.lifeMax) {
      									var vitaRecuperabile = (0 - entity[i].damage) - (player.lifeMax - player.life);
      									player.life = player.lifeMax;
      									for (j = 0; j < 4; j++) { //qui inizia a riempire le subtank
      										if (subtank[j].acquired) {
      											if ((subtank[j].life + vitaRecuperabile) > subtank[j].lifeMax) {
      												vitaRecuperabile = vitaRecuperabile - (subtank[j].lifeMax - subtank[j].life);
      												subtank[j].life = subtank[j].lifeMax;
      												i++;
      											} else {
      												subtank[j].life = subtank[j].life + vitaRecuperabile;
      												break;
      											}
      										}
      									}
      								} else {
      									player.life = player.life - entity[i].damage;
      								}
      							}
      						}
      					}
      				}

      				if (keys[lkey] && !tastoGiaSchiacciato && player.canMove && player.canChangeWeap) { //previous available power
      					tastoGiaSchiacciato = true;
      					for (i = player.activePower - 1;; i--) {
      						if (i == -1) {
      							i = 8;
      						} else if (i == 0) {
      							player.activePower = 0;
      							break;
      						}
      						if (levelDefeated[i - 1]) {
      							player.activePower = i;
      							break;
      						}
      					}
      				}

      				if (keys[rkey] && !tastoGiaSchiacciato && player.canMove && player.canChangeWeap) { //next available power
      					tastoGiaSchiacciato = true;
      					for (i = player.activePower + 1;; i++) {
      						if (i == 9) {
      							player.activePower = 0;
      							break;
      						} else if (levelDefeated[i - 1]) {
      							player.activePower = i;
      							break;
      						}
      					}
      				}

      				if (player.invulnerability > 0) { //se l'invulnerabilita' e' >=1 la riduce
      					player.invulnerability--;
      					if (player.invulnerability < 20) {
      						player.stun = false;
      					}
      				}

				if(player.dead){CaricaPartita(stringaSalvataggio);}
      				if (player.life < 1 && !player.dead) { //gameover
					player.calculateStance(player); //calcolo lo sprite del player
      					disegnaSchermoDiGioco(false);
      					objAlert = new newAlert("Gameover", gamestate, 30);
      					gamestate = 5;
					player.dead=true;
      				}

      				if (keys[startkey]) { //menu di pausa
      					if (!tastoGiaSchiacciato && !(player.life < 1)) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
      						if (player.canChangeWeap) { //menu di pausa completo non apribile se si sta usando il potere di sting cham, almeno non si cambia potere
      							objMenuDiPausa = new newMenuDiPausa();
      							disegnaSchermoDiGioco(false);
      							tastoGiaSchiacciato = true;
      							gamestate = 2;
      						} else {
      							objAlert = new newAlert("pause", -1);
      							gamestate = 5;
      						}
      					}
      				}

				if (keys[mapkey]) { //menu mappa
      					if (!tastoGiaSchiacciato) { //ho dovuto fare il check della vita se no era possibile far aprire il menu dopo essere morti se si schiacciava INVIO nello stesso frame in cui si moriva
      						objMenuMappa = new newMenuMappa(gamestate);
      						disegnaSchermoDiGioco(false);
      						tastoGiaSchiacciato = true;
      						gamestate = 7;
      					}
      				}

      				if (player.canMove && tastoGiaSchiacciato && !(keys[startkey] || keys[lkey] || keys[rkey] || keys[sparokey])) { //azzera tasto gia schiacciato
      					tastoGiaSchiacciato = false;
      				}

      				if (!player.stun && !player.crouching && !player.sliding && !player.attacking && !player.uppercut) {
      					player.canMove = true;
      				} else {
      					player.canMove = false;
      				}

				player.calculateInputBuffer(); //calcola le combo
      				player.calculateStance(player); //calcola lo sprite attuale da mostrare a schermo
      			} //fine di Riccardo.physics()

      			this.calculateStance = function (player) { //calcola a che animazione della spritesheet e' il player
      				let previousStance = [player.stance[0], player.stance[1]];
      				let maxTimer = 9; //quanti "frame" rimane un animazione. Dico "frame" ma in realta' e' un numero calcolato sui cicli dell'engine
      				if (player.attacking) {
      					let riga = 1;
      					if (player.crouching) {
      						riga = 2;
      					}
      					if (player.attackTimer < 14) {
      						player.stance = [0, riga];
      					} else {
      						player.stance = [1, riga];
      					}
				} else if (player.stun){
					player.stance = [5, 2];
				} else if (player.uppercut){
					player.stance = [6, 2];
      				} else {
      					if (Math.round(player.yv) < 3) { //se il player e' a terra o in ascesa
      						if (Math.round(player.yv) > 0 && !player.crouching) {
      							player.stance = [0, 0];
      							player.spriteTimer = -1; //player sta atterando
      						} else if (Math.round(player.yv) > -1) { //player a terra
      							if ((player.xv > 0.3 || player.xv < -0.3) && !player.crouching) { //se il player si sta muovendo
      								if (player.speed > player.defaultspeed + 0.1) { //running
      									switch (player.spriteTimer) {
      										case 0:
      											player.stance = [4, 0];
      											break;
      										case 1 * maxTimer:
      											player.stance = [1, 0];
      											break;
      										case 2 * maxTimer:
      											player.stance = [3, 0];
      											break;
      										case 3 * maxTimer:
      											player.stance = [1, 0];
      											break;
      										case 4 * maxTimer:
      											player.stance = [4, 0];
      											player.spriteTimer = -1;
      											break;
      									}
      								} else { //walking
      									switch (player.spriteTimer) {
      										case 0:
      											player.stance = [0, 0];
      											break;
      										case 1 * maxTimer:
      											player.stance = [1, 0];
      											break;
      										case 2 * maxTimer:
      											player.stance = [2, 0];
      											break;
      										case 3 * maxTimer:
      											player.stance = [1, 0];
      											break;
      										case 4 * maxTimer:
      											player.stance = [0, 0];
      											player.spriteTimer = -1;
      											break;
      									}
      								}
      							} else {
      								if (player.crouching) {
      									if (player.sliding) {
      										player.stance = [5, 1];
      									} else {
      										player.stance = [5, 0];
      									}
      								} else {
      									player.stance = [0, 0];
      								}
      								player.spriteTimer = -1;
      							}
      						} else { //player in ascesa
      							player.stance = [6, 1];
      							player.spriteTimer = -1;
      						}
      					} else { //se invece il player e' in aria (discesa)
      						player.stance = [6, 0];
      						player.spriteTimer = -1;
      					}
      				}
      				if (previousStance[0] == player.stance[0] && previousStance[1] == player.stance[1]) {
      					player.spriteTimer++;
      				}
      			} //fine di calculateStance()

			this.calculateInputBuffer = function () { //calcola il buffer delle combo
				if(player.bufferTimer>0){player.bufferTimer--;}
				if(player.inputBuffer==""){ //caso buffer vuoto
					if(keys[giukey]){
						player.inputBuffer+=giukey;
						player.bufferTimer=player.bufferTimerMax;
					}
				}else if(player.bufferTimer>0){
					switch(player.inputBuffer){
						case (giukey):
							if(keys[sukey] && !keys[giukey]){
								player.inputBuffer+=sukey;
								player.bufferTimer=player.bufferTimerMax;
							}
							break;

						case (giukey+sukey):
							if(keys[jumpkey] && !keys[sukey] && !keys[giukey]){
								player.inputBuffer="";
								player.bufferTimer=0;
								if(player.canMove && armaturaAcquired[1]){//uppercut
									player.yv=player.yv/100;
									player.uppercut=true;
									player.damageUppercut[0]=player.damageUppercut[1];
									player.invulnerability = 625;
								}
							}
							break;
					}
				} else{
					player.bufferTimer=0; player.inputBuffer="";
				}

			}//fine di calculate Buffer

      		} //fine di new Riccardo()

      	}
} //fine di nuovoPlayer()
