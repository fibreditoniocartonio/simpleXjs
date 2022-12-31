function aggiornaMappaEsplorata(){ //aggiorna la mappa con le stanze nuove
	let lvlAlreadyExplored=false;
	if(exploredMapIndex.length>0){
		for(let i=0; i<exploredMapIndex.length; i++){
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

function displayFullMap(mapCameraMovement){
	var indexGiaDisegnato=[];
	blockDimension=2;
	disegnaMappa(lvlNumber,indexGiaDisegnato,"",canvas.width/2+mapCameraMovement.x,canvas.height/2+mapCameraMovement.y);
	drawPlayerLocationOnMap("#00ffff", "#000000",canvas.width/2+mapCameraMovement.x,canvas.height/2+mapCameraMovement.y); //draw a signal in the room where the player is
}

function disegnaMappa(stanza,indexGiaDisegnato,previousDir,offsetX,offsetY){
	let giaDis=false;
	for (let i=0; i<indexGiaDisegnato.length; i++){
		if(stanza==indexGiaDisegnato[i]){
			giaDis=true;
			break;
		}
	}
	if(!giaDis){
		indexGiaDisegnato.push(stanza); //set the room as already drawn
		stringToLevel(allLevelStrings[stanza.toString()]); //load the room
		canvasWidth = canvas.width; canvasHeight = canvas.height;
		switch(previousDir){ //calculate offsets
			case "→": break; 
			case "←": offsetX-=level.maxWidth; break;
			case "↓": break;
			case "↑": offsetY-=level.maxHeight; break;
			default: //first room		
				offsetX-=level.maxWidth/2;
				offsetY-=level.maxHeight/2;
				break;
		}
		//draw the room on the map if explored
		for(let k=0; k<exploredMapIndex.length; k++){ 
			if(stanza==exploredMapIndex[k]){
				drawLvl(level.background, true, offsetX, offsetY);
				drawLvl(level, true, offsetX, offsetY);
				drawLvl(level.foreground, true, offsetX, offsetY);
			}
		}
		//do the same with the other rooms connected with this one
		let changeRoomEntities=[];
		for(let j=0; j<entity.length; j++){ //first of all i find all the entity that can change rooms and i store them (because entity[] will reset)
			if(entity[j].letter=="→" || entity[j].letter=="←" || entity[j].letter=="↓" || entity[j].letter=="↑"){
				changeRoomEntities.push(entity[j]);
			}
		}
		for(let j=0; j<changeRoomEntities.length; j++){//now i cicle changeRoomEntities that doesn't reset like entity[] does
			switch(changeRoomEntities[j].letter){
				case "→":
					disegnaMappa(stanza+changeRoomEntities[j].deltaLevelNumber,indexGiaDisegnato,changeRoomEntities[j].letter,offsetX+level.maxWidth,offsetY);
					break;
				case "←": 
					disegnaMappa(stanza+changeRoomEntities[j].deltaLevelNumber,indexGiaDisegnato,changeRoomEntities[j].letter,offsetX,offsetY);
					break;
				case "↓": 
					disegnaMappa(stanza+changeRoomEntities[j].deltaLevelNumber,indexGiaDisegnato,changeRoomEntities[j].letter,offsetX,offsetY+level.maxHeight);
					break;
				case "↑": 
					disegnaMappa(stanza+changeRoomEntities[j].deltaLevelNumber,indexGiaDisegnato,changeRoomEntities[j].letter,offsetX,offsetY);
					break;
			}
		}
	}

}

function drawPlayerLocationOnMap(color1, color2, xpos, ypos){ //draw the signal of the player
	signalDimension=blockDimension*8;
	ctx.fillStyle=color1; ctx.fillRect(xpos-signalDimension/2, ypos-signalDimension/2, signalDimension, signalDimension); 
	ctx.strokeStyle=color2; ctx.lineWidth = "1"; ctx.strokeRect(xpos-signalDimension/2, ypos-signalDimension/2, signalDimension, signalDimension); 
	ctx.textAlign = "center"; ctx.font = "small-caps bold "+signalDimension+"px Lucida Console";
	disegnaTestoConBordino("P", xpos, (ypos + ctx.measureText("O").width/2), color2, color1); ctx.textAlign = "left";
}
