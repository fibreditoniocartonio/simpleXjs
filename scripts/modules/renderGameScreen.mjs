      function disegnaSchermoDiGioco(doEntityPhysics) {
      	ctx.clearRect(0, 0, canvas.width, canvas.height); //pulisci tutto il canvas
      	drawBackgroundImage();
      	drawLvl(level.background); //disegna i blocchi non materiali che colorano lo sfondo (passa false come isDrawingWater - non disegna l'acqua)
      	drawLvl(level); //disegna i blocchi fisici del livello (passa false come isDrawingWater - non disegna l'acqua)
      	drawEntity(doEntityPhysics); //in questa funzione viene chiamata anche il metodo entity[i].physics per le entità che vengono disegnate su schermo (le uniche che carico)
      	if (levelEditor) {
      		drawPlayerCamera();
      	} else {
      		drawPlayer(); //disegna il player
      	}
      	drawLvl(level.foreground); //disegna i blocchi non materiali che stanno sopra tutto il resto (effetto grafico) e il waterlevel (passa true a isDrawingWater)
      	if (!levelEditor){drawHUD();}//draw HUD over everything but water 
      	drawWater();
      	if (levelEditor) {
      		if (player.showGrid) {
      			drawGrid();
      		}
      		drawCoordinatesAndHUD();
      		//da qui in poi disegno la parte piu' a destra del canvas, dove mettero' i tool per editare il livello
      		sideMenu.drawSideMenu();
      	}
      }

      function drawPlayer() {
      	var xdisegnata = xDisegnata(); //mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull asse x
      	var ydisegnata = yDisegnata(); //mi serve per semplificare le scritture dopo, praticamente gestisce la visuale sull'asse y
      	switch (currentPlayer) {
      		case 1:
      			/*riccardo*/ player.disegnaPlayer(xdisegnata, ydisegnata, player.stance, player.sprite, player.facingRight);
      			break;
      		default: //X
      			if (player.speed > player.defaultspeed) {
      				if (player.xv < -10) {
      					player.disegnaPlayer(xdisegnata - 50, ydisegnata + 3, player.width - 3, player.height - 6, false, player.color1 + 'AA', player.color2, player.coloreArmatura);
      					player.disegnaPlayer(xdisegnata - 26, ydisegnata + 1, player.width - 1, player.height - 2, false, player.color1, player.color2, player.coloreArmatura);
      				} else if (player.xv > 10) {
      					player.disegnaPlayer(xdisegnata + 50 + 3, ydisegnata + 3, player.width - 3, player.height - 6, false, player.color1 + 'AA', player.color2, player.coloreArmatura);
      					player.disegnaPlayer(xdisegnata + 26 + 1, ydisegnata + 1, player.width - 1, player.height - 2, false, player.color1, player.color2, player.coloreArmatura);
      				}
      			}
      			player.disegnaPlayer(xdisegnata, ydisegnata, player.width, player.height, true, player.color1, player.color2, player.coloreArmatura);
      			break;
      	}
      }

      function drawPlayerCamera() {
      	if (player.showPlayerCamera) {
      		var xdisegnata = xDisegnata();
      		var ydisegnata = yDisegnata();
      		ctx.fillStyle = player.color;
      		ctx.fillRect(xdisegnata - player.width * 2 / 10, ydisegnata + player.height / 10, player.width * 8 / 10, player.height * 8 / 10);
      		ctx.fillRect(xdisegnata + player.width * 6 / 10, ydisegnata + player.height / 2 - player.height * 1.5 / 10, player.width * 2 / 10, player.height * 3 / 10);
      		ctx.fillRect(xdisegnata + player.width * 8 / 10, ydisegnata + player.height / 2 - player.height * 3 / 10, player.width * 2 / 10, player.height * 6 / 10);
      	}
      }


      function drawBackgroundImage() { //disegna immagine di sfondo
      	if (level.backGroundImg != "" && level.backGroundImg != null && level.backGroundImg != ";") { //se esiste disegna lo sfondo
      		ctx.drawImage(level.backGroundImg, 0, 0, canvasWidth, canvasHeight);
      	}
      }

      function drawWater() { //disegna l'acqua
      	if (level.waterLevel) { //disegnala solo se esiste
      		ctx.fillStyle = "#0400f850";
      		var ydisegnata = 0
      		if (player.y < canvasHeight / 2) {
      			ydisegnata = level.waterLevel;
      		} else {
      			if (player.y > level.maxHeight - canvasHeight / 2) {
      				if (level.waterLevel < level.maxHeight - canvasHeight) {
      					ydisegnata = 0;
      				} else {
      					ydisegnata = level.waterLevel - level.maxHeight + canvasHeight;
      				}
      			} else {
      				if (level.waterLevel < player.y - canvasHeight / 2) {
      					ydisegnata = 0;
      				} else {
      					ydisegnata = level.waterLevel - player.y + canvasHeight / 2;
      				}
      			}
      		}
		ydisegnata=Math.round(ydisegnata);
      		ctx.fillRect(0, ydisegnata, canvasWidth, canvasHeight);
      	}
      }

      //this function draws the level (usata anche per level.foreground e level.background - basta che sia un arrey di oggetti blocco)
      function drawLvl(lvl, perMappa, spostaX, spostaY) {
      	for (var i = 0; i < lvl.length; i++) {
      		ctx.fillStyle = lvl[i].color;
      		//variabili per disegnare il livello rispetto alla posizione di x (rispetto ai bordi del canvas) - visuale
		var xdisegnata=0; var ydisegnata=0;
		if(perMappa){ //map menu game render
			xdisegnata=lvl[i].x+spostaX;
			ydisegnata=lvl[i].y+spostaY;
		}else{ //real game render
      			if (player.x + (player.width / 2) < canvasWidth / 2) {
      				xdisegnata = lvl[i].x;
      			} else {
      				if (player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) {
      					xdisegnata = lvl[i].x - level.maxWidth + canvasWidth;
      				} else {
      					xdisegnata = lvl[i].x - player.x - (player.width / 2) + canvasWidth / 2;
      				}
      			}
      			if (player.y < canvasHeight / 2) {
      				ydisegnata = lvl[i].y;
      			} else {
      				if (player.y > level.maxHeight - canvasHeight / 2) {
      					ydisegnata = lvl[i].y - level.maxHeight + canvasHeight;
      				} else {
      					ydisegnata = lvl[i].y - player.y + canvasHeight / 2;
      				}
      			}
		}
		xdisegnata=Math.round(xdisegnata); ydisegnata=Math.round(ydisegnata); //round them to not have non-integer coordinates (causes only problems)
      		//ora disegno il livello[i]                    
      		if (xdisegnata+lvl[i].width > -1 && xdisegnata < canvasWidth+1 && ydisegnata+lvl[i].height > -1 && ydisegnata < canvasHeight+1) {
      			if (level.tileset == "") {
      				ctx.fillRect(xdisegnata, ydisegnata, lvl[i].width, lvl[i].height);
      			} else {
      				for (volteX = 0; volteX < (lvl[i].width / blockDimension - 1); volteX++) {
      					if (xdisegnata + (blockDimension * (volteX + 1)) > 0) {
      						if (!(xdisegnata + (blockDimension * volteX) < canvasWidth)) {
      							break;
      						} else {
      							for (volteY = 0; volteY < (lvl[i].height / (blockDimension + 1)); volteY++) {
      								if (ydisegnata + (blockDimension * (volteY + 1)) > 0) {
      									if (!(ydisegnata + (blockDimension * volteY) < canvasHeight)) {
      										break;
      									} else {
      										var offsetX = lvl[i].lettera.charCodeAt(0) - 97;
      										var offsetY = 0;
      										if (lvl[i].lettera.charCodeAt(0) < 112 && lvl[i].lettera.charCodeAt(0) > 108) {
      											offsetX = lvl[i].lettera.charCodeAt(0) - 109;
      											offsetY = 1;
      										}
      										if (lvl[i].lettera.charCodeAt(0) < 115 && lvl[i].lettera.charCodeAt(0) > 111) {
      											offsetX = lvl[i].lettera.charCodeAt(0) - 112;
      											offsetY = 2;
      										}
      										ctx.drawImage(level.tileset, 16*offsetX, 16*offsetY, 16, 16, xdisegnata+(blockDimension*volteX), ydisegnata+(blockDimension*volteY), blockDimension, blockDimension);
      									}
      								}
      							}
      						}
      					}
      				}
      			}
      			if (levelEditor && (debugMode || lvl[i].lettera == "X")) {
      				if (lvl[i].lettera == "X") {
      					ctx.fillRect(xdisegnata, ydisegnata, lvl[i].width, lvl[i].height);
      				}
      				ctx.font = "bold 10px Lucida Console";
      				ctx.textAlign = "center";
      				disegnaTestoConBordino(lvl[i].lettera, xdisegnata+lvl[i].width/2, ydisegnata+(lvl[i].height/2)+(ctx.measureText("O").width/2), "#000000", "#cccccc");
      				ctx.textAlign = "left";
      			}
      		}
      	}
      }//fine di drawLvl()

      function drawHUD() {
      	if (debugMode) {
      		ctx.font = "small-caps bold 12px Lucida Console";
      		altezzaTesto = ctx.measureText("O").width + 3;
      		ctx.textAlign = "right";
      		disegnaTestoConBordino("DEBUGMODE Level:" + lvlNumber, canvasWidth - 3, canvasHeight - 3, "#d2d2d2", "#000000");
      		ctx.textAlign = "left";
      		disegnaTestoConBordino("player.activePower:" + player.activePower, 10, 49, "#d2d2d2", "#000000");
      		disegnaTestoConBordino("player.life:" + player.life + " max:" + player.lifeMax, 10, 50 + altezzaTesto, "#d2d2d2", "#000000");
      		if (player.activePower > 0) {
      			disegnaTestoConBordino("power.usage:" + player.power[player.activePower - 1].usage + " max:" + player.power[player.activePower - 1].usageMax, 10, 50 + altezzaTesto * 2, "#d2d2d2", "#000000");
      		}
      		disegnaTestoConBordino("last key pressed:" + ultimoTastoLetto, 3, canvasHeight - 3 - altezzaTesto, "#d2d2d2", "#000000");
      		disegnaTestoConBordino("player.activeShot:" + player.activeShot, 3, canvasHeight - 3 - altezzaTesto * 2, "#d2d2d2", "#000000");
      		disegnaTestoConBordino("player.invulnerability:" + player.invulnerability, 3, canvasHeight - 3 - altezzaTesto * 3, "#d2d2d2", "#000000");
      		disegnaTestoConBordino("player.x:" + Math.round(player.x) + " player.y:" + Math.round(player.y), 3, canvasHeight - 3, "#d2d2d2", "#000000");
      	} //fine debugMode       
      	var barLenght = 16*6+40;
      	var barHeight = 30;
      	var barAccentColor = player.defaultColor1;
      	if (player.activePower != 0) { //barra potere - la disegno prima cosi' va sotto
      		barAccentColor = player.power[player.activePower - 1].color1;
      		ctx.fillStyle = barAccentColor;
      		ctx.fillRect(8, 8 + barHeight - 5, barLenght - 4 - 1, 16 - 1);
      		ctx.fillStyle = '#3d3b3b';
      		ctx.fillRect(10, 10 + barHeight - 5, barLenght - 4, 16);
      		lineWidth = ((barLenght - 10) / player.power[player.activePower - 1].usageMax) - 1;
      		for (i = 0; i < player.power[player.activePower - 1].usageMax; i++) {
      			if (i < player.power[player.activePower - 1].usage) {
      				ctx.fillStyle = player.power[player.activePower - 1].color1;
      			} else {
      				ctx.fillStyle = '#909090';
      			}
      			ctx.fillRect(13 + (i * (lineWidth + 1)), 15 + barHeight - 5, lineWidth, 8);
      		}
      	}
      	switch (currentPlayer) {
      		case 1: //riccardo
      			drawLifeBar(false, 8, 8, barAccentColor, player.life, player.lifeMax, "#ca0000", player.defaultColor1, 6, 6);
      			ctx.drawImage(player.subWeaponImg, 15 * player.activePower, 0, 15 - 0.2, 15, 10, 10, 30, 30);
      			break;
      		default: //X
      			drawLifeBar(false, 8, 8, barAccentColor, player.life, player.lifeMax, "#ffc000", "#14dfff", 6, 5);
      			ctx.beginPath(); //ora inizio a disegnare la x che sara' del colore del player attivo
      			ctx.lineWidth = "7";
      			ctx.strokeStyle = player.color2;
      			ctx.moveTo(15, 15);
      			ctx.lineTo(35, 35);
      			ctx.moveTo(35, 15);
      			ctx.lineTo(15, 35);
      			ctx.stroke(); // Disegna il contorno della X
      			ctx.lineWidth = "5";
      			ctx.strokeStyle = player.color1;
      			ctx.stroke(); // Disegna la parte interna della X
      			break;
      	} //fine switch currentPlayer
      } //fine drawHUD

      function drawLifeBar(isEnemy, xP, yP, barAccentColor, life, lifeMax, miniBarColor1, miniBarColor2, miniBarLeng, miniBarWidth){
      	var barLenght = 136;
      	var barHeight = 30;
	var coo={"x": xP, "y": yP}
      	ctx.fillStyle = barAccentColor;
      	ctx.fillRect(coo.x, coo.y, barLenght-1, barHeight-1);
      	ctx.fillStyle = '#3d3b3b';
      	ctx.fillRect(coo.x+2, coo.y+2, barLenght, barHeight);
      	if (lifeMax > 16) {
      		if (life > 16) {
      			for (i = 16; i < lifeMax; i++) { //disegno le barre della vita
      				if (i < life) {
      					ctx.fillStyle = miniBarColor2;
      				} else {
      					ctx.fillStyle = '#909090';
      				}
      				ctx.fillRect(coo.x+(i-16)*miniBarLeng+35, coo.y+6, miniBarWidth, 21);
      			}
      			for (i = 0; i < 16; i++) { //disegno le barre della vita
      				if (i + 16 > lifeMax - 1) {
      					ctx.fillStyle = miniBarColor1;
      					ctx.fillRect(coo.x+i*miniBarLeng+35, coo.y+9, miniBarWidth, 18);
      				} else {
      					if (i + 16 > life - 1) {
      						ctx.fillStyle = miniBarColor1;
      						ctx.fillRect(coo.x+i*miniBarLeng+35, coo.y+9, miniBarWidth, 18);
      					}
      				}
      			}
      		} else {
      			for (i = 16; i < lifeMax; i++) {
      				ctx.fillStyle = '#707070';
      				ctx.fillRect(coo.x+(i-16)*miniBarLeng+35, coo.y+6, miniBarWidth, 21);
      			}
      			for (i = 0; i < 16; i++) { //disegno le barre della vita
      				if (i < life) {
      					ctx.fillStyle = miniBarColor1;
      				} else {
      					ctx.fillStyle = '#909090';
      				}
      				ctx.fillRect(coo.x+i*miniBarLeng+35, coo.y+9, miniBarWidth, 18);
      			}
      		}
      	} else {
      		for (i = 0; i < lifeMax; i++) { //disegno le barre della vita
      			if (i < life) {
      				ctx.fillStyle = miniBarColor1;
      			} else {
      				ctx.fillStyle = '#808080';
      			}
      			ctx.fillRect(coo.x+i*miniBarLeng+35, coo.y+7, miniBarWidth, 20);
      		}
      	}
	if(isEnemy){
		var enemyImg=new Image();
		enemyImg.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAMAAADzjKfhAAAAAXNSR0IArs4c6QAAAGBQTFRFAAAAIiA0RSg8Zjkxj1Y733Em2aBm7sOa+/I2meVQar4wN5RuS2kvUkskMjw5Pz90MGCCW27hY5v/X83ky9v8////m623hH6HaWpqWVZSdkKKrDIy2Vdj13u6j5dKim8w+2O8zwAAACB0Uk5TAP////////////////////////////////////////+Smq12AAAAGElEQVQImWMQhQAGOM0AQejiDFAKJAWEAGGsAzTZEdPwAAAAAElFTkSuQmCC";
      		ctx.drawImage(enemyImg, 0, 0, 7, 7, coo.x+8, coo.y+7, 21, 21);
	}
      }//fine di drawEnemyBar

      function drawGrid() {
      	ctx.fillStyle = "#dcdcdc80";
      	for (var i = 0; i < level.maxWidth; i += blockDimension) {
      		var xdisegnata = 0;
      		if (player.x + (player.width / 2) < canvasWidth / 2) {
      			xdisegnata = i;
      		} else {
      			if (player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) {
      				xdisegnata = i - level.maxWidth + canvasWidth;
      			} else {
      				xdisegnata = i - player.x - (player.width / 2) + canvasWidth / 2;
      			}
      		}
		xdisegnata=Math.round(xdisegnata);
      		ctx.fillRect(xdisegnata, 0, 1, canvasHeight);
      	}
      	for (var i = 0; i < level.maxHeight; i += blockDimension) {
      		var ydisegnata = 0;
      		if (player.y < canvasHeight / 2) {
      			ydisegnata = i;
      		} else {
      			if (player.y > level.maxHeight - canvasHeight / 2) {
      				ydisegnata = i - level.maxHeight + canvasHeight;
      			} else {
      				ydisegnata = i - player.y + canvasHeight / 2;
      			}
      		}
		ydisegnata=Math.round(ydisegnata);
      		ctx.fillRect(0, ydisegnata, canvasWidth, 1);
      	}
      }

      function drawCoordinatesAndHUD() {
      	if (player.showCoordinates) { //disegna coordinate
      		ctx.font = "small-caps bold 15px Lucida Console";
      		ctx.textAlign = "right";
      		if (player.showPlayerCamera) {
      			disegnaTestoConBordino("cameraX:" + Math.floor((player.x + player.width / 2) / blockDimension) + " cameraY:" + Math.floor((player.y + player.height / 2) / blockDimension), canvasWidth - 3, 7 + ctx.measureText("O").width / 2, "#cccccc", "#000000");
      		}
      		ctx.textAlign = "left";
      		if (mouseX < canvasWidthDefault) {
      			disegnaTestoConBordino("mouseX:" + lvlCanvasMouseX + " mouseY:" + lvlCanvasMouseY, 3, 7 + ctx.measureText("O").width / 2, "#cccccc", "#000000");
      		}
      	}
      }

      function drawEntity(doEntityPhysics) { //disegna le entità a schermo e chiama la entity[i].physics
      	for (var i = 0; i < entity.length; i++) {
      		if (entity[i].life > 0) { //calcola la entita solo se la sua vita è maggiore di zero
      			//variabili per disegnare il livello rispetto alla posizione di x (rispetto ai bordi del canvas) - visuale
      			var xdisegnata = 0;
      			if (player.x + (player.width / 2) < canvasWidth / 2) {
      				xdisegnata = entity[i].x;
      			} else {
      				if (player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) {
      					xdisegnata = entity[i].x - level.maxWidth + canvasWidth;
      				} else {
      					xdisegnata = entity[i].x - player.x - (player.width / 2) + canvasWidth / 2;
      				}
      			}
      			var ydisegnata = 0;
      			if (player.y < canvasHeight / 2) {
      				ydisegnata = entity[i].y;
      			} else {
      				if (player.y > level.maxHeight - canvasHeight / 2) {
      					ydisegnata = entity[i].y - level.maxHeight + canvasHeight;
      				} else {
      					ydisegnata = entity[i].y - player.y + canvasHeight / 2;
      				}
      			}
			xdisegnata=Math.round(xdisegnata); ydisegnata=Math.round(ydisegnata);
      			//ora disegno l'entita e chiamo physics se e' dentro il canvas disegnato+unQuartoDiCanvas (questa roba non si applica se è uno sparo del player e a enemyShot, che vengono caricati sempre)                    
      			if ((xdisegnata + entity[i].width > (-canvasWidth / 8) && xdisegnata < (canvasWidth + (canvasWidth / 8))) && (ydisegnata > (-canvasHeight / 8) && ydisegnata < (canvasHeight + (canvasHeight / 8))) || entity[i].type == "sparoDelPlayer" || entity[i].type=="enemyShot") { //questo if fa i controlli spiegati sopra 
      				if (entity[i].canSelfDraw == true) {
      					entity[i].selfDraw(xdisegnata, ydisegnata, i);
      				} else {
      					ctx.fillStyle = entity[i].color;
      					ctx.fillRect(xdisegnata, ydisegnata, entity[i].width, entity[i].height);
      				}
      				if (doEntityPhysics && entity[i].hasPhysics) {
      					entity[i].physics(xdisegnata, ydisegnata, i);
      				}
      			}
      		}
      	}
      }
