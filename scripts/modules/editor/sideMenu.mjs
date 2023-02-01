      function newSideMenu() {
      	this.width = realCanvasWidth - canvasWidthDefault;
      	this.height = canvasHeightDefault;
      	this.openedTab = 0;
      	this.nrTab = 3;
      	this.mouseTimer = 0;
      	this.showAnotherMenu = false;
      	this.showExitMenu = false;
      	this.showExtendLevelMenu = false;
      	this.showModifyBackgroundMenu = false;
      	this.extendLevelMenu_staScrivendo = false;
      	this.extendLevelMenu_staScrivendo_Width = false;
      	this.newNumberWidth = 0;
      	this.newNumberHeight = 0;
      	this.selected = "NIENTE"; //blocco/entita' selezionata - se vuoto deve essere == "NIENTE"
      	this.fill = false;
      	this.isSelecting = false;
      	this.modifyBlock = false;
      	this.showModifyBlockMenu = false;
      	this.startingColor = [0, 0, 0, 255];
      	this.modifyBlockLetter = "";
      	this.showEntityTimer = 0;
      	this.incrementaTimer = false;
      	this.drawSideMenu = async function () {
      		if (this.mouseTimer > 0 && !this.showAnotherMenu) {
      			this.mouseTimer--;
      		} //timer mouse
      		ctx.fillStyle = "#cccccc";
      		ctx.fillRect(canvasWidthDefault, 0, this.width, this.height); //sfondo
      		this.tabCode(); //disegno la parte in alto delle tab e le gestisco (mouse input)
      		switch (this.openedTab) { //disegno la tab aperta
      			case 0:
      				this.toolTabCode();
      				break;
      			case 1:
      				this.blockTabCode();
      				break;
      			case 2:
      				this.entityTabCode();
      				break;
      		}
      		if (player.showLevelBar) {
      			this.drawlevelBar();
      		}
      		if (this.showAnotherMenu && this.showExitMenu) {
      			this.drawExitMenu();
      		}
      		if (this.showAnotherMenu && this.showExtendLevelMenu) {
      			this.drawExtendLevelMenu();
      		}
      		if (this.showAnotherMenu && this.showModifyBackgroundMenu) {
      			this.drawModifyBackgroundMenu();
      		}
      		if (this.showAnotherMenu && this.showModifyTilesetMenu) {
      			this.drawModifyTileset();
      		}
      		if (this.showAnotherMenu && this.showModifyBlockMenu) {
      			this.drawModifyBlockMenu();
      		}
      		if (this.selected != "NIENTE") {
      			await this.piazzaBloccoCode();
      		}
      		ctx.textAlign = "left"; //sistemo almeno non si buggano gli altri menu
      	} //fine drawSideMenu()
      	this.tabCode = function () {
      		tabWidth = this.width / this.nrTab;
      		tabHeight = 20;
      		ctx.textAlign = "center";
      		for (i = 0; i < this.nrTab; i++) {
      			var tabTitle = "";
      			var textSize = 20;
      			switch (i) {
      				case 0:
      					tabTitle = "tools";
      					break;
      				case 1:
      					tabTitle = "blocks";
      					break;
      				case 2:
      					tabTitle = "entities";
      					break;
      			}
      			for (j = textSize; j > 2; j--) { //riduco le dimensioni del testo se la scritta non ci sta
      				ctx.font = "small-caps bold " + j + "px Lucida Console";
      				if (ctx.measureText(tabTitle).width < tabWidth - 4) {
      					break;
      				}
      			}
      			if (i != this.openedTab) {
      				ctx.fillStyle = "#8c8c8c";
      				ctx.fillRect(canvasWidthDefault + i * tabWidth, 0, tabWidth, tabHeight); //sfondo scuro tab non selez
      				ctx.fillStyle = "#6c6c6c";
      				ctx.fillRect(canvasWidthDefault + (i + 1) * tabWidth - 1, 0, 1, tabHeight); //separatore tab
      			}
      			disegnaTestoConBordino(tabTitle, canvasWidthDefault + i * tabWidth + (tabWidth / 2), tabHeight / 2 + ctx.measureText("o").width / 2, "#000000"); //testo della tab
      			if (checkMouseBox(canvasWidthDefault + i * tabWidth, 0, tabWidth, tabHeight) && mouseClick && !this.showAnotherMenu) {
      				if (i != this.openedTab) {
      					this.selected = "NIENTE";
      					this.isSelecting = false;
      					this.modifyBlock = false;
      					this.fill = false;
      				} //azzero la selezione al cambio di tab
      				this.openedTab = i;
      			}
      		}
      	} //fine tabCode()
      	this.toolTabCode = function () {
      		var numeroVoci = 12;
      		var voceHeight = (this.height - 20) / numeroVoci;
      		ctx.textAlign = "left";
      		ctx.font = "small-caps bold 15px Lucida Console";
      		for (k = 0; k < numeroVoci; k++) {
      			switch (k) {
      				case 0: //show player coordinate 
      					var word = "Show Coordinates";
      					disegnaTestoConBordino(word, canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					disegnaTestoConBordino("[ ]", canvasWidthDefault + 5 + 5 + ctx.measureText(word).width, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (player.showCoordinates) {
      						disegnaTestoConBordino(" X", canvasWidthDefault + 4 + 5 + ctx.measureText(word).width, 21 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					}
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							player.showCoordinates = !player.showCoordinates;
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      						}
      					}
      					break;
      				case 1: //show player camera 
      					var word = "Show Player Camera";
      					disegnaTestoConBordino(word, canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					disegnaTestoConBordino("[ ]", canvasWidthDefault + 5 + 5 + ctx.measureText(word).width, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (player.showPlayerCamera) {
      						disegnaTestoConBordino(" X", canvasWidthDefault + 4 + 5 + ctx.measureText(word).width, 21 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					}
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							player.showPlayerCamera = !player.showPlayerCamera;
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      						}
      					}
      					break;
      				case 2: //show grid
      					var word = "Show Grid";
      					disegnaTestoConBordino(word, canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					disegnaTestoConBordino("[ ]", canvasWidthDefault + 5 + 5 + ctx.measureText(word).width, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (player.showGrid) {
      						disegnaTestoConBordino(" X", canvasWidthDefault + 4 + 5 + ctx.measureText(word).width, 21 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					}
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							player.showGrid = !player.showGrid;
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      						}
      					}
      					break;
      				case 3: //snap mode 
      					var word = "Camera snap mode";
      					disegnaTestoConBordino(word, canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					disegnaTestoConBordino("[ ]", canvasWidthDefault + 5 + 5 + ctx.measureText(word).width, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (player.snapMode) {
      						disegnaTestoConBordino(" X", canvasWidthDefault + 4 + 5 + ctx.measureText(word).width, 21 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					}
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							player.snapMode = !player.snapMode;
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      						}
      					}
      					break;
      				case 4: //zoom
      					disegnaTestoConBordino("Zoom:" + blockDimension, canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      							if (blockDimension == 32) {
      								blockDimension = 16;
      							} else {
      								blockDimension = 32;
      							}
      							stringToLevel(stringaLivello); //reload with new zoom
      						}
      					}
      					break;
      				case 5: //level bars
      					var word = "Enable level bars";
      					disegnaTestoConBordino(word, canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					disegnaTestoConBordino("[ ]", canvasWidthDefault + 5 + 5 + ctx.measureText(word).width, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (player.showLevelBar) {
      						disegnaTestoConBordino(" X", canvasWidthDefault + 4 + 5 + ctx.measureText(word).width, 21 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      						disegnaTestoConBordino("permanent [ ]", canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2 + ctx.measureText("o").width + 3, "#000000");
      					}
      					if (player.permanentLevelBar) {
      						disegnaTestoConBordino("X", canvasWidthDefault + 2 + ctx.measureText("permanent [").width, 21 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2 + ctx.measureText("o").width + 3, "#000000");
      					}
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							if (player.permanentLevelBar) {
      								player.permanentLevelBar = false;
      								player.showLevelBar = false;
      							} else if (player.showLevelBar) {
      								player.permanentLevelBar = true;
      							} else {
      								player.showLevelBar = true;
      							}
      							this.mouseTimer = 10;
      							this.selected = "NIENTE";
      						}
      					}
      					break;
      				case 6: //modify water level
      					var word = "Add water level";
      					if (level.waterLevel) {
      						word = "Remove water";
      					}
      					if (this.selected == "w") {
      						ctx.fillStyle = "#979797";
      						ctx.fillRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						ctx.strokeStyle = "#222222";
      						ctx.lineWidth = "1";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      					}
      					disegnaTestoConBordino(word, canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							this.mouseTimer = 10;
      							if (level.waterLevel) { //se c'e' l'acqua la toglie
      								var indice = -1;
      								for (o = 0; o < level.indiceZ; o++) {
      									if (stringaLivello[o] == "w") {
      										indice = o;
      										break;
      									}
      								}
      								stringaLivello = stringaLivello.slice(0, indice) + "l" + stringaLivello.slice(indice + 1);
      								stringToLevel(stringaLivello);
      							} else { //se non c'e' l'acqua invece la puoi mettere
      								if (this.selected == "w") {
      									this.selected = "NIENTE";
      								} else {
      									this.selected = "w";
      								}
      							}
      						}
      					}
      					break;
      				case numeroVoci - 5: //extend level
      					disegnaTestoConBordino("Modify level lenght", canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							this.showExtendLevelMenu = true;
      							this.showAnotherMenu = true;
      							this.newNumberWidth = 0;
      							this.newNumberHeight = 0;
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      						}
      					}
      					break;
      				case numeroVoci - 4: //Tileset - drawModifyTileset
      					disegnaTestoConBordino("Modify tileset", canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							document.getElementById("caricaPartitaDiv").style.zIndex = "10";
      							document.getElementById("fileCaricaPartita").disabled = false;
      							this.showModifyTilesetMenu = true;
      							this.showAnotherMenu = true;
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      						}
      					}
      					break;
      				case numeroVoci - 3: //background image
      					disegnaTestoConBordino("Modify background image", canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							document.getElementById("caricaPartitaDiv").style.zIndex = "10";
      							document.getElementById("fileCaricaPartita").disabled = false;
      							this.showModifyBackgroundMenu = true;
      							this.showAnotherMenu = true;
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      						}
      					}
      					break;
      				case numeroVoci - 2: //save level 
      					disegnaTestoConBordino("Save Level", canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							salvaLivello();
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      						}
      					}
      					break;
      				case numeroVoci - 1: //exit to main menu
      					disegnaTestoConBordino("Back to main menu", canvasWidthDefault + 5, 20 + (voceHeight * k) + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      					if (checkMouseBox(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + 2, 20 + voceHeight * k + 2, this.width - 4, voceHeight - 4);
      						if (mouseClick && this.mouseTimer == 0) {
      							this.showExitMenu = true;
      							this.showAnotherMenu = true;
      							this.selected = "NIENTE";
      							this.mouseTimer = 10;
      						}
      					}
      					break;
      			} //fine switch
      		}
      	} //fine di toolTabCode()
      	this.drawExitMenu = function () {
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 22px Lucida Console";
      		var string1 = "do you really want to exit?";
      		var string2 = "every unsaved progress will be lost.";
      		var menuWidth = ctx.measureText(string2).width + 8;
      		var menuHeight = 8 + (ctx.measureText("O").width + 4) * 5;
      		ctx.fillStyle = "#cccccc";
      		ctx.fillRect(realCanvasWidth / 2 - menuWidth / 2, canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		ctx.strokeStyle = "#000000";
      		ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 2, canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		disegnaTestoConBordino(string1, realCanvasWidth / 2, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width, "#000000");
      		disegnaTestoConBordino(string2, realCanvasWidth / 2, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + (menuHeight - 8) / 3, "#000000");
      		disegnaTestoConBordino("yes", realCanvasWidth / 2 - menuWidth / 4, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (menuHeight - 8) / 3, "#000000");
      		if (checkMouseBox(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("aaa").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 2 * (menuHeight - 8) / 3, ctx.measureText("aaa").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("aaa").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 2 * (menuHeight - 8) / 3, ctx.measureText("aaa").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				canvasWidth = canvasWidthDefault;
      				canvasHeight = canvasHeightDefault;
      				objMenuPrincipale = new newMenuPrincipale();
      				gamestate = 0;
      			}
      		}
      		disegnaTestoConBordino("no", realCanvasWidth / 2 + menuWidth / 4, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (menuHeight - 8) / 3, "#000000");
      		if (checkMouseBox(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("aaa").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 2 * (menuHeight - 8) / 3, ctx.measureText("aaa").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("aaa").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 2 * (menuHeight - 8) / 3, ctx.measureText("aaa").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				this.showExitMenu = false;
      				this.showAnotherMenu = false;
      			}
      		}
      	} //fine di drawExitMenu()
      	this.drawExtendLevelMenu = function () {
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 22px Lucida Console";
      		var string1 = "LEVEL LENGHT MENU";
      		var string2 = "width: " + (level.maxWidth / blockDimension) + " blocks - height: " + (level.maxHeight / blockDimension) + " blocks";
      		var menuWidth = ctx.measureText(string2).width + 8;
      		var menuHeight = 8 + (ctx.measureText("O").width + 4) * 7;
      		ctx.fillStyle = "#cccccc";
      		ctx.fillRect(realCanvasWidth / 2 - menuWidth / 2, canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		ctx.strokeStyle = "#000000";
      		ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 2, canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		disegnaTestoConBordino(string1, realCanvasWidth / 2, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width, "#000000");
      		disegnaTestoConBordino(string2, realCanvasWidth / 2, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + (menuHeight - 8) / 4, "#000000");
      		disegnaTestoConBordino("new width: ____", realCanvasWidth / 2 - menuWidth / 4, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (menuHeight - 8) / 4, "#000000");
      		if (this.newNumberWidth != 0) {
      			disegnaTestoConBordino(this.newNumberWidth, realCanvasWidth / 2 - menuWidth / 4 + ctx.measureText("new width: ").width / 2, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (menuHeight - 8) / 4 - 2, "#000000");
      		}
      		if (!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText(" new width: xxxx ").width / 2, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 2 * (menuHeight - 8) / 4, ctx.measureText(" new width: xxxx ").width, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText(" new width: xxxx ").width / 2, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 2 * (menuHeight - 8) / 4, ctx.measureText(" new width: xxxx ").width, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				this.extendLevelMenu_staScrivendo = true;
      				this.extendLevelMenu_staScrivendo_Width = true;
      				this.newNumberWidth = 0;
      				ultimoTastoLetto = "";
      			}
      		}
      		disegnaTestoConBordino("new height: ____", realCanvasWidth / 2 + menuWidth / 4, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (menuHeight - 8) / 4, "#000000");
      		if (this.newNumberHeight != 0) {
      			disegnaTestoConBordino(this.newNumberHeight, realCanvasWidth / 2 + menuWidth / 4 + ctx.measureText("new height: ").width / 2, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (menuHeight - 8) / 4 - 2, "#000000");
      		}
      		if (!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText(" new height: xxxx ").width / 2, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 2 * (menuHeight - 8) / 4, ctx.measureText(" new height: xxxx ").width, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText(" new height: xxxx ").width / 2, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 2 * (menuHeight - 8) / 4, ctx.measureText(" new height: xxxx ").width, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				this.extendLevelMenu_staScrivendo = true;
      				this.extendLevelMenu_staScrivendo_Width = false;
      				this.newNumberHeight = 0;
      				ultimoTastoLetto = "";
      			}
      		}
      		disegnaTestoConBordino("confirm", realCanvasWidth / 2 - menuWidth / 4, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 3 * (menuHeight - 8) / 4, "#000000");
      		if (!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("confirm").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("confirm").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("confirm").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("confirm").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				stringToLevel(aggiornaLivelloExtend(this.newNumberWidth, this.newNumberHeight));
      				this.showExtendLevelMenu = false;
      				this.showAnotherMenu = false;
      			}
      		}
      		disegnaTestoConBordino("cancel", realCanvasWidth / 2 + menuWidth / 4, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 3 * (menuHeight - 8) / 4, "#000000");
      		if (!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("cancel").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("cancel").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("cancel").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("cancel").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				this.showExtendLevelMenu = false;
      				this.showAnotherMenu = false;
      			}
      		}
      		if (this.extendLevelMenu_staScrivendo) {
      			switch (ultimoTastoLetto) {
      				case '0':
      				case '1':
      				case '2':
      				case '3':
      				case '4':
      				case '5':
      				case '6':
      				case '7':
      				case '8':
      				case '9':
      					if (this.extendLevelMenu_staScrivendo_Width) {
      						this.newNumberWidth = this.newNumberWidth * 10 + parseInt(ultimoTastoLetto, 10);
      					} else {
      						this.newNumberHeight = this.newNumberHeight * 10 + parseInt(ultimoTastoLetto, 10);
      					}
      					ultimoTastoLetto = "";
      					break;
      				case 'Backspace':
      					if (this.extendLevelMenu_staScrivendo_Width) {
      						this.newNumberWidth = Math.floor(this.newNumberWidth / 10);
      					} else {
      						this.newNumberHeight = Math.floor(this.newNumberHeight / 10);
      					}
      					ultimoTastoLetto = "";
      					break;
      				case 'Enter':
      					this.extendLevelMenu_staScrivendo = false;
      					break;
      			}
      		}

      		function aggiornaLivelloExtend(newWidth, newHeight) {
      			if (newWidth > 0) {
      				var differenzaWidth = (newWidth * blockDimension) - level.maxWidth;
      				if (differenzaWidth > 0) {
      					var puntiInPiu = "";
      					var tInPiu = "";
      					for (var i = 0; i < (differenzaWidth / blockDimension); i++) {
      						puntiInPiu += ".";
      						tInPiu += "t";
      					}
      					for (var i = 1; i < level.maxHeight / blockDimension; i++) {
      						var newStringaLivello = "";
      						if (i == 1) {
      							newStringaLivello = stringaLivello.slice(0, (level.maxWidth / blockDimension) - 1) + tInPiu + stringaLivello.slice(-1 + level.maxWidth / blockDimension);
      						} else {
      							newStringaLivello = stringaLivello.slice(0, (i * (level.maxWidth / blockDimension - 1) + (i - 1) * (puntiInPiu.length))) + puntiInPiu + stringaLivello.slice((i * (level.maxWidth / blockDimension - 1) + (i - 1) * (puntiInPiu.length)));
      						}
      						stringaLivello = newStringaLivello;
      					}
      				} else if (differenzaWidth < 0) {
      					for (var i = 1; i < level.maxHeight / blockDimension; i++) {
      						var newStringaLivello = "";
      						newStringaLivello = stringaLivello.slice(0, (i * (level.maxWidth / blockDimension - 1) + (i) * (differenzaWidth / blockDimension))) + stringaLivello.slice(i * (level.maxWidth / blockDimension - 1) + (i - 1) * (differenzaWidth / blockDimension));
      						stringaLivello = newStringaLivello;
      					}
      				}
      				level.maxWidth += differenzaWidth; //serve per i calcoli della height, se no viene sbagliato perche' li fa subito dopo
      			}
      			if (newHeight > 0) {
      				var differenzaHeight = (newHeight * blockDimension) - level.maxHeight;
      				if (differenzaHeight > 0) {
      					var rigaInPiu = "l";
      					for (var i = 1; i < level.maxWidth / blockDimension - 1; i++) {
      						rigaInPiu += ".";
      					}
      					for (var i = 1; i < differenzaHeight / blockDimension + 1; i++) {
      						var newStringaLivello = "";
      						newStringaLivello = stringaLivello.slice(0, (level.maxWidth / blockDimension - 1) * (level.maxHeight / blockDimension - 1)) + rigaInPiu + stringaLivello.slice((level.maxWidth / blockDimension - 1) * (level.maxHeight / blockDimension - 1));
      						stringaLivello = newStringaLivello;
      					}
      				} else if (differenzaHeight < 0) {
      					var newStringaLivello = "";
      					newStringaLivello = stringaLivello.slice(0, (level.maxWidth / blockDimension - 1) * (level.maxHeight / blockDimension - 1 + (differenzaHeight / blockDimension))) + stringaLivello.slice((level.maxWidth / blockDimension - 1) * (level.maxHeight / blockDimension - 1));
      					stringaLivello = newStringaLivello;
      				}
      				level.maxHeight += differenzaHeight;
      			}
      			if (player.x > level.maxWidth) {
      				player.x = level.maxWidth - player.width * 2
      			}
      			if (player.y > level.maxHeight) {
      				player.y = level.maxHeight - player.height * 2
      			}
      			return stringaLivello;
      		}
      	} //fine di drawExtendLevelMenu()
      	this.drawlevelBar = function () {
      		var oriBarWidth = 38;
      		var oriBarHeight = 15;
      		var oriBarX = (player.x / level.maxWidth) * canvasWidth - (oriBarWidth / 2);
      		var oriBarY = canvasHeight - 3 - oriBarHeight;
      		var verBarWidth = 15;
      		var verBarHeight = 34;
      		var verBarX = canvasWidth - 3 - verBarWidth;
      		var verBarY = (player.y / level.maxHeight) * canvasHeight - (verBarHeight / 2);
      		if (player.permanentLevelBar || checkMouseBox(0, canvasHeight - 3 - oriBarHeight, canvasWidth, oriBarHeight + 3)) {
      			if (oriBarX + oriBarWidth > canvasWidthDefault) {
      				oriBarWidth = (canvasWidthDefault - oriBarX);
      			}
      			if (oriBarX < 0) {
      				oriBarWidth += oriBarX;
      				oriBarX = 0;
      			}
      			if (!this.showAnotherMenu && checkMouseBox(0, canvasHeight - 3 - oriBarHeight, canvasWidth, oriBarHeight + 3) && mouseClick && !checkMouseBox(canvasWidth - 3 - verBarWidth, 0, verBarWidth + 3, canvasHeight)) {
      				oriBarX = mouseX - oriBarWidth / 2;
      				player.x = ((oriBarX + oriBarWidth / 2) * level.maxWidth) / canvasWidth;
      				this.mouseTimer = 30;
      			}
      			ctx.fillStyle = "#cccccc";
      			ctx.fillRect(oriBarX, oriBarY, oriBarWidth, oriBarHeight);
      			ctx.strokeStyle = "#000000";
      			ctx.strokeRect(oriBarX, oriBarY, oriBarWidth, oriBarHeight);
      		}
      		if (player.permanentLevelBar || checkMouseBox(canvasWidth - 3 - verBarWidth, 0, verBarWidth + 3, canvasHeight)) {
      			if (verBarY + verBarHeight > canvasHeightDefault) {
      				verBarHeight = (canvasHeightDefault - verBarY);
      			}
      			if (verBarY < 0) {
      				verBarHeight += verBarY;
      				verBarY = 0;
      			}
      			if (!this.showAnotherMenu && checkMouseBox(canvasWidth - 3 - verBarWidth, 0, verBarWidth + 3, canvasHeight) && mouseClick && !checkMouseBox(0, canvasHeight - 3 - oriBarHeight, canvasWidth, oriBarHeight + 3)) {
      				verBarY = mouseY - verBarHeight / 2;
      				player.y = ((verBarY + verBarHeight / 2) * level.maxHeight) / canvasHeight;
      				this.mouseTimer = 30;
      			}
      			ctx.fillStyle = "#cccccc";
      			ctx.fillRect(verBarX, verBarY, verBarWidth, verBarHeight);
      			ctx.strokeStyle = "#000000";
      			ctx.strokeRect(verBarX, verBarY, verBarWidth, verBarHeight);
      		}
      	} //fine di drawLevelBar()
      	this.drawModifyTileset = async function () {
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 14px Lucida Console";
      		var offsetY = 10;
      		var string1 = "TILESET MENU";
      		var string2 = "Upload the new image. Confirm without uploading to remove the current tileset.";
      		var menuWidth = 8 + ctx.measureText(string2).width;
      		var menuHeight = 8 + (ctx.measureText("O").width + 4) * 5;
      		ctx.fillStyle = "#cccccc";
      		ctx.fillRect(realCanvasWidth / 2 - menuWidth / 2, -offsetY + canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		ctx.strokeStyle = "#000000";
      		ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 2, -offsetY + canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		disegnaTestoConBordino(string1, realCanvasWidth / 2, -offsetY + 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width, "#000000");
      		disegnaTestoConBordino(string2, realCanvasWidth / 2, -offsetY + 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + (menuHeight - 8) / 5, "#000000");
      		disegnaTestoConBordino("confirm", realCanvasWidth / 2 - menuWidth / 4, -offsetY + 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 3 * (menuHeight - 8) / 4, "#000000");
      		if (!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("confirm").width, -offsetY + 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("confirm").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("confirm").width, -offsetY + 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("confirm").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				var tilesNuovi = await controllaFile();
      				stringaLivello = caricaTilesNuovi(stringaLivello, tilesNuovi);
      				stringToLevel(stringaLivello);
      				document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
      				document.getElementById("fileCaricaPartita").value = "";
      				document.getElementById("fileCaricaPartita").disabled = true;
      				document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas
      				this.showModifyTilesetMenu = false;
      				this.showAnotherMenu = false;
      			}
      		}
      		disegnaTestoConBordino("cancel", realCanvasWidth / 2 + menuWidth / 4, -offsetY + 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 3 * (menuHeight - 8) / 4, "#000000");
      		if (!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("cancel").width, -offsetY + 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("cancel").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("cancel").width, -offsetY + 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("cancel").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
      				document.getElementById("fileCaricaPartita").value = "";
      				document.getElementById("fileCaricaPartita").disabled = true;
      				document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas
      				this.showModifyTilesetMenu = false;
      				this.showAnotherMenu = false;
      			}
      		}

      		function caricaTilesNuovi(lvlString, tilesNuovi) {
			//carico il tileset nella stringa livello
      			var indice = level.indiceZ; //parti da dopo la  z
      			if (tilesNuovi == "") {
      				tilesNuovi += ";";
      			}
      			var contaPV = 0;
      			for (; indice < lvlString.length; indice++) { //ciclo fino all'ultimo colore
      				if (lvlString[indice] == ";") {
      					contaPV++;
      				}
      				if (contaPV == 18) {
      					tilesetStart = indice + 1;
      				}
      				if (contaPV == 21) {
      					break;
      				}
      			}
      			lvlString = lvlString.slice(0, tilesetStart + 1) + tilesNuovi + lvlString.slice(indice, lvlString.length);
			//ora aggiorno i colori dei blocchi in base al colore dominante dei tileset
			if(!(tilesNuovi=="" || tilesNuovi==";")){
				var tempCanvas = document.createElement('canvas').getContext('2d');
				//tempCanvas.imageSmoothingEnabled = true;
				var tilesetCaricati = new Image ();
				tilesetCaricati.src=tilesNuovi;
				var newColors=[];
				for(var k=0; k<17; k++){ //per ogni colore dei blocchi
					tempCanvas.clearRect(0,0,16,16);
					if(k<11){
						tempCanvas.drawImage(tilesetCaricati, 16 * k, 16 * 0, 16, 16, 0, 0, 16, 16);
					}else if(k>10 && k<14){
						tempCanvas.drawImage(tilesetCaricati, 16 * (k-11), 16 * 1, 16, 16, 0, 0, 16, 16);
					}else{
						tempCanvas.drawImage(tilesetCaricati, 16 * (k-14), 16 * 2, 16, 16, 0, 0, 16, 16);
					}
					var rgb=[0,0,0,0]; 
					var countRGB=0; var countAlpha=0;
					for(var i=0; i<(tempCanvas.getImageData(0, 0, 16, 16).data.length-9); i+=4){
						if(tempCanvas.getImageData(0, 0, 16, 16).data[i+3]==0 && tempCanvas.getImageData(0, 0, 16, 16).data[i+2]==0 && tempCanvas.getImageData(0, 0, 16, 16).data[i+1]==0 && tempCanvas.getImageData(0, 0, 16, 16).data[i]==0 && countRGB!=0){
							countRGB--;
						}
						countRGB++; countAlpha++;	
						rgb[0]+=tempCanvas.getImageData(0, 0, 16, 16).data[i];   //red
						rgb[1]+=tempCanvas.getImageData(0, 0, 16, 16).data[i+1]; //green
						rgb[2]+=tempCanvas.getImageData(0, 0, 16, 16).data[i+2]; //blu
						rgb[3]+=tempCanvas.getImageData(0, 0, 16, 16).data[i+3]; //alpha channel
					}
					newColors[k]="#";
					for(var i=0; i<4; i++){ //register RGB
						var x="";
						if(i==3){x=parseInt(Math.floor(rgb[i]/countAlpha)).toString(16);
						} else { x=parseInt(Math.floor(rgb[i]/countRGB)).toString(16);}
						if(!(i==3 && x=="ff")){
							if(x.length==1){x="0"+x;}
							newColors[k]+=x;
						}
					}
					var puntoVirgolaPrima=2+k;
					var puntoVirgolaLetti=0; 
					var inizioColore=0, fineColore=0;
      					for (colorIndex = level.indiceZ; colorIndex < lvlString.length; colorIndex++) {
      						if (lvlString[colorIndex] == " ") { //interrompo prima dei tileset e background per ottimizzare il ciclo (non dovrebbe entrare mai in questo if)
      							break;
      						}
      						if (lvlString[colorIndex] == ";") {
      							puntoVirgolaLetti++;
      						}
      						if (puntoVirgolaLetti == puntoVirgolaPrima && inizioColore==0) {
      							inizioColore = colorIndex+1;
      						}
      						if (puntoVirgolaLetti == (puntoVirgolaPrima+1)) {
      							fineColore = colorIndex;
      							break;
      						}
      					}
	      				lvlString = lvlString.slice(0, inizioColore) + newColors[k] + lvlString.slice(fineColore);
				}
				console.log("automatic block color replacement: "+newColors);
			}
      			return lvlString;
      		}
      		async function controllaFile() { //controlla che il file sia caricato correttamente
      			if (document.getElementById("fileCaricaPartita").value == "") {
      				return "";
      			}
      			var uploadedFile = document.getElementById("fileCaricaPartita").files[0];
      			if (uploadedFile.size > (1024 * 1024)) { //controlla la dimensione del file - non deve essere superiore a 1MB
      				objAlert = new newAlert("The file size limit is 1MB. Upload a smaller file.", gamestate);
      				gamestate = 5;
      				return false;
      			}
      			var immagineBase64Letta = await readFileAsDataURL(uploadedFile);
      			return immagineBase64Letta;

      			async function readFileAsDataURL(uploadedFile) {
      				let stringaLetta = await new Promise((resolve) => {
      					let fileReader = new FileReader();
      					fileReader.onload = (e) => resolve(fileReader.result);
      					fileReader.readAsDataURL(uploadedFile);
      				});
      				return stringaLetta;
      			}
      		} //fine di controllaFile()          
      	} //fine di drawModifyTileset()         
      	this.drawModifyBackgroundMenu = async function () {
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 14px Lucida Console";
      		var offsetY = 10;
      		var string1 = "BACKGROUND MENU";
      		var string2 = "Upload the new image. Confirm without uploading to remove the current background.";
      		var menuWidth = 8 + ctx.measureText(string2).width;
      		var menuHeight = 8 + (ctx.measureText("O").width + 4) * 5;
      		ctx.fillStyle = "#cccccc";
      		ctx.fillRect(realCanvasWidth / 2 - menuWidth / 2, -offsetY + canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		ctx.strokeStyle = "#000000";
      		ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 2, -offsetY + canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		disegnaTestoConBordino(string1, realCanvasWidth / 2, -offsetY + 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width, "#000000");
      		disegnaTestoConBordino(string2, realCanvasWidth / 2, -offsetY + 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + (menuHeight - 8) / 5, "#000000");
      		disegnaTestoConBordino("confirm", realCanvasWidth / 2 - menuWidth / 4, -offsetY + 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 3 * (menuHeight - 8) / 4, "#000000");
      		if (!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("confirm").width, -offsetY + 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("confirm").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("confirm").width, -offsetY + 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("confirm").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				var immagineLetta = await controllaFile();
      				if (immagineLetta == "") {
      					immagineLetta += ";";
      				}
      				stringaLivello = rimuoviBackgroundCorrente(stringaLivello) + immagineLetta + ";";
      				stringToLevel(stringaLivello);
      				document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
      				document.getElementById("fileCaricaPartita").value = "";
      				document.getElementById("fileCaricaPartita").disabled = true;
      				document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas
      				this.showModifyBackgroundMenu = false;
      				this.showAnotherMenu = false;
      			}
      		}
      		disegnaTestoConBordino("cancel", realCanvasWidth / 2 + menuWidth / 4, -offsetY + 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 3 * (menuHeight - 8) / 4, "#000000");
      		if (!(this.extendLevelMenu_staScrivendo) && checkMouseBox(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("cancel").width, -offsetY + 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("cancel").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("cancel").width, -offsetY + 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 3 * (menuHeight - 8) / 4, ctx.measureText("cancel").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
      				document.getElementById("fileCaricaPartita").value = "";
      				document.getElementById("fileCaricaPartita").disabled = true;
      				document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas
      				this.showModifyBackgroundMenu = false;
      				this.showAnotherMenu = false;
      			}
      		}

      		function rimuoviBackgroundCorrente(lvlString) {
      			var i = level.indiceZ; //parti da dopo la z
      			var contaPV = 0; //conta punti e virgola
      			for (; i < lvlString.length; i++) { //ciclo fino all'ultimo colore + tileset e si blocca quando inzia background
      				if (lvlString[i] == ";") {
      					contaPV++;
      				}
      				if (contaPV == 21) {
      					break;
      				}
      			}
      			lvlString = lvlString.slice(0, i + 1);
      			return lvlString;
      		}
      		async function controllaFile() { //controlla che il file sia caricato correttamente
      			if (document.getElementById("fileCaricaPartita").value == "") {
      				return "";
      			}
      			var uploadedFile = document.getElementById("fileCaricaPartita").files[0];
      			if (uploadedFile.size > (5 * 1024 * 1024)) { //controlla la dimensione del file - non deve essere superiore a 5MB
      				objAlert = new newAlert("The file size limit is 5MB. Upload a smaller file.", gamestate);
      				gamestate = 5;
      				return false;
      			}
      			var immagineBase64Letta = await readFileAsDataURL(uploadedFile);
      			return immagineBase64Letta;

      			async function readFileAsDataURL(uploadedFile) {
      				let stringaLetta = await new Promise((resolve) => {
      					let fileReader = new FileReader();
      					fileReader.onload = (e) => resolve(fileReader.result);
      					fileReader.readAsDataURL(uploadedFile);
      				});
      				return stringaLetta;
      			}
      		} //fine di controllaFile()          
      	} //fine di drawModifyBackground()        
      	this.blockTabCode = function () {
      		var offsetY = this.selectAndEraserCode() + 20;
      		var voceHeight = ctx.measureText("O").width * 2;
      		var word = "modify block color";
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 15px Lucida Console";
      		if (this.modifyBlock) {
      			ctx.fillStyle = "#8c8c8c";
      			ctx.fillRect(canvasWidthDefault + 2, offsetY + 2, this.width - 4, voceHeight - 4);
      		}
      		ctx.strokeStyle = "#676767";
      		ctx.lineWidth = "1";
      		ctx.strokeRect(canvasWidthDefault + 2, offsetY + 2, this.width - 4, voceHeight - 4);
      		disegnaTestoConBordino(word, canvasWidthDefault + this.width / 2, offsetY - 2 + voceHeight - ctx.measureText("O").width / 2, "#000000");
      		if (checkMouseBox(canvasWidthDefault + 2, offsetY + 2, this.width - 4, voceHeight - 4)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(canvasWidthDefault + 2, offsetY + 2, this.width - 4, voceHeight - 4);
      			if (mouseClick && this.mouseTimer == 0) {
      				this.modifyBlock = !this.modifyBlock;
      				this.selected = "NIENTE";
      				this.fill = false;
      				this.isSelecting = false;
      				this.mouseTimer = 10;
      			}
      		}
      		offsetY += voceHeight;
      		word = "fill rectangle";
      		if (this.fill) {
      			ctx.fillStyle = "#8c8c8c";
      			ctx.fillRect(canvasWidthDefault + 2, offsetY + 2, this.width - 4, voceHeight - 4);
      		}
      		ctx.strokeStyle = "#676767";
      		ctx.lineWidth = "1";
      		ctx.strokeRect(canvasWidthDefault + 2, offsetY + 2, this.width - 4, voceHeight - 4);
      		if (this.selected != "NIENTE") {
      			disegnaTestoConBordino(word, canvasWidthDefault + this.width / 2, offsetY - 2 + voceHeight - ctx.measureText("O").width / 2, "#000000");
      			if (checkMouseBox(canvasWidthDefault + 2, offsetY + 2, this.width - 4, voceHeight - 4)) {
      				ctx.strokeStyle = "#000000";
      				ctx.lineWidth = "2";
      				ctx.strokeRect(canvasWidthDefault + 2, offsetY + 2, this.width - 4, voceHeight - 4);
      				if (mouseClick && this.mouseTimer == 0) {
      					this.fill = !this.fill;
      					this.isSelecting = false;
      					this.modifyBlock = false;
      					this.mouseTimer = 10;
      				}
      			}
      		} else {
      			disegnaTestoConBordino(word, canvasWidthDefault + this.width / 2, offsetY - 2 + voceHeight - ctx.measureText("O").width / 2, "#676767");
      		}
      		offsetY += voceHeight;
      		ctx.textAlign = "center";
      		ctx.font = "bold 15px Lucida Console";
      		var blockLetter = ["PLATFORM BLOCKS", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "X", "FOREGROUND BLOCKS", "m", "n", "o", "BACKGROUND BLOCKS", "p", "q", "r"];
      		var altezzaTotale = canvasHeightDefault - offsetY + 10;
      		var numeroRighe = 9;
      		var rigaCorrente = 0;
      		var altezzaRiga = altezzaTotale / numeroRighe;
      		var larghezzaScritta = this.width / 3;
      		offsetY -= 10;
      		for (i = 0; i < blockLetter.length; i++) {
      			if (blockLetter[i].length > 2) {
      				disegnaTestoConBordino(blockLetter[i], canvasWidthDefault + this.width / 2, offsetY - 2 + altezzaRiga * (rigaCorrente + 1) - ctx.measureText("O").width / 2, "#000000");
      			} else {
      				for (j = 0; j < 3; j++) {
      					if (blockLetter[i].length < 2) {
      						var latoRect = blockDimension; //prima era var latoRect=ctx.measureText("O").width*2;
      						var rectColor = "";
      						if (this.selected == blockLetter[i]) {
      							ctx.fillStyle = "#8c8c8c";
      							ctx.fillRect(canvasWidthDefault + j * larghezzaScritta + 2, offsetY + 2 + altezzaRiga * (rigaCorrente), larghezzaScritta - 4, altezzaRiga - 4);
      						}
      						if (blockLetter[i] == "X") {
      							rectColor = player.color;
      							ctx.font = "small-caps bold 10px Lucida Console";
      							disegnaTestoConBordino("starting", canvasWidthDefault + j * larghezzaScritta + larghezzaScritta / 2, offsetY + altezzaRiga * (rigaCorrente) + ctx.measureText("O").width, "#000000", "#cccccc");
      							disegnaTestoConBordino("position", canvasWidthDefault + j * larghezzaScritta + larghezzaScritta / 2, offsetY - 4 + altezzaRiga * (rigaCorrente + 1), "#000000", "#cccccc");
      							ctx.font = "bold 15px Lucida Console";
      						} else {
      							rectColor = this.getBlockColor(blockLetter[i]);
      						}
      						ctx.strokeStyle = "#676767";
      						ctx.lineWidth = "1";
      						ctx.strokeRect(canvasWidthDefault + j * larghezzaScritta + 2, offsetY + 2 + altezzaRiga * (rigaCorrente), larghezzaScritta - 4, altezzaRiga - 4);
      						if (checkMouseBox(canvasWidthDefault + j * larghezzaScritta + 2, offsetY + 2 + altezzaRiga * (rigaCorrente), larghezzaScritta - 4, altezzaRiga - 4)) {
      							ctx.strokeStyle = "#000000";
      							ctx.lineWidth = "2";
      							ctx.strokeRect(canvasWidthDefault + j * larghezzaScritta + 2, offsetY + 2 + altezzaRiga * (rigaCorrente), larghezzaScritta - 4, altezzaRiga - 4);
      							if (mouseClick && this.mouseTimer == 0) {
      								this.mouseTimer = 10;
      								if (this.modifyBlock) {
      									if (blockLetter[i] != "X") {
      										var k = 0;
      										for (l = 1; l < rectColor.length; l += 2) {
      											this.startingColor[k] = parseInt(rectColor[l] + rectColor[l + 1], 16);
      											k++;
      										}
      										this.showModifyBlockMenu = true;
      										this.showAnotherMenu = true;
      										this.modifyBlockLetter = blockLetter[i];
      									}
      									this.modifyBlock = false;
      								} else {
      									if (this.selected == blockLetter[i]) {
      										this.selected = "NIENTE";
      									} else {
      										this.selected = blockLetter[i];
      									}
      									this.isSelecting = false;
      									this.fill = false;
      								}
      							}
      						}
      						if (level.tileset == "") {
      							ctx.fillStyle = rectColor;
      							ctx.fillRect(canvasWidthDefault + j * larghezzaScritta + larghezzaScritta / 2 - latoRect / 2, offsetY - 2 + altezzaRiga * (rigaCorrente) + altezzaRiga / 2 - latoRect / 2 + ctx.measureText("o").width / 4, latoRect, latoRect);
      						} else {
      							var tilesOffsetX = blockLetter[i].charCodeAt(0) - 97;
      							var tilesOffsetY = 0; //copro le posizioni dello spritesheet contenente il tileset in base alla lettera (convertita in numero codice ascii per usare i numeri)
      							if (blockLetter[i].charCodeAt(0) < 112 && blockLetter[i].charCodeAt(0) > 108) {
      								tilesOffsetX = blockLetter[i].charCodeAt(0) - 109;
      								tilesOffsetY = 1;
      							}
      							if (blockLetter[i].charCodeAt(0) < 115 && blockLetter[i].charCodeAt(0) > 111) {
      								tilesOffsetX = blockLetter[i].charCodeAt(0) - 112;
      								tilesOffsetY = 2;
      							}
      							ctx.drawImage(level.tileset, 16 * tilesOffsetX, 16 * tilesOffsetY, 16, 16, canvasWidthDefault + j * larghezzaScritta + larghezzaScritta / 2 - latoRect / 2, offsetY - 2 + altezzaRiga * (rigaCorrente) + altezzaRiga / 2 - latoRect / 2 + ctx.measureText("o").width / 4, latoRect, latoRect);
      						}
      						ctx.strokeStyle = "#222222";
      						ctx.strokeRect(canvasWidthDefault + j * larghezzaScritta + larghezzaScritta / 2 - latoRect / 2, offsetY - 2 + altezzaRiga * (rigaCorrente) + altezzaRiga / 2 - latoRect / 2 + ctx.measureText("o").width / 4, latoRect, latoRect);
      						if (debugMode || blockLetter[i] == "X") {
      							disegnaTestoConBordino(blockLetter[i], canvasWidthDefault + j * larghezzaScritta + larghezzaScritta / 2, offsetY - 2 + altezzaRiga * (rigaCorrente) + altezzaRiga / 2 + ctx.measureText("O").width / 2, "#000000", "#cccccc");
      						}
      						i++;
      					}
      				}
      				i--;
      			}
      			rigaCorrente++;
      		}
      		ctx.textAlign = "left";
      	} //fine di blockTabCode()
      	this.getBlockColor = function (blockLetter) {
      		var puntiVirgola = 0;
      		var colore = [];
      		for (k = level.indiceZ; k < stringaLivello.length; k++) {
      			if (stringaLivello[k] == " ") {
      				break;
      			}
      			if (stringaLivello[k] == ";") {
      				puntiVirgola++;
      			}
      			if (puntiVirgola > 1) {
      				var coloreLetto = "";
      				for (; k < stringaLivello.length; k++) {
      					if (stringaLivello[k] != ";") {
      						coloreLetto += stringaLivello[k]
      					} else {
      						if (coloreLetto == "") {
      							colore[(puntiVirgola - 2)] = "#155261";
      							break;
      						} else {
      							colore[(puntiVirgola - 2)] = coloreLetto;
      							coloreLetto = "";
      							k--;
      							break;
      						}
      					}
      				}
      			}
      		}
      		switch (blockLetter) {
      			case "a":
      				return colore[0];
      				break;
      			case "b":
      				return colore[1];
      				break;
      			case "c":
      				return colore[2];
      				break;
      			case "d":
      				return colore[3];
      				break;
      			case "e":
      				return colore[4];
      				break;
      			case "f":
      				return colore[5];
      				break;
      			case "g":
      				return colore[6];
      				break;
      			case "h":
      				return colore[7];
      				break;
      			case "i":
      				return colore[8];
      				break;
      			case "j":
      				return colore[9];
      				break;
      			case "k":
      				return colore[10];
      				break;
      			case "m":
      				return colore[11];
      				break;
      			case "n":
      				return colore[12];
      				break;
      			case "o":
      				return colore[13];
      				break;
      			case "p":
      				return colore[14];
      				break;
      			case "q":
      				return colore[15];
      				break;
      			case "r":
      				return colore[16];
      				break;
      		}
      	}
      	this.drawModifyBlockMenu = function () {
      		if (this.mouseTimer > 1) {
      			this.mouseTimer--;
      		}
      		ctx.textAlign = "center";
      		ctx.font = "bold 18px Lucida Console";
      		var string1 = "MODIFY BLOCK COLOR";
      		if (debugMode) {
      			string1 += ": " + this.modifyBlockLetter;
      		}
      		var string2 = ["r:", "g:", "b:", "α:"];
      		var menuWidth = realCanvasWidth / 2;
      		var menuHeight = 8 + (ctx.measureText("O").width + 4) * 12;
      		var rectDimension = 8 * (menuHeight - 8) / 12;
      		var rectColor = "#";
      		for (i = 0; i < 4; i++) {
      			if (this.startingColor[i] > 15) {
      				if (!(i == 3 && this.startingColor[i] == 255)) {
      					rectColor += this.startingColor[i].toString(16);
      				}
      			} else {
      				rectColor += "0" + this.startingColor[i].toString(16);
      			}
      		}
      		var xOffset = 10;
      		ctx.fillStyle = "#cccccc";
      		ctx.fillRect(realCanvasWidth / 2 - menuWidth / 2, canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		ctx.strokeStyle = "#000000";
      		ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 2, canvasHeightDefault / 2 - menuHeight / 2, menuWidth, menuHeight);
      		ctx.fillStyle = rectColor;
      		ctx.fillRect(realCanvasWidth / 2 + menuWidth / 2 - xOffset - rectDimension, 2 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (menuHeight - 8) / 12, rectDimension * 0.91, rectDimension * 0.91);
      		disegnaTestoConBordino(rectColor, realCanvasWidth / 2 + menuWidth / 2 - xOffset - rectDimension + rectDimension * 0.91 / 2, -3 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (menuHeight - 8) / 12 + rectDimension * 0.91, "#000000", "#cccccc");
      		disegnaTestoConBordino(string1, realCanvasWidth / 2, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width, "#000000");
      		ctx.textAlign = "left";
      		for (i = 0; i < 4; i++) {
      			xOffset = 10;
      			var textColor = "";
      			switch (i) {
      				case 0:
      					textColor = "#ff0000";
      					break;
      				case 1:
      					textColor = "#00ff00";
      					break;
      				case 2:
      					textColor = "#0000ff";
      					break;
      				default:
      					textColor = "#000000";
      					break;
      			}
      			disegnaTestoConBordino(string2[i], realCanvasWidth / 2 - menuWidth / 2 + xOffset, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (i + 1) * (menuHeight - 8) / 12, textColor);
      			xOffset += 10 + ctx.measureText("α:").width;
      			disegnaTestoConBordino("-", realCanvasWidth / 2 - menuWidth / 2 + xOffset, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (i + 1) * (menuHeight - 8) / 12, textColor);
      			ctx.strokeStyle = "#676767";
      			ctx.lineWidth = "1";
      			ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 2 + xOffset - ctx.measureText("O").width / 2, 2 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (i + 1) * (menuHeight - 8) / 12, ctx.measureText("O").width * 1.5, ctx.measureText("O").width * 1.5);
      			if (this.startingColor[i] > 0 && this.mouseTimer == 1 && checkMouseBox(realCanvasWidth / 2 - menuWidth / 2 + xOffset - ctx.measureText("O").width / 2, 2 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (i + 1) * (menuHeight - 8) / 12, ctx.measureText("O").width * 1.5, ctx.measureText("O").width * 1.5)) {
      				ctx.strokeStyle = "#000000";
      				ctx.lineWidth = "2";
      				ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 2 + xOffset - ctx.measureText("O").width / 2, 2 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (i + 1) * (menuHeight - 8) / 12, ctx.measureText("O").width * 1.5, ctx.measureText("O").width * 1.5);
      				if (mouseClick) {
      					this.startingColor[i]--;
      					this.mouseTimer = 10;
      				}
      			}
      			xOffset += 5 + ctx.measureText("O").width;
      			var barLength = menuWidth - xOffset * 2 - rectDimension - ctx.measureText("000").width;
      			ctx.fillStyle = "#676767";
      			ctx.fillRect(realCanvasWidth / 2 - menuWidth / 2 + xOffset, -2 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (i + 1) * (menuHeight - 8) / 12, barLength, 3);
      			var sliderWidth = 5;
      			var sliderX = realCanvasWidth / 2 - menuWidth / 2 + xOffset - sliderWidth / 2;
      			if (checkMouseBox(realCanvasWidth / 2 - menuWidth / 2 + xOffset, -2 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (i + 1) * (menuHeight - 8) / 12, barLength, ctx.measureText("O").width * 2) && mouseClick) {
      				this.startingColor[i] = -4 + Math.round((mouseX - sliderX) * 255 / barLength);
      				if (this.startingColor[i] < 0) {
      					this.startingColor[i] = 0;
      				}
      				if (this.startingColor[i] > 255) {
      					this.startingColor[i] = 255;
      				}
      			}
      			sliderX += barLength * this.startingColor[i] / 255;
      			ctx.fillStyle = "#272727";
      			ctx.fillRect(sliderX, -1 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (i + 1) * (menuHeight - 8) / 12 + ctx.measureText("O").width / 2, sliderWidth, ctx.measureText("O").width);
      			disegnaTestoConBordino("+  " + this.startingColor[i], realCanvasWidth / 2 - menuWidth / 2 + xOffset + barLength + 10, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 2 * (i + 1) * (menuHeight - 8) / 12, textColor);
      			ctx.strokeStyle = "#676767";
      			ctx.lineWidth = "1";
      			ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 2 + xOffset + barLength + 13.5 - ctx.measureText("O").width / 2, 2 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (i + 1) * (menuHeight - 8) / 12, ctx.measureText("O").width * 1.5, ctx.measureText("O").width * 1.5);
      			if (this.startingColor[i] < 255 && this.mouseTimer == 1 && checkMouseBox(realCanvasWidth / 2 - menuWidth / 2 + xOffset + barLength + 13.5 - ctx.measureText("O").width / 2, 2 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (i + 1) * (menuHeight - 8) / 12, ctx.measureText("O").width * 1.5, ctx.measureText("O").width * 1.5)) {
      				ctx.strokeStyle = "#000000";
      				ctx.lineWidth = "2";
      				ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 2 + xOffset + barLength + 13.5 - ctx.measureText("O").width / 2, 2 + canvasHeightDefault / 2 - menuHeight / 2 + 2 * (i + 1) * (menuHeight - 8) / 12, ctx.measureText("O").width * 1.5, ctx.measureText("O").width * 1.5);
      				if (mouseClick) {
      					this.startingColor[i]++;
      					this.mouseTimer = 10;
      				}
      			}
      		}
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 18px Lucida Console";
      		disegnaTestoConBordino("confirm", realCanvasWidth / 2 - menuWidth / 4, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 10 * (menuHeight - 8) / 12, "#000000");
      		if (checkMouseBox(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("confirm").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 10 * (menuHeight - 8) / 12, ctx.measureText("confirm").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 - menuWidth / 4 - ctx.measureText("confirm").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 10 * (menuHeight - 8) / 12, ctx.measureText("confirm").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				stringToLevel(modificaColore(rectColor, this.modifyBlockLetter));
      				this.showAnotherMenu = false;
      				this.showModifyBlockMenu = false;
      				this.startingColor = [0, 0, 0, 255];
      				this.modifyBlockLetter = "";
      			}
      		}
      		disegnaTestoConBordino("cancel", realCanvasWidth / 2 + menuWidth / 4, 4 + canvasHeightDefault / 2 - menuHeight / 2 + ctx.measureText("O").width + 10 * (menuHeight - 8) / 12, "#000000");
      		if (checkMouseBox(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("cancel").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 10 * (menuHeight - 8) / 12, ctx.measureText("cancel").width * 2, 4 * ctx.measureText("O").width / 2)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(realCanvasWidth / 2 + menuWidth / 4 - ctx.measureText("cancel").width, 5 + canvasHeightDefault / 2 - menuHeight / 2 - ctx.measureText("O").width / 2 + 10 * (menuHeight - 8) / 12, ctx.measureText("cancel").width * 2, 4 * ctx.measureText("O").width / 2);
      			if (mouseClick) {
      				this.showAnotherMenu = false;
      				this.showModifyBlockMenu = false;
      				this.startingColor = [0, 0, 0, 255];
      				this.modifyBlockLetter = "";
      			}
      		}
      		ctx.textAlign = "left";

      		function modificaColore(colore, lettera) {
      			var puntoVirgolaPrima = 0;
      			var puntoVirgolaLetti = 0;
      			var inizioColore = 0;
      			var fineColore = 0;
      			switch (lettera) {
      				case "a":
      					puntoVirgolaPrima = 2;
      					break;
      				case "b":
      					puntoVirgolaPrima = 3;
      					break;
      				case "c":
      					puntoVirgolaPrima = 4;
      					break;
      				case "d":
      					puntoVirgolaPrima = 5;
      					break;
      				case "e":
      					puntoVirgolaPrima = 6;
      					break;
      				case "f":
      					puntoVirgolaPrima = 7;
      					break;
      				case "g":
      					puntoVirgolaPrima = 8;
      					break;
      				case "h":
      					puntoVirgolaPrima = 9;
      					break;
      				case "i":
      					puntoVirgolaPrima = 10;
      					break;
      				case "j":
      					puntoVirgolaPrima = 11;
      					break;
      				case "k":
      					puntoVirgolaPrima = 12;
      					break;
      				case "m":
      					puntoVirgolaPrima = 13;
      					break;
      				case "n":
      					puntoVirgolaPrima = 14;
      					break;
      				case "o":
      					puntoVirgolaPrima = 15;
      					break;
      				case "p":
      					puntoVirgolaPrima = 16;
      					break;
      				case "q":
      					puntoVirgolaPrima = 17;
      					break;
      				case "r":
      					puntoVirgolaPrima = 18;
      					break;
      			}
      			for (k = level.indiceZ; k < stringaLivello.length; k++) {
      				if (stringaLivello[k] == " ") {
      					break;
      				}
      				if (stringaLivello[k] == ";") {
      					puntoVirgolaLetti++;
      				}
      				if (puntoVirgolaLetti == puntoVirgolaPrima && inizioColore == 0) {
      					inizioColore = k + 1;
      				}
      				if (puntoVirgolaLetti == puntoVirgolaPrima + 1) {
      					fineColore = k;
      					break;
      				}
      			}
      			stringaLivello = stringaLivello.slice(0, inizioColore) + colore + stringaLivello.slice(fineColore);
      			return stringaLivello;
      		}
      	}
      	this.entityTabCode = function () {
      		var offsetY = this.selectAndEraserCode() + 23 + ctx.measureText("O").width;
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 15px Lucida Console";
      		var quantitaPerRiga = 8;
      		var larghezzaScritta = this.width / quantitaPerRiga;
      		var altezzaTotale = canvasHeightDefault - offsetY + 5;
      		var numeroRighe = listaTipoEntity.length;
      		for (o = 0; o < listaEntity.length; o++) {
      			numeroRighe += Math.ceil(listaEntity[o].length / quantitaPerRiga);
      		}
      		var rigaCorrente = 0;
      		var altezzaRiga = altezzaTotale / numeroRighe;
      		offsetY -= 10;
      		this.incrementaTimer = false;
      		for (o = 0; o < listaTipoEntity.length; o++) {
      			disegnaTestoConBordino(listaTipoEntity[o], canvasWidthDefault + this.width / 2, offsetY - 2 + altezzaRiga * (rigaCorrente + 1) - ctx.measureText("O").width / 2, "#000000");
      			rigaCorrente++
      			for (i = 0; i < listaEntity[o].length; i++) {
      				for (j = 0; j < quantitaPerRiga; j++) {
      					var latoRect = ctx.measureText("O").width * 2;
      					if (this.selected == listaEntity[o][i].letter) {
      						ctx.fillStyle = "#8c8c8c";
      						ctx.fillRect(canvasWidthDefault + j * larghezzaScritta + 2, offsetY + 2 + altezzaRiga * (rigaCorrente), larghezzaScritta - 4, altezzaRiga - 4);
      					}
      					ctx.strokeStyle = "#676767";
      					ctx.lineWidth = "1";
      					ctx.strokeRect(canvasWidthDefault + j * larghezzaScritta + 2, offsetY + 2 + altezzaRiga * (rigaCorrente), larghezzaScritta - 4, altezzaRiga - 4);
      					var rectColor = listaEntity[o][i].color1;
      					if (checkMouseBox(canvasWidthDefault + j * larghezzaScritta + 2, offsetY + 2 + altezzaRiga * (rigaCorrente), larghezzaScritta - 4, altezzaRiga - 4)) {
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault + j * larghezzaScritta + 2, offsetY + 2 + altezzaRiga * (rigaCorrente), larghezzaScritta - 4, altezzaRiga - 4);
      						ctx.textAlign = "center";
      						ctx.font = "small-caps bold 10px Lucida Console";
      						var entityRectWidth = listaEntity[o][i].width + 10;
      						if (entityRectWidth < ctx.measureText(listaEntity[o][i].name).width + 10) {
      							entityRectWidth = ctx.measureText(listaEntity[o][i].name).width + 10;
      						}
      						ctx.fillStyle = "#cccccc";
      						ctx.fillRect(canvasWidthDefault / 2 - entityRectWidth / 2, canvasHeightDefault / 2 - listaEntity[o][i].height / 2 - 10, entityRectWidth, listaEntity[o][i].height + 20 + ctx.measureText("O").width);
      						ctx.strokeStyle = "#000000";
      						ctx.lineWidth = "2";
      						ctx.strokeRect(canvasWidthDefault / 2 - entityRectWidth / 2, canvasHeightDefault / 2 - listaEntity[o][i].height / 2 - 10, entityRectWidth, listaEntity[o][i].height + 20 + ctx.measureText("O").width);
      						disegnaTestoConBordino(listaEntity[o][i].name, canvasWidthDefault / 2, canvasHeightDefault / 2 + listaEntity[o][i].height / 2 + 8 - 2 + ctx.measureText("O").width, "#000000");
      						if (listaEntity[o][i].canSelfDraw == true) {
      							listaEntity[o][i].selfDraw(canvasWidthDefault / 2 - listaEntity[o][i].width / 2, canvasHeightDefault / 2 - listaEntity[o][i].height / 2, i);
      						} else {
      							ctx.fillStyle = listaEntity[o][i].color1;
      							ctx.fillRect(canvasWidthDefault / 2 - listaEntity[o][i].width / 2, canvasHeightDefault / 2 - listaEntity[o][i].height / 2, listaEntity[o][i].width, listaEntity[o][i].height);
      						}
      						ctx.textAlign = "center";
      						ctx.font = "small-caps bold 15px Lucida Console";
      						if (mouseClick && this.mouseTimer == 0) {
      							this.mouseTimer = 10;
      							if (this.selected == listaEntity[o][i].letter) {
      								this.selected = "NIENTE";
      							} else {
      								this.selected = listaEntity[o][i].letter;
      							}
      							this.isSelecting = false;
      						}
      					}
      					ctx.fillStyle = rectColor;
      					ctx.fillRect(canvasWidthDefault + j * larghezzaScritta + larghezzaScritta / 2 - latoRect / 2, offsetY - 2 + altezzaRiga * (rigaCorrente) + altezzaRiga / 2 - latoRect / 2 + ctx.measureText("o").width / 4, latoRect, latoRect);
      					ctx.strokeStyle = "#222222";
      					ctx.strokeRect(canvasWidthDefault + j * larghezzaScritta + larghezzaScritta / 2 - latoRect / 2, offsetY - 2 + altezzaRiga * (rigaCorrente) + altezzaRiga / 2 - latoRect / 2 + ctx.measureText("o").width / 4, latoRect, latoRect);
      					if (true) {
      						disegnaTestoConBordino(listaEntity[o][i].letter, canvasWidthDefault + j * larghezzaScritta + larghezzaScritta / 2, offsetY - 2 + altezzaRiga * (rigaCorrente) + altezzaRiga / 2 + ctx.measureText("O").width / 2, "#000000", "#cccccc");
      					}
      					i++;
      					if (i > listaEntity[o].length - 1) {
      						break;
      					}
      				}
      				rigaCorrente++;
      				i--;
      			}
      		}
      		ctx.textAlign = "left";
      	} //fine di entityTabCode()        
      	this.selectAndEraserCode = function () {
      		ctx.textAlign = "center";
      		ctx.font = "small-caps bold 15px Lucida Console";
      		var voceWidth = this.width / 2;
      		var voceHeight = ctx.measureText("O").width * 2;
      		var word1 = "select";
      		var word2 = "eraser";
      		var word3 = "deselect";
      		if (this.isSelecting) {
      			ctx.fillStyle = "#8c8c8c";
      			ctx.fillRect(canvasWidthDefault + 2, 22, voceWidth - 4, voceHeight - 4);
      		}
      		if (this.selected == ".") {
      			ctx.fillStyle = "#8c8c8c";
      			ctx.fillRect(canvasWidthDefault + voceWidth + 2, 22, voceWidth - 4, voceHeight - 4);
      		}
      		ctx.strokeStyle = "#676767";
      		ctx.lineWidth = "1";
      		ctx.strokeRect(canvasWidthDefault + 2, 22, voceWidth - 4, voceHeight - 4);
      		ctx.strokeRect(canvasWidthDefault + voceWidth + 2, 22, voceWidth - 4, voceHeight - 4);
      		if (this.selected == "NIENTE") {
      			disegnaTestoConBordino(word1, canvasWidthDefault + voceWidth / 2, 20 + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      			if (checkMouseBox(canvasWidthDefault + 2, 22, voceWidth - 4, voceHeight - 4)) {
      				ctx.strokeStyle = "#000000";
      				ctx.lineWidth = "2";
      				ctx.strokeRect(canvasWidthDefault + 2, 22, voceWidth - 4, voceHeight - 4);
      				if (mouseClick && this.mouseTimer == 0) {
      					this.isSelecting = !this.isSelecting;
      					this.modifyBlock = false;
      					this.fill = false;
      					this.mouseTimer = 10;
      				}
      			}
      		} else {
      			disegnaTestoConBordino(word3, canvasWidthDefault + voceWidth / 2, 20 + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      			if (checkMouseBox(canvasWidthDefault + 2, 22, voceWidth - 4, voceHeight - 4)) {
      				ctx.strokeStyle = "#000000";
      				ctx.lineWidth = "2";
      				ctx.strokeRect(canvasWidthDefault + 2, 22, voceWidth - 4, voceHeight - 4);
      				if (mouseClick && this.mouseTimer == 0) {
      					this.selected = "NIENTE";
      					this.fill = false;
      					this.mouseTimer = 10;
      				}
      			}
      		}
      		disegnaTestoConBordino(word2, canvasWidthDefault + voceWidth + voceWidth / 2, 20 + voceHeight / 2 + ctx.measureText("o").width / 2, "#000000");
      		if (checkMouseBox(canvasWidthDefault + voceWidth + 2, 22, voceWidth - 4, voceHeight - 4)) {
      			ctx.strokeStyle = "#000000";
      			ctx.lineWidth = "2";
      			ctx.strokeRect(canvasWidthDefault + voceWidth + 2, 22, voceWidth - 4, voceHeight - 4);
      			if (mouseClick && this.mouseTimer == 0) {
      				if (this.selected == ".") {
      					this.selected = "NIENTE";
      				} else {
      					this.selected = ".";
      				}
      				this.isSelecting = false;
      				this.modifyBlock = false;
      				this.fill = false;
      				this.mouseTimer = 10;
      			}
      		}
      		ctx.textAlign = "left";
      		return voceHeight;
      	} //fine di selectAndEraserCode()
      	this.piazzaBloccoCode = function () {
      		if (mouseClick && mouseY > 25 && mouseX > 25 && mouseX < canvasWidth - 25 && mouseY < canvasHeight - 25) {
      			var indice = (level.maxWidth / blockDimension - 1) * lvlCanvasMouseY+1;
      			if (this.selected == "w") {
      				if (stringaLivello[indice] != "t") {
      					for (i = level.maxWidth / blockDimension - 1; i < level.indiceZ; i++) {
      						if (stringaLivello[i] == "w") {
      							stringaLivello = stringaLivello.slice(0, i) + "l" + stringaLivello.slice(i + 1);
      						}
      					}
      					stringaLivello = stringaLivello.slice(0, indice) + "w" + stringaLivello.slice(indice + 1);
      					this.selected = "NIENTE";
      					stringToLevel(stringaLivello);
      				}
      			} else {
      				if (this.fill) {
      					indiceX = lvlCanvasMouseX;
      					var bloccoDaCambiare = stringaLivello[indice + indiceX];
      					var startY = indice;
      					var y = startY;
      					var x = indiceX;
      					var miFermo = false;
      					for (; y > -1; y -= (level.maxWidth / blockDimension - 1)) {
      						if (stringaLivello[y + x] != bloccoDaCambiare) {
      							y += (level.maxWidth / blockDimension - 1);
      							startY = y;
      							break;
      						}
      					}
      					for (; y < level.indiceZ; y += (level.maxWidth / blockDimension - 1)) {
      						if (stringaLivello[y + indiceX] != bloccoDaCambiare) {
      							break;
      						} else {
      							if (miFermo) {
      								break;
      							}
      							var stringaBlocchi = this.selected;
      							x = indiceX;
      							var startX = x + y;
      							for (; x > -1; x--) {
      								if (stringaLivello[y + x] != bloccoDaCambiare) {
      									if (stringaLivello[y + x] != "l") {
      										miFermo = true;
      									}
      									x += 2;
      									startX = x + y - 1;
      									break;
      								}
      							}
      							for (; x < level.maxWidth / blockDimension - 1; x++) {
      								if (stringaLivello[y + x] != bloccoDaCambiare) {
      									x--;
      									miFermo = true;
      									break;
      								} else {
      									stringaBlocchi += this.selected;
      								}
      							}
      							var stringa1 = stringaLivello.slice(0, startX);
      							var stringa2 = stringaLivello.slice(startX + (stringaBlocchi.length))
      							stringaLivello = stringa1 + stringaBlocchi + stringa2;
      							stringToLevel(stringaLivello);
      						}
      					}
      				} else {
      					indice += lvlCanvasMouseX;
      					if (indice < level.indiceZ) {
      						switch (stringaLivello[indice]) {
      							case "t":
      							case "l":
      							case "w":
      								break; //nei casi dei blocchi speciali non fare nulla
      							default:
      								stringaLivello = stringaLivello.slice(0, indice) + this.selected + stringaLivello.slice(indice + 1);
      								stringToLevel(stringaLivello);
      								break;
      						}
      					}
      				}
      			}
      		}
      	} //fine di piazzaBloccoCode()
      }
