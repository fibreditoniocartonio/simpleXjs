function aggiornaMappaEsplorata(){ //aggiorna la mappa con le stanze nuove
	var lvlAlreadyExplored=false;
	if(exploredMapIndex.length>0){
		for(var i=0; i<exploredMapIndex.length; i++){
			if(lvlNumber==exploredMapIndex[i]){
				lvlAlreadyExplored=true;
				break;
			}
		}
		if(!lvlAlreadyExplored){
			exploredMapIndex.push(lvlNumber);
		}
	}else{
		exploredMapIndex.push(lvlNumber);
	}
}

function displayFullMap(mapCameraMovement,zoomMultiplier){
	var indexGiaDisegnato=[];
	blockDimension=zoomMultiplier;
	disegnaMappa(lvlNumber, indexGiaDisegnato, null, canvas.width/2+mapCameraMovement.x, canvas.height/2+mapCameraMovement.y);

 function disegnaMappa(stanza,indexGiaDisegnato,previousDir,offsetX,offsetY){
  var stanzaEsplorata=false;
   for (var i=0; i<exploredMapIndex.length; i++){
	if(stanza==exploredMapIndex[i]){
		stanzaEsplorata=true;
		break;
	}
   }
   if(stanzaEsplorata){
	if(!indexGiaDisegnato[stanza.toString()]){
		indexGiaDisegnato[stanza.toString()]=true;
		stringToLevel(allLevelStrings[stanza.toString()]); //load the room
		canvasWidth = canvas.width; canvasHeight = canvas.height; //fix canvas dimension
		//find all other rooms connections
		var changeRoomEntities=[];
		for(var j=0; j<entity.length; j++){ //first of all i find all the entity that can change rooms and i store them (because entity[] will reset)
			if(entity[j].letter=="→" || entity[j].letter=="←" || entity[j].letter=="↓" || entity[j].letter=="↑"){
				changeRoomEntities.push(entity[j]);
			}
			if(entity[j].letter=="ṧ"){//save station
				entity[j].x-=entity[j].width;
				entity[j].width*=3; 
				entity[j].height*=3;
				level.push(entity[j]);
			}
		}
		if(previousDir){//calculate offsets to make the changeRoomBlocks visually connected
			switch(previousDir.letter){ //calculate offsets
				case "→": 
					for(var g=0; g<changeRoomEntities.length; g++){ //
						if(changeRoomEntities[g].oppositeDirection==previousDir.letter){
							offsetX+=-changeRoomEntities[g].x-blockDimension; 
							offsetY+=previousDir.y-changeRoomEntities[g].y; 
							break;
						}
					}
					break; 
				case "←":
					for(var g=0; g<changeRoomEntities.length; g++){
						if(changeRoomEntities[g].oppositeDirection==previousDir.letter){
							offsetX+=-changeRoomEntities[g].x; 
							offsetY+=previousDir.y-changeRoomEntities[g].y; 
							break;
						}
					}
					break;
				case "↓": 
					for(var g=0; g<changeRoomEntities.length; g++){
						if(changeRoomEntities[g].oppositeDirection==previousDir.letter){
							offsetX+=previousDir.x-changeRoomEntities[g].x; 
							offsetY+=-changeRoomEntities[g].y-blockDimension; 
							break;
						}
					}
					break;
				case "↑":
					for(var g=0; g<changeRoomEntities.length; g++){
						if(changeRoomEntities[g].oppositeDirection==previousDir.letter){
							offsetX+=previousDir.x-changeRoomEntities[g].x; 
							offsetY+=-changeRoomEntities[g].y; 
							break;
						}
					}
					break;
			}
		}else{//first room
			offsetX-=level.maxWidth/2;
			offsetY-=level.maxHeight/2;
			//add player location on map
			var playerLocationOnMap=new newPlayerLocationOnMap("#00ffff", "#000000", zoomMultiplier);
			level.push(playerLocationOnMap);
		}
		var roomLevel=level; //save the current level array, otherwise it will be overwritten (i need it for the rendering)
		//recursively do the same with the connected rooms
		for(var j=0; j<changeRoomEntities.length; j++){//now i cicle changeRoomEntities that doesn't reset like entity[] does
			switch(changeRoomEntities[j].letter){
				case "→":
					disegnaMappa(stanza+changeRoomEntities[j].deltaLevelNumber,indexGiaDisegnato,changeRoomEntities[j],offsetX+changeRoomEntities[j].x+blockDimension*2,offsetY);
					break;
				case "←": 
					disegnaMappa(stanza+changeRoomEntities[j].deltaLevelNumber,indexGiaDisegnato,changeRoomEntities[j],offsetX+changeRoomEntities[j].x-blockDimension,offsetY);
					break;
				case "↓": 
					disegnaMappa(stanza+changeRoomEntities[j].deltaLevelNumber,indexGiaDisegnato,changeRoomEntities[j],offsetX,offsetY+changeRoomEntities[j].y+blockDimension*2);
					break;
				case "↑": 
					disegnaMappa(stanza+changeRoomEntities[j].deltaLevelNumber,indexGiaDisegnato,changeRoomEntities[j],offsetX,offsetY+changeRoomEntities[j].y-blockDimension);
					break;
			}
		}	
		//render
		drawMapRoom(roomLevel.background, offsetX, offsetY);
		drawMapRoom(roomLevel, offsetX, offsetY);
		drawMapRoom(roomLevel.foreground, offsetX, offsetY);
	}
    }
 }

 function newPlayerLocationOnMap(color1Pass, color2Pass, zoomMultiplier){
 	this.width=6*blockDimension;
	this.height=6*blockDimension;
	this.x=(player.x+player.width/2)/32*zoomMultiplier-this.width/2;
	this.y=(player.y+player.height/2)/32*zoomMultiplier-this.height/2;
	this.color1=color1Pass;
	this.color2=color2Pass;
	this.canSelfDraw=true;
	this.selfDraw=function(xdisegnata, ydisegnata, i){
		ctx.fillStyle=this.color1; ctx.fillRect(xdisegnata, ydisegnata, this.width, this.height); 
		ctx.strokeStyle=this.color2; ctx.lineWidth = "1"; ctx.strokeRect(xdisegnata, ydisegnata, this.width, this.height); 
		ctx.textAlign = "center"; ctx.font = "small-caps bold "+this.width+"px Lucida Console";
		disegnaTestoConBordino("P", xdisegnata+this.width/2, (ydisegnata+this.height/2+ctx.measureText("O").width/2), this.color2, this.color1); 
		ctx.textAlign = "left";
	}
 }

 function drawMapRoom(lvl, spostaX, spostaY) {
      	for (var i = 0; i < lvl.length; i++) {
      		ctx.fillStyle = lvl[i].color;
		var xdisegnata=Math.round(lvl[i].x+spostaX);
		var ydisegnata=Math.round(lvl[i].y+spostaY);
      		if (lvl[i].canSelfDraw == true) { //some pushed entities into level
      			lvl[i].selfDraw(xdisegnata, ydisegnata, i);
      		} else {
      			ctx.fillRect(xdisegnata, ydisegnata, lvl[i].width, lvl[i].height);
      		}
      	}
 }//fine di drawMapRoom()
}//fine di displayFullMap()
