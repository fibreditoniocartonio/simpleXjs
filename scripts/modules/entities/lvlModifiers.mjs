function newChangeLevelArrow(direzionePassata) { //cambia livello - unicode: →←↓↑
	this.life = 9999999999;
	this.letter= direzionePassata;
      	this.type = "level modifier";
      	this.name = "change level "+this.letter;
	this.deltaLevelNumber=calcolaDeltaLN(direzionePassata);
	this.oppositeDirection=calcolaOppositeDirection(direzionePassata);
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
      	this.width = blockDimension;
      	this.height = blockDimension;
      	this.color1 = '#003ef0';
      	this.color2 = '#ffc000';
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
      		if(levelEditor || debugMode){
			ctx.textAlign = "center"; ctx.font = "small-caps bold "+blockDimension+"px Lucida Console";
			ctx.fillStyle=this.color1; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
			disegnaTestoConBordino(this.letter, xdisegnata + (this.width / 2), (ydisegnata + (this.height-4)/2 + ctx.measureText("O").width/2), this.color2, this.color1);
			ctx.textAlign = "left";
		}
      	} //fine di selfDraw
      	this.physics = async function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (collisionBetween(this, player)) { //quando il player lo raccoglie
			let playerSpawn=this.oppositeDirection;
			lvlNumber+=this.deltaLevelNumber;
			if(player.activeShot){player.activeShot=0;} //reset player shot otherwise the player will not be able to shoot anymore
			leggiLivelloDaFile();
			for(let i=0; i<entity.length; i++){
				if(entity[i].letter==playerSpawn){
					switch(playerSpawn){
						case "→": player.x=entity[i].x-blockDimension/3-player.width; player.y=entity[i].y; break;
						case "←": player.x=entity[i].x+blockDimension+blockDimension/3; player.y=entity[i].y; break;
						case "↓": player.x=entity[i].x; player.y=entity[i].y-blockDimension-player.height; break;
						case "↑": player.x=entity[i].x; player.y=entity[i].y+blockDimension/3+blockDimension; break;
					}
				}
			}
      		}
      	} //fine di physics
	function calcolaDeltaLN(direzione){
		switch(direzione){
			case "→": return 1 
			case "←": return -1
			case "↓": return 10000
			case "↑": return -10000
		}
	}	
	function calcolaOppositeDirection(direzione){
		switch(direzione){
			case "→": return "←" 
			case "←": return "→"
			case "↓": return "↑"
			case "↑": return "↓"
		}
	}
}

function newDisableChangeLevelArrows(blockDimensionPassata) { //disable all the change level arrows
	this.life = 9999999999;
	this.letter= "⊘";
      	this.type = "level modifier";
      	this.name = "changeroom disabler";
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
      	this.width = blockDimensionPassata;
      	this.height = blockDimensionPassata;
      	this.color1 = '#ff0000';
      	this.color2 = '#ffffff';
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
      		if(levelEditor || debugMode){
			ctx.textAlign = "center"; ctx.font = "small-caps bold "+blockDimension+"px Lucida Console";
			disegnaTestoConBordino(this.letter, xdisegnata + (this.width / 2), (ydisegnata + (this.height-4)/2 + ctx.measureText("O").width/2), this.color2, this.color1);
			ctx.textAlign = "left";
		}
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		for(k=0; k<entity.length; k++){
			if(entity[k].letter=="→" || entity[k].letter=="←" || entity[k].letter=="↓" || entity[k].letter=="↑"){
				entity[k].life=-1; //disable the arrows that permit to change level
			}
		}
		this.life=-1; //suicide after killing all the arrows
      	} //fine di physics
}

