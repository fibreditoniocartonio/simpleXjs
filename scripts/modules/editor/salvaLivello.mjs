      function salvaLivello() {
      	//controllo prima che ci sia la starting position
      	var xCount = 0;
      	for (i = 0; i < stringaLivello.length; i++) {
      		if (stringaLivello[i] == "X") {
      			xCount++;
      		}
      		if (stringaLivello[i] == "z") {
      			break;
      		}
      	}
      	if (xCount == 0) {
      		objAlert = new newAlert("you must set the player starting position", gamestate);
      		gamestate = 5;
      	} else if (xCount > 1) {
      		objAlert = new newAlert("you must set only one player starting position", gamestate);
      		gamestate = 5;
      	} else {
      		//creo il file simpleXjs.dataDiOggi.savegame da scaricare
      		const dataDiOggi = creaData(); //prende la data di oggi
      		var element = document.createElement('a');
      		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringaLivello));
      		element.setAttribute('download', "simpleXjs." + dataDiOggi + ".level");
      		element.style.display = 'none';
      		document.body.appendChild(element);
      		element.click();
      		document.body.removeChild(element);
      		document.getElementById('canvasDivId').focus();
      		return;

      		function creaData() {
      			var temp = new Date();
      			var dateStr = padStr(temp.getFullYear()) + "." +
      				padStr(1 + temp.getMonth()) + "." +
      				padStr(temp.getDate()) + "-" +
      				padStr(temp.getHours()) + "." +
      				padStr(temp.getMinutes());
      			return dateStr;

      			function padStr(i) { //sistema tipo 01 e 11 per avere tutto su due cifre
      				return (i < 10) ? "0" + i : "" + i;
      			}
      		}
      	}
      }