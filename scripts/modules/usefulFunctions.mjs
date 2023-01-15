      function rectTest(x, y, width, height) {
      	this.x = x;
      	this.y = y;
      	this.width = width;
      	this.height = height;
      }

      function collisionBetween(p1, lvl) { //this function detects the collision between the two given objects - la uso anche con le entità lol
      	if (lvl.x < p1.x + p1.width &&
      		lvl.x + lvl.width > p1.x &&
      		lvl.y < p1.y + p1.height &&
      		lvl.y + lvl.height > p1.y) {
      		return true;
      	} else {
      		return false;
      	}
      }

      function xDisegnata() {
      	if (player.x + (player.width / 2) < canvasWidth / 2) { //se la x del player è minore di mezzo canvas la tiene com'è
      		xdisegnata = player.x;
      	} else {
      		if (player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) { //altrimenti controlla: se è in mezzo al livello disegna il player al centro del canvas, altrimenti lo lascia scorrere dal centro verso la fine
      			xdisegnata = canvasWidth - level.maxWidth + player.x;
      		} else {
      			xdisegnata = canvasWidth / 2 - (player.width / 2);
      		}
      	}
      	return Math.round(xdisegnata);
      }

      function yDisegnata() {
      	if (player.y < canvasHeight / 2) { //se la y del player è minore di mezzo canvas la tiene com è
      		ydisegnata = player.y;
      	} else {
      		if (player.y > level.maxHeight - canvasHeight / 2) { //altrimenti controlla: se è in mezzo al livello disegna il player al centro del canvas, altrimenti lo lascia scorrere dal centro verso la fine
      			ydisegnata = canvasHeight - level.maxHeight + player.y;
      		} else {
      			ydisegnata = canvasHeight / 2;
      		}
      	}
      	return Math.round(ydisegnata);
      }

      function disegnaTestoConBordino(stringaDiTesto, xdisegnata, ydisegnata, coloreTesto, coloreBordino) {
      	if (coloreBordino) {
      		ctx.fillStyle = coloreBordino;
      		ctx.fillText(stringaDiTesto, xdisegnata + 1, ydisegnata + 1);
      		ctx.fillText(stringaDiTesto, xdisegnata + 1, ydisegnata - 1);
      		ctx.fillText(stringaDiTesto, xdisegnata - 1, ydisegnata + 1);
      		ctx.fillText(stringaDiTesto, xdisegnata - 1, ydisegnata - 1);
      	}
      	ctx.fillStyle = coloreTesto;
      	ctx.fillText(stringaDiTesto, xdisegnata, ydisegnata);
      }

      function nuovoLivello() { //azzera i dati del player e carica un nuovo livello
      	player = nuovoPlayer(currentPlayer);
      	leggiLivelloDaFile();
      	player.x = level.xStartingPos;
      	player.y = level.yStartingPos;
      }
