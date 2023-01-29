function SalvaPartita() {
      	stringaSalvataggio = currentPlayer + "|" + jumpkey + "|" + destrakey + "|" + sinistrakey + "|" + sukey + "|" + giukey + "|" + dashkey + "|" + sparokey + "|" + startkey + "|" + lkey + "|" + rkey + "|" + mapkey + "|" + levelDefeated + "|" + heartAcquired;
      	for (i = 0; i < 4; i++) {
      		stringaSalvataggio += "|" + subtank[i].life + "|" + subtank[i].acquired;
      	}
      	stringaSalvataggio += "|" + armaturaAcquired + "|" + lvlNumber + "|" + exploredMapIndex;

	{ //creo il file simpleXjs.dataDiOggi.savegame da scaricare
      		const dataDiOggi = creaData(); //prende la data di oggi
      		let element = document.createElement('a');
      		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringaSalvataggio));
      		element.setAttribute('download', "simpleXjs." + dataDiOggi + ".savegame");
      		element.style.display = 'none';
      		document.body.appendChild(element);
      		element.click();
      		document.body.removeChild(element);
      		document.getElementById('canvasDivId').focus();

      		function creaData() {
      			let temp = new Date();
      			let dateStr = padStr(temp.getFullYear()) + "." +
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

function CaricaPartita(stringaSalvataggioDaCaricare){
	caricaDatiSalvataggio(stringaSalvataggioDaCaricare);
    	nuovoLivello();
	gamestate = -1;
}

function caricaDatiSalvataggio(stringaCaricaPartita) { //carica effettivamente la partita dal risultato della lettura del file
				stringaSalvataggio=stringaCaricaPartita;
				exploredMapIndex = []; //azzero l'esplorazione mappa
				let numeroElementoTotale=25;
    				let numeroElemento = 0;
    				let stringaElemento = "";
    				for (i = 0; i < stringaCaricaPartita.length; i++) {
    					if (stringaCaricaPartita[i] == "|") {
    						caricaElemento();
    						numeroElemento++;
    						stringaElemento = "";
    					} else {
    						stringaElemento += stringaCaricaPartita[i];
    					}
    				}
    				if ((numeroElemento == numeroElementoTotale-1) && (stringaElemento != "")) { //carica l'ultimo elemento se esiste (che se no verrebbe skippato, facendo poi ritornare false)
    					caricaElemento();
    					numeroElemento++;
    				}
    				if (numeroElemento == numeroElementoTotale) { //se ha caricato il numero corretto di elementi
    					return true;
    				} else {
    					objAlert = new newAlert("The file is not using the correct format", gamestate);
    					gamestate = 5;
    					return false;
    				}

    				function caricaElemento() {
    					switch (numeroElemento) { 
						case 0: //currentPlayer
    							currentPlayer = parseInt(stringaElemento, 10);
    							break;
    						case 1: //jumpkey
    							jumpkey = stringaElemento;
    							break;
    						case 2: //destrakey
    							destrakey = stringaElemento;
    							break;
    						case 3: //sinistrakey
    							sinistrakey = stringaElemento;
    							break;
    						case 4: //sukey
    							sukey = stringaElemento;
    							break;
    						case 5: //giukey
    							giukey = stringaElemento;
    							break;
    						case 6: //dashkey
    							dashkey = stringaElemento;
    							break;
    						case 7: //sparokey
    							sparokey = stringaElemento;
    							break;
    						case 8: //startkey
    							startkey = stringaElemento;
    							break;
    						case 9: //lkey
    							lkey = stringaElemento;
    							break;
    						case 10: //rkey
    							rkey = stringaElemento;
    							break;
						case 11: //mapkey - select
    							mapkey = stringaElemento;
    							break;
    						case 12: //levelDefeated
    							var nuovoElementino = "";
    							for (k = 0; k < 8; k++) {
    								for (j = 0; j < stringaElemento.length; j++) {
    									if (stringaElemento[j] != ",") {
    										nuovoElementino += stringaElemento[j];
    										if (nuovoElementino == "true") {
    											levelDefeated[k] = true;
    											nuovoElementino = "";
    											k++;
    										} else if (nuovoElementino == "false") {
    											levelDefeated[k] = false;
    											nuovoElementino = "";
    											k++;
    										}
    									} else {
    										nuovoElementino = "";
    									}
    								}
    							}
    							break;
    						case 13: //heartAcquired
    							var nuovoElementino = "";
    							for (k = 0; k < 8; k++) {
    								for (j = 0; j < stringaElemento.length; j++) {
    									if (stringaElemento[j] != ",") {
    										nuovoElementino += stringaElemento[j];
    										if (nuovoElementino == "true") {
    											heartAcquired[k] = true;
    											nuovoElementino = "";
    											k++;
    										} else if (nuovoElementino == "false") {
    											heartAcquired[k] = false;
    											nuovoElementino = "";
    											k++;
    										}
    									} else {
    										nuovoElementino = "";
    									}
    								}
    							}
    							break;
    						case 14: //subtank
    							subtank[0].life = parseInt(stringaElemento, 10);
    							break;
    						case 15:
    							if (stringaElemento == "true") {
    								subtank[0].acquired = true;
    							} else {
    								subtank[0].acquired = false;
    								subtank[0].life = 0;
    							}
    							break;
    						case 16:
    							subtank[1].life = parseInt(stringaElemento, 10);
    							break;
    						case 17:
    							if (stringaElemento == "true") {
    								subtank[1].acquired = true;
    							} else {
    								subtank[1].acquired = false;
    								subtank[1].life = 0;
    							}
    							break;
    						case 18:
    							subtank[2].life = parseInt(stringaElemento, 10);
    							break;
    						case 19:
    							if (stringaElemento == "true") {
    								subtank[2].acquired = true;
    							} else {
    								subtank[2].acquired = false;
    								subtank[2].life = 0;
    							}
    							break;
    						case 20:
    							subtank[3].life = parseInt(stringaElemento, 10);
    							break;
    						case 21:
    							if (stringaElemento == "true") {
    								subtank[3].acquired = true;
    							} else {
    								subtank[3].acquired = false;
    								subtank[3].life = 0;
    							}
    							break;
    						case 22: //armaturaAcquired
    							var nuovoElementino = "";
    							for (k = 0; k < 4; k++) {
    								for (j = 0; j < stringaElemento.length; j++) {
    									if (stringaElemento[j] != ",") {
    										nuovoElementino += stringaElemento[j];
    										if (nuovoElementino == "true") {
    											armaturaAcquired[k] = true;
    											nuovoElementino = "";
    											k++;
    										} else if (nuovoElementino == "false") {
    											armaturaAcquired[k] = false;
    											nuovoElementino = "";
    											k++;
    										}
    									} else {
    										nuovoElementino = "";
    									}
    								}
    							}
    							break;
						case 23: //lvlNumber
						    	lvlNumber = parseInt(stringaElemento, 10);
    							break;
						case 24: //exploredMapIndex
    							var nuovoElementino = "";
    							for (j = 0; j < stringaElemento.length; j++) {
    								if (stringaElemento[j] == "," || j+1==stringaElemento.length) {	
									if(j+1==stringaElemento.length){nuovoElementino += stringaElemento[j];}
									exploredMapIndex.push(parseInt(nuovoElementino, 10));
    									nuovoElementino = "";
    								} else {
    									nuovoElementino += stringaElemento[j];
    								}
    							}
    							break;
    					}
    				}
} //fine di caricaDatiSalvataggio()