function newDisableSquareRoomScrolling(blockDimensionPassata) { //disable room scrolling for screenfitting-sized room (mainly for boss rooms)
	this.life = 9999999999;
	this.letter= "↹";
      	this.type = "level modifier";
      	this.name = "disable scrolling for square-rooms";
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
      	this.width = blockDimensionPassata;
      	this.height = blockDimensionPassata;
      	this.color1 = '#ff0000';
      	this.color2 = '#ffffff';
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
      		if(levelEditor || debugMode){
			ctx.textAlign = "center"; ctx.font = "small-caps bold "+blockDimension+"px Lucida Console";
			disegnaTestoConBordino(this.letter, xdisegnata + (this.width / 2), (ydisegnata + (this.height-4)/2 + ctx.measureText("O").width/2), this.color2, this.color1);
			ctx.textAlign = "left";
		}
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		level.maxWidth=canvas.width;
		level.maxHeight=canvas.height;
		this.life=-1; //suicide after being executed
      	} //fine di physics
}

function newExitLevelPickup(blockDimensionPassata) { //termina il livello e torna all'ultimo salvataggio (da usare nei costum level)
	this.life = 9999999999;
	this.letter= "⟑";
      	this.type = "level modifier";
      	this.name = "exit level";
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
	this.loadGame=false;
      	this.width = blockDimensionPassata;
      	this.height = blockDimensionPassata;
      	this.color1 = '#00ee00';
      	this.color2 = '#232323';
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
			ctx.fillStyle=this.color1; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height);
			ctx.textAlign = "center"; ctx.font = "small-caps bold "+blockDimension/2+"px Lucida Console";
			disegnaTestoConBordino("exit", xdisegnata + (this.width / 2), (ydisegnata + (this.height-4)/2 + ctx.measureText("O").width/2), this.color1, this.color2);
			ctx.textAlign = "left";
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.loadGame){
			CaricaPartita(stringaSalvataggio);
		}else{
      			if (collisionBetween(this, player)) { //quando il player lo raccoglie
			      	objAlert = new newAlert("congrats, level ended", gamestate, 45);
      				gamestate = 5;
				this.loadGame=true;
   	   		}
		}
      	} //fine di physics
}

function newSaveGamePickup(blockDimensionPassata) { //blocco che salva la partita e scarica il file di salvataggio
	this.life = 9999999999;
	this.letter= "ṧ";
      	this.type = "level modifier";
      	this.name = "save game";
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
      	this.width = blockDimensionPassata*2;
      	this.height = blockDimensionPassata*2;
      	this.color1 = '#ee0000';
      	this.color2 = '#000000';
	this.color3 = "#ffffff";
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
			ctx.fillStyle=this.color2; ctx.fillRect(xdisegnata-1, ydisegnata-1, this.width+2, this.height+2);
			ctx.fillStyle=this.color1; ctx.fillRect(xdisegnata+1, ydisegnata+1, this.width-2, this.height-2);
			ctx.textAlign = "center"; ctx.font = "small-caps bold "+blockDimension+"px Lucida Console";
			disegnaTestoConBordino("save", xdisegnata + (this.width / 2), (ydisegnata + (this.height-4)/4 + ctx.measureText("O").width/2), this.color3, this.color2);
			ctx.font = "small-caps bold "+(blockDimension-5)+"px Lucida Console";
			disegnaTestoConBordino("game", xdisegnata + (this.width / 2), (ydisegnata + 3*(this.height-4)/4 + ctx.measureText("O").width/2), this.color3, this.color2);
			ctx.textAlign = "left";
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if (collisionBetween(this, player)) { //quando il player lo raccoglie
			//save game
			SalvaPartita();
			//refill player's life and subweapon
			player.life=player.lifeMax;
			for(var i=0; i<8; i++){player.power[i].usage=player.power[i].usageMax;}
			//show alert
		      	objAlert = new newAlert("save file downloaded.", gamestate, 45);
      			gamestate = 5;
			this.life=-1;
      		}
      	} //fine di physics
}

