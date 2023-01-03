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
			leggiLivelloDaFile();
			//var mostraNome=0;
			for(let i=0; i<entity.length; i++){
				if(entity[i].letter==playerSpawn){
					switch(playerSpawn){
						case "→": player.x=entity[i].x-blockDimension/3-player.width; player.y=entity[i].y; break;
						case "←": player.x=entity[i].x+blockDimension+blockDimension/3; player.y=entity[i].y; break;
						case "↓": player.x=entity[i].x; player.y=entity[i].y-blockDimension-player.height; break;
						case "↑": player.x=entity[i].x; player.y=entity[i].y+blockDimension/3+blockDimension; break;
					}
				}
				/*if(entity[i].name=="show level.name"){ //sposto l'entita che mostra level.name
					mostraNome=i;
				}*/
			}
			//if(level.name!=""){entity[mostraNome].x=player.x; entity[mostraNome].y=player.y;}
      		}
      	} //fine di physics
	function calcolaDeltaLN(direzione){
		switch(direzione){
			case "→": return 100 
			case "←": return -100
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

function newDisableChangeLevelArrows(blockDimensionPassata) { //cambia livello - unicode: →←↓↑
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

function newExitLevelPickup(blockDimensionPassata) { //cambia livello - unicode: →←↓↑
	this.life = 9999999999;
	this.letter= "⟑";
      	this.type = "level modifier";
      	this.name = "exit level";
      	this.damage = 0;
      	this.x = 0;
      	this.y = 0;
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
      		if (collisionBetween(this, player)) { //quando il player lo raccoglie
		      	objAlert = new newAlert("congrats, level ended", 1);
			lvlNumber=1;
      			gamestate = 5;
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
		//non si disegna
      	} //fine di selfDraw
      	this.physics = function (xdisegnata, ydisegnata, indiceDiQuestaEntity) {
		if(this.life>-1){
			ctx.textAlign = "left"; ctx.font = "small-caps bold 15px Lucida Console";
			disegnaTestoConBordino(level.name, 5, canvasHeight-5, this.color1, this.color2);
			this.life--;
		}
      	} //fine di physics
}
