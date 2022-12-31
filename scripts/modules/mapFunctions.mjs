function aggiornaMappaEsplorata(){ //aggiorna la mappa con le stanze nuove
	let lvlAlreadyExplored=false;
	for(let i=0; i<exploredMapIndex.length; i++){
		if(lvlNumber==exploredMapIndex[i]){
			lvlAlreadyExplored=true;
			break;
		}
		if(!lvlAlreadyExplored){
			exploredMapIndex.push(lvlNumber);
		}
	}
}

function displayFullMap(){
	var indexGiaDisegnato=[];
	blockDimension=2;
	disegnaMappa(lvlNumber,indexGiaDisegnato,canvas.width/2,canvas.height/2);
}

function disegnaMappa(stanza,indexGiaDisegnato,offsetX,offsetY){
	let giaDis=false;
	for (let i=0; i<indexGiaDisegnato.length; i++){
		if(stanza==indexGiaDisegnato[i]){
			giaDis=true;
			break;
		}
	}
	if(!giaDis){
		indexGiaDisegnato.push(stanza);
		stringToLevel(allLevelStrings[stanza.toString()]);
		level.tileset=""; level.backgroundImg="";
		//player.x=level.maxWidth/2; player.y=level.maxHeight/2;
		canvasWidth = canvas.width; canvasHeight = canvas.height;
		offsetX+=level.maxWidth/2;
		offsetY+=level.maxHeight/2;
		drawLvl(level, offsetX, offsetY);
	}
}
