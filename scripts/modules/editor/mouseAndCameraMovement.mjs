      function playerCameraPhysics(p1, lvl) { //this function handles the platformer physics - in realta' solo del player
      	if (player.snapMode) { //1 movimento di griglia alla volta
      		var cameraSpeed = blockDimension;
      		if (!tastoGiaSchiacciato && keys[destrakey] && (p1.x + p1.width < lvl.maxWidth - blockDimension)) { //x movement (camera)
      			p1.x += cameraSpeed;
      			tastoGiaSchiacciato = true;
      		}
      		if (!tastoGiaSchiacciato && keys[sinistrakey] && (p1.x > blockDimension)) {
      			p1.x -= cameraSpeed;
      			tastoGiaSchiacciato = true;
      		}
      		if (!tastoGiaSchiacciato && keys[sukey] && (p1.y > blockDimension)) { //y movement (camera)
      			p1.y -= cameraSpeed;
      			tastoGiaSchiacciato = true;
      		}
      		if (!tastoGiaSchiacciato && keys[giukey] && (p1.y + p1.height < lvl.maxHeight - blockDimension)) {
      			p1.y += cameraSpeed;
      			tastoGiaSchiacciato = true;
      		}
      	} else {
      		var cameraSpeed = 3;
      		if (keys[dashkey]) {
      			cameraSpeed = 9;
      		} else {
      			cameraSpeed = 3;
      		}
      		if (keys[destrakey] && (p1.x + p1.width < lvl.maxWidth - blockDimension)) { //x movement (camera)
      			p1.x += cameraSpeed;
      		}
      		if (keys[sinistrakey] && (p1.x > blockDimension)) {
      			p1.x -= cameraSpeed;
      		}
      		if (keys[sukey] && (p1.y > blockDimension)) { //y movement (camera)
      			p1.y -= cameraSpeed;
      		}
      		if (keys[giukey] && (p1.y + p1.height < lvl.maxHeight - blockDimension)) {
      			p1.y += cameraSpeed;
      		}
      	}
      	if (tastoGiaSchiacciato && !(keys[destrakey] || keys[sinistrakey] || keys[sukey] || keys[giukey])) { //azzera tasto gia schiacciato
      		tastoGiaSchiacciato = false;
      	}
      } //fine della funzione playerPhysics - se riesco la faccio diventare un metodo di player invece che una funzione sestante


      function mouseCoordinatesConverter() {
      	if (player.x + (player.width / 2) < canvasWidth / 2) {
      		lvlCanvasMouseX = mouseX;
      	} else {
      		if (player.x + (player.width / 2) > level.maxWidth - canvasWidth / 2) {
      			lvlCanvasMouseX = mouseX + level.maxWidth - canvasWidth;
      		} else {
      			lvlCanvasMouseX = mouseX + player.x + (player.width / 2) - canvasWidth / 2;
      		}
      	}
      	if (player.y < canvasHeight / 2) {
      		lvlCanvasMouseY = mouseY;
      	} else {
      		if (player.y > level.maxHeight - canvasHeight / 2) {
      			lvlCanvasMouseY = mouseY + level.maxHeight - canvasHeight;
      		} else {
      			lvlCanvasMouseY = mouseY + player.y - canvasHeight / 2;
      		}
      	}
      	lvlCanvasMouseX = Math.floor(lvlCanvasMouseX / blockDimension); //converte in blocchi
      	lvlCanvasMouseY = Math.floor(lvlCanvasMouseY / blockDimension);
      }


      function checkMouseBox(x, y, width, height) {
      	x--;
      	y--;
      	width += 2;
      	height += 2;
      	if (showMouseBox) {
      		tempColor = ctx.fillStyle;
      		ctx.fillStyle = "#ff330044";
      		ctx.fillRect(x, y, width, height);
      		ctx.fillStyle = tempColor;
      	}
      	if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
      		return true;
      	} else {
      		return false;
      	}
      }