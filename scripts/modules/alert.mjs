      function newAlert(stringaDiTesto, gameStatePrecedente, waitTime) {
      	this.isOpen = false;
      	this.text = stringaDiTesto;
      	this.width = 0;
      	this.height = 0;
	this.timer = 0;
	if(waitTime){this.timer = waitTime;}
      	this.prevGameState = gameStatePrecedente;
      	ctx.font = "small-caps bold 16px Lucida Console"; //tipo di font per le scritte
      	this.widthMax = ctx.measureText(stringaDiTesto + "aa").width;
      	this.heightMax = ctx.measureText("O").width * 2;
      	this.drawMenu = function () {
      		if (!this.isOpen && !this.isClosing) { //animazione di apertura del menu
      			if (this.width < this.widthMax) {
      				this.width += (this.widthMax / 20);
      			} //always 20 frames to open, no matter how long the text is
      			if (this.height < this.heightMax) {
      				this.height += 15;
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
      			ctx.font = "small-caps bold 16px Lucida Console"; //tipo di font per le scritte
      			var textHeight = ctx.measureText("O").width; //dato che la O normalmente e' alta quanto larga (font monospace) imposto la larghezza di O come altezza approssimativa del testo
      			ctx.textAlign = "center";
      			disegnaTestoConBordino(this.text, canvasWidth / 2, canvasHeight / 2 + textHeight / 2, "#d2d2d2", "#000000");
      			ctx.textAlign = "left"; //lo reimposto left se no si bugga tutto
      			//ora gestisco gli input
			if(this.timer==0){
	      			if (keys[startkey] || keys[sukey] || keys[giukey] || keys[sinistrakey] || keys[destrakey] || keys[dashkey] || keys[jumpkey]) {
      					if (!tastoGiaSchiacciato) {
      						tastoGiaSchiacciato = true;
      						gamestate = this.prevGameState;
      					}
      				} else {
      					tastoGiaSchiacciato = false;
      				}
			}else{
				this.timer--;
			}
      		} //fine di if(is.Open)           
      	}
      }
