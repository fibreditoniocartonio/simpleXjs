      function newMenuCaricaPartita() { //carica livello
      	this.isOpen = false;
      	this.isClosing = false;
      	this.indexAlterato = false;
      	this.premutoConferma = false;
      	this.premutoCancella = false;
      	this.fileLetto = false;
      	this.width = 0;
      	this.height = 0;
      	this.widthMax = realCanvasWidth / 3;
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
      		ctx.clearRect((realCanvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //pulisci la parte dove viene mostrato il menu
      		ctx.fillStyle = "#d2d2d2";
      		ctx.fillRect((realCanvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
      		ctx.fillStyle = "#52b58b";
      		ctx.fillRect((realCanvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde

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
      				disegnaTestoConBordino("upload level file", realCanvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
      				ctx.font = "small-caps bold 20px Lucida Console";
      				ydisegnata = ((canvasHeight / 2) + (this.height / 2)) - 30;
      				disegnaTestoConBordino((dashkey + " to confirm"), realCanvasWidth / 2, ydisegnata, "#d2d2d2", "#000000");
      				if (jumpkey == " ") {
      					disegnaTestoConBordino(("spacebar to cancel"), realCanvasWidth / 2, ydisegnata + 20, "#d2d2d2", "#000000");
      				} else {
      					disegnaTestoConBordino((jumpkey + " to cancel"), realCanvasWidth / 2, ydisegnata + 20, "#d2d2d2", "#000000");
      				}
      				ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
      			}
      			//mouse input 
      			if (checkMouseBox((-3 + realCanvasWidth / 2 - ctx.measureText((dashkey + " to confirm")).width / 2), 2 + (ydisegnata - ctx.measureText("O").width), 6 + (ctx.measureText((dashkey + " to confirm")).width), 1 + (ctx.measureText("O").width))) {
      				ctx.strokeStyle = "#000000";
      				ctx.strokeRect((-3 + realCanvasWidth / 2 - ctx.measureText((dashkey + " to confirm")).width / 2), 2 + (ydisegnata - ctx.measureText("O").width), 6 + (ctx.measureText((dashkey + " to confirm")).width), 1 + (ctx.measureText("O").width));
      				if (mouseClick) {
      					this.premutoConferma = true;
      				}
      			}
      			if (checkMouseBox((-3 + realCanvasWidth / 2 - ctx.measureText((jumpkey + " to cancel")).width / 2), 2 + (ydisegnata + 20 - ctx.measureText("O").width), 6 + (ctx.measureText((jumpkey + " to cancel")).width), 1 + (ctx.measureText("O").width))) {
      				ctx.strokeStyle = "#000000";
      				ctx.strokeRect((-3 + realCanvasWidth / 2 - ctx.measureText((jumpkey + " to cancel")).width / 2), 2 + (ydisegnata + 20 - ctx.measureText("O").width), 6 + (ctx.measureText((jumpkey + " to cancel")).width), 1 + (ctx.measureText("O").width));
      				if (mouseClick) {
      					this.premutoCancella = true;
      				}
      			}
      			//tasti
      			if ((keys[dashkey] || keys[startkey]) && !tastoGiaSchiacciato) {
      				this.premutoConferma = true;
      			}
      			if (keys[jumpkey] && !tastoGiaSchiacciato) {
      				this.premutoCancella = true;
      			}
      			if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
      				tastoGiaSchiacciato = true;
      			} else {
      				tastoGiaSchiacciato = false;
      			}
      			if (this.premutoConferma) {
      				this.premutoConferma = false;
      				this.daPulire = true;
      				document.getElementById("caricaPartitaDiv").style.zIndex = "-1";
      				this.fileLetto = await controllaFile();
      				if (this.fileLetto) {
      					this.isOpen = false;
      					this.daPulire = false;
      					this.isClosing = true;
      					document.getElementById("fileCaricaPartita").value = ""; //svuota il robino dell'input del file di html
      				}
      			}
      			if (this.premutoCancella) {
      				this.premutoCancella = false;
      				this.isOpen = false;
      				this.isClosing = true;
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
      			ctx.fillRect((realCanvasWidth / 2) - this.width / 2 - 15, (canvasHeight / 2) - this.height / 2 - 15, this.width + 30, this.height + 30); //disegna il bordo grigio 
      			ctx.fillStyle = "#52b58b";
      			ctx.fillRect((realCanvasWidth / 2) - this.width / 2, (canvasHeight / 2) - this.height / 2, this.width, this.height); //disegna lo sfondo verde
      			if (this.height - 1 < 0 && this.width - 1 < 0) { //quando il menu e' tutto chiuso:
      				nelMenuCaricaPartita = false;
      				if (this.fileLetto) {
      					stringaLivello = this.fileLetto;
      					nuovoLivello();
      					gamestate = -1;
      				} else {
      					gamestate = 0;
      					objMenuPrincipale.drawMenuPrincipale(false);
      				}
      			}
      		} //fine di if(is.Closing)

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
      			stringaLivelloLetta = await readFileAsText(uploadedFile);
      			return stringaLivelloLetta;
      		} //fine di controllaFile()                
      	} //fine di drawMenu()               
      } //fine di menuCaricaPartita

      function newMenuPrincipale() {
      	this.width = realCanvasWidth;
      	this.height = canvasHeight;
      	this.indice = 0;
      	this.isClosing = false;
      	this.sceltaFatta = false;
      	this.closingIndex = 0;
      	this.isGoingToStageSelection = false;
      	this.drawMenuPrincipale = function (canInput) {
      		ctx.clearRect(0, 0, realCanvasWidth, canvasHeight); //pulisce tutto
      		ctx.fillStyle = "#020219";
      		ctx.fillRect(0, 0, realCanvasWidth + 1, canvasHeightDefault + 1); //sfondo nero
      		ctx.textAlign = "right";
      		ctx.font = "small-caps bold 15px Lucida Console";
      		disegnaTestoConBordino("by lordf", realCanvasWidth - 3, canvasHeight - 2, "#d2d2d2bb", "#020219");
      		ctx.textAlign = "left";
      		var spostaX = ctx.measureText("simple").width / 2;
      		disegnaTestoConBordino(versioneDiGioco, 3, canvasHeight - 2, "#d2d2d2bb", "#020219");
      		ctx.font = "small-caps bold oblique 250px Lucida Console";
      		disegnaTestoConBordino("X", spostaX + realCanvasWidth / 2, 243, "#ff9200", "#ffd600");
      		ctx.font = "small-caps bold oblique 125px Lucida Console";
      		disegnaTestoConBordino("simple", spostaX + realCanvasWidth / 2 - (ctx.measureText("simple").width), 200, "#0001cb", "#02b0ef");
      		ctx.font = "small-caps bold oblique 40px Lucida Console";
      		disegnaTestoConBordino("level editor", spostaX + realCanvasWidth / 2 - (ctx.measureText("level editor ").width), 243, "#ff9200", "#ffd600");
      		ctx.font = "small-caps bold oblique 75px Lucida Console";
      		disegnaTestoConBordino("js", 161 + spostaX + realCanvasWidth / 2, 245, "#0001cb", "#02b0ef");
      		ctx.font = "small-caps bold 30px Lucida Console";
      		ctx.textAlign = "center";
      		if (this.indice == 0) {
      			disegnaTestoConBordino("new level", realCanvasWidth / 2, 400, "#ff9200", "#f9c065");
      		} else {
      			disegnaTestoConBordino("new level", realCanvasWidth / 2, 400, "#0001cb", "#02b0ef");
      		}
      		if (this.indice == 1) {
      			disegnaTestoConBordino("load level", realCanvasWidth / 2, 450, "#ff9200", "#f9c065");
      		} else {
      			disegnaTestoConBordino("load level", realCanvasWidth / 2, 450, "#0001cb", "#02b0ef");
      		}
      		if (canInput && !this.isClosing) { //input dei tasti                           
      			//mouse  
      			if (checkMouseBox((realCanvasWidth / 2 - ctx.measureText("new level").width / 2), (400 - ctx.measureText("O").width), (ctx.measureText("new level").width), (ctx.measureText("O").width))) {
      				this.indice = 0;
      				if (mouseClick) {
      					this.sceltaFatta = true;
      				}
      			}
      			if (checkMouseBox((realCanvasWidth / 2 - ctx.measureText("load level").width / 2), (450 - ctx.measureText("O").width), (ctx.measureText("load level").width), (ctx.measureText("O").width))) {
      				this.indice = 1;
      				if (mouseClick) {
      					this.sceltaFatta = true;
      				}
      			}
      			//tasti
      			if (keys[sukey] && !tastoGiaSchiacciato) {
      				if (this.indice > 0) {
      					this.indice--;
      				} else {
      					this.indice = 1;
      				}
      			}
      			if (keys[giukey] && !tastoGiaSchiacciato) {
      				if (this.indice < 1) {
      					this.indice++;
      				} else {
      					this.indice = 0;
      				}
      			}
      			if ((keys[startkey] || keys[dashkey]) && !tastoGiaSchiacciato) {
      				this.sceltaFatta = true;
      			}
      			//tasto conferma schiacciato/mouseclick
      			if (this.sceltaFatta) {
      				this.sceltaFatta = false;
      				switch (this.indice) {
      					case 0: //nuovo livello 
      						this.isClosing = true;
      						break;
      					case 1: //carica livello da file
      						objMenuCaricaPartita = new newMenuCaricaPartita();
      						gamestate = 6;
      						break;
      				}
      			}
      			//nessun tasto schiacciato                                          
      			if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
      				tastoGiaSchiacciato = true;
      			} else {
      				tastoGiaSchiacciato = false;
      			}
      		}
      		if (this.isClosing) { //animazione di chiusura del menu
      			ctx.fillStyle = "#000000";
      			this.closingIndex += 13;
      			ctx.fillRect(0, 0, realCanvasWidth, this.closingIndex);
      			ctx.fillRect(0, canvasHeight - this.closingIndex, realCanvasWidth, this.closingIndex);
      			ctx.fillRect(0, 0, this.closingIndex, canvasHeight);
      			ctx.fillRect(realCanvasWidth - this.closingIndex, 0, realCanvasWidth - this.closingIndex, canvasHeight);
      			if (this.closingIndex > ((realCanvasWidth / 2) - 1)) { //quando e' tutto chiuso
      				ctx.textAlign = "left"; // se no si bugga della roba
      				stringaLivello = stringaLivelloDefault;
      				nuovoLivello();
      				gamestate = -1;
      			}
      		}
      	}
      }