function newSwitchToNextPlayableCharacterBlock(blockDimensionPassata) { //blocco che cambia il player nel successivo personaggio giocabile
	this.life = 9999999999;
	this.letter= "↺";
      	this.type = "level modifier";
      	this.name = "switch player";
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
	this.timer=0;
      	this.width = blockDimensionPassata*2;
      	this.height = blockDimensionPassata*2;
      	this.color1 = '#00eeee';
      	this.color2 = '#000000';
	this.color3 = "#ffffff";
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
		if(this.timer==0){		
			ctx.fillStyle=this.color2; ctx.fillRect(xdisegnata-1, ydisegnata-1, this.width+2, this.height+2);
			ctx.fillStyle=this.color1; ctx.fillRect(xdisegnata+1, ydisegnata+1, this.width-2, this.height-2);
			ctx.textAlign = "center"; ctx.font = "small-caps bold "+2*blockDimension/3+"px Lucida Console";
			disegnaTestoConBordino("switch", xdisegnata + (this.width / 2), (ydisegnata + (this.height-4)/4 + ctx.measureText("O").width/2), this.color3, this.color2);
			disegnaTestoConBordino("player", xdisegnata + (this.width / 2), (ydisegnata + 3*(this.height-4)/4 + ctx.measureText("O").width/2), this.color3, this.color2);
			ctx.textAlign = "left";
		}
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if(this.timer==0){
			if (collisionBetween(this, player)) { //quando il player lo raccoglie
				this.timer=120;
				switchToNextPlayableCharacter();
      			}
		}else{
			this.timer--;
		}
      	} //fine di physics
}

function newLoadCostumLevelBlock(blockDimensionPassata) { //blocco che cambia il player nel successivo personaggio giocabile
	this.life = 9999999999;
	this.letter= "@";
      	this.type = "level modifier";
      	this.name = "load costum level";
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
	this.timer=0;
      	this.width = blockDimensionPassata*2;
      	this.height = blockDimensionPassata*2;
      	this.color1 = '#ffbb00';
      	this.color2 = '#000000';
	this.color3 = "#ffffff";
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
		if(this.timer==0){
			ctx.fillStyle=this.color2; ctx.fillRect(xdisegnata-1, ydisegnata-1, this.width+2, this.height+2);
			ctx.fillStyle=this.color1; ctx.fillRect(xdisegnata+1, ydisegnata+1, this.width-2, this.height-2);
			ctx.textAlign = "center"; ctx.font = "small-caps bold "+(2*blockDimension/3 - 3)+"px Lucida Console";
			disegnaTestoConBordino("load", xdisegnata + (this.width / 2), (ydisegnata + (this.height-4)/6 + ctx.measureText("O").width/2), this.color3, this.color2);
			disegnaTestoConBordino("costum", xdisegnata + (this.width / 2), (ydisegnata + 3*(this.height-4)/6 + ctx.measureText("O").width/2), this.color3, this.color2);
			disegnaTestoConBordino("level", xdisegnata + (this.width / 2), (ydisegnata + 5*(this.height-4)/6 + ctx.measureText("O").width/2), this.color3, this.color2);
			ctx.textAlign = "left";
		}
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
      		if(this.timer==0){
			if (collisionBetween(this, player)) { //quando il player lo raccoglie
				this.timer=120;
    				objMenuOpzioniStageSelect = new newMenuCaricaCostumLevel();
		    		tastogiaschiacciato = true;
    				gamestate = 4;
      			}
		}else{
			this.timer--;
		}
      	} //fine di physics
}

function newShowLevelName() { //mostra il nome del livello su schermo (non inseribile con l'editor xke automatico)
	this.life = 120;
      	this.type = "level modifier";
      	this.name = "show level.name";
      	this.damage = 0;
      	this.x = 1;
      	this.y = 1;
      	this.width = 1;
      	this.height = 1;
      	this.color1 = '#000000';
      	this.color2 = '#a9a9a9';
      	this.canSelfDraw = true;
      	this.hasPhysics = true;
      	this.selfDraw = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) { //funzione per disegnare l'entita
		ctx.textAlign = "left"; ctx.font = "small-caps bold 15px Lucida Console";
		disegnaTestoConBordino(level.name, 5, canvasHeight-5, this.color1, this.color2);
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		this.life--;
      	} //fine di physics
}
