function stringToLevel(lvlString) {
	level = []; //azzera level
	entity = []; //azzera entity
	var foreground = []; //crea un vettore tipo level per i blocchi di foreground
	var background = []; //crea un vettore tipo level per i blocchi di background
	var widthTot = 0;
	var heightTot = 1;
	for (i = 0; i < lvlString.length; i++) { //ciclo la stringa livello per trasformarlo da stringa a livello vero
		switch (lvlString[i]) {
			case 'X': //posizione iniziale del player
				var currentIndex = i;
				level['xStartingPos'] = (i % widthTot) * blockDimension;
				level['yStartingPos'] = (heightTot - 2) * blockDimension;
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				i = currentIndex;
				if (levelEditor) {
					leggiBlocco(level, lvlString[i]);
					level[level.length - 1].color = "#0400f8";
				}
				break;
			case 't': // t è il top floor/ceiling
				widthTot++;
				break;

			case 'l': // l è il left floor
				heightTot++;
				break;

			case 'w': // w funziona come left floor ma indica anche il water level
				heightTot++;
				level['waterLevel'] = ((heightTot - 1) * blockDimension) + 7; //setta il waterlevel
				break;

			case '.': // . è vuoto/aria
				break;

				//ora le entita' (lettere maiuscole) 
			case 'P': // P indica un pipistrello
				var pipistrello = new newPipistrello();
				pipistrello.x = (i % widthTot) * blockDimension;
				pipistrello.y = (heightTot - 1) * blockDimension + 10;
				entity.push(pipistrello);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case 'B': // B indica un bunny (coniglio)
				var entita = new newBunny();
				entita.x = (i % widthTot) * blockDimension;
				entita.y = (heightTot - 1) * blockDimension - 2;
				entity.push(entita);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case 'A': // A indica un ape (bomb bee)
				var entita = new newBombBee();
				entita.x = (i % widthTot) * blockDimension;
				entita.y = (heightTot - 1) * blockDimension - 2;
				entity.push(entita);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case 'S': //S sono le spike (le spine che instaKillano)
				var spike = new newSpike();
				spike.x = (i % widthTot) * blockDimension;
				spike.y = (heightTot - 1) * blockDimension;
				entity.push(spike);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case '0':
			case '1':
			case '2':
			case '3': //sono i pezzi di armatura
				var armatura = new newPickUp_Armor(parseInt(lvlString[i], 10));
				armatura['letter'] = lvlString[i];
				armatura.x = (i % widthTot) * blockDimension;
				armatura.y = (heightTot - 1) * blockDimension;
				entity.push(armatura);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case '4':
			case '5':
			case '6':
			case '7': //sono le subtank
				var subtankLetta = new newPickUp_Subtank(parseInt(lvlString[i], 10) - 4);
				subtankLetta['letter'] = lvlString[i];
				subtankLetta.x = (i % widthTot) * blockDimension;
				subtankLetta.y = (heightTot - 1) * blockDimension;
				entity.push(subtankLetta);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case '⁰':
			case '¹':
			case '²':
			case '³':
			case '⁴':
			case '⁵':
			case '⁶':
			case '⁷': //sono i cuori che aumentano la vita
				//caratteri per copiare/incollare:  ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹
				var cuore = new newPickUp_Cuore(lvlString[i]);
				cuore['letter'] = lvlString[i];
				cuore.x = (i % widthTot) * blockDimension;
				cuore.y = (heightTot - 1) * blockDimension - 1;
				entity.push(cuore);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case 'à': //small life recovery
				var lifeRec = new newPickUp_LifeEnergy(2);
				lifeRec['letter'] = lvlString[i];
				lifeRec.width = 10;
				lifeRec.height = 10;
				lifeRec.x = (i % widthTot) * blockDimension + (blockDimension / 2 - lifeRec.width / 2);
				lifeRec.y = (heightTot - 1) * blockDimension + 1;
				entity.push(lifeRec);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case 'À': //big life recovery
				var lifeRec = new newPickUp_LifeEnergy(8);
				lifeRec['letter'] = lvlString[i];
				lifeRec.width = 18;
				lifeRec.height = 18;
				lifeRec.x = (i % widthTot) * blockDimension + (blockDimension / 2 - lifeRec.width / 2);
				lifeRec.y = (heightTot - 1) * blockDimension + 1;
				entity.push(lifeRec);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case 'è': //small weapon recovery
				var weaponRec = new newPickUp_WeaponEnergy(2);
				weaponRec['letter'] = lvlString[i];
				weaponRec.width = 10;
				weaponRec.height = 10;
				weaponRec.x = (i % widthTot) * blockDimension + (blockDimension / 2 - weaponRec.width / 2);
				weaponRec.y = (heightTot - 1) * blockDimension + 1;
				entity.push(weaponRec);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;
			case 'È': //big weapon recovery
				var weaponRec = new newPickUp_WeaponEnergy(8);
				weaponRec['letter'] = lvlString[i];
				weaponRec.width = 18;
				weaponRec.height = 18;
				weaponRec.x = (i % widthTot) * blockDimension + (blockDimension / 2 - weaponRec.width / 2);
				weaponRec.y = (heightTot - 1) * blockDimension + 1;
				entity.push(weaponRec);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;

			case '→': case '←': case '↓': case '↑': //change level Direction
				let changeLevelDirection = new newChangeLevelArrow(lvlString[i]);
				changeLevelDirection.x = (i % widthTot) * blockDimension;
				changeLevelDirection.y = (heightTot - 1) * blockDimension;
				changeLevelDirection.width = blockDimension;
				changeLevelDirection.height = blockDimension + 1;
				entity.push(changeLevelDirection);
				checkBackAndForGround(background, foreground, lvlString[i - 1]); //se il blocco prima era un background o foreground lo carica sotto il player
				break;
				
				//i blocchi
			case 'a':
			case 'b':
			case 'c':
			case 'd':
			case 'e':
			case 'f':
			case 'g':
			case 'h':
			case 'i':
			case 'j':
			case 'k':
				// le lettere dalla a alla k indicano un blocco da blockDimension*blockDimension di colori diversi
				leggiBlocco(level, lvlString[i]);
				break;

			case 'm':
			case 'n':
			case 'o': //foreground
				leggiBlocco(foreground, lvlString[i]);
				break;

			case 'p':
			case 'q':
			case 'r': //background 
				leggiBlocco(background, lvlString[i]);
				break;

			case 'z': // 'z' indica la fine del livello. Da qui in poi non sto leggendo piu blocchi e entita' ma le caratteristiche del livello come gravita', posizione iniziale del player e colore dei blocchi del livello
				level['indiceZ'] = i;
				widthTot++;
				heightTot++;
				level['gravity'] = readNumber();
				level['friction'] = readNumber();
				level['gravityWater'] = level.gravity * 4 / 7;
				level['frictionWater'] = level.friction * 9 / 10;
				blocksColors(level, 11); //this will push color[] to level, it will contain the blocks colors
				blocksColors(foreground, 3);
				blocksColors(background, 3);
				level['foreground'] = foreground;
				level['background'] = background;
				level['tileset'] = readTileset();
				level['backGroundImg'] = readBackgroundImg();
				break;
		} //fine dello switch case															
	} //fine del for

	//imposto la grandezza del livello e lo confronto con la grandezza del canvas
	level['maxWidth'] = widthTot * blockDimension;
	level['maxHeight'] = heightTot * blockDimension;
	if (levelEditor) {
		if (level.maxWidth < canvasWidth) { //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le x
			canvasWidth = level.maxWidth;
		} else {
			if (level.maxWidth > canvasWidth) {
				if (level.maxWidth > canvasWidthDefault) {
					canvasWidth = canvasWidthDefault;
				} else {
					canvasWidth = level.maxWidth;
				}
			}
		}
		if (level.maxHeight < canvasHeight) { //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le y
			canvasHeight = level.maxHeight;
		} else {
			if (level.maxHeight > canvasHeight) {
				if (level.maxHeight > canvasHeightDefault) {
					canvasHeight = canvasHeightDefault;
				} else {
					canvasHeight = level.maxHeight;
				}
			}
		}
	} else {
		if (level.maxWidth < canvas.width) { //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le x
			canvasWidth = level.maxWidth;
		} else {
			canvasWidth = canvas.width;
		}
		if (level.maxHeight < canvas.height) { //controlla che il livello non sia piu piccolo del canvas, che se no si bugga tutto - le y
			canvasHeight = level.maxHeight;
		} else {
			canvasHeight = canvas.height;
		}
	}
	//imposto i colori dei blocchi in base a quello che ho letto
	for (i = 0; i < level.length; i++) {
		switch (level[i].lettera) {
			case 'a':
				level[i].color = level.color[0];
				break;
			case 'b':
				level[i].color = level.color[1];
				break;
			case 'c':
				level[i].color = level.color[2];
				break;
			case 'd':
				level[i].color = level.color[3];
				break;
			case 'e':
				level[i].color = level.color[4];
				break;
			case 'f':
				level[i].color = level.color[5];
				break;
			case 'g':
				level[i].color = level.color[6];
				break;
			case 'h':
				level[i].color = level.color[7];
				break;
			case 'i':
				level[i].color = level.color[8];
				break;
			case 'j':
				level[i].color = level.color[9];
				break;
			case 'k':
				level[i].color = level.color[10];
				break;
		}
	}
	for (i = 0; i < level.foreground.length; i++) {
		switch (level.foreground[i].lettera) {
			case 'm':
				level.foreground[i].color = level.foreground.color[0];
				break;
			case 'n':
				level.foreground[i].color = level.foreground.color[1];
				break;
			case 'o':
				level.foreground[i].color = level.foreground.color[2];
				break;
		}
	}
	for (i = 0; i < level.background.length; i++) {
		switch (level.background[i].lettera) {
			case 'p':
				level.background[i].color = level.background.color[0];
				break;
			case 'q':
				level.background[i].color = level.background.color[1];
				break;
			case 'r':
				level.background[i].color = level.background.color[2];
				break;
		}
	}
	//ora inizializzo i bordi - ho schiacciato il codice perche' occupava righe inutili. e' molto simile al prototipo di blocco    
	var ground = {
		x: 0,
		width: level.maxWidth,
		height: (blockDimension) + 1,
		color: level.color[0],
		lettera: "a"
	};
	ground['y'] = level.maxHeight - ground.height;
	var ceiling = {
		x: 0,
		y: 0,
		width: level.maxWidth,
		height: (blockDimension) + 1,
		color: level.color[0],
		lettera: "a"
	};
	var leftWall = {
		x: 0,
		y: 0,
		width: (blockDimension) + 1,
		height: level.maxHeight,
		color: level.color[0],
		lettera: "a"
	};
	var rightWall = {
		y: 0,
		width: (blockDimension) + 1,
		height: level.maxHeight,
		color: level.color[0],
		lettera: "a"
	};
	rightWall['x'] = level.maxWidth - rightWall.width;
	level.push(ground, ceiling, leftWall, rightWall); //this pushes all of the static objects into the level				   

	// ora definisco le funzioni interne di stringToLevel()
	function readNumber() { //compone i vari caratteri di una stringa in numero. Esempio traduce "10.91;" in numeroLetto=10.91
		var numeroLetto = 0;
		var isDecimale = false;
		var esponente = 0;
		for (i++; i < lvlString.length; i++) {
			if (lvlString[i] != ";") {
				if (lvlString[i] == '.' || lvlString[i] == ',') { //determina se il numero che sto leggendo avra' delle cifre decimali
					isDecimale = true;
				} else {
					if (!isDecimale) {
						numeroLetto = (numeroLetto * 10) + Number(lvlString[i]);
					} else {
						esponente--;
						numeroLetto = numeroLetto + (Number(lvlString[i]) * Math.pow(10, esponente))
					}
				}
			} else {
				break;
			}
		}
		return numeroLetto;
	}

	function readTileset() {
		var immagineLetta = "";
		var contaPV = 0;
		if (i < lvlString.length) {
			for (i++; i < lvlString.length; i++) {
				if (lvlString[i] == ";") {
					contaPV++;
				}
				if (contaPV == 2) {
					break;
				} else {
					immagineLetta += lvlString[i];
				}
			}
		}
		if (!(immagineLetta == "" || immagineLetta == ";")) {
			var img = new Image();
			img.src = immagineLetta;
			return img;
		} else {
			return "";
		}
	}

	function readBackgroundImg() {
		var immagineLetta = "";
		var contaPV = 0;
		if (i < lvlString.length) {
			for (i++; i < lvlString.length; i++) {
				if (lvlString[i] == ";") {
					contaPV++;
				}
				if (contaPV == 2) {
					break;
				} else {
					immagineLetta += lvlString[i];
				}
			}
		}
		if (!(immagineLetta == "" || immagineLetta == ";")) {
			var img = new Image();
			img.src = immagineLetta;
			return img;
		} else {
			return "";
		}
	}

	function readColor() {
		var coloreLetto = "";
		if (i < lvlString.length) {
			for (i++; i < lvlString.length; i++) {
				if (lvlString[i] != ";") {
					coloreLetto += lvlString[i]
				} else {
					break;
				}
			}
		}
		if (coloreLetto == "") {
			return "#155261";
		} else {
			return coloreLetto;
		}
	}

	function blocksColors(vettore, numeroDiLetture) {
		var color = [];
		for (n = 0; n < numeroDiLetture; n++) {
			color[n] = readColor();
		}
		vettore['color'] = color;
	}

	function leggiBlocco(vettore, lettera) {
		var blocco = new Blocco(i, widthTot, heightTot);
		for (n = 1;; n++) { //controllo che se le lettere dopo sono uguali a questo blocco. Se lo sono non sto a creare tanti blocchetti ma ne faccio solo uno piu' largo per ottimizzare
			if (lvlString[i + n] == lettera) {
				blocco.width = blocco.width + (blockDimension);
			} else {
				i = i + n - 1;
				break; //del for
			}
		}
		blocco.width = blocco.width + 1;
		blocco['lettera'] = lettera;
		vettore.push(blocco);
	}

	function Blocco(i, widthTot, heightTot) { //prototipo di blocco
		this.x = (i % widthTot) * blockDimension;
		this.y = (heightTot - 1) * blockDimension;
		this.width = blockDimension;
		this.height = blockDimension + 1;
		this.color = '#155261';
	}

	function checkBackAndForGround(background, foreground, bloccoPrima) {
		if (bloccoPrima == 'p' || bloccoPrima == 'q' || bloccoPrima == 'r') {
			leggiBlocco(background, bloccoPrima);
		} else if (bloccoPrima == 'm' || bloccoPrima == 'n' || bloccoPrima == 'o') {
			leggiBlocco(foreground, bloccoPrima);
		}
	}
} //fine di stringToLevel()