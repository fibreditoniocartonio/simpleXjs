      function SalvaPartita() {
      	stringaSalvataggio = jumpkey + "|" + destrakey + "|" + sinistrakey + "|" + sukey + "|" + giukey + "|" + dashkey + "|" + sparokey + "|" + startkey + "|" + lkey + "|" + rkey + "|" + levelDefeated + "|" + heartAcquired;
      	for (i = 0; i < 4; i++) {
      		stringaSalvataggio += "|" + subtank[i].life + "|" + subtank[i].acquired;
      	}
      	stringaSalvataggio += "|" + armaturaAcquired; { //creo il file simpleXjs.dataDiOggi.savegame da scaricare
      		const dataDiOggi = creaData(); //prende la data di oggi
      		var element = document.createElement('a');
      		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringaSalvataggio));
      		element.setAttribute('download', "simpleXjs." + dataDiOggi + ".savegame");
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