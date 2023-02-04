    function newMenuPrincipale() {
    	this.width = canvasWidth;
    	this.height = canvasHeight;
    	this.indice = 0;
    	this.isClosing = false;
    	this.closingIndex = 0;
    	this.isGoingToStageSelection = false;
    	this.drawMenuPrincipale = function (canInput) {
    		ctx.clearRect(0, 0, canvasWidth, canvasHeight); //pulisce tutto
    		ctx.fillStyle = "#020219";
    		ctx.fillRect(0, 0, canvasWidth + 1, canvasHeight + 1); //sfondo nero
    		ctx.textAlign = "right";
    		ctx.font = "small-caps bold 15px Lucida Console";
    		disegnaTestoConBordino("by lordf", canvasWidth - 3, canvasHeight - 2, "#d2d2d2bb", "#020219");
    		ctx.textAlign = "left";
    		disegnaTestoConBordino(versioneDiGioco, 3, canvasHeight - 2, "#d2d2d2bb", "#020219");
    		ctx.font = "small-caps bold oblique 250px Lucida Console";
    		disegnaTestoConBordino("X", 73 + canvasWidth / 2, 243, "#ff9200", "#ffd600");
    		ctx.font = "small-caps bold oblique 125px Lucida Console";
    		disegnaTestoConBordino("simple", 17 + canvasWidth / 20, 200, "#0001cb", "#02b0ef");
    		ctx.font = "small-caps bold oblique 75px Lucida Console";
    		disegnaTestoConBordino("js", 234 + canvasWidth / 2, 245, "#0001cb", "#02b0ef");
    		ctx.font = "small-caps bold 30px Lucida Console";
    		ctx.textAlign = "center";
    		if (this.indice == 0) {
    			disegnaTestoConBordino("new game", canvasWidth / 2, 350, "#ff9200", "#f9c065");
    		} else {
    			disegnaTestoConBordino("new game", canvasWidth / 2, 350, "#0001cb", "#02b0ef");
    		}
    		if (this.indice == 1) {
    			disegnaTestoConBordino("load game", canvasWidth / 2, 400, "#ff9200", "#f9c065");
    		} else {
    			disegnaTestoConBordino("load game", canvasWidth / 2, 400, "#0001cb", "#02b0ef");
    		}
    		if (this.indice == 2) {
    			disegnaTestoConBordino("options", canvasWidth / 2, 450, "#ff9200", "#f9c065");
    		} else {
    			disegnaTestoConBordino("options", canvasWidth / 2, 450, "#0001cb", "#02b0ef");
    		}
    		if (canInput && !this.isClosing) { //input dei tasti
    			if (keys[sukey] && !tastoGiaSchiacciato) {
    				if (this.indice > 0) {
    					this.indice--;
    				} else {
    					this.indice = 2;
    				}
    			}
    			if (keys[giukey] && !tastoGiaSchiacciato) {
    				if (this.indice < 2) {
    					this.indice++;
    				} else {
    					this.indice = 0;
    				}
    			}
    			if ((keys[startkey] || keys[dashkey]) && !tastoGiaSchiacciato) {
    				switch (this.indice) {
    					case 0: //nuovo gioco 
    						this.isClosing = true;
    						//this.isGoingToStageSelection = true;
 						stringaSalvataggio = stringaSalvataggioDefault;
						CaricaPartita(stringaSalvataggio);
    						break;
    					case 1: //carica partita
    						objMenuCaricaPartita = new newMenuCaricaPartita();
    						gamestate = 6;
    						break;
    					case 2: //opzioni 
    						objMenuOpzioni = new newMenuOpzioni(0, 0, false);
    						tastoGiaSchiacciato = true;
    						gamestate = 3;
    						break;
    				}
    			}
    			if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
    				tastoGiaSchiacciato = true;
    			} else {
    				tastoGiaSchiacciato = false;
    			}
    		}
    		if (this.isClosing) { //animazione di chiusura del menu
    			ctx.fillStyle = "#000000";
    			this.closingIndex += 13;
    			ctx.fillRect(0, 0, canvasWidth, this.closingIndex);
    			ctx.fillRect(0, canvasHeight - this.closingIndex, canvasWidth, this.closingIndex);
    			ctx.fillRect(0, 0, this.closingIndex, canvasHeight);
    			ctx.fillRect(canvasWidth - this.closingIndex, 0, canvasWidth - this.closingIndex, canvasHeight);
    			if (this.closingIndex > ((canvasWidth / 2) - 1)) { //quando e' tutto chiuso
    				ctx.textAlign = "left"; // se no si bugga della roba
    				if (this.isGoingToStageSelection) {
    					gamestate = 1;
    				} else {
    					gamestate = -1;
    				}
    			}
    		}
    	}
    }

    function newMenuDiPausa() {
    	this.width = 0;
    	this.height = 0;
    	this.widthMax = canvasWidth - 150;
    	this.heightMax = canvasHeight - 150;
    	this.isOpen = false;
    	this.isClosing = false;
    	this.canInput = true;
    	this.tornaMenuPrecedente = false;
    	this.indice = player.activePower;
    	this.settore = 0;
    	this.usingSubtank = 4; //4 vuol dire che non sto usando la subtank (da 0 a 3 e' l'indice della subtank usata)
    	this.lastSubtankAcquired = 4; //se rimane uguale a 4 vuol dire che non e' stata acquisita nessuna subtank
    	this.drawMenuDiPausa = function () {
    		ctx.textAlign = "left";
    		ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
    		if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu + lettura subtank acquisite
    			if (this.width < this.widthMax) {
    				this.width += this.widthMax/15;
    			}
    			if (this.height < this.heightMax) {
    				this.height += this.heightMax/15 ;
    			}
    			if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
    				this.isOpen = true;
    				for (var j = 0; j < 4; j++) { //legge l'indice dell'ultima subtank acquisita
    					if (subtank[j].acquired) {
    						this.lastSubtankAcquired = j;
    					}
    				}
    			}
    		}
    		ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
    		ctx.fillStyle = "#d2d2d2";
    		ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
    		ctx.fillStyle = "#52b58b";
    		ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
    		if (this.isOpen) { //qui dentro devo mostrare il testo del menu e gestire cosa succede quando schiaccio i tasti
    			ctx.fillStyle = "#d2d2d2";
    			ctx.fillRect((canvasWidth / 2) + this.width / 2 - 250, (canvasHeight / 2) - this.height / 2, 15, this.height);
    			ctx.fillRect((canvasWidth / 2) + this.width / 2 - 250, (canvasHeight / 2), 250, 15); //disegna i settori del menu
    			for (i = 0; i < 9; i++) { //disegna le scritte del settore 0 (xbuster e poteri di X)
    				var xdisegnata = (canvasWidth / 2) - this.width / 2 + 13;
    				var ydisegnata = ((canvasHeight / 2) - this.height / 2) + (44 * i) - 7;
    				if (i - 1 < 0) { //default weapon
					switch(currentPlayer){
    						case 0: disegnaTestoConBordino("X Buster", xdisegnata, ydisegnata + 33, "#d2d2d2", "#000000");break;
    						case 1: disegnaTestoConBordino("Vampire Killer", xdisegnata, ydisegnata + 33, "#d2d2d2", "#000000");break;
					}
    				} else {
    					if (levelDefeated[i - 1]) { //disegna i poteri e le loro barre
    						disegnaTestoConBordino(player.power[i - 1].nome, xdisegnata, ydisegnata + 21, player.power[i - 1].color1, "#000000");
    						for (j = 0; j < player.power[i - 1].usageMax; j++) {
    							ctx.fillStyle = '#444444';
    							ctx.fillRect(j * 10 + xdisegnata + 2, ydisegnata + 25, 9, 12);
    							if (player.power[i - 1].usage < j + 1) {
    								ctx.fillStyle = '#a7a7a7';
    							} else {
    								ctx.fillStyle = player.power[i - 1].color1;
    							}
    							ctx.fillRect(j * 10 + xdisegnata + 3, ydisegnata + 25, 8, 11);
    						}
    					}
    				}
    			}
    			for (i = 0; i < 5; i++) { //disegna le subtank
    				var xdisegnata = (canvasWidth / 2) + this.width / 2 - 250 + 15;
    				var ydisegnata = ((canvasHeight / 2) - this.height / 2) + (40 * i) - 6;
    				if (i < 1) { //scrive Subtanks
    					ctx.textAlign = "center";
    					disegnaTestoConBordino("Subtanks", xdisegnata + (250 - 15) / 2, ydisegnata + 30, "#d2d2d2", "#000000");
    				} else { //disegna le barre delle subtanks
    					ctx.textAlign = "left";
    					if (subtank[i - 1].acquired) {
    						disegnaTestoConBordino("S", xdisegnata + 15, ydisegnata + 28, "#ffc000", "#000000");
    						for (j = 0; j < subtank[i - 1].lifeMax; j++) {
    							ctx.fillStyle = '#444444';
    							ctx.fillRect(j * 9 + xdisegnata + 39, ydisegnata + 12, 8, 17);
    							if (subtank[i - 1].life < j + 1) {
    								ctx.fillStyle = '#a7a7a7';
    							} else {
    								ctx.fillStyle = '#ffc000';
    							}
    							ctx.fillRect(j * 9 + xdisegnata + 40, ydisegnata + 12, 7, 16);
    						}
    					}
    				}
    			}
    			for (i = 0; i < 3; i++) { //ora disegno la parte sotto le subtanks
    				ctx.textAlign = "left";
    				var xdisegnata = (canvasWidth / 2) + this.width / 2 - 250 + 15 + 10;
    				var ydisegnata = ((canvasHeight / 2) + 15 + ((canvasHeight - this.height + 30) / 3 * (i + 1))) - 1;
    				switch (i) {
    					case 0:
    						disegnaTestoConBordino("resume game", xdisegnata + 5, ydisegnata + 7 - ((canvasHeight - this.height + 30) / 3) / 2, "#d2d2d2", "#000000");
    						break;

    					case 1:
    						disegnaTestoConBordino("options", xdisegnata + 5, ydisegnata + 7 - ((canvasHeight - this.height + 30) / 3) / 2, "#d2d2d2", "#000000");
    						break;

    					case 2:
    						disegnaTestoConBordino("return to the", xdisegnata + 5, ydisegnata - 2 - ((canvasHeight - this.height + 30) / 3) / 2, "#d2d2d2", "#000000");
    						disegnaTestoConBordino("main menu", xdisegnata + 5, ydisegnata + 15 - ((canvasHeight - this.height + 30) / 3) / 2, "#d2d2d2", "#000000");
    						break;
    				}
    			}

    			if (this.settore == 0) { //disegna i quadrati intorno alla scritta scelta - parte poteri
    				ctx.fillStyle = "#ffc000";
    				var xdisegnata = (canvasWidth / 2) - this.width / 2 + 13;
    				var ydisegnata = ((canvasHeight / 2) - this.height / 2) + (44 * this.indice) - 7;
    				if (this.indice == 0) {
    					ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata + 5, (canvasWidth / 2) + this.width / 2 - 325, 8);
    					ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata + 40, (canvasWidth / 2) + this.width / 2 - 325, 8);
    					ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata + 5, 8, 40);
    					ctx.fillRect((canvasWidth / 2) + this.width / 2 - 258, ydisegnata + 5, 8, 40);
    				} else {
    					ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata - 5, (canvasWidth / 2) + this.width / 2 - 325, 8);
    					ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata + 42, (canvasWidth / 2) + this.width / 2 - 325, 8);
    					ctx.fillRect((canvasWidth / 2) - this.width / 2, ydisegnata - 5, 8, 51);
    					ctx.fillRect((canvasWidth / 2) + this.width / 2 - 258, ydisegnata - 5, 8, 51);
    				}
    			} else if (this.settore == 1) { //disegna i quadrati intorno alla scritta scelta - parte subtank e sotto subtank
    				if (this.indice < 4) { //disegna quadrati del settore subtank
    					ctx.fillStyle = "#ffc000";
    					var xdisegnata = (canvasWidth / 2) + this.width / 2 - 250 + 15;
    					var ydisegnata = ((canvasHeight / 2) - this.height / 2) + (40 * (this.indice + 1)) - 6;
    					ctx.fillRect(xdisegnata, ydisegnata, 235, 9);
    					ctx.fillRect(xdisegnata, ydisegnata + 32, 235, 9);
    					ctx.fillRect(xdisegnata, ydisegnata, 9, 40);
    					ctx.fillRect(xdisegnata + 235 - 9, ydisegnata, 9, 40);
    				} else { //disegna quadrati della parte sotto le subtank
    					ctx.fillStyle = "#ffc000";
    					var xdisegnata = (canvasWidth / 2) + this.width / 2 - 250 + 15;
    					var ydisegnata = ((canvasHeight / 2) + 15 + ((canvasHeight - this.height + 30) / 3 * (this.indice - 4))) - 1;
    					ctx.fillRect(xdisegnata, ydisegnata, 235, 9);
    					ctx.fillRect(xdisegnata, ydisegnata + ((canvasHeight - this.height + 30) / 3 - 8), 235, 9);
    					ctx.fillRect(xdisegnata, ydisegnata, 9, ((canvasHeight - this.height + 30) / 3 - 8));
    					ctx.fillRect(xdisegnata + 235 - 9, ydisegnata, 9, ((canvasHeight - this.height + 30) / 3 - 8));
    				}
    			}
    			if (this.usingSubtank < 4) { //se il menu e' impostato nell'usare una subtank:
    				if (subtank[this.usingSubtank].life > 0) {
    					subtank[this.usingSubtank].life -= 0.5;
    					if (player.life < player.lifeMax) {
    						player.life += 0.5;
    						drawHUD();
    					}
    				} else { //esce dallo stato di depleting della subtank
    					this.usingSubtank = 4;
    					this.canInput = true;
    				}
    			}
    			if (this.canInput) { //cosa succede quando vengono schiacciati i tasti (solo se this e' in lettura di input - this.canInput)
    				if ((keys[startkey] || keys[dashkey]) && !tastoGiaSchiacciato) { //attiva la voce selezionata
    					if (this.settore == 0) { // se e' nella sezione poteri, attiva il potere selezionato e chiude il menu
    						player.activePower = this.indice;
    						if (player.activePower == 0) {
    							player.color1 = player.defaultColor1;
    							player.color2 = player.defaultColor2;
    						} else {
    							player.color1 = player.power[player.activePower - 1].color1;
    							player.color2 = player.power[player.activePower - 1].color2;
    						}
    						this.isClosing = true;
    						this.isOpen = false;
    					} else { //se e' nell'altro settore fa delle cose in base all'indice
    						if (this.indice < 4) { //hai scelto una subtank
    							if (player.life < player.lifeMax) {
    								this.usingSubtank = this.indice;
    								this.canInput = false;
    							}
    						} else {
    							switch (this.indice) {
    								case 4: //ritorna al gioco - chiude il menu
    									this.isClosing = true;
    									this.isOpen = false;
    									break;
    								case 5: //opzioni
    									objMenuOpzioni = new newMenuOpzioni(this.width, this.height, true);
    									tastoGiaSchiacciato = true;
    									gamestate = 3;
    									break;
    								case 6: //torna alla selezione del livello
    									this.tornaMenuPrecedente = true;
    									lvlNumber = 1;
    									this.isClosing = true;
    									this.isOpen = false;
    									break;
    							}
    						}
    					}
    				}
    				if (keys[jumpkey] && !tastoGiaSchiacciato) { //esci dal menu di pausa
    					this.isClosing = true;
    					this.isOpen = false;
    				}
    				if (keys[giukey] && !tastoGiaSchiacciato) {
    					if (this.settore == 0) { //se sei nella parte a sinistra
    						for (i = 1; i < 10; i++) {
    							if (levelDefeated[this.indice + i - 1]) {
    								this.indice += i;
    								break;
    							} else if (i == 9) {
    								this.indice = 0;
    								break;
    							}
    						}
    						if (this.indice == 9) {
    							this.indice = 0;
    						}
    					} else if (this.settore == 1) { //se sei nella parte a destra
    						if (this.indice < this.lastSubtankAcquired) { //se sei nella parte delle subtank-1
    							for (var k = 1; k < (4 - this.indice); k++) {
    								if (subtank[this.indice + k].acquired) {
    									this.indice += k;
    									break;
    								}
    							}
    						} else if (this.indice == this.lastSubtankAcquired && this.lastSubtankAcquired != 4) { //se hai selezionato l'ultima subtank disponibile e schiacci giu'
    							this.indice = 4;
    						} else { //se sei nella parte sotto le subtank
    							if (this.indice < 6) {
    								this.indice++;
    							}
    						}
    					}
    				}
    				if (keys[sukey] && !tastoGiaSchiacciato) {
    					if (this.settore == 0) {
    						if (this.indice == 0) {
    							this.indice = 9;
    						}
    						for (i = 1; i < this.indice + 1; i++) {
    							if (levelDefeated[this.indice - i - 1]) {
    								this.indice -= i;
    								break;
    							} else if (i == this.indice) {
    								this.indice = 0;
    								break;
    							}
    						}
    					} else if (this.settore == 1) { //se sei nella parte a destra
    						if (this.indice < 4) { //se sei nella parte delle subtank
    							if (this.indice > 0) {
    								for (var k = 1; k < this.indice + 1; k++) {
    									if (subtank[this.indice - k].acquired) {
    										this.indice -= k;
    										break;
    									}
    								}
    							}
    						} else {
    							if (this.indice > 4) { //se sei nel menu tutto ok
    								this.indice--;
    							} else { //schiacci su e ti stai spostando nelle subtank - devo vedere che io ne possegga almeno una
    								this.indice = this.lastSubtankAcquired;
    							}
    						}
    					}
    				}
    				if (keys[destrakey] && !tastoGiaSchiacciato) {
    					for (var j = 0; j < 4; j++) {
    						if (subtank[j].acquired) {
    							this.indice = j;
    							break;
    						} else {
    							this.indice = 4;
    						}
    					}
    					this.settore = 1;
    				}
    				if (keys[sinistrakey] && !tastoGiaSchiacciato) {
    					this.indice = 0;
    					this.settore = 0;
    				}
    				if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
    					tastoGiaSchiacciato = true;
    				} else {
    					tastoGiaSchiacciato = false;
    				}
    			}
    		}
    		if (this.isClosing) { //animazione di chiusura del menu + regolazione delle subtanks
    			if (this.width > 0) {
    				this.width -= this.widthMax/15;
    			}
    			if (this.height > 0) {
    				this.height -= this.widthMax/15;
    			}
    			ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
    			disegnaSchermoDiGioco(false);
    			ctx.fillStyle = "#d2d2d2";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
    			ctx.fillStyle = "#52b58b";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
    			if (this.height - 1 < 0 && this.width - 1 < 0) { //quando il menu e' tutto chiuso:
    				gamestate = -1;
    				if (this.tornaMenuPrecedente) {
					objMenuPrincipale = new newMenuPrincipale();
    					gamestate = 0;
    				}
    				var sommaSubtank = 0; //aggiusto la vita delle subtank (la metto tutta nelle prime subtank disponibili)
    				for (var j = 0; j < 4; j++) { //azzero tutte le subtank e carico tutta la vita per ridistribuirla nel prossimo for
    					if (subtank[j].acquired) {
    						sommaSubtank += subtank[j].life;
    						subtank[j].life = 0;
    					}
    				}
    				if (sommaSubtank > 0) { //ridistribuisco la vita alle subtank dalla prima all'ultima
    					for (var j = 0; j < 4; j++) {
    						if (subtank[j].life < subtank[j].lifeMax && subtank[j].acquired) {
    							if (sommaSubtank > (subtank[j].lifeMax - subtank[j].life)) {
    								sommaSubtank -= (subtank[j].lifeMax - subtank[j].life);
    								subtank[j].life = subtank[j].lifeMax;
    							} else {
    								subtank[j].life += sommaSubtank;
    								sommaSubtank = 0;
    							}
    						}
    					}
    				}
    			}
    		}
    	}
    } //fine menu di pausa       

    function newMenuCaricaCostumLevel() {
    	this.isOpen = false;
    	this.isClosing = false;
    	this.apriLivello = false;
    	this.costumLevelString = "";
    	this.width = 0;
    	this.height = 0;
    	this.widthMax = canvasWidth - 440;
    	this.heightMax = canvasHeight - 400;
    	this.indice = 0;
    	this.indiceUscita = 0;
    	this.numeroDiVoci = 4;
    	this.staCambiandoTasto = false;
    	this.drawMenu = async function () {
    		if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu
    			if (this.width < this.widthMax) {
    				this.width += 10;
    			}
    			if (this.height < this.heightMax) {
    				this.height += 15;
    			}
    			if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
    				this.isOpen = true;
    				document.getElementById("fileCaricaPartita").value = "";
    				document.getElementById("caricaPartitaDiv").style.zIndex = "10";
    				document.getElementById("fileCaricaPartita").disabled = false;
    			}
    		}
    		ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
    		ctx.fillStyle = "#d2d2d2";
    		ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
    		ctx.fillStyle = "#52b58b";
    		ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
    		if (this.isOpen) { //quando il menu e' tutto aperto
    				this.loadCostumLevel = true;
    				ctx.textAlign = "center";
    				ctx.font = "small-caps bold 25px Lucida Console"; //tipo di font per le scritte
    				disegnaTestoConBordino("load costum level", (canvasWidth / 2), ((canvasHeight / 2) + 25 - this.heightMax / 2), "#d2d2d2", "#000000");
    				for (var j = 0; j < 2; j++) { //disegno tutte le scritte
    					ctx.textAlign = "center";
    					var ydisegnata = 57 + canvasHeight / 2;
    					switch (j) { //scrive le scritte
    						case 0:
    							var xdisegnata = (canvasWidth / 2) - ((this.width / 4));
    							disegnaTestoConBordino("confirm", xdisegnata, ydisegnata, "#d2d2d2", "#000000");
    							break;
    						case 1:
    							var xdisegnata = (canvasWidth / 2) + ((this.width / 4));
    							disegnaTestoConBordino("cancel", xdisegnata, ydisegnata, "#d2d2d2", "#000000");
    							break;
    					}
    					ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
    				} { //disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
    					ctx.fillStyle = "#ffc000";
    					var xdisegnata = (canvasWidth / 2);
    					var ydisegnata = 25 + canvasHeight / 2;
					if(this.indiceUscita==0){xdisegnata-=this.width/2;}
    					ctx.fillRect(xdisegnata, ydisegnata, this.width / 2, 9);
    					ctx.fillRect(xdisegnata, ydisegnata - 9 + (this.height) / 3, this.width / 2, 9);
    					ctx.fillRect(xdisegnata, ydisegnata, 9, (this.height) / 3 - 8);
    					ctx.fillRect(xdisegnata + (this.width / 2) - 9, ydisegnata, 9, (this.height) / 3 - 8);
    				}
    				//ora gestisco gli input
    				if (keys[destrakey] && !tastoGiaSchiacciato) {
    					this.indiceUscita = 1;
    				}
    				if (keys[sinistrakey] && !tastoGiaSchiacciato) {
    					this.indiceUscita = 0;
    				}
    				if ((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
    					switch (this.indiceUscita) {
    						case 0: //conferma carica livello costum
    							this.costumLevelString = await controllaFile();
    							if (this.costumLevelString != "") {
    								chiudiInputFile();
    								this.apriLivello = true;
    								this.isClosing = true;
    								this.isOpen = false;
    							}
    							break;
    						case 1: //cancella
    							chiudiInputFile();
							this.isClosing=true;
		    					this.isOpen = false;
    							break;
    					}
    				}
    				if (keys[jumpkey] && !tastoGiaSchiacciato) { //chiude il menu
    					chiudiInputFile();
					this.isClosing=true;
    					this.isOpen = false;
    				}
    				if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
    					tastoGiaSchiacciato = true;
    				} else {
    					tastoGiaSchiacciato = false;
    				}

    				function chiudiInputFile() {
    					document.getElementById("fileCaricaPartita").value = "";
    					document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
    					document.getElementById("fileCaricaPartita").disabled = true;
    					document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas                
    				}
    			async function controllaFile() { //controlla che il file sia caricato correttamente
    				var uploadedFile = document.getElementById("fileCaricaPartita").files[0];
    				var stringaCaricaPartita = "";
    				if (uploadedFile.size > (5 * 1024 * 1024)) { //controlla la dimensione del file - non deve essere superiore a 1MB
    					objAlert = new newAlert("The file size limit is 5MB. Upload a smaller file.", gamestate);
    					gamestate = 5;
    					return false;
    				}
    				async function readFileAsText(uploadedFile) {
    					let text = await new Promise((resolve) => {
    						let fileReader = new FileReader();
    						fileReader.onload = (e) => resolve(fileReader.result);
    						fileReader.readAsText(uploadedFile);
    					});
    					return text;
    				}
    				stringaCaricaPartita = await readFileAsText(uploadedFile);
    				return stringaCaricaPartita;
    			} //fine di controllaFile()            				          	
    		} //fine di if(is.Open)          
    		if (this.isClosing) { //animazione di chiusura del menu
    			if (this.width > 0) {
    				this.width -= 30;
    			}
    			if (this.height > 0) {
    				this.height -= 30;
    			}
    			ctx.fillStyle = "#d2d2d2";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
    			ctx.fillStyle = "#52b58b";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
    			if (this.height - 1 < 0 && this.width - 1 < 0) { //quando il menu e' tutto chiuso:
    				if (this.apriLivello) {
    					if (this.costumLevelString != "") {
						lvlNumber=99999999999999; //dedicated to the costum level
						allLevelStrings[lvlNumber]=this.costumLevelString; //associate the costumlevel string to the lvlNumber, so that it can show the map
    						player = nuovoPlayer(currentPlayer);
    						stringToLevel(this.costumLevelString);
    						player.x = level.xStartingPos;
    						player.y = level.yStartingPos;
    					}
    				}
    				gamestate = -1;
    			}
    		} //fine di if(is.Closing)
    	}
    }//fine di newMenuCaricaCostumLevel();

    function newMenuOpzioni(widthPassata, heightPassata, apertoDalMenuDiPausa) {
    	this.isOpen = false;
    	this.isClosing = false;
    	this.width = widthPassata;
    	this.height = heightPassata;
    	this.widthMax = canvasWidth - 150;
    	this.heightMax = canvasHeight - 150;
    	this.indice = 0;
	this.numeroVoci=11;
    	this.contatoreAnimazione = 0;
    	this.staCambiandoTasto = false;
    	this.drawMenuOpzioni = function () {
    		if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu
    			if (this.width < this.widthMax) {
    				this.width += this.widthMax/15;
    			}
    			if (this.height < this.heightMax) {
    				this.height += this.heightMax/15;
    			}
    			if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
    				this.isOpen = true;
    			}
    		}
    		ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
    		ctx.fillStyle = "#d2d2d2";
    		ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
    		ctx.fillStyle = "#52b58b";
    		ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde

    		if (this.isOpen) { //quando il menu e' tutto aperto
    			ctx.font = "small-caps bold 23px Lucida Console";
    			ctx.textAlign = "center";
    			disegnaTestoConBordino("OPTIONS", canvasWidth / 2, 110, "#d2d2d2", "#000000"); //scrive la scritta OPTIONS al centro in alto
    			ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
    			for (i = 0; i < this.numeroVoci; i++) { //disegno tutte le scritte
    				var xdisegnata = 75;
    				var ydisegnata = (128 + (this.heightMax + 75 - 17 - 128) / this.numeroVoci * (i));
    				switch (i) { //scrive le varie impostazioni dei tasti
    					case 0:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("move up :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(sukey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 1:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("move down :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(giukey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 2:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("move left :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(sinistrakey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 3:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("move right :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(destrakey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 4:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("confirm & dash :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(dashkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 5:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("cancel & jump :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(jumpkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 6:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("shoot :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(sparokey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 7:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("previous power :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(lkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 8:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("next power :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(rkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 9:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("map & select :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(mapkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;
    					case 10:
    						ctx.textAlign = "right";
    						disegnaTestoConBordino("menu & start :   ", canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						ctx.textAlign = "left";
    						disegnaTestoConBordino("   " + tasto(startkey.toLowerCase()), canvasWidth / 2, ydisegnata + 7 + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) / 2, "#d2d2d2", "#000000");
    						break;

    					function tasto(key) {
    						if (key == " ") {
    							return "space bar"
    						}
    						return key
    					}
    				}
    			}

    			{ //disegno il quadrato intorno all'opzione selezionata - uso le {} per ridurre lo scope di xdisegnata e ydisegnata
    				ctx.fillStyle = "#ffc000";
    				var xdisegnata = 75;
    				var ydisegnata = (128 + (this.heightMax + 75 - 17 - 128) / this.numeroVoci * (this.indice));
    				ctx.fillRect(xdisegnata, ydisegnata - 2, this.width, 9);
    				ctx.fillRect(xdisegnata, ydisegnata + ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) - 5, this.width, 9);
    				ctx.fillRect(xdisegnata, ydisegnata, 9, ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) - 5);
    				ctx.fillRect(xdisegnata + this.width - 9, ydisegnata, 9, ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) - 5);
    			}

    			if (this.staCambiandoTasto) { //da qui in giu determino cosa succede in base a che tasto viene schiacciato. le due grosse distinzioni sono se staCambiandoTasto oppure se siamo nel menu e basta 
    				if (this.contatoreAnimazione < 40) { //fa l'animazione del testo che appare e disappare
    					ctx.fillStyle = "#52b58b";
    					ctx.fillRect(canvasWidth / 2, (128 + (this.heightMax + 75 - 17 - 128) / this.numeroVoci * (this.indice)) + 7, this.width / 2 - 9, ((this.heightMax + 75 - 17 - 128) / this.numeroVoci) - 12);
    					this.contatoreAnimazione++;
    				} else {
    					this.contatoreAnimazione++;
    					if (this.contatoreAnimazione > 79) {
    						this.contatoreAnimazione = 0;
    					}
    				}
    				if (ultimoTastoLetto != "") { //se viene schiacciato un tasto qualsiasi
    					switch (this.indice) {
    						case 0:
    							sukey = ultimoTastoLetto;
    							break;
    						case 1:
    							giukey = ultimoTastoLetto;
    							break;
    						case 2:
    							sinistrakey = ultimoTastoLetto;
    							break;
    						case 3:
    							destrakey = ultimoTastoLetto;
    							break;
    						case 4:
    							dashkey = ultimoTastoLetto;
    							break;
    						case 5:
    							jumpkey = ultimoTastoLetto;
    							break;
    						case 6:
    							sparokey = ultimoTastoLetto;
    							break;
    						case 7:
    							lkey = ultimoTastoLetto;
    							break;
    						case 8:
    							rkey = ultimoTastoLetto;
    							break;
    						case 9:
    							mapkey = ultimoTastoLetto;
    							break;
						case 10:
    							startkey = ultimoTastoLetto;
    							break;
    					}
    					this.staCambiandoTasto = false;
    				}
    			} else {
    				if (keys[sukey] && !tastoGiaSchiacciato) {
    					if (this.indice > 0) {
    						this.indice--;
    					} else {
    						this.indice = this.numeroVoci-1;
    					}
    				}
    				if (keys[giukey] && !tastoGiaSchiacciato) {
    					if (this.indice < this.numeroVoci-1) {
    						this.indice++;
    					} else {
    						this.indice = 0;
    					}
    				}
    				if ((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
    					ultimoTastoLetto = "";
    					this.staCambiandoTasto = true;
    				}
    				if (keys[jumpkey] && !tastoGiaSchiacciato) { //chiude il menu
    					this.isOpen = false;
    					this.isClosing = true;
    				}
    				if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
    					tastoGiaSchiacciato = true;
    				} else {
    					tastoGiaSchiacciato = false;
    				}
    			}
    		} //fine di if(is.Open)

    		if (this.isClosing) { //animazione di chiusura del menu
    			if (this.width > widthPassata) {
    				this.width -= this.widthMax/15;
    			}
    			if (this.height > heightPassata) {
    				this.height -= this.heightMax/15;
    			}
    			ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
    			if (!apertoDalMenuDiPausa) {
    				objMenuPrincipale.drawMenuPrincipale(false);
    			}
    			ctx.fillStyle = "#d2d2d2";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
    			ctx.fillStyle = "#52b58b";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
    			if (this.height - 1 < heightPassata && this.width - 1 < widthPassata) { //quando il menu e' tutto chiuso:
    				if (apertoDalMenuDiPausa) {
    					gamestate = 2;
    				} else { 
    					gamestate = 0;
    				}
    			}
    		} //fine di if(is.Closing)
    	}
    }//fine di menuOpzioni

    function newMenuCaricaPartita() {
    	this.isOpen = false;
    	this.isClosing = false;
    	this.indexAlterato = false;
    	this.fileLetto = false;
    	this.width = 0;
    	this.height = 0;
    	this.widthMax = canvasWidth - 450;
    	this.heightMax = canvasHeight - 425;
    	this.indice = 0;
    	this.daPulire = false;
    	this.numeroDiVoci = 1;
    	this.drawMenu = async function () { //asincrono perche' se viene caricata la partita bisogna aspettare che legga il file
    		if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu
    			if (this.width < this.widthMax) {
    				this.width += 10;
    			}
    			if (this.height < this.heightMax) {
    				this.height += 15;
    			}
    			if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
    				this.isOpen = true;
    			}
    		}
    		if (this.daPulire) {
    			objMenuPrincipale.drawMenuPrincipale(false);
    			document.getElementById("caricaPartitaDiv").style.zIndex = "10";
    			this.daPulire = false;
    		}
    		ctx.clearRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
    		ctx.fillStyle = "#d2d2d2";
    		ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
    		ctx.fillStyle = "#52b58b";
    		ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde

    		if (this.isOpen) { //quando il menu e' tutto aperto
    			if (!this.indexAlterato) {
    				document.getElementById("caricaPartitaDiv").style.zIndex = "10";
    				document.getElementById("fileCaricaPartita").disabled = false;
    				this.indexAlterato = true;
    			}
    			ctx.font = "small-caps bold 25px Lucida Console"; //tipo di font per le scritte
    			{ //disegno la scritta - {} per diminuire lo scope di ydisegnata
    				var ydisegnata = ((canvasHeight / 2) - (this.height / 2)) + 30;
    				ctx.textAlign = "center";
    				disegnaTestoConBordino("upload save file", canvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
    				ctx.font = "small-caps bold 20px Lucida Console";
    				ydisegnata = ((canvasHeight / 2) + (this.height / 2)) - 30;
    				disegnaTestoConBordino((dashkey + " to confirm"), canvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
    				if (jumpkey == " ") {
    					disegnaTestoConBordino((jumpkey + "spacebar to cancel"), canvasWidth / 2, ydisegnata + 20, "#d2d2d2", "#000000");
    				} else {
    					disegnaTestoConBordino((jumpkey + " to cancel"), canvasWidth / 2, ydisegnata + 20, "#d2d2d2", "#000000");
    				}
    				ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
    			}
    			//ora gestisco gli input
    			if ((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) { //conferma il caricamento del file
    				this.daPulire = true;
    				document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
    				this.fileLetto = await controllaFile();
    				if (this.fileLetto) {
    					this.isOpen = false;
    					this.daPulire = false;
    					this.isClosing = true;
    				}
    			}
    			if (keys[jumpkey] && !tastoGiaSchiacciato) { //chiude il menu
    				this.isOpen = false;
    				this.isClosing = true;
    			}
    			if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
    				tastoGiaSchiacciato = true;
    			} else {
    				tastoGiaSchiacciato = false;
    			}
    		} //fine di if(is.Open)

    		if (this.isClosing) { //animazione di chiusura del menu
    			if (this.indexAlterato) { //disattiva il tasto "sfoglia file" e riporta il focus sul canvas
    				document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
    				document.getElementById("fileCaricaPartita").disabled = true; //questo comando disattiva il focus sul canvas, devo riattivare il focus se no non legge piu i tasti
    				document.getElementById('canvasDivId').focus(); //riporta il focus sul canvas
    				this.indexAlterato = false;
    			}
    			objMenuPrincipale.drawMenuPrincipale(false); //pulisce lo schermo disegnando lo sfondo (menu principale)
    			if (this.width > 0) {
    				this.width -= 20;
    			}
    			if (this.height > 0) {
    				this.height -= 20;
    			}
    			ctx.fillStyle = "#d2d2d2";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
    			ctx.fillStyle = "#52b58b";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
    			if (this.height - 1 < 0 && this.width - 1 < 0) { //quando il menu e' tutto chiuso:
    				nelMenuCaricaPartita = false;
    				if (this.fileLetto) {
    					//gamestate = 1; //stage select
					CaricaPartita(stringaSalvataggio);
    				} else {
    					gamestate = 0;
    					objMenuPrincipale.drawMenuPrincipale(false);
    				}
    			}
    		} //fine di if(is.Closing)

    		async function controllaFile() { //controlla che il file sia caricato correttamente
    			var uploadedFile = document.getElementById("fileCaricaPartita").files[0];
    			var stringaCaricaPartita = "";
    			if (uploadedFile.size > (512)) { //controlla la dimensione del file - non deve essere superiore a 512 Byte
    				objAlert = new newAlert("The file size limit is 512Byte (half a kB). Upload a smaller file.", gamestate);
    				gamestate = 5;
    				return false;
    			}
    			async function readFileAsText(uploadedFile) {
    				let text = await new Promise((resolve) => {
    					let fileReader = new FileReader();
    					fileReader.onload = (e) => resolve(fileReader.result);
    					fileReader.readAsText(uploadedFile);
    				});
    				return text;
    			}
    			stringaCaricaPartita = await readFileAsText(uploadedFile);
    			return caricaDatiSalvataggio(stringaCaricaPartita); //in scripts/modules/savegame.mjs
    		} //fine di controllaFile()                
    	} //fine di drawMenu()               
    } //fine di menuCaricaPartita

function newMenuMappa(previousGameStatePassato) {//map menu
    	this.width = 0;
	this.previousGameState=previousGameStatePassato;
    	this.height = 0;
	this.mapCameraMovement={"x":0,"y":0};
	this.mapCameraSpeed=2;
    	this.widthMax = canvasWidth - 30;
    	this.heightMax = canvasHeight - 30;
	this.currentLocation = level.name;
	this.requestNewRender=true;
	this.zoomMultiplier = 2;
	this.startingConfig={"lvlNumber":lvlNumber, "blockDimension":blockDimension, "player":player, "level":level, "entity":entity};
    	this.isOpen = false;
    	this.isClosing = false;
    	this.canInput = true;
    	this.selfDraw = function () {
    		ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
    		if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu + lettura subtank acquisite
    			if (this.width < this.widthMax) {
    				this.width += this.widthMax/10;
    			}
    			if (this.height < this.heightMax) {
    				this.height += this.heightMax/10;
    			}
    			if (this.height > this.heightMax - 1 && this.width > this.widthMax - 1) { //quando il menu e' tutto aperto:
    				this.isOpen = true;
    			}
    		}
		if(this.requestNewRender){ //ridisegna lo sfondo solo se richiesto
	    		ctx.fillStyle = "#d2d2d2";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
	    		ctx.fillStyle = "#52b58b";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
		}
    		if (this.isOpen) { //qui dentro devo mostrare il testo del menu e gestire cosa succede quando schiaccio i tasti
			if(this.requestNewRender){ //disegna mappa solo se necessario (se aggiornato input)
				displayFullMap(this.mapCameraMovement, this.zoomMultiplier); //from script/modules/mapFunction.mjs
				if(this.currentLocation!=""){
					ctx.textAlign = "right"; ctx.font = "small-caps bold 12px Lucida Console"; //tipo di font per le scritte
					disegnaTestoConBordino("currently at", canvasWidth-17, canvasHeight-28, "#e2e2e2", "#000000");
					disegnaTestoConBordino(this.currentLocation, canvasWidth-17, canvasHeight-18, "#e2e2e2", "#000000");
				}
				ctx.textAlign = "center"; ctx.font = "small-caps bold 20px Lucida Console"; //tipo di font per le scritte
	    			disegnaTestoConBordino(("MAP"), canvasWidth/2, 32, "#d2d2d2", "#000000");
				ctx.font = "small-caps bold 15px Lucida Console"; //tipo di font per le scritte
	    			disegnaTestoConBordino((startkey.toLowerCase()+": center map"), canvasWidth/2, canvasHeight-29, "#d2d2d2", "#000000");
	    			disegnaTestoConBordino((mapkey.toLowerCase()+": exit"), canvasWidth/2, canvasHeight-18, "#d2d2d2", "#000000");
				ctx.textAlign = "left"; ctx.font = "small-caps bold 12px Lucida Console";
	    			disegnaTestoConBordino((lkey.toLowerCase()+": zoom-"), 17, canvasHeight-41, "#e2e2e2", "#000000");
	    			disegnaTestoConBordino((rkey.toLowerCase()+": zoom+"), 17, canvasHeight-31, "#e2e2e2", "#000000");
				ctx.font = "small-caps bold 15px Lucida Console";
    				disegnaTestoConBordino(("ZOOM:"+this.zoomMultiplier+"x"), 17, canvasHeight-18, "#d2d2d2", "#000000");
				this.requestNewRender=false;
			}
			this.calcolaInput();
    		}//fine di if this.isOpen()
    		if (this.isClosing) { //animazione di chiusura del menu + regolazione delle subtanks
    			if (this.width > 0) {
    				this.width -= this.widthMax/10 ;
    			}
    			if (this.height > 0) {
    				this.height -= this.heightMax/10;
    			}
    			disegnaSchermoDiGioco(false);
    			ctx.fillStyle = "#d2d2d2";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
    			ctx.fillStyle = "#52b58b";
    			ctx.fillRect((canvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
    			if (this.height - 1 < 0 && this.width - 1 < 0) { //quando il menu e' tutto chiuso:
    				gamestate = this.previousGameState;
    			}
    		}
    	}//fine di selfDraw()

	this.calcolaInput = function(){
		var currentSpeed=this.mapCameraSpeed;
		if(keys[dashkey]){currentSpeed=this.mapCameraSpeed*3;}
		if(keys[sukey])	{ this.mapCameraMovement.y+=currentSpeed;}
		if(keys[giukey]){ this.mapCameraMovement.y-=currentSpeed;}
		if(keys[sinistrakey]){this.mapCameraMovement.x+=currentSpeed;}
		if(keys[destrakey]) { this.mapCameraMovement.x-=currentSpeed;}
		if(keys[lkey] && !tastoGiaSchiacciato){changeZoom(this, false);}
		if(keys[rkey] && !tastoGiaSchiacciato){changeZoom(this, true);}
		if(keys[startkey] && !tastoGiaSchiacciato){this.mapCameraMovement.x=0; this.mapCameraMovement.y=0;}
 		if ((keys[jumpkey] || keys[mapkey]) && !tastoGiaSchiacciato) { //chiude il menu
 			this.isOpen = false;
			lvlNumber=this.startingConfig.lvlNumber;
			blockDimension=this.startingConfig.blockDimension;
			level=this.startingConfig.level;
			player=this.startingConfig.player;
			entity=this.startingConfig.entity;
    			this.isClosing = true;
    		}
    		if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[lkey] || keys[rkey] || keys[jumpkey] || keys[mapkey]) {
    			tastoGiaSchiacciato = true;
			this.requestNewRender=true;
    		} else {
    			tastoGiaSchiacciato = false;
    		}
		
		function changeZoom(obj, zoomAugment){
			if(zoomAugment){//augment
				if(obj.zoomMultiplier<8){
					obj.zoomMultiplier=obj.zoomMultiplier*2;
					obj.mapCameraMovement.x=obj.mapCameraMovement.x*2;
					obj.mapCameraMovement.y=obj.mapCameraMovement.y*2;
				}
			}else{ 	 //diminish
				if(obj.zoomMultiplier>1){
					obj.zoomMultiplier=obj.zoomMultiplier/2;
					obj.mapCameraMovement.x=obj.mapCameraMovement.x/2;
					obj.mapCameraMovement.y=obj.mapCameraMovement.y/2;
				}
			}
		}//fine di changeZoom()
	}//fine di calcolaInput()
} //fine menu Mappa   
