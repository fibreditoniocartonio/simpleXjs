      function getCurrentPlayerName(currentPlayer) {
      	switch (currentPlayer) {
      		case 1:
      			return "riccardo belmonte";
      		default:
      			return "ics";
      	}
      }

      function nuovoPlayer(currentPlayer) {
      	if (currentPlayer == 0) {
      		var player = new Player();
      		return player;
      		//prototipo del player X
      		function Player() {
      			this.name = "ics";
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
      			this.width = 24;
      			this.height = 38;
      			this.color1 = '#003ef0';
      			this.color2 = '#3AB7D4';
      			this.coloreArmatura = '#e1e1e1';
      			this.defaultColor1 = '#003ef0';
      			this.defaultColor2 = '#3AB7D4';
      			this.defaultColoreArmatura = '#e1e1e1';
      			this.damagedColor = '#990003';
      			this.charge0color = '#ffc000';
      			this.charge1color = '#49ff37';
      			this.charge2color = '#14dfff';
      			this.charge3color = '#ff3788';
      			this.speed = 0.9;
      			this.defaultspeed = 0.9;
      			this.jumpheight = 13.5;
      			this.giasaltato = false;
      			this.giasparato = false;
      			this.facingRight = true;
      			this.isInWater = false;
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
      			this.disegnaPlayer = function (xdisegnata, ydisegnata, larghezza, altezza, dettagli, colore1, colore2, coloreArmatura) {
      				var coloreTemp = colore2;
      				ctx.fillStyle = colore1;
      				//testa
      				ctx.fillRect(xdisegnata + (larghezza / 2) - 6, ydisegnata - 2, 12, 12);
      				//gambe
      				ctx.fillRect(xdisegnata + (larghezza / 2) - 8, ydisegnata + (altezza) - 18, 6, 18);
      				ctx.fillRect(xdisegnata + (larghezza / 2) + 2, ydisegnata + (altezza) - 18, 6, 18);
      				//braccia
      				if (player.facingRight) {
      					ctx.fillRect(xdisegnata + 2 - 6, ydisegnata + 11, 6, 15);
      					ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11, 15, 6);
      				} else {
      					ctx.fillRect(xdisegnata + 2 - 15, ydisegnata + 11, 15, 6);
      					ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11, 6, 15);
      				}
      				if (dettagli) {
      					if (armaturaAcquired == "true,true,true,true") {
      						colore2 = colore1;
      					}
      					//testa
      					if (armaturaAcquired[0]) {
      						ctx.fillStyle = coloreArmatura;
      						ctx.fillRect(xdisegnata + (larghezza / 2) - 6, ydisegnata - 2, 12, 3);
      						ctx.fillRect(xdisegnata + (larghezza / 2) - 6, ydisegnata - 2, 2, 9);
      						ctx.fillRect(xdisegnata + (larghezza / 2) + 6 - 2, ydisegnata - 2, 2, 9);
      					}
      					//gambe
      					ctx.fillStyle = colore2;
      					ctx.fillRect(xdisegnata + (larghezza / 2) - 8, ydisegnata + (altezza) - 18, 6, 12);
      					ctx.fillRect(xdisegnata + (larghezza / 2) + 2, ydisegnata + (altezza) - 18, 6, 12);
      					if (armaturaAcquired[1]) {
      						ctx.fillStyle = coloreArmatura;
      						ctx.fillRect(xdisegnata + (larghezza / 2) - 8, ydisegnata + (altezza) - 6, 6, 6);
      						ctx.fillRect(xdisegnata + (larghezza / 2) + 2, ydisegnata + (altezza) - 6, 6, 6);
      						if (armaturaAcquired == "true,true,true,true") {
      							ctx.fillStyle = coloreTemp;
      							ctx.fillRect(xdisegnata + (larghezza / 2) - 8, ydisegnata + (altezza) - 8, 6, 2);
      							ctx.fillRect(xdisegnata + (larghezza / 2) + 2, ydisegnata + (altezza) - 8, 6, 2);
      						}
      					}
      					//braccia
      					ctx.fillStyle = colore2;
      					if (player.facingRight) {
      						ctx.fillRect(xdisegnata + 2 - 6, ydisegnata + 11, 6, 10);
      						ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11, 10, 6);
      						if (armaturaAcquired[2]) {
      							ctx.fillStyle = coloreArmatura;
      							ctx.fillRect(xdisegnata + 2 - 6, ydisegnata + 11 + 10, 6, 5);
      							ctx.fillRect(xdisegnata + (larghezza) - 2 + 15 - 5, ydisegnata + 11, 5, 6);
      							if (armaturaAcquired == "true,true,true,true") {
      								ctx.fillStyle = coloreTemp;
      								ctx.fillRect(xdisegnata + 2 - 6, ydisegnata + 11 + 10 - 2, 6, 2);
      								ctx.fillRect(xdisegnata + (larghezza) - 2 + 15 - 5 - 2, ydisegnata + 11, 2, 6);
      							}
      						}
      					} else {
      						ctx.fillRect(xdisegnata + 2 - 10, ydisegnata + 11, 10, 6);
      						ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11, 6, 10);
      						if (armaturaAcquired[2]) {
      							ctx.fillStyle = coloreArmatura;
      							ctx.fillRect(xdisegnata + 2 - 15, ydisegnata + 11, 5, 6);
      							ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11 + 10, 6, 5);
      							if (armaturaAcquired == "true,true,true,true") {
      								ctx.fillStyle = coloreTemp;
      								ctx.fillRect(xdisegnata + 2 - 15 + 5, ydisegnata + 11, 2, 6);
      								ctx.fillRect(xdisegnata + (larghezza) - 2, ydisegnata + 11 + 10 - 2, 6, 2);
      							}
      						}
      					}
      					//corpo
      					if (armaturaAcquired[3]) {
      						ctx.fillStyle = coloreArmatura;
      					} else {
      						ctx.fillStyle = colore1;
      					}
      				}
      				//corpo
      				ctx.beginPath();
      				ctx.lineWidth = "0";
      				ctx.moveTo(xdisegnata - 3, ydisegnata + 10);
      				ctx.lineTo(xdisegnata + larghezza + 3, ydisegnata + 10);
      				ctx.lineTo(xdisegnata + (larghezza / 2), ydisegnata + (altezza) - 5);
      				ctx.lineTo(xdisegnata - 3, ydisegnata + 10);
      				ctx.fill();
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
      					if (entity[i].life > 0 && entity[i].type == "piattaforma") {
      						if (collisionBetween(player, entity[i])) {
      							if (((player.y + player.height) > entity[i].y) && ((player.y + player.height) < entity[i].y + 19)) { //collisione con y
      								player.y = entity[i].y - player.height;
      								player.yv = entity[i].yv * 1.1;
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
      								if (entity[i].speed) {
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
      								if (keys[jumpkey] && player.canMove) { //wall jumping
      									if (!player.giasaltato) {
      										player.yv = -player.jumpheight + 1;
      										if (player.xv > 0) {
      											player.xv = -9.9;
      										} else {
      											player.xv = 9.9;
      										}
      										player.giasaltato = true;
      									} else {
      										player.xv = 0;
      									}
      								} else {
      									player.xv = 0;
      									player.giasaltato = false;
      								}
      							}
      						}
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
      					calcolaPlayerColor();
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
      					calcolaPlayerColor();
      				}

      				if (keys[sparokey] && player.canMove) { //shooting
      					if (!player.giasparato) {
      						if (player.activeShot < 3) { //se non ci sono piu di 3 colpi attivi contemporaneamente        
      							player.giasparato = true;
      							if (player.activePower == 0) {
      								var sparo = new newSparo(20, 10);
      								entity.push(sparo);
      								player.activeShot++;
      							} else {
      								if (player.power[player.activePower - 1].usage > 0) {
      									switch (player.activePower) {
      										/*HomingTorpedo*/
      										case 1:
      											var sparo = new newHomingMissle(12, 12, player.power[0].color1, player.power[0].color2, 1.5);
      											entity.push(sparo);
      											player.activeShot = player.activeShot + 1.5;
      											player.power[player.activePower - 1].usage -= 0.5;
      											break;
      											/*ChameleonSting*/
      										case 2:
      											var sparo = new newChameleonSting(15, 15);
      											entity.push(sparo);
      											player.activeShot = player.activeShot + 3;
      											player.power[player.activePower - 1].usage -= 0.5;
      											break;
      											/*RollingShield*/
      										case 3:
      											var sparo = new newRollingShield(40, 40);
      											entity.push(sparo);
      											player.activeShot = player.activeShot + 3;
      											player.power[player.activePower - 1].usage -= 1;
      											break;
      											/*Fire*/
      										case 4:
      											var sparo = new newFireWave(70, 10);
      											entity.push(sparo);
      											player.activeShot = player.activeShot + 3;
      											player.power[player.activePower - 1].usage -= 1;
      											break;
      											/*Storm*/
      										case 5:
      											var sparo = new newStormTornado(player.x, (player.y + 3 + (15 / 2)), 15, 15, 0, player.facingRight, true);
      											entity.push(sparo);
      											player.activeShot = player.activeShot + 3;
      											player.power[player.activePower - 1].usage -= 1;
      											break;
      											/*Electric*/
      										case 6:
      											var sparo = new newElectricSpark(15, 15);
      											entity.push(sparo);
      											player.activeShot = player.activeShot + 1;
      											player.power[player.activePower - 1].usage -= 1;
      											break;
      											/*Boomerang*/
      										case 7:
      											var sparo = new newBoomerangCutter(15, 15, true);
      											entity.push(sparo);
      											player.activeShot = player.activeShot + 1;
      											player.power[player.activePower - 1].usage -= 1;
      											break;
      											/*ShotgunIce*/
      										case 8:
      											var sparo = new newShotgunIce(player.x + player.width + 6, player.x - 6 - 15, player.y + 6, 15, 15, true, 2.5, 0, player.facingRight);
      											entity.push(sparo);
      											player.activeShot = player.activeShot + 3;
      											player.power[player.activePower - 1].usage -= 1;
      											break;
      									}
      								}
      							}
      						}
      					} else {
      						if (player.activePower == 0 || armaturaAcquired[2]) {
      							player.carica++; //disegna i pallini del colore della carica intorno al player
      							if (player.carica > 80) { //level 2 charge and 3
      								if (player.carica > 150 && armaturaAcquired[2]) { //charge 3 - richiede armaturaAcquired[2]
      									var xdisegnata = xDisegnata();
      									var ydisegnata = yDisegnata();
      									var xrandom = ((-player.width / 4) + Math.floor(Math.random() * (player.width / 2))) * 3;
      									var yrandom = ((-player.height / 4) + Math.floor(Math.random() * (player.height / 2))) * 2;
      									ctx.fillStyle = player.charge3color;
      									ctx.fillRect(xdisegnata + (player.width / 2) + xrandom, ydisegnata + (player.height / 2) + yrandom, 8, 8);
      								} else { //charge 2
      									var xdisegnata = xDisegnata();
      									var ydisegnata = yDisegnata();
      									var xrandom = ((-player.width / 4) + Math.floor(Math.random() * (player.width / 2))) * 3;
      									var yrandom = ((-player.height / 4) + Math.floor(Math.random() * (player.height / 2))) * 2;
      									ctx.fillStyle = player.charge0color;
      									ctx.fillRect(xdisegnata + (player.width / 2) + xrandom, ydisegnata + (player.height / 2) + yrandom, 8, 8);
      								}
      							} else if (player.carica > 25) { //level 1 charge
      								var xdisegnata = xDisegnata();
      								var ydisegnata = yDisegnata();
      								var xrandom = ((-player.width / 4) + Math.floor(Math.random() * (player.width / 2))) * 3;
      								var yrandom = ((-player.height / 4) + Math.floor(Math.random() * (player.height / 2))) * 2;
      								ctx.fillStyle = player.charge1color;
      								ctx.fillRect(xdisegnata + (player.width / 2) + xrandom, ydisegnata + (player.height / 2) + yrandom, 8, 8);
      							}
      						}
      					}
      				} else {
      					if (player.giasparato) {
      						if (player.canMove) {
      							if (player.activeShot < 3) { //se non ci sono piu di 3 colpi attivi contemporaneamente        
      								if (player.activePower == 0) { //default power
      									if (player.carica > 80) {
      										player.activeShot++;
      										if (player.carica > 150 && armaturaAcquired[2]) { //charge 3 shoot
      											var latoCubottiSparo = 15;
      											if (player.facingRight) {
      												var sparo = new newSparoCharge3((player.x + player.width + 6), (player.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, player.facingRight, true);
      												var sparoInvisibile = new newSparo(1, 55); //gestisce activeShot per lo sparoCharge3
      												sparoInvisibile.x = (player.x + player.width + 6);
      											} else {
      												var sparo = new newSparoCharge3((player.x - 6 - latoCubottiSparo), (player.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, player.facingRight, true);
      												var sparoInvisibile = new newSparo(1, 55);
      												sparoInvisibile.x = (player.x - 6 - latoCubottiSparo);
      											}
      											sparo.color = player.charge3color;
      											sparoInvisibile.color = "#00000000"; //sono 8 zeri invece che 6, gli ultimi due indicano il canale alpha(trasparenza)
      											sparoInvisibile.damage = sparo.damage;
      											sparoInvisibile.speed = sparo.speed;
      											sparoInvisibile.y = sparo.startingY - 20;
      											sparoInvisibile.canPassWall = true;
      											entity.push(sparo);
      											entity.push(sparoInvisibile);
      											var latoCubottiSparo = 15;
      											if (player.facingRight) {
      												var sparo = new newSparoCharge3((player.x + player.width + 6), (player.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, player.facingRight, false);
      											} else {
      												var sparo = new newSparoCharge3((player.x - 6 - latoCubottiSparo), (player.y + 3 + (latoCubottiSparo / 2)), latoCubottiSparo, latoCubottiSparo, 0, player.facingRight, false);
      											}
      											sparo.color = player.charge3color;
      											entity.push(sparo);
      										} else { //charge 2 shoot
      											var sparo = new newSparo(50, 25);
      											sparo.y = sparo.y - 7;
      											sparo.color = player.charge2color;
      											sparo.damage = 3;
      											sparo.perforation = true;
      											entity.push(sparo);
      										}
      									} else if (player.carica > 25) { //charge 1 shoot
      										player.activeShot++;
      										var sparo = new newSparo(35, 15);
      										sparo.y = sparo.y - 2;
      										sparo.damage = 2;
      										sparo.color = player.charge1color;
      										entity.push(sparo);
      									}
      									player.carica = 0;
      									player.giasparato = false;
      								} else {
      									if (player.carica > 150 && armaturaAcquired[2]) {
      										switch (player.activePower) { //poteri caricati
      											/*HomingTorpedo*/
      											case 1:
      												if (player.power[player.activePower - 1].usage > 2) {
      													var sparo = new newHomingMissle(18, 18, "#3d85c6", "#fa8cff", 3);
      													sparo.damage = 2;
      													entity.push(sparo);
      													player.activeShot = player.activeShot + 3;
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
      													player.power[player.activePower - 1].usage -= 3;
      												}
      												break;
      												/*ChameleonSting*/
      											case 2:
      												if (player.power[player.activePower - 1].usage > 3.5 && player.invulnerability < 90000) {
      													player.invulnerability = 91000;
      													player.canChangeWeap = false;
      													player.power[player.activePower - 1].usage -= 4;
      												}
      												break;
      												/*RollingShield*/
      											case 3:
      												if (player.power[player.activePower - 1].usage > 1) {
      													player.power[player.activePower - 1].usage -= 2;
      													player.canChangeWeap = false;
      													var sparo = new newRollingShieldCharge3(100, 100);
      													entity.push(sparo);
      													player.activeShot = player.activeShot + 3;
      												}
      												break;
      												/*FireWave*/
      											case 4:
      												if (player.power[player.activePower - 1].usage > 2) {
      													var sparo = new newFireWaveCharge3Main(20, 20);
      													entity.push(sparo);
      													player.activeShot = player.activeShot + 3;
      													player.power[player.activePower - 1].usage -= 3;
      												}
      												break;
      												/*StormTornado*/
      											case 5:
      												if (player.power[player.activePower - 1].usage > 1) {
      													player.power[player.activePower - 1].usage -= 2;
      													var sparo = new newStormTornadoCharge3(player.x, player.y + 6, 60, 15, player.facingRight, 0, true);
      													entity.push(sparo);
      													player.activeShot = player.activeShot + 3;
      												}
      												break;
      												/*ElectricSpark*/
      											case 6:
      												if (player.power[player.activePower - 1].usage > 1) {
      													player.activeShot = player.activeShot + 3;
      													if (player.facingRight) {
      														var sparo = new newElectricSparkCharge3(player.x + player.width + 6, player.y + 9, 16, 100, player.facingRight);
      														entity.push(sparo);
      														var sparo = new newElectricSparkCharge3(player.x + player.width + 6, player.y + 9, 16, 100, !player.facingRight);
      														entity.push(sparo);
      													} else {
      														var sparo = new newElectricSparkCharge3(player.x - 6 - 16, player.y + 9, 16, 100, player.facingRight);
      														entity.push(sparo);
      														var sparo = new newElectricSparkCharge3(player.x - 6 - 16, player.y + 9, 16, 100, !player.facingRight);
      														entity.push(sparo);
      													}
      													player.power[player.activePower - 1].usage -= 2;
      												}
      												break;
      												/*BoomerangCut*/
      											case 7:
      												if (player.power[player.activePower - 1].usage > 1) {
      													player.power[player.activePower - 1].usage -= 2;
      													player.activeShot = player.activeShot + 3;
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
      												if (player.power[player.activePower - 1].usage > 1) {
      													var sparo = new newShotgunIceCharge3(60, 20);
      													entity.push(sparo);
      													player.activeShot = player.activeShot + 3;
      													player.power[player.activePower - 1].usage -= 2;
      												}
      												break;
      										}
      									}
      									player.giasparato = false;
      									player.carica = 0;
      								}
      							} else {
      								player.carica = 0;
      							}
      						} else {
      							player.carica = -9999999999999;
      						}
      					}
      				}

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
      						if (keys[dashkey] && player.canMove && armaturaAcquired[1]) { //wall dash
      							player.speed = player.defaultspeed * 2.25;
      						} else {
      							player.speed = player.defaultspeed;
      						}
      						if (keys[jumpkey] && player.canMove) { //wall jumping
      							if (!player.giasaltato) {
      								player.yv = -player.jumpheight + 1;
      								if (player.xv > 0) {
      									player.xv = -9.9;
      								} else {
      									player.xv = 9.9;
      								}
      								player.giasaltato = true;
      							} else {
      								player.xv = 0;
      							}
      						} else {
      							player.xv = 0;
      							player.giasaltato = false;
      						}
      					}
      				}

      				for (var i = 0; i < entity.length; i++) { //contatto con entita'
      					if (entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer")) {
      						if (collisionBetween(player, entity[i])) {
      							if (entity[i].damage > 0) {
      								if (player.invulnerability < 1) { //entity collison								            		
      									player.color1 = player.damagedColor;
      									player.color2 = player.damagedColor;
      									player.coloreArmatura = player.damagedColor;
      									if (armaturaAcquired[3] && (entity[i].damage > 1)) {
      										player.life = player.life - (entity[i].damage - 1);
      									} else {
      										player.life = player.life - entity[i].damage;
      									}
      									player.invulnerability = 40;
      									player.canMove = false;
      									break;
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
      				if (player.invulnerability > 0) { //se l'invulnerabilita' e' >=1 la riduce e colora x in base a che punto e'
      					player.invulnerability--;
      					if (player.invulnerability == 90000) {
      						player.invulnerability = 5;
      						player.canChangeWeap = true;
      					} //fine sting cham charge3
      					if (player.invulnerability > 90000) { //potere di sting chameleon charge3
      						calcolaPlayerColor();
      					}
      					if (player.invulnerability < 30) {
      						calcolaPlayerColor();
      						player.color1 = player.color2;
      						player.color2 = player.color2;
      						player.coloreArmatura = player.color2;
      					}
      					if (player.invulnerability < 20) {
      						player.canMove = true;
      					}
      					if (player.invulnerability < 5) {
      						calcolaPlayerColor();
      						player.coloreArmatura = player.defaultColoreArmatura;
      					}
      				}

      				if (player.life < 1) { //gameover
      					disegnaSchermoDiGioco(false);
      					objAlert = new newAlert("Gameover", 1);
      					gamestate = 5;
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

      				if (player.canMove && tastoGiaSchiacciato && !(keys[startkey] || keys[lkey] || keys[rkey])) { //azzera tasto gia schiacciato
      					tastoGiaSchiacciato = false;
      				}

      				function calcolaPlayerColor() { //calcola i colori attivi del player
      					if (player.invulnerability < 90000) { //se non e' stingCham charge3 
      						if (player.activePower == 0) {
      							player.color1 = player.defaultColor1;
      							player.color2 = player.defaultColor2;
      						} else {
      							player.color1 = player.power[player.activePower - 1].color1;
      							player.color2 = player.power[player.activePower - 1].color2;
      						}
      					} else { //se invece stingCham charge3
      						var colorNumber = player.invulnerability - 90000;
      						if (colorNumber > 950) {
      							player.color1 = "#ff1100";
      							player.color2 = "#ffa7a1";
      						} else if (colorNumber > 900) {
      							player.color1 = "#ff9500";
      							player.color2 = "#ffcc85";
      						} else if (colorNumber > 850) {
      							player.color1 = "#ffe400";
      							player.color2 = "#fff38d";
      						} else if (colorNumber > 800) {
      							player.color1 = "#aaff00";
      							player.color2 = "#d8ff8c";
      						} else if (colorNumber > 750) {
      							player.color1 = "#00ffb3";
      							player.color2 = "#a8ffe5";
      						} else if (colorNumber > 700) {
      							player.color1 = "#00b9ff";
      							player.color2 = "#bbecff";
      						} else if (colorNumber > 650) {
      							player.color1 = "#6100ff";
      							player.color2 = "#b78aff";
      						} else if (colorNumber > 600) {
      							player.color1 = "#e800ff";
      							player.color2 = "#fac6ff";
      						} else if (colorNumber > 550) {
      							player.color1 = "#ff1100";
      							player.color2 = "#ffa7a1";
      						} else if (colorNumber > 500) {
      							player.color1 = "#ff0084";
      							player.color2 = "#ffc7e4";
      						} else if (colorNumber > 450) {
      							player.color1 = "#ff9500";
      							player.color2 = "#ffcc85";
      						} else if (colorNumber > 400) {
      							player.color1 = "#ffe400";
      							player.color2 = "#fff38d";
      						} else if (colorNumber > 350) {
      							player.color1 = "#aaff00";
      							player.color2 = "#d8ff8c";
      						} else if (colorNumber > 300) {
      							player.color1 = "#00ffb3";
      							player.color2 = "#a8ffe5";
      						} else if (colorNumber > 250) {
      							player.color1 = "#00b9ff";
      							player.color2 = "#bbecff";
      						} else if (colorNumber > 200) {
      							player.color1 = "#6100ff";
      							player.color2 = "#b78aff";
      						} else if (colorNumber > 150) {
      							player.color1 = "#e800ff";
      							player.color2 = "#fac6ff";
      						} else if (colorNumber > 100) {
      							player.color1 = "#ff0084";
      							player.color2 = "#ffc7e4";
      						} else {
      							player.color1 = player.power[player.activePower - 1].color1;
      							player.color2 = player.color2 = player.power[player.activePower - 1].color2;
      						}
      						player.coloreArmatura = "#303030";
      					}
      				}
      			} //fine della funzione playerPhysics - se riesco la faccio diventare un metodo di player invece che una funzione sestante
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
      			this.sprite.src = " data:image/png;base64,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";
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
      			this.height = this.standingHeight;
      			this.crouching = false;
      			this.sliding = false;
      			this.attacking = false;
      			this.attackTimer = 0;
      			this.subWeaponHeart = 0;
      			this.speed = 0.7;
      			this.stance = [0, 0]; //colonna, riga
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
      					ctx.drawImage(sprite, 16 * stance[0], 32 * stance[1], 16 - 0.2 + mostraWhip, 32, xdisegnata, ydisegnata - 6, (16 + mostraWhip) * 2, 32 * 2);
      				} else {
      					ctx.save(); //salvo il canvas attuale
      					ctx.scale(-1, 1); //flippa il canvas per fare lo sprite mirrorato
      					ctx.drawImage(sprite, 16 * stance[0], 32 * stance[1], 16 - 0.2 + mostraWhip, 32, -xdisegnata + (mostraWhip * 2), ydisegnata - 6, (-16 - mostraWhip) * 2, 32 * 2); //uso -xdisegnata perche' le coordinate del canvas sono mirrorate in negativo
      					ctx.restore(); //faccio tornare come prima al punto di save() altrimenti rimane buggato
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
      					if (entity[i].life > 0 && entity[i].type == "piattaforma") {
      						if (collisionBetween(player, entity[i])) {
      							if (((player.y + player.height) > entity[i].y) && ((player.y + player.height) < entity[i].y + 19)) { //collisione con y
      								player.y = entity[i].y - player.height;
      								player.yv = entity[i].yv * 1.1;
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
      								if (entity[i].speed) {
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

      				if (player.crouching && keys[jumpkey] && !tastoGiaSchiacciato) { //sliding
      					player.sliding = true;
      					tastoGiaSchiacciato = true;
      					player.invulnerability = 825; //800-825 range per lo sliding (fa anche da timer)
      				}
      				if (player.sliding) {
      					if (player.invulnerability < 801 || player.yv > 1) { //disattiva slide
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
      						corda["damage"] = 2;
      						corda["width"] = 84;
      						corda["height"] = 24;
      						if (player.facingRight) {
      							corda["x"] = player.x + player.width;
      						} else {
      							corda["x"] = player.x - corda.width;
      						}
      						corda["y"] = player.y + 2;
      						for (var i = 0; i < entity.length; i++) { //contatto con entita'
      							if (entity[i].life > 0 && !(entity[i].type == "sparoDelPlayer" || entity[i].type == "pickup" || entity[i].type == "enemyShot")) {
      								if (collisionBetween(corda, entity[i])) {
      									if (entity[i].getHit) {
      										entity[i].getHit("corda", corda.damage);
      									}
      								}
      							}
      						}
      					}
      					if (player.attackTimer > 40) {
      						player.attackTimer = 0;
      						player.xv = player.xv / 10;
      						player.attacking = false;
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
      									if (armaturaAcquired[3] && (entity[i].damage > 1)) {
      										player.life = player.life - (entity[i].damage - 1);
      									} else {
      										player.life = player.life - entity[i].damage;
      									}
      									player.invulnerability = 40;
      									player.stun = true;
      									break;
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

      				if (player.life < 1) { //gameover
      					disegnaSchermoDiGioco(false);
      					objAlert = new newAlert("Gameover", 1);
      					gamestate = 5;
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

      				if (player.canMove && tastoGiaSchiacciato && !(keys[startkey] || keys[lkey] || keys[rkey])) { //azzera tasto gia schiacciato
      					tastoGiaSchiacciato = false;
      				}

      				if (!player.stun && !player.crouching && !player.sliding && !player.attacking) {
      					player.canMove = true;
      				} else {
      					player.canMove = false;
      				}

      				player.calculateStance(player); //calcola lo sprite attuale da mostrare a schermo
      			} //fine di Riccardo.physics()

      			this.calculateStance = function (player) { //calcola a che animazione della spritesheet e' il player
      				var previousStance = [player.stance[0], player.stance[1]];
      				var maxTimer = 9; //quanti "frame" rimane un animazione. Dico "frame" ma in realta' e' un numero calcolato sui cicli dell'engine
      				if (player.attacking) {
      					var riga = 1;
      					if (player.crouching) {
      						riga = 2;
      					}
      					if (player.attackTimer < 14) {
      						player.stance = [0, riga];
      					} else {
      						player.stance = [1, riga];
      					}
      				} else {
      					if (player.yv < 3) { //se il player e' a terra o in ascesa
      						if (player.yv > 0 && !player.crouching) {
      							player.stance = [0, 0];
      							player.spriteTimer = 0; //player sta atterando
      						} else if (player.yv > -1) { //player a terra
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
      											player.spriteTimer = 0;
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
      											player.spriteTimer = 0;
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
      								player.spriteTimer = 0;
      							}
      						} else { //player in ascesa
      							player.stance = [6, 1];
      							player.spriteTimer = 0;
      						}
      					} else { //se invece il player e' in aria (discesa)
      						player.stance = [6, 0];
      						player.spriteTimer = 0;
      					}
      				}
      				if (previousStance[0] == player.stance[0] && previousStance[1] == player.stance[1]) {
      					player.spriteTimer++;
      				}
      			} //fine di calculateStance()
      		} //fine di new Riccardo()

      	}
      } //fine di nuovoPlayer()