function doInGamePhysics(){
	player.physics(player, level); //chiama la funzione physics del player
	entityPhysicsCaller();

	function entityPhysicsCaller(){
      		for (var i = 0; i < entity.length; i++) {
      			if (entity[i].life > 0) { //calcola la entita solo se la sua vita è maggiore di zero
				//guardo che coordinate (xdisegnata e ydisegnata) hanno le entity, in modo da vedere se sono a schermo o no
      				var xdisegnata = 0;
      				if (player.x + (player.width / 2) < canvasWidth / 2) {
      					xdisegnata = entity[i].x;
      				} else {
      					if (player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) {
      						xdisegnata = entity[i].x - level.maxWidth + canvasWidth;
      					} else {
      						xdisegnata = entity[i].x - player.x - (player.width / 2) + canvasWidth / 2;
      					}
      				}
      				var ydisegnata = 0;
      				if (player.y < canvasHeight / 2) {
      					ydisegnata = entity[i].y;
      				} else {
      					if (player.y > level.maxHeight - canvasHeight / 2) {
      						ydisegnata = entity[i].y - level.maxHeight + canvasHeight;
      					} else {
      						ydisegnata = entity[i].y - player.y + canvasHeight / 2;
      					}
      				}
				xdisegnata=Math.round(xdisegnata); ydisegnata=Math.round(ydisegnata);
				//calcolo la fisica solo delle entita che verranno disegnate a schermo
      				if ((xdisegnata + entity[i].width > (-canvasWidth / 8) && xdisegnata < (canvasWidth + (canvasWidth / 8))) && (ydisegnata > (-canvasHeight / 8) && ydisegnata < (canvasHeight + (canvasHeight / 8))) || entity[i].type == "sparoDelPlayer" || entity[i].type=="enemyShot") { //questo if fa i controlli spiegati sopra 
      					if (entity[i].hasPhysics) {
      						entity[i].physics(xdisegnata, ydisegnata, i);
      					}
      				}
      			}
      		}
	}
}
